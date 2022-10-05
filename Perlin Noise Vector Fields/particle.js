class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.MAX_SPEED = 2;
        this.posPrev = this.pos.copy();
    }

    flow(field) {
        let posX = floor(map(this.pos.x, 0, width, 0, cols-1));
        let posY = floor(map(this.pos.y, 0, height, 0, rows-1));

        this.acc.add(field.get(posX, posY));
    }

    edges() {
        if ( this.pos.x > width ) {
            this.pos.x = 0;
        }
        else if ( this.pos.x < 0 ) {
            this.pos.x = width;
        }
        else if ( this.pos.y > height ) {
            this.pos.y = 0;
        }
        else if ( this.pos.y < 0 ) {
            this.pos.y = height;
        }
        else {
            return;
        }
        this.updatePrev();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.MAX_SPEED);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.edges();
    }

    updatePrev() {
        this.posPrev = this.pos.copy();
    }

    show() {
        stroke(255, 5);
        strokeWeight(1);
        line(this.posPrev.x, this.posPrev.y, this.pos.x, this.pos.y);
        // point(this.pos.x, this.pos.y);
        this.updatePrev();
    }
}