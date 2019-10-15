#Config 3 D紹介

###### *version :2.2.0  Update:2019-8-24*

###Config 3 Dに関する紹介

このクラスは3 D初期化設定を作成するために使用されます。

|属性124; 124124124;データタイプ124;のデフォルト値124;
|---------------------------------------------------|-----------------------------|
|isAntialias𞓜がギザギザ防止を開くかどうか
アイリスAlphaキャンバスは透明ですか？
premultiplied Alpha|設定キャンバスは事前に掛けるかどうか？
カンバスを設置するかどうかはテンプレートバッファを開くかどうか。
|octree Cling|が八叉の木を開いて裁断するかどうか
|octree Initial Size八叉樹初期化サイズ𞓜Number 124; 64.0|
|octree Initial Center|八叉樹初期化センター|Vector 3|（0,0）|
|octree MinNodeSizeヤツキの最小サイズ𞓜Number|2.0|
|octreeLooseness𞓜八叉樹の松散値𞓜Number 124; 1.25𞓜
|debugFustum Curlling|がコーン裁断調整を開始しているかどうか

**テーパを見てデバッグする時の注意：**

八叉の木を開いて裁断すると、赤いピクセルを使って、高いレベルの八叉の木のノードを描いて箱を囲みます。円錐が完全に八叉のツリーノードを含む場合、八叉のツリーノードの囲いボックスと精霊の囲いボックスは青になる。完全に含まれていない八叉ツリーノードのピクセルラインは、深さ値に基づいて色を計算します。精霊の囲いボックスは、所属する八叉樹ノードの囲いボックスの色と一致していますが、八叉樹ノードがボックスを囲む画素線は半透明です。

！（℃）<br/>（図1）八叉の木を使って裁断しました。

八叉の木を開けないで裁断すると、緑色の画素線を使って精霊の包囲箱を描きます。

！（℃）<br/>（図2）八叉の木を使っていませんでした。

>Method Detail


 `defaultPhysicsMemory`物理機能はメモリを初期化し、単位はMです。

注意：メモリは16 M以上でなければなりません。

​**Implementation**

public function set default Physics Memory(value:int)：void

public function get default Physics Memory()：int



###どうやってConfig 3 Dを設定しますか

まずconfig 3 Dを作成し、必要なパラメータを設定した後、Laya 3 D初期化時に使用します。


```typescript

//创建一个config3D
var _config:Config3D = new Config3D();
//设置不开启抗锯齿
_config.isAntialias = false;
//设置画布不透明
_config.isAlpha = false;
//使用创建的config3d
Laya3D.init(0, 0, _config);
```


**注意：Config 3 Dは一度設定したら、もう修正できません。最初から設置しなければなりません。**