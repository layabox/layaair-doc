# ComboBox 组件参考



## 一、通过LayaAirIDE创建ComboBox组件
###1.1 创建ComboBox
​        ComboBox 是一个下拉列表选项框组件。
​        点击选择资源面板里的 ComboBox 组件，拖放到页面编辑区，即可添加 ComboBox 组件到页面上。
​        ComboBox 的脚本请接口参考 [ComboBox API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ComboBox)。

​        ComboBox 组件的图像资源示例：

​        ![图片0.png](img/1.png)<br/>
​    （图1）

​        设置 ComboBox 的属性 labels 的值为 “label1,label2” 后，显示效果如下：
​        常态：

​        ![图片0.png](img/2.png)<br/>
​    （图2）

​        点击后显示下拉选项列表：

​        ![图片0.png](img/3.png)<br/>
​    （图3）

​        在下拉选项中选择 item1 后：

​        ![图片0.png](img/4.png)<br/>
​    （图4）



### 1.2 ComboBox 组件的常用属性

​        ![图片0.png](img/5.png)<br/>
​    （图5）

 

| **属性**        | **功能说明**                  |
| ------------- | ------------------------- |
| labels        | 下拉选框的标签文本内容集合字符串，以逗号分隔。   |
| visibleNum    | 下拉列表中可显示的最大行数。            |
| scrollBarSkin | 下拉列表的滚动条图像资源。             |
| selectedIndex | 表示当前选择的项的索引。              |
| sizeGrid      | 下拉列表图像资源的有效缩放网格数据（九宫格数据）。 |
| skin          | 下拉列表图像资源。                 |

 

### 1.3 ComboBox 组件下拉选项相关属性
​        ![图片0.png](img/6.png)<br/>
​    （图6）

​        ![图片0.png](img/7.png)<br/>
​    （图7）

 

| **属性**     | **功能说明**                      |
| ---------- | ----------------------------- |
| itemColors | 下拉列表项的各状态的标签文本颜色值集合。详细请参考API。 |
| itemSize   | 下拉列表项的标签文本的字体大小。              |

 

 

### 1.4 ComboBox 组件下拉按钮相关属性

​        ![图片0.png](img/8.png)<br/>
​    （图8）

​        ![图片0.png](img/9.png)<br/>
​    （图9）

 

| **属性**       | **功能说明**                    |
| ------------ | --------------------------- |
| labelBold    | 下拉按钮的标签文本是粗体显示。             |
| labelColor   | 下拉按钮的各状态下的文本颜色值集合。详细请参考API。 |
| labelFont    | 下拉按钮的文本字体。                  |
| labelPadding | 下拉按钮的文本边距。详细请参考API          |
| labelSize    | 下拉按钮的文本字体大小。                |

 

## 二、通过代码创建ComboBox组件 

 	在我们进行书写代码的时候，免不了通过代码控制UI，创建`UI_ComboBox`类，在代码中导入`laya.ui.ComboBox`的包，并通过代码设定ComboBox相关的属性。

**运行示例效果：**
​	![1](gif/1.gif)<br/>
​	（图10）

​	ComboBox的其他属性也可以通过代码来设置，下述示例演示了如何通过代码创建选中框中的下拉选项，并通过点击获取到自己的点击是哪一条选项。有兴趣的读者可以自己通过代码设置ComboBox，创建出符合自己需要的下拉框。

```javascript
package
{
	import laya.display.Stage;
	import laya.display.Text;
	import laya.ui.ComboBox;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_ComboBox	
	{
		/***下边列表美术资源**/
		private var skin:String = "../../../../res/ui/combobox.png";
		/***下拉列表**/
		private var comboBox:ComboBox 
		/***提示信息文本框**/
		private var promptText:Text;
		
		public function UI_ComboBox() 
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
			
			//加载资源
			Laya.loader.load(skin, Handler.create(this, onLoadComplete));
		}
		
		/***加载资源完成***/
		private function onLoadComplete(e:*=null):void
		{
			//实例化下拉列表
			comboBox= new ComboBox(skin, "item0,item1,item2,item3,item4,item5");
			//按钮标签字体大小
			comboBox.labelSize = 30;
			//列表项标签字体大小
			comboBox.itemSize = 25;
			//下拉列表选择触发处理回调
			comboBox.selectHandler = new Handler(this, onSelect, [comboBox]);
			//加载到舞台
			Laya.stage.addChild(comboBox);
			//自动计算宽高
			comboBox.autoSize = true;
			//设置位置
			comboBox.pos((Laya.stage.width - comboBox.width) / 2, 150);
			//自动计算宽高关闭（在设置位置时，需获取列表宽度，获取后关闭）
			comboBox.autoSize = false;
			
			//创建选择提示信息框
			createPromptText()
		}
		
		/***创建提示信息***/
		private function createPromptText():void
		{
			//实例化提示信息
			promptText=new Text();
			//提示框字体
			promptText.font="黑体";
			//提示框字体大小
			promptText.fontSize=26;
			//提示框字体颜色
			promptText.color="#FFFFFF";
			//提示框初始文本
			promptText.text="您的选择是： ";
			//加载到舞台
			Laya.stage.addChild(promptText);
			//设置提示框位置
			promptText.pos(comboBox.x,comboBox.y-40);
		}
		
		/***下拉列表选择事件回调***/
		private function onSelect(comboBox:ComboBox):void
		{
			promptText.text="您的选择是： " + comboBox.selectedLabel;
		}
	}
}
```

