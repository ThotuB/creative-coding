function draw_poly(poly, scale, resolution, shape=null) {
    let x_min = -scale
    let x_max = scale

    let step = (x_max - x_min) / resolution

    noFill()
    beginShape(shape)
    for (let x = x_min; x < x_max; x += step) {
        let y = poly.eval(x)

        let x_screen = map(x, x_min, x_max, 0, width)
        let y_screen = map(y, -scale, scale, height, 0)

        vertex(x_screen, y_screen)
    }
    endShape()
}