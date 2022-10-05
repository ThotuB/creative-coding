class Branch {
    constructor(x, y, length, angle, width=1, color=0) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + length * cos(angle);
        this.y2 = y + length * sin(angle);
    
        this.angle = angle;
        this.length = length;
        this.width = width;
        this.color = color;
    }

    grow() {
        function generate(branch) {
            const length = branch.length * random(0.6, 0.9);
            const angle = branch.angle + random(-0.8, 0.8);
            const width = branch.width * random(0.5, 0.8);

            return new Branch(branch.x2, branch.y2, length, angle, width, branch.color);
        }

        return [
            generate(this),
            generate(this)
        ];
    }

    draw() {
        stroke(this.color);
        strokeWeight(this.width);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

class Tree {
    constructor(root) {
        this.root = root;
        this.branches = [root];
        this.twigs = [root]

        for (let i = 0; i < 7; i++) {
            this.grow();
        }
    }

    grow() {
        const new_branches = this.twigs.map(branch => branch.grow());
        this.branches = this.branches.concat(...new_branches);
        this.twigs = [].concat(...new_branches);
    }

    draw() {
        this.branches.forEach(branch => branch.draw());
    }
}