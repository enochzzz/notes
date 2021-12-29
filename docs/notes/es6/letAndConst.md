---
title: let与const
author: Enoch
date: '2021-12-29'
---

### let 
1. 块级作用域。es6引入块级作用域的概念，如下"{}"代码块是块级作用域。
```
{
  var a = 1;
  let b = 2;
}
```
2. let声明的变量仅在块级作用域内生效
```
{
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); //  ReferenceError: b is not defined
```
3. 浏览器环境，全局作用域下，var/function 声明变量/方法，会挂载到window全局对象下。而let不会。
```
var a = 1;
window.a // 1
let b = 2;
window.b // undefined
```
4. 不存在变量提升
```
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;

```
5. 暂时性死区。ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
```
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```
6. 不能重复声明
```
let a
let a
// VM89:2 Uncaught SyntaxError: Identifier 'a' has already been declared

let ca
var ca
// VM121:2 Uncaught SyntaxError: Identifier 'ca' has already been declared

var ba
let ba
// VM152:2 Uncaught SyntaxError: Identifier 'ba' has already been declared
```

### const
1. const声明一个只读的常量。声明后不可修改
```
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```
2. 因为声明后值不能修改，所以const在声明时就必须初始化，即赋值
```
const foo;
// SyntaxError: Missing initializer in const declaration

```
3. const声明的值是引用类型时，需要确保引用不会被改变。如果再此基础上，可以修改他的属性。
```
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```
4. 剩余特性都和let一样