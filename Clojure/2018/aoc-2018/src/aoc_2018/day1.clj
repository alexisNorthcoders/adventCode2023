(ns aoc-2018.day1
  (:require
   [aoc-2018.day1 :as day1]
   [clojure.string :as str]))

(defn read-input []
  (slurp "resources/day1.txt"))

(defn parse-input []
  (map #(Integer/parseInt %) (str/split (read-input) #"\n")))

(defn part1 []
  (let [numbers (parse-input)
        total-sum (reduce + numbers)]
    total-sum))

(defn part2 []
  (loop [seen #{}
         current-sum 0
         remaining (cycle (parse-input))]
    (let [next-number (first remaining)
          new-sum (+ current-sum next-number)]
      (if (seen new-sum)
        new-sum
        (recur (conj seen new-sum) new-sum (rest remaining))))))

(defn solve []
  (println "Day 1: Part 1:")
  (println (day1/part1))

  (println "Day 1: Part 2:")
  (println (day1/part2)))
