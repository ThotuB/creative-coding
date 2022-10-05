class FlowField {
    constructor(rows, cols){
        this.grid = [];
        for (let i = 0; i < rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < cols; j++) {
                this.grid[i][j] = p5.Vector(0, 0);
            }
        }
    }

    set(row, col, vec){
        this.grid[row][col] = vec;
    }

    get(row, col){
        return this.grid[row][col];
    }

    show(row, col) {
        let vec = this.grid[row][col];

        push();
        stroke(255, 255, 255, 100);
        translate(row * scale, col * scale);
        rotate(vec.heading());
        line(0, 0, scale, 0);
        pop();
    }
}