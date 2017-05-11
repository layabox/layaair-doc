# Button 组件详解

## 1、创建Button组件

　　按钮（Button）组件是最常用的组件之一，可以显示文本标签、图标或者两者同时显示。在LayaAirIDE里的按钮图片资源（按钮皮肤）命名通常是以btn为前缀，如图1所示。

![图1](img/1.png) （图1）

### 1.1用引擎直接创建Button组件

使用LayaAir引擎创建一个Button组件比较简单，通常只需要几个步骤，加载资源，创建一个Button实例，将Button添加到舞台，设置Button组件的属性。具体实现参考下面的代码与注释。

**创建一个入口类GameMain.js，编写如下代码：**

```javascript
//初始化引擎，设置宽高并开启WebGL渲染模式
Laya.init(600, 400,Laya.WebGL);
//设置舞台背景颜色
Laya.stage.bgColor = "#ffffff";
//按钮资源路径
var skin = "./res/img/btn_test.png";
//加载资源成功后，执行onLoaded回调方法
Laya.loader.load(skin,Laya.Handler.create(this,onLoaded));
function onLoaded(){
    //创建一个Button实例
    var btn = new Laya.Button(skin);
    //将Button添加到舞台上
    Laya.stage.addChild(btn);
    //设置Button相关属性
    btn.width = 100;
    btn.height = 50;
    btn.pos(100,100);
    btn.label = "按钮";
}
```

上述代码运行效果如动图2所示：

![动图2](img/2.gif) <br/> (动图2)

**Tips:** Button 组件的属性接口介绍请参考 [Button API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Button)。



### 1.2.使用LayaAirIDE创建Button

使用LayaAirIDE创建Button更加简单，通过IDE的可视化操作，完全不需要程序基础，即可实现组件的创建与布局，也是推荐使用的组件创建方式。下面我们用LayaAirIDE创建一个动图1实现的效果。

第一步：创建一个ui的DEMO页，在资源管理器中拖入一个按钮组件资源到场景编辑器，如图3所示。

![图3](img/3.png) <br />(图3)

第二步：设置组件属性，如图3所示

![图3](img/4.png) <br />(图4)

设置完上面的两步后，直接就可以在IDE中看到如动图2的效果。在这个过程不需要任何程序编码，完全可以交给美术或策划实现。从而减少了与程序员的沟通成本，加快了游戏的开发效率。



## 2、Button组件的属性介绍

下面的文档，将围绕Button组件的基础常用属性以及通过文字难以理解的属性给予重点介绍。而对比较容易理解的属性，本文将不会提及，开发者可以将鼠标放到IDE属性管理器的属性名上停留，将会出现属性的Tips中文说明。

### 2.1 按钮皮肤（skin）

　　按钮的皮肤因切割方式不同，分成三态，两态、单态。这里的态指的是按钮皮肤（skin）的状态。

　　三态是将皮肤图片按竖直方向以等比分割的形式分为3部分，如图1所示，**从上至下**依次为`弹起或离开状态`皮肤、 `经过状态`皮肤、 `按下和选中`（*保持按下*）状态皮肤，三态常用于PC浏览器中。

　　在移动设备上，通常只采用两态，图片以竖直方向被等比切割为两部分，上面的部分为`弹起或离开状态状态`皮肤，下面的部分为 `经过和按下以及选中状态`（*保持按下*）皮肤。

　　单态按钮不切割图片，无论什么状态，按钮的皮肤只有一种，保持不变。

### 2.2 指定按钮皮肤的切割状态（stateNum）

　　stateNum的属性值决定皮肤资源图片的切割方式。默认值为3，也就是说默认按3态按钮进行切割，等比分割为3部分。如果是两态按钮，需要将stateNum的属性值设为2，等比切割为2部分。单态按钮设置为1，不进行切割。

　　这里需要注意的是，指定按钮状态，需要与按钮皮肤对应好。如果是三态的按钮皮肤，stateNum设置为2，切割后如图5所示，是错误的。

![图5](img/5.png) <br />(图5)



### 2.3 指定按钮选中状态(selected)

　　selected属性默认为未选中的flase状态。一旦我们将selected属性设置为true。那按钮将会一直保持选中（持续按下）的状态，而不会再对其它状态产生变化（除非代码中进行状态改变）。

### 2.4 是否切换按钮的显示状态（toggle）

　　toggle属性默认为未选中的flase状态。一旦我们将toggle属性设置为true。当点击按钮组件后，按钮会保持在选中（持续按下）状态。再次点击可以还原。

### 2.5 根据状态设置Button的描边文本颜色（StrokeColor）

　　labelStrokeColor可以为Button的文本描边设置一个统一的颜色（不同状态的颜色一致）。而StrokeColor属性可以根据不同的状态设置Button的描边文本颜色。

　　StrokeColor颜色的先后设置顺序为格式: upColor（弹起或离开状态状态的颜色）,overColor（经过状态的颜色）,downColor（按下和选中状态的颜色）,disableColor（被禁止使用时的颜色）。如图6所示。

![图6](img/6.png) <br />(图6)

*Tips:如果想要更清晰的感受描边颜色的变化，可以将描边宽度labelStroke属性值设置大一些。*











