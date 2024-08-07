#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

int firstPart(const string &filePath)
{
    ifstream inputFile(filePath);
    if (!inputFile.is_open())
    {
        cerr << "Unable to open file: " << filePath << endl;
        return -1;
    }

    string line;
    int frequency = 0;
    while (getline(inputFile, line))
    {
        frequency += stoi(line);
    }
    inputFile.close();
    return frequency;
}

int secondPart(const string &filePath)
{

    int result = 0;
    int frequency = 0;

    vector<int> numbers;
    bool duplicateFound = false;
    numbers.push_back(frequency);
    while (!duplicateFound)
    {
        string line;
        ifstream inputFile(filePath);
        if (!inputFile.is_open())
        {
            cerr << "Unable to open file: " << filePath << endl;
            return -1;
        }
        while (getline(inputFile, line))
        {
            frequency += stoi(line);

            for (int i = 0; i < numbers.size(); i++)
            {
                if (frequency == numbers[i])
                {
                    duplicateFound = true;
                    return frequency;
                }
            }
            numbers.push_back(frequency);
        }

        inputFile.close();
    }

    return 0;
}

int main()
{
    string filePath = "./inputs/day1.txt";

    int resultPart1 = firstPart(filePath);
    if (resultPart1 != -1)
    {
        cout << "Day 1 part 1: " << resultPart1 << endl;
    }

    int resultPart2 = secondPart(filePath);
    if (resultPart2 != -1)
    {
        cout << "Day 1 part 2: " << resultPart2 << endl;
    }

    return 0;
}
