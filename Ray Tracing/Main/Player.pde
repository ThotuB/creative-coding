class Player {
    public PVector pos;

    public int speed = 5;
    public int turnSpeed = 2;

    public int fov;
    public int rays;
    public ArrayList<Ray> rayList;

    public Player(PVector pos, int rays, int fov) {
        this.pos = pos;
        this.rayList = new ArrayList<Ray>(rays);
        this.fov = fov;
        this.rays = rays;

        float angle = (float) (radians(fov) / rays);
        for (int i = -rays/2; i < rays/2; i++) {
            this.rayList.add(new Ray(pos, i * angle));
        }
    }

    public void move(int x, int y) {
        pos.set(pos.x + speed * x, pos.y + speed * y);
    }

    public void turn(int dir) {
        for (Ray ray : rayList) {
            ray.turn(radians(dir * turnSpeed));
        }
    }

    public void changeResolution(int count) {
        if ( count > 0 ) {
            float angle = (float) (radians(fov) / (rays + count));
            float phi = (float) rayList.get(0).rad;
            for (int i = 0 ; i < rays ; i++) {
                this.rayList.get(i).setAngle(i * angle + phi);
            }
            for (int i = 0; i < count; i++) {
                this.rayList.add(new Ray(pos, (rays + i) * angle + phi));
            }
            rays += count;
        }
        else {
            float phi = (float) rayList.get(0).rad;
            for (int i = 0; i < -count; i++) {
                this.rayList.remove(0);
            }
            rays -= count;
            rays = (rays < 0 ) ? 0 : rays;
            float angle = (float) (radians(fov) / rays);
            for (int i = 0 ; i < rays ; i++) {
                this.rayList.get(i).setAngle(i * angle + phi);
            }

        }
    }

    public void cast(ArrayList<Wall> walls, ArrayList<Wall> border){
        for (int i = 0; i < rays; i++) {
            PVector point = rayList.get(i).cast(walls);
            if (point != null) {
                drawToWall(point);
                render(i, point);
                continue;
            }
            point = rayList.get(i).cast(border);
            if (point != null) {
                drawToBorder(point);
                render(i, point);
            }
        }
    }

    public void drawToWall(PVector point){
        stroke(255);
        strokeWeight(2);
        line(pos.x, pos.y, point.x, point.y);
    }

    public void drawToBorder(PVector point){
        stroke(100);
        strokeWeight(1);
        line(pos.x, pos.y, point.x, point.y);
    }

    public void render(int rayNr, PVector point) {
        float dist = dist(pos.x, pos.y, point.x, point.y);
        float sideH = (1 - dist/height) * ( height - 100);
        System.out.println(sideH);
        
        float sideW = (width/2)/rays;

        float x = (width/2) + rayNr * sideW;
        float y = (height - sideH)/2;

        fill(255 * (1/pow(dist/height * 4, 2)));
        noStroke();
        rect(x, y, sideW, sideH);
    }
}