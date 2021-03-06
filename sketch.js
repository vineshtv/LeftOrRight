let cellSize = 10
let cells = []
let inputs = [];
let targets = [];
let train = false;
let itr = 0;
let epoch = 20000;
let mp = 0;
var predBitList = [];
var totalCorrect = 0;

function setup() {
	createCanvas(28 * cellSize + 1, 28 * cellSize + 1);
    rows = floor(width/cellSize);
    cols = floor(height/cellSize);
    
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < cols; j++){
            cells.push(new Cell(i, j));
        }
    }
    
    brain = new NeuralNetwork(784, 200, 2, 0.05);
    createP("Brain's Prediction: ");
    background(51);
}

function updateInput(index){
    for(var i = 0; i < cells.length; i++){
        inputs[i] = 0;
    }
    inputs[index] = 1;
}

function draw() {
    if (train){
        itr++;
    }
    
    randCellIndex = floor(random(cells.length));
    cells[randCellIndex].pick();
    for(var i = 0; i < cells.length; i++){
        cells[i].show();
    }
    
    updateInput(randCellIndex);
    
    prediction = brain.query(inputs);
    
    if(prediction[0] > prediction[1]){
        pred = "Left";
    }else{
        pred = "Right";
    }
    
    var result = "Wrong";
    
    if((cells[randCellIndex].i > 13 && pred == "Right") ||
        (cells[randCellIndex].i <= 13 && pred == "Left")){
        result = "Correct";
    }
    
    var len = predBitList.unshift(result == "Correct"? 1 : 0);
    totalCorrect += (result == "Correct" ? 1: 0);
    if(len > 200){
        var x = predBitList.pop();
        totalCorrect -= x;
    }
    
    removeElements()
    createP("Brain's Prediction: " + pred);
    var outlist = ""
    for(var i = 0; i < predBitList.length; i++){
        outlist += predBitList[i];
    }
    createP("Report - " + outlist);
    var accuracy = totalCorrect / predBitList.length;
    createP("Accuracy (over the past 200 samples) : " + accuracy);
    
    if(train){
        if(itr < epoch){
            targets = [0, 0];
            if(cells[randCellIndex].i > 13){
                targets[1] = 1;
            }else{
                targets[0] = 1;
            }
            brain.train(inputs, targets);
        }
    }
    cells[randCellIndex].clear();
    if (train){
        if(itr > epoch){
            train = false;
            itr = 0;
        }
    }else{
        noLoop();
    }
}

function keyPressed(){
    if (key == ' '){
        train = true;
        loop();
    }
}

function mousePressed(){
    if((mouseX > 0 && mouseX < width) &&
       (mouseY > 0 && mouseY < height)) {
        targets = [0, 0];
        mp++;
        if (mouseX > width/2){
            targets[1] = 1;
        } else{
            targets[0] = 1;
        }
        console.log(targets);
        brain.train(inputs, targets);
        redraw();
    }
}