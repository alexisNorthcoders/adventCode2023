const boxesCanvas = document.getElementById("boxes");
const ctx = boxesCanvas.getContext("2d");
let walls
let boxes
let scale
(async () => {

    const { wallsCoords, robotCoords, boxesCoords, movements, size } = await parseText()
    width = 800
    height = 400
    scale = width / size
    boxesCanvas.width = width;
    boxesCanvas.height = height;


    boxes = boxesCoords.map(box => new Box(box.x * scale, box.y * scale, scale, "orange"));
    const robot = new Robot(robotCoords.x * scale, robotCoords.y * scale, scale, "darkgrey");
    walls = wallsCoords.map((wall) => new Wall(wall.x * scale, wall.y * scale, scale))
    console.log(movements)
    console.log(boxes)
    let movementIndex = 0
    function performMovement() {

        const movement = movements[movementIndex];
        switch (movement) {
            case ">":
                robot.move('right');
                break;
            case "<":
                robot.move('left');
                break;
            case "^":
                robot.move('up');
                break;
            case "v":
                robot.move('down');
                break;
        }
    }

    function animate() {


        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, boxesCanvas.width, boxesCanvas.height);

        walls.forEach(wall => wall.draw())
        boxes.forEach(box => box.draw())
        robot.draw()
       /*  if (movementIndex < movements.length){
            performMovement()
            movementIndex++
        }
        if (movementIndex === movements.length - 1){
            console.log(boxes.reduce((a, b) => a + (b.x/scale) + 100 * (b.y/scale), 0))
         }
 */
        requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "w":
            case "ArrowUp":
                robot.move('up');
                break;
            case "s":
            case "ArrowDown":
                robot.move('down');
                break;
            case "a":
            case "ArrowLeft":
                robot.move('left');
                break;
            case "d":
            case "ArrowRight":
                robot.move('right');
                break;
        }
    });
})()

async function parseText() {

    let robotCoords
    const wallsCoords = []
    const boxesCoords = []
    const movements = []

    const response = await fetch('../inputs/sample_day15.txt');

    const text = await response.text();

    const lines = text.split("\n");

    lines.forEach((line, row) => {
        if (line.includes(".") || line.includes("#"))
            line.split('').forEach((element, i) => {
                let x
                if (i === 0) {
                    x = 0
                }
                else {
                    x = (i * 2);
                }
                let y = row;

                if (element === '#') {
                    wallsCoords.push({ x, y });
                }
                if (element === '@') {
                    robotCoords = { x, y };
                }
                if (element === 'O') {
                    boxesCoords.push({ x, y });
                }
            });
        else {
            movements.push(...lines[row].split(''))
        }
    });

    return { wallsCoords, robotCoords, boxesCoords, movements, size: 2 * lines[0].length }
}
