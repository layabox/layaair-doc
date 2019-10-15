#Presupposition use

In project development, such a situation often occurs:

1. When setting up the project, art defines a series of standard font colors, font sizes, which are used in various UIs. One day, art suddenly said that to change the default font colors, font sizes, the hard-pressed UI producer would need to modify all the interfaces once, which would be very troublesome.**In view of this situation, it is easy to deal with it by using default property settings or presuppositions, and modifying only one place can affect the overall situation.**

2. Different interfaces will have the same module locally, and the same logic code.**Using Page Embedding + Runtime (Page Logic Class) is easy to deal with.**

3. Different interfaces have the same layout locally. We want to modify them once, and the same layout of multiple interfaces changes with each other.**Page nesting and presupposition are easy to deal with in this case.**

LayaAirIDE offers three solutions for similar needs:

**1. Resource default property settings**(Set default values for individual components, modify global validity)

**2. UI component preset**(Save the local UI layout as default, drag it into other pages, modify the default properties, and take effect globally)

**3. Page nesting**(Save the local UI as a page and drag it into other pages for reuse, plus runtime, and reuse logic)

Next, this article describes how these three presuppositions are used.

###Default Property Settings for Resources

1. Select a resource in the Resource Panel and double-click to open the Resource Properties Settings Panel, as shown in Motion 1:

![1](img\1.gif)(图1)


2. Preset component property values in the default global, as shown in the example, just set values directly to the properties.（**Note: There should be no spaces around the equals sign "="**) As shown in Figure 2:

![2](img\2.png)(Fig. 2)

The results are as follows:

![3](img\3.png)(Fig. 3)

If a place does not want to use default information, it can directly drag the default component onto the UI page and modify the corresponding property values in the property bar to override the default values.

**This mode feature: you can set nine palaces and picture types for components, you can set a font color, font size, and then drag it into multiple places to use.**

**Unlike other modes: only individual components can be preset, not elements of custom combinations can be preset with attribute values**



###II. UI Component Preset

1. For example, we need to create a custom Prite default component, which sets the attribute values of the elements to be made into the default component in the page. As shown in Figure 4:

![4](img\4.png) 


(Fig. 4)

2. Click on the Preserve Preset button on the right, save all components under the Sprite node as preset, change the name and click OK, as shown in Figure 5:

![图5](img/5.png) 


(Fig. 5)

click`确定`After saving, A. prefab prefab file is generated in the prefab. At the same time, the component color in the scene interface will change (this color represents that the component is a custom default component). As shown in Figure 6.

![6](img\6.png)(Fig. 6)

Preab's default files can be dragged in and used directly on different pages. If you want to modify the attribute values of the default components in an interface, you can also modify each default component individually on the UI interface. As shown in Figure 7.

![图7](img/7.png) 


(Fig. 7)

**This pattern feature: only the current node and the sub-node tree can be set as preset**

**Unlike other modes: you can modify attributes directly by double-clicking on the current page to a sublevel. And the component attributes of the default file are modified in each page, which will only be valid for itself and will not affect other default components.**



###3. Page nesting

In project development, sometimes there is a UI page that can be used in many places (without adding code). In LayaAirIDE, you can drag and drop one UI page directly to another. As shown in Figure 8:

![8](img\8.gif)(Fig. 8)

In Figure 8, we drag and drop the UI page directly into another UI page, which is called UI page nesting.

**This pattern feature allows you to set up more complex combinations of node components**

**Unlike other modes: you can't modify the properties of components on a page, you can only double-click into the UIView page to modify; once you modify, everything you use will change.**



**Concluding remarks:**

The common advantage of the three presuppositions is to reduce the operation of repeated modifications. If the default components (or pages) are used in different interfaces, the default components (or pages) can be modified directly, and the places used will change. Don't change it one by one.