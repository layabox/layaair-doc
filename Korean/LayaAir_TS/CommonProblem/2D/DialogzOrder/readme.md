#디스플레이 대상 등급이 Dialog 위에 위치합니다

프로젝트 개발에서는 일반적으로 대화상자 및 대화상자의 드래그, 모드 창 등 기능을 사용합니다. 즉 다이얼 구성 요소입니다.

개발자가 사용하는 과정에서 흔한 문제가 생길 수 있다. 바로 다이얼 페이지가 튀어나온 후 이 페이지의 어떤 단추를 누르려면 다른 페이지를 표시할 수 있다. 이때 표시할 페이지가 나타나지 않았다는 것을 발견할 수 있다. 왜일까?

대화상자 관리자 DialogManager 종류에 디스플레이 기본 등급이 1000이 설치되었기 때문에 디스플레이 대상에 디스플레이를 표시하려면 Dialog 위에 나타나면 필요합니다**이 디스플레이 대상 수준 zOrder 설정 1000**.그렇지 않으면 마지막으로 표시할 페이지는 Diaalog에 가려진다.열쇠 코드 및 효과 다음과 같습니다:


```typescript

//实例化Dialog页面
var dia:ui.TestDialogUI = new ui.TestDialogUI();
//显示对话框（以模式窗口方式显示）
dia.popup();
//显示对话框（以非模式窗口方式显示）
//dia.show();
//点击对话框上的按钮弹出另外一个UI页面
dia.btn.on(Laya.Event.CLICK,this,this.onClick);
private onClick():void
{
    // TODO Auto Generated method stub
    //实例UI界面
    var testView:ui.TestView = new ui.TestView();
    Laya.stage.addChild(testView);
  	//设置该页面的层级>1000
    testView.zOrder = 1001;

}
```


![1](img\1.png)