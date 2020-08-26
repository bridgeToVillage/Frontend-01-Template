# 做一个发布系统

### 1、找到Node地址，安装phantomjs

 安装很简单  
 在windows下
 cmd where node
 找到node安装地址；
 把phantomjs的bin文件夹下的exe放到node目录下就可以了。

 此时执行 phantomjs
 就会看到它的执行环境启动了，就像node 一样。


 ### 2、用前面的项目跑一个测试

 phantomjs可以用来持续集成测试 冒烟测试
