(ns aoc-2024.core
  (:require [clojure.string :as str]
            [aoc-2024.day1 :as day1]))

(defn read-file [day]
  (let [file-content (slurp (str "resources/day" day ".txt"))]
    (str/split-lines file-content)))

(defn -main []
  (let [start-time (System/nanoTime)]
    (day1/-main (read-file "1"))
    (let [end-time (System/nanoTime)]
     (println "Execution time (ms):"
                 (/ (- end-time start-time) 1000000.0))))) 

