function lerpValue(value1, value2, t) {
    return value1 + (value2 - value1) * t;
}

function lerpColor(color1, color2, t) {

    let r = Math.round(lerpValue(color1.r, color2.r, t));
    let g = Math.round(lerpValue(color1.g, color2.g, t));
    let b = Math.round(lerpValue(color1.b, color2.b, t));

    return color(r, g, b);
}

function gradient(color1, color2, steps) {
    let colors = [color1];
    
    steps--;
    for (let t = 1; t < steps; t++) {
        colors.push(lerpColor(color1, color2, t / steps));
    }
    colors.push(color2);

    return colors;
}