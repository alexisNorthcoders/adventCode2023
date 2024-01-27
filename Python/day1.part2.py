import re
def convert_word_to_digit(word):
    word_to_digit_mapping = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    }
    return word_to_digit_mapping.get(word)
    
def extract_number(line):
      pattern = r'(?=(one|two|three|four|five|six|seven|eight|nine|\d))'
      regex = re.compile(pattern)
      get_numbers = re.findall(regex,line)
      
      first_element = convert_word_to_digit(get_numbers[0]) if not get_numbers[0].isdigit() else get_numbers[0]
      last_element = convert_word_to_digit(get_numbers[-1]) if not get_numbers[-1].isdigit() else get_numbers[-1]
      
      return int(f"{first_element}{last_element}")
 
def calculate_calibration(file_path):
    calibration = 0
    with open (file_path,"r") as file:
        lines = file.readlines()
        for line in lines:
            extracted_number = extract_number(line)
            calibration += extracted_number
            
    return calibration

file_path = "input/inputday1.txt"
print(f"Sum of Combined Calibration Values: {calculate_calibration(file_path)}")





