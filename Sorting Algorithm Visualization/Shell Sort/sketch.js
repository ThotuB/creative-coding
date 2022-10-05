async function shell_sort(Steps){
    for (let indexSteps = 0 ; indexSteps < Steps.length ; indexSteps++){
        let step = Steps[indexSteps];

        for (let index = step ; index < Arr.length ; index++){
            let temp = Arr[index].key;

            for (let i = index ; i >= step && i < Arr.length ; i -= step){
                Arr[i].active();
                Arr[i-step].active();
                if ( await compare(Arr[i-step].key, temp) <= 0 ){
                    Arr[i].reset();
                    Arr[i-step].reset();
                    break;
                }
                await swap(Arr, i, i-step);
                Arr[i].reset();
                Arr[i-step].reset();
            }
        }
    }
    await order(Arr, 0, Arr.length);
}