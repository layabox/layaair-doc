# 文本对齐&自动换行

关于对齐模式方面，主要是常规的水平对齐与垂直对齐，可以让我们的文本在文本区域居中显示。下面我们先了解一下API的参数说明，再通过示例代码进行介绍。

Laya.display.text 中的关于文本样式的API参数：

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487148142169057.png)

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487148055385698.png)

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487147964328825.png)

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487148035942295.png)

​    给我们设置字体样式的代码中，先给这个文本设置一个文本区域，然后设置文本在文本区域水平居中和垂直居中。不设置文本区域的话直接设置文本的水平对齐和垂直对齐不会有效果。

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
   //设置文本区背景
   txt.bgColor = "#c30c30";
   //设置文本的宽高
   txt.width = 400;
   txt.height = 400;
   //设置文本水平居中
   txt.align = "center";
   //设置文本垂直居中
   txt.valign = "middle";
    
   Laya.stage.addChild(txt);
  }  
 }
}
```

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170308/1488956440111849.png)

在实际编码中如果需要其他的对齐模式，请参考API中的align 和valign的取值，找到适合项目的水平对齐模式和垂直对齐模式。

如果我们的文本内容超过了我们设置的文本区域，将不会显示超出舞台的内容，这个时候我们就需要使用自动换行来显示我们过长的文本。

API参数：

![image.png](http://old.ldc.layabox.com/uploadfile/image/20170215/1487149005360341.png)

在上面的代码中将txt的文本内容设置的多一些，然后添加自动换行的代码。

要设置好文本区域的宽和高，要不然文字会按照默认的text的宽进行自动换行。



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

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170308/1488956533469200.png)

这里我们就可以看到我们设置的自动换行已经实现，所有文本都在这个文本区域内显示。