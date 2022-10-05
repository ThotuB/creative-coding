async function bubble_sort2(){
    let flag;

    do{
        flag = false;
        for (let i = 0 ; i < Arr.length - 1 ; i++){
            Arr[i].active();
            Arr[i+1].active();
            if ( await compare(Arr[i].key, Arr[i+1].key) > 0 ){
                await swap(Arr, i, i+1);
                flag = true;
            }
            Arr[i].reset();
            Arr[i+1].reset();
        }
    }while(flag);

    await order(Arr, 0, Arr.length);
}