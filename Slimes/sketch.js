let ants = []

function setup(){
    createCanvas(WIDTH, HEIGHT);
    pixelDensity(1);
    background(0);

    
    for (let i = 0 ; i < NUM_ANTS ; i++){
        ants.push(spawnAnt(SPAWN_MODE));
    }
    sense(ants[0], 1);
}

function draw() {
    background(0);
    for (let i = 0 ; i < STEPS_PER_FRAME ; i++){
        simulate();
    }

    stroke(255);
    for (let i = 0 ; i < ants.length ; i++) {
        ellipse(ants[i].position.x, ants[i].position.y, 1);
    }
    // noLoop();
    // setTimeout(draw, 1000);
}