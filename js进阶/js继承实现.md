# js面向对象

## 类的创建 

两种方式：
 + es5，使用function作为构造函数
 + es6的class API
 
 
## 继承方式

### 组合继承

```javascript
var Parent = function(options) {
    this.options = options;
}
var Child = function(options) {
    Parent.call(this, options);
}
Child.prototype = Parent.prototype;
```

### 寄生组合继承

```javascript
var Parent = function(options) {
    this.options = options;
}
var Child = function(options) {
    Parent.call(this, options);
}
Child.prototype = Object.create(Parent.prototype, {
    constructor: {
        value: Child,
        enumerable: false,
        configurable: true,
        writable: true
    },
    
})
```

### es6继承

```javascript
class Parent {
    constructor(props) {
     
    }
    
}
class Child extends Parent{
    constructor(props) {
        super(props);
    }
}
```
