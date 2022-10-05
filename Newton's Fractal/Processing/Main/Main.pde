float HALF_W;
float HALF_H;

void setup() {
    size(1000, 1000);
    background(0);

    HALF_W = width / 2;
    HALF_H = height / 2;

    // Complex[] roots = {
    //     new Complex(1, 0),
    //     new Complex(-0.5, 0.866),
    //     new Complex(-0.5, -0.866),
    // };
    Complex[] roots = {
        new Complex(2, 0),
        new Complex(-2, 0),
        new Complex(0, 1),
        new Complex(0, -1)
    };
    Color[] fade = gradient(new Color(160, 110, 250), new Color(209, 7, 68), roots.length);

    Poly poly = new Poly(roots, "root");
    float boundry = 2;
    int iterations = 20;

    translate(HALF_W, HALF_H);

    int[][] pixel = newton_fractal_colors(poly, roots, boundry, iterations);

    mapPixels(fade, pixel);
    drawRoots(roots, boundry);
}

void drawRoots(Complex[] roots, float boundry){
    fill(0);
    strokeWeight(2);
    for (Complex root : roots) {
        drawComplex(root, boundry);
    }
}

void mapPixels(Color[] colors, int[][] pixel_color) {
    noStroke();
    loadPixels();
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            int index = i * width + j;
            Color c = colors[pixel_color[i][j]];

            pixels[index] = color(c.r, c.g, c.b);
        }
    }
    updatePixels();
}
