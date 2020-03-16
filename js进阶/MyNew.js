function myNew(constructor, opt) {
    const result = {};
    constructor.call(result, opt);
    result.__proto__ = constructor.prototype;
    return result;
}

const Man = function(info) {
    this.name = info.name;
    this.age = info.age;
};
Man.prototype.walk = function(steps) {
    console.log(this.name + ' walks ' + steps + ' steps');
};

const zhangsan = myNew(Man, {
    name: 'zhangsan',
    age: 20
});

console.log(zhangsan instanceof Man);

zhangsan.walk(10);
