function calc_ccr(len, order){ // distance: center: vertex
    return len / (2 * sin(PI / order));
}

function calc_icr(len, order){ // distance: center - edge
    return len / (2 * tan(PI / order));
}

function calc_extang(order){ // angle: vertex - vertex - vertex
    return ((order - 2) * PI)/ order;
}
  
function calc_intang(order){ // angle: vertex - center - vertex
    return 2 * PI / order;
}