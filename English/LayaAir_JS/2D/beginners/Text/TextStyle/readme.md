# Set text style attributes

In some of our projects, the text will be used frequently, which is inevitably to set the font size, font color, text content, etc... 

Let's start with a basic demo  to create a text,  add text content and set the font color (background default color is black).

Laya.display.text set  text style with API parameters:

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

At this point, we can see that txt has been added to the stage, showing hello_world in white.

Now we add some other font styles to our text, such as bold, italic, and font size.

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

Here we can see the font style, the font size has obviously and other details changes.