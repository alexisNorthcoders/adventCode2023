(ns aoc-2018.day1
  (:require
   [clojure.string :as str]))

(defn read-input []
  (slurp "resources/day1.txt"))

(defn solve []
  (let [input (read-input)
        numbers (map #(Integer/parseInt %) (str/split input #"\n"))
        total-sum (reduce + numbers)]


    (println "Day 1: Part 1:")
    (println total-sum)))