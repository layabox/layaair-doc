#textInputの1行入力&複数行入力

テキスト入力ボックスはゲームでよく使われるUIコンポーネントです。いつでも入力が必要な時はtextInputという種類に使います。まずTextInputという種類のAPIを見てみます。

laya.ui.textInputのすべてのAPIパラメータ：

![1](img/1.png)<br/>

ここではテキストの1行の入力と複数行の入力を設定します。1行の入力は1行だけで入力できます。複数行は前の行が満車でない場合は次の行に入力できます。


```javascript

//初始化引擎,不支持WebGL时自动切换到Canvas
Laya.init(640,800,Laya.WebGL);
//设置画布的背景颜色
Laya.stage.bgColor = "#efefef";
Text_InputSingleline();
Text_InputMultiline();

function Text_InputSingleline(){
    var textInput = new Laya.TextInput("单行输入");//创建一个 TextInput 类的实例对象 textInput 。
    textInput.wordWrap = true;//设置 textInput 的文本自动换行。
    textInput.fontSize = 30;//设置 textInput 的字体大小。
    textInput.x = 0;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
    textInput.y = 0;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
    textInput.width = 300;//设置 textInput 的宽度。
    textInput.height = 200;//设置 textInput 的高度。
    textInput.bgColor = "#c30c30";
    Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
}
function Text_InputMultiline(){
    var textInput = new Laya.TextInput("多行输入");//创建一个 TextInput 类的实例对象 textInput 。
    textInput.fontSize = 30;//设置 textInput 的字体大小。
    textInput.wordWrap = true;//设置 textInput 的文本自动换行。
    textInput.multiline = true;//设置textInput的多行输入
    textInput.x = 0;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
    textInput.y = 300//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
    textInput.width = 300;//设置 textInput 的宽度。
    textInput.height = 200;//设置 textInput 的高度。
    textInput.bgColor = "#c30c30";
    Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
}
```


実行結果:

![2](img/2.png)<br/>

multiilineを設定することにより、trueのために複数行の入力を開始し、私達の上図の効果を実現します。他のパラメータとTextテキストを設定するのは基本的に同じです。フォントのサイズやスタイル、Textの設定方法と同様に、上記の例のパラメータ体験を変更することができます。