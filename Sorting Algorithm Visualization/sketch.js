const DELAY = 0;

const SIZE = 100;
let Arr = [];

let timer = 0;
let swaps = 0;
let compares = 0;

let lenX;
let lenY;

let resetValue = 'Random';

function setup(){
    createCanvas(2000, 1000);
    lenX = (width-100)/SIZE;
    lenY = (height-150)/SIZE;
    
    reset();
}

function resetSet(value){
    resetValue = value;
}

function reset(){
    swaps = 0;
    compares = 0;
    timer = 0;
    switch (resetValue){
        case 'Random' :
            let Aux = [];
            for (let i = 0 ; i < SIZE ; i++){
                Aux[i] = i+1;
            }
            for (let i = 0; i < SIZE ; i++){
                let rand = floor(Math.random() * (SIZE-i));
                Arr[i] = new SortNode( Aux[rand] );
                Aux.splice(rand, 1);
            }
            break;
        case 'Sorted' :
            for (let i = 0 ; i < SIZE ; i++){
                Arr[i] = new SortNode( SIZE - i );
            }
            break;
    }
}

async function sort_start(value){
    timer = 0;
    setInterval(() => {
        timer++;
    }, 100);
    switch (value){
        case 'Bubble Sort 1' :
            await bubble_sort1();
            break;
        case 'Bubble Sort 2' :
            await bubble_sort2();
            break;
        case 'Bubble Sort 3' :
            await bubble_sort3();
            break;
        case 'Cocktail Shaker Sort' :
            await cocktail_shaker_sort();
            break;
        case 'Insertion Sort' :
            await insertion_sort();
            break;
        case 'Quick Sort' :
            await quick_sort(0, Arr.length-1);
            break;
        case 'Radix Sort 1' :
            await radix_sort1(2);
            break;
        case 'Radix Sort 2' :
            await radix_sort2(0, Arr.length-1, 6);
            break;
        case 'Selection Sort' :
            await selection_sort();
            break;
        case 'Shell Sort' :
            await shell_sort([25,13,7,5,3,2,1]);
            break;
    }
}

function draw(){
    background(0);

    textSize(25);
    fill(255);
    text('Swaps: ' + str(swaps), 10, 30);
    text('Comparisons: ' + str(compares), 10, 60);
    text('Time: ' + str(timer/10) + " s", 10, 90);

    translate(50, height-50);
    strokeWeight(0);
    for (let i = 0 ; i < Arr.length ; i++){
        Arr[i].show(0, 0);
        translate(lenX, 0);
    }
}