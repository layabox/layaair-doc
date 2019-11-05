#추가 스크립트 사용

프로젝트 개발에서 이런 경우가 종종 있다. 공식 구성 요소는 수요를 만족시키지 못하고, 새로운 속성을 늘리고 싶다면 IDE 안에 새 속성 설정을 하고 싶다.레이어이드의 1.4.0 버전 이후 두 가지 방식을 제공했습니다. 스크립트와 추가 스크립트 확장.

​**스크립트 확장:**계승방식으로 어떤 구성 요소 기능을 확장하여 자신의 논리를 실현하고 새로운 속성을 높이고 IDE 에 새 속성을 표시하고 시각화할 수 있는 설정을 설정합니다.

​**추가 스크립트:**비상속적인 방식으로, 부가된 방식으로 어떤 구성 요소를 증가시켜 새로운 속성을 증가시키고, IDE 에 새 속성을 표시하고, 시각화할 수 있는 새로운 속성을 표시합니다.

이 같은 확장 방식이 발생한 후 개발자는 구성 요소를 임의적으로 수정할 수 있는 행위와 새로운 속성, 시각화 가능한 UI 장면과 코드 결합을 추가할 수 있다.

​**스크립트와 추가 스크립트 구분**스크립트 상속은 구성 요소 자체, 부속 스크립트 자체에 이 요소를 제어하는 스크립트의 임의 속성을 수정할 수 있습니다.

**이 글은 여러 구성 요소에 같은 스크립트를 추가하여 이동 속도와 이름을 다른 예를 들어 부가스크립트 사용법을 상세하게 소개할 것입니다.최종 효과는 하도에서 보여준 (그림 속의 카튼은 로그 소프트웨어로 인한, 실제 효과를 기준으로):**

![0](img\0.gif)(그림 0)

###UI 페이지 만들기

Expandpage라는 UI 페이지를 새로 지어서 이 UI 페이지에 박스 구성 요소를 넣고, Box 구성 요소에 그림 하나, 텍스트 구성 요소, 텍스트 구성 요소, 텍스트 구성 요소 name 이름은 userN, 크기, 정렬 방식으로 저장합니다.그림 1의 보여 주기:

![1](img\1.png)(그림 1)



###둘째, 확장 스크립트 생성 및 구성 요소에 추가

UI 패널에서 오른쪽 키를 관리하고 새 스크립트를 선택하십시오. UI 페이지에서 스크립트를 만들 수 있습니다. 스크립트의 기본 클라이언트에 대한 논리적 종류 즉 아래의 동작을 선택하십시오.그림 2 개 시:

![2](img\2.png)(2)

체크 단추를 누르면 항목 판넬에서 자동으로 script 파일을 생성할 수 있습니다. 이 파일에서 상용 속성을 가져올 수 있습니다. 새 속성 템플릿을 참고할 수 있습니다.

![3](img\3.png)(그림 3)

MonkeyScript 태그에 필요한 속성을 포함하고, 그림 4개처럼:

![4](img\4.png)(그림 4)

추가 스크립트가 완성된 후 UI 인터페이스를 열기 위해 개발자를 더 직관적으로 변화시키기 위해 박스를 UI 인터페이스에 복사하는 중, 그림 5개처럼 보여 줍니다.

![5](img\5.png)(그림 5)

다음으로 만들어진 몬키스크립트 추가 스크립트를 Box 에 끌어당기는 형식으로 보스 내부에서 구성 요소 표시를 새로 늘리며 오른쪽 속성란에서 추가 추가 스크립트를 볼 수 있다.동영상 6개 시:

![6](img\6.gif)(동도 6)

층급 패널에서 몬키시스크립트 3개의 구성 요소를 각각 선택한 sped 및 userName, 속도가 각각 1.2.3, 작은 a, 작은 b, 작은 c, 소c 를 포함한 세 개의 구성 요소를 위한 상대 속성에 따라 다른 부위를 진행했다.저장 후 단축키 F12 (Ctrl + F12) 로 UI 내보내기, 코드에 코드를 작성합니다.



###코드 논리 편집

코드 편집 모드에서 layaUI.max.all.js 파일을 열면 안에 등록된 종류가 발견됩니다.그림 7개처럼 제시:

![7](img\7.png)(그림 7)

이 신문은 걱정 마세요. 프로젝트의 몬키시스크립트 스크립트에 대응하는 논리류는 개발자가 스스로 만들어야 할 것이며 편집기가 생성되지 않아서 편집기가 찾아내지 못해 오류를 발생했습니다.

다음으로 src/game 가방 아래에 MonkeyScript 종류를 만들기 (game 가방이 없다면 Src 디렉토리 아래에 game 가방을 만들어야 합니다.)

이 중 owner 또는 target 속성을 정의하려면 필요한 구성 요소를 인용해야 합니다.


```typescript

var game;
(function (game) {
    var MonkeyScript = (function () {

        function MonkeyScript() {
            /**攻击速度（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
            this.speed = 0;
            /**人物名称（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
            this.userName = "";
            /**记录状态**/
            this.boo = false;
        }
        /**
         *设置owner函数，可以直接获取到添加附加脚本的组件实例
         **/
        MonkeyScript.prototype = {
            set owner(value) {
                this.monkeyBox = value;
                //自定义的脚本会有时序问题，所以在此添加一个延时
                this.monkeyBox.frameOnce(2, this, this.onLoaded);
            }
        }
        MonkeyScript.prototype.onLoaded = function () {
            //通过子元素的name值获取该对象
            var userN = this.monkeyBox.getChildByName("userN");
            //设置文本内容为属性栏中给的值
            userN.text = this.userName;
            this.monkeyBox.frameLoop(1, this, this.onLoop);
        };
        /*
        设置帧循环，实现左右移动
        */
        MonkeyScript.prototype.onLoop = function () {
            if (this.monkeyBox.x <= 0) {
                this.boo = false;
                this.monkeyBox.x += this.speed;
            }
            else if (this.monkeyBox.x < Laya.stage.width - this.monkeyBox.width && this.boo == false) {
                this.monkeyBox.x += this.speed;
            }
            else if (this.monkeyBox.x >= Laya.stage.width - this.monkeyBox.width || this.boo == true) {
                this.monkeyBox.x -= this.speed;
                this.boo = true;
            }
        };
        return MonkeyScript;
    }());
    game.MonkeyScript = MonkeyScript;
})(game || (game = {}));
```


첨가하면 ExpandPageUI 종류에 대한 오류가 사라졌습니다. 그림 8개처럼:

![8](img\8.png)(그림 8)

마지막으로 입구에서 Expand PageUI 페이지**주의자: UI 인터페이스 전에 필요한 자원을 미리 미리 미리 미리 미리 미리 미리 미리 미리 사용해야 한다**) 코드 다음과 같이:


```typescript

//初始化引擎
Laya.init(600, 700);
//设置背景色
Laya.stage.bgColor = "#ffcccc";
//预加载资源
Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, onLoaded));

function onLoaded() {
    //实例化UI界面
    var ExpandPage = new ui.ExpandPageUI();
    //添加到stage上
    Laya.stage.addChild(ExpandPage);
}
```


결국 결과 가 글 시작 도 0 의 시사 를 보여 준다