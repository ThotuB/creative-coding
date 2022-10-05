async function bubble_sort1(){
    let flag;
    let right = Arr.length-1;

    do{
        flag = false;
        for (let i = 0 ; i < right ; i++){
            Arr[i].active();
            Arr[i+1].active();
            if ( await compare(Arr[i].key, Arr[i+1].key) > 0 ){
                await swap(Arr, i, i+1);
                flag = true;
            }
            Arr[i].reset();
            Arr[i+1].reset();
        }
        Arr[right].order();
        right--;
    }while(flag);

    await order(Arr, 0, Arr.length);
}