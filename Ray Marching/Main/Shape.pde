abstract class Shape {
    protected Vector2 center;

    public abstract float signedDist(Vector2 position);
    public abstract void draw();
}

class Circle extends Shape {
    private float radius;

    public Circle(float centerX, float centerY, float radius) {
        this.center = new Vector2(centerX, centerY);
        this.radius = radius;
    }

    public float signedDist(Vector2 position) {
        return (position.sub(center)).length() - radius;
    }

    public void draw() {
        stroke(255);
        noFill();
        ellipse(center.x, center.y, radius * 2, radius * 2);
    }
}

class Rectangle extends Shape {
    public float width, height;

    public Rectangle(float centerX, float centerY, float width, float height) {
        this.center = new Vector2(centerX, centerY);
        this.width = width;
        this.height = height;
    }

    public float signedDist(Vector2 position) {
        float dx = max();
    }

    public void draw() {
        stroke(255);
        noFill();
        rect(center.x - width/2, center.y - height/2, width, height);
    }
}

