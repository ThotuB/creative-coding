final int SCALE = 4;

final int ITER_MAX = 5000;

float offR, offG, offB;
int time = 0;

ArrayList<Color> colors = new ArrayList<Color>();

void setup() {
    size(1200, 1200, P3D);
    background(0);

    time = millis();
    offR = findColorInNoise(r);
    offB = findColorInNoise(b);
    clock("Find Color");

    colors.add(new Color(r, g, b)); // |z| > 2
    colors.add(new Color(r, g, b)); // |z| < 2
    generateColors();
    clock("Generate Colors");

    drawMandelbrot();
    clock("Mandelbrot");
}

void draw() {}

void drawMandelbrot() {
    for (int y = 0; y < height; y += SCALE) {
        for (int x = 0; x < width; x += SCALE) {
            float re = map(x, 0, width, borderL, borderR);
            float im = map(y, 0, height, borderU, borderD);

            int iterFail = Mandelbrot.iterate(re, im, ITER_MAX); // iteration at which |z| > 2

            if ( iterFail == ITER_MAX ) {
                continue;
            }

            plot(x, y, iterFail);
        }
    }
}

void plot(int x, int y, int iter){
    Color c = colors.get(iter);
    stroke(c.r, c.g, c.b);
    fill(c.r, c.g, c.b);

    /// SQUARES
    // noStroke();
    // rect(x, y, SCALE, SCALE);

    /// LINE \
    // line(x, y, x + SCALE, y + SCALE);

    /// Xs
    // float o = SCALE/5.0;
    // line(x + o, y + o, x + SCALE - o , y + SCALE - o);
    // line(x + o, y + SCALE - o, x + SCALE - o, y + o);

    /// CIRCLES
    // ellipse(x, y, SCALE-2, SCALE-2);

    /// RANDOM POINTS
    float factor = 0.1;
    int density = floor((float)Math.exp(-factor * iter) * SCALE * SCALE);
    for (int i = 0 ; i < density ; i++) {
        point(x + random(SCALE), y + random(SCALE));
    }
}

void generateColors(){
    for (int i = 0 ; i < ITER_MAX ; i++) {
        colors.add(
            new Color(
                noise(i * 0.2f + offR) * 155 + 100, 
                g,
                noise(i * 0.1f + offB) * 155 + 100
            )
        );
    }
}

void clock(String text){
    time = millis() - time;
    System.out.println(text + ": " + (time/1000f) + "s");
}