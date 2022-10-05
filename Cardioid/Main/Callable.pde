interface Callable<T> {
    T call(T param);
}

class Function implements Callable<Integer> {
    Integer call(Integer x) {
        return  abs(C2 * x * x + C1 * x);
    }

    @Override
    String toString() {
        return C2 + "x\u00B2 + " + C1 + "x";
    }
}