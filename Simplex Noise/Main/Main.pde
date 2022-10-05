OpenSimplexNoise noise;

float deltaX = 0.01;
float deltaY = 0.01;
float deltaT = 0.05;
float time;

void setup() {
	size(500, 500);

	noise = new OpenSimplexNoise();

	drawNoise();
}

void draw() {
	drawNoise();
}

void drawNoise(){
	loadPixels();
	for (int y = 0 ; y < height ; y++) {
		for (int x = 0 ; x < width ; x++) {
			float val = (float) noise.eval(x * deltaX, y * deltaY, time) * 255;
			float c = map(val, -1, 1, 0, 255);
			
			pixels[x + y * width] = color(c, c, c);
		}
	}
	updatePixels();
	time += deltaT;
}
