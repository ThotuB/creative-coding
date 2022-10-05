float heart_x(float t){
    return R * 16 * pow(sin(t), 3);
}

float heart_y(float t){
    return R * (-13*cos(t) + 5*cos(2*t) + 2*cos(3*t) + cos(4*t));
}

PVector hsl_to_rgb(PVector hsl){
    float h = hsl.x;
    float s = hsl.y;
    float l = hsl.z;

    float C = (1 - abs(2 * l - 1)) * s;
    float X = C * (1 - abs((h / 60) % 2 - 1));
    float M = l - C/2;

    float r1 = 0f, g1 = 0f, b1 = 0f;
    if(h >= 0 && h < 60){
        r1 = C;
        g1 = X;
        b1 = 0;
    }else if(h >= 60 && h < 120){
        r1 = X;
        g1 = C;
        b1 = 0;
    }else if(h >= 120 && h < 180){
        r1 = 0;
        g1 = C;
        b1 = X;
    }else if(h >= 180 && h < 240){
        r1 = 0;
        g1 = X;
        b1 = C;
    }else if(h >= 240 && h < 300){
        r1 = X;
        g1 = 0;
        b1 = C;
    }else if(h >= 300 && h < 360){
        r1 = C;
        g1 = 0;
        b1 = X;
    }

    return new PVector((r1 + M) * 255, (g1 + M) * 255, (b1 + M) * 255);
}

class HeartStroke {
    static final float NOISE_RADIUS = 1.3f;
    static final int NOISE_FREQ = 2;

    final float SEED = random(10, 1000);
    
    final float STROKE_WEIGHT = random(0.8, 1.8);
    final float STROKE_ALPHA = random(9, 45);
    
    final float HEART_FREQ = 0.1 + 0.5 * pow(random(1), 2.0);
    final float HEART_PHASE = random(TWO_PI);
    final float HEART_RADIUS = random(0.5, 1.15);
    
    final float DISPLACEMENT = random(10, 120);
    
    void show(){
        PVector rgb1 = hsl_to_rgb(color_left);
        PVector rgb2 = hsl_to_rgb(color_right);
        for (int i = 0; i < NUM_POINTS; i++){
            float t = (float) i / NUM_POINTS;
            float theta = TWO_PI * HEART_FREQ * t + HEART_PHASE;
            
            float noise_x = NOISE_RADIUS * cos(TWO_PI * (NOISE_FREQ * t - time));
            float noise_y = NOISE_RADIUS * sin(TWO_PI * (NOISE_FREQ * t - time));
            float noise_amp = pow(t, 3.0) * DISPLACEMENT;
            
            float x = HEART_RADIUS * heart_x(theta) + noise_amp * (float)noise.eval(SEED + noise_x, noise_y);
            float y = HEART_RADIUS * heart_y(theta) + noise_amp * (float)noise.eval(2 * SEED + noise_x, noise_y);
            
            // float color_t = map(x, -width/3, width/3, 0, 1);
            // if (color_t < 0) color_t = 0;
            // if (color_t > 1) color_t = 1;
            // PVector hsl = PVector.lerp(color_left, color_right, color_t);
            // PVector rgb = hsl_to_rgb(hsl);
            if (HEART_PHASE > PI) {
                stroke(rgb1.x, rgb1.y, rgb1.z, STROKE_ALPHA * sin(PI * t));
            } else {
                stroke(rgb2.x, rgb2.y, rgb2.z, STROKE_ALPHA * sin(PI * t));
            }
            strokeWeight(STROKE_WEIGHT);
            // stroke(rgb.x, rgb.y, rgb.z, STROKE_ALPHA * sin(PI * t));
            
            point(x,y);
        }
    }
}