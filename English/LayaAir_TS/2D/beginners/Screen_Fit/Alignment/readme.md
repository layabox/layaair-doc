# Align mode: Horizontal and vertical alignment

> Horizontal and vertical defined the main alignment mode. LayaAir engine can be convenient and set a quick configuration, below we first understand the API parameters description, and then through the example code to introduce.

The parameters are shown in Figure 1 and Figure 2:

​	![image.png](img/1.png)<br/>
​	Figure (1) Screen adaptation of the alignment mode



​	![blob.png](img/2.png)<br/>
​	Figure (2) Attributes in alignment mode



We demonstrate with horizontally centered and vertically centered Demo :

```typescript
module laya {
    import WebGL = Laya.WebGL;
    import Stage = Laya.Stage;
 
    export class smartScale {
        constructor()
        {
            //初始化舞台，不支持WebGL时会自动切换至Canvas
            Laya.init(200, 300, WebGL);
        
            //垂直居中对齐，另一种写法：Laya.stage.alignV = Stage.ALIGN_MIDDLE
            Laya.stage.alignV = "middle";
              
            //水平居中对齐，另一种写法：Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.alignH = "center";
  
            Laya.stage.bgColor = "#FF0000";
        }
 
    }
}
new laya.smartScale();
```

The running effect is shown in the following picture:

​	![blob.png](img/3.png)<br/>
​	Figure 3 shows the results of the operation



Other alignment patterns can modify the values in AlignH and AlignV, and experience different alignment patterns during actual encoding.
