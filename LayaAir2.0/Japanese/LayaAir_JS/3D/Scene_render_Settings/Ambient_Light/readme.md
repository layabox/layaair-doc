#シーン環境光

###### *version :2.0.1beta   Update:2019-3-19*

####Unityを使って環境光をエクスポートします。

Unityで設定したLightingパネルで、Sceneタブページを選択して、その中の`Environment`的に命中する`Environment Lighting`エントリ

！[](img/1.png)<br/>(図1)

**ソurce**光源オプションは現在SkyboxとColorの2種類が使えます。

**Ambient Color**環境光の色。Colorに設定した場合の環境光の色です。

**Ambient Mode**環境モードは、使用のみ可能です。`Realtime `リアル・タイム・ライト

設定後の色または調整

####コードを環境光に設定する

環境光の色（ambientColor）は、材質を色に合わせて染色し、材質をある色の色調に近づけます。また、材質を明るくして、ランプボックスの発光効果を模擬します。スカイボックスが設置されていますが、設定されていません。`Scene3D`シーンの`AmbientColor`では、LayaAir 3 Dはデフォルトで環境光を空の箱から供給します。


```typescript

//设置场景环境光
scene.ambientColor = new Laya.Vector3(0.6, 0, 0);
```


効果は以下の通りです。

！[](img/2 png)<br/>(図2)

