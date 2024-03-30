using System;
using System.IO;

namespace AdventOfCode2020
{
    class Program
    {
        static void Main(string[] args)
        {
            
            string inputFilePath = "Day1/input.txt";
            string[] lines = File.ReadAllLines(inputFilePath);

           
            int result1 = AdventOfCode2020.Day1.Part1.SolvePuzzle(lines);
             int result2 = AdventOfCode2020.Day1.Part2.SolvePuzzle(lines);

           
            Console.WriteLine("Find the two entries that sum to 2020; what do you get if you multiply them together?: " + result1);
            Console.WriteLine("what is the product of the three entries that sum to 2020?: " + result2);
        }
    }
}