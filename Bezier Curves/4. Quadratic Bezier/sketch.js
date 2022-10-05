let bezier;

let time = 0
let delta = 0.01

setup = () => {
    createCanvas(1200, 1200);
    background(0);
    fill(0)
    strokeWeight(4)

    bezier = new QuadBezier(
        new Point(100, 100),
        new Point(200, 900),
        new Point(1000, 900)
    );

}

draw = () => {
    background(0);
    bezier.drawInputs();
    bezier.drawCurve(0, time);

    time += delta;
    if (time > 1) {
        time = 0;
    }
}

