#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main()
{
    string filePath = "./inputs/sample_day1.txt";

    ifstream inputFile(filePath);
    if (!inputFile.is_open()) {
        std::cerr << "Unable to open file: " << filePath << std::endl;
        return 1;
    }
    string line;
    while (getline(inputFile,line)){
        cout << line << endl;
    }
    return 0;
}