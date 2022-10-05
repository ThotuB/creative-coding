public class Mandelbrot {
    static int iterate(float re, float im, int iterMax) {
        if ( re*re + 2*re + 1 + im*im <= 0.0625 ) {
            return iterMax;
        }
        float q = (float)(re*re - 0.5*re + 0.0625 + im*im);
        if ( q*(q + re - 0.25) <= 0.25 * im*im ){
            return iterMax;
        }

        float x = 0, y = 0;
        float x2 = 0;
        float y2 = 0;
        int it = 0;
        while ( x2 + y2 <= 4 && it < iterMax ) {
            y = 2*x*y + im;
            x = x2 - y2 + re;
            x2 = x*x;
            y2 = y*y;

            it++;
        }

        return it;
    }
}
