class Wall {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw() {
        const { x, y, size } = this
        ctx.fillStyle = 'lightgreen';

        ctx.fillRect(x, y, size, size);

    }
}


