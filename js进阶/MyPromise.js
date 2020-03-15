// todo 简单实现Promise/A+规范，以及Promise.all,Promise.race等API
const status = {
    PENDING: 'PENDING',
    FULL_FILLED: 'FULL_FILLED',
    REJECTED: 'REJECTED'
};

function MyPromise(fn) {
    this.status = status.PENDING;
    this.onFullfilled = [];
    this.onRejected = [];
}

MyPromise.prototype.then = function(onFullfilled, onRejected) {
    this.onFullfilled.push(onFullfilled);
    this.onRejected.push(onRejected);
    return this;
};

MyPromise.prototype.resolve = function(value) {
    // todo

};

MyPromise.prototype.reject = function(value) {

};

