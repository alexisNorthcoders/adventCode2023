(ns aoc-2024.day1
  (:require [clojure.string :as str]
            [aoc-2024.utils :as utils]))

(defn part-1 [input]
  (let [lines input
        leftList (sort (map #(Integer/parseInt (first (clojure.string/split % #"\s+"))) lines))
        rightList (sort (map #(Integer/parseInt (last (clojure.string/split % #"\s+"))) lines))
        differences (map #(Math/abs (- %1 %2)) leftList rightList)]
    (reduce + differences)))

(defn part-1-alt [input]
  (let [leftList (atom [])
        rightList (atom [])]
    (doseq [line input]
      (let [[left right] (map #(Integer/parseInt %) (clojure.string/split line #"\s+"))]
        (swap! leftList conj left)
        (swap! rightList conj right)))
    (let [sorted-left (sort @leftList)
          sorted-right (sort @rightList)]
      (reduce + (map  #(Math/abs (- %1 %2)) sorted-left sorted-right)))))


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

(defn part-2-alt [input]
  (let [lines input
        leftList  (map #(Integer/parseInt (first (clojure.string/split % #"\s+"))) lines)
        rightList (map #(Integer/parseInt (last (clojure.string/split % #"\s+"))) lines)
        frequencies  (frequencies rightList)]
    (reduce + (map #(* % (get frequencies % 0)) leftList))))

(defn -main [input]
  (utils/exec-time "Part 1:" part-1 input)
  (utils/exec-time "Part 1:" part-1-alt input)
  (utils/exec-time "Part 2:" part-2 input)
  (utils/exec-time "Part 2-alt:" part-2-alt input))
