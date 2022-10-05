async function cocktail_shaker_sort(){
    let left = 0;
    let right = Arr.length - 1;

    while ( left < right ){
        for (let i = left ; i < right ; i++){
            Arr[i].active();
            Arr[i+1].active();
            if ( await compare(Arr[i].key, Arr[i+1].key) > 0 ){
                await swap(Arr, i, i+1);
            }
            Arr[i].reset();
            Arr[i+1].reset();
        }
        Arr[right].order();
        right--;

        for (let i = right ; i > left ; i--){
            Arr[i].active();
            Arr[i-1].active();
            if ( await compare(Arr[i-1].key, Arr[i].key) > 0 ){
                await swap(Arr, i-1, i);
            }
            Arr[i].reset();
            Arr[i-1].reset();
        }
        Arr[left].order();
        left++;
    }
}