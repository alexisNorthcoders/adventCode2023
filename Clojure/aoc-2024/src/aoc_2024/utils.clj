(ns aoc-2024.utils)

(defn exec-time 
  ([f input]
   (exec-time nil f input))
  ([label f input]
   (let [start-time (System/nanoTime)
         result (f input)
         end-time (System/nanoTime)]
     (when label
       (println label (when result result)))
     (println "Execution time (ms):" (/ (- end-time start-time) 1000000.0)))))
