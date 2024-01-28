import re
def parse_data(file_path):
    winning_numbers=[]
    my_numbers=[]
    with open(file_path, "r") as file:
        lines = file.readlines()
        for line in lines:
            _,right = line.split(":")
            winning,my = right.split("|")
            numbers = []
            for num in winning.split():
                if num.isdigit():
                    numbers.append(num)
            number_set = set(numbers)
            winning_numbers.append(number_set)

            my_numbers.append(set([num for num in my.split() if num.isdigit()]))
           
    return winning_numbers,my_numbers

def total_points(parsed_data):
    winning_numbers, my_numbers = parsed_data
    
    prized_numbers = []

    for winning_set, my_set in zip(winning_numbers, my_numbers):
        intersection_set = winning_set.intersection(my_set)
        prized_numbers.append(intersection_set)

    points = 0

    for prized_numbers_set in prized_numbers:
        if len(prized_numbers_set) > 0:
            points += 2 ** (len(prized_numbers_set) - 1)
        
    return points


file_path = "input/inputday4.txt"

print(f"Part 1 - Total points: {total_points(parse_data(file_path))}")
