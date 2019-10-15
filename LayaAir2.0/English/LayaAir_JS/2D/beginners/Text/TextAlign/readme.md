#Text Alignment-Automatic Line Breaking

As for alignment mode, it is mainly horizontal alignment and vertical alignment, which can make our text display in the middle of the text area. Next, let's look at the parameters of the API, and then introduce them through the sample code. API parameters for text style in laya. display. text:

![1](img/1.png)</br>

![2](img/2.png)</br>

![3](img/3.png)</br>

![4](img/4.png)</br>

In the code that sets the font style for us, we first set a text area for this text, and then set the text in the horizontal and vertical center of the text area. Setting text alignment horizontally and vertically without setting text areas will not work.


```javascript

//初始化引擎
Laya.init(1136,640);

var txt = new Laya.Text();
//设置文本内容
txt.text = "hello_world";
//设置文本区背景
txt.bgColor = "#c30c30";
//设置文本的宽高
txt.width = 400;
txt.height = 400;
//设置文本水平居中
txt.align = "center";
//设置文本垂直居中
txt.valign = "middle";
Laya.stage.addChild(txt);
```


![5](img/5.png)</br>

If other alignment modes are needed in actual coding, please refer to the align and valign values in API to find the horizontal alignment mode and vertical alignment mode suitable for the project.

If the text content exceeds the text area we set up, it will not show the content beyond the stage. At this time, we need to use automatic line breaking to display our overly long text.

API parameters:

![6](img/6.png)</br>

In the above code, set the text content of TXT a little more, and then add the code of automatic line breaking.

To set the width and height of the text area, otherwise the text will be automatically wrapped according to the default text width. The code is as follows:


```javascript

//初始化引擎
Laya.init(1136,640);

var txt = new Laya.Text();
//设置文本内容
txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
//设置文本区背景
txt.bgColor = "#c30c30";
//设置文本的宽高
txt.width = 400;
txt.height = 400;
//设置文本水平居中
txt.align = "center";
//设置文本垂直居中
txt.valign = "middle";
//设置自动换行
txt.wordWrap = true;
Laya.stage.addChild(txt);
```


![7](img/7.png)</br>

Here you can see that the automatic line break we set has been implemented, and all the text is displayed in this text area.