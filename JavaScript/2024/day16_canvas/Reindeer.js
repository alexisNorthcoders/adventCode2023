class Reindeer {
  constructor(x, y, size, colour = "brown") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.colour = colour;
    this.direction = "right";
    this.actions = 0;
  }

  draw() {
    const { x, y, size, direction } = this;

    // body
    ctx.fillStyle = this.colour;
    ctx.fillRect(x, y, size, size);

    // eyes
    const eyeSize = size * 0.1;
    ctx.fillStyle = "black";
    // Set eye positions based on direction
    let eyeX1, eyeX2, eyeY;

    switch (this.direction) {
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
    this.actions += 1;
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
      this.actions += 1;
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
  }
  checkCollision(newX, newY, direction) {
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
}
