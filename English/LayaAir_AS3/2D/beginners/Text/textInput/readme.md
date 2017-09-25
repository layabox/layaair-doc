# Single  & multiline textInput 

The text input box is a UI component that is often used in game.  Lets have a look at the TextInput API class.

All API parameters in Laya.ui.textInput:

![image.png](http://ldc.layabox.com/uploadfile/image/20170222/1487736122132869.png)

Here we set single and multi line input for text. Single line input can only be entered in one line. Multiple lines can contain lines with carriage return before the last line is full.

```java
package
 
{
  import laya.display.Stage;
  import laya.ui.TextInput;
  public class TextInput_Example
 
  {
 
  public function TextInput_Example()
 
  {

    Laya.init(640, 800);//Set the game canvas width high, render mode.

    Laya.stage.bgColor = "#efefef";//Set the background color of the canvas.

    Text_InputSingleline ()
    Text_InputMultiline();
 
  }
   
  private function Text_InputSingleline():void 
  {
    var textInput:TextInput = new TextInput("单行输入");//Creates a textInput instance object of the TextInput class.
    textInput.wordWrap = true;//Set the textInput text to wrap.
    textInput.fontSize = 30;//Sets the font size of the textInput.
    textInput.x = 0;//Sets the value of the property X of the textInput object to control the display position of the textInput object.
    textInput.y = 0;//Sets the value of the property y of the textInput object to control the display position of the textInput object.
    textInput.width = 300;//Set the width of the textInput.
    textInput.height = 200;//Set the height of the textInput.
    textInput.bgColor = "#c30c30";
    Laya.stage.addChild(textInput);//Add textInput to display list.
  }
 
  private function Text_InputMultiline():void
  {
    var textInput:TextInput = new TextInput("多行输入");//Creates a textInput instance object of the TextInput class.
    textInput.fontSize = 30;//Sets the font size of the textInput.
    textInput.wordWrap = true;//Set the textInput text to wrap.
    textInput.multiline = true;//Sets the multiline input for textInput
    textInput.x = 0;//Sets the value of the property X of the textInput object to control the display position of the textInput object.
    textInput.y = 300//Sets the value of the property y of the textInput object to control the display position of the textInput object.
    textInput.width = 300;//Set the width of the textInput..
    textInput.height = 200;//Set the height of the textInput.
    textInput.bgColor = "#c30c30";
    Laya.stage.addChild(textInput);//Add textInput to display list.
  }
 
  }
 
}
```

operation result:

![blob.png](http://ldc.layabox.com/uploadfile/image/20170308/1488957547692222.png)

By setting up our multiline to true, shown in  figure above, we will be able to achieve multiple lines of input. Other parameters and settings likes  fonts and styles of different sizes from Text text are basically the same.
