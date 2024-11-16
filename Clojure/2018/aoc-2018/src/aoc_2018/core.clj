(ns aoc-2018.core
  (:require [aoc-2018.day1 :as day1]))

(defn -main [& args]
  (let [day (if (seq args) (first args) "day1")]
    (case day
      "day1" (day1/solve)
      (println "Invalid day specified."))))
