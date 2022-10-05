import java.util.Iterator;

final int ITER_MAX = 100;

float off;
int time = 0;

ArrayList<Color> colors = new ArrayList<Color>();
ArrayList<MandelPoint> points;

void setup() {
    size(800, 800);
    background(0);
    points = new ArrayList<MandelPoint>(width * height);

    time = millis();
    off = findColorInNoise(r);
    clock("Find Color");

    colors.add(new Color(r, g, b)); // |z| > 2
    colors.add(new Color(r, g, b)); // |z| < 2
    generateColors();
    clock("Generate Colors");

    generatePoints();
    clock("Generate Points");
    drawMandelbrot();
    clock("Mandelbrot");
}

void draw() {}

void drawMandelbrot() {
    loadPixels();
    Iterator<MandelPoint> it = points.iterator();
    while ( it.hasNext() ) {
        MandelPoint point = it.next();

        int iterFail = Mandelbrot.iterate(point.z, point.c, ITER_MAX); // iteration at which |z| > 2

        if ( iterFail == ITER_MAX ) {
            continue;
        }

        int index = point.y * width + point.x;
        Color c = colors.get(iterFail);
        pixels[index] = color(c.r, c.g, c.b);
        it.remove();
    }
    updatePixels();
}

void generatePoints() {
    for (int y = 0 ; y < height ; y++) {
        for (int x = 0 ; x < width ; x++) {
            float re = map(x, 0, width, borderL, borderR);
            float im = map(y, 0, height, borderU, borderD);

            if ( (re + 1)*(re + 1) + im*im <= (1.0/16) ) {
                continue;
            }
            float q = (re - 1.0/4)*(re - 1.0/4) + im*im;
            if ( q*(q + (re - 1.0/4)) <= 1.0/4 * im*im ){
                continue;
            }

            Complex c = new Complex(re, im);

            points.add(new MandelPoint(x, y, c));
        }
    }
}

void generateColors(){
    for (int i = 0 ; i < ITER_MAX ; i++) {
        colors.add(
            new Color(
                noise(i * 0.2f) * 255, 
                g,
                noise(i * 0.1f + ITER_MAX) * 255
            )
        );
    }
}

void clock(String text){
    time = millis() - time;
    System.out.println(text + ": " + (time/1000f) + "s");
}