class Ray {
    public PVector pos;

    public float rad;
    public PVector dir;

    public Ray(PVector pos, float rad) {
        this.pos = pos;
        this.rad = rad;
        setDir();
    }

    private void setDir() {
        this.dir = new PVector(cos(rad), sin(rad));
    }

    public void setAngle(float rad) {
        this.rad = rad;
        setDir();
    }

    public void turn(float rad) {
        this.rad += rad;
        setDir();
    }

    public PVector cast(Wall w) {
        final float x1 = w.p1.x;
        final float y1 = w.p1.y;
        final float x2 = w.p2.x;
        final float y2 = w.p2.y;

        final float x3 = pos.x;
        final float y3 = pos.y;
        final float x4 = pos.x + dir.x;
        final float y4 = pos.y + dir.y;

        final float den = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
        if ( den == 0 ) {
            return null;
        }

        final float t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)) / den;
        final float u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)) / den;

        if ( 0 < t && t < 1 && 0 < u ) {
            return new PVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
        }
        return null;
    }

    public PVector cast(ArrayList<Wall> walls) {
        PVector point = null;
        float distMin = Float.MAX_VALUE;

        for (Wall w : walls) {
            PVector p = cast(w);
            if (p != null) {
                float dist = PVector.dist(pos, p);
                if ( dist < distMin ){
                    distMin = dist;
                    point = p;
                }
            }
        }
        return point;
    }

    public void draw() {
        stroke(255);
        line(pos.x, pos.y, pos.x + dir.x * 10, pos.y + dir.y * 10);
    }
}

class Wall {
    public PVector p1;
    public PVector p2;

    public Wall(float x1, float y1, float x2, float y2) {
        this.p1 = new PVector(x1, y1);
        this.p2 = new PVector(x2, y2);
    }

    public void draw() {
        stroke(255);
        line(p1.x, p1.y, p2.x, p2.y);
    }
}