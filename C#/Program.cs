using System;
using System.IO;

namespace AdventOfCode2020
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 1 || args.Length > 2)
            {
                Console.WriteLine("Usage: dotnet run <day_number> [sample]");
                return;
            }
            string dayNumber = args[0];
            bool isSample =
                args.Length == 2 && args[1].Equals("sample", StringComparison.OrdinalIgnoreCase);
            string inputFilePath = isSample
                ? $"Day{dayNumber}/sample_input.txt"
                : $"Day{dayNumber}/input.txt";

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
            Type? classType = Type.GetType(className);
            System.Reflection.MethodInfo? solveMethod = classType?.GetMethod("SolvePuzzle");

            if (solveMethod != null)
            {
                object? result = solveMethod.Invoke(null, new object[] { lines });
                if (result != null)
                {
                    return result;
                }
                else
                {
                    throw new InvalidOperationException("SolvePuzzle returned null.");
                }
            }
            else
            {
                throw new InvalidOperationException("SolvePuzzle method not found.");
            }
        }
    }
}
