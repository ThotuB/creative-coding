let res = 50

const circleFunc = (x, y) => {
    return (x * x + y * y)
}

function setup() {
    createCanvas(1200, 1200)
    background(0)
    drawGrid(res, res)
    marchSquares(res, circleFunc, 0.5)
}

function draw() {

}