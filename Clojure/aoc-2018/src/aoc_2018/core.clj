(ns aoc-2018.core
  (:require
   [aoc-2018.day1 :as day1]
   [clojure.string :as str]))

(defn -main [& args]
  (let [day (if (seq args) (first args) "day1")]
    (case day
      "day1" (day1/solve)
      "day2" (day2/solve)
      (println "Invalid day specified."))))

(defn parse-input [filename]
  (let [path (str "resources/" filename ".txt")]
    (map #(Integer/parseInt %) (str/split (slurp path) #"\n"))))
