#Setting Text Foundation Styles

In some of our projects, text is often used. It is unavoidable to set font size, font color, text content, etc. for this text.

Let's first make a basic Demo to create a text, add text content to the text, set font color (the default background is black, no color changes have no effect).

API parameters for text style in laya. display. text:

![1](img/1.png)</br>

![2](img/2.png)</br>


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;

export class HelloLayabox {
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";

            var txt: Text = new Text();
            //给文本的text属性赋值
            txt.text = "hello_world";
            txt.color = "#ffffff";
            Laya.stage.addChild(txt);
        }
    }
}

new laya.HelloLayabox();
```


At this point we can see that TXT has been added to the stage, showing the white hello_world in txt.

Then we add some other font styles to the text, such as bold, italic, font size, etc.

![3](img/3.png)<br/>

![4](img/4.png)<br/>


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;
    export class HelloLayabox {
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
 
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            
            var txt:Laya.Text = new Laya.Text();
            //设置文本内容
            txt.text = "hello_world";
            //设置文本颜色
            txt.color = "#ffffff";
            //设置文本字体
            txt.font = "Ya Hei";
            //设置字体大小
            txt.fontSize = 32;
            //设置文本取背景
            txt.bgColor = "#c30c30";
            //设置文本框的颜色
            txt.borderColor = "#23cfcf";
            //设置粗体、斜体
            txt.bold = true;
            //设置斜体
            txt.italic = true;
            Laya.stage.addChild(txt);            
        }
    }
}
new laya.HelloLayabox();
```


![5](img/5.png)</br>

Here we can see that the font style, font size has changed significantly. There is a circle of light blue border around the text box, and the background of the text area becomes red. If you are interested, you can modify the values and understand how these attributes are used.