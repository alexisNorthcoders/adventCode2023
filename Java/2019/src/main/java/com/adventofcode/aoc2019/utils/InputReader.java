package com.adventofcode.aoc2019.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * Utility class for reading input files.
 * This class provides methods to read Advent of Code input files.
 */
public class InputReader {
    
    private static final String INPUTS_DIR = "src/main/resources/inputs";
    
    /**
     * Reads all lines from a day's input file.
     * 
     * @param dayNumber the day number (1-25)
     * @param useSample whether to use sample input or actual input
     * @return List of strings, each representing a line from the file
     * @throws IOException if the file cannot be read
     */
    public static List<String> readLines(int dayNumber, boolean useSample) throws IOException {
        String fileName = useSample ? 
            String.format("sample_day%d.txt", dayNumber) : 
            String.format("day%d.txt", dayNumber);
        
        Path filePath = Paths.get(INPUTS_DIR, fileName);
        return Files.readAllLines(filePath);
    }
    
    /**
     * Reads the entire content of a day's input file as a single string.
     * 
     * @param dayNumber the day number (1-25)
     * @param useSample whether to use sample input or actual input
     * @return the entire file content as a string
     * @throws IOException if the file cannot be read
     */
    public static String readContent(int dayNumber, boolean useSample) throws IOException {
        String fileName = useSample ? 
            String.format("sample_day%d.txt", dayNumber) : 
            String.format("day%d.txt", dayNumber);
        
        Path filePath = Paths.get(INPUTS_DIR, fileName);
        return Files.readString(filePath);
    }
    
    /**
     * Checks if an input file exists for the given day.
     * 
     * @param dayNumber the day number (1-25)
     * @param useSample whether to check for sample input or actual input
     * @return true if the file exists, false otherwise
     */
    public static boolean fileExists(int dayNumber, boolean useSample) {
        String fileName = useSample ? 
            String.format("sample_day%d.txt", dayNumber) : 
            String.format("day%d.txt", dayNumber);
        
        Path filePath = Paths.get(INPUTS_DIR, fileName);
        return Files.exists(filePath);
    }
}
