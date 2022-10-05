// Simulation Settings
const STEPS_PER_FRAME = 1;
const WIDTH = 1000;
const HEIGHT = 1000;
const NUM_ANTS = 500;
const SPAWN_MODE = 'random-circle';

// Trail Settings
const TRAIL_WEIGHT = 1;
const DECAY_RATE = 1;
const DIFFUSE_RATE = 1;

class Species {
    constructor(moveSpeed, turnSpeed, sensorAngleDeg, sensorOffsetDst, sensorSize) {
        this.moveSpeed = moveSpeed;
        this.turnSpeed = turnSpeed;

        this.sensorAngleDeg = sensorAngleDeg;
        this.sensorOffsetDst = sensorOffsetDst;
        this.sensorSize = sensorSize;
    }
}

let species = [
    new Species(30, -90, 112, 20, 3),
    new Species(30, 30, 45, 20, 5),
    new Species(20, 12, 30,  35, 1),
]