class Cell {
    constructor(i, j){
        this.i = i;
        this.j = j;
        
        this.picked = false;
    }
    
    index(i, j){
        if(i < 0 || i > cols - 1 || j < 0 || j < rows - 1){
            return -1;
        } else{
            return (i + j * cols);
        }
    }
    
    pick(){
        this.picked = true;
    }
    
    clear(){
        this.picked = false;
    }
    show(){
        var x = this.i * cellSize;
        var y = this.j * cellSize;
        
        if(this.i > 13){
            fill(200);
        }else{
            //stroke(0);
            fill(220);
        }
        
        if (this.picked){
            fill(0);
        }
        rect(x, y, cellSize, cellSize);
    }
}