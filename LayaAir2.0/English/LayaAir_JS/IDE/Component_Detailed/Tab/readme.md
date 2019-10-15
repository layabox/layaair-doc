#Tab Component Details

> Since many component attributes are generic, common and generic component attributes are`属性设置器`This is described in the document. Read the Property Setter document before reading this article.

##1. Understanding Tab components

###1.1 Role of Tab Components

Tab components are used to define tab button groups, such as multi-page switching display. As shown in Figure 1.

![动图1](img/1.gif)<br/>（动图1）



###1.2 Skin Specification for Tab Components

The skin of the Tab component is`tab`Or to`tab_`Name the prefix. For skin design specifications, it is a bimorph or trimorph graph with vertical equivalence, as shown in Figure 2.

![图2](img/2.png)<br/> (Figure 2) Trimorphic Tab Skin

*Tips: The skin of the Tab component can't use the Nine-palace property, so it's important to determine the actual application size when designing the resource.*

###1.3 Introduction to API of Tab Component

For an introduction to the API of Tab components, please refer to[http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Tab](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Tab)



##2. Creating Tab Components through LayaAirIDE

###2.1 Create Tab


Click Selection`资源管理器`The Tab component resource in the page is dragged to the scene editor, which successfully creates a Tab component in the page. As shown in Figure 3.

​![动图3](img/3.gif)<br/> (Motion 3)



###2.2 Add labels through labels

As shown in Figure 3, there are only two tags in the default Tab component. If you want to add a label, you just need to add a new label in the labels attribute. Modifying the text content of the labels is also set in the attribute. The operation is shown in Figure 4-1.

![动图4-1](img/4-1.gif)<br/> (Motion 4-1)



###2.3 Change Tab Component Layout Direction and Spacing

Tab components default to horizontal layout (* horizontal *), by changing the direction attribute, achieve vertical layout (* vertical *).**Setting distance**It can be implemented through the space attribute. As shown in Figure 4-2.
![动图4-2](img/4-2.gif) 

(Motion 4-2)

###2.4 Set default options for radio box group Tab

The selectedIndex property is used to change the index value of the Tab component. When the default is not set, no option is selected. If you want to set the default label option of the Tab component, you can set the attribute value of selectedIndex, 0 is the first label, 1 is the second label... And so on. The operation effect is shown in Figure 4-3.

![动图4-3](img/4-3.gif) 

(Motion 4-3)



##3. Custom Tab Components

In the previous example, we used the same Tab resource to generate three Tab components by setting labels. However, in the actual game, there are different requirements for Tag style in the same Tab component, so the way of setting up labels can not achieve the effect. At this time, we need to use the way of custom Tab component. For example, the effect shown in Figure 5.

​![图片5.gif](img/5.gif)<br/> (Fig. 5)



###3.1 Preparing Art Resources

Next, we use three different two-state art resources to customize the Tab component. The image resources are shown in Figure 6.



 ![图片5.png](img/6.png)<br/> (Fig. 6)

**Tips**:

Special attention should be paid to the naming rules of pictures. In custom Tab components, we use a combination of button components, which can not be used directly.`Tab`Naming rules for components. have access to`Button`Component,`CheckBox`Component,`Radio`Naming rules for components. The BTN prefix used in Figure 6 is the naming rule for Button components.

​

###3.2 Make buttons in IDE

Copy the resource to the resource manager folder of the project, then drag and drop the Button component from the resource manager to the scene editor one by one in the IDE. Modify the name attribute of each Radio component from left to right in order to "item0, item1, item2...". (If the name attribute is not added according to this rule, the generated Tab component is invalid and cannot be corrected. Frequent operation. In addition, since resources are bimorphic, the stateNum attribute value needs to be set to 2. When the text of the label attribute is set, the effect is shown in Figure 7.

![图片6.png](img/7.png)<br/> (Figure 7)



###3.3 Converted to Tab Container Component

After adjusting the properties, select all three button components and press the shortcut key.`Ctrl+B`Choice`Tab`Container components, Click`确定`Complete the transformation (Figure 8).

​![图片7.png](img/8.png)<br/> (Figure 8)



After successful conversion, adjust the default index selectedIndex to 0 (the first Tab tag), the space between radio boxes to 4, and the direction can be set horizontally or not, as shown in Figure 9.

​![图片8.png](img/9.png)<br/> (Figure 9)

From the above steps, we can see that the custom Tab component has been successfully made. By default, the first check box is selected and switched to its third frame selection state, while the other check boxes are the first frame unselected state.





