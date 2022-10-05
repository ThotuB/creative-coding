let prevArr = [];
let Arr = [];
let indexArr;

let Steps = [7, 4, 3, 2, 1];
let indexSteps = 0;

let SIZE = 40;
let LEN_X = 100;
let LEN_Y = 50;

let iter = 1;
let ITER_MAX = Steps.length * SIZE - Steps.reduce((a, b) => a + b, 0);

let timer = 0;

function setup(){
    createCanvas(LEN_X * (SIZE + 1), LEN_Y * (ITER_MAX + 1) );
    background(0);
    for (let i = 0 ; i < SIZE ; i++){
        Arr[i] = SIZE-i;
    }
    indexArr = Steps[0];
}

function output(){
    if ( iter == 1 || iter == ITER_MAX ){
        for (let index = 0 ; index < SIZE ; index++){
            let col = color(255, 0, Arr[index] * 10);
            fill(col);
            stroke(col);
            circle(index * LEN_X, (iter-1) * LEN_Y, 50);
        }
    }
    else {
        noFill();
        strokeWeight(10);
        let prevX = 0;
        let prevY = (iter-1) * LEN_Y;
        for (let prevIndex = 0 ; prevIndex < SIZE ; prevIndex++){
            let val = prevArr[prevIndex];

            stroke(color(255, 0, val * 10));
            for (let index = 0 ; index < SIZE ; index++){
                if ( val == Arr[index] ){
                    let x = index * LEN_X;
                    let y = prevY + LEN_Y;

                    line(prevX, prevY, x, y);
                    break;
                }
            }
            prevX += LEN_X;
        }
    }
}

function swap(i, j){
    let temp = Arr[i];
    Arr[i] = Arr[j];
    Arr[j] = temp;
}

function algorithm_step(){
    if ( iter > ITER_MAX ){
        return;
    }

    if ( indexArr == SIZE ){
        indexSteps++;
        indexArr = Steps[indexSteps];
    }
    
    let temp = Arr[indexArr];
    for (let i = indexArr ; i > 0 && i < SIZE ; i -= Steps[indexSteps]){
        if ( Arr[i-1] <= temp ){
            break;
        }
        swap(i, i-1);
    }

    output();

    arrayCopy(Arr, prevArr);

    indexArr++;
    iter++;
}

function draw(){
    translate(100, 50);
    if (millis() >= 100 + timer ) {
        algorithm_step();
        timer = millis();
    }
}