var tree = [];
var radius = 15;
let walkers = [];

let MAX_WALKERS = 50;

function setup(){
    createCanvas(1000, 1000);

    tree[0] = new Walker(width/2, height/2, radius, true);
    for (let i = 0 ; i < MAX_WALKERS ; i++){
        walkers[i] = new Walker(random(width), random(height), radius, false);
    }
}

function draw(){
    background(0);

    // MOVE & CHECK
    for (let i = 0 ; i < walkers.length ; i++){
        walkers[i].walk(50);
        
        for (let j = 0 ; j < tree.length ; j++){
            if ( walkers[i].checkCollision(tree[j]) ){
                tree.push(walkers[i]);
                walkers.splice(i, 1);
                walkers.push(new Walker(random(width), random(height), radius, false));
                break;
            }
        }
    }

    // SHOW
    for (let i = 0 ; i < tree.length ; i++){
        tree[i].show();
    }
    for (let i = 0 ; i < walkers.length ; i++){
        walkers[i].show();
    }
}