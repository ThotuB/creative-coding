const SEED = 4863544
const WIDTH = 500
const HEIGHT = 500
const NUM_POINTS = 1000

const OFF_X = 4623
const OFF_Y = 5782 
const DELTA_X = WIDTH / NUM_POINTS

let radius_slider
let frequency_slider
let point_slider

function setup() {
    createCanvas(0, 0)

    radius_slider = createSlider(0, 5, 0.01, 0.01)
    frequency_slider = createSlider(0, 100, 50)
    point_slider = createSlider(0, NUM_POINTS, 50)
}
