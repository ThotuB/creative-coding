class Poly {
    constructor(lst, mode='coef'){
        switch ( mode ) {
            case 'coef':
                this.coef = lst;
                this.order = lst.length;
                break;
            case 'root':
                let res = new Poly([new Complex(1, 0)])

                for (let root of lst) {
                    let root_poly = new Poly([root, new Complex(1, 0)])
                    res = res.mult(root_poly)
                }

                this.coef = res.coef;
                this.order = res.order;
                break;
        }
    }

    eval(x){
        let result = new Complex(0, 0)
        for (let i = 0; i < this.order; i++) {
            result = result.add(this.coef[i].mult(x.pow(i)))
        }
        return result
    }

    #operation_helper(other, operation){
        const [min_order, min_poly, max_poly] = (this.order < other.order) ? [this.order, this, other] : [other.order, other, this]

        let coef = []
        for (let i = 0; i < min_order; i++) {
            coef.push(operation(min_poly.coef[i], max_poly.coef[i]))
        }
        coef = coef.concat(max_poly.coef.slice(min_order))

        return new Poly(coef)
    }

    add(other){
        return this.#operation_helper(other, (a, b) => a.add(b))
    }

    sub(other){
        return this.#operation_helper(other, (a, b) => a.sub(b))
    }

    mult(other){
        let result = new Array(this.order + other.order - 1).fill(new Complex(0, 0))

        for (let i = 0; i < this.order; i++) {
            for (let j = 0; j < other.order; j++) {
                let prod = this.coef[i].mult(other.coef[j])
                result[i + j] = result[i + j].add(prod)
            }
        }

        return new Poly(result)
    }

    derivative() {
        let coef = []
        for (let i = 1; i < this.order; i++) {
            coef[i-1] = this.coef[i].mult(new Complex(i, 0))
        }
        return new Poly(coef)
    }
}