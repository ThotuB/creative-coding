Complex newton_approx(Poly poly, Poly poly_der, Complex z, int n) {
    if (n == 0){
        return z;
    }

    Complex p_z = poly.eval(z);
    Complex dp_z = poly_der.eval(z);

    Complex z_next = z.sub(p_z.div(dp_z));

    return newton_approx(poly, poly_der, z_next, n-1);
}

float distance2(Complex x, Complex y) {
    return cabs2(x.sub(y));
}

int min_dist_root(Complex z, Complex[] roots) {
    float min_dist = distance2(z, roots[0]);
    int min_index = 0;

    for (int i = 1; i < roots.length; i++) {
        float dist = distance2(z, roots[i]);
        if (dist < min_dist) {
            min_dist = dist;
            min_index = i;
        }
    }

    return min_index;
}

int[][] newton_fractal_colors(Poly poly, Complex[] roots, float boundry, int iter){
    int steps = width;

    float coord_min = -boundry;
    float coord_max = boundry;
    float step = (coord_max - coord_min)/steps;

    float[] plot_range = new float[steps];
    float coord = coord_min;
    for (int index = 0 ; index < steps ; index++) {
        plot_range[index] = coord;
        coord += step;
    }

    Poly poly_der = poly.derivative();

    int[][] colors = new int[steps][steps];
    for (int i = 0; i < steps; i++){
        for (int j = 0; j < steps; j++){
            float y = plot_range[i];
            float x = plot_range[j];

            Complex z = new Complex(x, y);
            Complex z_approx = newton_approx(poly, poly_der, z, iter);

            colors[i][j] = min_dist_root(z_approx, roots);
        }
    }

    return colors;
}

void dummy_newton(Poly poly, Complex[] roots, float boundry, int iter, Color[] rules){
    int steps = 200;

    float coord_min = -boundry;
    float coord_max = boundry;
    float step = (coord_max - coord_min)/(steps-1);

    float[] plot_range = new float[steps];
    float coord = coord_min;
    for (int index = 0 ; index < steps ; index++) {
        plot_range[index] = coord;
        coord += step;
    }

    Poly poly_der = poly.derivative();

    for (int i = 0; i < steps; i++){
        int clr = 0;
        for (int j = 0; j < steps; j++){
            float y = -plot_range[i];
            float x = plot_range[j];

            // print(y, x, '\n');

            Complex z = new Complex(x, y);
            Complex z_approx = newton_approx(poly, poly_der, z, iter);

            clr = min_dist_root(z_approx, roots);
            // stroke(255);
            strokeWeight(1);
            fill(0);
            Color c = rules[clr];
            stroke(color(c.r, c.g, c.b));
            drawComplex(z, boundry);
            // lineComplex(z, z_approx, boundry);
            // fill(0, 0, 255);
            // drawComplex(z_approx, boundry);
        }
    }
}
