let walkers = [];

let offStep = 0.005;
let timeStep = 0.01;
let time = 0;

function setup() {
    createCanvas(500, 500);
    background(0);
    noiseDetail(24);
}

function draw() {
    loadPixels();
    for (let i = 0 ; i < height ; i++) {
        for (let j = 0 ; j < width ; j++) {
            let index = (i * width + j) * 4;
            let color = noise(i * offStep, j * offStep, time) * 255;

            pixels[index + 0] = color;
            pixels[index + 1] = color;
            pixels[index + 2] = color;
            pixels[index + 3] = 255;
        }
    }
    updatePixels();
    time += timeStep;
}