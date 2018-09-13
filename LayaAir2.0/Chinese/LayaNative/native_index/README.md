
# LayaNative首页说明

LayaNative不是浏览器！<br />
LayaNative不是浏览器！<br />
LayaNative不是浏览器！

现在LayaNative是通过加载index.js或者runtime.json来启动的，而不是通过项目里的index.html启动的。LayaNative**不是基于浏览器**的，不是通过封装浏览器或者webkit之类的控件来运行html的内容。


## 启动配置文件的说明

LayaNative可以选择通过index.js或是runtime.json启动。这两个文件主要提供以下的功能：

* 确定项目运行时需要加载的js文件。
* 对横竖屏进行设置。

具体的修改方式如下：

**1.使用index.js作为启动文件**

* 使用loadLib函数确定项目运行时需要加载的js文件。
* 修改window.screenOrientation变量的值，对横竖屏设置。

例如：

```javascript
window.screenOrientation = "landscape"; // 设置屏幕为横屏
loadLib("libs/matter.js");   // 启动时载入“libs/matter.js”文件
```


**注意：** 请不要在index.js文件里编写任何逻辑代码，如果编写可能会发生未知的错误。

**2.使用runtime.json作为启动文件**

项目也可以选择使用runtime.json文件作为启动文件。json文件格式作为启动的配置文件比index.js更容易理解。

* "scripts" : 用于确定项目运行时需要加载的js文件。
* "screenOrientation" : 对横竖屏设置。

例如，以下设置为启动时载入"F:/myLaya/temp.js"文件，屏幕设置为横屏

```json
{
	"scripts": ["F:/myLaya/temp.js"],
	"screenOrientation": "landscape"
}

```