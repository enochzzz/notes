---
title: 浏览器缓存
author: Enoch
date: '2021-12-30'
---

### 前言
1. 不做缓存，每次都需要重复请求静态文件，造成了不必要的浪费，对用户体验也会有影响。
2. 浏览器缓存 是浏览器将用户请求过的静态资源（html、css、js），存储到电脑本地磁盘中，当浏览器再次访问时，就可以直接从本地加载了，不需要再去服务端请求了。
3. 缓存优点：
  - 减少了冗余的数据传输，节省网费
  - 减少服务器的负担，提升网站性能
  - 加快了客户端加载网页的速度

### 缓存流程
1. 初次请求，服务器返回新的资源以及缓存规则。
2. 再次请求，校验缓存规则，命中规则则使用本地缓存资源。没有命中缓存规则则返回新的资源以及缓存规则。
![cache](https://s2.loli.net/2021/12/30/uxhFiCZgk7956tU.png)

3. 缓存规则实在response header中返回来的。
![20211230110522](https://s2.loli.net/2021/12/30/WBmM6rtjhlTvKb4.png)

### 缓存规则-强缓存
1. 如果设置了强缓存，先判断资源是否过期，没有过期，不发请求，直接使用本地缓存资源。如果过期，请求服务器，再看后续。
2. 缓存相关字段
  - Expires，设置一个GMT格式的字符串，设置资源有效期。基本淘汰，不用管。
  - Cache-Control，可以设置多个值
    - private： 仅浏览器可以缓存
    - public： 浏览器和代理服务器（cdn服务器）都可以缓存
    - max-age：max-age=xxx 过期时间（单位是秒）
    - immutable：表示该资源永远不变。户会点击浏览器左上角的刷新按钮去刷新页面，这时候就算资源没有过期（1年没这么快过），浏览器也会直接去请求服务器。再加个immutable的话，就算用户刷新页面，浏览器也不会发起请求去服务，浏览器会直接从本地磁盘或者内存中读取缓存并返回200状态。
    - no-cache：不进行强缓存
    - no-store：不强缓存，也不协商缓存，什么缓存都不做
  ![20211230111056](https://s2.loli.net/2021/12/30/aFeAOiTSUok5KbL.png)
3. expires和cache-control都设置时，cache-control优先级高于expires

4. 大致流程
![![20211230111552](httpss2.loli.net202112302aMCGc5piTht87s.png)](https://s2.loli.net/2021/12/30/a7DZCELp3H9QxwV.png)
![20211230111609](https://s2.loli.net/2021/12/30/VxY5J9TNDnUiyMl.png)


### 缓存规则-协商缓存
1. 如果强缓存规则没有命中，会发请求到服务器。那么接下来会走协商缓存的流程。
  - Cache-Control 的值为 no-cache （不强缓存）
  - Cache-Control max-age 过期
2. 如果命中了协商缓存，那么会把相关控制字段返回，告诉浏览器使用本地缓存，此时状态码应该是304。如果没有命中协商缓存，会把新资源和相关字段的新值返回。
3. 除了Cache-Control：no-store，都可能最后要进行协商缓存
4. 控制协商缓存的字段（ETag 和 Last-Modified）如下：
  - ETag：每个文件有一个，改动文件了就变了，可以看似md5
  - Last-Modified：文件的最后修改时间
![20211230113025](https://s2.loli.net/2021/12/30/71xDmQWlu2PLFCK.png)
5. 流程：每次http返回来 response header 中的 ETag和 Last-Modified，在下次请求时在 request header 就把这两个带上（但是名字变了ETag-->If-None-Match，Last-Modified-->If-Modified-Since ），服务端把你带过来的标识，资源目前的标识，进行对比，然后判断资源是否更改了。
![20211230113440](https://s2.loli.net/2021/12/30/hlpiQO8ycLuvazo.png)
![20211230113503](https://s2.loli.net/2021/12/30/oFlRE5p4X7Wgimb.png)

6. etag和last-modified都设置时，先判断etag，如果etag不一样则视作资源更改，直接返回新资源和新的字段值。如果etag相同再判断last-modified。

7. 为什么要有etag？（HTTP1.1中etag的出现（也就是说，etag是新增的，为了解决之前只有If-Modified的缺点）主要是为了解决几个last-modified比较难解决的问题）
  - 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新get；
  - 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，if-modified-since能检查到的粒度是秒级的，这种修改无法判断；
  - 某些服务器不能精确的得到文件的最后修改时间。

### 其他
1. 用户的一些操作会影响缓存。
  - F5 跳过强缓存规则，直接走协商缓存。但是如果cache-control设置了immutable则不会跳过强缓存规则。
  - Ctrl+F5 ，跳过所有缓存规则，和第一次请求一样，重新获取资源
![20211230114029](https://s2.loli.net/2021/12/30/lyIBVEdHt6JwvLW.png)

2. 项目缓存策略
比如 vue 项目，脚手架已经将更改的文件做 hash 处理了，因此一般的 js、css 文件不需要我们再去操作。
而对于 index.html，我们需要在 nginx 上做 no-store 处理，即完全不缓存 index.html，每次都请求最新的html。。。因为 html 中会外链 css、js，如果我 html 还是走的缓存，那链接的还是老的 css 。

### 参考：
- [1] [浏览器缓存](https://juejin.cn/post/6844903763665240072)

- [2] [彻底弄懂强缓存与协商缓存](https://www.jianshu.com/p/9c95db596df5)

- [3] [2021 年当我们聊前端部署时，我们在聊什么](https://juejin.cn/post/7017710911443959839)