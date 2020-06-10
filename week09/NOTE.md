# 第9周作业总结

## 重学CSS|CSS动画

排版、绘制、动画 css可以分为这三类

Animation

* @keyframes定义
* animation:使用

帧 60帧

一般不把from to 与 %混用

Transition

cubic-bezier

位移曲线推荐用ease曲线

## 重学HTML|HTML语言与扩展

HTML的定义：XML与SGML

“\u0022”quot

"\u0026" amp

"\u003c" lt

"\u003e" gt





## 重学HTML|HTML语义

HTML标签-语义

html最开始是为了写论文的

aside

article

hgroup

abbr

span

ol  li

ul li

a

section 

p

## 重学浏览器API|DOM ＡPI,事件机制

```js
BrowserAPI:{
    Crypto,
    Web Animation,
    BOM,
    CSSDOMM,
    DOM:{
        DOM Tree,
        Events,
        Range
    }
}
```





事件

target.addEventListener(type,listener[,useCapture]);

useCapture是boolean值，表示是捕获还是冒泡

事件参数

type

listener

options

​	capture

​	once

​	passive



事件捕获冒泡原理示例代码

```
<div id="a" style="width:100%; height:300px;background:blue">
<div id="b" style="width:100%; height:200px;background:red">
</div>
</div>
<script>
var a = document.getElementById("a")
var b = document.getElementById("b")
</script>

a.addEventListener("click", ()=>console.log("a"),true)
b.addEventListener("click", ()=>console.log("b"),true)
a.addEventListener("click", ()=>console.log("a2"),false)
b.addEventListener("click", ()=>console.log("b2"),false)
```

addEventListener、同一元素上一定先捕获再冒泡



课落后太多，课上也没跟上，直接看作业，发现能明白怎么回事，直接上手做了：

```js
var CSSStyleDeclaration= document.defaultView.getComputedStyle(document.getElementsByTagName('body')[0], null)
这行代码可以取到279个，应该是对的，问题是怎么归类呢？懵了
```

