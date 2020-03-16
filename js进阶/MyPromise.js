// todo 简单实现Promise/A+规范，以及Promise.all,Promise.race等API
const status = {
    PENDING: 'PENDING',
    FULL_FILLED: 'FULL_FILLED',
    REJECTED: 'REJECTED'
};

function MyPromise(fn) {
    const that = this;
    this.status = status.PENDING;
    this.value = '';
    this.onFullfilledCallback = [];
    this.onRejectedCallback = [];

    function resolve(value) {
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }
        if (that.status === status.PENDING) {
            that.status = status.FULL_FILLED;
            that.value = value;
            setTimeout(() => {
                console.log('callback length: ' + that.onFullfilledCallback.length);
                that.onFullfilledCallback.forEach(item => {
                    return item(that.value);
                });
            }, 0);
        }

    }

    function reject(reason) {
        if (that.status === status.PENDING) {
            that.status = status.REJECTED;
            that.value = reason;
            setTimeout(() => {
                that.onRejectedCallback.forEach(item => {
                    return item(that.value);
                });
            }, 0);
        }
    }
    try {
        fn(resolve, reject);
    } catch (e) {
        throw e;
    }
}

MyPromise.prototype.then = function(onFullfilled, onRejected) {
    onRejected = typeof onRejected === 'function' ? onRejected : (e) => {throw e};
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (value) => value;
    const that = this;

    function resolutionProcedure(promise2, x, resolve, reject) {
        if(x === promise2) {
            reject(new TypeError('x equals to promise2'));
            return;
        }
        if (x instanceof MyPromise) {
            x.then(function(value) {
                resolutionProcedure(promise2, value, resolve, reject)
            }, reject)
        }
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            let called = false;
            try {
                var then = x.then;
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolutionProcedure(promise2, y, resolve, reject)
                }, e => {
                    if(called) return;
                    called = true;
                    reject(e);
                })
            }catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    }
    if(this.status === status.PENDING) {
        const promise2 = new MyPromise((resolve, reject) => {
            that.onFullfilledCallback.push(() => {
                try {
                    const x = onFullfilled(that.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });

            that.onRejectedCallback.push(() => {
                try {
                    const x = onRejected(that.value);
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            })
        });
        return promise2;
    }
    if (this.status === status.FULL_FILLED) {
        onFullfilled(this.value);
    }
    if (this.status === status.REJECTED) {
        onRejected(this.value);
    }
    return this;
};

MyPromise.resolve = function(value) {
    return new MyPromise(function(resolve, reject) {
        resolve(value);
    });
};

MyPromise.reject = function(value) {
    return new MyPromise(function(resolve, reject) {
        reject(value);
    });
};

function doSthWithValue(value) {
    return new MyPromise((resolve, reject) => {
        console.log('接受到初始value： ' + value);
        const result = value >> 1;
        console.log('正在执行耗时操作： ' + value);
        setTimeout(() => {
            console.log('处理后的值： ' + result);
            resolve(result);
        }, 2000);
    });
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        const num = Math.floor(Math.random() * 100);
        num > 20 ? resolve(doSthWithValue(num)) : reject(num);
    }, 1000);
});

promise.then(function(value) {
    console.log(value);
    return value;
}, function(reason) {
    console.log('rejected reason: ' + reason);
}).then(function(value) {
    console.log('next then recieve value: ' + value);
}, e => {
    console.log('next reject :' + e);
});

// MyPromise.resolve(100).then((value) => {console.log(value)});
