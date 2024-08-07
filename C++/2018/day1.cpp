#include <iostream>
#include <fstream>
#include <string>
#include <unordered_set>
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
    unordered_set<int> numbers;
    bool duplicateFound = false;

    numbers.insert(frequency);

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

            if (numbers.find(frequency) != numbers.end())
            {
                duplicateFound = true;
                break;
            }
            numbers.insert(frequency);
        }

        inputFile.close();
    }

    return frequency;
}

int main()
{
    int choice;
    string filePath = "./inputs/";

    cout << "Select the input file:" << endl;
    cout << "1. Sample" << endl;
    cout << "2. Full Input" << endl;
    cout << "Enter your choice (1 or 2): ";
    cin >> choice;

    switch (choice)
    {
    case 1:
        filePath += "sample_day1.txt";
        break;
    case 2:
        filePath += "day1.txt";
        break;
    default:
        cerr << "Invalid choice. Exiting program." << endl;
        return 1;
    }
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