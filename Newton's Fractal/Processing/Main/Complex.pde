class Complex {
    public float re;
    public float im;

    public Complex(float re, float im) {
        this.re = re;
        this.im = im;
    }

    public Complex add(Complex c) {
        return new Complex(this.re + c.re, this.im + c.im);
    }

    public Complex sub(Complex c) {
        return new Complex(this.re - c.re, this.im - c.im);
    }

    public Complex mult(Complex c) {
        return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re);
    }

    public Complex div(Complex c) {
        float r1 = cabs(this);
        float r2 = cabs(c);
        float r = r1 / r2;

        float theta1 = atan2(this.im, this.re);
        float theta2 = atan2(c.im, c.re);

        return new Complex(r * cos(theta1 - theta2), r * sin(theta1 - theta2));
    }

    public Complex power(float n) {
        float r = pow(cabs(this), n);
        float theta = n * atan2(this.im, this.re);
        return new Complex(r * cos(theta), r * sin(theta));
    }

    public String toString() {
        return String.format("(%.2f, %.2f)", re, im);
    }
}

float cabs(Complex c) {
    return sqrt(c.re * c.re + c.im * c.im);
}

float cabs2(Complex c) {
    return c.re * c.re + c.im * c.im;
}
