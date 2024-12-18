const mazeCanvas = document.getElementById("maze");
const ctx = mazeCanvas.getContext("2d");
let walls
let scale
let end
(async () => {

    const { wallsCoords, reindeerCoords, endCoords, size } = await parseText()
    width = 600
    height = 600
    scale = width / size
    mazeCanvas.width = width;
    mazeCanvas.height = height;


    const reindeer = new Reindeer(reindeerCoords.x * scale, reindeerCoords.y * scale, scale);
    end = new End(endCoords.x * scale, endCoords.y * scale, scale);
    walls = wallsCoords.map((wall) => new Wall(wall.x * scale, wall.y * scale, scale))
    console.log(endCoords)


    function animate() {


        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, mazeCanvas.width, mazeCanvas.height);

        walls.forEach(wall => wall.draw())
        reindeer.draw()
        end.draw()
        if (reindeer.checkFinish()) drawCompletionMessage()

        requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "w":
            case "ArrowUp":
                reindeer.move();
                break;

            case "a":
            case "ArrowLeft":
                reindeer.changeDirection(false);
                break;
            case "d":
            case "ArrowRight":
                reindeer.changeDirection(true)
                break;
        }
    });
})()

async function parseText() {

    let reindeerCoords
    const wallsCoords = []
    let endCoords

    const response = await fetch('../inputs/sample_day16.txt');

    const text = await response.text();

    const lines = text.split("\n");
    let row = 0

    while (row< lines.length) {
        console.log(lines[row])
        lines[row].split('').forEach((element, i) => {

            if (element === '#') {
                wallsCoords.push({ x: i, y: row })
            }
            if (element === "S") {
                reindeerCoords = { x: i, y: row }
            }
            if (element === "E") {
                endCoords = { x: i, y: row }
            }
        })
        row++
    }
    return { wallsCoords, reindeerCoords, endCoords,size: lines[0].length }
}

function drawCompletionMessage() {
    ctx.fillStyle = "green";
    ctx.font = "30px sans-serif"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; 
    ctx.fillText("Maze completed!", mazeCanvas.width / 2, mazeCanvas.height / 2); 
}