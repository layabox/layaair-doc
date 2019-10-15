#Textinput Single - Line Input & Multi - ranging input

La boîte de saisie de texte est un composant ui qui est souvent utilisé dans le jeu et qui est utilisé dans la catégorie textinput à tout moment.

Tous les paramètres API de laya.ui.textinput:

![1](img/1.png)< / BR >

Ici, nous réglons l 'entrée de texte en ligne unique et en ligne multiple, l' entrée en ligne unique ne pouvant être saisie qu 'à l' intérieur d 'une ligne, et la pluralité de lignes peut être saisie à la ligne suivante si la ligne précédente n' est pas remplie par le retour.


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


Résultats opérationnels:

![2](img/2.png)< / BR >

