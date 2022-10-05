function drawGrid(cols, rows) {
    let boxWidth = width / cols;
    let boxHeight = height / rows;

    stroke(255)
    for (var i = 0; i < cols; i++) {
        line(i * boxWidth, 0, i * boxWidth, height)
    }
    for (var j = 0; j < rows; j++) {
        line(0, j * boxHeight, width, j * boxHeight)
    }
}