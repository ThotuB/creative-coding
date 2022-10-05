async function insertion_sort(){
    for (let index = 1 ; index < Arr.length ; index++){
        let temp = Arr[index].key;

        for (let i = index-1 ; i >= 0 ; i--){
            Arr[i].active();
            Arr[i+1].active();
            if ( await compare(Arr[i].key, temp) <= 0 ){
                Arr[i].reset();
                Arr[i+1].reset();
                break;
            }
            await swap(Arr, i+1, i);
            Arr[i].reset();
            Arr[i+1].reset();
        }
    }

    await order(Arr, 0, Arr.length);
}