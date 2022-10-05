public class Color {
    float r, g, b;

    Color(float r, float g, float b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    Color(float val) {
        this.r = val;
        this.g = val;
        this.b = val;
    }
}

float findColorInNoise(int val) {
    float valFound;
    int x = 0;

    do {
        valFound = noise(x * 0.01f) * 255;
        x++;
    }while ( abs(val - valFound) > 1 );

    return x * 0.01f;
}    
