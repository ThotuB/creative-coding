async function quick_sort(left, right){
    if ( left < right ) {
        let index = left;
        let pivot = Arr[right].key;

        Arr[index].active();
        Arr[right].pivot();
    
        for (let i = left ; i < right ; i++){
            Arr[i].active();
            if ( await compare(pivot, Arr[i].key) > 0 ){
                await swap(Arr, i, index);
                index++;
                Arr[index-1].reset();
                Arr[index].active();
            }
            Arr[i].reset();
        }
        await swap(Arr, index, right);

        Arr[index].reset();
    
        await Promise.all([
            quick_sort(left, index - 1),
            quick_sort(index + 1, right)
        ]);
    }
    Arr[left].order();
    Arr[left-1].order();
}