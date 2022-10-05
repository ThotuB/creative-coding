let bezier;
let center;

let time = 0
let delta = 0.004

let mode = false;

setup = () => {
    createCanvas(1200, 1200);
    background(0);
    fill(0)
    strokeWeight(4)

    center = new Point(600, 400);

    bezier = new CubicBezier(
        new Point(-500, -300),
        new Point(-300, 400),
        new Point(300, 400),
        new Point(500, -300),
        new Point(0, 0)
    );

}

draw = () => {
    translate(center.x, center.y)
    background(0);
    bezier.drawInputs();
    bezier.draw(time, mode);

    time += delta;
    if (time > 1 || time < 0) {
        delta = -delta;
    }
}

