let size = 50;
let resolution;
let fr = 10;

let grid;

function setup() {
    let canv = createCanvas(1500, 1500);
    frameRate(fr);

    resolution = width / size;
    grid = makeTable(false);
    neightbors = makeTable(0);

    noLoop();

    drawGrid();

    canv.mouseClicked( () => {
        let posX = Math.floor(mouseX / resolution);
        let posY = Math.floor(mouseY / resolution);

        grid[posY][posX] = !grid[posY][posX];
        setTimeout(drawGrid, 5);
    });
}

function draw() {
    grid = computeNextGrid(grid);
    drawGrid();
}

function play(){
    loop();
    draw();
}

function pause(){
    noLoop();
}

function reset() {
    noLoop();
    grid = makeTable(false);
    drawGrid();
}

function faster(){
    fr++;
    frameRate(fr);
}

function slower() {
    fr--;
    frameRate(fr);
}

function countNeighbors(x, y, grid) {
    let count = 0;
    for (let i = -1 ; i <= 1 ; i++) {
        for (let j = -1 ; j <= 1 ; j++) {
            let newX = x + i;
            let newY = y + j;
            if (newX < 0 || newX >= size || newY < 0 || newY >= size || ( i == 0 && j == 0 )) {
                continue;
            }
            if (grid[newX][newY]) {
                count++;
            }
        }
    }
    return count;
}

function computeNextGrid(grid) {
    let newGrid = makeTable();
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let nb = countNeighbors(i, j, grid);
            if (grid[i][j]) {
                if (nb < 2 || nb > 3) {
                    newGrid[i][j] = false;
                } else {
                    newGrid[i][j] = true;
                }
            } else {
                if (nb == 3) {
                    newGrid[i][j] = true;
                } else {
                    newGrid[i][j] = false;
                }
            }
        }
    }
    return newGrid;
}

function drawGrid() {
    push();
    background(0);
    strokeWeight(1);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            stroke(255);
            if ( grid[i][j] ) {
                fill(255);
            } else {
                fill(0);
            }
            rect(0, 0, resolution, resolution);
            translate(resolution, 0);
        }
        translate(-width, resolution);
    }
    pop();
}

function makeTable(value) {
  let tab = new Array(size);
  for (let i = 0; i < size; i++) {
    tab[i] = new Array(size);
    for (let j = 0; j < size; j++) {
        tab[i][j] = value;
    }
  }
  return tab;
}