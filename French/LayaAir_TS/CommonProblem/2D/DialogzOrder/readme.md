#Définir un niveau d 'objet d' affichage au - dessus de dialog

Dans l 'élaboration du projet, on utilise généralement des fonctions telles que le glisser - déposer, les fenêtres de mode, etc., de la boîte de dialogue d' éjection et de la boîte de dialogue; c 'est - à - dire l' ensemble dialog.

Il se peut que les développeurs rencontrent un problème courant lorsqu 'ils utilisent la page dialog, c' est - à - dire lorsqu 'ils veulent cliquer sur un bouton de cette page pour afficher d' autres pages, qu 'ils découvrent alors que la page à afficher n' apparaît pas.

Etant donné que le niveau par défaut de dialog est de 1000 dans la classe dialogmanager du gestionnaire de boîte de dialogue, il faut que l 'objet affiché soit affiché au - dessus du dialog.**Définir le niveau de zorder > 1000 de l 'objet affiché**".Sinon, la dernière page à afficher sera masquée par dialog.Les codes clefs et leurs effets sont les suivants:


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