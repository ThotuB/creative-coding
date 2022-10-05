let samples = 1000;

class Wave {
    constructor(amp, phase) {
        this.amp = amp;
        this.phase = phase;
        this.xs = [];
        this.ys = [];

        for (let i = 0; i < samples; i++) {
            this.xs += [i / samples];
        }
    }
}

class ComplexWave extends Wave {
    constructor(amp, phase, ...freqs) {
        super(amp, phase);
        this.freqs = freqs;
    }

    reset() {
        this.amp = 0;
        for (let i = 0 ; i < samples; i++) {
            this.ys[i] = 0;
        }
    }
    
    add(wave) {
        let amp = this.amp + wave.amp;
        for (let i = 0 ; i < samples; i++) {
            this.ys[i] = (this.ys[i] + wave.ys[i]) / amp;
        }
        
        this.freqs += [wave.freq];
        this.amp = 1;
    }
}

class HarmonicWave extends Wave {
    constructor(amp, phase, freq) {
        super(amp, phase);
        this.freq = freq;

        this.period = 1 / freq;
        this.angFreq = Math.PI * 2 * freq;

        this.calc();
    }

    calc() {
        for (let i = 0; i < samples; i++) {
            let x = i/samples;
            this.ys[i] = this.amp * Math.sin(this.angFreq * x + this.phase);
        }
    }
    
    add(wave) {
        let newWave = new ComplexWave(1, this.freq, wave.freq);
        let amp = this.amp + wave.amp;
        for (let i = 0 ; i < samples; i++) {
            newWave.ys[i] = (this.ys[i] + wave.ys[i]) / amp;
        }

        return newWave;
    }
}