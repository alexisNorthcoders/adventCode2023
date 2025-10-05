package com.adventofcode.aoc2019;

import java.io.IOException;
import java.util.List;

import com.adventofcode.aoc2019.utils.InputReader;
import com.adventofcode.aoc2019.utils.Timer;

/**
 * Solution for Advent of Code 2019 Day 2.
 */
public class Day2 {

    /**
     * Runs the Day 2 solution.
     * This method is called by the Main class using reflection.
     *
     * @param useSample whether to use sample input
     */
    public void run(boolean useSample) {
        try {
            // Read input file
            List<String> lines = InputReader.readLines(2, useSample);

            // Time Part 1
            Timer part1Timer = Timer.start("Part 1");
            long part1Result = part1(lines);
            part1Timer.stop();
            System.out.printf("📌 Part 1: %d%n", part1Result);

            // Time Part 2
            Timer part2Timer = Timer.start("Part 2");
            long part2Result = part2(lines);
            part2Timer.stop();
            System.out.printf("📌 Part 2: %d%n", part2Result);

        } catch (IOException e) {
            System.err.println("Error reading input file: " + e.getMessage());
        }
    }

    /**
     * Solves Part 1 of Day 2.
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
     * Solves Part 2 of Day 2.
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
