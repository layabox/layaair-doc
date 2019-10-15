#場面空

###### *version :2.0.1beta   Update:2019-3-19*

スカイボックスは、シーンをより広く見せる視覚技術で、シームレスにドッキングした閉鎖的なテクスチャでカメラの視角360度を無死角に包んでいます。ここでは私達が簡単に空の箱を見せて使って、空の箱は続きます。**LayaAir 3 Dの空**篇の解説

####Unityを使って環境空を設定するにはどうすればいいですか？

Lightingの`Scene`シーンラベルページで、Evironment環境の中の`SkyBox Material`スカイボックスの材質はこの項目です。

！[](img/1.png)<br/>(図1)

**注意**：使用する材質はLayaAir 3 D-Sky下のShaderでなければなりません。

あらかじめ用意したスカイボックスの材質を中に引きずり込んでいけばいいです。（または右の設定ボタンを押して、自分で用意しておいたスカイボックスの材質を選択します）。

！[](img/2 gif)<br/>(図2)

セットしたら空の箱を使ってエクスポートできます。

####コードを使ってシーン空をセットします。


```typescript

var camera = scene.getChildByName("Main Camera");
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);

//加载相机天空盒材质
Laya.BaseMaterial.load("res/threeDimen/skyBox/skyBox1/SkyBox.lmat", Laya.Handler.create(null, function(mat) {
    var skyRenderer = camera.skyRenderer;
    skyRenderer.mesh = Laya.SkyBox.instance;
    skyRenderer.material = mat;
}));
```


効果は以下の通りです。

！[](img/3 png)<br/>(図3)

