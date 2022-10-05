class Axis {
    constructor(Xmin, Xmax, Ymin, Ymax, Origin, xDivs, xSubDivs, yDivs, ySubDivs) {
        this.Xmin = Xmin;
        this.Xmax = Xmax;
        this.Ymin = Ymin;
        this.Ymax = Ymax;

        this.width = Xmax - Xmin;
        this.height = Ymax - Ymin;

        this.Origin = Origin;

        this.xDivs = xDivs;
        this.xSubDivs = xSubDivs;   
        this.yDivs = yDivs;
        this.ySubDivs = ySubDivs;
    }

    draw() {
        push();
        stroke(255);
        translate(this.Origin.x, this.Origin.y);
        push();
        line(this.Xmin - 25, 0, this.Xmax + 25, 0); // x-axis
        line(0, this.Ymin + 25, 0, this.Ymax - 25); // y-axis
        pop();
        // x divs and sub-divs
        push();
        translate(this.Xmin, 0);
        line(0, -15, 0, 15);
        let div = (this.width) / (this.xDivs * this.xSubDivs);
        for (let i = 0 ; i < this.xDivs ; i++) {
            for (let j = 0 ; j < this.xSubDivs - 1 ; j++) {
                translate(div, 0);
                line(0, -5, 0, 5);
            }
            translate(div, 0);
            line(0, -15, 0, 15);
        }
        pop();
        // y divs and sub-divs
        push();
        translate(0, this.Ymin);
        line(-15, 0, 15, 0);
        div = (this.height) / (this.yDivs * this.ySubDivs);
        for (let i = 0 ; i < this.yDivs ; i++) {
            for (let j = 0 ; j < this.ySubDivs - 1 ; j++) {
                translate(0, div);
                line(-5, 0, 5, 0);
            }
            translate(0, div);
            line(-15, 0, 15, 0);
        }
        pop();
        pop();
    }
}