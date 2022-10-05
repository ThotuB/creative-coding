public class Particle {
    PVector pos;
    PVector vel;
    PVector acc;

    PVector posPrev;

    float maxSpeed;
    
    Particle(float x, float y, float maxspeed) {
        pos = new PVector(x, y);
        vel = new PVector(0, 0);
        acc = new PVector(0, 0);

        maxSpeed = maxspeed;
        
        posPrev = pos.copy();
    }

    void update() {
        vel.limit(maxSpeed);
        vel.add(acc);
        pos.add(vel);
        acc.mult(0);

        edges();
    }

    void updatePreviousPos() {
        posPrev = pos.copy();
    }

    void display(float time) {
        float val = noise(pos.x * 0.01, pos.y * 0.01);
        float r = pos.x / width * 255;
        float g = pos.y / height * 255;
        float b = 255;

        stroke(r, g, b, ALPHA);
        strokeWeight(1);
        line(pos.x, pos.y, posPrev.x, posPrev.y);

        updatePreviousPos();
    }

    void edges() {
        if (pos.x > width) {
            pos.x = 0;
        }
        else if (pos.x < 0) {
            pos.x = width;    
        }
        else if (pos.y > height) {
            pos.y = 0;
        }
        else if (pos.y < 0) {
            pos.y = height;
        }
        else {
            return;
        }
        updatePreviousPos();
    }
    
    void follow(FlowField flowfield) {
        int cols = flowfield.cols - 1;
        int rows = flowfield.rows - 1;
        int x = floor(map(pos.x, 0, width, 0, cols - 1));
        int y = floor(map(pos.y, 0, height, 0, rows - 1));

        x = ( x < 0 ) ? 0 : x;
        x = ( x > cols ) ? cols : x;
        y = ( y < 0 ) ? 0 : y;
        y = ( y > rows ) ? rows : y;
        
        PVector force = flowfield.vectors[y][x];
        acc.add(force);
    }
}
