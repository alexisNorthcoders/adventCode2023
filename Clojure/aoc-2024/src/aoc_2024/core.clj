(ns aoc-2024.core
  (:require [clojure.string :as str]
            [aoc-2024.day1 :as day1]
            [aoc-2024.day2 :as day2]
            [aoc-2024.utils :as utils]))

(defn read-file [day]
  (let [file-content (slurp (str "resources/"day".txt"))]
    (str/split-lines file-content)))

(defn -main []

 ;;(utils/exec-time day1/-main (read-file "1"))
  (utils/exec-time day2/-main (read-file "day2"))
  )
