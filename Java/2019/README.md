# Advent of Code 2019 - Java Edition

This project contains solutions for Advent of Code 2019 puzzles implemented in Java 21.

## Project Structure

```
Java/2019/
├── pom.xml                                    # Maven configuration
├── CreateFiles.java                           # File generator utility
├── README.md                                  # This file
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── adventofcode/
        │           └── aoc2019/
        │               ├── Main.java          # Main runner class
        │               ├── Day1.java          # Day 1 solution
        │               ├── Day2.java          # Day 2 solution (when created)
        │               └── utils/
        │                   ├── InputReader.java  # Input file utilities
        │                   └── Timer.java        # Timing utilities
        └── resources/
            └── inputs/
                ├── day1.txt                  # Actual input files
                ├── sample_day1.txt           # Sample input files
                └── ...
```

## Prerequisites

- **Java 21** (or later)
- **Maven 3.6+** (for building and running)

## Getting Started

### 1. Compile the Project

```bash
mvn compile
```

### 2. Run a Day's Solution

```bash
# Run Day 1 with actual input
mvn exec:java -Dexec.args="1"

# Run Day 1 with sample input
mvn exec:java -Dexec.args="1 sample"
```

### 3. Create New Day Files

```bash
# Compile the file generator first
javac CreateFiles.java

# Create files for Day 2
java CreateFiles 2
```

## Usage Examples

### Running Solutions

```bash
# Run Day 1 with real input
mvn exec:java -Dexec.args="1"

# Run Day 1 with sample input  
mvn exec:java -Dexec.args="1 sample"

# Run Day 5 with sample input
mvn exec:java -Dexec.args="5 sample"
```

### Creating New Days

```bash
# Create Day 2 files
java CreateFiles 2

# This creates:
# - src/main/java/com/adventofcode/aoc2019/Day2.java
# - src/main/resources/inputs/day2.txt
# - src/main/resources/inputs/sample_day2.txt
```

## Key Java Concepts Used

### Modern Java Features (Java 21)
- **Text Blocks** (`"""`) for multi-line strings
- **var** keyword for type inference
- **Switch Expressions** for cleaner control flow
- **Records** for data classes (when appropriate)

### Project Structure
- **Packages** for code organization (`com.adventofcode.aoc2019`)
- **Maven** for dependency management and building
- **Standard Directory Layout** (`src/main/java`, `src/main/resources`)

### Code Patterns
- **Static Methods** for utilities
- **Instance Methods** for day solutions
- **Exception Handling** with try-catch blocks
- **Reflection** for dynamic class loading
- **Javadoc** for documentation

## Development Workflow

1. **Create new day**: `java CreateFiles <day_number>`
2. **Add input data**: Edit the generated `.txt` files in `src/main/resources/inputs/`
3. **Implement solution**: Edit the generated `Day<number>.java` file
4. **Test with sample**: `mvn exec:java -Dexec.args="<day> sample"`
5. **Run with real input**: `mvn exec:java -Dexec.args="<day>"`

## File Templates

Each day follows this pattern:

```java
public class DayX {
    public void run(boolean useSample) {
        // Read input and time execution
    }
    
    private long part1(List<String> input) {
        // Your Part 1 logic here
    }
    
    private long part2(List<String> input) {
        // Your Part 2 logic here
    }
}
```

## Utilities

### InputReader
- `readLines(dayNumber, useSample)` - Read input as list of strings
- `readContent(dayNumber, useSample)` - Read input as single string
- `fileExists(dayNumber, useSample)` - Check if input file exists

### Timer
- `Timer.start("name")` - Start timing
- `timer.stop()` - Stop and print elapsed time

## Tips for Java Beginners

1. **Compile First**: Always run `mvn compile` after making changes
2. **Use IDE**: Consider using IntelliJ IDEA or VS Code with Java extensions
3. **Read Errors**: Java error messages are very helpful - read them carefully
4. **Type Everything**: Java requires explicit types, unlike JavaScript
5. **Handle Exceptions**: Java forces you to handle potential errors

## Troubleshooting

### Common Issues

**"Class not found"**: Make sure you've compiled with `mvn compile`

**"File not found"**: Check that input files exist in `src/main/resources/inputs/`

**"Day X class not found"**: Make sure you've created the Day class with `java CreateFiles X`

**Compilation errors**: Check Java syntax - every statement needs a semicolon, braces must match, etc.

Happy coding! 🎄☕
