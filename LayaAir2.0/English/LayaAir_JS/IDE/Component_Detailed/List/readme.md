#List Component Reference



##1. Creating List Components through LayaAirIDE

The List component displays a list of items. The default is a vertical list. You can customize the list through the UI editor. Each list in a List list is usually the same, or you can customize different types of list content items using an editor.
Lists usually consist of two parts: list rendering items (cells) and scrollbars.
Refer to the script interface for List components[List API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.List)。



 



###1.1 Create List Components

####1. Edit list items.

List items can be Box objects or Views (pages) or other custom page objects. Take the box object as an example.
​**A.**Select and drag a Label component from the resource panel to the interface of the editing area. Set the value of the Label attribute name to m_label. In addition, set Label's display-related properties to make it look better.
​**B.**Select the Label object, use the shortcut key Ctrl + B or select**Menu Bar - > Edit - > Convert to Container**Options, open the Conversion to Container Settings panel, select the container type as Box, and click the OK button to complete the addition of Box containers.

​![图片0.png](img/1.png)<br/>
(Fig. 1)





 ####2. Convert to a List container.

Select the list rendering item object, use the shortcut key Ctrl + B or select**Menu Bar - > Edit - > Convert to Container**Options, open the Conversion to Container Settings panel, select the Container Type as List, and click the OK button to complete the addition of Container List.
​![图片0.png](img/2.png)<br/>
(Figure 2)
####3. Specify a list render entry for the list.
Method 1: Double-click the List object and enter the List. Set the value of the attribute name of the List rendering item to render.**Note: The value of the list render item attribute name here must be render.**

Method 2: Double-click the List object and enter the List. Set the renderType value of the renderType attribute of the List rendering item to render.


​![图片0.png](img/3.png)<br/>
(Figure 3)

####4. Add a scrollbar component to the List.
Method 1: Select and drag a VScrollBar component from the resource panel to the inside of the List component, and set the value of the attribute name of the VScrollBar component object to scrollBar.***Note: the value of the property name of the scroll bar here must be scrollbar.***

Method 2: Select list component, vScrollBarrSkin will appear in the right attribute panel. Selecting and dragging a VScrollBarr component from the resource panel into the skin attribute will immediately generate a scrollbar.

​![图片0.png](img/4.png)<br/>
(Figure 4)

####5. Drag to set the width of the List
Set the value of repeatX to 1 and repeatY to 6. Set the global reference name of the List object, that is, set the value of the property VaR to m_list.
​![图片0.png](img/5.png)<br/>

(Fig. 5)

####6. Apply values to List objects in the code.



```javascript

  var data = [];

   for(var m =0;m<20;m++){

        data.push({m_label:"No."+m});
}
m_list.array = data;
```



####7. Run the program to see the effect.
​![图片0.gif](gif/1.gif)<br/>
(Fig. 6)

####8. Add scripts to the code, hide scrollbars, and set drag-and-drop rubber band effects.

```javascript

 m_list.scrollBar.hide = true;//隐藏列表的滚动条。
 m_list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
 m_list.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
```


####9. Run the program to see the effect.

   ​        ![图片0.gif](gif/1.gif)<br/>
(Figure 7)


###1.2 Common attributes of List components

​![图片0.png](img/6.png)<br/>
(Figure 8)

A kind of**attribute**A kind of**Function description**A kind of
| ----------------------------------------------------------------------------------------------------------------------------------------------------|
| repeatX | Number of cells displayed horizontally. A kind of
| repeatY | Number of cells displayed vertically. A kind of
| SpaceX | Spacing between cells displayed horizontally (in pixels). A kind of
| SpaceY | Spacing between cells displayed vertically (in pixels). A kind of
| vScrollBarSkin | Vertical scroll bar skin. A kind of
| hScrollBarSkin | Horizontal scroll bar skin. A kind of



  



###1.3 Tips:

1. There are two ways to add a scrollbar to a List: one is to drag and drop a scrollbar directly inside the List and set the name of the scrollbar to scrollBar, the other is to set the value of the attribute vScrollBarSkin and hScrollBarSkin to the resource address of the scrollbar.

2. List's list rendering item can be either a Box object or a page object.

​


##2. Creating List Components through Code

When we write code, we inevitably control UI through code, create UI_List class, and set List-related attributes through code.

**Run the example effect:**
​![5](gif/3.gif)<br/>
(Figure 9) Create a List from code

Other attributes of List can also be set by code. The following sample code demonstrates how to create lists with different skin (styles) through code. Interested readers can set lists themselves by code to create lists that meet their needs.

**Sample code:**


```javascript

// 这段代码需要在setupDemo之前执行。
(function()
{
	// 项渲染器
	var Box   = Laya.Box;
	var Image = Laya.Image;

	var WID = 373,
		HEI = 85;

	function Item()
	{
		Item.__super.call(this);
		this.size(WID, HEI);
		this.img = new Image();
		this.addChild(this.img);

		this.setImg = function(src)
		{
			this.img.skin = src;
		}
	}
	Laya.class(Item, "Item", Box);

	// 主要逻辑代码
	var Stage   = Laya.Stage;
	var List    = Laya.List;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;
	

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(800, 600, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628";

		setup();
	})();

	function setup()
	{
		var list = new List();

		list.itemRender = Item;

		list.repeatX = 1;
		list.repeatY = 4;

		list.x = (Laya.stage.width - WID) / 2;
		list.y = (Laya.stage.height - HEI * list.repeatY) / 2;

		// 使用但隐藏滚动条
		list.vScrollBarSkin = "";

		list.selectEnable = true;
		list.selectHandler = new Handler(this, onSelect);

		list.renderHandler = new Handler(this, updateItem);
		Laya.stage.addChild(list);

		// 设置数据项为对应图片的路径
		var data = [];
		for (var i = 0; i < 10; ++i)
		{
			data.push("res/ui/listskins/1.jpg");
			data.push("res/ui/listskins/2.jpg");
			data.push("res/ui/listskins/3.jpg");
			data.push("res/ui/listskins/4.jpg");
			data.push("res/ui/listskins/5.jpg");
		}
		list.array = data;
	}

	function updateItem(cell, index)
	{
		cell.setImg(cell.dataSource);
	}

	function onSelect(index)
	{
		console.log("当前选择的索引：" + index);
	}
})();
```


