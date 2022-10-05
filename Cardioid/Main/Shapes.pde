class Shape {
    int radius;
    PVector center;

    int points;
    PVector[] pointsArray;

    Shape(int points) {
        this.points = ( points > 0 ) ? points : 0;

        this.radius = width / 3;
        this.center = new PVector(width / 2, height / 2);
    }

    int det(int x00, int x01, int x10, int x11) {
        return x00 * x11 - x01 * x10;
    }

    void drawLines(Callable callable) {
        stroke(0);
        strokeWeight(2);
        for (int i = 0; i < points; i++) {
            float x1 = pointsArray[i].x;
            float y1 = pointsArray[i].y;

            float x2 = pointsArray[(int)callable.call(i) % points].x;
            float y2 = pointsArray[(int)callable.call(i) % points].y;

            line(x1, y1, x2, y2);
        }
    }
}

class Circle extends Shape {
    Circle(int points) {
        super(points);

        generate();
    }

    void generate() {
        pointsArray = new PVector[points];

        for (int i = 0; i < points; i++) {
            float angle = TWO_PI * i / points;
            
            float x = center.x + radius * cos(angle);
            float y = center.y + radius * sin(angle);

            pointsArray[i] = new PVector(x, y);
        }
    }

    // DRAWING
    void drawCircle() {
        ellipse(center.x, center.y, 2 * radius, 2 * radius);
    }

    void draw(Callable callable) {
        background(0);
        drawCircle();
        drawLines(callable);
    }
}

class Triangle extends Shape {
    Triangle(int points) {
        super(points);

        generate();
    }

    void generate() {
        pointsArray = new PVector[points];

        for (int i = 0; i < points; i++) {
            float angle = TWO_PI * i / points;

            int D = det(
                det(x1, 1, x2, 1), det(y1, 1, y2, 1),
                det(x3, 1, x4, 1), det(y3, 1, y4, 1)
            );
        }
    }
}