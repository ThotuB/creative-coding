function newton_approx(poly, poly_der, z, n) {
    if (n == 0){
        return z
    }

    let p_z = poly.eval(z)
    let dp_z = poly_der.eval(z)

    let z_next = z.sub(p_z.div(dp_z))

    return newton_approx(poly, poly_der, z_next, n-1)
}

function distance2(x, y) {
    return cabs2(x.sub(y))
}

function newton_fractal_colors(poly, roots, steps, boundry, iter=1){
    coord_min = -boundry
    coord_max = boundry
    let step = (coord_max - coord_min)/steps

    plot_range = []
    for (c = coord_min; c < coord_max; c += step){
        plot_range.push(c)
    }

    let poly_der = poly.derivative()

    colors = []
    for (let [i, y] of plot_range.entries()){
        colors[i] = []
        for (let [j, x] of plot_range.entries()){
            z = new Complex(x, y)
            z_approx = newton_approx(poly, poly_der, z, iter)

            min = Number.MAX_VALUE
            for (let [idx, root] of roots.entries()) {
                let dist = distance2(z_approx, root)

                if (dist < min){
                    min = dist
                    colors[i][j] = idx
                }
            }
        }
    }

    return colors
}