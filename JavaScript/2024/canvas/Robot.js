class Robot {
    constructor(x, y, size, colour = "grey") {
        this.x = x;
        this.y = y;
        this.size = size;
        this.colour = colour;
    }

    draw() {
        const { x, y, size } = this;

        // body
        ctx.fillStyle = this.colour;
        ctx.fillRect(x, y, size, size);

        // eyes
        const eyeSize = size * 0.1;
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x + size * 0.35, y + eyeSize, eyeSize, 0, Math.PI * 2);
        ctx.arc(x + size * 0.65, y + eyeSize, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        // arms
        const armWidth = size * 0.2;
        ctx.fillStyle = "gray";
        ctx.fillRect(x + size - armWidth, y + size * 0.2, armWidth, size * 0.6);
        ctx.fillRect(x, y + size * 0.2, armWidth, size * 0.6);

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