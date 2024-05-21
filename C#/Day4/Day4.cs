
namespace AdventOfCode2020.Day4
{
    public class Part1
    {
        public static int SolvePuzzle(string[] input)
        {
            int counter = 0;
            Passport passport = new Passport();
            foreach (string line in input)
            {
                if (string.IsNullOrWhiteSpace(line))

                {
                    if (passport.IsPassportValid()) { counter++; }
                    passport = new Passport();
                    continue;
                }
                String[] lineSplit = line.Split(" ");
                foreach (string splitline in lineSplit)
                {
                    String[] splitColon = splitline.Split(":");
                    string key = splitColon[0];
                    string value = splitColon[1];
                    switch (key)
                    {
                        case "byr":
                            passport.byr = value;
                            break;
                        case "iyr":
                            passport.iyr = value;
                            break;
                        case "eyr":
                            passport.eyr = value;
                            break;
                        case "hgt":
                            passport.hgt = value;
                            break;
                        case "hcl":
                            passport.hcl = value;
                            break;
                        case "ecl":
                            passport.ecl = value;
                            break;
                        case "pid":
                            passport.pid = value;
                            break;
                        case "cid":
                            passport.cid = value;
                            break;

                    }
                }

            }

            if (passport.IsPassportValid()) { counter++; }
            return counter;
        }
    }
    public class Part2
    {
        public static int SolvePuzzle(string[] input)
        {
            int counter = 0;
            String[] validColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
            Passport passport = new Passport();
            foreach (string line in input)
            {
                if (string.IsNullOrWhiteSpace(line))

                {
                    if (passport.IsPassportValid()) { counter++; }
                    passport = new Passport();
                    continue;
                }
                String[] lineSplit = line.Split(" ");
                foreach (string splitline in lineSplit)
                {
                    String[] splitColon = splitline.Split(":");
                    string key = splitColon[0];
                    string value = splitColon[1];
                    switch (key)
                    {
                        case "byr":
                            int byear;
                            if (int.TryParse(value, out byear))
                            {
                                if (byear < 1920 || byear > 2002) { break; }
                                passport.byr = value;
                                break;
                            }
                            break;

                        case "iyr":
                            int iyear;
                            if (int.TryParse(value, out iyear))
                            {
                                if (iyear < 2010 || iyear > 2020) { break; }
                                passport.iyr = value;
                                break;
                            }
                            break;

                        case "eyr":
                            int year;
                            if (int.TryParse(value, out year))
                            {
                                if (year < 2020 || year > 2030) { break; }
                                passport.eyr = value;
                                break;
                            }
                            break;
                        case "hgt":
                            if (value.Contains("cm"))
                            {
                                int height = int.Parse(value.Split("cm")[0]);
                                if (height < 150 || height > 193) { break; }
                                passport.hgt = value;
                            }
                            else if (value.Contains("in"))
                            {
                                int height = int.Parse(value.Split("in")[0]);
                                if (height < 59 || height > 76) { break; }
                                passport.hgt = value;
                            }

                            break;
                        case "hcl":
                            if (!value.Contains('#') || value.Length != 7) { break; }
                            passport.hcl = value;
                            break;
                        case "ecl":
                            if (!validColors.Contains(value)) { break; }
                            passport.ecl = value;
                            break;
                        case "pid":
                            if (value.Length != 9) { break; }
                            passport.pid = value;
                            break;
                        case "cid":
                            passport.cid = value;
                            break;

                    }
                }

            }

            if (passport.IsPassportValid()) { counter++; }
            return counter;
        }
    }
    class Passport
    {
        public string byr;
        public string iyr;
        public string eyr;
        public string hgt;
        public string hcl;
        public string ecl;
        public string pid;
        public string? cid;

        public Passport()
        {
            byr = string.Empty;
            iyr = string.Empty;
            eyr = string.Empty;
            hgt = string.Empty;
            hcl = string.Empty;
            ecl = string.Empty;
            pid = string.Empty;
            cid = null;
        }
        public bool IsPassportValid()
        {
            if (byr == string.Empty || iyr == string.Empty || eyr == string.Empty || hgt == string.Empty || hcl == string.Empty || ecl == string.Empty || pid == string.Empty)
            {
                return false;
            }
            return true;
        }
       
    }
}