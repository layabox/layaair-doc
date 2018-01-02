# UI scene editor

​        Scene editor is the core work area of UI, animation and other content creation. As shown in Figure 1, we can select and place controls in the scene editor, combine containers and much more. When we select the components in the scene editor, you can also modify the component's position, rotation, zoom, size, and other properties in  the attribute setter.

​     	![图片1.png](img/1.png) <br />
​     	（Picture 1）



## 1. view introduction

#### 1.1 View operation

​        You can move and locate the views of the scene editor through the following operations:

​        1、hold `the right mouse`  button or hold down the `mouse wheel`, you can drag and drop moving view.

​         2、Shortcut `Ctrl + +`  or `mouse wheel forward`，can zoom the view.

​         3、shortcut `Ctrl + -` or mouse wheel backward, you can narrow the view.

　     4、the shortcut key `Ctrl + 0` can be restored to 100% of the original scale view.

​         In view operation, you can see the zoom scale  prompt in the lower right corner of the UI scene editor. The related operations are shown in Fig. 2.

![动图2](img/2.gif)  <br /> (Picture 2)



#### 1.2 Constraints for components

​        The component can see the constraint box (red line with nodes) in the mouse selection state. The rectangular area of the constraint box represents the size attribute of the component. Any node in the point can change the size of the component directly.

​         ![动图3](img/3.gif)<br/>（Picture 3） 

**Tips**： even if the control does not contain the image rendering component (such as Sprite), you can also set the size property for the control.



#### 1.3 multi-select node

​        In the scene editor, hold down the left mouse button and drag and drop, you can see a red line rectangular selection box, after the release of the mouse button, the frame of the same layer components will be selected. You can slide the mouse to change the area of the selection box before you release the mouse button. The operation effect is shown in Figure 4

![动图4](img/4.gif) <br /> （Picture 4）



#### 1.4  Arrange the nodes using the Align tool

​        The core function of the scene editor is to edit and arrange the visible elements in the scene in the  "what you see is what you get" way. We can also quickly configure the scene nodes through a series of alignment tools above the main window toolbar. 

​    ![图片5](img/5.png) <br>（Picture 5）

**Tips**：Refer to the `toolbar introduction` documentation for specific alignment tools.



## 2. Code view

　　Click the view switch button in the lower right corner of the `scene editor` to switch to the `code` ` view` mode, as shown in figure 6.  The code view shows the XML text configuration file for the scene page, and also edits and modifies the XML text file to modify, add and delete the page and the control.

![动图6](img/6.gif) <br /> (Picture 6)

