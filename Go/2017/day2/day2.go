package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("Day 2\n Part 1:", part1())
	fmt.Println(" Part 2:", part2())
}
func readFile(filePath string) [][]int {
	var fileContent [][]int
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return nil
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		var lineContent []int
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.Atoi(field)
			if err != nil {
				fmt.Println("Error converting string to integer:", err)
				return nil
			}
			lineContent = append(lineContent, num)
		}

		fileContent = append(fileContent, lineContent)
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading file:", err)
	}
	return fileContent
}
func part1() int {
	filePath := "./input/day2.txt"

	var checksum int

	var fileContent = readFile(filePath)

	for i, line := range fileContent {
		var minimum int = fileContent[i][0]
		var maximum int = fileContent[i][0]
		for _, v := range line {
			if v > maximum {
				maximum = v
			}
			if v < minimum {
				minimum = v
			}
		}
		checksum += maximum - minimum
	}

	return checksum
}

func part2() int {
	filePath := "./input/day2.txt"

	var checksum int

	var fileContent = readFile(filePath)

	for _, line := range fileContent {
		sort.Ints(line)
		for i := 0; i < len(line); i++ {
			for j := i + 1; j < len(line); j++ {
				if line[j]%line[i] == 0 {
					checksum += line[j] / line[i]
					break
				}
			}
		}
	}
	return checksum
}
