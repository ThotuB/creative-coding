let square1;
let square2;

let collisions = 0;
let digits = 10;
let iters = 10 ** (digits - 1);

function setup(){
    createCanvas(1000, 500);

    iters = min(10 ** 6, iters);

    square1 = new Square(new p5.Vector(250, 0), 0, 50, 1, -5);
    square2 = new Square(new p5.Vector(350, 0), -1, 100, 100 ** (digits-1), 45);
}

function draw(){
    background(0);
    drawAxis();

    for (let i = 0 ; i < iters ; i++) {
        if ( square1.checkCollision(square2) ) {
            collisions++;
        }
    
        square1.update();
        square2.update();
    }

    fill(255);
    textSize(20);
    text('Collisions: ' + str(collisions), width - 300, 45);
    
    translate(50, height-50);
    square1.draw();
    square2.draw();
}

function drawAxis(){
    push();
    stroke(150);
    translate(50, height-50);
    line(-25, 1, width - 75, 1);
    line(-1, 25, -1, 75 - height);
    pop();
}