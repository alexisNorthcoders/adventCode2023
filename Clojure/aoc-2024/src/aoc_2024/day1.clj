(ns aoc-2024.day1
  (:require [clojure.string :as str]))

(defn part-1 [input]
  (let [lines input
        leftList (sort (map #(Integer/parseInt (first (clojure.string/split % #"\s+"))) lines))
        rightList (sort (map #(Integer/parseInt (last (clojure.string/split % #"\s+"))) lines))
        differences (map #(Math/abs (- %1 %2)) leftList rightList)]
    (reduce + differences)))

(defn part-2 [input]
  (let [leftListMap (atom {})
        rightListMap (atom {})
        result (atom 0)]
    (doseq [line input]
      (let [[left right] (map #(Integer/parseInt %) (clojure.string/split line #"\s+"))]
        (swap! leftListMap update left (fnil inc 0))
        (swap! rightListMap update right (fnil inc 0))))
    (doseq [value (keys @leftListMap)]
      (swap! result + (* (get @leftListMap value) value (get @rightListMap value 0))))
    @result))


(defn -main [input]
  (let [result (part-1 input)]
    (println "Part 1:" result))
  (let [result (part-2 input)]
    (println "Part 2:" result)))
