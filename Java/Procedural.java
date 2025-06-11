package Paradigms.Java;

public class Procedural {
    public static class Point {
        public int x;
        public int y;
    }

    public static Point createPoint(int x, int y) {
        Point point = new Point();
        point.x = x;
        point.y = y;
        return point;
    }

    public static Point clone(Point point) {
        int x = point.x;
        int y = point.y;
        return createPoint(x, y);
    }

    public static void move(Point point, int x, int y) {
        point.x += x;
        point.y += y;
    }

    public static String toString(Point point) {
        int x = point.x;
        int y = point.y;
        return "(" + x + ", " + y + ")";
    }

    public static void main(String[] args) {
        Point p1 = createPoint(10, 20);
        System.out.println(toString(p1));
        Point c1 = clone(p1);
        move(c1, -5, 10);
        System.out.println(toString(c1));
    }
}
