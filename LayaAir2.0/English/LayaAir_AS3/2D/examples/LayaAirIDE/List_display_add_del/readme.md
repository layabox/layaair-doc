#List example: display, add, delete

List (list) is a commonly used function. This article, combined with LayaAir engine and IDE, gives a step-by-step explanation of List display, addition, deletion and other related operations for developers to learn engine and IDE for practical reference. (For basic operations such as creating projects, see other documents, skip this article)

###I. making UI with layaairide

#####1.1 Create a View-type UI page

​![1](img/1.png)
(Figure 1) Create a View-type UI page called ListPage

First, in the project manager of LayaAirIDE, we create a View-type UI page with a width of 640*1136. The page is named ListPage.

#####1.2 Importing UI Resources

Import art-produced UI page resources into resource manager. (Specific import method refers to documents imported from LayaAirIDE resources.)

​![2](img/2.png)
(Figure 2)

#####1.3 making list background with nine palace grids

**1.3.1 Drag List Background to Stage**

​![3](img/3.png)
(Figure 3) Drag the picture background bg_list.png onto the stage

​**1.3.2 in the image attribute, set the nine palace grid through sizegrid attribute.**

​![4](img/4.png)
(Figure 4) click the right button of sizegrid property to open the nine palace grid setting panel.

​**1.3.3 Set width to 640 (full screen width) in attributes**

​![5](img/5.png)
(Fig. 5)





 #####1.4 Making List Containers

**1.4.1 Drag checkbox.png onto the stage and set the property name to check.**



​    ![6](img/6.png)
(Fig. 6)

​**1.4.2 Drag a label.png onto the stage and set the attribute name to listNumber. The other attributes are shown in Figure 7.**

​![7](img/7.png)
(Figure 7) The label component for serial numbers

​**1.4.3 Drag another label.png onto the stage and modify the text content to "List sample text". Attribute settings are shown in Figure 8.**

​![8](img/8.png)
(Figure 8) The label component for List text

​**1.4.4 select the list background, serial number label, text label, and checkbox, and use the CTRL + B shortcut key to create a box container. Then select the box container and set the box property rendertype to render. As shown in Figure 9 and figure 10.**

​![9](img/9.png)
(Figure 9)

​![10](img/10.png)
(Figure 10)

​**1.4.5 click box container to create a list container through Ctrl + B again, as shown in Figure 11. Note that all List containers must be based on Box containers. Let's look at the hierarchical relationship in Figure 12 to make it clearer that lists are generated based on box loops.**

​![11](img/11.png)
(Fig. 11)

​![12](img/12.png)
(Fig. 12)

#####1.5 Setting List Properties

Select the list container, set the LIS attribute VaR to "list" (all attributes under the component can be called through this variable), and then set other attributes according to the actual needs. Repeatx is the number of x-axis lists, repeaty is the number of y-axis lists, SpaceX is the space of x-axis lists, and Spacey is the space of y-axis lists. As shown in Figure 13:



​        ![13](img/13.png)
(Figure 13)

#####1.6 Add operation button

Here, we directly use the Button Tab of the template, drag it onto the stage, then click on the sub-node, set var, label attributes, and the nine palaces. Fig. 14, Fig. 15:

​![14](img/14.png)
(Figure 14)

​![15](img/15.png)
(Figure 15)

Adjust the UI location details, as shown in Figure 16. When F12 releases UI, you can enter the code phase.

​![16](img/16.png)
(Fig. 16)

###II. Implement list code logic with ActionScript language

#####2.1 Display the UI Page Made

Create a listdemo.as program file and set it as the startup class.

​![17](img/17.png)
(Figure 17)

2.1.2 Edit the code and display the UI.

We first introduce the loading and UI classes, then load the atlas resources used to display the UI, and finally exemplify the UI interface and add it to the stage. The following three steps are realized by coding:


```java

  package 
  {
      import laya.display.Stage;
      import laya.net.Loader;
      import laya.utils.Handler;
      import laya.webgl.WebGL;
      import ui.ListPageUI;
   
      public class ListDemo 
      {
   
          public function ListDemo() 
          {
          Laya.init(640,1136,WebGL);
          Laya.stage.bgColor = "#ffffff";
           
          Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
          //预加载资源文件后执行回调
          Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
                   }       
           
           private function onLoaded():void
          {
          //实例UI界面
          var listView:ListPageUI = new ListPageUI();
          Laya.stage.addChild(listView);    
          }
      }
   
  }
```


​*Tips: Atlas paths in the code should be adjusted flexibly according to the actual situation of the project.*

After 2.1.3 encoding is completed, it runs according to F5. As shown in Figure 18, when the effect of page display is consistent with that of IDE production, it begins to edit the logic code.

​![18](img/18.png)
(Figure 18)

#####2.2 coding logic

​**2.2.1 Implementing List Sequence Logic**

In order to add the data of List serial number, we need to use list data source assignment array in the "laya.ui.List" API, renderHandler of cell rendering processor, and getChildByName, a method of obtaining child node object by child node name under the "laya.display.Node" API. Let's first look at the API description: Figure 19, Figure 20, and Figure 21.

​![19](img/19.png)
(Figure 19)



​      ![20](img/20.png)
(Figure 20)

​![21](img/21.png)
(Figure 21)


 **List serial number add code as follows:**


```java

  package 
  {
      import laya.display.Stage;
      import laya.net.Loader;
      import laya.ui.Box;
      import laya.ui.Label;
      import laya.utils.Handler;
      import laya.webgl.WebGL;
      import ui.ListPageUI;
   
      public class ListDemo 
      {
          private var listView:ListDemoUI;//UI面板
          private var arr:Array;//list数据数组
           
          public function ListDemo() 
          {
          Laya.init(640,1136,WebGL);
          Laya.stage.bgColor = "#ffffff";
           
          Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
          }
           
           private function onLoaded():void
          {
          //实例UI界面
          listView = new ListPageUI();
          Laya.stage.addChild(listView);    
          //获得List模拟数据，并渲染
          getListData(); 
          }
           
          private function getListData():void 
    {
     //添加list数据
     arr = [];
     for (var i:int = 1; i <= 30; i++) {
      arr.push({listNumber: {text:i}});
     }
     listView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
     listView._list.array = arr;//数据赋值
     //list渲染函数
     listView._list.renderHandler = new Handler(this, onRender);
    }
               
            
               
               
  private function onRender(cell:Box,index:int):void 
    {
      //如果索引不再可索引范围，则终止该函数
                      if(index > arr.length)return;
                      //获取当前渲染条目的数据
                      var data:Object=arr[index];
                      //根据子节点的名字listNumber，获取子节点对象。         
                      var listNumber:Label=cell.getChildByName("listNumber") as Label;
                      //label渲染列表文本（序号）
                      listNumber.text=data.listNumber.text;
          }
      }
   
  }
```


The result of code running is shown in Figure 22, which successfully implements the introduction of serial data. Specific implementation logic and code description directly view code and comments.

​![22](img/22.png)
(Figure 22)

2.2.2 Implementing List Sequential Scrolling
After running the above example, only 16 of the 30 simulated data can be seen. So we need to add a scrolling effect. VScrollBarSkin in the API of laya.ui.List can meet our needs. The API is illustrated in Figure 23:

​![23](img/23.png)
(Figure 23)
It only needs one line of code to add this function, so it won't stick all the code. Put the following code before the assignment list data source.


```javascript

//添加list滚动条功能
listView._list.vScrollBarSkin='';
```


The effect of re-operation is shown in Figure 24.

​![24](img/24.png)
(Figure 24)

2.2.3 add list function

To increase List, we need to use the event listening on () method in LayaAir engine laya. display. Sprite to listen for mouse click event CLICK, and add Item () to add cell data source in laya. ui. List API.

​![25](img/25.png)
(Figure 25)

​![26](img/26.png)
(Figure 26)



 
```java

  package 
  {
      import laya.display.Stage;
      import laya.events.Event;
      import laya.net.Loader;
      import laya.ui.Box;
      import laya.ui.Label;
      import laya.utils.Handler;
      import laya.webgl.WebGL;
      import ui.ListPageUI;
   
      public class ListDemo 
      {
          private var listView:ListDemoUI;//UI面板
          private var arr:Array;//list数据数组
           
          public function ListDemo() 
          {
          Laya.init(640,1136,WebGL);
          Laya.stage.bgColor = "#ffffff";
           
          Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
          }
           
           private function onLoaded():void
          {
          //实例UI界面
          listView = new ListPageUI();
          Laya.stage.addChild(listView);    
          //获得List模拟数据，并渲染
          getListData(); 
          //侦听增加按钮点击事件
          listView.add.on(Event.CLICK,this, onAddClick);
          }
           
          private function onAddClick():void 
          {
               //添加单元格数据源
               listView._list.addItem({listNumber: {text:arr.length+1}});
          }
           
		private function getListData():void 
    	{
    		//添加list数据
    		arr = [];
    		for (var i:int = 1; i <= 30; i++) {
    		  arr.push({listNumber: {text:i}});
    		}
    		listView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
    		listView._list.array = arr;//数据赋值
    		//list渲染函数
    		listView._list.renderHandler = new Handler(this, onRender);
    	}
            
               
    	private function onRender(cell:Box,index:int):void 
    	{
    		//如果索引不再可索引范围，则终止该函数
    		if(index > arr.length)return;
    		//获取当前渲染条目的数据
    		var data:Object= arr[index];
    		//根据子节点的名字listNumber，获取子节点对象。         
    		var listNumber:Label=cell.getChildByName("listNumber") as Label;
    		//label渲染列表文本（序号）
    		listNumber.text=data.listNumber.text;
    	}
}
   
 ```


See the code and comments directly for details:


The code runs as shown in Figure 27:

​![27](img/27.png)
(Figure 27) list adding effect

2.2.3 Implementing List Added Function Delete Function

To realize List deletion function, it is necessary to implement checkbox function of multiple check boxes, mouse listening of deletion buttons, and data re-rendering after deletion operation. See the code and comments directly for details:



 
```java

  package 
  {
   import laya.display.Stage;
   import laya.events.Event;
   import laya.net.Loader;
   import laya.ui.Box;
   import laya.ui.CheckBox;
   import laya.ui.Label;
   import laya.utils.Handler;
   import laya.webgl.WebGL;
   import ui.ListPageUI;
   public class ListDemo 
   {
    private var listView:ListDemoUI;//UI面板
    private var arr:Array;//list数据数组
     
    public function ListDemo() 
    {
    Laya.init(640,1136,WebGL);
    Laya.stage.bgColor = "#ffffff";
     
    Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
    }
     
     private function onLoaded():void
    {
    //实例UI界面
    listView = new ListPageUI();
    Laya.stage.addChild(listView);    
    //获得List模拟数据，并渲染
          getListData(); 
    //侦听增加按钮点击事件
          listView.add.on(Event.CLICK, this, onAddClick);
    //侦听删除按钮点击事件
    listView.del.on(Event.CLICK,this,onRemoveClick);
          }
     
    private function onRemoveClick():void 
    {
     //创建一个新的数组，存放移除条目后的数据
     var temp:Array = [];
     for(var i:Number=0;i<arr.length;i++)
     {
      //将非选中状态的条目数据存储起来
      if(!arr[i].isCheck)
      {
       temp.push(arr[i]);
      }
     }
 
     arr = temp;
     //将新的数组赋值给list
     listView._list.array = arr;
    }
     
    private function onAddClick():void 
    {
      //添加单元格数据源
               listView._list.addItem({listNumber: {text:arr.length+1}});
    }
     
    private function getListData():void 
    {
     //添加list数据
     arr = [];
     for (var i:int = 1; i <= 30; i++) {
      arr.push({listNumber: {text:i}});
     }
     listView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
     listView._list.array = arr;//数据赋值
     //list渲染函数
     listView._list.renderHandler = new Handler(this, onRender);
     //mouseHandler: list单元格鼠标事件处理器
              listView._list.mouseHandler = new Handler(this,onMouse);
    }
     
     
     
    private function onMouse(e:Event,index:Number):void 
    {
     //鼠标单击事件触发
     if(e.type == Event.CLICK)
     {
      //判断点击事件类型,如果点中的是checkBox组件执行
      if((e.target) instanceof CheckBox)
      {
       //记录当前条目所包含组件的数据信息(避免后续删除条目后数据结构显示错误)
       var tempObj:Object = arr[index];
        
       //根据check的选中状态，设置条目的数据信息
       if(((e.target) as CheckBox).selected)
       {
        listView._list.setItem(index,{listNumber:{text:tempObj.listNumber.text} ,isCheck:true});
       }
       else
       {
        listView._list.setItem(index,{listNumber:{text:tempObj.listNumber.text},isCheck:false});
       }
      }
     }
    }
     
    private function onRender(cell:Box,index:int):void 
    {
        //如果索引不再可索引范围，则终止该函数
         if(index > arr.length)return;
         //获取当前渲染条目的数据
        var data:Object= arr[index];
        //根据子节点的名字listNumber，获取子节点对象。         
        var listNumber:Label=cell.getChildByName("listNumber") as Label;
        //label渲染列表文本（序号）
        listNumber.text = data.listNumber.text;
       //获取当前渲染条目的check组件
       var check:CheckBox=cell.getChildByName("check") as CheckBox;
       //根据isCheck的值，确定当前check组件是否为勾选状态（可以避免出现其他多余的选中状态）
       if(data.isCheck)
       {
         check.selected=true;
       }
       else
       {
         check.selected=false;
       }
    }
   }
  }
 ```


The operation effect is shown in Figure 28.

​![28](img/28.png)
(Figure 28) effect after deleting 2, 3 and 4
​

So far, we have completed the UI production of the list, as well as the code logic of display, addition and deletion. If you have any questions, please go to the community and ask. layabox. com.



