const shape_point = {
    'x': (t) => {
        return 0;
    },
    'y': (t) => {
        return 0;
    },
}

const shape_line = {
    'x': (t) => {
        return t
    },
    'y': (t) => {
        return 0
    }
}

const shape_circle = {
    'x': (t) => {
        return cos(t)
    },
    'y': (t) => {
        return sin(t)
    }
}

const shape_heart = {
    'x': (t) => {
        return pow(sin(t), 3)
    },
    'y': (t) => {
        return (-13*cos(t) + 5*cos(2*t) + 2*cos(3*t) + cos(4*t)) / 16
    }
}