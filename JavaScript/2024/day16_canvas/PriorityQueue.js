class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
      this.heap = [];
      this.comparator = comparator;
    }
  
    enqueue(value) {
      this.heap.push(value);
      this._heapifyUp();
    }
  
    dequeue() {
      if (this.size() === 1) return this.heap.pop();
      const top = this.heap[0];
      this.heap[0] = this.heap.pop();
      this._heapifyDown();
      return top;
    }
  
    peek() {
      return this.heap[0];
    }
  
    size() {
      return this.heap.length;
    }
  
    isEmpty() {
      return this.size() === 0;
    }
  
    _heapifyUp() {
      let index = this.size() - 1;
      const element = this.heap[index];
  
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
  
        if (!this.comparator(element, parent)) break;
  
        this.heap[index] = parent;
        index = parentIndex;
      }
  
      this.heap[index] = element;
    }
  
    _heapifyDown() {
      let index = 0;
      const length = this.size();
      const element = this.heap[index];
  
      while (true) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swapIndex = null;
  
        if (leftChildIndex < length) {
          leftChild = this.heap[leftChildIndex];
          if (this.comparator(leftChild, element)) {
            swapIndex = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.heap[rightChildIndex];
          if (
            this.comparator(rightChild, element) &&
            (!swapIndex || this.comparator(rightChild, leftChild))
          ) {
            swapIndex = rightChildIndex;
          }
        }
  
        if (!swapIndex) break;
  
        this.heap[index] = this.heap[swapIndex];
        index = swapIndex;
      }
  
      this.heap[index] = element;
    }
  }