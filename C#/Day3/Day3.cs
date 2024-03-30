using System.IO;

namespace AdventOfCode2020.Day3
{
    public class Part1
    {
        public static int SolvePuzzle(string[] input)
        {
            int treeCounter = 0;
            int positionX = 3;
            int slopeLength = input[0].Length;
            for (int i = 1; i < input.Length; i++)
            {
                if (input[i][positionX] == '#')
                {
                    treeCounter++;
                }
                positionX += 3;
                positionX = positionX % slopeLength;
            }
            return treeCounter;
        }
    }

    public class Part2
    {
        public static int SolvePuzzle(string[] input)
        {
            return -1;
        }
    }
}
