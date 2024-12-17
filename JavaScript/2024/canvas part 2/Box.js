class Box {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.width = 2 * size;
        this.height = size;
        this.size = size

    }

    draw() {
        const { x, y, width, height, size } = this;

        const inset = 0.05 * size;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = 'maroon';
        ctx.fillRect(x + inset, y + inset, width - 2 * inset, height - 2 * inset);

    }
    move(direction) {

        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case 'up':
                newY -= scale;
                break;
            case 'down':
                newY += scale;
                break;
            case 'left':
                newX -= scale;
                break;
            case 'right':
                newX += scale;
                break;
        }

        if (!this.checkCollision(newX, newY, direction)) {
            this.x = newX;
            this.y = newY;
            return false
        }
        return true
    }
    checkCollision(newX, newY, direction) {
        // Check collision with walls
        for (const wall of walls) {
            if (
                newX < wall.x + wall.width &&
                newX + this.width > wall.x &&
                newY < wall.y + wall.height &&
                newY + this.height > wall.y
            ) {
                return true;
            }
        }

        let allTrue = [];

        for (const box of boxes) {
            if (box === this) continue;

            if (
                newX < box.x + box.width &&
                newX + this.width > box.x &&
                newY < box.y + box.height &&
                newY + this.height > box.y
            ) {
                allTrue.push(box.move(direction));
            }
        }

        if (allTrue.length === 0) {
            return false;
        }

        return allTrue.some(value => value === true);
    }

}