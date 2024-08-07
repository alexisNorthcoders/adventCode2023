#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <base_name>"
  exit 1
fi
BASE_NAME="$1"
SOURCE_FILE="${BASE_NAME}.cpp"
OUTPUT_FILE="${BASE_NAME}"

# Function to compile and run the C++ program
compile_and_run() {
  g++ -o $OUTPUT_FILE $SOURCE_FILE
  if [ $? -eq 0 ]; then
    echo "Compilation successful. Running the program..."
    ./$OUTPUT_FILE
  else
    echo "Compilation failed."
  fi
}

# Initial compilation and run
compile_and_run

# Watch mode loop
while inotifywait -e close_write $SOURCE_FILE; do
  echo "Detected change in $SOURCE_FILE. Recompiling..."
  compile_and_run
done