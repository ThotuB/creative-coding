public class FlowField {
    OpenSimplexNoise noise = new OpenSimplexNoise();
    PVector[][] vectors;
    int cols, rows;

    int scale;
    
    FlowField(int resolution) {
        scale = resolution;
        cols = floor(width / resolution);
        rows = floor(height / resolution);

        vectors = new PVector[cols][rows];
    }

    void update(float time) {
        for (int y = 0; y < rows; y++) {
            for (int x = 0; x < cols; x++) {
                float angle = (float) noise.eval(x * DELTA_OFF, y * DELTA_OFF, time) * TWO_PI * 4;
                
                PVector vec = PVector.fromAngle(angle).setMag(1);

                vectors[y][x] = vec;
            }
        }
    }

    void display() {
        for (int y = 0; y < rows; y++) { 
            for (int x = 0; x < cols; x++) {
              PVector vec = vectors[y][x];
              
              stroke(255, 100);
              strokeWeight(1);

              pushMatrix();
              translate(x * scale, y * scale);
              rotate(vec.heading());
              line(0, 0, scale, 0);
              popMatrix();
            }
        }
    }
}