# Set text style attributes

In some of our projects, the text will be used frequently, which is inevitably to set the font size, font color, text content, etc... 

Let's start with a basic demo  to create a text,  add text content and set the font color (background default color is black).

Laya.display.text set  text style with API parameters:

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487127187988736.png)

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487127220597758.png)

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487127321516833.png)

```java
package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  // Initialize engine
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
  txt.text = "hello_world";
  txt.color = "#ffffff";
   
  Laya.stage.addChild(txt);
  }  
  }
}
```

At this point, we can see that txt has been added to the stage, showing hello_world in white.

Now we add some other font styles to our text, such as bold, italic, and font size.

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487127744336222.png)

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487127760332130.png)

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487127830163998.png)

```java
package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  // Initialize engine
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
  // Set text content
  txt.text = "hello_world";
  //Set text color
  txt.color = "#ffffff";
  //Set text font
  txt.font = "Ya Hei";
  //Set font size
  txt.fontSize = 32;
  //Setting text area background
  txt.bgColor = "#c30c30";
  //Sets the color of the text box
  txt.borderColor = "#23cfcf";
  //Set bold and italic
  txt.bold = true;
  txt.italic = true;
   
   
  Laya.stage.addChild(txt);
  }  
  }
}
```

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487128553866671.png)

Here we can see the font style, the font size has obviously and other details changes.
