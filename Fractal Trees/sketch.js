let lengthGrowth;
let lengthGrowthSlider;

let iterationMax;
let iterationMaxSlider;

let angle;
let angleSlider;

let eps = 0.0001;

let angles = [];

function setup(){
    createCanvas(2000, 1200);
    lengthGrowthSlider = createSlider(0.01, 1, 0.5, 0.01);
    lengthGrowthSlider.position(20, 25);
    iterationMaxSlider = createSlider(1, 16, 10, 1);
    iterationMaxSlider.position(20, 50);
    angleSlider = createSlider(0, PI/2 + eps, PI/3, PI/64);
    angleSlider.position(20, 75);
}

function fractal_tree(x, y, length, angle, iteration){
    if ( length <= 1 || iteration >= iterationMax ){
        ;
    }
    else {
        let xNext = x + length * cos(angle);
        let yNext = y + length * sin(angle);

        line(x, y, xNext, yNext);

        for (let i = 0 ; i < angles.length ; i++){
            fractal_tree(xNext, yNext, length*lengthGrowth, angle + angles[i], iteration+1);
        }
    }
}

function draw(){
    background(0);
    translate(1000, 1000);

    let length = 300;

    lengthGrowth = lengthGrowthSlider.value();
    iterationMax = iterationMaxSlider.value();
    angle = angleSlider.value();
    angles = [angle, -angle];

    stroke(255);
    fractal_tree(0, 0, length, -PI/2, 0);
}