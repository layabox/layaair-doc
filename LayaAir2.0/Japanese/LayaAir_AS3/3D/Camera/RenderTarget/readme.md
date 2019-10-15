#ターゲットテクスチャの使用

###### *version :2.0.1beta   Update:2019-3-19*

ターゲットテクスチャとはカメラのことです。**RenderTarget**を選択します。カメラのビューを他のオブジェクトに適用できるテクスチャ上に配置します。これで鏡を簡単に作ることができます。監視カメラなどの効果があります。なお、このプロパティを使用したカメラは、スクリーンにレンダリングする機能を無効にします。

ここで使用する例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=RenderTargetCamera)）のコードを入力します。cameraはシーンレンダリングカメラであり、レンダーTarget CameraはRenderTargetプロパティを開くカメラである。


```typescript

//设置目标纹理
renderTargetCamera.renderTarget = new RenderTexture(2048, 2048);
//设置顺序
renderTargetCamera.renderingOrder = -1;
```


LayaAirエンジンでレンダリング順序は小さいほどレンダリング優先度が高いです。


```typescript

//获取场景中预先放置的屏幕
var renderTargetObj:MeshSprite3D = scene.getChildAt(0).getChildByName("RenderTarget") as MeshSprite3D;
//在按钮点击后  将目标纹理赋值给屏幕。
changeActionButton.on(Event.CLICK, this, function():void {
					(renderTargetObj.meshRenderer.material as BlinnPhongMaterial).albedoTexture = renderTargetCamera.renderTarget;
                });
```


！[](img/1.png)<br/>(図1)ボタンをクリックする前に

！[](img/2 png)<br/>(図2)ボタンをクリックした後