(ns aoc-2024.day2
  (:require [clojure.string :as str]
            [aoc-2024.utils :as utils]))

(defn isSafe [line]
  (let [ascendent (apply < line)
        descendent (apply > line)
        less-than-four (every? #(< (abs %) 4) (map #(apply - %) (partition 2 1 line)))]
    (and less-than-four (or ascendent descendent))))

(defn part-1 [input]
  (let [lines input]
    (count (filter true? (map (fn [line]
                                (let [parsed-line (map #(Integer/parseInt %)
                                                       (clojure.string/split line #"\s+"))]
                                  (isSafe parsed-line)))
                              lines)))))

(defn part-2 [input])


(defn -main [input]
  (utils/exec-time "Part 1:" part-1 input)
  (utils/exec-time "Part 2:" part-2 input))
