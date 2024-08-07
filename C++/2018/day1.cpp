#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main()
{
    string filePath = "./inputs/day1.txt";

    ifstream inputFile(filePath);
    if (!inputFile.is_open())
    {
        std::cerr << "Unable to open file: " << filePath << std::endl;
        return 1;
    }
    string line;
    int number = 0;
    while (getline(inputFile, line))
    {
        number += stoi(line);
        }
    inputFile.close();
    cout << "Day 1 part 1: " << number << endl;
    return 0;
}