#Render Textureの深さフォーマット

###### *version :2.1.0   Update:2019-5-25*

コンピュータグラフィックスにおいて、**深さバッファ**三次元図形で画像の深さ座標を処理するプロセスであり、このプロセスは通常ハードウェアで実行され、ソフトウェアでも実行可能であり、可視性問題の解決法である。

LayaAir 3 Dでサポートされている深さバッファフォーマットは以下の通りです。

​`FORMAT_DEPTH_16`

​`FORMAT_STENCIL_8`

​`FORMAT_DEPTHSTENCIL_16_8`

####コードに深さの書式を設定します。


```typescript

......
//选择渲染目标为纹理
renderTargetCamera.renderTarget = new RenderTexture(2048, 2048);
//设置深度格式
renderTargetCamera.renderTarget.depthStencilFormat = BaseTexture.FORMAT_DEPTH_16;
......
```


（demo住所）
