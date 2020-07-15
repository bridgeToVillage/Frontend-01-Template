# webpack
### 基于jsx的组件化设计
## 一、安装webpack相关依赖、插件
   ### 1、依次安装这些依赖和插件：@babel/core、@babel/plugin-transform-react-jsx、@babel/preset-env、babel-loader、webpack、webpack-cli、webpack-dev-server，其中webpack的三个依赖都要全局安装；
## 二、配置js中的jsx语法解析配置
```js
{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-react-jsx", {pragma: "create"}]]
                    }
                }
            }
```
整体上的配置就是这样:
```js
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-react-jsx", {pragma: "create"}]]
                    }
                }
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}
```
注意这里有个pragma配置，这是编译指令配置，表示会把create函数当作编译函数来执行。用过vue的应该知道h函数，就是这样配置的,你改成h就能编译h函数下的代码了。

在开发模式下（mode: "development",），optimization配置了minimize: false，这样可以方便调试，是个很有用的技巧

## 新建index.html和main.js文件
```js
// index.html
<script src="./main.js"></script>

//main.js
function create() {
    console.log(arguments)
}

class Div  {
    
}

let component = <Div id="a" class="b"/>
```
走到这里，会不会有人懵逼。先执行下代码，看看执行结果。


再把代码改造下，进一步理解jsx的编译语法：
```js
function create(Cls,attributes) {
    let o = new Cls;
    for(let name in attributes){
        o[name] = attributes[name]
    }
    return o;
}

class Div  {
    
}

let component = <Div id="a" class="b"/>

console.log(component);
```
不要怀疑，代码是可以执行的。调试看下结果，我说下流程，代码走到let component = <Div id="a" class="b"/>这里没有报错就是因为执行了create函数，create函数就是jsx的编译函数；我们看到输出结果是：
```js

```

下面继续对编译函数进行改造：
```js
function create(Cls,attributes,...children) {
    // console.log(arguments)
    let o = new Cls;
    for(let name in attributes){
        o[name] = attributes[name]
    }

    console.log(children)

    return o;
}

class Parent  {
    
}
class Child  {
    
}

let component = <Parent id="a" class="b">
    <Child></Child>
    <Child></Child>
    <Child></Child>
</Parent>

console.log(component);
// componet.setAttribute("id", "a");
```
在jsx里面，父子树组件的解析过程是先子后父

来，还能跟上不，再次改造：
```js
function create(Cls,attributes,...children) {
    let o = new Cls({
        timer: {}
    });
    for(let name in attributes){
        o.setAttribute(name, attributes[name])
    }

    for(let child of children) {
        o.appendChild(child);
    }

    return o;
}

class Parent  {
    constructor(config) {
        this.children = [];
    }

    set class(v) {
        console.log("Parent::class",v)
    }

    setAttribute(name, value){
        console.log(name, value)
    }

    appendChild(child) {
        console.log(child)
    }
}
class Child  {
    
}

let component = <Parent id="a" class="b">
    <Child></Child>
    <Child></Child>
    <Child></Child>
</Parent>

console.log(component);
```
组件设计的核心：
attribute、property、children


## 疑问
* 1、webpack与webpack-cli要全局安装才能使用webpack,但是课程上是本地安装，为什么我这里只能全局，非全局就报错
* 2、jsx如果传入是小写，会认为是字符串；如果是大写开头，会认为是class或者Function