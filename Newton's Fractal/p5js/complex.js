class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    add(c) {
        return new Complex(this.re + c.re, this.im + c.im);
    }

    sub(c) {
        return new Complex(this.re - c.re, this.im - c.im);
    }

    mult(c) {
        return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re);
    }

    div(c) {
        let r1 = cabs(this)
        let r2 = cabs(c)
        let r = r1 / r2

        let theta1 = Math.atan2(this.im, this.re)
        let theta2 = Math.atan2(c.im, c.re)

        return new Complex(r * Math.cos(theta1 - theta2), r * Math.sin(theta1 - theta2))
    }

    pow(n) {
        let r = cabs(this) ** n;
        let theta = n * Math.atan2(this.im, this.re);
        return new Complex(r * Math.cos(theta), r * Math.sin(theta));
    }
}

function cabs(c) {
    return Math.sqrt(c.re * c.re + c.im * c.im);
}

function cabs2(c) {
    return c.re * c.re + c.im * c.im;
}