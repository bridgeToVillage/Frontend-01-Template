# 重学css|基本语法，css基础机制（二）（第8周）

### 优先级



练习

请写出下面选择器的优先级[行内， id， class， 标签]

* div#a.b .c[id=x]  0131
* #a:not(#b)   0200
* *.a  0010
* div.a  0011



### 伪类

* 树型

  需要回溯的不建议用，代码复杂，会增加layout次数

* 逻辑型

      * :not伪类
      * :where:has

### 伪元素

* ::before
* ::after
* ::first-letter
* ::first-line

思考题：





# 重学CSS | 排版与排版相关属性,绘制与绘制相关属性

### 行模型



### float

float现在基本不需要用来实现layout，一般用flex；它最开始其实是为了实现文字绕排的。





bdfc折叠  边距折叠

会发生在哪个方向



里面能容纳正常流，外边是正常流，如果overflow:visible，那就里外一样了  原话是这样？