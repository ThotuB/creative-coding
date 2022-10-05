async function selection_sort(){
    for (let index = 0 ; index < Arr.length - 1 ; index++){
        let min = Arr[index].key;
        let mindex = index;

        Arr[index].pivot();

        for (let i = index + 1 ; i < Arr.length ; i++){
            await Arr[i].active();
            if (await compare(min, Arr[i].key) > 0 ){
                min = Arr[i].key;
                if ( mindex != index ){
                    Arr[mindex].reset();
                }
                mindex = i;
                Arr[mindex].pivot();
            }
            else {
                Arr[i].reset();
            }
        }

        await swap(Arr, index, mindex);
        Arr[mindex].reset();
        Arr[index].order();
    }
    Arr[Arr.length - 1].order();
}