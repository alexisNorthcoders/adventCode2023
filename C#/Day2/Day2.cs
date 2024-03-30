using System.IO;

namespace AdventOfCode2020.Day2
{
    public class Part1
    {
        public static int SolvePuzzle(string[] input)
        {
            int validPasswords = 0;
            for (int i = 0; i < input.Length; i++)
            {
                string[] split = input[i].Split(" ");
                string[] minMax = split[0].Split("-");
                int min = int.Parse(minMax[0]);
                int max = int.Parse(minMax[1]);
                char charToCheck = split[1][0];
                string password = split[2];
                int charCounter = 0;
                
                // int counter = password.Split(charToCheck).Length -1;
                for (int j=0;j<password.Length;j++){
                    if (password[j] == charToCheck){
                        charCounter++;
                    }
                }
                if (charCounter >= min && charCounter <= max){
                    validPasswords++;

                }
                
            }
            return validPasswords;
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
