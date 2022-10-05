let trailWeight = 0.5;
let deltaTime = 0.1;
let time = 1;

function hash(state) {
    state ^= 2747636419;
    state *= 2654435769;
    state ^= state >> 16;
    state *= 2654435769;
    state ^= state >> 16;
    state *= 2654435769;

    return state;
}

function scaleToRange01(state) {
    return state / 4294967295;
}

function sense(ant, specie, angleOffset){
    let sensorAngle = ant.angle + angleOffset;
    let sensorDir = new p5.Vector(Math.cos(sensorAngle), Math.sin(sensorAngle));

    let sensorPos = new p5.Vector(0, 0).add(ant.position).add(sensorDir.mult(specie.sensorOffsetDst));
    let sensorX = sensorPos.x;
    let sensorY = sensorPos.y;
    
    let sum = 0;

    for (let offsetX = -specie.sensorSize ; offsetX <= specie.sensorSize ; offsetX++){
        for (let offsetY = -specie.sensorSize ; offsetY <= specie.sensorSize ; offsetY++){
            let sampleX = min(WIDTH - 1, max(0, sensorX + offsetX));
            let sampleY = min(HEIGHT - 1, max(0, sensorY + offsetY));

            //
        }
    }

    return sum;
}

function simulate(){
    for (let index = 0 ; index < ants.length ; index++){
        let ant = ants[index];

        let specie = species[ant.specie];
        let pos = ant.position;

        let random = hash(pos.y * WIDTH + pos.x + hash(index + time * 100000));

        // Steer based on sensory data
        let sensorAngleRad = specie.sensorAngleDeg * (PI / 180);

        let weightForward = sense(ant, specie, 0);
        let weightLeft = sense(ant, specie, sensorAngleRad);
        let weightRight = sense(ant, specie, -sensorAngleRad);

        let randomSteerStrength = scaleToRange01(random);

        // Continue in same direction
        if (weightForward > weightLeft && weightForward > weightRight) {
            ant.angle += 0;
        }
        else if (weightForward < weightLeft && weightForward < weightRight) {
            ant.angle += (randomSteerStrength - 0.5) * 2 * specie.turnSpeed * deltaTime;
        }
        // Turn right
        else if (weightRight > weightLeft) {
            ant.angle -= randomSteerStrength * specie.turnSpeed * deltaTime;
        }
        // Turn left
        else if (weightLeft > weightRight) {
            ant.angle += randomSteerStrength * specie.turnSpeed * deltaTime;
        }
            // Turn randomly
        else {
            ant.angle += randomSteerStrength * deltaTime ;
        }

        // Update position
        let direction = new p5.Vector(Math.cos(ant.angle), Math.sin(ant.angle));
        let newPos = new p5.Vector(0, 0).add(ant.position).add(direction.mult(deltaTime).mult(specie.moveSpeed));

        // Clamp position to map boundaries, and pick new random move dir if hit boundary
        if (newPos.x < 0 || newPos.x >= width || newPos.y < 0 || newPos.y >= height) {
            random = hash(random);
            let randomAngle = scaleToRange01(random) * 2 * PI;

            newPos.x = min(WIDTH - 0.01, max(0, newPos.x));
            newPos.y = min(HEIGHT - 0.01, max(0, newPos.y));
            ant.angle = randomAngle;
        }
        else {
            // TrailMap[newPos.x][newPos.y] += agent.speciesMask * trailWeight;
        }
        
        ant.position = newPos;
    }
}