public class Mandelbrot {
    static int compute(Complex c, int iterMax, int magMax){
        Complex z = c;

        for (int i = 0; i < iterMax; i++) {
            if ( z.mag() > magMax) {
                return i;
            }
            
            z = iterate(z, c);
        }

        return -1;
    }

    static Complex iterate(Complex z, Complex c) {
        Complex z2 = Complex.mult(z, z);
        z2.add(c);

        return z2;
    }
}

class MandelbrotCreepy {
    static int compute(float re, float im, int iterMax){
        float a = re;
        float b = im;

        for (int i = 0; i < iterMax; i++) {
            if (a * a + b * b > 4){
                return i;
            }
            
            a = a*a - b*b + re;
            b = 2*a*b + im;
        }

        return -1;
    }
}
