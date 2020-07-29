# 组件化|动画-手势
## 动画原理
touchEvent  与 mouseEvent不一样，没有x\y
而且允许多指触控
pointEvent与 touchEvent、mouseEvent不一样

要将touch与mouse进行统一抽象，

//tap
//pan- panstart panmove panend
//flick 速度较快，触碰后立即离开
//press - pressstart pressend

```js
start --end--> tap  //快速结束就是tap事件
start --0.5s--> press start  --end--> pressend  //放上去按了会就触发了pressstart
                     |移
                     |动10px
start ---移动10px---> pan start ---move--> pan ---end--> pan end  //放上去移动了就是pan
                                         |move
                                         |end且速度>? --> flick //移动速度超过
                                            
```

整个设计思路就是：监听、识别、分发



# 组件化|轮播组件的继续改造：生命周期
## 都别动，让我先理下课程脉络
### 1、第14周的轮播（carousel）
### 2、第15周的动画（animation）
### 3、第16周的手势动画（gesture）
### 4、上节课作业是要把gesture加到carousel里，但是我carousel没neng完
### 5、这节课是完善上一步内容
### 6、所以作业怎么交呢？上节课跟完就嗝屁了啊

、、、
### 最后习得一个大招---抄！
```
https://github.com/zhuanyongxigua/Frontend-01-Template/tree/master/week16/carouselAnimationGesture3
```

