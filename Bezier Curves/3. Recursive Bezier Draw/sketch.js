let points = []
curvePoints = []

let time = 0
let delta = 0.01

setup = () => {
    createCanvas(1200, 1200);
    background(0);
    fill(0)
    strokeWeight(4)

    for (let i = 0 ; i < 5; i++){
        points.push(new Point(random(width), random(height)));
    }

    reset();
}

draw = () => {
    reset()
    // interpolation
    let p = Point.lerpPoints(points, time);
    
    curvePoints.push(p);
    drawCurve();

    time += delta;
    if ( time > 1 ){
        time = 0;
        curvePoints = [];
    }
}

reset = () => {
    background(0);
    stroke(50)
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

drawCurve = () => {
    stroke(255);
    beginShape(LINES);
    for (let i = 0; i < curvePoints.length; i++){
        vertex(curvePoints[i].x, curvePoints[i].y);
    }
    endShape();
}

