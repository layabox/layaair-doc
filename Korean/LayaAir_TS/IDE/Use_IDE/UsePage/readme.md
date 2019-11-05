#IDE 생성 페이지 코드 표시

>> 본편을 읽기 전에 디자인 모드 기초에 있는 문서 <UI 페이지, 입자, 애니메이션, 스크립트 새로운 판넬 상세해>

Layaiair 엔진과 IDE 의 초보자를 향해 접촉하고 있다면 IDE 페이지를 사용하여 UI 페이지를 만들었다면 IDE 편집을 통해 UI 페이지를 어떻게 작성할 것인가.다음 내용을 계속 보세요.



##알아야 할 UI 기본 사용

####1. UI 종류가 어떤 디렉토리에 내보내는지 알아보기

우선, UI 페이지 내보내기`F12或ctrl+F12`) 이후, 우리가 기본 값을 바꾸지 않았다면, 내보내는 UI 코드`src/ui`목록 아래.바꾸려면 F9 단축키를 누르면 항목 패널을 설정할 수 있으며, 그림 1개처럼 보여 줍니다.

![图1](img/1.png) 


(그림 1)

####2, TypeScript 프로젝트는 알 수 있는 UI 디렉토리 이름 규칙

TypeScript 자신의 원인으로 TS 항목은 UI 디렉토리를 만들 때 두 가지 중요한 규칙을 특별히 주의해야 합니다.

1, 새 디렉토리를 금지하는 이름`ui`그렇지 않으면 코드로 시보 오류를 표시할 수 있다.

2, 같은 종방향 목록 아래 중명 목록이 있다.예를 들어 아비 디렉토리와 자부 디렉토리 동명(aa/aa/aa/aa/bb/aaa)와 같은 디렉토리 동명(aa/aa/aa/aa/aa/aa/aa/aaa)와 같은 디렉토리 아래 어떤 등급 관계도 같은 디렉토리 이름도 금지되어 있습니다.

####3. 내보내기 후 생성된 코드 파일

IDE 내보내기 기능을 사용하면 기본값은 src/ui 디렉토리에서 ts UI 종류 파일을 생성할 수 있습니다.`layaUI.max.all.ts`무엇UI 페이지의 모든 메시지가 포함되어 있으며, 그림 2-1의 보여 드립니다.

![图2-1](img/2-1.png) 


(2-1)

![图2-2](img/2-2.png) 


(2-2)

2-1의 레드라인 부분과 2-2의 디렉토리 구조를 대조하는 것은 사실 그 사이를 쉽게 발견할 수 있다.ui 는 뿌리 구조, shop 은 ui 아래 1급 디렉터리입니다.demo 는 UI 파일의 이름으로 UI 파일 이름과 UI 키워드로 UI (demoUI) 이름으로 UI (demoUI) 코드에서 작성할 때 이런 종류로 쓰여졌다.IDE 에서 만든 UI 파일 이름이 아니었습니다.예를 들어 사용할 UI 종류를 인용해서 아래에 부호된 것처럼:


```typescript

import demoUI = ui.shop.demoUI;
```


####4. index.html 중 도입된 UI js

기본 상황에서 IDE 는 index.html 에서 자동으로 편집된 UI 종류를 도입할 것입니다.제시한 대로.여기에서 우리가 알았으면 좋겠는데, 문제가 생기면 여기로 와도 된다.

![图3](img/3.png)  


(그림 3)



##IDE 생성 페이지 표시

2-2의 test.ui 편집 페이지

####1, 먼저 내보내는 UI 종류


```typescript

//引入test页面的UI类
import testUI = ui.testUI;
```


####2, 개인 로드 방법 만들기, UI 도집 자원 재생

이 방법에서 도입된 testui의 대상을 test 에게 실례화한 후 무대에 첨가한다.


```typescript

private onLoaded():void{
        //实例化UI界面
        var test:testUI = new testUI();
        //把实例后的UI界面添加到舞台
         Laya.stage.addChild(test);
    }
```


####3. 페이지에 사용된 그림 자원을 가재한 후 리코어를 통해 UI 를 무대에 표시합니다.


```typescript

//加载页面中的图集，并将页面显示
Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(this, this.onLoaded));
```


####4, 완전한 코드

예시 빈 항목의 입구 프로그램 Layasample.ts


```typescript

//引入test页面的UI类
import testUI = ui.testUI;
class GameMain{
    constructor()
    {
        Laya.init(600,400);
      	//加载页面中的图集，并将页面显示
        Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(this, this.onLoaded));
    }

    private onLoaded():void{
        //实例化UI界面
        var test:testUI = new testUI();
        //把实例后的UI界面添加到舞台
         Laya.stage.addChild(test);
    }
}
new GameMain();
```




>> 이 문서는 매우 기초적이며 간단합니다. 만약 UI 를 나타내지 못하면 이 문서의 절차를 엄격하게 따라 명명함까지 일치해야 합니다. 우선 문제 없이 재활 시도를 하십시오.