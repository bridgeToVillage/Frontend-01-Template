## 重学js|浏览器工作原理（三）(第6周)

### 第一部分  有限状态机（FSM）

* 每个状态都是一个机器
  * 在每一个机器里，我们可以做计算、存储、输出
  * 所有的这些机器接受的输入是一致的
  * 状态机的每一个机器本身没有状态，如果我们用函数来表示，它应该是纯函数（无副作用）
* 每个机器知道下一个状态
  * 每个机器都有确定的下一个状态（Moore)
  * 每个机器根据输入决定下一个状态（Mealy）



热身，常规代码找“abcdef”

```js
function match(string) {
     let foundA = false
     let foundB = false
     let foundC = false
     let foundD = false
     let foundE = false
     for (let char of string) {
       if (char == 'a')
         foundA = true
       else if (foundA && char == 'b')
         foundB = true
       else if (foundB && char == 'c')
         foundC = true
       else if (foundC && char == 'd')
         foundD = true
       else if (foundD && char == 'e')
         foundE = true
       else if (foundD && char == 'f')
         return true
       else {
         let foundA = false
         let foundB = false
         let foundC = false
         let foundD = false
         let foundE = false
       }
     }
     return false
   }
   console.log(match("I aabcdefghm grood."))
   console.log(match("I aacdefghm grood."))
```



这是fsm找法

```js
function match(string) {
     let state = start
     for (let char of string) {
       state = state(char)
     }
     return state === end
   }
   function start(char) {
     if (char === 'a')
       return findA
     else
       return start
   }
   function end(char) {
     return end
   }
   function findA(char) {
     if (char === 'b')
       return findB
     else
       return start(char)
   }
   function findB(char) {
     if (char === 'c')
       return findC
     else
       return start(char)
   }
   function findC(char) {
     if (char === 'd')
       return findD
     else
       return start(char)
   }
   function findD(char) {
     if (char === 'e')
       return findE
     else
       return start(char)
   }
   function findE(char) {
     if (char === 'f')
       return end
     else
       return start
   }
   console.log(match("I aabcdefghm grood."))
   console.log(match("I aacdefghm grood."))
```



### js中的有限状态机（Mealy）

伪代码是这样，理解一下：

```js
// 每个函数是一个状态
function state(input) { // 函数参数就是输入
  // 在函数中，可以自由地编写代码，处理每个状态的逻辑
  return next;
}

/** 以下是调用 **/
while(input) {
  // 获取输入
  state = state(input) // 把状态机的返回值作为下一个状态
}
```



#### 如何用状态机处理诸如“abcabx”这样的字符串

```js
function match(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if(c==="a")
        return foundA;
    else
        return start;
}

function end(c){
    return end;
}

function foundA(c){
    if(c==="b"){
        return foundB;
    }
    else
        return start(c);
}

function foundB(c){
    if(c==="c"){
        return foundC;
    }
    else
        return start(c);
}
function foundC(c){
    if(c==="a"){
        return foundA2;
    }
    else
        return start(c);
}

function foundA2(c){
    if(c==="b"){
        return foundB2;
    }
    else
        return start(c);
}

function foundB2(c){
    if(c==="x"){
        return end;
    }
    else
        return foundB(c);
}

console.log(match("abcabcabx"))
```



作业：使用状态机完成“abababx”这样的字符串

感觉没难度，调试了下好像是对的

```js
function match(string) {
    let state = start
    for (let char of string) {
      state = state(char)
    }
    return state === end
  }
  function start(char) {
    if (char === 'a')
      return findA1
    else
      return start
  }
  function end(char) {
    return end
  }
  function findA1(char) {
    if (char === 'b')
      return findB1
    else
      return start(char)
  }
  function findB1(char) {
    if (char === 'a')
      return findA2
    else
      return start(char)
  }
  function findA2(char) {
    if (char === 'b')
      return findB2
    else
      return start(char)
  }
  function findB2(char) {
    if (char === 'x')
      return end
    else
      return findB1(char)
  }
  console.log(match("I aacbabababx grood."))
```

- 挑战题：我们如何用状态机处理完全未知的 pattern（选做）

这个完全没思路，应该是有成熟算法吧！KMP？



### 第二部分 HTTP协议+语法与词法分析



状态机与浏览器的关系

个人理解状态机就是浏览器的dom渲染机制

### HTML的解析

url 得到 html

### 第一步 拆分文件

#### 第一步总结

* 为了方便文件管理，把parser单独拆到文件中
* parser接受html文本作为参数，返回一颗dom树



### 第二步 创建状态机

#### 第二步总结

* 用fsm来实现html的分析
* 在html标准中，已经规定了html的状态
* toy-browser只挑选其中一部分状态，完成一个最简版本

http://html.spec.whatwg.org

列出了所有状态

### 第三步 解析标签

#### 第三步总结

* 主要的标签有：开始标签，结束标签和自封闭标签

* 这一步暂时忽略属性



### 第四步 创建元素

#### 第四步总结

* 在状态机中，除了状态迁移，还会加入业务逻辑
* 在标签结束状态提交标签token

### 第五步，处理属性

#### 第五步总结

* 属性值分为单引号、双引号、无引号三种写法，因此要较多状态处理
* 处理属性的方式跟标签类似
* 属性结束时，我们把属性回到标签Token上

### 第六步，构建dom树

#### 第六步总结

* 从标签构建dom树的基本技艺是使用栈
* 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
* 自封闭节点可视为入栈后立刻出栈
* 任何元素的父元素是它入栈前的栈顶



### 第七步 文本节点

#### 第七步总结

* 文本节点与自封闭标签处理类似

* 多个文本节点需要合并

文本节点不入栈



状态机处理词法  

ll  lr 处理语法



状态机与正则等效



### 第三部分 css计算，排版，渲染，合成（一）

1、安装css依赖，npm install css

2、在parser中引入css（一个css  parser的库）

#### 第一步 收集css规则

* 遇到style标签时，我们把css规则调用
* 这里调用css parser来分析css规则
* 这里必须要仔细研究此库分析css规则的格式

#### 第二步 添加调用

* 创建一个元素后，立即计算css
* 理论上，当分析一个元素时，所有css规则已经收集完
* 在真实浏览器中，可能遇到写在body的style标签，需要重新css计算的情况，这里忽略

知识点：

重排必然重绘

stack.slice().reverse()

slice()是为了保护stack不被污染；reverse()   element匹配一定是先从当前元素到父元素匹配



#### 第三步 获取父元素序列

* 在computeCSS函数中，必须知道元素的所有父元素才能判断元素与规则是否匹配
* 从上一步的stack，可以获取本元素所有的父元素
* 因为首先获取当前元素，所以获得和计算父元素匹配的顺序是从内向外

```html
<div>
    <span>abc</span>
    <img id="good"/>
</div>

div span {
   color:red
}

body .a #good {

}
//最后一个元素得匹配当前元素
```

#### 第四步 拆分选择器

* 选择器也要从当前元素向外排列
* 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列



答疑

计算属性复杂

css属性变化了一定会重绘，如果加载好了一般修改style标签或者class 属性

react是做dom树比对，没有csscomputed这个阶段，性能比较好

哪些属性影响排版，哪些影响绘制

#### 第五步 计算选择器与元素匹配

* 根据选择器的类型和元素属性，计算是否与当前元素匹配
* 这里仅仅实现了三种基本选择器，实际 的浏览器要处理复合选择器
* 作业（可选）：实现复合选择器，实现支持空格的Class选择器