const direction_names = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left'];
const directions = {
    'up': { x: 0, y: -1 },
    'down': { x: 0, y: 1 },
    'left': { x: -1, y: 0 },
    'right': { x: 1, y: 0 },
    'up-left': { x: -1, y: -1 },
    'up-right': { x: 1, y: -1 },
    'down-left': { x: -1, y: 1 },
    'down-right': { x: 1, y: 1 }
}

class Point {
    static points = 0;

    constructor() {
        Point.points++;

        this.x = Math.floor(Math.random() * width);
        this.y = Math.floor(Math.random() * height);

        const r = Math.floor(noise(this.x, this.y) * 100 + 155);
        const g = 30;
        const b = Math.floor(noise(this.x + Point.points, this.y + Point.points) * 200 + 55);

        this.color = color(r, g, b);
        this.direction_index = Math.floor(random(direction_names.length));
    }

    hitBoundary(next_x, next_y) {
        if (next_x < 0 || next_x >= width) return true;
        if (next_y < 0 || next_y >= height) return true;

        const next_index = (next_x + next_y * width) * 4;
        if (pixels[next_index] > 0) return true;

        const next_x_index = (next_x + this.y * width) * 4;
        const next_y_index = (this.x + next_y * width) * 4;
        if (pixels[next_x_index] > 0 && pixels[next_y_index] > 0) return true;

        return false;
    }

    move() {
        for (let idx = 0; idx < 8; idx++) {
            const dir_idx = (this.direction_index + idx) % 8;
            const dir_x = directions[direction_names[dir_idx]].x;
            const dir_y = directions[direction_names[dir_idx]].y;

            const next_x = this.x + dir_x;
            const next_y = this.y + dir_y;

            if (!this.hitBoundary(next_x, next_y)) {
                this.x = next_x;
                this.y = next_y;
                this.direction_index = dir_idx;
                break;
            }
        }
    }

    drawPixel() {
        const index = (this.x + this.y * width) * 4;
        pixels[index] = this.color.levels[0];
        pixels[index + 1] = this.color.levels[1];
        pixels[index + 2] = this.color.levels[2];
        pixels[index + 3] = 255;
    }
}