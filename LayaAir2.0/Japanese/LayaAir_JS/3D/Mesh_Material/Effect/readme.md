#Effect材質詳細

###### *version :2.1.0beta   Update:2019-5-14*

Effect Materailの特殊な材質は、混合モードによって光の効果が発生します。この材質はよく特殊効果を使います。

####主な属性と方法

>属性

`color:Vector4`色です。

`renderMode:int`[write-only]レンダリングモードを設定します。

`texture:BaseTexture`割り付け図

`tilingOffset:Vector4`テクスチャのフラットとオフセット。

####Effect素材の作成と使用

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=EffectMaterialDemo))


```typescript

var earth = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere()));

earth.transform.position = new Laya.Vector3(0, 0, 0);
//创建EffectMaterial材质
var material = new Laya.EffectMaterial();
//加载地球贴图
Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture) {
    //设置纹理
    material.texture = texture;
}));
earth.meshRenderer.material = material;
```


！[](img/1.gif)<br/>(図1)
