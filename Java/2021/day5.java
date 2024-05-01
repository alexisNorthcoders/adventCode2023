import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class day5 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day5.txt";
        } else {
            filename = "./inputs/day5.txt";
        }
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            String line;
            List<Segment> segments = new ArrayList<>();
            while ((line = bufferedReader.readLine()) != null) {
                String[] pointValues = line.split(" -> ");
                String[] startPointArray = pointValues[0].split(",");
                String[] endPointArray = pointValues[1].split(",");
                int x1 = Integer.parseInt(startPointArray[0]);
                int y1 = Integer.parseInt(startPointArray[1]);
                int x2 = Integer.parseInt(endPointArray[0]);
                int y2 = Integer.parseInt(endPointArray[1]);

                if (x1 == x2 || y1 == y2) {
                    Point startPoint = new Point(x1, y1);
                    Point endPoint = new Point(x2, y2);
                    Segment segment = new Segment(startPoint, endPoint);
                    segments.add(segment);
                }

            }
            int result1 = part1(segments);
            System.out.println("At how many points do at least two lines overlap? "+ result1);

            bufferedReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static int part1(List<Segment> segments) {
        int countPairs = 0;
        for (Map.Entry<Point, Integer> entry : Segment.pointCounts.entrySet()) {
            if (entry.getValue() >= 2) {
                countPairs++;
            }
        }
        return countPairs;
    }

    static class Point {
        private int x;
        private int y;

        public Point(int x, int y) {
            this.x = x;
            this.y = y;
        }

        public boolean isCollinear(Point a, Point b) {
            return (b.y - a.y) * (x - a.x) == (y - a.y) * (b.x - a.x);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
            Point point = (Point) o;
            return x == point.x && y == point.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    static class Segment {
        private Point start;
        private Point end;
        public static Map<Point, Integer> pointCounts = new HashMap<>();

        public Segment(Point start, Point end) {
            this.start = start;
            this.end = end;
            generatePoints();
        }

        public static Map<Point, Integer> getPointCounts() {
            return pointCounts;
        }

        private void generatePoints() {
            int startX = start.x;
            int endX = end.x;
            int startY = start.y;
            int endY = end.y;

            int directionX = Integer.compare(endX, startX);
            int directionY = Integer.compare(endY, startY);

            if (directionY == 0) {
                for (int x = startX; x != endX + directionX; x += directionX) {
                    Point point = new Point(x, startY);

                    pointCounts.put(point, pointCounts.getOrDefault(point, 0) + 1);

                }
            } else if (directionX == 0) {
                for (int y = startY; y != endY + directionY; y += directionY) {
                    Point point = new Point(startX, y);

                    pointCounts.put(point, pointCounts.getOrDefault(point, 0) + 1);

                }

            }
        }
    }
}