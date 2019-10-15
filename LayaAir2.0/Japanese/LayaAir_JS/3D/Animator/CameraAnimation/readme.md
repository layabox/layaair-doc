#カメラアニメーションの使用

###### *version :2.1.0beta   Update:2019-6-13*

LayaAir 3 Dプラグインは、カメラの動画配信に対応しています。unityで編集してエクスポートして使うことをオススメします。

以下の例では、動画は簡単なモバイルカメラでしか編集できません。材質アニメーションのようにカメラにAnimtorのセットを追加し、アニメーションを設定します。エクスポート後に使用します。

この動画ではカメラの位置を変えていくだけで、Cubeの位置は変わっていません。

！[](img/1.png)<br/>(図1)

シーンをエクスポートした後、シーンに追加すると効果が見られます。


```typescript

Laya.Scene3D.load('LayaScene_scene/Conventional/scene.ls',Laya.Handler.create(this,function(scene){
    Laya.stage.addChild(scene);
}));
```


！[](img/2 gif)<br/>(図2)