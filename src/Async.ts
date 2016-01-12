module Utils {

    export class Async {
        static WaitFor(test: () => boolean, successCallback: () => void, failureCallback: () => void, interval: number, maxTries: number, numTries?: number) {
            if (!interval) interval = 50;
            if (!maxTries) maxTries = Number.MAX_VALUE;
            if (!numTries) numTries = 0;

            numTries += 1;

            if (numTries > maxTries){
                failureCallback();
            } else if (test()){
                successCallback();
            } else {
                setTimeout(function(){
                    Async.WaitFor(test, successCallback, failureCallback, interval, maxTries, numTries);
                }, interval);
            }
        }
    }
}