#Setting Text Foundation Styles

In some of our projects, text is often used. It is unavoidable to set font size, font color, text content, etc. for this text.

Let's first make a basic demo to create a text, add text content to the text, set font color (background default is black, no color changes have no effect).

API parameters about text styles in laya.display.text:

![1.png](img/1.png)

![2.png](img/2.png)


```java

package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  //初始化引擎
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
  txt.text = "hello_world";
  txt.color = "#ffffff";
   
  Laya.stage.addChild(txt);
  }  
  }
}
```


At this point we can see that TXT has been added to the stage, showing the white hello_world in txt.

Then we add some other font styles to our text, such as bold, italic, font size, etc.

![3](img/3.png) 



![3](img/4.png) 








```java

package {
  import laya.display.Text;
  public class LayaSample {
   
  public function LayaSample() {
  //初始化引擎
  Laya.init(1136, 640);
   
  var  txt:Text = new Text();
  //设置文本内容
  txt.text = "hello_world";
  //设置文本颜色
  txt.color = "#ffffff";
  //设置文本字体
  txt.font = "Ya Hei";
  //设置字体大小
  txt.fontSize = 32;
  //设置文本区背景
  txt.bgColor = "#c30c30";
  //设置文本框的颜色
  txt.borderColor = "#23cfcf";
  //设置粗体、斜体
  txt.bold = true;
  txt.italic = true;
   
   
  Laya.stage.addChild(txt);
  }  
  }
}
```


![5](img/5.png)

Here we can see that the font style and font size have obvious changes. Another light blue border is around the outermost part of the text box, and the background of the text area turns red. Interested values can be modified to further understand the use of these attributes.