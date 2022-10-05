function setup() {
    let res = 500
    createCanvas(res, res)
    background(0)

    let roots = [
        new Complex(1, 0),
        new Complex(-0.5, 0.866),
        new Complex(-0.5, -0.866),
    ]
    
    let fade = gradient(color('#A06EFA'), color('#D10744'), roots.length)

    let poly = new Poly(roots, 'root')
    let boundry = 20
    let iterations = 10

    let tic = Date.now()
    let pixel = newton_fractal_colors(poly, roots, res, boundry, iterations)

    mapPixels(fade, pixel)
    let toc = Date.now()

    console.log(`Time: ${toc - tic}ms`)
}

function mapPixels(colors, pixel_color) {
    noStroke()
    print(pixelDensity())
    loadPixels()
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let index = (i * height + j) * 4
            let c = colors[pixel_color[i][j]]

            pixels[index + 0] = red(c)
            pixels[index + 1] = green(c)
            pixels[index + 2] = blue(c)
        }
    }
    updatePixels()
}