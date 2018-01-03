# VScrollBar 组件参考



## 一、通过LayaAirIDE创建VScrollBar 组件

### 1.1 创建VScrollBar 

 

​        VScrollBar 组件是一个垂直方向滚动条组件。
​        当数据太多以至于显示区域无法容纳时，最终用户可以使用 VScrollBar 组件控制所显示的数据部分。
​        滚动条由四部分组成：一个轨道图、一个滑块按钮和两个箭头按钮。
​        点击选择资源面板里的 VScrollBar 组件，拖放到页面编辑区，即可添加 VScrollBar 组件到页面上。
​        VScrollBar 组件的脚本接口请参考 [VScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.VScrollBar)。
​        VScrollBar 组件的图像资源示例：

​        ![图片0.png](img/1.png)<br/>
​    （图1）

​        ![图片0.png](img/2.png)<br/>
​    （图2）
​        ![图片0.png](img/3.png)<br/>
​    （图3）

​        ![图片0.png](img/4.png)<br/>
​    （图4）

 

​        VScrollBar 拖放到编辑器区后，显示效果：

​        ![图片0.png](img/5.png)<br/>
​    （图5）

​        设置 VScrollBar 的属性 max 的值为 10、属性 min 的值为0、属性 value 的值为3后，显示效果如下：

​        ![图片0.png](img/6.png)<br/>
​    （图6）

​        在程序中运行时，可以拖动滑块或点击箭头按钮控制进度条的值：

​        ![图片0.gif](gif/1.gif)<br/>
​    （图7）

​        设置 VScrollBar 的属性 showButtons 的值为 false时的显示效果：

​        ![图片0.png](img/7.png)<br/>
​    （图8）

​        在程序里运行时的效果：

​        ![图片0.png](gif/1.gif)<br/>
​    （图9）

### 1.2 VScrollBar 组件常用属性

​        ![图片0.png](img/8.png)<br/>
​    （图10）

 

| **属性**            | **功能说明**                            |
| ----------------- | ----------------------------------- |
| skin              | 滚动条的图像资源地址。                         |
| sizeGrid          | 滚动条轨道图资源的有效缩放网格数据（九宫格数据）。           |
| value             | 表示当前滚动位置的数字。                        |
| min               | 表示最低滚动位置的数字。                        |
| max               | 表示最高滚动位置的数字。                        |
| scrollSize        | 表示按下滚动条轨道时页面滚动的增量。                  |
| mouseWheelEnable  | 一个布尔值，指定是否滑轮滚动，默认值为true。            |
| touchScrollEnable | 一个布尔值，指定是否开启触摸，默认值为true。            |
| autoHide          | 一个布尔值，指定是否自动隐藏滚动条(无需滚动时)，默认值为false。 |
| showButton        | 一个布尔值，指定是否显示向上、向下按钮，默认值为true。       |

 

 

##  二、通过代码创建VScrollBar组件 

​	在我们进行书写代码的时候，免不了通过代码控制UI，创建`UI_ScrollBar` 类，并通过代码设定VScrollBar 相关的属性。

**运行示例效果:**
​	![5](gif/3.gif)<br/>
​	(图11)通过代码创建VScrollBar 

​	VScrollBar 的其他属性也可以通过代码来设置，下述示例代码演示了如何通过代码创建的VScrollBar ，有兴趣的读者可以自己通过代码设置VScrollBar ，创建出符合自己需要的滚动条。

**示例代码：**

```javascript
var Stage = Laya.Stage;
var Text = Laya.Text;
var HScrollBar = Laya.HScrollBar;
var ScrollBar = Laya.ScrollBar;
var VScrollBar = Laya.VScrollBar;
var Handler = Laya.Handler;
var WebGL = Laya.WebGL;

/***垂直滚动条资源**/
this.skins = ["res/ui/vscroll.png",
    "res/ui/vscroll$bar.png",
    "res/ui/vscroll$down.png",
    "res/ui/vscroll$up.png"];

// 不支持WebGL时自动切换至Canvas
Laya.init(800, 600, WebGL);
//画布垂直居中对齐
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
//画布水平居中对齐
Laya.stage.alignH = Stage.ALIGN_CENTER;
//等比缩放
Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
//背景颜色
Laya.stage.bgColor = "#232628";
//加载资源
Laya.loader.load(this.skins, Handler.create(this, onSkinLoadComplete));
/***加载资源完成***/
function onSkinLoadComplete(e) {
    //创建垂直滚动条
    createVScroller();
}
/***创建水平滚动条***/
function createVScroller() {
    //实例化垂直滚动条
    this.vScrollBar = new VScrollBar();
    //加载皮肤资源（其他资源根据规范命名后，会自动加载）
    this.vScrollBar.skin = "res/ui/vscroll.png";
    //设置宽度
    this.vScrollBar.width = 400;
    //设置位置
    this.vScrollBar.pos(150, 170);
    //最低滚动位置数字
    this.vScrollBar.min = 0;
    //最高滚动位置数字
    this.vScrollBar.max = 100;
    //滚动变化事件回调
    this.vScrollBar.changeHandler = new Handler(this, onChange);
    //加载到舞台
    Laya.stage.addChild(this.vScrollBar);
    //创建提示信息
    createPromptText(this.vScrollBar)
}
/***创建提示信息***/
function createPromptText(scrollBar) {
    //实例化提示信息
    this.promptText = new Text();
    //提示框字体
    this.promptText.font = "黑体";
    //提示框字体大小
    this.promptText.fontSize = 26;
    //提示框字体颜色
    this.promptText.color = "#FFFFFF";
    //提示框初始文本
    this.promptText.text = "您的选择是： ";
    //加载到舞台
    Laya.stage.addChild(this.promptText);
    //设置提示框位置
    this.promptText.pos(scrollBar.x, scrollBar.y - 50);
}
/***滚动条位置变化回调***/
function onChange(value) {
    this.promptText.text = "滚动条的位置： value=" + value;
}
```

