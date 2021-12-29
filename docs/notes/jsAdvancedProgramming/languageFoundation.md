---
title: 第三章 HTML种的JavaScript
author: Enoch
date: '2021-12-29'
---

### 语法
#### 区分大小写
1. js种一切都区分大小写，无论是变量、函数名还是操作符。

#### 标识符
1. 所谓标识符，就是变量、函数、属性或函数参数的名称。
  - 第一个字符必须是一个字母、下划线（_）或美元符号（$）；
  - 剩下的其他字符可以是字母、下划线、美元符号或数字。

2. 关键字、保留字、true、false 和 null 不能作为标识符

#### 严格模式
1. ECMAScript 5 增加了严格模式（strict mode）的概念.
2. 严格模式是一种不同的 JavaScript 解析和执行模型，ECMAScript 3 的一些不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。
3. 启用严格模式，在脚本开头加上这一行："use strict";也可以单独指定一个函数在严格模式下执行，只要把这个预处理指令放到函数体开头即可：
```
function doSomething() {
 "use strict";
 // 函数体
} 

```

#### 语句
1. 语句以分号为结尾。不加分号也能执行，但是不推荐。部分代码不加分号会出问题
```
[1].map(i => i)  // 不报错


let a = 3
[1].map(i => i)  // Cannot read properties of undefined (reading 'map')

let a = 3
;[1].map(i => i)  // 不报错

```
由上面代码可以看出，不加分号，有时候是会有问题的。这个开头是'['，把他和上面一句当作一个整体执行了，所以报错了。
可以看看尤大的说法：[JavaScript 语句后应该加分号么？](https://www.zhihu.com/question/20298345/answer/49551142)
会导致上下行解析出问题的 token 有 5 个：括号，方括号，正则开头的斜杠，加号，减号。
但是这种情况一般很少。所以加不加看自己习惯了，加了更符合规范。


2. if之类的条件语句，如果只执行一条语句，可以省略括号。执行多条语句必须有括号即代码块
```
// 有效，但容易导致错误，应该避免
if (test)
 console.log(test);
// 推荐
if (test) {
 console.log(test);
} 

```

#### 关键字与保留字
1. 关键字不能用作标识符或属性名。
```
break do in typeof
case else instanceof var
catch export new void
class extends return while
const finally super with
continue for switch yield
debugger function this
default if throw
delete import try



始终保留:
enum
严格模式下保留:
implements package public
interface protected static
let private
模块代码中保留:
await 
```

#### var关键字
1. var 声明作用域。使用 var 操作符定义的变量会成为包含它的函数的局部变量。使用 var在一个函数内部定义一个变量，就意味着该变量将在函数退出时被销毁。
```
function test() {
 var message = "hi"; // 局部变量
}
test();
console.log(message); // 出错！

```

2. var变量提升
```
function foo() {
 console.log(age);
 var age = 26;
}
foo(); // undefined 
```

#### let\const
1. '../es6+/1. 【es6+】 let、const.md'


#### 声明风格最佳实践
1. 不适用var，const优先，let次之

------
#### 数据类型
1. 简单数据类型：ECMAScript 有 6 种简单数据类型（也称为原始类型）：Undefined、Null、Boolean、Number、String 和 Symbol。Symbol（符号）是 ECMAScript 6 新增的。
2. 还有一种复杂数据类型叫 Object（对象）。Object 是一种无序名值对的集合。

#### typeof 操作符
对一个值使用 typeof 操作符会返回下列字符串之一：
```
"undefined"表示值未定义；
"boolean"表示值为布尔值；
"string"表示值为字符串；
"number"表示值为数值；
"object"表示值为对象（而不是函数）或 null；
"function"表示值为函数；
"symbol"表示值为符号。
```

#### Undefined
1. Undefined 类型只有一个值，就是特殊值 undefined。当使用 var 或 let 声明了变量但没有初始化时，就相当于给变量赋予了 undefined 值
2. undefined 有可能会被改写，所以有时候也可以使用void 0来表示undefined，如下：
```
function a() {
let undefined = 1;
console.log(undefined);   //1
let b;
console.log(undefined === b)  //false
console.log(b===void 0)  // true
}
a();

```

#### Null
1. typeof null === 'object'  //true
2. null === null //true


#### Boolean
1. 有两个字面值：true 和 false
2. 所有其他 ECMAScript 类型的值都有相应布尔值的等价形式。要将一个其他类型的值转换为布尔值，可以调用特定的 Boolean()转型函数
```
let message = "Hello world!";
let messageAsBoolean = Boolean(message); 
```

```
数据类型  转换为 true 的值  转换为 false 的值
Boolean  true  false
String  非空字符串  ""（空字符串）
Number  非零数值（包括无穷值）  0、NaN（参见后面的相关内容）
Object  任意对象  null
Undefined  N/A（不存在）  undefined
```


#### Number
1. 最基本的数值字面量格式是十进制整数
2. 整数也可以用八进制（以 8 为基数）或十六进制（以 16 为基数）字面量表示。对于八进制字面量，第一个数字必须是零（0），然后是相应的八进制数字（数值 0~7）。如果字面量中包含的数字超出了应有的范围，就会忽略前缀的零，后面的数字序列会被当成十进制数。（八进制字面量在严格模式下是无效的，会导致 JavaScript 引擎抛出语法错误。）
```
let octalNum1 = 070; // 八进制的 56
let octalNum2 = 079; // 无效的八进制值，当成 79 处理
let octalNum3 = 08; // 无效的八进制值，当成 8 处理
```
3. 要创建十六进制字面量，必须让真正的数值前缀 0x（区分大小写），然后是十六进制数字（0~9 以及 A~F）。十六进制数字中的字母大小写均可。
```
let hexNum1 = 0xA; // 十六进制 10
let hexNum2 = 0x1f; // 十六进制 31
```
4. 使用八进制和十六进制格式创建的数值在所有数学操作中都被视为十进制数值。
```
 0xA +  0xA;  // 20
```