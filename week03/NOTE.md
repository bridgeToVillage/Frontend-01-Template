## 表达式，类型转换



案例：如何区分正零、负零

```js
function check(zero) {
    if(1/zero === Infinity){
        return 1;
    }
    if(1/zero === -Infinity){
        return -1;
    }
}
```

天蓝色是符号位；橙色是指数部分；白色部分是小数部分

没看明白





Expressions

* Member
  * a.b
  * a[b]
  * foo\`string\`
  * super.b
  * super['b']
  * new.target
  * new foo()

再看这个案例：new.target

```js
function foo(){
    console.log(new.target);
}
foo();//undefined
new foo(); // f foo(){}

伪造new对象？
```

案例：super

```js
class Parent{
    constructor(){
        this.a=1;
    }
}
class Child extends Parent{
    constructor(){
        super();
        console.log(super.a);
    }
}
new Child //Child {a:1}
```

案例：foo\`string\`

```js
var name = 'janhong';
`Hello ${name}!`
// "Hello janhong!"
var name = 'janhong';
function foo(){
    console.log(arguments)
}
foo `Hello ${name}!`;
```

案例： new foo()

```js
//括号优先
function cls1(){
    
}
function cls2(){
    return cls1;
}
new cls2//f cls1(){}
cls2()//f cls1(){}
new cls2()//f cls1(){}
new (cls2())//cls1{}
new (new cls2)//cls1{}
new new cls2()//cls1{}
new (new cls2)()//cls1{}
new(new cls2())//cls1{}

function cls1(s){
    console.log(s)
}
function cls2(s){
    console.log("2",s);
    return cls1;
}
new new cls2("good")
// 2 good
//cls1 {}  对象
```

#### Reference

* Member

#### Expressions

   * call

     还是看案例

     ```js
     class foo {
         constructor(){
             this.b = 1;
         }
     }
     new foo()['b']  //1
     
     new (foo()['b'])
     //Uncaught TypeError: Class constructor foo cannot be invoked without 'new'
         at <anonymous>:1:6
     
     
     foo["b"] = function(){}
     // f(){}
     new foo["b"]
     //foo.b {}
     new (foo["b"])
     //foo.b{}
     ```

* update

  //178页 ecma262

  ```js
  var a = 1,b =1,c=1;
  a
  ++
  b
  ++
  c
  //2    （b、c自增了）
  
  a ++  a与++之间不能有换行
  
  a/*
  */++
  b/*
  */++
  c
  //3
  [a,b,c]
  //(3)[1,3,3]
  ```

* Unary

  void 0;代替 undefined

  undefined 有局部变量被覆盖的可能

  * iife

  ```js
  for(var i= 0; i<10;i++){
      var button = document.createElement("button");
      document.body.appendChild(button);
      button.innerHTML = i;
      void function (i){
         button.onclick = function(){
          console.log(i);
         }
      }(i);
  }
  ```

  为什么在函数声明前加void比加括号要好？

  用括号，如果在最后忘记加分号，有些合并工具，把多个iife连接在一起，可能导致后面的一个不执行；

  * typeof

    ```js
    typeof null
    //"object"
    typeof function(){}
    //"function"
    ```

    typeof null 按理说应该得到null，结果很奇怪，所以作者说在js中没有完美的获取原始类型。

  * !a

    可以实现类型转换

  * && || ？：  这几个技巧我在工作经常用到

  ```js
  function foo1(){
      console.log(1);
      return false;
  }
  function foo2(){
      console.log(2);
  }
  foo1()&&foo2()
  //1
  //false
  foo1()||foo2()
  //1
  //2
  true? foo1():foo2()
  //1
  //false
  false?foo1():foo2()
  //2
  ```

  * +

  js有几种加法？

* 类型转换，上图，课件上是错的

  * 装箱

  类型只有七大类型；这七大类型在object中都有对应的类；

  ```js
  new Number(1)
  //Number{1}
  new String("hello")
  //String{"hello"}
  new String("hello").length
  //5
  "hello".length
  //5
  typeof "hello"
  "string"
  typeof new String("hello")
  //"object"
  !new String("")
  //false
  !""
  //true
  ```

  ```js
  String
  Number
  Boolean
  这三个构造器如果不带new时的类型转换，是直接形成原始类型；
  
  Object("1")
  new Object("1")
  都是一样的
  
  new Symbol("1")
  //报错，不能new
  Symbol("1")
  //Symbol(1)
  Object(Symbol("1"))
  //Symbol{Symbol(1)}
  Object(Symbol("1")).constructor
  //f Symbol(){[native code]}
  Object.getPrototypeOf(Object(Symbol("1")))=== Symbol.prototype
  //true
  Object(Symbol("1")) instanceof Symbol
  // true   为什么是true?
  
  (function(){return this}).apply(Symbol("x"))
  //Symbol{Symbol(x)}  也实现了装箱
  
  Object(undefined)
  //{}
  Object(null)
  //{}
  只有String、Number、Boolean、Symbol四种可以实现装箱
  ```

  * 拆箱

  ```js
  1+ {}
  //1[object Object]
  1+{valueOf(){return 2}}
  //3
  1+{toString(){return 2}}
  //3
  1+{toString(){return 4}}
  //5
  1+{toString(){return "4"}}
  //"14"
  1+{valueOf(){return 1},toString(){return "2"}}
  //2
  "1"+{valueOf(){return 1},toString(){return "2"}}
  //"11"
  1+{[Symbol.toPrimitive](){return 7},valueOf(){return 1},toString(){return "2"}}
  //8
  1+{[Symbol.toPrimitive](){return {}},valueOf(){return 1},toString(){return "2"}}
  //VM277:1 Uncaught TypeError: Cannot convert object to primitive value
      at <anonymous>:1:2
  "1"+{valueOf(){return },toString(){return "2"}}
  //1undefined
  "1"+{valueOf(){return {}},toString(){return "2"}}
  //"12"
  new Date().toJSON()
  ```

  toPrimitive是优先级最高的

    ```js
function convertStringToNumber(string){
    var chars = string.split('');
    var number = 0;
    for(var i =0; i<chars.length;i++){
        number = number * 10;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
     }
    return number;
}
convertStringToNumber('25')
    ```

```js
function convertStringToNumber(string,x){
    if(arguments.length < 2) x=10;
    var chars = string.split('');
    var number = 0;
    
    var i= 0;
    while(i<chars.length && chars[i] != '.'){
        number= number * x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0));
        i++;
    }
    if(chars[i] === '.')
        i++;
    var fraction = 1; 
    while(i<chars.length){
        fraction = fraction /x;
        number += (chars[i].codePointAt(0)- '0'.codePointAt(0))*fraction;
        i++;
    }
    return number;
}

function convertNumberToString(number,x){
    var integer = Math.floor(number);
    var fraction = number - integer;
    console.log(fraction);
    var string = '';
    while(integer > 0){
        string = String(integer % x) + string;
        integer = Math.floor(integer/x)
    }
    
    return string;
}
```



## 语句

### 简单语句



### 复合语句

#### block

#### Iteration

* while()

* do ... while();

* for(;;)

  ```js
  for (; i<10; i++){
      let i = 0;
      console.log(i);
  }
  for (let i = 0; i<10; i++){
      let i = 0;
      console.log(i);
  }
  ```

  

* for(in)

* for(of)  用在数组或者generator

  ```js
  function *g(){
      yield 0;
      yield 1;
      yield 4;
  }
  for(let p of g()){
      console.log(p)
  }
  ```

  #### 标签、循环、break、continue

  

  #### 声明

  ```js
  class{
      
  }
  var o = class {
      
  }
  ```

  ```js
  function* foo(){
      yield 1;
      yield2;
      
      var i = 3; 
      while(true)
          yield i++;
  }
  ```

  #### 

  ```js
  var x = 0;
  function foo(){
      var o ={x:1};
      x =2;
      with(o){
          x=3;
      }
      console.log(x);
  }
  foo();
  console.log(x);
  // js设计错误——with
  // 如何规避
  // var 变量一定要写在作用域前面
  ```

  #### 预处理

  #### 作用域

  #### object

  state  identifier behavior

  封装？  继承？  多态？



类是一种常见的描述对象的方式

而“归类”和“分类”则是两个主要的流派

对于 “归类”方法而言，多继承是很自然的事；如C++

而采用分类思想的，则是单继承结构，并且会有一个基类Object.



#### object in javascript



#### object API/Grammar

* {}.[] Object.defineProperty
* Object.create/Object.setPrototypeOf/Object.getPrototypeOf
* new /class/extends
* new/function/protype

#### Function Object

#### Special Object



对象在ecma-262-9.4章



