async function bubble_sort3(){
    for (let i = 0 ; i < Arr.length-1 ; i++){
        Arr[i].active();
        for (let j = i+1 ; j < Arr.length ; j++){
            Arr[j].active();
            if ( await compare(Arr[i].key, Arr[j].key) > 0 ){
                await swap(Arr, i, j);
            }
            Arr[j].reset();
        }
        Arr[i].order();
    }
    Arr[Arr.length-1].order();
}