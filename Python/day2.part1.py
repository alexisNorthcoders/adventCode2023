import re

def parse_data(file_path):
    game_data = {}
    

    with open(file_path, "r") as file:
        lines = file.readlines()

        for line in lines:
            line_split = line.split(":")
            game_id=re.search(r"(\d+)",line_split[0]).group(1)
            subsets = line_split[1].split(";")
            subset = []
            for game in subsets:
                bag = {}
                cubes = re.findall(r"(\d+) (red|blue|green)",game)
                for count,color in cubes:
                    bag[color]=count
                subset.append(bag)
            game_data[game_id]=subset
    return game_data

def sum_valid_game_ids(game_data):

    sum_of_ids = 0

    for game_id, subsets in game_data.items():
        is_game_valid = True
        for color in subsets:
            blue_count = int(color.get("blue",0))
            red_count = int(color.get("red",0))
            green_count = int(color.get("green",0))
            
            if blue_count > 14 or red_count > 12 or green_count > 13:
                is_game_valid = False
        if is_game_valid == True:
            sum_of_ids += int(game_id)
    return sum_of_ids

file_path = "input/inputday2.txt"
data_parsed = parse_data(file_path)
print(f"Sum of valid IDs: {sum_valid_game_ids(data_parsed)}")