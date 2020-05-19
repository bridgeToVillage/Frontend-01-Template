## 重学js|浏览器工作原理（三）

### 有限状态机（FSM）

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



### HTTP协议+语法与词法分析



状态机与浏览器的关系

个人理解状态机就是浏览器的dom渲染机制

### HTML的解析

url 得到 html





http://html.spec.whatwg.org

列出了所有状态



### 第三步总结

主要的标签有：开始标签，结束标签

状态迁移



### 第四步 创建元素



### 第五步，处理属性



### 第六步



### 第七步 文本节点

文本节点不入栈



状态机处理词法  

ll  lr 处理语法



状态机与正则等效

