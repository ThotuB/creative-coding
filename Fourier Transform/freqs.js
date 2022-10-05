class Freqs {
    constructor(axis1, axis2, axis3, ...freqs) {
        this.axis1 = axis1;
        this.axis2 = axis2;
        this.axis3 = axis3;

        this.gs = []
        this.g = new Point(0, 0);

        this.waves = []
        this.wave = new ComplexWave(0, phase);

        this.wave.reset();

        for (let i = 0 ; i < freqs.length ; i++) {
            this.waves[i] = new HarmonicWave(1, phase, freqs[i]);
            this.wave.add(this.waves[i]);
        }
    }

    reset() {
        this.gs = [];
    }

    drawWaveAxis1() {
        push();
        stroke(255);
        noFill();
        translate(this.axis1.Origin.x, this.axis1.Origin.y + this.axis1.height/2);

        let div = this.axis1.width / (samples * this.axis1.xDivs);
        beginShape();
        for (let i = 0 ; i < this.axis1.xDivs ; i++) {
            for (let j = 0 ; j < samples ; j++) {
                let x = (i * samples + j) * div;
                let y = this.axis1.height / 2 * this.wave.ys[j];
                
                vertex(x, y);
            }
        }
        endShape();

        pop();
    }

    drawCycles(cycles) {
        push();
        stroke(255, 100);
        translate(this.axis1.Origin.x, this.axis1.Origin.y);

        let div = (this.axis1.width) / (cycles * this.axis1.xDivs);
        for (let i = 0 ; i < cycles * this.axis1.xDivs ; i++) {
            translate(div , 0);
            line(0, 0, 0, this.axis1.height)
        }

        pop();
    }

    drawWaveAxis2(cycles) {
        this.drawCycles(cycles);
        push();
        stroke(255);
        noFill();
        translate(this.axis2.Origin.x, this.axis2.Origin.y);
        // Wave Drawing
        this.g = new Point(0, 0);
        beginShape();
        for (let i = 0 ; i < this.axis1.xDivs ; i++) {
            for (let j = 0 ; j < samples ; j++) {
                let amplitude = this.axis2.width / 4 * (this.wave.ys[j] + 1);
                let angle =TWO_PI * cycles * (j/samples + i);

                let x = amplitude * cos(angle);
                let y = amplitude * sin(angle);
                
                vertex(x, y);
                this.g.x += x;
                this.g.y += y;
            }
        }
        endShape();
        // Center of Mass Drawing
        noStroke();
        fill(213, 8, 200);
        this.g.x /= (samples * this.axis1.xDivs);
        this.g.y /= (samples * this.axis1.xDivs);
        this.gs.push(this.g);
        circle(this.g.x, this.g.y, 10);

        pop();
    }
    
    drawWaveAxis3() {
        push();
        stroke(255);
        noFill();
        translate(this.axis3.Origin.x, this.axis3.Origin.y);

        // Fourier Xs
        beginShape();
        for (let i = 0 ; i < this.gs.length ; i++) {
            let x = i / (this.axis3.xDivs * 1000) * this.axis3.width;
            let y = -this.gs[i].x;

            vertex(x, y);
        }
        endShape();
        // Fourier Ys
        beginShape();
        for (let i = 0 ; i < this.gs.length ; i++) {
            let x = i / (this.axis3.xDivs * 1000) * this.axis3.width;
            let y = this.gs[i].y;

            vertex(x, y);
        }
        endShape();

        pop();
    }
}
