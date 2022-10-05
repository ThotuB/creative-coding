async function radix_sort2(left, right, bit){
    let i = left;
    let j = right;

    if ( left < right && right > 0 && bit >= 0 ){
        do {
            for ( ; i <= j ; i++ ) {
                Arr[i].active();
                if ( await compare(get_bit(Arr[i].key, bit), 1) == 0 ){
                    Arr[i].pivot();
                    break;
                }
                Arr[i].reset();
            }
            for ( ; i <= j ; j-- ) {
                Arr[j].active();
                if ( await compare(get_bit(Arr[j].key, bit), 0) == 0 ){
                    Arr[j].pivot();
                    break;
                }
                Arr[j].reset();
            }

            if ( i < j ) await swap(Arr, i, j);

            Arr[i].reset();
            Arr[j].reset();
        }while (i <= j);

        await Promise.all([
            radix_sort2(left, j, bit-1),
            radix_sort2(i, right, bit-1)
        ]);
    }
}

function get_bit(nr, bit){
    return (nr & (1<<bit)) ? 1 : 0;
}