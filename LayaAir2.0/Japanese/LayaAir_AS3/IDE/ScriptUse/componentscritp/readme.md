#LayaAirスクリプトパラメータ説明

LayaAir 2.0からカスタムスクリプトをエディタにサポートし、既存のコンポーネント機能を拡張しやすくします。

![script1](img/5.jpg)

スクリプト定義のプロパティをエディタに表示したいなら、特別な注釈で実装できます。

例えば次のスクリプトクラス：

![script1](img/script1.jpg)

IDEには以下のように表示されます。

![script1](img/script2.jpg)

これはスクリプトの中にパラメータを設計してIDEにパラメータを入力してスクリプトの中で使うことができます。

このマークはAS，JS，TSの3つの言語をサポートしています。マークだけを書くこともできます。スクリプト自体は具体的に実現されていません。

![script1](img/script3.jpg)



完全なラベルは主に以下のいくつかの部分になります。

-type IDE属性タイプとは、IDE属性タイプを指し、本当の属性タイプではないが、多くの場合は同じです。

-name IDEに表示される属性名

-tips IDE内のマウスは属性名の上を通過した後に表示されるマウスヒントがない場合はnameを使用します。

-default入力ボックスに表示されるデフォルト値(オプション)

​


IDEデフォルトでは多くのタイプがスクリプトに使用されます。主なパラメータのタイプは以下の通りです。



|属性名|説明𞓜
|：-------------------------------------|
|name 124;属性表示名は、変数名と一致する必要があります。
|tips𞓜マウスを使ってラベルを表示します。
|typeタイプ：Int，Number，sNumber，String，Bool，Option，editon，Check，Color，ColorAray，Node，Nodes，Prefab，SizGrid，Vector，Ease|
|accept𞓜Steringの関連属性、accept：resは受信リソースアドレスです。
|accept Types Nodeとacceptの関連属性、受信のタイプ、例えば、ノードとRevoluteJoint、Prismatic Joint、RigidBodyを使用します。acceptとjpg、png、txt制限後綴りを使用します。
|option𞓜Optionとedit Optionの関連属性option：オプションリスト、aa、bb、ccc 124;など
|min𞓜NumberとsNumberの最小値𞓜
|max124; NumberとsNumberの最大値𞓜
|Label𞓜Nodesの関連属性は、示されている属性名（オプション）がある場合、labelsに従って長さが決定されていない場合、長さ入力ボックス124;が表示される。
|typesノードの関連属性は、各要素のタイプ（オプション）124;
|xCount𞓜Nodesの関連属性は、水平方向にいくつかの124;を表示しますか？
|sType Nodesの関連属性、単一要素のタイプ
124 default 124のデフォルト値



```

		/** @prop {name:resType,tips:"abc",type:string,accept:res}*/
		public var resType:String = "";
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

		/** @prop {name:snumber1,type:sNumber,min:10,max:100}*/
		
		public var 	snumber1:int = 11;
        
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

        // /** @prop {name:nodes2,type:Nodes}*/  这一条必须选中组件上赋值才有效，在场景选择会失效
		// public var nodes2:*;

		/** @prop {name:ease1,type:Ease}*/
		public var sase1:*;
```


部分表示の効果は以下の通りです。

![script1](img/111.png)