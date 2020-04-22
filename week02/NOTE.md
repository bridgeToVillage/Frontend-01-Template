# 前端进阶之路第2周学习总结

## 重学js|编程语言通识与js语言设计

### 编程语言通识

#### 一、语言按语法分类

#####  * 非形式语言

中文、英文

##### * 形式语言（乔姆斯基谱系）

* 0型 无限制文法
* 1型 上下文相关文法
* 2型 上下文无关文法
* 3型 正则文法

#### 二、产生式（BNF）

* 用尖括号括起来的名称来表示语言
* 语法结构分成基础结构和需要用
      * 基础结构称终结符
      * 复合结构称非终结符
* 引号



案例：定义一个加法

```bnf
<Number> = "0" | "1" | "2" | ..... | "9"

```

##### 四则运算



#### 形式化语言都可以用BNF表示

##### 学习bnf可以帮助学习其他语言



## 重学js|词法，类型

### unicode



1、如何获取所有字符

2、如何将汉字用\u转义表达，如何取得汉字code值  “厉害".codePointAt(1).toString(16)



3、InputElement

​          WhiteSpace

​               TAB  VT  FF  SP  NBSP  ZWNBSP  USP

​          LineTerminator

​          Comment

​          Token

​            Punctuator

​            IdentifierName

​               Keywords

​              Identifier

​               Future reserved Keywords:enum

​             L



http://www.fileformat.info/info/unicode/block/basic_latin/list.htm

说实话，这个网址都不知道怎么进来的：

http://www.fileformat.info/info/unicode/category/Zs/list.htm

tab字符"\t"  制表符，制表比较方便;

vt字符"\v" 纵向tab

ff字符

sp普通空格

nbsp，不是一般空格，用来排版的，用tab作缩进

比如是java与script中间加上一个& nbsp ;就能将前后者当作一个词，在遇到换行时就不会断开。 

ZWNBSP零宽空格，还有一个名叫BOM  bit order mask

淘宝 所有的js代码前都有一个空行

有些服务器第个字符按bom解析，所以有这个最佳实践规则



ascll

bmp是个啥东西？

emoji



#### Token

​            Punctuator

​            IdentifierName

​               Keywords

​               Identifier

​               Future reserved Keywords:enum

​             Literal

 IdentifierName一定以大小写字母开头？

IdentifierStart:

​     UnicodeIDStart

​     $

​     _

​     \ UnicodeEscapeSequence

#### 实例

1、get 在有些时候有关键字作用，但是可以将其用作变量名；

```js
2、document.body.setAttribute("class","a")
document.body.className   //需要这样获取样式
```

3、undefined是一个全局变量；在全局上无法改变，只能在局部作用域修改，像这样：

```js
void function (){
    var undefined = 3; 
    console.log(undefined);
}()
//3
```



学员案例

1.3+1.1-2.4

1.3+1.1-2.4 <= Number.EPSILON

Number.EPSILON



## 七大类型

Undefined；Null；Boolean；String；Number；Symbol；Object



"97 .toString()"

“\x10”

template

## 正则

余盛的书



.js文件如果是用gbk2312编码保存的，浏览器会将编码转换成unicode然后再做词法语法分析吗？浏览器对文件格式是怎么检查的，这块可以详细描述一下吗？







