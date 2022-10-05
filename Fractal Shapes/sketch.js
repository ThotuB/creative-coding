let ITER_MAX = 2;
const ORDER = 3;

const BCKGRND = 0; 
const STRK = 255;

let CC_LENGTH;
let SIDE_LENGTH;

let speed;
let value = 0.011;

// FRACTAL FUNCTIONS
function fractal(shape, phaseChange, iter=0){
    if ( iter <= ITER_MAX && shape.sideLen >= 0 ){
        shape.show();

        let newLength = shape.sideLen/1.01;// - SIDE_LENGTH/ITER_MAX;
        let newPhase = shape.phase + phaseChange;

        let newShape = new Shape(shape.order, width/2, height/2, newLength, newPhase);

        fractal(newShape, phaseChange, iter+1);
    }
}

function koch(shape, iter=1){
    if ( iter <= ITER_MAX ) {
        shape.show();

        let newLength = shape.sideLen/3;

        let dist = shape.icLen + calc_icr(newLength, shape.order);
        let phase = shape.intAng/2;

        for (let i = 0 ; i < shape.order && !( iter > 1 && i >= shape.order-1 ) ; i++){
            let angle = shape.intAng * (i+2) + shape.phase + phase;

            let newX = shape.center.x + cos(angle) * dist; 
            let newY = shape.center.y + sin(angle) * dist;
            
            let newShape = new Shape(shape.order, newX, newY, newLength, angle - phase + shape.extAng);

            koch(newShape, iter+1);
        }
    }
}

function sierpinski(shape, iter=1){
    if ( iter <= ITER_MAX ) {
        shape.show();

        let newLength = shape.sideLen/2;

        let dist = shape.icLen + calc_ccr(newLength, shape.order);

        for (let i = 0 ; i < shape.order ; i++){
            let angle = shape.intAng * (i+2) + shape.phase + PI;

            let newX = shape.center.x + cos(angle) * dist; 
            let newY = shape.center.y + sin(angle) * dist;
            
            let newShape = new Shape(shape.order, newX, newY, newLength, shape.phase);

            sierpinski(newShape, iter+1);
        }
    }
}

function broken_koch(shape, iter=1){
    if ( iter <= ITER_MAX ) {
        shape.show();
        //shape.show_dir();

        let newLength = shape.sideLen/3;

        let dist = shape.ccLen/2.5;// calc_ccr(newLength, shape.order);

        for (let i = 0 ; i < shape.order ; i++){
            let angle = shape.extAng * (i-2) + shape.phase;

            let newX = shape.center.x + cos(shape.phase - shape.extAng) * dist + cos(angle) * dist; 
            let newY = shape.center.y + sin(shape.phase - shape.extAng) * dist + sin(angle) * dist;
            
            let newShape = new Shape(shape.order, newX, newY, newLength, shape.phase - shape.extAng);

            broken_koch(newShape, iter+1);
        }
    }
}

function setup(){
    createCanvas(1500, 1500);
    background(BCKGRND);
    noLoop();

    CC_LENGTH = min(width, height)/2 - 10;
    //SIDE_LENGTH = CC_LENGTH * ( 2 * sin(PI / ORDER) );
    SIDE_LENGTH = 1200;


    let pauseIN = createButton("PAUSE");
    pauseIN.mousePressed(p => {
        noLoop();
    });

    let playIN = createButton("PLAY");
    playIN.mousePressed(p => {
        loop();
    });

    let resetIN = createButton("RESET");
    resetIN.mousePressed(p => {
        value = 0;
        draw();
    });

    let speedIN = createSlider(10, 15, 15, 1);
    speed = PI / (Math.pow(2, speedIN.value()));
    speedIN.input(p => {
        speed = PI / (Math.pow(2, speedIN.value()));
    });

    let prevIN = createButton("<");
    prevIN.mousePressed(p => {
        ITER_MAX--;
        draw();
    });
    let nextIN = createButton(">");
    nextIN.mousePressed(p => {
        ITER_MAX++;
        draw();
    });
}

function draw(){
    background(BCKGRND);

    let shape = new Shape(ORDER, width/2, height/2+100, SIDE_LENGTH, -PI/2);
    broken_koch(shape);

    //value += speed;
}
