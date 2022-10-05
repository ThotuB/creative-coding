function spawnAnt(mode){
    let center = new p5.Vector(WIDTH/2, HEIGHT/2);
    let startPos = new p5.Vector(0, 0);
    let randomAngle = Math.random() * 2 * Math.PI;
    let angle = 0;

    switch (mode){
        case 'point':
            startPos = center;
            angle = randomAngle;
            break;
        case 'random':
            startPos = createVector(Math.random() * WIDTH, Math.random() * HEIGHT);
            angle = randomAngle;
            break;
        case 'inward-circle':
            startPos = getCirclePoint(Math.random() * 2 * Math.PI, Math.random() * HEIGHT * 0.5).add(center);
            let deltaPos = createVector(0, 0).add(center).sub(startPos);
            angle = Math.atan2(deltaPos.y, deltaPos.x);
            break;
        case 'random-circle':
            startPos = getCirclePoint(Math.random() * 2 * Math.PI, Math.random() * HEIGHT * 0.25).add(center);
            angle = randomAngle;
            break;
    }
    
    return new Ant(startPos, angle, 0);
}

const getCirclePoint = (radians, radius) => {
    return new p5.Vector(Math.cos(radians) * radius, Math.sin(radians) * radius);
}