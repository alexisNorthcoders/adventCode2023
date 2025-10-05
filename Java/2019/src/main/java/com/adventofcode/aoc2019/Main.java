package com.adventofcode.aoc2019;

import com.adventofcode.aoc2019.utils.Timer;

/**
 * Main class for running Advent of Code 2019 solutions.
 * This is the entry point of our Java application.
 */
public class Main {
    
    /**
     * The main method - this is where Java starts executing our program.
     * Similar to how Node.js starts with index.js.
     * 
     * @param args command line arguments
     */
    public static void main(String[] args) {
        System.out.println("🌟 Welcome to Advent of Code 2019 - Java Edition! 🌟");
        
        // Check if we have command line arguments
        if (args.length == 0) {
            printUsage();
            return;
        }
        
        try {
            // Parse the day number from command line arguments
            int dayNumber = Integer.parseInt(args[0]);
            
            // Validate day number is between 1 and 25
            if (dayNumber < 1 || dayNumber > 25) {
                System.err.println("Error: Day number must be between 1 and 25 (inclusive)");
                printUsage();
                return;
            }
            
            // Check if we should use sample input
            boolean useSample = args.length > 1 && "sample".equals(args[1]);
            
            // Run the specified day
            runDay(dayNumber, useSample);
            
        } catch (NumberFormatException e) {
            System.err.println("Error: Day number must be a valid integer (1-25)");
            printUsage();
        } catch (Exception e) {
            System.err.println("Error running day: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Runs the solution for a specific day.
     * 
     * @param dayNumber the day to run (1-25)
     * @param useSample whether to use sample input
     */
    private static void runDay(int dayNumber, boolean useSample) {
        System.out.printf("🌟 --- Day %d Results --- 🌟%n", dayNumber);
        
        // Create a timer for the entire day
        Timer totalTimer = Timer.start("Total Time");
        
        try {
            // Use reflection to dynamically load and run the day class
            String className = String.format("com.adventofcode.aoc2019.Day%d", dayNumber);
            Class<?> dayClass = Class.forName(className);
            
            // Create an instance of the day class
            Object dayInstance = dayClass.getDeclaredConstructor().newInstance();
            
            // Get the run method and invoke it
            var runMethod = dayClass.getMethod("run", boolean.class);
            runMethod.invoke(dayInstance, useSample);
            
        } catch (ClassNotFoundException e) {
            System.err.printf("Day %d class not found. Make sure Day%d.java exists.%n", dayNumber, dayNumber);
        } catch (Exception e) {
            System.err.printf("Error running Day %d: %s%n", dayNumber, e.getMessage());
            e.printStackTrace();
        } finally {
            // Always stop the total timer
            totalTimer.stop();
        }
    }
    
    /**
     * Prints usage instructions.
     */
    private static void printUsage() {
        System.out.println("Usage: java Main <day_number> [sample]");
        System.out.println("  day_number: 1-25 (the day to run)");
        System.out.println("  sample: optional, use sample input instead of real input");
        System.out.println();
        System.out.println("Examples:");
        System.out.println("  java Main 1        # Run Day 1 with real input");
        System.out.println("  java Main 1 sample # Run Day 1 with sample input");
    }
}
