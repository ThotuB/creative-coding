let points = []

let time = 0
let delta = 0.01

setup = () => {
    createCanvas(1200, 1200);
    background(0);
    stroke(255);
    strokeWeight(4)

    for (let i = 0 ; i < 5; i++){
        points.push(new Point(random(width), random(height)));
    }

    reset();
}

draw = () => {
    reset()
    // interpolation
    let p1 = Point.lerpPoints(points, time);
    time += delta;
    let p2 = Point.lerpPoints(points, time);
    
    Point.line(p1, p2)

    
    if ( time > 1 ){
        time = 0;
    }
}

reset = () => {
    background(0);
    drawLines();
    drawPoints();
}

drawPoints = () => {
    for (point of points){
        point.draw();
    }
}

drawLines = () => {
    for (let i = 0; i < points.length-1; i++){
        Point.line(points[i], points[i+1]);
    }
}

