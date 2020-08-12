# 测试



## 单元测试

### mocha
### nyc
比mocha更重要

单元测试更适合组件级别以上的测试

测试报告要尽量通过
coverage要尽量高

一般看行覆盖率

#### 一、安装mocha环境
```node
npm install --global mocha
// 本地依赖
npm install --save-dev mocha
```
#### 二、项目创建、初始化
```node
npm init 
mkdir test
mkdir src
```
在src添加一个代码块add.js，我们后面来测试这块内容



在test文件夹添加测试脚本add.test.js，



#### 三、项目配置
package.json文件里的directories配置修改如下
```json
"directories": {
    "test": "test"
  },
```
#### 四、运行项目
```node
npm run test
```
如图所示，可以看到项目运行还比较顺利。

#### 五、导出改为export
如果要把node环境的导出改成js的更高级环境-浏览器的export，需要做几步操作
##### 1、将node升级到最高版本，即current版本，直接下载安装

##### 2、将执行代码修改为export


##### 3、在配置文件package.json根节点添加配置
```json
  "type":"module",
```
这个时候运行npm run test 是会报错的，因为我们的测试脚本还不对。用的是require，应该是import;

#### 4、模块引用修改为import
