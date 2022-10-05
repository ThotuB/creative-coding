ArrayList<Shape> shapeList = new ArrayList<Shape>(9);

float time = 5;

void setup(){
    size(1200, 1200, P3D);
    background(0);
    strokeWeight(2);

    shapeList.add(new Circle(200, 200, 50));
    shapeList.add(new Circle(400, 400, 50));
    shapeList.add(new Circle(600, 600, 50));
    shapeList.add(new Circle(800, 800, 50));
    shapeList.add(new Circle(1000, 1000, 50));
    

}

void draw() {
    background(0);
    drawShapes();
    
    Vector2 pos = new Vector2(mouseX, mouseY);
    float dist = signedDistToScene(pos);

    ellipse(pos.x, pos.y, dist*2, dist*2);
}

float signedDistToScene(Vector2 pos) {
    float minDist = Float.MAX_VALUE;

    for (Shape shape : shapeList) {
        float dist = shape.signedDist(pos);
        if (dist < minDist) {
            minDist = dist;
        }
    }

    return minDist;
}

void drawShapes() {
    for (Shape shape : shapeList) {
        shape.draw();
    }
}
