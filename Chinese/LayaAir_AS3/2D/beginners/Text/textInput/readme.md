# textInput的单行输入&多行输入

文本输入框是我们游戏中经常会用到的一个UI组件，任何时候我们需要输入的时候都要使用到textInput这个类，我们先看一下TextInput这个类的API。

Laya.ui.textInput中所有的API参数：

![image.png](http://ldc.layabox.com/uploadfile/image/20170222/1487736122132869.png)

这里我们设置文本的单行输入和多行输入，单行输入只能在一行内输入，多行可以通过回车在上一行未满的情况下在下一行输入。

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

运行结果：

![blob.png](http://ldc.layabox.com/uploadfile/image/20170308/1488957547692222.png)

通过设置我们的multiline为true开启多行输入，实现我们上图的效果。其他的参数和设置Text文本基本相同，想设置不同大小的字体和样式和Text的设置方法一样，大家可以修改上述示例中的参数体验。