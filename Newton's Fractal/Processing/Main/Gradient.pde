class Color {
    public float r;
    public float g;
    public float b;

    public Color(float r, float g, float b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

float lerpValue(float value1, float value2, float t) {
    return value1 + (value2 - value1) * t;
}

Color lerpColor(Color color1, Color color2, float t) {
    float r = round(lerpValue(color1.r, color2.r, t));
    float g = round(lerpValue(color1.g, color2.g, t));
    float b = round(lerpValue(color1.b, color2.b, t));

    return new Color(r, g, b);
}

Color[] gradient(Color color1, Color color2, int steps) {
    Color[] colors = new Color[steps];
    colors[0] = color1;
    
    steps--;
    for (int t = 1; t < steps; t++) {
        colors[t] = lerpColor(color1, color2,(float)t / steps);
    }
    colors[steps] = color2;

    return colors;
}