#Textinput Single - Line Input & Multi - ranging input

La boîte de saisie de texte est un composant ui que nous utilisons souvent dans notre jeu et que nous utilisons le type textinput à tout moment.

Tous les paramètres API de laya.ui.textinput:

![image.png](http://ldc.layabox.com/uploadfile/image/20170222/1487736122132869.png)

Ici, nous réglons l 'entrée de texte en ligne unique et en ligne multiple, l' entrée en ligne unique ne pouvant être saisie qu 'à l' intérieur d 'une ligne, et la pluralité de lignes peut être saisie à la ligne suivante si la ligne précédente n' est pas remplie par le retour.


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


Résultats opérationnels:

![blob.png](http://ldc.layabox.com/uploadfile/image/20170308/1488957547692222.png)

L 'effet de la carte ci - dessus est obtenu en réglant notre multiline pour ouvrir des entrées multilignes pour true.Les autres paramètres sont sensiblement les mêmes que le texte text, et vous pouvez modifier l 'expérience paramétrique dans l' exemple ci - dessus si vous voulez définir des polices et des styles de différentes tailles et des réglages text.