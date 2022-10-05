public class MandelPoint {
    int x, y;

    Complex c;
    Complex z;

    MandelPoint(int x, int y, Complex c) {
        this.x = x;
        this.y = y;
        this.c = c;

        z = new Complex(0, 0);
    }

    void set(Complex z) {
        this.z = z;
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + "):\n" + 
            " -> c = " + c + "\n" +
            " -> z = " + z;
    }
}
