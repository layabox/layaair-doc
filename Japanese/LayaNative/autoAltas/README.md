#オートコレクションシステム

##1.概要

アプリケーションの動作効率を最適化するために、DrawCallを低減し、LayaNativeには自動大図セット管理システムがあります。イメージの幅と高さが512以下の場合、画像は自動的に大集合に統合されますが、開発者が使用する方法は変更されません。

自動大図セットの数を作成します。LayaNativeは設備メモリの状況によって、デフォルトでいくつかのパラメータを配置しています。すべての大図セットが満杯になったら、システムは自動的に整理されます。大図セットの数が予め設定された個数を超えないように確保します。

デフォルト設定のパラメータは以下の通りです。


```javascript

var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.atlasNum = 10;//10张 每张为1024*1024
    conchConfig.maxTextureMemSize = 64 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 16;//16张 每张为1024*1024
    conchConfig.maxTextureMemSize = 84 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
```



##2.大図の集合の数はどのように配置しますか？

各プロジェクトには特殊性があるので、開発者も自分のニーズに合わせて設定できます。config.jsで設定する必要があります。コードは以下の通りです。


```javascript

var loadingView= window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;
    loadingView.bgColor("#ffffff");
    loadingView.setFontColor("#000000");
    loadingView.setTips(["新世界的大门即将打开", "敌军还有30秒抵达战场", "妈妈说，心急吃不了热豆腐"]);
}
//在这进行设定
var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.atlasNum = 15;//15张 每张为1024*1024
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
}
else if (nMem > 1048576) {
     conchConfig.atlasNum = 30;//30张 每张为1024*1024
}
```


**Tips：この現存池sizeの設定はアプリケーションが起動し始めたところに置かなければならないので、プログラム中はダイナミックに設定できません。config.jsはLayaPlayerが起動したらすぐに実行するjsですので、ここに置くのが一番安全です。**  


##3.config.jsはどこにありますか

iosバージョン：プロジェクトディレクトリの下のresource\scripts\config.js
androidバージョン：工程目録の下のクラスメイト\scripts\config.js


##4.自動大図集にイメージを入れるサイズ制限を設定します。

上記で述べたように、imageの幅と高さが512以下の場合、自動的に大図集に統合されます。LayaNative-00.90以降、開発者はconfig.jsでこのsizeの値を設定できます。コードは以下の通りです。

```javascript

conchConfig.pushAtlasLimitSize = 256;//当图片size小于256的时候，合并到大图合集中
```



##5.特別な説明

なお、大図集中の画像にマージすると、イメージが削除された後、現像はすぐには解放されません。この大図集は他の画像が残っていますので、すぐにグラフィックカードから削除することはできません。しかし、自動大図セットマネージャは、これらの表示のライフサイクルを自動的に管理し、これらの大きな図セットが表示の数を一定の値に占めることを保証します。例えば、10枚に設定して、図セットのサイズは1024*1024で、現存は40 MBを占用します。
