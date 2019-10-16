#表示オブジェクトの階層をDialogの上に設定します。

プロジェクト開発では通常、ポップアップダイアログやダイアログのドラッグ、モードウィンドウなどの機能が使われます。つまりDialogコンポーネントです。

開発者は使う過程でよくある問題に出会うかもしれません。Dialogページがポップアップした後、このページのボタンをクリックして他のページを表示したいと思ったら、表示するページが表示されていないことが分かります。なぜですか？

ダイアログマネージャDialog Manager類にdialogを設定しているデフォルトの階層は1000なので、Dialog上に表示させるには必要です。**この表示オブジェクトの階層zOrder>1000を設定します。**。最後に表示するページはDialogで覆われます。キーコードと効果は以下の通りです。


```typescript

//实例化Dialog页面
var dia = new ui.TestDialogUI();
//显示对话框（以模式窗口方式显示）
dia.popup();
//显示对话框（以非模式窗口方式显示）
//dia.show();
//点击对话框上的按钮弹出另外一个UI页面
dia.btn.on(Laya.Event.CLICK,this,onClick);
function onClick()
{
    // TODO Auto Generated method stub
    //实例UI界面
    var testView = new ui.TestView();
    Laya.stage.addChild(testView);
  	//设置该页面的层级>1000
    testView.zOrder = 1001;

}
```


![1](img\1.png)