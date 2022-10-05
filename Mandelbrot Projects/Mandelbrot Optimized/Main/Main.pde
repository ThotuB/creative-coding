final int ITER_MAX = 100000;

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
    loadPixels();
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            float re = map(x, 0, width, borderL, borderR);
            float im = map(y, 0, height, borderU, borderD);

            int iterFail = Mandelbrot.iterate(re, im, ITER_MAX); // iteration at which |z| > 2

            if ( iterFail == ITER_MAX ) {
                continue;
            }

            int index = y * width + x;
            Color c = colors.get(iterFail);
            pixels[index] = color(c.r, c.g, c.b);
        }
    }
    updatePixels();
}

void generateColors(){
    for (int i = 0 ; i < ITER_MAX ; i++) {
        colors.add(
            new Color(
                noise(i * 0.1f + offR) * 255, 
                g,
                noise(i * 0.2f + offB) * 255
            )
        );
    }
}

void clock(String text){
    time = millis() - time;
    System.out.println(text + ": " + (time/1000f) + "s");
}