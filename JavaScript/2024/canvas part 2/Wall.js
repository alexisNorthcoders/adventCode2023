class Wall {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.width = 2 * size;
        this.height = size;
    }
    draw() {
        const { x, y, width, height } = this
        ctx.fillStyle = 'lightgreen';

        ctx.fillRect(x, y, width, height);
    }
}


