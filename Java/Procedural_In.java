package Paradigms.Java;

public class Procedural_In {
    public static class Point {
        public int x;
        public int y;
    }
    
    public static class StringBuffer {
        public String value;
    }

    public static void createPoint(Point point, int x, int y) {
        point.x = x;
        point.y = y;
    }

    public static void clone(Point src, Point dest) {
        dest.x = src.x;
        dest.y = src.y;
    }

    public static void move(Point point, int dx, int dy) {
        point.x += dx;
        point.y += dy;
    }

    public static void toString(Point point, StringBuffer buffer) {
        buffer.value = "(" + point.x + ", " + point.y + ")";
    }

    public static void main(String[] args) {
        Point p1 = new Point();
        createPoint(p1, 10, 20);
        
        StringBuffer result = new StringBuffer();
        toString(p1, result);
        System.out.println(result.value);
        
        Point c1 = new Point();
        clone(p1, c1);
        move(c1, -5, 10);
        toString(c1, result);
        System.out.println(result.value);
    }
}