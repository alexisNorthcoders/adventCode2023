
namespace AdventOfCode2020.Day6
{
    public class Part1
    {
        public static int SolvePuzzle(string[] input)
        {
            HashSet<char> yesVotes = [];
            int counter = 0;
            foreach (string line in input)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    counter += yesVotes.Count;
                    yesVotes = [];
                }

                foreach (char letter in line)
                {
                    yesVotes.Add(letter);
                }
            }
            counter += yesVotes.Count;
            return counter;
        }
    }
    public class Part2
    {
        public static int SolvePuzzle(string[] input)
        {
            return 0;
        }
    }

}