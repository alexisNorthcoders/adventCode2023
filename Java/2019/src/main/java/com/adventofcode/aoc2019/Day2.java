package com.adventofcode.aoc2019;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
            String content = InputReader.readContent(2, useSample);

            // Time Part 1
            Timer part1Timer = Timer.start("Part 1");
            long part1Result = part1(content);
            part1Timer.stop();
            System.out.printf("📌 Part 1: %d%n", part1Result);

            // Run Brute Force approach
            Timer part2Timer = Timer.start("Part 2 (Brute Force)");
            long part2Result = part2(content);
            part2Timer.stop();
            System.out.printf("📌 Part 2 (Brute Force): %d%n", part2Result);
            System.out.println();

            // Run Mathematical approach (if linear)

            Timer part2MathTimer = Timer.start("Part 2 (Mathematical)");
            long part2MathResult = part2Mathematical(content);
            part2MathTimer.stop();
            System.out.printf("📌 Part 2 (Mathematical): %d%n", part2MathResult);
            System.out.println();

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
    private long part1(String input) {
        return executeIntcode(input, 12, 2);
    }

    private int convertStringBuilderToInt(StringBuilder input) {
        return Integer.parseInt(input.toString());
    }

    private Map<Integer, Integer> parseIntMapCharByChar(String input) {

        StringBuilder currentNumber = new StringBuilder();
        Map<Integer, Integer> numberMap = new HashMap<>();
        int currentIndex = 0;

        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (c == ',') {
                numberMap.put(currentIndex, convertStringBuilderToInt(currentNumber));
                currentIndex++;
                currentNumber.setLength(0);
            } else {
                currentNumber.append(c);
            }
        }
        if (currentNumber.length() > 0) {
            numberMap.put(currentIndex, convertStringBuilderToInt(currentNumber));
        }
        return numberMap;

    }

    private Map<Integer, Integer> parseIntMapBySplit(String input) {
        String[] numbers = input.split(",");
        Map<Integer, Integer> numberMap = new HashMap<>(numbers.length * 4 / 3 + 1);

        for (int i = 0; i < numbers.length; i++) {
            int value = Integer.parseInt(numbers[i]);
            numberMap.put(i, value);
        }
        return numberMap;
    }

    private Map<Integer, Integer> parseIntMapWithStream(String input) {
        String[] parts = input.split(",");
        return IntStream.range(0, parts.length)
                .boxed()
                .collect(Collectors.toMap(
                        i -> i,
                        i -> Integer.parseInt(parts[i])));
    }

    private int executeIntcode(String input, int noun, int verb) {
        Map<Integer, Integer> numberMap = parseIntMapCharByChar(input);

        // Set the noun and verb values
        numberMap.put(1, noun);
        numberMap.put(2, verb);

        int key = 0;

        while (key < numberMap.size()) {
            int opcode = numberMap.get(key);

            if (opcode == 1) {
                int pos1 = numberMap.get(key + 1);
                int pos2 = numberMap.get(key + 2);
                int outputPos = numberMap.get(key + 3);
                int val1 = numberMap.get(pos1);
                int val2 = numberMap.get(pos2);

                numberMap.put(outputPos, val1 + val2);
                key += 4;
            } else if (opcode == 2) {
                int pos1 = numberMap.get(key + 1);
                int pos2 = numberMap.get(key + 2);
                int outputPos = numberMap.get(key + 3);
                int val1 = numberMap.get(pos1);
                int val2 = numberMap.get(pos2);

                numberMap.put(outputPos, val1 * val2);
                key += 4;
            } else if (opcode == 99) {
                break;
            } else {
                key += 4;
            }
        }

        return numberMap.get(0);
    }

    /**
     * Solves Part 2 using mathematical analysis instead of brute force.
     *
     * @param input list of input lines
     * @return the result for Part 2 (100 * noun + verb)
     */
    private long part2Mathematical(String input) {
        final int TARGET_OUTPUT = 19690720;

        // First, analyze the linear relationship
        int result00 = executeIntcode(input, 0, 0);
        int result10 = executeIntcode(input, 1, 0);
        int result01 = executeIntcode(input, 0, 1);

        // Calculate the linear coefficients
        int nounCoeff = result10 - result00;
        int verbCoeff = result01 - result00;

        // Solve: TARGET = base + nounCoeff*noun + verbCoeff*verb
        // Rearrange: nounCoeff*noun + verbCoeff*verb = TARGET - base
        int target = TARGET_OUTPUT - result00;

        // Try all possible noun values (0-99) and solve for verb
        for (int noun = 0; noun <= 99; noun++) {
            int remaining = target - nounCoeff * noun;

            // Check if verb can be an integer and within range
            if (remaining % verbCoeff == 0) {
                int verb = remaining / verbCoeff;
                if (verb >= 0 && verb <= 99) {
                    // Verify the solution
                    int verification = executeIntcode(input, noun, verb);
                    if (verification == TARGET_OUTPUT) {
                        return 100 * noun + verb;
                    }
                }
            }
        }

        return -1;
    }

    /**
     * Solves Part 2 of Day 2.
     * Brute force to find the noun and verb that produce the target output.
     *
     * @param input list of input lines
     * @return the result for Part 2 (100 * noun + verb)
     */
    private long part2(String input) {
        final int TARGET_OUTPUT = 19690720;

        for (int noun = 0; noun <= 99; noun++) {
            for (int verb = 0; verb <= 99; verb++) {
                int result = executeIntcode(input, noun, verb);

                if (result == TARGET_OUTPUT) {
                    return 100 * noun + verb;
                }
            }
        }
        return -1;
    }
}
