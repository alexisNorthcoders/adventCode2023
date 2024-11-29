#!/bin/bash

day_files=$(ls day*.js 2>/dev/null)

echo "--- Running all 'day*.js' files ---"

for file in $day_files; do
    echo -e "\n🌟 Running: $file"
    echo "-----------------------------------"
    node "$file"
done

echo -e "\n✅ All days executed successfully!"
