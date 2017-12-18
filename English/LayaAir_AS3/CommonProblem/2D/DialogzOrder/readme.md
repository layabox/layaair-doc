# Set the display object hierarchy on top of Dialog

In the development of the project, the pop-up dialog, the drag of the dialog box, the mode window and other functions, are used in the development of the project; that is, the Dialog component.

Developers may have a common problem in the process of using Dialog page pops up, if you want to click a button on the page display pther pages, this time will find that the page to display is not displayed, Why is this?

Because the default level, dialog box manager DialogManager class is 1000, so if you want the display object to be displayed on Dialog, you need ** setting the level zOrder>1000 ** of the display object. Otherwise the final page to be displayed will be covered by the Dialog. The key code and the effects are shown below : 

```typescript
//实例化Dialog页面
var dia:TestDialogUI = new TestDialogUI();
//显示对话框（以模式窗口方式显示）
dia.popup();
//显示对话框（以非模式窗口方式显示）
//dia.show();
//点击对话框上的按钮弹出另外一个UI页面
dia.btn.on(Event.CLICK,this,onClick);
private function onClick():void
{
    // TODO Auto Generated method stub
    //实例UI界面
    var testView:TestView = new TestView();
    Laya.stage.addChild(testView);
  	//设置该页面的层级>1000
    testView.zOrder = 1001;

}
```

![1](img/1.png)
