#First program: display text "Hello Layabox"


 **[Tips] Before reading this article, you must read two articles: Building Development Environment (TS Code Compiler) and Creating TS Project and Detailing Directory Structure.**



​**Step one**Select src, right-click, and left-click "New File" to create a HelloLayabox. TS file in the SRC directory. (Tips: HelloLayabox. TS must be created in the SRC directory before it can be compiled)

​![图片](img/1.png)<br/>

Then modify the compile. JS file in the. Laya directory and modify the startup class to HelloLayabox. TS

![图片](img/111.png)


​**Step two**Click HelloLayabox. ts in the SRC directory to start writing the following code:


```typescript

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色为白色，默认颜色为黑色
txt.color = "#ffffff";  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```


​

​**Step three**After encoding, compile according to F5. On the pop-up page, we can see the result of the code, as shown in the following figure:

​![图片](img/2.png)<br/>
Figure (2)



​**Step four**Close the display window after the display is successful. We continue to write code to make the text more beautiful. Continue to improve the code as follows:


```typescript

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色
txt.color = "#FF0000";
//设置文本字体大小，单位是像素
txt.fontSize    = 66;  
//设置字体描边
txt.stroke = 5;//描边为5像素
txt.strokeColor = "#FFFFFF";  
//设置为粗体
txt.bold = true;  
//设置文本的显示起点位置X,Y
txt.pos(60,100);  
//设置舞台背景色
Laya.stage.bgColor  = '#23238E';  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```




**Step five**After compiling, compile again according to F5, and the beautified results are shown as follows:

​	![图片](img/3.png)<br/>
Figure (3)

**So far, if you can follow this introductory tutorial, complete the display above, congratulations on your successful introduction, we have completed the first LayaAir engine HTML5 program developed in TypeScript language. For more information on how to use the API for LayaAir engine development, please visit the Layabox Developer Center for online API and engine examples.**

**For knowledge of TypeScript, please visit[https://www.tslang.cn/docs/home.html](https://www.tslang.cn/docs/home.html)Chinese website, this website should be saved, commonly used! Many problems can be solved by this method.**