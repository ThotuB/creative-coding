class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // operators
    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    sub(other) {
        return new Point(this.x - other.x, this.y - other.y);
    }

    mult(scalar) {
        return new Point(this.x * scalar, this.y * scalar);
    }

    // functions
    static lerp(p1, p2, t) {
        return p1.mult(1 - t).add(p2.mult(t));
    }

    static lerpPoints(ps, t) {
        if ( ps.length == 1 ) {
            return ps[0];
        }

        let newPoints = []
        for (let i = 0 ; i < ps.length - 1 ; i++) {
            let p = Point.lerp(ps[i], ps[i + 1], t)
            newPoints.push(p)
        }
        
        return Point.lerpPoints(newPoints, t)
    }

    // drawing
    static line(p1, p2){
        line(p1.x, p1.y, p2.x, p2.y);
    }

    draw() {
        ellipse(this.x, this.y, 20);
    }
}