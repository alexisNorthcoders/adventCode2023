(ns aoc-2018.day1
  (:require
   [aoc-2018.day1 :as day1]
   [aoc-2018.core :as core]))

(defn part1 []
  (let [numbers (core/parse-input "day1")
        total-sum (reduce + numbers)]
    total-sum))

(defn part2 []
  (loop [seen #{}
         current-sum 0
         remaining (cycle (core/parse-input "day1"))]
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
