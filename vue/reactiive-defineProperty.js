function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return;
    }
    for(var key in obj) {
        defineReactive(obj, key, obj[key]);
    }
}

function defineReactive(obj, key, value) {
    observe(value);
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            // get时进行依赖收集
            dep.addStub({
                update: function() {
                    console.log('get: 我更新了')
                }
            });
            return value;
        },
        set(val) {
            // set时派发更新
            value = val;
            console.log('set : 我派发更新了');
            dep.notify();
        }
    })
}

class Dep {
    constructor() {
        this.stubs = [];
    }
    addStub(stub) {
        this.stubs.push(stub);
    }
    notify() {
        this.stubs.forEach(stub => {
            stub.update();
        });
    }
}
Dep.target = null;

class Watcher {
    constructor(fn) {
        this.update =  fn;

    }
}

var user = {name: 'mike', age: 10};

observe(user);
console.log(user.name);
user.name = 'Jack';

