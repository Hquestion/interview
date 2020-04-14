/**
 * 需求：
 * 给一段html结构，如'<div><span>text</span></div>',
 * 要求解析成VDOM，即{tag: 'div', children: [{tag: 'span', children: ['text']}]}
 * 简单实现思路：正则将字符串各个标签转成数组，遍历数组，匹配到结束标签后，则将最近的一个标签出栈，同时将其添加到前一个标签的
 * children数组里，直至最终匹配结束
 */


function Stack () {
    this.stack = [];
}

Stack.prototype.push = function(item) {
    this.stack.push(item);
};

Stack.prototype.pop = function() {
    this.stack.pop();
};

Stack.prototype.getCount = function() {
    return this.stack.length;
};

Stack.prototype.peek = function() {
    return this.stack[this.getCount() - 1];
};

Stack.prototype.isEmpty = function() {
    return this.stack.length === 0;
};

Stack.prototype.splice = function(start, count) {
    return this.stack.splice(start, count);
};

var tree = {};



var str = '<div class="parent"><span class="child1">child1</span><a>child2</a></div>';

var compile = function(str) {
    var stack = new Stack();
    var reg = /<([^>]+)>/;
    var list = str.split(reg).map((item, index) => {
        if(index === 0) {
            return item;
        }
        if(index === str.split(reg).length - 1) {return item}
        var realItem = item;
        if((str.split(reg)[index- 1] === '' || str.split(reg)[index+1] === '') && item !== '') {
            realItem = `<${realItem}>`;
        }
        return realItem;

    }).filter(item => item !== '');

    var lastTagIndexStack = new Stack();
    var result = null;

    for(var index in list) {
        var item = list[index];
        if (/<\/.+>/.test(item)) {
            // 遇到结束标签，则将上次的tag标签处到当前标签处出栈，修改为上个标签的children
            var child = stack.splice(lastTagIndexStack.peek(), stack.getCount() - lastTagIndexStack.peek());
            Array.prototype.push.apply(child[0].children, child.slice(1));
            if (lastTagIndexStack.getCount() > 0 && stack.stack[lastTagIndexStack.peek() - 1]) {
                stack.stack[lastTagIndexStack.peek() - 1].children.push(child[0]);
            } else {
                result = child[0];
            }
            lastTagIndexStack.pop();
            continue;
        }
        var matched = item.match(/<([^\W\/]+)/);
        var tag = matched && matched[1];
        if (tag) {
            // 有标签则是节点
            var attributes = item.slice(0, item.length - 1).split(' ').slice(1);
            var attrMap = {};
            attributes.forEach(attr => {
                attrMap[attr.split('=')[0]] = attr.split('=')[1] || true
            });
            stack.push({
                tag,
                attr: attrMap,
                children: []
            });
            lastTagIndexStack.push(stack.getCount() - 1);
        } else {
            // 无标签，文本节点
            stack.push({
                text: item,
                tag,
                attr: attrMap
            });
        }

    }
    return result;
};

console.log(compile(str));
