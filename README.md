# adventCode2023

This is the first time I'm trying this challenge.

Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like.

I chose to use JavaScript to tackle this challenge.

You get a puzzle with 2 parts each day of the Advent calendar.
Each puzzle uses a single input file with data.

After completing the first part of the puzzle you gain access to the second part.
The second part usually increases in difficulty and requires you to refactor your part 1 solution to solve the puzzle.

Day 1:
Part 1:

- Find the first digit in the line.
- Find the last digit in the line.
- Join first and last digit to form a number.
- Return the sum of all.

  Part 2:
  
- Create array to store spelled out digits in order.
- Find the first digit or spelled out digit in the line.
- Find the last digit or spelled out digit the line.
- Convert spelled out digit to digit using our array as reference.
- Join both to form a number.
- Return the sum of all.

Day 2:
Part 1:

- Create array to store our valid sets.
- Parse data to get each individual set.
- Parse each individual set to get number of cubes.
- Find if game would be possible and use a boolean switch.
- If game possible add to our array.
- Return sum of all valid sets.

Part 2:

- Create array to store our valid sets.
- Parse data to get each individual set.
- Parse each individual set to get number of cubes.
- Find minimum number of cubes to play the game.
- Multiply number of cubes and add to the array.
- Return sum of all values in our array.

Day 3:
Part 1:
- Define regex to extract symbols and numbers line by line.
- Create arrays to store coordinates of symbols and numbers.
- Create reusable function to check if number and symbol are adjacent.
- Call function with our 2 arrays of coordinates.
- Returns sum of all valid numbers. 

Part 2:
- Define regex to extract * symbol and numbers line by line.
- Create arrays to store coordinates  of * symbol and numbers.
- Create reusable function to check if number and symbol are adjacent.
- Call function with our 2 arrays of coordinates.
- Find * symbol with exactly 2 numbers adjacent.
- Multiply both numbers together.
- Returns sum of all valid numbers. 

Day 4:
Part 1:
- Parse data to extract your numbers and the winning numbers.
- Create array to store points.
- Read line by line and calculate total winning points.
- Return total.

Part 2:
- Parse data to extract your numbers and the winning numbers.
- Create object to store how many scratch cards to add.
- Create array to store number of scratch cards.
- Read line and calculate total scratch cards won and how many to add.
- Add scratch cards to the next line.
- Read next line.
- Return total amount of scratch cards.

Day 5: 
Part 1:
- Parse data to extract seeds numbers.
- Parse data to extract different maps.
- Create array with all the different maps.
- Create array to store final locations.
- Loop through seeds and loop through maps to find final location.
- Push location to our array.
- Sort array and get the lowest location.

Part 2:
// bruteforce solution, not recommended, it took 7 hours to complete
// 1.8 billion seeds where checked individually.
- Parse data to extract seeds ranges.
- Parse data to extract different maps.
- Create variable to store lowest location, set to infinity.
- Loop seed by seed to find final location.
- Compare with our variable to check if it is a lower location.
- Return lowest location.

Day 6:
Part 1:
- Parse data to extract distance record and time limit.
- For each race, calculate all possible distances.
- Count all distances higher than the record.
- Return all counts multiplied with each other.

Part 2:
// bruteforce solution, takes some seconds to solve
- Parse data to extract race distance record and race time limit.
- Calculate all possible distances.
- Count all distances higher than the record.
- Return count.

// quadratic solution
- Parse data to extract race distance record and race time limit.
- Use quadratic solver function to find the roots of our quadratic expression.
- distance = time * i - i^2
- Calculate how many integers are between the roots.
- Return this value.








 



