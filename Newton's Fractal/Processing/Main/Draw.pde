void drawComplex(Complex c, float boundry) {
    float x_draw = map(c.re, -boundry, boundry, -HALF_W, HALF_W);
    float y_draw = map(c.im, -boundry, boundry, HALF_H, -HALF_H);

    ellipse(x_draw, y_draw, 5, 5);
}

void lineComplex(Complex c1, Complex c2, float boundry) {
    float x1 = map(c1.re, -boundry, boundry, -HALF_W, HALF_W);
    float y1 = map(c1.im, -boundry, boundry, HALF_H, -HALF_H);

    float x2 = map(c2.re, -boundry, boundry, -HALF_W, HALF_W);
    float y2 = map(c2.im, -boundry, boundry, HALF_H, -HALF_H);

    line(x1, y1, x2, y2);
}

void drawPoly(Poly poly, float boundry, int shape) {
    float x_min = -boundry;
    float x_max = boundry;

    float step = (x_max - x_min) / width;

    noFill();
    beginShape(shape);
    for (float x = x_min; x < x_max; x += step) {
        float y = poly.eval(new Complex(x, 0)).re;

        float x_draw = map(x, -boundry, boundry, -HALF_W, HALF_W);
        float y_draw = map(y, -boundry, boundry, HALF_H, -HALF_H);

        vertex(x_draw, y_draw);
    }
    endShape();
}

void drawGrid(float boundry) {
    stroke(255);
    strokeWeight(2);

    line(-HALF_W, 0, HALF_W, 0);
    line(0, -HALF_H, 0, HALF_H);

    float step = width / (2 * boundry);
    for (float i = -HALF_W + step; i < HALF_W; i += step) {
        line(i, -10, i, 10);
        line(-10, i, 10, i);
    }
}