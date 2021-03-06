---
title: 解构赋值
author: Enoch
date: '2021-12-29'
---

### 定义：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

#### 数组的解构赋值
1. 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值

```
const a = [1,2,3];
const [b,c,d] = a;
console.log(b,c,d); // 1,2,3

let g,f
[g,f] = a
console.log(g,f); // 1,2


let g = [2,[1,[3]]]
let ga,gb,gc
[ga,[gb,[gc]]] = g
console.log(ga,gb,gc) // 2 1 3
```

2. 匹配不到时，赋值undefined
```
let [foo] = [];
let [bar, foo] = [1];
// 两个foo都是undefined
```

3. 有iterator接口的，都可以采用数组形式解构赋值
```
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```

4. 允许设置默认值
```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

```
注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
```
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```

#### 对象的解构赋值
1. 注意：组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

2. 如果匹配失败/解构失败，变量的值等于undefined。
```
let {foo} = {bar: 'baz'};
foo // undefined
```

3. 以上写法，其实是变量名与属性名一样的写法。如果变量名与属性名不一致，必须写成下面这样。
```
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
这实际上说明，对象的解构赋值是下面形式的简写。也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

4. 嵌套对象解构
```
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}

// 上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
```

5. 也可以设置默认值，条件同样是对象的属性值严格等于undefined。
```
var {x: y = 3} = {};
y // 3
```

6. 先声明，后解构的注意事项
```
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error


// 正确的写法
let x;
({x} = {x: 1});

//  上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
```


### 字符串解构赋值
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

//  字符串被转换成了一个类似数组的对象。所以他也有length

let {length : len} = 'hello';
len // 5
```

### 函数参数的解构

```
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 基本就是上面几种的应用
```

