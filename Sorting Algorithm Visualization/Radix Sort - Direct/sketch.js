async function radix_sort1(mask){
    let bits = Math.ceil(Math.log2(Arr.length));
    const BucketsSize = Math.pow(2, mask);
    let Buckets = [];
    for (let index = 0 ; index < BucketsSize ; index++){
        Buckets[index] = [];
    }

    const passMax = Math.ceil(bits/mask);
    print(passMax);
    for (let pass = 0 ; pass < passMax ; pass++){
        for (let i = 0 ; i < Arr.length ; i++){
            let index = get_bits(Arr[i].key, pass*mask, mask);
            Buckets[index].push(Arr[i]);
        }
        print(Buckets);

        let k = 0;
        for (let index = 0 ; index < BucketsSize ; index++){
            for (let elem in Buckets[index]){
                Arr[k] = elem;
                k++;
            }
            Buckets[index] = [];
        }
    }
    print(Arr);
}

function get_bits(nr, bit, nrOfBits){
    return (nr >> bit) & (~(~0 << nrOfBits));
}