let particle_slider;

let noise_radius_slider;
let noise_freq_slider;

let stroke_weight_slider;
let stroke_alpha_slider;

let shape_freq_slider;
let shape_phase_slider;
let shape_radius_slider;

let displacement_slider;

class Slider {
    constructor(name, pos, settings) {
        this.name = name;
        this.pos = pos;
        this.settings = settings;

        this.slider = createSlider(
            this.settings[0],
            this.settings[1],
            this.settings[2],
            this.settings[3]
        )
        this.slider.position(this.pos.x + 90, this.pos.y + 20);
    }

    show() {
        textSize(10);
        fill(255);
        noStroke();
        textAlign(RIGHT);
        text(this.name, this.pos.x + 70, this.pos.y + 23);

        textAlign(LEFT);
        text(this.slider.value(), this.pos.x + this.slider.width + 90, this.pos.y + 23);
    }

    value() {
        return this.slider.value();
    }
}

function setupSliders() {
    // settings
    const particle_slider_settings = [10, 1000, 500, 10];

    const noise_radius_slider_settings = [0, 10, 1, 0.01];
    const noise_freq_slider_settings = [0, 10, 2, 0.1];

    const stroke_weight_slider_settings = [0.8, 4, 1, 0.1];
    const stroke_alpha_slider_settings = [0, 255, 200, 1];

    const shape_freq_slider_settings = [0.1, 2, 1, 0.1];
    const shape_phase_slider_settings = [0, TWO_PI, 0, 0.1];
    const shape_radius_slider_settings = [5, 200, 100, 1];

    const displacement_slider_settings = [0, 200, 30, 1];

    // positions
    const particle_slider_pos = {'x': 0, 'y': 0};

    const noise_radius_slider_position = {'x': 0, 'y': 25};
    const noise_freq_slider_position = {'x': 0, 'y': 40};

    const stroke_weight_slider_position = {'x': 0, 'y': 65};
    const stroke_alpha_slider_position = {'x': 0, 'y': 90};

    const shape_freq_slider_position = {'x': 0, 'y': 105};
    const shape_phase_slider_position = {'x': 0, 'y': 120};   
    const shape_radius_slider_position = {'x': 0, 'y': 135};

    const displacement_slider_position = {'x': 0, 'y': 160};

    // objects
    particle_slider = new Slider('particle_slider', particle_slider_pos, particle_slider_settings);

    noise_radius_slider = new Slider('noise_radius', noise_radius_slider_position, noise_radius_slider_settings);
    noise_freq_slider = new Slider('noise_freq', noise_freq_slider_position, noise_freq_slider_settings);

    stroke_weight_slider = new Slider('stroke_weight', stroke_weight_slider_position, stroke_weight_slider_settings);
    stroke_alpha_slider = new Slider('stroke_alpha', stroke_alpha_slider_position, stroke_alpha_slider_settings);

    shape_freq_slider = new Slider('shape_freq', shape_freq_slider_position, shape_freq_slider_settings);
    shape_phase_slider = new Slider('shape_phase', shape_phase_slider_position, shape_phase_slider_settings);
    shape_radius_slider = new Slider('shape_radius', shape_radius_slider_position, shape_radius_slider_settings);

    displacement_slider = new Slider('displacement', displacement_slider_position, displacement_slider_settings);
}

function drawSliders() {
    particle_slider.show();

    noise_radius_slider.show();
    noise_freq_slider.show();

    stroke_weight_slider.show();
    stroke_alpha_slider.show();

    shape_freq_slider.show();
    shape_phase_slider.show();
    shape_radius_slider.show();

    displacement_slider.show();
}