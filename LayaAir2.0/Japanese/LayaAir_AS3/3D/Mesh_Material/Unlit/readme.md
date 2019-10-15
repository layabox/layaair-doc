#Unilit材質詳細

###### *version :2.1.0beta   Update:2019-5-14*

**Unilitは光を受けません**材質。この材質の最大の特徴は、光の影響を受けず、最も省性能であることです。この材質は元のスタンプを直接表示するタイプです。

####主な属性と方法

>属性

`albedoColor:Vector4`反転率の色。

`albedoIntensity:Number`反射率強度

`albedoTexture:BaseTexture`照り返し率スタンプ

`enableVertexColor:Boolean`頂点色をサポートしますか？

`renderMode:int`[write-only]レンダリングモードを設定します。

`tilingOffset:Vector4`テクスチャのフラットとオフセット。

####材質の作成と使用

図1では左に使うBlinnPhongの材質で、右に使うのがUnilitの材質です。二つのコントラストはユニティの特徴をよりよく表します。詳細は表示できます[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=UnlitMaterialDemo%3E)）0


```typescript

//创建Unlit材质
var material2:UnlitMaterial = new UnlitMaterial();
//加载纹理
Texture2D.load("res/threeDimen/texture/earth.png", Handler.create(this, function(texture:Texture2D):void {
    //设置反照率贴图
    material2.albedoTexture = texture;
}));
earth2.meshRenderer.material = material2;
```


！[](img/1.png)<br/>(図1)

