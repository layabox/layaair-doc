# 设置文本基础样式

在我们的一些项目中，文本是会被经常的使用，免不了为这个文本设置字体大小，字体颜色，文本内容等。

我们先做一个最基本的Demo创建一个文本，给这个文本添加文本内容、设置字体颜色（背景默认为黑色，不修改颜色没有效果）。

laya.display.text中的关于文本样式的API参数：

![1](img/1.png)</br>

![2](img/2.png)</br>

```typescript
//初始化引擎
Laya.init(1136,640);

var txt = new Laya.Text();
//设置文本内容
txt.text = "hello_world";
//设置文本颜色
txt.color = "#ffffff";
Laya.stage.addChild(txt);
```

这个时候我们就可以看到txt已经添加到舞台上了，显示了txt中白色的hello_world。

接着我们给文本添加一些其他的字体样式，粗体、斜体、字体大小等。

![3](img/3.png)<br/>

![4](img/4.png)<br/>

```typescript
//初始化引擎
Laya.init(1136,640);

var txt = new Laya.Text();
//设置文本内容
txt.text = "hello_world";
//设置文本颜色
txt.color = "#ffffff";
//设置文本字体
txt.font = "Ya Hei";
//设置字体大小
txt.fontSize = 32;
//设置文本区背景
txt.bgColor = "#c30c30";
//设置文本框的颜色
txt.borderColor = "#23cfcf";
//设置粗体、斜体
txt.bold = true;
//设置斜体
txt.italic = true;
Laya.stage.addChild(txt);
```

![5](img/5.png)</br>

这里我们就可以看到字体样式、字体大小有明显的变化，文本框的最外围有一圈浅蓝色的边框，文本区的背景变为红色。有兴趣的话可以修改其中的数值，更深一步的理解这些属性的使用方法。