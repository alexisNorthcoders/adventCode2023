class Reindeer {
  constructor(x, y, size, colour = "brown") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.colour = colour;
    this.direction = "right";
    this.points = 0;
  }

  draw() {
    const { x, y, size, direction } = this;

    // body
    ctx.fillStyle = this.colour;
    ctx.fillRect(x, y, size, size);

    // eyes
    const eyeSize = size * 0.1;
    ctx.fillStyle = "black";

    let eyeX1, eyeX2, eyeY;

    switch (direction) {
      case "up":
        eyeX1 = x + size * 0.35;
        eyeX2 = x + size * 0.65;
        eyeY = y + eyeSize;
        break;
      case "down":
        eyeX1 = x + size * 0.35;
        eyeX2 = x + size * 0.65;
        eyeY = y + size - eyeSize * 2;
        break;
      case "left":
        eyeX1 = x + size * 0.15;
        eyeX2 = x + size * 0.25;
        eyeY = y + size * 0.35;
        break;
      case "right":
        eyeX1 = x + size * 0.75;
        eyeX2 = x + size * 0.85;
        eyeY = y + size * 0.35;
        break;
    }

    // eyes
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(eyeX1, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.arc(eyeX2, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
  }
  changeDirection(clockwise = true) {
    const directions = ["up", "right", "down", "left"];
    let currentIndex = directions.indexOf(this.direction);

    if (clockwise) {
      currentIndex = (currentIndex + 1) % directions.length;
    } else {
      // rotate anticlockwise
      currentIndex = (currentIndex - 1 + directions.length) % directions.length;
    }

    this.direction = directions[currentIndex];
    this.points += 1000;
  }
  move() {
    let newX = this.x;
    let newY = this.y;

    switch (this.direction) {
      case "up":
        newY -= scale;
        break;
      case "down":
        newY += scale;
        break;
      case "left":
        newX -= scale;
        break;
      case "right":
        newX += scale;
        break;
    }

    if (!this.checkCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
      this.points += 1;
    }
  }
  checkFinish() {
    if (
      this.x < end.x + end.size &&
      this.x + this.size > end.x &&
      this.y < end.y + end.size &&
      this.y + this.size > end.y
    ) {
      return true;
    }
    return false
  }
  checkCollision(newX, newY) {
    for (const wall of walls) {
      if (
        newX < wall.x + wall.size &&
        newX + this.size > wall.x &&
        newY < wall.y + wall.size &&
        newY + this.size > wall.y
      ) {
        return true;
      }
    }
    return false;
  }
  findShortestPath(end) {
    const directions = ["up", "right", "down", "left"];
    const priorityQueue = new PriorityQueue((a, b) => a.cost < b.cost);
    const visited = new Set();
    const actions = [];
  
    priorityQueue.enqueue({ x: this.x, y: this.y, direction: this.direction, cost: 0, path: [] });
  
    while (!priorityQueue.isEmpty()) {
      const { x, y, direction, cost, path } = priorityQueue.dequeue();
  
      // return path when reindeer is on the end tile
      if (x === end.x * scale && y === end.y * scale) {
        return path; 
      }
  
      const stateKey = `${x},${y},${direction}`;
      if (visited.has(stateKey)) continue;
      visited.add(stateKey);
  
      // move in the current direction (cost = 1)
      let newX = x, newY = y;
      switch (direction) {
        case "up": newY -= scale; break;
        case "down": newY += scale; break;
        case "left": newX -= scale; break;
        case "right": newX += scale; break;
      }
      if (!this.checkCollision(newX, newY)) {
        priorityQueue.enqueue({
          x: newX,
          y: newY,
          direction,
          cost: cost + 1,
          path: [...path, { action: "move" }]
        });
      }
  
      // change direction (clockwise and counterclockwise, cost = 1000)
      for (let i = 0; i < 2; i++) {
        const newDirection = directions[(directions.indexOf(direction) + (i === 0 ? 1 : -1) + 4) % 4];
        priorityQueue.enqueue({
          x,
          y,
          direction: newDirection,
          cost: cost + 1000,
          path: [...path, { action: "turn", clockwise: i === 0 }]
        });
      }
    }
    // if no valid path
    return [];
  }
}
