int iterMax = 2;

int colorIter = 1;
int colorDelta;

float rOff, gOff, bOff;

ArrayList<Color> colors = new ArrayList<Color>();

void setup() {
    size(1200, 1200, P3D);

    rOff = findColorInNoise(r, 0);
    // bOff = findColorInNoise(b, 1000);


    colors.add(new Color(random(r-10, r+10), random(g-5, g+5), random(b-10,b+10)));
    generateColors(iterMax);
    drawMandelbrot();
}

void draw() {
}

void mousePressed() {
    switch ( mouseButton ){
        case LEFT:
            iterMax++;
            generateColors(1);
            drawMandelbrot();
            break;
    }
}

void mouseWheel(MouseEvent event) {

}

void drawMandelbrot() {
    loadPixels();
    for (int i = 0 ; i < height ; i++) {
        for (int j = 0 ; j < width ; j++) {
            int x = j - width/2;
            int y = height/2 - i;

            float xCoord = map(x, -width/2, width/2, borderL, borderR);
            float yCoord = map(y, -height/2, height/2, borderD, borderU);

            // int iterFail = Mandelbrot.compute(new Complex(xCoord, yCoord), iterMax, 2);
            int iterFail = MandelbrotCreepy.compute(xCoord, yCoord, iterMax);
            
            int index = i * width + j;
            if ( iterFail == -1 ) {
                pixels[index] = color(0, 0, 0);
                continue;
            }
            Color c = colors.get(iterFail);
            pixels[index] = color(c.r, c.g, c.b);

            //if (millis() % 100 == 0){
            //    System.out.println("Progress: " + (((float)index)/(width * height) * 100) + "%");
            //}
        }
    }
    updatePixels();
}

void generateColors(int size){
    for (int i = 0 ; i < size ; i++) {
        colors.add(new Color(noise(colorIter * 0.2f + rOff) * 255, g, b));//noise(colorIter * 0.1f + bOff) * 255));
        colorIter++;
    }
}

float findColorInNoise(int val, int off) {
    float valFound;
    int x = off;

    do {
        valFound = noise(x * 0.01f) * 255;
        x++;
    }while ( abs(val - valFound) > 1 );

    return x * 0.01f;
}
