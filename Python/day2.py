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

def sum_of_power_of_sets(game_data):
    total = 0
    for game_id, subsets in game_data.items():
        max_color_counts = {"blue":0,"red":0,"green":0}
        for color in subsets:
            for key in max_color_counts:
                count = int(color.get(key,0))
                max_color_counts[key] = max(max_color_counts[key],count)
            
        power_of_colors = 1    
        for key in max_color_counts:
            power_of_colors = power_of_colors*max_color_counts[key]
        total += power_of_colors

    return total


file_path = "input/inputday2.txt"
data_parsed = parse_data(file_path)
print(f"Part 1 - Sum of valid IDs: {sum_valid_game_ids(data_parsed)}")
print(f"Part 2 - Sum of the power of sets: {sum_of_power_of_sets(data_parsed)}")