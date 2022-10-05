const INPUT_WIDTH = 200;
const INPUT_HEIGHT = 100;

let color1_input
let color2_input
let color3_input

function setup(){
    createCanvas(1000, 500);
    
    color1_input = createInput("");
    color1_input.position(20, height/4 - INPUT_HEIGHT/2);
    color1_input.size(INPUT_WIDTH, INPUT_HEIGHT);
    color1_input.style('font-size', `${INPUT_HEIGHT}px`);
    color1_input.input(draw);

    color2_input = createInput("");
    color2_input.position(20, height/2 - INPUT_HEIGHT/2);
    color2_input.size(INPUT_WIDTH, INPUT_HEIGHT);
    color2_input.style('font-size', `${INPUT_HEIGHT}px`);
    color2_input.input(draw);

    color3_input = createInput("");
    color3_input.position(20, height/4*3 - INPUT_HEIGHT/2);
    color3_input.size(INPUT_WIDTH, INPUT_HEIGHT);
    color3_input.style('font-size', `${INPUT_HEIGHT}px`);
    color3_input.input(draw);

    noLoop()
}

function draw(){
    background(0);
    
    let color1 = parseFloat(color1_input.value());
    let color2 = parseFloat(color2_input.value());
    let color3 = parseFloat(color3_input.value());

    let [r, g, b] = hsl_to_rgb(color1, color2, color3);
    fill(r, g, b);
    noStroke();
    rect(width/2 + 20, 20, width/2 - 40, height - 40, 50);
    console.log(r, g, b);
}

function hsl_to_rgb(h, s, l){
    const C = (1 - Math.abs(2 * l - 1)) * s;
    const X = C * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - C/2;

    let r1, g1, b1;
    if(h >= 0 && h < 60){
        [r1, g1, b1] = [C, X, 0];
    }else if(h >= 60 && h < 120){
        [r1, g1, b1] = [X, C, 0];
    }else if(h >= 120 && h < 180){
        [r1, g1, b1] = [0, C, X];
    }else if(h >= 180 && h < 240){
        [r1, g1, b1] = [0, X, C];
    }else if(h >= 240 && h < 300){
        [r1, g1, b1] = [X, 0, C];
    }else if(h >= 300 && h < 360){
        [r1, g1, b1] = [C, 0, X];
    }

    return [(r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255];
}