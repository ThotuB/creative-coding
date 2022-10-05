function setup() {
    createCanvas(1200, 1200);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    drawAxis();

    stroke(255);
    noFill();

    beginShape();
    for (let t = 0 ; t < 2 * PI; t += 0.01) {
        let x = (2 * cos(t) - cos(2 * t)) * width / 8;
        let y = (2 * sin(t) - sin(2 * t)) * width / 8;

        vertex(x, y)
        print(x, y)
    }
    endShape();

    noLoop();
}

function drawAxis(){
    push()
    stroke(255, 150);
    strokeWeight(2);

    line(-width/2 + 50, 0, width/2 - 50, 0);
    line(0, -height/2 + 50, 0, height/2 - 50);
    pop()
}