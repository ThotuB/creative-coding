let [minX, maxX] = [-1, 1];
let [minY, maxY] = [-1, 1];

let lookup_table = [
    {square: [0, 0, 0, 0], coords: []},
    {square: [1, 1, 1, 1], coords: []},

    {square: [1, 0, 0, 0], coords: [[0, 3], [0, 1]]},
    {square: [0, 1, 0, 0], coords: [[1, 0], [1, 2]]},
    {square: [0, 0, 1, 0], coords: [[2, 1], [2, 3]]},
    {square: [0, 0, 0, 1], coords: [[3, 2], [3, 0]]},

    {square: [1, 1, 0, 0], coords: [[0, 3], [1, 2]]},
    {square: [0, 1, 1, 0], coords: [[1, 0], [2, 3]]},
    {square: [0, 0, 1, 1], coords: [[2, 1], [3, 0]]},
    {square: [1, 0, 0, 1], coords: [[3, 2], [0, 1]]},

    {square: [1, 0, 1, 0], coords: [[0, 3], [0, 1], [2, 1], [2, 3]]},
    {square: [0, 1, 0, 1], coords: [[1, 0], [1, 2], [3, 2], [3, 0]]},

    {square: [1, 1, 1, 0], coords: [[3, 0], [3, 2]]},
    {square: [1, 1, 0, 1], coords: [[2, 3], [2, 1]]},
    {square: [1, 0, 1, 1], coords: [[1, 2], [1, 0]]},
    {square: [0, 1, 1, 1], coords: [[0, 1], [0, 3]]},
]

function lerpPoints(point1, point2, t) {
    return {
        x: lerp(point1.x, point2.x, t),
        y: lerp(point1.y, point2.y, t)
    }
}

function squareToLines(x, y, step_x, step_y, func, r) {
    let coords = [
        {x: x, y: y},
        {x: x + step_x, y: y},
        {x: x + step_x, y: y + step_y},
        {x: x, y: y + step_y}
    ]

    let values = coords.map(point => func(point.x, point.y));
    let square = values.map(value => value <= r ? 1 : 0);
    
    let match = lookup_table.find(entry => entry.square.every((value, index) => value == square[index]));

    let line_points = [];
    for (let point of match.coords) {
        let [p1_idx, p2_idx] = point;

        let p1 = coords[p1_idx];
        let p2 = coords[p2_idx];
        let v1 = values[p1_idx];
        let v2 = values[p2_idx];

        let t = v2 / (v1 + v2);
    
        line_points.push(lerpPoints(p1, p2, t));
    }

    let lines = line_points.reduce((acc, point, index) => {
        if (index % 2 == 0) {
            acc.push({a: point});
        } else {
            acc[acc.length - 1].b = point;
        }

        return acc;
    }, [])

    return lines;
}

function marchSquares(resolution, func, r) {
    translate(width / 2, height / 2);

    let sizeX = width / resolution;
    let sizeY = height / resolution;

    let step_x = (maxX - minX) / resolution;
    let step_y = (maxY - minY) / resolution;

    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            let x = map(i, 0, resolution, minX, maxX);
            let y = map(j, 0, resolution, minY, maxY);

            let lines = squareToLines(x, y, step_x, step_y, func, r);

            for (let l1ne of lines) {
                let a = {
                    x: map(l1ne.a.x, minX, maxX, -width / 2, width / 2),
                    y: map(l1ne.a.y, minY, maxY, -height / 2, height / 2)
                }
                let b = {
                    x: map(l1ne.b.x, minX, maxX, -width / 2, width / 2),
                    y: map(l1ne.b.y, minY, maxY, -height / 2, height / 2)
                }

                line(a.x, a.y, b.x, b.y);
            }
        }
    }
}