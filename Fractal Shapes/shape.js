class Shape{
    constructor(sides, x, y, len, angle) {
        // SET
        this.order = sides;

        this.center = createVector(x, y);
        this.sideLen = len;
        this.phase = angle;

        // CALC
        this.ccLen = this.calc_circumscribed_circle_radius();
        this.icLen = this.calc_inscribed_circle_radius();
        this.extAng = this.calc_exterior_angle();
        this.intAng = this.calc_interior_angle();

        this.points = this.get_points();
    }

    calc_circumscribed_circle_radius(){ // distance: center: vertex
        return this.sideLen / (2 * sin(PI / this.order));
    }

    calc_inscribed_circle_radius(){ // distance: center - edge
        return this.sideLen / (2 * tan(PI / this.order));
    }

    calc_exterior_angle(){ // angle: vertex - vertex - vertex
        return ((this.order - 2) * PI)/ this.order;
    }
      
    calc_interior_angle(){ // angle: vertex - center - vertex
        return 2 * PI / this.order;
    }

    get_points(){
        let points = [];
        let angle = this.intAng;
        let dist = this.ccLen;

        for (let i = 0 ; i < this.order ; i++){
            let x = this.center.x + cos(i * angle + this.phase) * dist;
            let y = this.center.y + sin(i * angle + this.phase) * dist;

            points.push(createVector(x, y));
        }

        return points;
    }

    show() {
        strokeWeight(2);
        stroke(STRK);
        for (let i = 0 ; i < this.order - 1 ; i++){
            let p1 = this.points[i];
            let p2 = this.points[i+1]; 

            line(p1.x, p1.y, p2.x, p2.y);
        }
        let p1 = this.points[0];
        let p2 = this.points[this.order-1]; 

        line(p1.x, p1.y, p2.x, p2.y);
    }

    show_dir(){
        let x = this.center.x + cos(this.phase) * this.icLen;
        let y = this.center.y + sin(this.phase) * this.icLen;

        line(this.center.x, this.center.y, x, y);
    }
}