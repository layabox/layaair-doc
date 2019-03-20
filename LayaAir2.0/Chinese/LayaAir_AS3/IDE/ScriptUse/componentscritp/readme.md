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


| 类型             | 说明                  | 特殊参数                                     |
| :------------- | :------------------ | :--------------------------------------- |
| Int            | 整数输入框               |                                          |
| Number         | 数字输入框               | min：最小值<br />max：最大值<br />tick：滑动最小刻度值   |
| String         | 字符串类型输入框            |                                          |
| Bool           | 布尔类型选择框             |                                          |
| Option         | 下拉选择框               | option：可选择的列表，如 aaa,bbb,ccc              |
| EditOption     | 可输入的下拉框             | option：可选择的列表，如 aaa,bbb,ccc              |
| Check          | 单选框                 |                                          |
| Color          | 颜色选择框               |                                          |
| SNumber        | 数字类型滑条              | min：最小值<br />max：最大值<br />tick：滑动最小刻度值   |
| Res            | 资源输入框，可拖动资源到输入框内    | acceptTypes：可接收的文件后缀列表<br />比如：ani,json,atlas |
| Runtime\|Class | 脚本输入框，可拖动脚本到输入框内    |                                          |
| Node           | 节点输入框，可拖动节点到输入框内    | acceptTypes：可接收的节点类型列表<br />比如：RevoluteJoint,PrismaticJoint |
| Prefab         | 预设输入框，可拖入预设到输入框内    |                                          |
| SizeGrid       | 九宫格输入框，可设置9宫格       |                                          |
| ColorArray     | 返回颜色数组[r,g,b,a]     |                                          |
| Vec            | 数字数组，返回数组类型，比如[1,0] |                                          |
| Vector         | 数组类型输入              | labels：展示的属性名（可选）<br />如果有则根据labels确定长度<br />没有就显示长度输入框<br />types：每个元素的类型（可选）<br />xCount：水平方向显示多少个<br />sType：单个元素的类型 |
| Nodes          | 节点数组，可用拖入多个节点       |                                          |
| ActionButton   | 显示一个按钮，点击后触发函数调用    | funName 点击后调用当前选中对象上的函数名                 |
| Ease           | 缓动类型下拉框             |                                          |

```
		/** @prop {name:int1,tips:"11",type:Int}*/
		public var int1:int;

		/** @prop {name:number1,tips:"11.11",type:Number}*/
		public var number1:Number;

		/** @prop {name:String,tips:"abc",type:string}*/
        public var string1:String;

		/** @prop {name:bool,tips:"1,0",type:Bool}*/
		public var bool1:Boolean;

		/** @prop {name:Option,tips:"opt",type:Option,option:"aaa,bbb,ccc"}*/
		// 返回字符串
		public var opt:String;

		/** @prop {name:editOption,tips:"editopt",type:EditOption,option:"aaa,bbb,ccc"}*/
		// 返回字符串
		public var editopt:String;

				/** @prop {name:check,tips:"ch11eck",type:Check}*/
		// 返回bool 
		public var check:Boolean;

		/** @prop {name:color1,tips:"opt",type:Color}*/
		// 返回颜色值
		public var  color1:Color;

		/** @prop {name:sNumber1,type:sNumber,min:10,max:100}*/
		
		public var 	snumber1:int = 11;

		 /** @prop {name:runtime,tips:"o11pt"s}*/

	     public var runtime:Class;
        
		/**
		 * 哈哈哈
		 * @prop {name:runtime22,type:class,title:runtimeclass,tips:"222323wewe"}
		 */
		public var runtime22:String = "#ff0000";

		/** @prop {name:node1,type:Node}*/

		public var node1:Node;

        /** @prop {name:sizegrid1,type:SizeGrid}*/
		public var sizegrid1:*;

		/** @prop {name:colorarray,type:ColorArray}*/
		public var colorarray:*;

		/** @prop {name:vec1,type:Vec}*/
		public var vec1:*;

		/** @prop {name:vector1,type:Vector,labes:abc,types:"Node,String,Number,Boolean",xCount:2,sType:Number}*/
		public var vector1:*;

        // /** @prop {name:nodes2,type:Nodes}*/
		// public var nodes2:*;

		/** @prop {name:actionbutton1,type:ActionButton,funName:creteBox}*/
		public var actionbutton1:*;


		/** @prop {name:ease1,type:Ease}*/
		public var sase1:*;
```

部分显示效果如下：

![script1](img/111.png)