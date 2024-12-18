class End {
    constructor(x, y, size, colour = "yellow") {
        this.x = x;
        this.y = y;
        this.size = size*0.6;
        this.colour = colour;
    }

    draw() {
        const { x, y, size } = this;
       
        const starEmoji = "⭐"; 
        const fontSize = size; 
    
        ctx.fillStyle = this.colour; 
        ctx.font = `${fontSize}px sans-serif`; 
        ctx.textAlign = "left"; 
        ctx.textBaseline = "top"; 

        ctx.fillText(starEmoji, x+5, y + 5); 
    }
}