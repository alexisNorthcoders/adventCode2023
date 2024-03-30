using System;
using System.IO;

namespace AdventOfCode2020
{
    class Program
    {
        static void Main(string[] args)
        {
             if (args.Length < 1)
            {
                Console.WriteLine("Usage: dotnet run <day_number> ");
                return;
            }
            string dayNumber = args[0];
            string inputFilePath = $"Day{dayNumber}/input.txt";

            string[] lines = File.ReadAllLines(inputFilePath);

            string classNamePart1 = $"AdventOfCode2020.Day{dayNumber}.Part1";
            string classNamePart2 = $"AdventOfCode2020.Day{dayNumber}.Part2";

            int result1 = (int)InvokeSolvePuzzleMethod(classNamePart1, lines);

            int result2 = (int)InvokeSolvePuzzleMethod(classNamePart2, lines);

            Console.WriteLine("Part 1: " + result1);
            Console.WriteLine("Part 2: " + result2);
        }

        static object InvokeSolvePuzzleMethod(string className, string[] lines)
        {
            // Get the Type object for the class
            Type classType = Type.GetType(className);

            // Get the MethodInfo object for the SolvePuzzle method
            System.Reflection.MethodInfo solveMethod = classType.GetMethod("SolvePuzzle");

            
            return solveMethod.Invoke(null, new object[] { lines });
        }
    }
}
