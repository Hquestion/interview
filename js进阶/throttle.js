function throttle (fn, wait) {
    let lastTime = 0;
    let currentTime = 0;
    return function() {
        currentTime = new Date();
        if (currentTime - lastTime > wait) {
            fn.apply(null, arguments);
            lastTime = currentTime;
        }
    }
}

function debounce(fn, wait) {
    let timer = null;
    return function() {
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(null, args);
        }, wait);
    }
}

function testThrottle() {
    var test = function(a) {
        console.log('throttle timestamp: ' + +new Date())
        console.log(a);
    };
    var wrapper = throttle(test, 1000);
    setInterval(function() {
        wrapper(1);

    }, 20);
}
function testDebounce() {
    var fn = function(a) {
        console.log('debounce timestamp: ' + +new Date());
        console.log(a);
    };
    var wrapper = debounce(fn, 200);
    let count = 0, timer = null;
    timer = setInterval(function() {
        wrapper(4);
        count++;
        if(count > 10) {
            clearInterval(timer);
        }
    }, 100)
}

// testThrottle();
testDebounce();
