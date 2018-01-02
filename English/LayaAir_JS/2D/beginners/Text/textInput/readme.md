# Single  & multiline textInput 

The text input box is a UI component that is often used in game.  Lets have a look at the TextInput API class.

All API parameters in Laya.ui.textInput:

![1](img/1.png)</br>

Here we set single and multi line input for text. Single line input can only be entered in one line. Multiple lines can contain lines with carriage return before the last line is full.

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


operation result:

![2](img/2.png)</br>

By setting up our multiline to true, shown in  figure above, we will be able to achieve multiple lines of input. Other parameters and settings likes  fonts and styles of different sizes from Text text are basically the same.
