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

    // drawing
    static line(p1, p2){
        line(p1.x, p1.y, p2.x, p2.y);
    }

    draw() {
        ellipse(this.x, this.y, 20);
    }
}