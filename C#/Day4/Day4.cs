
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
                            passport.Byr = value;
                            break;
                        case "iyr":
                            passport.Iyr = value;
                            break;
                        case "eyr":
                            passport.Eyr = value;
                            break;
                        case "hgt":
                            passport.Hgt = value;
                            break;
                        case "hcl":
                            passport.Hcl = value;
                            break;
                        case "ecl":
                            passport.Ecl = value;
                            break;
                        case "pid":
                            passport.Pid = value;
                            break;
                        case "cid":
                            passport.Cid = value;
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
                                passport.Byr = value;
                                break;
                            }
                            break;

                        case "iyr":
                            int iyear;
                            if (int.TryParse(value, out iyear))
                            {
                                if (iyear < 2010 || iyear > 2020) { break; }
                                passport.Iyr = value;
                                break;
                            }
                            break;

                        case "eyr":
                            int year;
                            if (int.TryParse(value, out year))
                            {
                                if (year < 2020 || year > 2030) { break; }
                                passport.Eyr = value;
                                break;
                            }
                            break;
                        case "hgt":
                            if (value.Contains("cm"))
                            {
                                int height = int.Parse(value.Split("cm")[0]);
                                if (height < 150 || height > 193) { break; }
                                passport.Hgt = value;
                            }
                            else if (value.Contains("in"))
                            {
                                int height = int.Parse(value.Split("in")[0]);
                                if (height < 59 || height > 76) { break; }
                                passport.Hgt = value;
                            }

                            break;
                        case "hcl":
                            if (!value.Contains('#') || value.Length != 7) { break; }
                            passport.Hcl = value;
                            break;
                        case "ecl":
                            if (!validColors.Contains(value)) { break; }
                            passport.Ecl = value;
                            break;
                        case "pid":
                            if (value.Length != 9) { break; }
                            passport.Pid = value;
                            break;
                        case "cid":
                            passport.Cid = value;
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
        private string byr;
        private string iyr;
        private string eyr;
        private string hgt;
        private string hcl;
        private string ecl;
        private string pid;
        private string? cid;

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
        public void StringPassport()
        {
            Console.WriteLine($"byr:{byr} iyr:{iyr} eyr:{eyr} hgt:{hgt} hcl:{hcl} ecl:{ecl} pid:{pid}");
        }

        public string? Cid
        {
            get => cid;
            set => cid = value;
        }
        public string Ecl
        {
            get => ecl;
            set => ecl = value;
        }
        public string Byr
        {
            get => byr;
            set => byr = value;
        }
        public string Iyr
        {
            get => iyr;
            set => iyr = value;
        }
        public string Eyr
        {
            get => eyr;
            set => eyr = value;
        }
        public string Hgt
        {
            get => hgt;
            set => hgt = value;
        }
        public string Hcl
        {
            get => hcl;
            set => hcl = value;
        }
        public string Pid
        {
            get => pid;
            set => pid = value;
        }

    }
}