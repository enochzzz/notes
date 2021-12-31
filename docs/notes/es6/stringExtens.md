---
title: 模板字符串
author: Enoch
date: '2021-12-31'
---

### 模板字符串
1. 形式如下
```
let a = `nihao`;
let b = `
你好啊
`
let c = ` dd ${a}`
```
2. 可以换行
3. 可以使用变量，基本一些表达式，函数
```
let a = 1;
let b= `${a == 1? 'dd':'xx'}`;
function c() {
  return 1;
}
let d= `${c()}`;
```
4. 可以嵌套
```
let b = 1;
let a = `
dd
${`${b == 1? 'dd':'xx'}`}
`
```

5. 套用变量返回的不是字符串，会先调用toString方法转字符串
```
let a = `${{}}`
let b = `${function(){}}`
```


### 模板标签
1. 。。。说实话我没看太懂这个用在什么场景


### 参考：
- [1] [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/string)