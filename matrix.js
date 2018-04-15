class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        
        for(let i = 0; i < this.rows; i++){
            this.data[i] = [];
            for(let j = 0; j < this.cols; j++){
                this.data[i][j] = 0;
            }
        }
    }
    
    static fromArray(arr){
        let m = new Matrix(arr.length, 1);
        for(let i = 0; i < arr.length; i++){
            m.data[i][0] = arr[i];
        }
        
        return m;
    }
    
    toArray(){
        let arr = [];
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }
    
    randomise(dummy=false){
        if(dummy){
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] = Math.floor(Math.random() * 10);
                }
            }
        }else{
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] = Math.random() * 2 - 1;
                }
            }
        }
    }
    
    static subtract(a, b) {
        let result = new Matrix(a.rows, a.cols);
        for(let i = 0; i < result.rows; i++){
            for (let j = 0; j < result.cols; j++){
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }
    
    add(n){
        if(n instanceof Matrix){
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] += n;
                }
            }
        }
    }
    
    static identity(n){
        let result = new Matrix(n,n);
        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                if(i == j){
                    result.data[i][j] = 1;
                }else{
                    result.data[i][j] = 0;
                }
            }
        }
        return result;
    }
    
    static multiply(a, b){
        if(a.cols != b.rows){
            console.log("Incompatible matrices");
            return undefined;
        }
        
        let result = new Matrix(a.rows, b.cols);
        for(let i = 0; i < result.rows; i++){
            for(let j = 0; j < result.cols; j++){
                let sum = 0;
                for(let k = 0; k < a.cols; k++){
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        
        return result;
    }
    
    static transpose(a){
        let result = new Matrix(a.cols, a.rows);
        for(let i = 0; i < a.rows; i++){
            for(let j = 0; j < a.cols; j++){
                result.data[j][i] = a.data[i][j];
            }
        }
        return result;
    }
    
    multiply(n){
        if(n instanceof Matrix){
            for (let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] *= n.data[i][j];
                }
            }
        }else {
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] *= n;
                }
            }
        }
    }
    
    apply(func){
        // Apply a function to every element of the matrix
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }
    
    static apply(matrix, func) {
        let result = new Matrix(matrix.rows, matrix.cols);
        // Apply a function to every element of matrix
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] = func(val);
            }
        }
        return result;
    }
    
    print() {
        console.table(this.data);
    }
    
}