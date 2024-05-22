
namespace AdventOfCode2020.Day5
{
    public class Part1
    {
        public static int SolvePuzzle(string[] input)
        {
            double seatID = 0;
            foreach (string line in input)
            {
                double fbStart = 0;
                double fbEnd = 127;
                double lrStart = 0;
                double lrEnd = 7;
                double row = 0;
                double column = 0;

                for (int i = 0; i < line.Length; i++)
                {

                    if (i == 6)
                    {
                        row = line[i] == 'F' ? Math.Min(fbEnd, fbStart) : Math.Max(fbEnd, fbStart);
                    }
                    if (i == 9)
                    {
                        column = line[i] == 'L' ? Math.Min(lrEnd, lrStart) : Math.Max(lrEnd, lrStart);
                    }
                    if (line[i] == 'F')
                    {
                        fbEnd -= Math.Ceiling((fbEnd - fbStart) / 2);
                    }
                    if (line[i] == 'B')
                    {
                        fbStart += Math.Ceiling((fbEnd - fbStart) / 2);
                    }
                    if (line[i] == 'L')
                    {
                        lrEnd -= Math.Ceiling((lrEnd - lrStart) / 2);

                    }
                    if (line[i] == 'R')
                    {
                        lrStart += Math.Ceiling((lrEnd - lrStart) / 2);
                    }

                }
                seatID = Math.Max(seatID, row * 8 + column);

            }
            return Convert.ToInt32(seatID);
        }
    }
    public class Part2
    {
        public static int SolvePuzzle(string[] input)
        {
            List<double> seatID = [];
            foreach (string line in input)
            {
                double fbStart = 0;
                double fbEnd = 127;
                double lrStart = 0;
                double lrEnd = 7;
                double row = 0;
                double column = 0;

                for (int i = 0; i < line.Length; i++)
                {

                    if (i == 6)
                    {
                        row = line[i] == 'F' ? Math.Min(fbEnd, fbStart) : Math.Max(fbEnd, fbStart);
                    }
                    if (i == 9)
                    {
                        column = line[i] == 'L' ? Math.Min(lrEnd, lrStart) : Math.Max(lrEnd, lrStart);
                    }
                    if (line[i] == 'F')
                    {
                        fbEnd -= Math.Ceiling((fbEnd - fbStart) / 2);
                    }
                    if (line[i] == 'B')
                    {
                        fbStart += Math.Ceiling((fbEnd - fbStart) / 2);
                    }
                    if (line[i] == 'L')
                    {
                        lrEnd -= Math.Ceiling((lrEnd - lrStart) / 2);

                    }
                    if (line[i] == 'R')
                    {
                        lrStart += Math.Ceiling((lrEnd - lrStart) / 2);
                    }

                }
                seatID.Add(row * 8 + column);
            }
            seatID.Sort();
            double mySeat;
            int j = 0;
            while (seatID[j] + 1 == seatID[j + 1])
            {
                j++;
            }
            mySeat = seatID[j] + 1;
            return Convert.ToInt32(mySeat);
        }
    }
}