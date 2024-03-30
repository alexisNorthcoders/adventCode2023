using System.IO;

namespace AdventOfCode2020.Day1
{
    public class Part1
    {
        public static int SolvePuzzle(string[] input)
        {
                int[] numbers = Array.ConvertAll(input, int.Parse);

            for (int i = 0; i < numbers.Length; i++)
            {
                for (int j = i + 1; j < numbers.Length; j++)
                {
                    if (numbers[i] + numbers[j] == 2020)
                    {
                        return numbers[i] * numbers[j];
                    }
                }
            }

           return -1;
        }
    }
    public class Part2
    {
        public static int SolvePuzzle(string[] input)
        {
                int[] numbers = Array.ConvertAll(input, int.Parse);

            for (int i = 0; i < numbers.Length; i++)
            {
                for (int j = i + 1; j < numbers.Length; j++)
                {
                     for (int k = 0; k < numbers.Length; k++)
            {
                    if (numbers[i] + numbers[j] + numbers[k] == 2020)
                    {
                        return numbers[i] * numbers[j] * numbers[k];
                    }
                }
            }
            }
           return -1;
        }
    }
}