let smoke_trail
let time = 0

function setup() {
    createCanvas(1000, 200)

    setupSliders()

    smoke_trail = new Smoke({
            'x': width / 2,
            'y': height / 2,
        },
        shape_heart
    )
}

function draw() {
    background(0)
    updateTrail();
    drawSliders();

    smoke_trail.show()

    time += 0.01
    if (time > 1) {
        time = 0
    }
}

function updateTrail() {
    let options = {
        'seed': 654,
        'particles': particle_slider.value(),
        'noise_radius': noise_radius_slider.value(),
        'noise_freq': noise_freq_slider.value(),
        'stroke_weight': stroke_weight_slider.value(),
        'stroke_alpha': stroke_alpha_slider.value(),
        'shape_freq': shape_freq_slider.value(),
        'shape_phase': shape_phase_slider.value(),
        'shape_radius': shape_radius_slider.value(),
        'dispersion': displacement_slider.value(),
    }
    smoke_trail.update_options(options)
}