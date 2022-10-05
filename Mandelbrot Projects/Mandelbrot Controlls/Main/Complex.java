public class Complex {
    float re;
    float im;
    
    Complex(float re, float im) {
        this.re = re;
        this.im = im;
    }

    static Complex mult(Complex c1, Complex c2) {
        float cRe = c1.re * c2.re - c1.im * c2.im;
        float cIm = c1.re * c2.im + c1.im * c2.re;
        
        Complex c = new Complex(cRe, cIm);

        return c;
    }

    void mult(Complex c2) {
        float cRe = re * c2.re - im * c2.im;
        float cIm = re * c2.im + im * c2.re;

        this.re = cRe;
        this.im = cIm;
    }

    static Complex add(Complex c1, Complex c2) {
        float cRe = c1.re + c2.re;
        float cIm = c1.im + c2.im;

        Complex c = new Complex(cRe, cIm);

        return c;
    }

    void add(Complex c2) {
        float cRe = re + c2.re;
        float cIm = im + c2.im;

        this.re = cRe;
        this.im = cIm;
    }

    float mag() {
        return (float) Math.sqrt(re * re + im * im);
    }

    @Override
    public String toString() {
        return re + " + " + im + "i - " + mag();
    }
}