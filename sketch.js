let cellSize = 10
let cells = []
let inputs = [];
let targets = [];
let train = false;
let itr = 0;
let epoch = 10000;

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
    console.log(itr);
    randCellIndex = floor(random(cells.length));
    cells[randCellIndex].pick();
    for(var i = 0; i < cells.length; i++){
        cells[i].show();
    }
    
    updateInput(randCellIndex);
    
    prediction = brain.query(inputs);
    //console.log(prediction);
    if(prediction[0] > prediction[1]){
        pred = "Left";
    }else{
        pred = "Right";
    }
    
    removeElements()
    createP("Brain's Prediction: " + pred);
    
    if(train){
        if(itr < epoch){
            targets = [0, 0];
            //console.log(cells[randCellIndex].i);
            //console.log(cells[randCellIndex].j);
            if(cells[randCellIndex].i > 13){
                targets[1] = 1;
            }else{
                targets[0] = 1;
            }
            //console.log(targets);
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
        //redraw();
        loop();
    }
}

function mousePressed(){
    if((mouseX > 0 && mouseX < width) &&
       (mouseY > 0 && mouseY < height)) {
        targets = [0, 0];
        if (mouseX > width/2){
            targets[1] = 1;
        } else{
            targets[0] = 1;
        }
        //console.log(targets);
        brain.train(inputs, targets);
        redraw();
    }
}