let particles = [];

let rows;
let cols;

let flowField;

function setup() {
    let canv = createCanvas(500, 500);
    background(0);

    rows = floor(height / scale);
    cols = floor(width / scale);
    
    flowField = new FlowField(rows, cols);
    createParticles();
    
    // directions = make2DNoiseArray(0, 0);
    // magnitudes = make2DNoiseArray(cols, rows);

    canv.mouseClicked( () => {
        walkers.push(new Walker(mouseX, mouseY));
    });
}

function draw() {
    // background(0);

    for (let y = 0 ; y < rows ; y++) {
        for (let x = 0 ; x < cols ; x++) {
            let angle = noise(x * offStep, y * offStep, time) * TWO_PI * 4;
            let vec = p5.Vector.fromAngle(angle).setMag(1);

            flowField.set(y, x, vec);
            // flowField.show(y, x);
        }
    }
    time += deltaTime;

    for (let particle of particles) {
        particle.update();
        particle.show();
        particle.flow(flowField);
    }
}

function createParticles(){
    for (let i = 0 ; i < size ; i++) {
        particles.push( new Particle(random(width), random(height)) );
    }
}

function play(){
    loop();
    draw();
}

function pause(){
    noLoop();
}