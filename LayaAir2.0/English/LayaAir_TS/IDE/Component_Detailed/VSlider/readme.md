#VSlider Component Reference



##1. Understanding VSlider components

###1.1 Demonstration of the Role and Effect of VSlider

HSlider and VSlider components are subclasses of Slider components, which represent horizontal slider and vertical slider respectively. Users can select values by moving sliders between slider tracks. Usually used for player progress control, volume control, some UI value adjustment, etc.

VSlider components are arranged vertically. The slider track extends from top to bottom, and the label showing the value is located on the right side of the track and can be hidden.

​![图片0.gif](img/0.gif)<br/>
(Fig. 1)



###Skin Specification for 1.2 VSlider Components

The VSlider resource naming rule prefixes vsliser with a total of three default resources, which are slider resources.`vslider$bar.png`Progress bar resources`vslider$progress.png`And base map resources`vslider.png`。

There should be at least two resources, one base map resource and one slider resource. Otherwise, the sliding function cannot be realized. Without the progress bar resource component, no error will be reported, just no progress will be displayed.

Tips: progress bar resources`vslider$progress.png`Can be used with base map resources`vslider.png`Exchange, the progress after interchange can be displayed in reverse.

![图片0.png](img/1.png)<br/>
(Figure 2)



###Introduction to API of 1.3 VSlider Components

Refer to the API introduction of VSlider[http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.VSlider](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.VSlider)。



##2. Creating VSlider Components through LayaAirIDE

###1.1 Create VSlider

Click on the VSlider component resource in the Resource Panel and drag it into the page editing area to add the VSlider component to the page.

After dragging and dropping VSlider into the editor area, set the nine-grid property of sizeGrid so that it will not stretch after zooming in. The zooming effect is as follows:



​        ![图片2.png](img/2.png)<br/>
(Figure 2)

###1.2 Common attributes of VSlider components

VSlider components have the same attributes as HSlider components, but the direction of components has changed.

After setting the value of VSlider's attribute Max to 20, the value of attribute min to 0, and the value of attribute value to 5, the display effect is as follows:



​        ![图片3.png](img/3.png)<br/>
(Figure 3)

**Max:**The maximum value of the VSlider slider when dragged to the rightmost side is 100 by default.

**Min:**The minimum value of the VSlider slider when dragged to the leftmost side is 0 by default.

**Value:**The current value of the slider should be equal to max or min, or the value between them.

​![图片4.png](img/4.png)<br/>
(Figure 4)

When running a program, you can drag a slider to select a value:

​![图片0.gif](img/0.gif)<br/>
(Fig. 5)



###1.3 Making Volume Control Bar with VSlider

In game development or some other software, it is common to use VSlider to make volume controllers. But as shown in Figure 5, it's not the effect we need. The direction and size of the progress bar are all reversed. Normally, the maximum volume should be at the top, the minimum should be at the bottom, and the progress bar should be changed from bottom to top.

In fact, to achieve the normal effect is very simple, first of all, the max and min attributes can be set in reverse, for example, we set Max to 0, min to 20, and then the value value is set to the maximum 20 by default.



​        ![图片5.png](img/5.png)<br/>

(Fig. 6)

Next is the direction of the progress bar. Exchange the naming of the progress bar resource and the base map resource (Figure 7), refresh the IDE and publish it. After compiling and running, we can see that the direction of the progress bar is from bottom to top. It also achieves the volume controller effect we need.

​![图片7.png](img/6.png)<br/>
(Figure 7)

​![图片7.gif](img/7.gif)<br/>
(Figure 7)



###1.4 VSlider Component Special Other Properties

Other generic attributes are described in detail in the Property Setter. The following are special attributes related to HSlider components.

A kind of**attribute**A kind of**Function description**A kind of
| -------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AllowClickBack | A Boolean value that specifies whether the value attribute value is allowed to be changed by clicking on the slider. A kind of
| ShowLabel | A Boolean value that specifies whether a label that hides the value value above the slider is displayed. A kind of
| The tick | slider's scale value refers to the value change of the slider each time it is dragged. The default value is 1. A kind of


 
