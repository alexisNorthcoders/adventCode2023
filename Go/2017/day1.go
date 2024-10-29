package main

import (
	"bufio"
	"fmt"
	"os"
)

func main(){
	fmt.Println("Day 1\n Part 1:",part1())
}
func readFile(filePath string)([]int){
	var fileContent []int
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error", err)
		return nil
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		for i := range line {
			fileContent = append(fileContent,int(line[i]-'0'))
		}
	}
	
	if err := scanner.Err(); err != nil {
		fmt.Println("Error", err)
	}
	return fileContent
}
func part1()(int){
	filePath := "./input/day1.txt"
	
	var fileContent = readFile(filePath)
	var sum int
	for i,v := range fileContent{
		if i == 0{
			if v == fileContent[len(fileContent)-1]{
				sum += v
			}
			continue
		}
		if v == fileContent[i-1]{
			sum += v
		}
	}
	return sum
}