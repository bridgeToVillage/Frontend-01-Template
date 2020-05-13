## 重学js|结构化（二）

### Realm

* JS Context => Realm

* 宏任务
* 微任务(Promise)
* 函数调用(Execution Context)
* 语句/声明
* 表达式
* 直接量/变量/this......



#### 遍历所有对像

```js
var set = new Set();
var globalProperties=[
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"]

var queue = [];
for(var p of globalProperties){
    queue.push({
        path:[p],
        object:this[p]
    })
}
let currentt;
while(queue.length){
    currentt = queue.shift();
    console.log(currentt.path.join('.'));
    if(set.has(currentt.object))
        continue;
    set.add(currentt.object);
    //console.log(currentt);
    for(let p of Object.getOwnPropertyNames(currentt.object)){
        var property = Object.getOwnPropertyDescriptor(currentt.object,p);
        if(property.hasOwnProperty('value')&&
          ((property.value == null)&&(typeof property.value == "object") || (typeof property.value == "object"))
          &&property.value instanceof Object)
          queue.push({
              path:currentt.path.concat([p]),
              object:property.get
          });

       if(property.hasOwnProperty("get")&&(typeof property.get == "function")){
           queue.push({
               path:currentt.path.concat([p]),
               object:property.get
           });
       }
      if(property.hasOwnProperty("set")&&(typeof property.set == "function")){
           queue.push({
               path:currentt.path.concat([p]),
               object:property.set
           });
       }
     }
  }
```

### 函数调用

#### Execution Context Stack  栈

![](E:\doc\学习资料\微信公众号\pic\d246f11a-0081-433d-851c-6d7498a7a581-1589383290469.png)

##### Generator

```js
function *foo(){
	yield 1;
	yield 2;
	yield 3;
}
var g = foo();
g.next();
```

##### LexicalEnvironment-词法环境

* this
* new.target
* super
* 变量

##### VariableEnvironment-变量环境

VariableEnvironment是个历史包袱，仅用于处理var声明

```js
{
   let y =2;
   eval('var x =1 ;');
}

with({a:1}){
  eval('var x;');
}
console.log(x);
```

##### Environment Record

![](E:\doc\学习资料\微信公众号\pic\b0670145-cf10-44e6-8bb9-cfe618f37d90-1589383290449.png)

##### Function - Closure

```js
var y = 2;
function foo2(){
  console.log(y);
}
export foo2;
```

![](E:\doc\学习资料\微信公众号\pic\11bce807-fdd1-4dcc-b3c8-e7f833853eaf-1589383290454.png)

```js
var y = 2;
function foo2(){
  var z = 3;
  return function foo3(){
      console.log(y,z);
  }
}
var foo3 = foo2();
export foo3;
```


![](E:\doc\学习资料\微信公众号\pic\cb8731ae-0503-4f40-8d98-7ffd47b2a67b-1589383290788.png)


### Realm有什么用

```js
var iframe = document.createElement("iframe")
document.body.appendChild(iframe)
iframe.contentWindow.eval("this.o={}")
iframe.contentWindow.o
iframe.contentWindow.o instanceof Object
```

在js中，函数表达式和对象直接量均会创建对象。
使用.做隐匿转换也会创建对象。
这些对象也是有原型的，如果没有Realm,就不知道它们的原型是什么。

## 浏览器工作原理（一）

#### 在浏览器输入url发生了什么

![](E:\doc\学习资料\微信公众号\pic\662b88be-98aa-44e1-8ba0-c0f2d6eb04f3.png)


![](E:\doc\学习资料\微信公众号\pic\0ab05b18-6421-4b08-af02-a6a17069e99e.png)

![](E:\doc\学习资料\微信公众号\pic\d439d548-57e6-4b25-b513-e40eb3d8b913.png)

## 浏览器工作原理（二）

### node   创建一个简单的server

server

```js
const http = require("http")
const server = http.createServer((req, res) => {
  console.log("request received");
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
server.listen(8088);
```



client

```js
const net = require("net")

class Request {

}

class Response {

}


const net = require('net');
net.connect({
  address:"localhost",
  port: 8088,
  onread: {
    // Reuses a 4KiB Buffer for every read from the socket.
    buffer: Buffer.alloc(4 * 1024),
    callback: function(nread, buf) {
      // Received data is available in `buf` from 0 to `nread`.
      console.log(buf.toString('utf8', 0, nread));
    }
  }
});
```



### 用控制台调用服务

```js
var xhr = new XMLHttpRequest;
xhr.open("get","http://127.0.0.1:8088",true);
xhr.send(null);
xhr.responseText
xhr.HEADERS_RECEIVED
```



#### html标准1.1

https://tools.ietf.org/html/rfc2616

#### 实现一个简易浏览器请求头

client2

```js
const net = require("net")

class Request {

}

class Response {

}


const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088 }, () => {
        console.log('connected to server!');
        client.write(`
POST / HTTP/1.1\r
Content-Type: application/x-www-form-urlencoded\r
Content-Length: 11\r
\r
name=winter`);
    });
client.on('data',(data) => {
    console.log(data.toString());
    client.end();
});
client.on('end',() => {
    console.log('disconnected from server');
})

client.on('error',(err) => {
    console.log(err);
    client.end();
})
```

这个请求失败，没明白



#### 原因在这里！！！！

反引号字符串换行后不能有缩进！！！

http是一个文本，怎么理解？

client2.js改成这样就不成功了，没明白

```js
const net = require("net")

class Request {
    //method,url = host + port +path
    //body:k/v
    //headers
    constructor(options){
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }

        if(this.headers["Content-Type"] === "application/json")
            this.bodyText = JSON.stringify(this.body);
        else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded")
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        
        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    }

    send() {

    }

}

class Response {

}


const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088 }, () => {
        console.log('connected to server!');
        let reuest = new Request({
            method: "POST",
            host: "127.0.0.1",
            port: "8088",
            path: "/",
            body: {
                name:"winter"
            }
        })
        
        console.log(request.toString());
        /*client.write(`
POST / HTTP/1.1\r
Content-Type: application/x-www-form-urlencoded\r
Content-Length: 11\r
\r
name=winter`);*/
    });
client.on('data',(data) => {
    console.log(data.toString());
    client.end();
});
client.on('end',() => {
    console.log('disconnected from server');
})

client.on('error',(err) => {
    console.log(err);
    client.end();
})
```

报错：

```js
 this.headers["Content-Length"] = this.bodyText.length;
                                                                              ^

TypeError: Cannot read property 'length' of undefined
```

