#TextInput Single Line Input & Multi Line Input

Text input box is a UI component that we often use in our games. Whenever we need input, we need to use textInput class. Let's first look at the API of TextInput class.

All API parameters in Laya.ui.textInput:

![image.png](http://ldc.layabox.com/uploadfile/image/20170222/1487736122132869.png)

Here we set up one-line input and multi-line input of text. One-line input can only be entered in one line, and multi-line input can be entered in the next line if the previous line is not full by return.


```java

package
 
{
  import laya.display.Stage;
  import laya.ui.TextInput;
  public class TextInput_Example
 
  {
 
  public function TextInput_Example()
 
  {

    Laya.init(640, 800);//设置游戏画布宽高、渲染模式。

    Laya.stage.bgColor = "#efefef";//设置画布的背景颜色。

    Text_InputSingleline ()
    Text_InputMultiline();
 
  }
   
  private function Text_InputSingleline():void 
  {
    var textInput:TextInput = new TextInput("单行输入");//创建一个 TextInput 类的实例对象 textInput 。
    textInput.wordWrap = true;//设置 textInput 的文本自动换行。
    textInput.fontSize = 30;//设置 textInput 的字体大小。
    textInput.x = 0;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
    textInput.y = 0;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
    textInput.width = 300;//设置 textInput 的宽度。
    textInput.height = 200;//设置 textInput 的高度。
    textInput.bgColor = "#c30c30";
    Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
  }
 
  private function Text_InputMultiline():void
  {
    var textInput:TextInput = new TextInput("多行输入");//创建一个 TextInput 类的实例对象 textInput 。
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
 
  }
 
}
```


Operation results:

![blob.png](http://ldc.layabox.com/uploadfile/image/20170308/1488957547692222.png)

By setting our multiline to open multi-line input for true, we can achieve the effect of our graph. Other parameters and text settings are basically the same. To set fonts and styles of different sizes as text settings, you can modify the parameter experience in the example above.