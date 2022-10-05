final float R = 10;
final int NUM_POINTS = 1000;
final int n = 250;

final PVector color_left = new PVector(256, 0.58, 0.55);
final PVector color_right = new PVector(256, 0.56, 0.0);

OpenSimplexNoise noise;
float time;
int[][] result;
HeartStroke[] array = new HeartStroke[n];

void setup(){
    size(500, 500, P3D);
    result = new int[width*height][3];
    
    noise = new OpenSimplexNoise();
    for(int i = 0; i < n; i++){
        array[i] = new HeartStroke();
    }
}

void draw_(){
    background(255);
    push();
    translate(width / 2, height / 2);
    
    for(int i = 0; i < n ; i++){
        array[i].show();
    }
    pop();
}