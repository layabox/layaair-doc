#textInputの1行入力&複数行入力

テキスト入力ボックスはゲームでよく使われるUIコンポーネントです。いつでも入力が必要な時はtextInputという種類に使います。まずTextInputという種類のAPIを見てみます。

laya.ui.textInputのすべてのAPIパラメータ：

![1](img/1.png)<br/>

ここではテキストの1行の入力と複数行の入力を設定します。1行の入力は1行だけで入力できます。複数行は前の行が満車でない場合は次の行に入力できます。


```typescript

module laya {
    import Input = Laya.Input;
    import Stage = Laya.Stage;
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

            this.createSingleInput();
            this.createMultiInput();
        }

       private createSingleInput(): void {
            var inputText: Input = new Input();

            inputText.size(350, 100);
            inputText.x = Laya.stage.width - inputText.width >> 1;
            inputText.y = (Laya.stage.height - inputText.height >> 1) - 100;

            // 移动端输入提示符
            inputText.prompt = "Type some word...";
 
            // 设置字体样式
            inputText.bold = true;
            inputText.bgColor = "#666666";
            inputText.color = "#ffffff";
            inputText.fontSize = 20;
            Laya.stage.addChild(inputText);
        }
        private createMultiInput(): void {
            var inputText: Input = new Input();

            // 移动端输入提示符
            inputText.prompt = "Type some word...";
            //多行输入
            inputText.multiline = true;
            inputText.wordWrap = true;

            inputText.size(350, 100);
            inputText.x = Laya.stage.width - inputText.width >> 1;
            inputText.y = (Laya.stage.height - inputText.height >> 1) +100;
            inputText.padding = [2, 2, 2, 2];

            inputText.bgColor = "#666666";
            inputText.color = "#ffffff";
            inputText.fontSize = 20;

            Laya.stage.addChild(inputText);
        }
    }
}
new laya.HelloLayabox();
```


実行結果:

![2](img/2.png)<br/>

