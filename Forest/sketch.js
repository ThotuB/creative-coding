const NUM_TREES = 10;
let trees = [];

function setup() {
    createCanvas(800, 800);
    background(255);

    for (let i = 0; i < NUM_TREES; i++) {
        const x = i * width / NUM_TREES;
        const y = 

        tree = new Tree(new Branch(x, height - 10, 200, -HALF_PI, 10, color(200, 10, 0)));
        trees.push(tree);
    }

    trees.forEach(tree => tree.draw());
    noLoop()
}