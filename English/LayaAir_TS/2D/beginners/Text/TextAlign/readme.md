# Text alignment & auto wrap

With alignment mode, with horizontal and vertical attributes, can let text be displayed in the center of the text area. Here  we can get  a first look at the parameters from API,  through the example code as introduce. API parameters for text styles are in laya.display.text :

![1](img/1.png)</br>

![2](img/2.png)</br>

![3](img/3.png)</br>

![4](img/4.png)</br>

Set the font style in the code, define text content in  text area, and then put it horizontally and vertically centered. Horizontal and vertical alignment settings of text will not work without setting up directly the text areas.

```typescript
class LayaSample {
    constructor() {
        //初始化引擎
        Laya.init(1136,640);

        var txt:Laya.Text = new Laya.Text();
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
    }
}
new LayaSample();
```

![5](img/5.png)</br>

In current code, according your need, please refer to the other alignment values of the API. Which one can be more suitable in your  project.

Whether text contents dimension over the textarea one, it may not displayed in the stage content. To handle this case, you can use  automatic line break to show your entire text.

API implementation:

![6](img/6.png)</br>

In following code, we will use wordwrap to deal newline case.

Set the width and height of the text area, otherwise  the text will wrap automatically according to the default text width. The code   looks like as follows:

```typescript
class LayaSample {
    constructor() {
        //初始化引擎
        Laya.init(1136,640);

        var txt:Laya.Text = new Laya.Text();
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
    }
}
new LayaSample();
```

![7](img/7.png)</br>

Here, you can see that our line set  automaticly break in this text area.