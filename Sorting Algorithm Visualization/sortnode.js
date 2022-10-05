class SortNode {
    constructor(key) {
        this.key = key;
        this.color = "#FFFFFF";
    }

    pivot() {
        this.color = "#FF0000";
    }

    active() {
        this.color = "#7FFFD4";
    }

    reset() {
        this.color = "#FFFFFF";
    }

    order(){
        this.color = "#007BA7";
    }

    show(x, y) {
        fill(this.color);
        rect(x, y, lenX, -this.key * lenY);
    }
}