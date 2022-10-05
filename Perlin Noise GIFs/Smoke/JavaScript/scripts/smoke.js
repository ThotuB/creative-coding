class Smoke {
    constructor(pos={'x': 0, 'y': 0}, shape=shape_line, options) {
        this.pos = pos;
        this.shape = shape;
        this.update_options(options);
    }

    update_options(options) {
        this.PARTICLES = options?.particles ?? 200;

        this.NOISE_RADIUS = options?.noise_radius ?? 1.3;
        this.NOISE_FREQ = options?.noise_freq ?? 2;
    
        this.SEED = options?.seed ?? random(10, 1000);
        
        this.STROKE_WEIGHT = options?.stroke_weight ?? random(0.8, 1.8);
        this.STROKE_ALPHA = options?.stroke_alpha ?? random(9, 45);
        
        this.SHAPE_FREQ = options?.shape_freq ?? 0.1 + 0.5 * pow(random(1),2.0);
        this.SHAPE_PHASE = options?.shape_phase ?? random(TWO_PI);
        this.SHAPE_RADIUS = options?.shape_radius ?? random(0.7, 1.15);
        
        this.DISPERSION = options?.dispersion ?? random(10, 120);
    }
    
    show() {
        for (let i = 0; i < this.PARTICLES; i++){
            let t = i / this.PARTICLES;
            let theta = TWO_PI * this.SHAPE_FREQ * t + this.SHAPE_PHASE;
            
            let noise_x = this.NOISE_RADIUS * cos(TWO_PI * (this.NOISE_FREQ * t - time));
            let noise_y = this.NOISE_RADIUS * sin(TWO_PI * (this.NOISE_FREQ * t - time));
            let noise_amp = pow(t, 3.0) * this.DISPERSION;
            
            let x = this.SHAPE_RADIUS * this.shape.x(theta) + noise_amp * (noise(this.SEED + noise_x, noise_y) * 2.0 - 1.0);
            let y = this.SHAPE_RADIUS * this.shape.y(theta) + noise_amp * (noise(2 * this.SEED + noise_x, noise_y) * 2.0 - 1.0);
            
            strokeWeight(this.STROKE_WEIGHT);
            stroke(255, this.STROKE_ALPHA * sin(PI * t));
            // stroke(255, this.STROKE_ALPHA);
            
            point(this.pos.x + x, this.pos.y + y);
        }
    }
}