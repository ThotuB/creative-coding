class QuadBezier {
    constructor(p0, p1, p2) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;

        this.getCurve(0.01);
    }

    lerp(t) {
        let tt = t * t;

        let p0calc = this.p0.mult(tt - 2 * t + 1);
        let p1calc = this.p1.mult(-2 * tt + 2 * t);
        let p2calc = this.p2.mult(tt);

        return p0calc.add(p1calc).add(p2calc);
    }

    getCurve(delta) {
        this.curve = [];
        let t = 0;

        while (t <= 1) {
            this.curve.push(this.lerp(t));
            t += delta;
        }
    }

    drawPoints() {
        this.p0.draw();
        this.p1.draw();
        this.p2.draw();
    }

    drawLines() {
        Point.line(this.p0, this.p1);
        Point.line(this.p1, this.p2);
    }

    drawInputs(){
        stroke(75);
        this.drawLines();
        this.drawPoints();
    }

    drawCurve(timeStart = 0, timeStop = 1) {
        stroke(255);
        beginShape(LINES);
        let start = timeStart * this.curve.length;
        let stop = timeStop * this.curve.length;
        for (let i = start; i < stop; i++) {
            vertex(this.curve[i].x, this.curve[i].y);
        }
        endShape();
    }
}