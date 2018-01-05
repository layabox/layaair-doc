# Panel component reference

Panel is a panel container class with a clipping function that is often used to set up the display area of the element. The elements to be displayed can be added directly to the Panel container, and the width of the Panel is the width of the element which will display.

### A. Create Panel components through LayaAirIDE

**1.1 Drag and drop the Panel component to the page editing area**

Drag and drop the Panel component into the UI page from the UI folder in the right component panel of the IDE resource management. As shown by the dynamic graph 1:

![1](img\1.gif)</br>(Picture 1)

Set the Panel wide (for example: 100*100). Double click the Panel component in the UI interface and put a picture into it. The display effect and the hierarchical structure diagram are shown in Figure 2.

![2](img\2.png)</br>(Picture 2)

From Figure 2, it can be seen that the images that are placed are cut, and the width of the picture at the end of the picture is the width of the Panel container. In this way, we can adjust the coordinates of the picture to change the content of the display.


**1.2 Convert the display element directly to the Panel container**

In the UI interface to prepare a picture, select the picture press the shortcut key Ctrl + B into a Panel container. As shown in Figure 1-1:

![1-1](img\1-1.png)</br>(Picture 1-1)

When the click is determined, the Panel is set to a width of 100*100 (the picture will automatically turn to the Panel sublevel after the conversion). Display effect and hierarchical structure as shown in Figure 2

**1.3 Add scrollbar display**

Panel components can also set the scroll bar: **In addition to the list component, Panel is the only container component that can set the scroll bar**. Here we can set a scrollbar Panel look under the effect.

Set the scroll bar for Panel, as shown in Figure 3:

![3](img\3.png)</br>(figure 3)

Ctrl+F12 (or F12) export the UI interface, preload the resource in the code and instantiate the UI interface. The final display effect is shown as shown in Figure 4.

![4](img\4.gif)</br>(figure 4)



## 2. Create Panel components through code

In addition to the visual operations that can be visualized directly in the UI interface, the panel component is also simple to implement the above effect in the code.

The effect that is implemented in code is as shown in Figure 5:

![5](img\5.gif)</br>(figure 5)

**Sample code : **

```typescript
//初始化引擎
Laya.init(800, 600);
//预加载所需资源
Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(this, onLoaded));
function onLoaded() {
    //实例化Panel组件
    var panel = new Laya.Panel();
    //给panel添加背景色
    panel.graphics.drawRect(0, 0, 100, 100, "#ffcccc");
    //给panel设置宽高
    panel.size(100, 100);
    //给panel设置滚动条皮肤
    panel.vScrollBarSkin = "comp/vscroll.png";
    //将panel添加到stage上
    Laya.stage.addChild(panel);

    //实例化Image组件
    var img = new Laya.Image();
    //给image添加皮肤
    img.skin = "comp/image.png";
    //将image添加到panel组件中
    panel.addChild(img);
}
```

