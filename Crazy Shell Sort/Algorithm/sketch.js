let data = [];

let Arr = [];
let Steps = [7, 4, 3, 2, 1];

let SIZE = 20;
let LEN_X = 100;
let LEN_Y = 50;

let iter = 1;
let ITER_MAX = Steps.length * SIZE - Steps.reduce((a, b) => a + b, 0);

function setup(){
    createCanvas(2100, 50 * (ITER_MAX + 1) );
    frameRate(10);
    for (let i = 0 ; i < SIZE ; i++){
        Arr[i] = SIZE-i;
    }
    get_data();
    algorithm();
}

function output(line = true){
    for (let val = 0 ; val < SIZE ; val++){
        noFill();
        stroke(color(255, 0, val * 10));
        strokeWeight(10)
        if ( line ){   
            beginShape();
        }
        else {
            beginShape(POINTS);
        }
        for (let i = 0 ; i < iter ; i++){
            let x = data[i][val] * LEN_X;
            let y = i * LEN_Y;

            vertex(x, y);
        }
        endShape();
    }
}

function get_data(){
    tempData = []
    for (let val = 1 ; val <= SIZE ; val++){
        for (let id = 0 ; id < SIZE ; id++){
            if ( val == Arr[id] ){
                tempData.push(id);
                break;
            }
        }
    }
    data.push(tempData);

    print(Arr);
}

function swap(i, j){
    let temp = Arr[i];
    Arr[i] = Arr[j];
    Arr[j] = temp;
}

function algorithm(){
    for (let stepIndex = 0 ; stepIndex < 5 ; stepIndex++){
        let step = Steps[stepIndex];
        for (let index = step ; index < SIZE ; index++){
            let temp = Arr[index];
            for (let i = index ; i >= step && i < SIZE ; i -= step){
                if ( Arr[i-1] <= temp ){
                    break;
                }
                swap(i, i-1);
            }
            get_data();
        }
    }
}

function draw(){
    background(0);
    translate(100, 50);
    output();
    if ( iter < ITER_MAX ){
        iter++;
    }
}