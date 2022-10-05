interface Operation {
    Complex apply(Complex z1, Complex z2);
}

class Poly {
    public Complex[] coef;
    public int order;

    public Poly(Complex[] lst){
        this(lst, "coef");
    }

    public Poly(Complex[] lst, String mode){
        switch ( mode ) {
            case "coef":
                this.coef = lst;
                this.order = lst.length;
                break;
            case "root":
                Poly res = new Poly(new Complex[]{new Complex(1, 0)});

                for (Complex root : lst) {
                    Poly root_poly = new Poly(new Complex[]{new Complex(-root.re, -root.im), new Complex(1, 0)});
                    res = res.mult(root_poly);
                }

                this.coef = res.coef;
                this.order = res.order;
                break;
        }
    }

    public Complex eval(Complex x){
        Complex result = new Complex(0, 0);
        for (int i = 0; i < this.order; i++) {
            result = result.add(this.coef[i].mult(x.power(i)));
        }
        return result;
    }

    private Poly operation_helper(Poly other, Operation operation){
        Poly min_poly, max_poly;
        int min_order, max_order;
        if (this.order < other.order) {
            min_poly = this;
            max_poly = other;
            min_order = this.order;
            max_order = other.order;
        } else {
            min_poly = other;
            max_poly = this;
            min_order = other.order;
            max_order = this.order;
        }
        
        Complex[] coef = new Complex[max_order];
        int i;
        for (i = 0; i < min_order; i++) {
            coef[i] = operation.apply(min_poly.coef[i], max_poly.coef[i]);
        }
        for ( ; i < max_order; i++) {
            coef[i] = max_poly.coef[i];
        }

        return new Poly(coef);
    }

    public Poly add(Poly other){
        return this.operation_helper(other, (a, b) -> a.add(b));
    }

    public Poly sub(Poly other){
        return this.operation_helper(other, (a, b) -> a.sub(b));
    }

    public Poly mult(Poly other){
        Complex[] result = new Complex[this.order + other.order - 1];

        for (int idx = 0 ; idx < this.order + other.order - 1 ; idx++) {
            result[idx] = new Complex(0, 0);
        }

        for (int i = 0; i < this.order; i++) {
            for (int j = 0; j < other.order; j++) {
                Complex prod = this.coef[i].mult(other.coef[j]);
                result[i + j] = result[i + j].add(prod);
            }
        }

        return new Poly(result);
    }

    public Poly derivative() {
        Complex[] coef = new Complex[this.order - 1];
        for (int i = 1; i < this.order; i++) {
            coef[i-1] = this.coef[i].mult(new Complex(i, 0));
        }
        return new Poly(coef);
    }

    public String toString(){
        String output = "";
        for (int i = 0 ; i < this.order ; i++) {
            output += this.coef[i].toString() + "x^" + i + " + ";
        }
        return output;
    }
}
