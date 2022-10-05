class Walker {
    constructor(x, y, size, stuck){
        this.r = size;
        this.pos = createVector(x, y);
        this.stuck = stuck;
    }

    walk(steps){
        for (let i = 0 ; i < steps ; i++){
            var vel = p5.Vector.random2D();
    
            this.pos.add(vel);
    
            this.pos.x = constrain(this.pos.x, 0, width);
            this.pos.y = constrain(this.pos.y, 0, height);
        }
    }

    checkCollision(walker){
        let x_dist = this.pos.x - walker.pos.x;
        let y_dist = this.pos.y - walker.pos.y;

        var dist2 = x_dist * x_dist + y_dist * y_dist;

        if ( dist2 <= Math.pow(this.r + walker.r, 2) ){
            print("hatz");
            this.stuck = true;

            return true;
        }
        return false;
    }

    show(){
        if ( this.stuck ){
            fill("red");
        }
        else {
            fill("white");
        }
        circle(this.pos.x, this.pos.y, this.r*2);
    }
}