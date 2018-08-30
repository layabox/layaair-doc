# List 组件参考



##  一、通过LayaAirIDE创建List组件

​        List 组件可显示项目列表。默认为垂直方向列表。可通过UI编辑器自定义列表。List 列表的每一个列表通常是一样的，也可以使用编辑器自定义不同样式的列表内容项。
​        List 通常由两个部分组成：列表渲染项（单元格）、滚动条。
​        List 组件的脚本接口请参考 [List API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.List)。

 

### 1.1 创建 List 组件

#### 1.编辑列表项。

​	列表项可以是 Box 对象或 View（页面） 或其它自定义页面对象。此处以Box 对象为例。
​	**a.**从资源面板里选择拖入一个 Label 组件，到编辑区的界面里，设置 Label 属性 name 的值为 m_label。另外再设置一下 Label 的显示相关属性使它更好看一些。
​	**b.**选中 Label 对象，使用快捷键 Ctrl +B 或选择 **菜单栏->编辑->转换为容器** 选项，打开转换为容器设置面板，选择容器类型为 Box ，点击确定按钮完成 Box 容器的添加。 

​        ![图片0.png](img/1.png)<br/>
​    （图1）


 ####2. 转化为 List 容器。

   选择列表渲染项对象，使用快捷键 Ctrl +B 或选择 **菜单栏->编辑->转换为容器** 选项，打开转换为容器设置面板，选择容器类型为 List，点击确定按钮完成容器 List 的添加。 
​           ![图片0.png](img/2.png)<br/>
​       （图2）
####3. 指定 List 的列表渲染项。
  方法1： 双击List 对象，进入List 内部，设置List 列表渲染项的属性 name 的值为 render。 **注意：此处列表渲染项属性 name 的值必须为 render。**

  方法2：双击List 对象，进入List 内部，设置List 列表渲染项的属性 renderType的值为 render。


​           ![图片0.png](img/3.png)<br/>
   ​    （图3）

####4. 为 List 添加滚动条组件。
  方法1： 从资源面板里选择并拖拽一个 VScrollBar 组件到 List 组件的内部，并设置 VScrollBar 组件对象的属性 name 的值为 scrollBar。  ***注意：此处滚动条的属性 name 的值必须为 scrollBar。***

  方法2：选择list组件，右侧属性面板常用中会出现vScrollBarrSkin，从资源面板里选择并拖拽一个VScrollBarr组件到这个skin属性中，会立即生成滚动条

​        ![图片0.png](img/4.png)<br/>
​    （图4）

####5. 拖动设置 List 的宽高
​	设置属性 repeatX 的值为 1，设置 repeatY 的值为6。设置 List 对象的全局引用名，即设置属性 var 的值为 m_list。
​           ![图片0.png](img/5.png)<br/>
   ​    （图5）

####6. 在代码里给 List 对象赋值。


```javascript
 var data:Array =[];

   for(var m:int =0;m<20;m++){

        data.push({m_label:"No."+m});
}
m_list.array = data;
```


####7. 在程序里运行查看效果。
​           ![图片0.gif](gif/1.gif)<br/>
​       （图6）

####8. 在代码里添加脚本，隐藏滚动条，设置拖拽的橡皮筋效果。
```javascript
 m_list.scrollBar.hide = true;//隐藏列表的滚动条。
 m_list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
 m_list.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
```

####9. 在程序里运行查看效果。
​           ![图片0.gif](gif/2.gif)<br/>
​       （图7）


### 1.2 List 组件常用属性

​        ![图片0.png](img/6.png)<br/>
​    （图8）

  

| **功能说明**                 | **属性**         |
| ------------------------ | -------------- |
| 水平方向显示的单元格数量。            | repeatX        |
| 垂直方向显示的单元格数量。            | repeatY        |
| 水平方向显示的单元格之间的间距（以像素为单位）。 | spaceX         |
| 垂直方向显示的单元格之间的间距（以像素为单位）。 | spaceY         |
| 垂直方向滚动条皮肤。               | vScrollBarSkin |
| 水平方向滚动条皮肤。               | hScrollBarSkin |

  

### 1.3 Tips:

1. 给 List 添加滚动条有两种方式：一种是直接在List 内部拖放一个 滚动条，并设置滚动条的名字为 scrollBar，另一种方式是设置 List 的属性vScrollBarSkin、hScrollBarSkin 的值为滚动条的资源地址。

2. List 的列表渲染项既可以是 Box 对象，也可以是页面对象。

   ​


## 二、通过代码创建List组件

​	在我们进行书写代码的时候，免不了通过代码控制UI，创建UI_List类，在代码中导入`laya.ui.List`的包，并通过代码设定List相关的属性。

**运行示例效果:**
​	![5](gif/3.gif)<br/>
​	(图9)通过代码创建List

​	List的其他属性也可以通过代码来设置，下述示例代码演示了如何通过代码创建不同皮肤（样式）的List，有兴趣的读者可以自己通过代码设置List，创建出符合自己需要的列表。

**示例代码：**

```javascript
package
{
	import laya.display.Stage;
	import laya.ui.Box;
	import laya.ui.Image;
	import laya.ui.List;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_List
	{
		//列表对应图片的路径
		private var data:Array = [  "../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg"];
		
		public function UI_List()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(800, 600, WebGL);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//背景颜色
			Laya.stage.bgColor = "#232628";

			//创建列表
			createList();			
		}
		
		/***创建list列表**/
		private function createList():void
		{
			//实例化列表
			var list:List = new List();
			//设置列表渲染单元格为Item类（注：必须是类，不能是实例化对象，Item需类继承于Box）
			list.itemRender =Item;
			//列表显示区单元格的列数
			list.repeatX = 1;
			//列表显示区单元格的行数
			list.repeatY = 4;
			//设置列表位置
			list.x = (Laya.stage.width - Item.WID) / 2;
			list.y = (Laya.stage.height - Item.HEI * list.repeatY) / 2;
			
			// 使用但隐藏垂直滚动条
			list.vScrollBarSkin = "";
			//滚动在头或底回弹时间
			list.scrollBar.elasticBackTime = 500;
			//滚动在头或底最大距离
			list.scrollBar.elasticDistance = 200;
			
			//设置为可以选择
			list.selectEnable = true;
			//选择单元格时回调方法
			list.selectHandler = new Handler(this, onSelect);
			//渲染单元格时的回调方法
			list.renderHandler = new Handler(this, updateItem);
			//为列表赋值
			list.array = data;
			//加载到舞台
			Laya.stage.addChild(list);
		}
		
		/***渲染单元格时的回调方法***/
		private function updateItem(cell:Item, index:int):void 
		{
			//用获得的数据给图片更换皮肤
			cell.img.skin=cell.dataSource;
		}
		
		/***选择单元格回调***/
		private function onSelect(index:int):void
		{
			trace("当前选择的索引：" + index);
		}
	}
}


//单元格类，继承于Box
import laya.ui.Box;
import laya.ui.Image;

class Item extends Box
{
	/***单元格宽***/
	public static var WID:int = 375;
	/***单元格高***/
	public static var HEI:int = 85;
	/***单元格中图片***/
	public var img:Image;
	
	public function Item()
	{
		//设置大小宽高
		size(WID, HEI);
		//实例化图片
		img = new Image();
		//加载到单元格中
		addChild(img);
	}
}

```

