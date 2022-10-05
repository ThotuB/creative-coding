const ITER_MAX = 50;
const ORDER = 3;

let CC_LENGTH;
let SIDE_LENGTH;

let BIG;
let SMOL;

let value = 0;

// FRACTAL FUNCTIONS
function fractal(shape, phaseChange, iter=0){
    if ( iter <= ITER_MAX && shape.sideLen >= 0 ){
        shape.show();

        let newLength = shape.sideLen - SIDE_LENGTH/ITER_MAX;
        let newPhase = shape.phase + phaseChange;

        let newShape = new Shape(ORDER, width/2, height/2, newLength, newPhase);

        fractal(newShape, phaseChange, iter+1);
    }
}

function setup(){
    createCanvas(1000, 1000);
    BIG = PI/3072;
    SMOL = PI/32768;

    CC_LENGTH = min(width, height)/2 - 10;
    SIDE_LENGTH = CC_LENGTH * ( 2 * sin(PI / ORDER) );

    let pause_resume = select("#playpause_button");
    pause_resume.changed(p => {
        if (pause_resume.checked()) {
            noLoop();
        } else {
            loop();
        }
    });

    let reset = select("#reset_label");
    reset.mousePressed(p => {
        value = 0;
        draw();
    });
}

function draw(){
    background(0);

    let shape = new Shape(ORDER, width/2, height/2, SIDE_LENGTH, -PI/2);

    fractal(shape, value);
    value += SMOL;
}
