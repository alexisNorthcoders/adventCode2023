import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Utility class to create new day files and input files.
 */
public class CreateFiles {
    
    private static final String JAVA_SRC_DIR = "src/main/java/com/adventofcode/aoc2019";
    private static final String INPUTS_DIR = "src/main/resources/inputs";
    
    /**
     * Main method to create files for a specific day.
     * 
     * @param args command line arguments - first argument should be the day number
     */
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java CreateFiles <day_number>");
            System.out.println("Example: java CreateFiles 2");
            return;
        }
        
        try {
            int dayNumber = Integer.parseInt(args[0]);
            createFiles(dayNumber);
        } catch (NumberFormatException e) {
            System.err.println("Error: Day number must be a valid integer");
        } catch (Exception e) {
            System.err.println("Error creating files: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Creates the Java class file and input files for a given day.
     * 
     * @param dayNumber the day number to create files for
     * @throws IOException if file creation fails
     */
    private static void createFiles(int dayNumber) throws IOException {
        // Create input files
        createInputFiles(dayNumber);
        
        // Create Java class file
        createJavaClass(dayNumber);
        
        System.out.println("✅ Files created successfully for Day " + dayNumber);
    }
    
    /**
     * Creates empty input files for the given day.
     * 
     * @param dayNumber the day number
     * @throws IOException if file creation fails
     */
    private static void createInputFiles(int dayNumber) throws IOException {
        String[] fileNames = {
            String.format("day%d.txt", dayNumber),
            String.format("sample_day%d.txt", dayNumber)
        };
        
        for (String fileName : fileNames) {
            Path filePath = Paths.get(INPUTS_DIR, fileName);
            Files.writeString(filePath, "");
            System.out.println("📄 Created: " + filePath);
        }
    }
    
    /**
     * Creates the Java class file for the given day.
     * 
     * @param dayNumber the day number
     * @throws IOException if file creation fails
     */
    private static void createJavaClass(int dayNumber) throws IOException {
        String className = String.format("Day%d", dayNumber);
        String fileName = className + ".java";
        Path filePath = Paths.get(JAVA_SRC_DIR, fileName);
        
        String classContent = generateClassContent(dayNumber);
        Files.writeString(filePath, classContent);
        System.out.println("☕ Created: " + filePath);
    }
    
    /**
     * Generates the Java class content for a given day.
     * 
     * @param dayNumber the day number
     * @return the Java class content as a string
     */
    private static String generateClassContent(int dayNumber) {
        return String.format("""
            package com.adventofcode.aoc2019;

            import com.adventofcode.aoc2019.utils.InputReader;
            import com.adventofcode.aoc2019.utils.Timer;

            import java.io.IOException;
            import java.util.List;

            /**
             * Solution for Advent of Code 2019 Day %d.
             */
            public class Day%d {
                
                /**
                 * Runs the Day %d solution.
                 * This method is called by the Main class using reflection.
                 * 
                 * @param useSample whether to use sample input
                 */
                public void run(boolean useSample) {
                    try {
                        // Read input file
                        List<String> lines = InputReader.readLines(%d, useSample);
                        
                        // Time Part 1
                        Timer part1Timer = Timer.start("Part 1");
                        long part1Result = part1(lines);
                        part1Timer.stop();
                        System.out.printf("📌 Part 1: %%d%%n", part1Result);
                        
                        // Time Part 2
                        Timer part2Timer = Timer.start("Part 2");
                        long part2Result = part2(lines);
                        part2Timer.stop();
                        System.out.printf("📌 Part 2: %%d%%n", part2Result);
                        
                    } catch (IOException e) {
                        System.err.println("Error reading input file: " + e.getMessage());
                    }
                }
                
                /**
                 * Solves Part 1 of Day %d.
                 * 
                 * @param input list of input lines
                 * @return the result for Part 1
                 */
                private long part1(List<String> input) {
                    // TODO: Implement Part 1 logic here
                    // This is where you'll put your problem-solving logic
                    return 0;
                }
                
                /**
                 * Solves Part 2 of Day %d.
                 * 
                 * @param input list of input lines
                 * @return the result for Part 2
                 */
                private long part2(List<String> input) {
                    // TODO: Implement Part 2 logic here
                    // This is where you'll put your problem-solving logic
                    return 0;
                }
            }
            """, dayNumber, dayNumber, dayNumber, dayNumber, dayNumber, dayNumber);
    }
}
