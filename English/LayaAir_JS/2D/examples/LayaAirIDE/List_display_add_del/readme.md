# List example: display, add, delete

​        List is a fairly common function. This article combines LayaAir engine and IDE for List display, add, delete and other related operations for step-by-step explanation, for developers learning engine and IDE practical reference. To create basic operations such as projects, check out other documents, skip this article

### A. make UI with LayaAirIDE

#####  1.1 Create a View page of type UI

​        ![1](img/1.png)
​        （Picture 1）Create a View type UI page called ListPage

​        First of all, we create a View type UI page in the LayaAirIDE project manager, which is 640*1136 wide. The page is named ListPage.

##### 1.2 Import UI resources

​      Import the UI page resources of art production into the resource manager. (specific import methods refer to documents imported from LayaAirIDE resources)

​        ![2](img/2.png)
​        （Picture 2）

##### 1.3 Making List background with nine squares

**1.3.1 Drag List background to the stage**

​      ![3](img/3.png)
​      （Picture 3）Drag the picture  bg_list.png to the stage

​	 **1.3.2  Image Passing through attributes into sizeGrid settings.**

​      ![4](img/4.png)
​      （Picture 4）Click on the right button of the sizeGrid property to open the settings panel

​	    **1.3.3 Set width to 640 (full screen width) in the property**

​      ![5](img/5.png)
​      （Picture 5）


 ##### 1.4 Making List containers

**1.4.1 Drag the checkbox.png to the stage and set the attribute name to check.**

​    ![6](img/6.png)
​        （Picture 6）

​**1.4.2 Drag a label.png to the stage, set the attribute name to listNumber, and other attributes refer to figure 7. **

​      ![7](img/7.png)
​      （Picture 7）label component for the serial number.

​	**1.4.3 Then drag a label.png to the stage and change the text to “List Sample text”, Property settings are shown in Figure 8:**

​      ![8](img/8.png)
​   （Picture 8）用于List文本的label组件

​	**1.4.4 Select the list background, serial number label, text label, checkbox, use Ctrl + B shortcut keys to create a Box container. Then select the Box container, set the Box property renderType to render. Figure 9, Figure 10. **

​      ![9](img/9.png)
​     （Picture 9）

​     ![10](img/10.png)
​      （Picture 10）

​	**1.4.5 Click the box container Ctrl + B again to create a List container, as shown in Figure 11. Note that all the List containers must be based on the Box container, so let's take a closer look at the hierarchy in Figure 12, which is based on the box loop.**

​      ![11](img/11.png)
​      （Picture 11）

​      ![12](img/12.png)
​      （Picture 12）

#####  1.5 Set the List property

​	Select the List container, set the Lis property var to _list (this variable can be called under all the properties under the component), and then set the other properties as needed, repeatX is the number of X-axis list, repeatY is the number of Y-axis list, spaceX Is the X-axis list spacing, and spaceY is the Y-axis list spacing. As shown in Figure 13:

​        ![13](img/13.png)
​      （Picture 13）

##### 1.6 Add operation button

​        Here, we use the template ButtonTab directly, drag and drop to the stage, and then click into the child node, set the VaR, label attributes, and nine squares, etc.. As shown in Figure 14, figure 15:

​        ![14](img/14.png)
​      （Picture 14）

​        ![15](img/15.png)
​      （Picture 15）

​      Adjust the details of the UI position, as shown in figure 16. When F12 releases UI, you can enter the code phase

​       ![16](img/16.png)
​      （Picture 16）

### 2. Using ActionScript language to realize List code logic

#####         2.1 Display the UI page.

​      2.1.1 Create a ListDemo.as program file and set it as the startup class.

​      ![17](img/17.png)
​     （Picture 17）

​      2.1.2  Edit code, display UI

We first introduce the loading and the UI class, and then load the atlas resources used to display the UI. Finally, the example UI interface is added to the stage. The following three links are implemented through coding ：

```typescript
(function()
{
    var Stage= Laya.Stage;
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
     
     var ListDemoView;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
         //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
    }
     
})();
```

​*      Tips：The path of the atlas in the code should be flexibly adjusted according to the actual situation of the project*

​        2.1.3 After the encoding is completed, run according to F5, as shown in Figure 18, the page display and the effect of IDE production is consistent, began to edit the logic code.

​        ![18](img/18.png)
​        （Picture 18）

#####     2.2 Write code logic

​**2.2.1 Implementation of List number logic**

​      In order to realize the data adding of List serial number, we need to use the “laya.ui.List” API in the list data source assignment array, the cell rendering processor renderHandler, and “laya.display.Node” API through the sub node name to obtain the sub node object method getChildByName. Let's look at the API instructions as follows: figure 19, Figure 20, figure 21.

​        ![19](img/19.png)
​      （Picture 19）

​      ![20](img/20.png)
​      （Picture 20）

​      ![21](img/21.png)
​        （Picture 21）

 **List serial number to add the code below: **

```typescript
(function()
{
    var Stage= Laya.Stage;
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
     
     var ListDemoView;
     var arr;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

          //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
        //获得List模拟数据，并渲染
         getListData(); 
    }
  
    function getListData(){
        //添加list数据
        arr = [];
        for (var i  = 1; i <= 30; i++) {
            arr.push({listNumber: {text:i}});
           }
      
        ListDemoView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
        ListDemoView._list.array = arr;//数据赋值
         //list渲染函数
          ListDemoView._list.renderHandler = new Handler(this, onRender);
    }
  
    function onRender(cell,index){
         //如果索引不再可索引范围，则终止该函数
        if(index > arr.length)return;
        //获取当前渲染条目的数据
        var data = arr[index];
        //根据子节点的名字listNumber，获取子节点对象。         
        var listNumber = cell.getChildByName("listNumber") ;
        //label渲染列表文本（序号）
        listNumber.text=data.listNumber.text;
    }

})();
```

​        The code running results are shown in Figure 22, and the serial data is successfully brought in. Specific implementation of logic and code instructions to view code and annotations directly.

​        ![22](img/22.png)
​      （Picture 22）

2.2.2 List order scroll
​      30 simulated data in the above example run, you can only see 16. So we need to add a scroll effect. The vScrollBarSkin in the laya.ui.List API fits our needs. The API description is shown in Figure 23:

​        ![23](img/23.png)
​        （Picture 23）
This function adds only one line of code, and it doesn't stick to all the code, and puts the following code before assigning the list data source.

```typescript
//添加list滚动条功能
listView._list.vScrollBarSkin='';
```

​       Again run the effect shown in Figure 24:

​        ![24](img/24.png)
​        （Picture 24）

2.2.3 List to increase functionality

​       To achieve List increase, you need to use LayaAir engine in the laya.display.Sprite event listener on () method in the LayaAir engine laya.display.Sprite to listen to the click event CLICK, and the method of adding cell data sources in laya.ui.List API addItem ();

​    ![25](img/25.png)
​       （Picture 25）

​       ![26](img/26.png)
​       （Picture 26）

 ```typescript
(function()
{
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
    var Event   = Laya.Event;
    var Stage = Laya.Stage;
     
     var ListDemoView;
     var arr;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

          //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
        //获得List模拟数据，并渲染
         getListData(); 
         //侦听增加按钮点击事件
         ListDemoView.add.on(Event.CLICK,this,onAddClick);
    }
  
    function getListData(){
        //添加list数据
        arr = [];
        for (var i  = 1; i <= 30; i++) {
            arr.push({listNumber: {text:i}});
           }
      
        ListDemoView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
        ListDemoView._list.array = arr;//数据赋值
         //list渲染函数
          ListDemoView._list.renderHandler = new Handler(this, onRender);
    }
  
    function onRender(cell,index){
         //如果索引不再可索引范围，则终止该函数
        if(index > arr.length)return;
        //获取当前渲染条目的数据
        var data = arr[index];
        //根据子节点的名字listNumber，获取子节点对象。         
        var listNumber = cell.getChildByName("listNumber") ;
        //label渲染列表文本（序号）
        listNumber.text=data.listNumber.text;
    }
      function onAddClick(){
         //添加单元格数据源
         ListDemoView._list.addItem({listNumber: {text:arr.length+1}});
    }

})();
 ```

​       See the code and notes directly:


​       The code runs as shown in figure 27:

​       ![27](img/27.png)
​       (Figure 27) increase the list effect

2.2.3 Make List able to delete features

​       List delete functions need to achieve checkbox function, delete the mouse button interception, delete the data after the re rendering. See the code and notes directly:

 ```typescript
(function()
{
    var Handler= Laya.Handler;
    var Loader= Laya.Loader;
    var WebGL = Laya.WebGL;
    var Event   = Laya.Event;
     var Stage = Laya.Stage;
     var CheckBox = Laya.CheckBox;
     
     var ListDemoView;
     var arr;
    (function()
    {
         Laya.init(640,1136,WebGL);
         Laya.stage.bgColor = "#ffffff";
          
         Laya.stage.scaleMode = Stage.SCALE_SHOWALL;

          //预加载资源文件后执行回调
         Laya.loader.load(["res/atlas/ListPage.atlas","res/atlas/template/ButtonTab.atlas"], Handler.create(this, onLoaded));
       
    })();
  
    function onLoaded(){
        ListDemoView = new ListPageUI();
        Laya.stage.addChild(ListDemoView);
        //获得List模拟数据，并渲染
         getListData(); 
         //侦听增加按钮点击事件
         ListDemoView.add.on(Event.CLICK,this,onAddClick);
         //侦听删除按钮点击事件
         ListDemoView.del.on(Event.CLICK,this,onRemoveClick);
    }
  
    function getListData(){
        //添加list数据
        arr = [];
        for (var i  = 1; i <= 30; i++) {
            arr.push({listNumber: {text:i}});
           }
      
        ListDemoView._list.vScrollBarSkin='';//添加list滚动条功能（UI不可显示）
        ListDemoView._list.array = arr;//数据赋值
         //list渲染函数
          ListDemoView._list.renderHandler = new Handler(this, onRender);
          //mouseHandler: list单元格鼠标事件处理器
          ListDemoView._list.mouseHandler = new Handler(this,onMouse);
    }
  
    function onRender(cell,index){
         //如果索引不再可索引范围，则终止该函数
        if(index > arr.length)return;
        //获取当前渲染条目的数据
        var data = arr[index];
        //根据子节点的名字listNumber，获取子节点对象。         
        var listNumber = cell.getChildByName("listNumber") ;
        //label渲染列表文本（序号）
        listNumber.text=data.listNumber.text;
        //获取当前渲染条目的check组件
        var check=cell.getChildByName("check");
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
  
      function onRemoveClick(){
      //创建一个新的数组，存放移除条目后的数据
      var temp= [];
      for(var i=0;i<arr.length;i++)
      {
      //将非选中状态的条目数据存储起来
            if(!arr[i].isCheck)
            {
                  temp.push(arr[i]);
            }
      }
      arr = temp;
      //将新的数组赋值给list
      ListDemoView._list.array = arr;
    }
  
      function onAddClick(){
         //添加单元格数据源
         ListDemoView._list.addItem({listNumber: {text:arr.length+1}});
    }

      function onMouse(e,index)
      {
         //鼠标单击事件触发
         if(e.type == Event.CLICK)
         {
              //判断点击事件类型,如果点中的是checkBox组件执行
            if((e.target) instanceof CheckBox)
            {
                 //记录当前条目所包含组件的数据信息(避免后续删除条目后数据结构显示错误)
                var tempObj = arr[index];
                 //根据check的选中状态，设置条目的数据信息
                 if((e.target).selected)
                 {
             ListDemoView._list.setItem(index,{listNumber:{text:tempObj.listNumber.text} ,isCheck:true});
                 }
                 else
                 {
             ListDemoView._list.setItem(index,{listNumber:{text:tempObj.listNumber.text},isCheck:false});
                 }
            }
         }
      }
  
})();
 ```

​       The running effect is shown in figure 28:

​       ![28](img/28.png)
​       （Picture 28）After removing the effect of 2,3,4
​

​        So far, we have completed the list of UI production, as well as display, add, delete code logic. If you have any questions, please go to the community：ask.layabox.com。


