class CubicBezier {
    constructor(p0, p1, p2, p3, center) {
        this.pts = [p0, p1, p2, p3];
        this.colors = [color(200, 0, 0), color(0, 200, 0), color(0, 0, 200), color(200, 200, 0)];

        this.c = center;
    }

    lerp(t) {
        let tt = t * t;
        let ttt = tt * t;

        let w0 = -ttt + 3 * tt - 3 * t + 1;
        let w1 = 3 * ttt - 6 * tt + 3 * t;
        let w2 = -3 * ttt + 3 * tt;
        let w3 = ttt;

        return [w0, w1, w2, w3];
    }

    draw(t, mode) {
        const drawVecsFromCenter = (vecs) => {
            for (let i = 0; i < 4; i++) {
                stroke(this.colors[i]);
                Point.line(this.c, vecs[i]);
            }
        }

        const drawVecsAdded = (vecs) => {
            push()
            let p = vecs[0].add(vecs[1]).add(vecs[2]).add(vecs[3]);
            for (let i = 0; i < 4; i++) {
                stroke(this.colors[i]);
                Point.line(new Point(0, 0), vecs[i]);
                translate(vecs[i].x, vecs[i].y);
            }
            pop();
            p.draw();
        }

        let weights = this.lerp(t);
        this.drawWeights(weights);

        let vecs = []
        for (let i = 0; i < 4; i++) {
            vecs.push(this.pts[i].mult(weights[i]));
        }

        if ( mode ) {
            drawVecsFromCenter(vecs);
        }
        else {
            drawVecsAdded(vecs);
        }
    }

    drawWeights(weights) {
        push();
        translate(-400, 550);
        textSize(40);
        textAlign(LEFT, TOP);
        for (let i = 0; i < 4; i++) {
            stroke(this.colors[i]);
            fill(this.colors[i]);

            // draw text
            strokeWeight(1);
            text("W" + i, 0, 10);
            // draw boxes
            strokeWeight(5);
            fill(0);
            rect(80, 5, 600, 50, 15);
            fill(this.colors[i]);
            rect(80, 5, weights[i] * 600, 50, 15);
            // draw weights
            strokeWeight(1);
            text(round(weights[i] * 100) / 100, 700, 10);


            translate(0, 60);
        }
        pop();
    }

    drawInputs(){
        const drawLines = () => {
            Point.line(this.pts[0], this.pts[1]);
            Point.line(this.pts[2], this.pts[3]);
        }

        const drawPoints = () => {
            for (let i = 0; i < 4; i++) {
                stroke(this.colors[i]);
                this.pts[i].draw();
            }

            stroke(255, 255, 255);
            this.c.draw();
        }

        stroke(75);
        drawLines();
        drawPoints();
    }
}