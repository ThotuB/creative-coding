const calc_noise = (x, radius) => {
    const t = map(x, 0, WIDTH, 0, TWO_PI)

    const noise_x = radius * cos(t)
    const noise_y = radius * sin(t)

    const noise_val = noise(noise_x + OFF_X, noise_y + OFF_Y)

    return map(noise_val, 0, 1, 0, HEIGHT)
}

const noise_func_sketch = (p) => {
    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT)

        p.noiseSeed(SEED)
    }

    p.draw = () =>  {
        p.background(0)

        const radius = radius_slider.value()
        const frequency = frequency_slider.value()
        const point = point_slider.value()

        p.noFill()
        p.stroke(255)
        p.strokeWeight(3)
        p.beginShape()
        for (let i = 0; i < NUM_POINTS; i++) {
            const x = i * DELTA_X
            const y = calc_noise(x, radius)

            p.vertex(x, y)
        }
        p.endShape()

        p.stroke(255, 0, 0)
        p.strokeWeight(10)

        const point_x = point * DELTA_X
        const point_y = calc_noise(point_x, radius)
        p.point(point_x, point_y)
    }
}

new p5(noise_func_sketch)