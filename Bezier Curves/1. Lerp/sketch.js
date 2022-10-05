points = []

time = 0
delta = 0.01

setup = () => {
    createCanvas(1200, 1200);
    background(0);

    points = [
        new Point(50, height-50),
        new Point(width-50, 50),
    ]
}

draw = () => {
    background(0);
    // points
    for (point of points){
        point.draw();
    }
    // lines
    for (i = 0; i < points.length-1; i++){
        Point.line(points[i], points[i+1]);
    }
    // interpolation
    for (i = 0; i < points.length-1; i++){
        p = Point.lerp(points[i], points[i+1], time);
        p.draw();
    }

    timeWarp();
}

timeWarp = () => {
    time += delta;
    if (time > 1 || time < 0){
        delta = -delta;
    }
}
