# Texture2D的GPU纹理压缩的使用

###### *version :2.1.0   Update:2019-5-25*

2.0の正式版でテクスチャという機能をサポートしました。Unityエクスポート時は、ツールパネルで対応するプラットフォームをチェックしてエクスポートすればいいです。

！[](img/1.png)<br/>(図1)

**IOSとAndroid**テクスチャ圧縮機能をサポートしています。AndroidとIOSのテクスチャ圧縮画像は全く違っていますので、資源は3つに分けなければなりません。

**Convetional**汎用プラットフォームは、普通のJPGとPNGだけです。

エクスポート後のリソースリストを見てみます。

！[](img/2 png)<br/>(図2)

エクスポート後に3つの異なるフォルダに分けられ、対応する3つのプラットフォームが使用できるリソースです。

テクスチャ圧縮使用例（[地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Texture&name=TextureGPUCompression))

ここで使いました`URL.basePath`方法は、ロードパスを設定し、異なるプラットフォームから異なるリソースをロードし、圧縮テクスチャを使用します。


```typescript

if (Laya.Browser.onAndroid)
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Android/";
else if (Laya.Browser.onIOS)
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/IOS/";
else
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Conventional/";

Laya.Scene3D.load("scene.ls", Laya.Handler.create(.......));
```


