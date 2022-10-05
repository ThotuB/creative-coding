final int WIDTH = 1000;
final int HEIGHT = 500;
final int NUM_POINTS = 1000;
final int SEED = 5345;

final float RADIUS = 1.5;
final int PERIOD = 4;
final int SPEED = 3;
final int JIGGLE = 15;

final int DELTA_X = 40;
final int DELTA_Y = 25;

OpenSimplexNoise noise;
float time = 0;

void settings() {
    size(WIDTH, HEIGHT, P2D);
}

void setup() {
    noise = new OpenSimplexNoise();

    noFill();
    stroke(255, 75);
    strokeWeight(2);
}

void draw() {
    background(0);

    for (int i = 0; i < NUM_POINTS; i++) {
        float t = i / (float) NUM_POINTS;
        float angle = (t * PERIOD - time) * TWO_PI;

        float noise_x = RADIUS * cos(angle);
        float noise_y = RADIUS * sin(angle);

        float dx = (float) noise.eval(SEED + noise_x, noise_y, JIGGLE * t);
        float dy = (float) noise.eval(2 * SEED + noise_x, noise_y, JIGGLE * t);

        float x = t * WIDTH + dx * DELTA_X;
        float y = HEIGHT / 2 + dy * DELTA_Y;

        point(x, y);
    }

    time += 0.001 * SPEED;

    if (time > 1) {
        time = 0;
    }
}

