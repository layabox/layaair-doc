# The first program: display “Hello Layabox”  text

 ** This is the first program tutorial with the LayaAir engine. Before you continue this article, be sure to read firstly: "TS code compiler" and "Create a TS project and detail the directory structure" explained **



​    **Step 1**：Select src right-click, then left-click “New File”, create a HelloLayabox.ts file in the src directory.（Tips：HelloLayabox.ts must be created in the src directory before it will be compiled）

​	![图片](img/1.png)<br/>
​	Picture（1）



​         **​ ​Step 2**：Click open HelloLayabox.ts src directory, began to write the following code:

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

​     **Step 3**：After encoding, press F5 to compile, in the page that pops up, we can see the running result of the code, as the following figure shows:

​	![图片](img/2.png)<br/>
​	Picture（2）



​        **Step 4**：After the display is successful, close the display window. We continue to write code to make the text look beautiful. Continue to improve the code is as follows:

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



**Step five**： After the writing is completed, it is compiled again by F5, and the result of the beautification is as shown in the following figure.
​	![图片](img/3.png)<br/>
​	Picture（3）

**At this point, if you can follow this introductory tutorial and finish the display above, congratulations on your successful entry, we have completed the first LayaAir engine HTML5 program developed in TypeScript language. More LayaAir engines are developing API use methods. Please go to the Layabox Developer Center of the official network to see the online API and engine examples.**