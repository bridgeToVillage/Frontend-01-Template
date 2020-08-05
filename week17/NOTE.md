# 工具链

前端发展到现在这一步，已经是逐渐壮大了，但是看了一圈之后，你会发现，所有的前端框架已经越来越接近了。包括vue、react、angular他们都有脚手架，安装套路差不多，也几乎是一样差不多的依赖。这就有了这篇文章的源起--支持前端发展到现在这种生态的原因是什么，到底是哪些工具发挥了重要作用？



![image-20200802173133605](E:\doc\学习资料\微信公众号\pic\image-20200802173133605.png)



现在要开发前端应用基本就是三大框架起步了，那有没有好奇，这三个框架为什么都会有脚手架，脚手架这个工具又是怎么制作出来的呢？

yeoman，这个就是今天的主角！如果creat-react-app、vuecli3之类的是generator(项目生成器，即脚手架)，那yeoman就是generator的generator。我们今天就尝试做一个脚手架工具。

来一步步实现吧！（本文假设你已经有npm环境）

## 一、安装yeoman环境

首先安装一个yeoman的脚手架yo，注意是全局安装

```node
npm install yo -g
```

## 二、创建项目generator-name

创建一个文件夹generator-name，注意名字格式要跟我这个保持一致，name可以随便改。创建好了以后进行npm init，初始化一下项目，可以根据需要修改项目配置信息。

### 安装yeoman-generator依赖

```node
npm install yeoman-generator
```

### 创建项目文件及内容

然后在项目里创建app、router两个文件夹，各文件夹里都加上index.js，然后修改下package.json文件，加上files配置，内容就是这个样子：

```js
{
  "name": "generator-jiang",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "files": [
    "app",
    "router"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "yeoman-generator": "^4.11.0"
  }
}

```

接下来在app.js文件里加上这些内容，这都是在yeoman官网上抄的：

```js
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor (args,opts){
        super(args,opts)

        this.option('babel')
    }

    method1() {
        this.log("method 1 just ran")
    }

    method2() {
        this.log("method 2 just ran")
    }
}
```

就是定义了一个导出的类。

### npm link

npm link 顾名思义，就是要创建一个npm依赖，我们平时用的依赖都放在了依赖包里，现在就是现场做个依赖包。npm link可以把本地项目与npm模块之间建立连接，可以进行包测试。前面我们创建了一个项目generator-name，现在在这个项目下运行 npm link就是把这个项目变成了一个全局的依赖。

```node
npm link
```

## 三、创建新项目并引用依赖

### 创建新项目

现在这个可以随便创建，就叫jiang-app吧。

```node
cd ..
mkdir jiang-app
```

### yo name

创建好了以后就进入文件夹，运行yo-jiang，这时候明白前面为什么要按规范起名字吧。前面创建的那个项目是这种格式“generator-name”，现在到这一步我运行yo name才能正常通过。

```node
cd jiang-app
yo jiang
```

这时候你会看见神奇的事情发生了，原本在generator-name项目中的代码，在这里执行了，而且没见到调用的函数。

![image-20200802185808523](E:\doc\学习资料\微信公众号\pic\image-20200802185808523.png)

### 原理 

yo jiang这个原理就是前面我创建的generator-jiang项目在执行npm link后被链接到全局npm包里，这里执行yo jiang就是yoman找名字叫jiang的generator并执行里面的输出代码。

## 四、创建prompt

prompt()是一个dom方法，可以提示用户进行输入对话框。不过这里要讲的跟这个dom方法不一样。下面这个复杂多了。

先把前面app里面的index.js文件内容修改下：

```js
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor (args,opts){
        super(args,opts)
		  this.argument("appname",{type:String,required:true})
        this.log(this.options.appname)
    }

    async prompting() {
        const answers = await this.prompt([
          {
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname // Default to current folder name
          },
          {
            type: "confirm",
            name: "cool",
            message: "Would you like to enable the Cool feature?"
          }
        ]);
    
        this.log("app name", answers.name);
        this.log("cool feature", answers.cool);
      }
}
```

再次执行yo jiang，会看到这样的对话框，现在做前端的是不是很熟悉？我们在用脚手架初始化项目时都会有这个。

![image-20200802221108418](E:\doc\学习资料\微信公众号\pic\image-20200802221108418.png)



