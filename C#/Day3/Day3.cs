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
        public static long SolvePuzzle(string[] input)
        {
            int[] slopesX = { 1, 3, 5, 7, 1 };
            int[] slopesY = { 1, 1, 1, 1, 2 };
            long result = 1;

            for (int i = 0; i < slopesX.Length; i++)
            {
                result *= findTrees(input, slopesX[i], slopesY[i]);
            }

            return result;
        }

        public static long findTrees(string[] input, int positionX, int positionY)
        {
            long treeCounter = 0;
            int posX = positionX;
            int slopeLength = input[0].Length;
            for (int i = positionY; i < input.Length; i += positionY)
            {
                if (input[i][posX] == '#')
                {
                    treeCounter++;
                }
                posX += positionX;
                posX %= slopeLength;
            }
            return treeCounter;
        }
    }
}
