int samplesPerFrame = 5;
int numFrames = 60;                
float shutterAngle = 0.8;

float c;

boolean recording = true;

float ease(float p) {
    return 3*p*p - 2*p*p*p;
}

float ease(float p, float g) {
    if (p < 0.5) {
        return 0.5 * pow(2*p, g);
    } else {
        return 1 - 0.5 * pow(2*(1 - p), g);
    }
}

float mn = .5*sqrt(3), ia = atan(sqrt(.5));

void push() {
    pushMatrix();
    pushStyle();
}

void pop() {
    popStyle();
    popMatrix();
}
 
void draw() {
    if (!recording) {
        time = mouseX*1.0/width;
        c = mouseY*1.0/height;
        if (mousePressed){
            println(c);
        }
        draw_();
        return;
    }

    for (int i=0; i<width*height; i++){
        for (int a=0; a<3; a++){
            result[i][a] = 0;
        }
    }
    for (int sa=0; sa<samplesPerFrame; sa++) {
        time = map(frameCount-1 + sa*shutterAngle/samplesPerFrame, 0, numFrames, 0, 1);
        draw_();
        loadPixels();
        for (int i=0; i<pixels.length; i++) {
            result[i][0] += pixels[i] >> 16 & 0xff;
            result[i][1] += pixels[i] >> 8 & 0xff;
            result[i][2] += pixels[i] & 0xff;
        }
    }

    loadPixels();
    for (int i=0; i<pixels.length; i++)
        pixels[i] = 0xff << 24 | 
            int(result[i][0]*1.0/samplesPerFrame) << 16 | 
            int(result[i][1]*1.0/samplesPerFrame) << 8 | 
            int(result[i][2]*1.0/samplesPerFrame);
    updatePixels();

    saveFrame("/gif/fr###.gif");
    println(frameCount,"/",numFrames);
    if (frameCount==numFrames)
        exit();
}
