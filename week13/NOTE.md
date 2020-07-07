# 编程与算法训练 | Proxy 与双向绑定

proxy是es6出来的新api，如果不熟悉的可以先了解下[Proxy](https://es6.ruanyifeng.com/#docs/proxy)。

这里举个例子：

```js
var target = {};
var handler = {};
var proxy = new Proxy(target,handler);
proxy.a = 'b';
target.a // 'b'
```



