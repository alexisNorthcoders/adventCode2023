import re
def extract_digits(line):
    digits = re.findall(r"\d",line)
    combined_digits = int(f"{digits[0]}{digits[-1]}")
    return combined_digits
     

def calculate_calibration(file_path):
    calibration = 0
    with open (file_path,"r") as file:
        lines = file.readlines()
        for line in lines:
            combined_digits = extract_digits(line)
            calibration += combined_digits
    
    return calibration
    

file_path = "input/inputday1.txt"
print(f"Total Calibration: {calculate_calibration(file_path)}")




