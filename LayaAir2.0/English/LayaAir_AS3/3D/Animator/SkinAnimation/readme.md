# 骨骼动画的使用

###### *version :2.1.0beta   Update:2019-6-13*

​		骨骼动画又被叫做蒙皮动画，这种动画主要是以改变模型顶点的方式产生动画。骨骼动画也是我们使用的最多的一种动画了，像经常出现在示例中的猴子模型就是使用的骨骼动画。

我们就使用猴子模型来举例子。

首先来看下事先准备好的猴子模型，如图1所示：

![](img/1.png)<br>(图1)

然后我们创建一个动画控制器（命名：LayaMonkeyController），并且将Take 001动画添加上去。

![](img/2.png)<br>(图2)

给猴子模型添加Animator组件，并且将我们事先准备的动画控制器与网格添加到Animator上。同图3所示

![](img/3.png)<br>(图3)

在上面的事情准备好后，我们可以选择预览动画，确认没有问题我们就可以导出动画了。在这里我们选择整个场景一起的导出方式。选择导出选项中的场景选项，点击导出按钮导出场景。

![](img/4.png)<br>(图4)

关于导出面板更详细介绍，可以查看 **Unity插件使用** 篇。

> **在导出前需要注意：**

![](img/5.png)<br>(图4)

Animation Type 只支持 Generic 类型。

Optimize Game Objects 不能勾选

------

导出场景后我们加载来看下导出的动画效果。

```typescript
//加载我们导出的场景
Scene3D.load("res/LayaScene_LayaMonkey/Conventional/LayaMonkey.ls",Handler.create(this,function(s:Scene3D):void{
	Laya.stage.addChild(s);
}));
```

![](img/6.gif)<br>(图6)