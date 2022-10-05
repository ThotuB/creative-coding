let time = 0;
let wave = [];

let xScale = 0.5;
let yScale = 1;
let xOffset = 500;

let drawing;

function setup(){
    createCanvas(2000, 1200);
    wave[0] = [];
    wave[1] = [];
    wave[2] = [];
}

function fourierCircles(time, radius, x, y, iteration, maxIterations){
    if ( iteration == maxIterations ){
        wave[drawing].unshift(y);

        fill(255);
        ellipse(x, y, 10);
        line(x, y, xOffset, y);
    }
    else {
        let coef = 2 * iteration + 1;
        let xNext = x + radius * (4/(coef * PI)) * cos(coef * time);
        let yNext = y + radius * (4/(coef * PI)) * sin(coef * time);

        line(x, y, xNext, yNext);
        ellipse(x, y, 2 * radius * (4/(coef * PI)));


        fourierCircles(time, radius, xNext, yNext, iteration + 1, maxIterations);
    }
}

function draw(){
    background(0);
    translate(400, 200);

    let radius = 100;

    for (drawing = 0 ; drawing < 3 ; drawing ++){
        stroke(255);
        noFill();
        fourierCircles(time, radius, 0, 0, 0, 1 + 10 * drawing * drawing);

        beginShape();
        noFill();
        for (let i = 0 ; i < 1000 ; i++){
            vertex(i * xScale + xOffset, wave[drawing][i] * yScale);
        }
        endShape();
        
        translate(0, 4 * radius);
    } 

    time -= 0.01;
}