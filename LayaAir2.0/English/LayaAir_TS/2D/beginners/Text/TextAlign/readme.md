# 文本对齐&自动换行

关于对齐模式方面，主要是常规的水平对齐与垂直对齐，可以让我们的文本在文本区域居中显示。下面我们先了解一下API的参数说明，再通过示例代码进行介绍。laya.display.text中关于文本样式的API参数：

![1](img/1.png)</br>

![2](img/2.png)</br>

![3](img/3.png)</br>

![4](img/4.png)</br>

给我们设置字体样式的代码中，先给这个文本设置一个文本区域，然后设置文本在文本区域水平居中和垂直居中。不设置文本区域的直接设置文本的水平对齐和垂直对齐将不会有效果。

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
}
new laya.HelloLayabox();
```

![5](img/5.png)</br>

在实际编码中如果需要其他的对齐模式，请参考API中的align和valign的取值，找到适合项目的水平对齐模式和垂直对齐模式。

如果文本内容超过了我们设置的文本区域，将不会显示超出舞台的内容，这个时候我们就需要使用自动换行来显示我们过长的文本。

API参数：

![6](img/6.png)</br>

在上面的代码中将txt的文本内容设置的多一些，然后添加自动换行的代码。

要设置好文本区域的宽和高，要不然文字会按照默认的text宽进行自动换行。代码如下所示：

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
}
new laya.HelloLayabox();
```

![7](img/7.png)</br>

到这里就可以看到我们设置的自动换行已经实现，所有文字都在这个文本区域内显示了。