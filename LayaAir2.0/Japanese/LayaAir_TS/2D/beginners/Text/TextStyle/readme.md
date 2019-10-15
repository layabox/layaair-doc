#テキストのベーススタイルを設定

私達のいくつかの項目では、テキストはよく使われます。このテキストのフォントサイズ、フォント色、テキストの内容などを設定することは避けられません。

まず基本的なDemoを作ってテキストを作成し、このテキストにテキストの内容を追加し、フォントの色を設定します。

laya.display.textにおけるテキストスタイルに関するAPIパラメータ：

![1](img/1.png)<br/>

![2](img/2.png)<br/>


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


この時、私たちはtxtがステージに追加されているのを見ることができます。txtの中に白いハローワールドが表示されます。

次に、テキストに他のフォントスタイル、太字、斜体、フォントサイズなどを追加します。

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


![5](img/5.png)<br/>

ここではフォントのスタイル、フォントのサイズが著しく変化し、テキストボックスの一番外側に明るい青色の枠があり、テキストエリアの背景が赤色になります。興味があれば、その中の数値を修正して、これらの属性の使い方をより深く理解することができます。