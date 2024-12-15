class Box {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

    }

    draw() {
        const { x, y, size } = this;

        const inset = 0.05 * size;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, y, size, size);

        ctx.fillStyle = 'maroon';
        ctx.fillRect(x + inset, y + inset, size - 2 * inset, size - 2 * inset);

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
        for (const box of boxes) {
            if (
                newX < box.x + box.size &&
                newX + this.size > box.x &&
                newY < box.y + box.size &&
                newY + this.size > box.y
            ) {
                return box.move(direction)
            }
        }
        return false;
    }
}