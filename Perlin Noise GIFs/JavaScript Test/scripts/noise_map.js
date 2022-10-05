const noise_map_sketch = (p) => {
    p.RESOLUTION = 100
    p.RECT_SIZE = WIDTH / p.RESOLUTION

    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT)

        p.noiseSeed(SEED)
    }

    p.draw = () =>  {
        p.background(0)

        const radius = radius_slider.value()
        const frequency = frequency_slider.value()
        const point = point_slider.value()

        p.noStroke()
        for (let i = 0; i < p.RESOLUTION; i++) {
            for (let j = 0; j < p.RESOLUTION; j++) {
                const x = j * p.RECT_SIZE
                const y = i * p.RECT_SIZE

                const noise_x = map(x, 0, WIDTH, -radius * 1.5, radius * 1.5)
                const noise_y = map(y, 0, HEIGHT, -radius * 1.5, radius * 1.5)

                const noise_val = noise(noise_x + OFF_X, noise_y + OFF_Y)

                p.fill(noise_val * 255)
                p.rect(x, y, p.RECT_SIZE, p.RECT_SIZE)
            }
        }

        p.stroke(255, 0, 0)
        p.strokeWeight(10)
         
        const t = map(point * DELTA_X, 0, WIDTH, 0, TWO_PI)
        const point_x = map(cos(t), -1.5, 1.5, 0, WIDTH)
        const point_y = map(sin(t), -1.5, 1.5, 0, HEIGHT)
        p.point(point_x, point_y)
    }
}

new p5(noise_map_sketch)