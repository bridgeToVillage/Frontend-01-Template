



# 编程训练



## 异步编程

实现一个红绿灯问题

```js
//居然跟我的想法一样，看来我活在上古时代
var red; green; blue;
// 默认是绿灯
function light(){
    // todo绿
    setTimeOut(function(){
    // todo黄
    setTimeOut(function(){
        // todo红
        setTimeOut(light(),5000)
    },2000)
},10000)
}
```





#### 第一种写法-setTimeOut:

```js
<style>
    div {
        background-color:grey;
        display:inline-block;
        margin:30px;
        width:100px;
        height:100px;
        border-radius: 50px;;
    }
    .green.light {
        background-color:green;
    }
    .yellow.light {
        background-color:yellow;
    }
    .red.light {
        background-color:red;
    }
</style>

<div class="green"></div>
<div class="yellow"></div>
<div class="red"></div>

<script>
    function green(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("green")[0].classList.add('light')
    }
    function red(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("red")[0].classList.add('light')
    }
    function yellow(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("yellow")[0].classList.add('light')
    }

    function go(){
        green()
        setTimeout(function(){
            yellow()
            setTimeout(function(){
                red()
                setTimeout(function(){
                    go()
                }, 5000);
            }, 2000);
        }, 10000);
    }
</script>
```

下面是老师的写法，思路清晰，很优美。

但是，这种写法不是特别友好，只能通过无限递归实现。

#### 第二种写法：promise

思路其实是一样的，只是把嵌套递归变成了链式调用，这样读起来更容易理解了点。

```js
<style>
    div {
        background-color:grey;
        display:inline-block;
        margin:30px;
        width:100px;
        height:100px;
        border-radius: 50px;;
    }
    .green.light {
        background-color:green;
    }
    .yellow.light {
        background-color:yellow;
    }
    .red.light {
        background-color:red;
    }
</style>

<div class="green"></div>
<div class="yellow"></div>
<div class="red"></div>

<script>
    function green(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("green")[0].classList.add('light')
    }
    function red(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("red")[0].classList.add('light')
    }
    function yellow(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("yellow")[0].classList.add('light')
    }

    function sleep(t) {
        return new Promise((resolve, reject)=> {
            setTimeout(resolve, t);
        })
    }

    function go(){
        green()
        sleep(1000).then(() => {
            yellow();
            return sleep(200);
        }).then(() => {
            red();
            return sleep(500);
        }).then(go)
    }

</script>
```

#### 第三种写法：async await

通过async await把异步执行变成同步函数，这样代码更加简洁了。

```js
<style>
    div {
        background-color:grey;
        display:inline-block;
        margin:30px;
        width:100px;
        height:100px;
        border-radius: 50px;;
    }
    .green.light {
        background-color:green;
    }
    .yellow.light {
        background-color:yellow;
    }
    .red.light {
        background-color:red;
    }
</style>

<div class="green"></div>
<div class="yellow"></div>
<div class="red"></div>

<button id="next">next</button>

<script>
    function green(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("green")[0].classList.add('light')
    }
    function red(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("red")[0].classList.add('light')
    }
    function yellow(){
        var lights = document.getElementsByTagName("div");
        for(var i = 0; i < 3; i++)
            lights[i].classList.remove("light")
        document.getElementsByClassName("yellow")[0].classList.add('light')
    }

    function sleep(t) {
        return new Promise((resolve, reject)=> {
            setTimeout(resolve, t);
        })
    }

    function happen(element, eventName){
        return new Promise((resolve, reject)=> {
            element.addEventListener(eventName, resolve, {once:true});
        })
    }

    async function go(){
        while(true) {
            green();
            await happen(document.getElementById('next'), 'click');
            yellow();
            await happen(document.getElementById('next'), 'click');
            red();
            await happen(document.getElementById('next'), 'click');
        }
    }

</script>
```

这里增加一个需求，警察叔叔说，今天有点堵，我要手动控制，怎么实现呢？

比较简单，加个按钮，让他能点就行，需要注意的就是触发时，事件只用触发一次就行。上面的happen函数就是手动控制版本。

接下来是重难点了，打起精神！

#### 第四种写法 generator

## 寻路问题

分几步思路来

第一步，画一个100*100的宫格

怎么创建一个一万的数组并给它填上0？

老式写法：

var map = new Array(10001).join(0).split('').map(s=>Number(s));

新式写法：

var map = new Array(10000).fill(0)

嵌套铺满10000个格子

for(y){

​	for(x){}

}

每个格子是一个cell

第二步，实现画图功能

思路就是鼠标落上去，按下后开始画，就是改变格子颜色，这里考虑对对每个格子添加事件--mouseover，这里是mousedown之后开始画，但是有可能从画盘之外落下，所以监听mouseover，然后以mousedown的状态判断是否可以画。



第三步，添加橡皮擦功能

mousedown =>e.which === 3  => clear = true

第四步，添加存储画图功能

这里用到localStorage



动态规划，可以在dom树的diff算法里



画路径思路：

1、广度优先搜索  2、深度优先搜索



格子有三种状态：

1、白色，不知道是否可以走

2、紫色，可以走，但是不知道是否可以继续扩展

3、蓝色，可以走，而且还可以从它往外扩展







终点到start  记录过程

map中存的数据都是pre，而路径上的每个点都知道上一个点



最优路径，启发函数

带启发函数的叫a函数

