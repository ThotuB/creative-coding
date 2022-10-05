let freq;
let axis1, axis2, axis3;

let phase;
let cycles = 0;

function setup(){
    createCanvas(1920, 1080);
    phase = PI / 2;

    setupAxes();
    freq = new Freqs(axis1, axis2, axis3, 2, 3);
}

function draw(){
    background(0);  
    axis1.draw();
    axis2.draw();
    axis3.draw();
    freq.drawWaveAxis1();
    freq.drawWaveAxis2(cycles);
    freq.drawWaveAxis3();

    if ( cycles > 5 ) {
        freq.reset();
        cycles = 0;
    }

    cycles += 0.001;
}

function setupAxes() {
    axis1 = new Axis(
        0, width - 100,
        0, 50 - height/3,
        new Point(50, height/3),
        4, 4,
        1, 2,
    );

    axis2 = new Axis(
        -height/4, height/4,
        height/4, -height/4,
        new Point(height/4 + 50, 2*height/3),
        2, 2,
        2, 2
    );

    axis3 = new Axis(
        0, 3*width/5,
        height/4, -height/4,
        new Point(2*width/5 - 50, 2*height/3),
        5, 1,
        2, 2
    );
}