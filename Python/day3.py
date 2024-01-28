def parse_data(file_path):
    number_coordinates = {}
    symbols_coordinates = {}
    with open(file_path, "r") as file:
        lines = file.readlines()
        for y, line in enumerate(lines):
            start_x, end_x = None, None
            current_number = None

            for x, char in enumerate(line):
                
                if char not in (".\n") and not char.isnumeric() :
                    symbols_coordinates[(x, y)] = char
                if char.isnumeric():
                    if current_number is None:
                        start_x = x
                        current_number = char
                    else:
                        current_number += char

                elif current_number is not None:
                    end_x = x - 1
                    number_coordinates[((start_x, end_x), (y))] = current_number
                    current_number = None
                    start_x, end_x = None, None

                
    return number_coordinates,symbols_coordinates

def check_adjacent(number, symbol):
    x_start, x_end = number[0]
    y = number[1]
    x_symbol = symbol[0]
    y_symbol = symbol[1]
   
    if ((abs(x_start - x_symbol) == 1 or abs(x_symbol - x_end) == 1) and y == y_symbol):
        return True

    for i in range(0,x_end - x_start + 1):
        if abs(x_start + i - x_symbol) <= 1 and abs(y - y_symbol) == 1:
            return True

    return False

def sum_of_adjacent(number_coordinates,symbols_coordinates):
    total = 0
    for coords_nums,number in number_coordinates.items():
        current_number = 0
        for coords_symbols in symbols_coordinates:
            if check_adjacent(coords_nums,coords_symbols):
                if (current_number == 0):
                 total += int(number)
                 current_number = number
    return total
          
file_path = "input/inputday3.txt"
number,symbol = parse_data(file_path)

print(f"Part 1 - Sum of all parts: {sum_of_adjacent(number,symbol)}")
#print(f"Part 2 - Total Calibration: {calculate_calibration(file_path,extract_number)}")
