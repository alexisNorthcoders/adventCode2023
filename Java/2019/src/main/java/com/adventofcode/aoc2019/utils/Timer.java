package com.adventofcode.aoc2019.utils;

/**
 * Utility class for timing code execution.
 * Similar to JavaScript's console.time() and console.timeEnd().
 */
public class Timer {
    
    private final long startTime;
    private final String name;
    
    /**
     * Creates a new timer with the given name.
     * 
     * @param name the name of the timer
     */
    public Timer(String name) {
        this.name = name;
        this.startTime = System.nanoTime();
    }
    
    /**
     * Stops the timer and prints the elapsed time.
     * 
     * @return the elapsed time in milliseconds
     */
    public long stop() {
        long endTime = System.nanoTime();
        long elapsedNanos = endTime - startTime;
        long elapsedMillis = elapsedNanos / 1_000_000; // Convert nanoseconds to milliseconds
        
        System.out.printf("%s: %d ms%n", name, elapsedMillis);
        return elapsedMillis;
    }
    
    /**
     * Creates and starts a new timer with the given name.
     * 
     * @param name the name of the timer
     * @return a new Timer instance
     */
    public static Timer start(String name) {
        return new Timer(name);
    }
}
