Function.prototype.myCall = function(ctx, ...args) {
    ctx._fn = this;
    var result = ctx._fn(...args);
    delete ctx._fn;
    return result;
};

Function.prototype.myApply = function(ctx, args) {
    ctx._fn = this;
    var result = ctx._fn(...args);
    delete ctx._fn;
    return result;
};

Function.prototype.myBind = function(ctx) {
    const fn = this;
    return function(...args) {
        return fn.myApply(ctx, args);
    };
};

var A = {
    name: 'zhangsan',
    age: 10,
    talk(to) {
        return 'I talk to '+ to +': My name is ' + this.name + ', I am ' + this.age + ' years old';
    }
};

var B = {
    name: 'lisi',
    age: 20
};

var C = {
    name: 'Jhonson',
    age: 31
};

console.log(A.talk.myCall(B, 'wangwu'));
console.log(A.talk.myApply(B, ['Jack']));

const talk = A.talk.myBind(C);
console.log(talk('Rose'));

