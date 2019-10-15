#레이어 스크립트 인자 설명

Layaiair 2.0 시작, 사용자 정의 스크립트로 편집기까지 지원하여 구성 요소 기능을 확장할 수 있습니다

![script1](img/5.jpg)

편집기 안에 스크립트 정의 속성을 보여주려면 특수주석으로 이루어질 수 있습니다

아래의 스크립트 종류:

![script1](img/script1.jpg)

IDE 내에서 다음과 같습니다:

![script1](img/script2.jpg)

이렇게 하면 스크립트에 인자를 표시하고 IDE 안에 인자를 입력한 다음 스크립트에서 사용할 수 있습니다

이 표시는 AS 와 JS, TS 3가지 언어를 동시에 지원하고, 심지어 표기만 쓰고 스크립트 자체는 구체적으로 실현되지 않았다. (상속성 때 사용될 수 있다)

![script1](img/script3.jpg)



전체 라벨이 주로 아래의 몇 부분으로 되어 있습니다:

- type IDE 속성 유형, IDE 속성 유형, 비진정한 속성 유형, 대체로 같은

- name IDE 속성 이름

- tips IDE 내 마우스가 속성 이름을 거친 후 표시된 마우스 힌트가 없다면 name (선택)

- default 입력 상자 표시 기본 값 (선택)

​


IDE 기본값은 스크립트 사용, 주요 인자 종류:



특성 이름
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124테네name + 124테의 속성 표시, 변수명과 일치해야 합니다
마우스 디스플레이
유형: Int, Nodes Prefab, SNumber, SNumber, String, bool, Option, editoption, Check, ColorArray, Nodes Prefab, Sizece, Eace
1244 acccept
124 acccceptyptyps124테오 Node accccept 관련 속성, 인터페이스, RevoluteJoint, Prismaticjoint, Ricjoint, Riccespt:res 와 jpt, txt 제한 접미사
44ption (Option) 과 editotion의 연관 속성 option: aaaa, bbbb
1244대 Number 와 sNumber
124사 max1244 Number 와 sNumber 최대값
1244라벨 1244des의 연관 속성 표시 속성명 (선택) 이 있다면 라벨스 장기 입력 상자
"Nodes"의 연속성, 각 원소 유형
1244xCount  124대 Nodes 관련 속성, 수평 방향으로 몇 개 124대
"Nodes"의 연관성, 단일 요소 유형
기본 값 124대



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


부분 디스플레이 효과 다음과 같습니다:

![script1](img/111.png)