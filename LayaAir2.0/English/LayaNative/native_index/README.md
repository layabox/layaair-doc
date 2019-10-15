#LayaNative Home Page Description

LayaNative is not a browser! <br / >
LayaNative is not a browser! <br / >
LayaNative is not a browser!

Now LayaNative is started by loading index. JS or runtime. json, not by index. HTML in the project. LayaNative**Not browser-based**It does not run HTML content by encapsulating controls such as browsers or webkits.


##Description of the startup profile

LayaNative can choose to start through index. JS or runtime. json. These two documents mainly provide the following functions:

* Determine the JS files that need to be loaded when the project is running.
* Set up the horizontal and vertical screen.

The specific modification method is as follows:

**1. Use index. JS as the startup file**

* Use the loadLib function to determine the JS files that need to be loaded when the project is running.
* Modify the value of the window. screenOrientation variable to set the horizontal and vertical screens.

For example:


```javascript

window.screenOrientation = "landscape"; // 设置屏幕为横屏
loadLib("libs/matter.js");   // 启动时加载“libs/matter.js”文件
```



**Be careful:**Please don't write any logic code in the index. JS file, if you write it, you may have unknown errors.

**2. Use runtime.json as the startup file**

The project can also choose to use the runtime. JSON file as the startup file. JSON file format is easier to understand as a boot configuration file than index. js.

* "scripts": Used to determine the JS files that need to be loaded when the project is running.
* "Screen Orientation": Settings for horizontal and vertical screens.

For example, the following settings are set to load the "temp.js" file at startup, and the screen is set to a horizontal screen.


```json

{
	"scripts": ["temp.js"],
	"screenOrientation": "landscape"
}

```
