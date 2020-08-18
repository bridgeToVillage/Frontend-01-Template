# 工具链|目录结构与初始化工具

### 在前面课程generator基础上进行扩展



#### 一、按照yeoman官方文档就可以搭建一个标准的generator框架

要注意几个点：

* package.json文件里的name值格式：generator-

* 文件夹结构

  ```js
  ├───package.json
  └───generators/
      ├───app/
      │   └───index.js
      └───router/
          └───index.js
  ```

* 扩展generator
* 重写构造函数
* 添加自己的函数
  * 这里添加依赖管理、文件拷贝（就是为了实现一个cli）