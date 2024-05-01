import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class day4 {
    public static void main(String[] args) {
        String filename;
        if (args.length > 0 && args[0].equals("sample")) {
            filename = "./inputs/sample_day4.txt";
        } else {
            filename = "./inputs/day4.txt";
        }
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            String[] drawnNumbers = bufferedReader.readLine().split(",");

            List<BingoCard> bingoCards = new ArrayList<>();

            String line;
            int rowCount = 0;
            BingoCard currentCard = new BingoCard();
            while ((line = bufferedReader.readLine()) != null) {
                if (!line.isEmpty()) {
                    String[] row = line.split("\\s+");
                    currentCard.addRow(row);
                    rowCount++;
                    if (rowCount == 5) {
                        bingoCards.add(currentCard);
                        currentCard = new BingoCard();
                        rowCount = 0;
                    }
                }
            }
            bufferedReader.close();

            int result1 = part1(drawnNumbers, bingoCards);
            System.out.println(
                    "What will your final score be if you choose that board? " + result1);

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static int part1(String[] drawnNumbers, List<BingoCard> bingoCards) {
        for (int i = 0; i < drawnNumbers.length; i++) {
            for (int j = 0; j < bingoCards.size(); j++) {
                boolean isCompleted = bingoCards.get(j).markNumber(drawnNumbers[i]);
                if (isCompleted) {
                    return bingoCards.get(j).calculateScore(drawnNumbers[i]);

                }

            }
        }
        return 0;

    }

    static class BingoCard {
        private List<String[]> rows;

        public BingoCard() {
            rows = new ArrayList<>();
        }

        public void addRow(String[] row) {
            rows.add(row);
        }

        public boolean markNumber(String number) {

            for (String[] row : rows) {

                for (int i = 0; i < row.length; i++) {

                    if (row[i].equals(number)) {
                        row[i] = "X";
                        boolean isCompleted = this.checkCompletedRows();
                        if (!isCompleted) {
                            isCompleted = this.checkCompletedColumns();
                        }
                        return isCompleted;
                    }
                }
            }
            return false;
        }

        private boolean checkCompletedRows() {
            for (String[] row : rows) {
                boolean completed = true;
                for (String number : row) {
                    if (!number.equals("X")) {
                        completed = false;
                        return completed;
                    }
                }
                if (completed) {
                    //System.out.println("Row completed!");
                    return completed;

                }

            }
            return false;
        }

        private boolean checkCompletedColumns() {
            for (int col = 0; col < 5; col++) {
                boolean completed = true;
                for (int row = 0; row < 5; row++) {
                    if (!rows.get(row)[col].equals("X")) {
                        completed = false;
                        break;
                    }
                }
                if (completed) {
                   //System.out.println("Column completed!");
                    return completed;
                }
            }
            return false;
        }

        public int calculateScore(String drawnNumber) {
            int score = 0;
            for (String[] row : rows) {
                for (String number : row) {
                    if (!number.equals("X") && !number.equals("")) {
                        score += Integer.parseInt(number);
                    }
                }
            }
            return score * Integer.parseInt(drawnNumber);
        }
    }

}
