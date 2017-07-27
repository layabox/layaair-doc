# 对齐模式：水平对齐与垂直对齐

> 关于对齐模式方面，主要是常规的水平对齐与垂直对齐。LayaAir引擎可以方便快捷的配置，下面我们先了解一下API的参数说明，再通过示例代码进行介绍。
>

参数说明如图1、图2所示：

​	![image.png](img/1.png)<br/>
​	图（1）屏幕适配的对齐模式



​	![blob.png](img/2.png)<br/>
​	图（2）对齐模式中的属性



我们用水平居中和垂直居中的Demo 进行演示：

```javascript
(function()
{
    var Stage = Laya.Stage;
    var WebGL  = Laya.WebGL;
  
    (function()
    {
            //初始化舞台，不支持WebGL时会自动切换至Canvas
            Laya.init(200, 300, WebGL);
        
            //垂直居中对齐，另一种写法：Laya.stage.alignV = Stage.ALIGN_MIDDLE
            Laya.stage.alignV = "middle";
              
            //水平居中对齐，另一种写法：Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.alignH = "center";
  
            Laya.stage.bgColor = "#FF0000";
    })();
})();
```

运行效果如图3所示：

​	![blob.png](img/3.png)<br/>
​	图（3）示例的运行结果

其他的对齐模式可以去修改AlignH和AlignV之中的值，在实际编码的过程中体验不同的对齐模式。