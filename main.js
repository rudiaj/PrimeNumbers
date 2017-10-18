var array = [],
    upperLimit = 0,
    output = [],
    sum = [],
    currentSum = 0;

var chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
            sum,
            output
        ]
    }
});

function calcPrimes(n) {
    array = [];
    upperLimit = 0;
    output = [];
    sum = [];
    currentSum = 0;

    var t0 = performance.now();

    upperLimit = Math.sqrt(n);
    // Eratosthenes algorithm to find all primes under n

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
        array.push(true);

    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;

            }
        }
    }

    sum.unshift('sum');
    output.unshift('prime');

    for (var i = 2; i < n; i++) {
            if (array[i]) {
                output.push(i);
                currentSum += i;
                sum.push(currentSum);
                // following code breaks the page page :S
                // chart.load({
                //     columns: [
                //         sum,
                //         output
                //     ]
                // });
            }
    }

    var t1 = performance.now();

    updateGraph(sum,output);

    console.log("time required to calc sum of prime numbers under n is " + (t1 - t0) + " milliseconds. (not including creation of graph)")

}

function updateGraph(sum,output){

    chart.load({
        columns: [
            sum,
            output
        ]
    });
};

function updateWithInterval (){
    var counter = 0,
        newSum = ['sum'],
        newOutput= ['prime'];
    var i = setInterval(function() {
        counter++;
        if(counter == sum.length) {
            clearInterval(i);
        }
        newSum.push(sum[counter]);
        newOutput.push(output[counter]);
        chart.load({
            columns: [
                newSum,
                newOutput
            ]
        });
    },100)
}