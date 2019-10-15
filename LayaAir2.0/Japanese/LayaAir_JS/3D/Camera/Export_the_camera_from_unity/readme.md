#Unityからカメラを編集してエクスポートします。

###### *version :2.0.1beta   Update:2019-3-19*

エンジン1.7.10版とユニティ導出プラグイン1.5.0版がリリースされた後、ユニティで作成されたカメラがエクスポートされます。また、ファイルのエクスポートは、カメラの3 D空間における位置、画角、背景色、キャリアカット、視野などのパラメータを保持しています。エクスポート後のシーンをロードすると、表示される画面効果はunityと完全に一致し、開発者たちがカメラの画角を制御するのに便利です。

また、LayaAir 3 Dエンジンはマルチカメラに対応していますので、unityに複数のカメラを設置して導き出すこともできます。マルチカメラについては、この授業の最後のところをご覧ください。**「マルチカメラウィンドウマシン使用」**小節

###Unityでカメラを編集します。

ユニティにCameraカメラを作成します。カメラパネルを表示:

！[](img/1.png)<br/>(図1)

**エクスポートに対応するカメラの設定**:

Transformはコンポーネントを選択します。カメラの調整ができます。**Position**位置、**Rotation**選択と**Scale**拡大縮小

Background背景は、空の箱がない場合、選択した色を残りのスクリーンに適用します。

Curlling Maskはカバーを取り除き、オブジェクトを含むか無視するLayerを含みます。

Projection投射。Perspective透視投影、Orthography直交投影。

Sizeサイズです。直交カメラが設置されているときの視角サイズ。

Field of View視野範囲。カメラの画角の幅、および縦の角度の寸法。

Clipping Planesカット平面。カメラからレンダリング開始までの距離。

Nearの近くに切断面があります。

Far遠裁断面

Viewport Rect视口矩形。

x:カメラビューは、水平位置の始点を描画します。

y：カメラビューで描画する垂直位置の始点です。

w：カメラがスクリーンに出力される幅です。

h：画面の高さにカメラが出力されます。

Depth深さ。図形描画の順序

ターゲットテクスチャ。

###コードを使ってエクスポートされたカメラを取得します。

では、unityでカメラを作成してエクスポートした場合、コードにファイルをロードした後、カメラはどうやって取得しますか？これはシーンのサブノードインデックスや名前で取得できます。取得後は移動回転、スカイボックスの設定、スクリプトの追加などの操作もできます。

コードは以下の通りです


```js

class LayaAir3D
{
    constructor() 
    {
        //初始化引擎
        Laya3D.init(1000, 500,true);            
        //适配模式
        Laya.stage.scaleMode = Stage.SCALE_FULL;
        Laya.stage.screenMode = Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();            
        //预加载角色动画资源
        Laya.loader.create("monkey/monkey.ls",Laya.Handler.create(this,this.onSceneOK));
    }        
    
    onSceneOK()
    {
        //添加3D场景
        var scene = Laya.loader.getRes("monkey/monkey.ls");
        Laya.stage.addChild(scene);  
        //从场景中获取摄像机
        var camera = scene.getChildByName("Main Camera");
        //后续对摄像机的逻辑操作.......
    }
}
```


Unitiyではカメラはデフォルトで「Main Camera」と呼ばれていますので、上記のコードでは、sceneのget ChildByName（「Main Camera」）方式により、後続の論理操作のためにカメラを入手しました。開発者たちはユニティでカメラの名前をカスタマイズすることもできます。

