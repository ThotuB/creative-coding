public class Mandelbrot {
    static int iterate(Complex z, Complex c, int iterMax) {
        float re = c.re;
        float im = c.im;

        if ( re*re + 2*re + 1 + im*im <= 0.0625 ) {
            return iterMax;
        }
        float q = (float)(re*re - 0.5*re + 0.0625 + im*im);
        if ( q*(q + re - 0.25) <= 0.25 * im*im ){
            return iterMax;
        }

        float x = z.re;
        float y = z.im;

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


// public class Mandelbrot {
//     static int compute(float re, float im, int iterMax){
//         float a = re;
//         float b = im;

//         for (int i = 0; i < iterMax; i++) {
//             if (a * a + b * b > 4){
//                 return i;
//             }
            
//             a = a*a - b*b + re;
//             b = 2*a*b + im;
//         }

//         return -1;
//     }
// }
