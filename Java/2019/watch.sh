#!/bin/bash

echo "🔍 Watching Java files for changes..."
echo "Press Ctrl+C to stop"

# Function to run the code
run_code() {
    echo "🔄 File changed, compiling and running..."
    mvn compile -q
    if [ $? -eq 0 ]; then
        echo "✅ Compilation successful!"
        echo "🚀 Running Day 1 with sample input..."
        java -cp target/classes com.adventofcode.aoc2019.Main 1 sample
        echo "---"
    else
        echo "❌ Compilation failed!"
        echo "---"
    fi
}

# Run once at start
run_code

# Check if inotifywait is available
if command -v inotifywait >/dev/null 2>&1; then
    echo "Using inotifywait for file watching..."
    # Watch for changes in Java files
    while inotifywait -e modify,create,delete -r src/main/java/ 2>/dev/null; do
        run_code
    done
else
    echo "inotifywait not found, using polling method..."
    echo "Checking for changes every 2 seconds..."
    
    # Get initial file timestamps
    last_modified=$(find src/main/java -name "*.java" -exec stat -c %Y {} \; | sort -n | tail -1)
    
    while true; do
        sleep 2
        current_modified=$(find src/main/java -name "*.java" -exec stat -c %Y {} \; | sort -n | tail -1)
        
        if [ "$current_modified" != "$last_modified" ]; then
            last_modified=$current_modified
            run_code
        fi
    done
fi
