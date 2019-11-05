#LayaAir script parameter description

Starting with LayaAir 2.0, it supports custom scripts to editors to facilitate the expansion of existing component functions.

![script1](img/5.jpg)

If you want to display script-defined attributes in the editor, you can use special annotations to do so.

For example, the following script class:

![script1](img/script1.jpg)

The following is shown in the IDE:

![script1](img/script2.jpg)

This allows you to design display parameters in scripts, enter parameters in IDE, and then use them in scripts.

This tag supports AS, JS, TS languages at the same time, and even can be written only tags. The script itself is not specifically implemented (used when inheriting attributes).

![script1](img/script3.jpg)



A complete label consists of the following parts:

- Type IDE attribute type, which refers to the IDE attribute type, not the real attribute type, but mostly the same

- Property names displayed in name IDE

- The mouse prompt in tips IDE is displayed after the mouse passes over the attribute name, and if not, the name is used (optional).

- Default values displayed in the default input box (optional)

​


By default, IDE provides many types for scripts to use. The main parameter types are as follows:

| Property Name | Description|
|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The name | attribute displays the name, which must be consistent with the variable name|
| tips | Mouse past the display label|
| Type | Type: Int, Number, sNumber, String, Bool, Option, editOption, Check, Color, ColorArray, Node, Nodes, Prefab, SizeGrid, Vec, Vector, Ease|
| accept | String's Association property, accept: res is the address of the receiving resource|
| AceptTypes | Node and accept's associated attributes, receiving types, such as using RevoluteJoint, Prismatic Joint, RigidBody with nodes, and accept: res using jpg, png, txt to restrict suffixes|
| option | Option and editOption's associated attribute option: Optional lists such as aaa, bbb, ccc|
| min | Number and sNumber minimum|
| Maximum Max | Number and sNumber|
| The label | Nodes associated attribute, the name of the displayed attribute (optional), if any, the length input box is displayed if the length is not determined according to labels|
| Type | Nodes Association attribute, type of each element (optional)|
| xCount | Nodes Association properties, how many are displayed horizontally|
| sType | Nodes Association properties, types of individual elements|
| default | default value|


```

	    /** @prop {name: resType, tips:"abc",type:string,accept:res} */
    
        resType:String ="";

        /** @prop {name:int1,tips:"11",type:Int} */
    
        number1:Number;

        /** @prop {name:String,tips:"abc",type:String} */
   
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

        /** @prop {name:nodes2,type:Nodes}*/  这一条必须选中组件上赋值才有效，在场景选择会失效
		// public var nodes2:*;

		/** @prop {name:ease1,type:Ease}*/
		sase1:any;
   
```


Part of the display effect is as follows:

![script1](img/111.png)