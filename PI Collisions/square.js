class Square {
    constructor(position, vel, size, mass, leftLim) {
        this.pos = position;
        this.size = size;

        this.mass = mass;
        this.vel = new p5.Vector(vel, 0);
        this.velConstrained = new p5.Vector(vel / iters, 0);

        this.leftLim = leftLim;
    }

    collideWith(square) {
        let v1 = (this.mass - square.mass) / (this.mass + square.mass) * this.vel.x + 2 * square.mass / (this.mass + square.mass) * square.vel.x;
        let v2 = 2 * this.mass / (this.mass + square.mass) * this.vel.x + (square.mass - this.mass) / (this.mass + square.mass) * square.vel.x;

        this.vel.x = v1;
        this.velConstrained.x = v1 / iters;

        square.vel.x = v2;
        square.velConstrained.x = v2 / iters;
    }

    collideWithWall() {
        this.vel.x = -this.vel.x;
        this.velConstrained.x = -this.velConstrained.x;  
    }

    checkCollision(square) {
        if ( this.pos.x + this.size >= square.pos.x ) {
            this.collideWith(square);

            return true;
        }
        if ( this.pos.x <= 0 ){
            this.collideWithWall();

            return true;
        }
        return false;
    }

    update() {
        this.pos.add(this.velConstrained);
    }

    draw() {
        push();
        translate(max(this.leftLim, this.pos.x), this.pos.y);
        fill(255);
        noStroke();
        rect(0, -this.size, this.size, this.size);
        pop();
    }
}