abstract class Equation {
    public abstract Point run(Point p, float time);
}

class Equation1 extends Equation {
    @Override
    public Point run(Point p, float time) {
        float x = p.x;
        float y = p.y;

        float x1 = x*x - y*y - t*t - x - t;
        float y1 = y*y + t*t - x*y - y - t;

        return new Point(x1, y1);
    }
}