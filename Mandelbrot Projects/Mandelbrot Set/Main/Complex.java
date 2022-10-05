public class Complex {
    float re;
    float im;

    Complex(float re, float im) {
        this.re = re;
        this.im = im;
    }

    Complex add(Complex c) {
        re += c.re;
        im += c.im;

        return this;
    }

    Complex add(float re, float im) {
        this.re += re;
        this.im += im;

        return this;
    }

    Complex pow2() {
        float a = re * re - im * im;
        float b = 2 * re * im;

        re = a;
        im = b;

        return this;
    }

    float abs_sq() {
        return re * re + im * im;
    }

    @Override
    public String toString() {
        return "" + re + " + " + im + "i -> " + abs_sq();
    }
}
