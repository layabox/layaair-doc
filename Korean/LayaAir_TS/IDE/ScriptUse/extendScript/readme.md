#스크립트 확장 사용

프로젝트 개발에서 이런 경우가 자주 있다. 공식이 제공하는 구성 요소는 수요를 만족시키지 못하고, Button 구성 기능을 확장하고 새로운 속성을 늘리고, IDE 안에 새 속성 설정을 하고 싶다.레이어이드의 1.4.0 버전 이후 두 가지 방식을 제공했습니다. 스크립트와 추가 스크립트 확장.

​**스크립트 확장:**상속적인 방식으로 어떤 구성 요소 기능을 확장하여 자신의 논리를 실현하고, 심지어 새로운 속성을 증가시키고, IDE 에 새 속성을 표시하고, 시각화 가능한 설정

​**추가 스크립트:**비상속적인 방식으로, 부가된 방식으로 어떤 구성 요소를 증가시키고, 새로운 속성을 증가시키고, IDE 안에 새 속성을 표시할 수 있는 새로운 속성을 보여 줍니다.

이 같은 확장 방식이 발생한 후 개발자는 구성 요소를 임의적으로 수정할 수 있는 행위와 새로운 속성, 시각화 가능한 UI 장면과 코드 결합을 추가할 수 있다.

​**스크립트와 추가 스크립트 구분**스크립트 상속은 구성 요소 자체, 부속 스크립트 자체에 이 요소를 제어하는 스크립트의 임의 속성을 수정할 수 있습니다.

​**이 글은 여러 구성 요소에 같은 스크립트를 추가하여 이동 속도와 이름을 다른 예를 들어 스크립트를 확장하는 방법을 상세하게 소개합니다.최종 효과는 하도에서 보여준 (그림 속의 카튼은 로그 소프트웨어로 인한, 실제 효과를 기준으로):**

![0](img\0.gif)(그림 0)

###UI 페이지 만들기

Expandpage라는 UI 페이지를 새로 지었습니다.이 UI 페이지에 Box 구성 요소를 넣고, Box 구성 요소에 그림 하나, 텍스트 구성 요소를 넣고, 텍스트 구성 요소에 대한 name 이름은 userN, 크기, 정렬 방식으로 저장합니다.그림 1의 보여 주기:

![1](img\1.png)(图1)







###둘째, 확장 스크립트 생성 및 구성 요소에 추가

UI 패널에서 오른쪽 키 — 새 스크립트를 관리하고 스크립트 확장 스크립트를 선택하십시오. (UI 페이지에서 스크립트를 만들 수 있습니다), 스크립트의 논리적 종류 즉 아래의 실행 종류입니다.그림 2 개 시:

![2](img\2.png)(2)

단추를 누르면 항목 판넬에서 자동으로 prop 파일을 생성할 수 있습니다. 이 파일에서 상용되는 속성을 가져올 수 있습니다. 속성 목록을 참고할 수 있습니다. 그림 3의 시트를 참고할 수 있습니다.

![3](img\3.png)(그림 3)

MonkeyProp 탭에 필요한 속성을 포함해서 그림 4개처럼:

![4](img\4.png)(그림 4)

스크립트 편집이 완료된 후 UI 인터페이스를 열어 개발자를 더욱 직관적으로 볼 수 있도록, 여기에 박스를 UI 인터페이스에 여러 개를 복사하는 중, 그림 5개에 제시한 것처럼:

![5](img\5.png)(그림 5)

다음으로 만들어진 몬키Prop. prop 스크립트를 스크립트로 끌어당기는 형식으로 박스에 올려줍니다:

![6](img\6.gif)(그림 6)

구성 요소를 끌어당기고 계층 목록과 UI 인터페이스에서는 변화를 보이지 않는다. 하지만 박스 구성 요소 오른쪽 속성란에서 새로운 속성을 볼 수 있다.그림 7개처럼 제시:

![7](img\7.png)(그림 7)

세 개의 구성 요소에 대한 sped와 userName, 속도는 각각 1.2.3, 작은 a, 작은 b, 작은 c, 작은 세 개의 구성 요소의 대상 속성에 따라 다른 부득점을 설정했다.저장 후 단축키 F12 (Ctrl + F12) 로 UI 내보내기, 코드에 코드를 작성합니다.



###코드 논리 편집

코드 편집 모드에서 layaUI.max.all.ts 파일에서 오류가 발생할 수 있으며, game.MonkeyProp 을 찾을 수 없습니다.그림 8개처럼:

![8](img\8.png)(图8)


이 신문은 걱정 마세요. 프로젝트에서 몬키팝 스크립트에 대응하는 논리류는 개발자가 만들어야 할 것이며 편집기가 생성되지 않아서 편집기가 찾아내지 못해 오류를 발생했습니다.

다음으로 src 디렉터리에 개미백을 생성하고 개미백에 몬키Prop 종류를 만들며 이 종류에서 보x 용기를 계승합니다.UI 파일로 돌아가면 ExpandPageUI 파일의 오류가 사라졌습니다. 그림 9개처럼 보이기:

![9](img\9.png)(图9)


MonkeyProp 에서 스크립트를 확장하는 속성, 모든 코드 다음과 같습니다:


```typescript

module game{
    /*
    扩展脚本对应的逻辑类
    */
    export class MonkeyProp extends Laya.Box{
        /**攻击速度（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
		public speed:number = 0;
		/**人物名称（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
		public userName:string = "";
		/**记录状态**/		
		private boo:Boolean = false;
        constructor(){
            super();
            //自定义的脚本会有时序问题，所以在此添加一个延时
            this.frameOnce(2,this,this.onFrame);
        }
        private onFrame():void{
            //通过子元素的name值获取该对象
            var userN:Laya.Label = this.getChildByName("userN") as Laya.Label;
            //设置文本内容为属性栏中给的值
            userN.text = this.userName;
            this.frameLoop(1,this,this.onLoop);
        }
        /*
        设置帧循环，实现左右移动
        */
        private onLoop():void{
            if(this.x<=0){
				this.boo = false;
				this.x+=this.speed;
			}
			else if(this.x<Laya.stage.width-this.width && this.boo == false){
				this.x+=this.speed;
			}
			else if(this.x>=Laya.stage.width-this.width || this.boo == true){
				this.x-=this.speed;
				this.boo = true;
			}
        }
    }
}
```


마지막으로 입구에서 Expand PageUI 페이지**주의자: UI 인터페이스 전에 필요한 자원을 미리 미리 미리 미리 미리 미리 미리 미리 미리 사용해야 한다**) 코드 다음과 같이:


```typescript

// 程序入口
class GameMain {
    constructor() {
        //初始化引擎
        Laya.init(600, 700);
        //设置背景色
        Laya.stage.bgColor = "#ffcccc";
        //预加载资源
        Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    private onLoaded(): void {
        //实例化UI界面
        var ExpandPage: ui.ExpandPageUI = new ui.ExpandPageUI();
        //添加到stage上
        Laya.stage.addChild(ExpandPage);
    }
}
new GameMain();
```


결국 결과 가 글 시작 도 0 의 시사 를 보여 준다



