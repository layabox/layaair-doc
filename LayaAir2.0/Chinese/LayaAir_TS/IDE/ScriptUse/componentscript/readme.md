# LayaAir脚本参数说明

LayaAir2.0开始，支持自定义脚本到编辑器，方便扩展已有组件功能

![script1](img/5.jpg)

如果想在编辑器内展示脚本定义的属性，可用通过特殊注释来实现

比如下面的脚本类：

![script1](img/script1.jpg)

在IDE内显示如下：

![script1](img/script2.jpg)

这样就可用在脚本里面设计显示参数，在IDE内输入参数，然后在脚本里面使用

这种标记同时支持AS,JS,TS三种语言，甚至还可用只写标记，脚本本身没有具体实现（在继承属性时会用得到）

![script1](img/script3.jpg)



一个完整的标签主要由下面几个部分：

- type	IDE属性类型，此类型是指IDE属性类型，非真正的属性类型，不过大多情况下是一样的

- name      IDE内显示的属性名称

- tips          IDE内鼠标经过属性名称上后，显示的鼠标提示，如果没有则使用name（可选）

- default    输入框显示的默认值（可选）

  ​


IDE默认提供了不少类型供脚本使用，主要参数类型如下：

| name（需与变量名完全一致） | tips（鼠标经过显示标签，本表格里写功能说明，实际开发自己写描述） |  type（类型）  |                   特殊参数                   |
| :-------------- | :--------------------------------: | :--------: | :--------------------------------------: |
| int1            |               整数输入框                |    Int     |                                          |
| number1         |               数字输入框                |   Number   |  min：最小值<br />max：最大值<br />tick：滑动最小刻度值  |
| string1         |              字符串类型输入框              |   String   |                                          |
| bool1           |              布尔类型选择框               |    Bool    |                                          |
| opt             |               下拉选择框                |   Option   |       option：可选择的列表，如 aaa,bbb,ccc        |
| editopt         |              可输入的下拉框               | editOption |       option：可选择的列表，如 aaa,bbb,ccc        |
| check           |                单选框                 |   Check    |                                          |
| color1          |               颜色选择框                |   Color    |                                          |
| snumber1        |              数字类型滑动条               |  sNumber   |      min：最小值   max：最大值 tick：滑动最小刻度值      |
| resType         |          资源输入框，可拖动资源到输入框内          |   String   |                accept:res                |
| node1           |          节点输入框，可拖动节点到输入框内          |    Node    | acceptTypes：可接收的节点类型列表 比如：RevoluteJoint,PrismaticJoint |
| prefab1         |          预设输入框，可拖入预设到输入框内          |   Prefab   |                                          |
| sizegrid1       |           九宫格输入框，可设置9宫格            |  SizeGrid  |                                          |
| colorarray      |          返回颜色数组[r,g,b,a]           | ColorArray |                                          |
| vec1            |        数字数组，返回数组类型，比如[1,0]         |    Vec     |                                          |
| vector1         |               数组类型输入               |   Vector   | labels：展示的属性名（可选） 如果有则根据labels确定长度 没有就显示长度输入框 types：每个元素的类型（可选） xCount：水平方向显示多少个 sType：单个元素的类型 |
| nodes1          |           节点数组，可用拖入多个节点            |   Nodes    |   必须选中脚本组件，在组件的属性页面 赋值才有效，在场景的属性选中会失效    |
| ease1           |              缓动类型下拉框               |    Ease    |                                          |

```
		//** @prop {name: resType, tips:"abc",type:string,accept:res} */
    
         resType:String ="";

    //** @prop {name:int1,tips:"11",type:Int} */
    
        number1:Number;

    //** @prop {name:String,tips:"abc",type:String} */
   
        string1:String;

    /** @prop {name:bool,tips:"1,0",type:Bool}*/
		bool1:Boolean;

		/** @prop {name:Option,tips:"opt",type:Option,option:"aaa,bbb,ccc"}*/
		// 返回字符串
	    opt:String;

		/** @prop {name:editOption,tips:"editopt",type:EditOption,option:"aaa,bbb,ccc"}*/
		// 返回字符串
		editopt:String;

				/** @prop {name:check,tips:"ch11eck",type:Check}*/
		// 返回bool 
		check:Boolean;

		/** @prop {name:color1,tips:"opt",type:Color}*/
		// 返回颜色值
		color1:any;

		/** @prop {name:snumber1,type:sNumber,min:10,max:100}*/
		
		snumber1:Number = 11;

		 /** @prop {name:runtime,tips:"o11pt"s}*/

	     runtime:any;
        
		/**
		 * 哈哈哈
		 * @prop {name:runtime22,type:class,title:runtimeclass,tips:"222323wewe"}
		 */
		runtime22:String = "#ff0000";

		/** @prop {name:node1,type:Node}*/

		node1:Node;

        /** @prop {name:sizegrid1,type:SizeGrid}*/
		sizegrid1:any;

		/** @prop {name:colorarray,type:ColorArray}*/
		colorarray:any;

		/** @prop {name:vec1,type:Vec}*/   
		vec1:any;

		/** @prop {name:vector1,type:Vector,labes:abc,types:"Node,String,Number,Boolean",xCount:2,sType:Number}*/
		vector1:any;

        // /** @prop {name:nodes2,type:Nodes}*/  这一条必须选中组件上赋值才有效，在场景选择会失效
		// public var nodes2:*;

		/** @prop {name:ease1,type:Ease}*/
		sase1:any;
   
```

部分显示效果如下：

![script1](img/111.png)