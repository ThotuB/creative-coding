const BG_COLOR = 0
const SPEED = 50;

const NUM_POINTS = 50
let points = []

function setup() {
    createCanvas(800, 800);
    background(BG_COLOR);

    for (let i = 0; i < NUM_POINTS; i++) {
        points.push(new Point());
    }
}

function draw() {
    loadPixels();
    for (let pass = 0 ; pass < SPEED; pass++) {
        for (let i = 0; i < points.length; i++) {
            points[i].move();
            points[i].drawPixel();
        }
    }
    updatePixels();
}