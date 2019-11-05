# BlinnPhong材质详解

###### *version :2.1.0beta   Update:2019-5-14*

Unityでは標準とその他の材質がLayaAir標準の材質と異なるため、開発者が導出した3 D資源を使うと、美術効果はUnityとは違っています。コードの中で各種の材質属性パラメータを修正したり、照明を調整してから必要な効果が得られます。開発者たちに不便をもたらします。

LayaAirエンジンにおける動作効果をUnityで調整された美術効果と一致させるために、LayaAir公式はUnityでプラグインを導出し、エンジンにBlinnPhonigMaterialの材質を追加し、開発者たちが見たとおりに、コード修正の美術効果の時間を短縮し、作業効率を向上させることができます。今後の開発には、この素材をできるだけ使うことを提案します。

####主な属性と方法の詳細：

>属性

`albedoColor:Vector4`反転率の色。

`albedoIntensity:Number`反射率強度

`albedoTexture:BaseTexture`照り返し率スタンプ

`enableLighting:Boolean`光を有効にしますか？

`normalTexture:BaseTexture`法線図解

`renderMode:int`[write-only]レンダリングモードを設定します。

`shininess:Number`高い光強度は、0から1の範囲です。

`specularColor:Vector4`ハイライト色

`specularTexture:BaseTexture`ハイライト。

`tilingOffset:Vector4`テクスチャのフラットとオフセット。



####シーンをワンタッチでBlinnPhong素材に変換します。

新しいプラグインをインストールした後、Unitiy LayaAir 3 Dメニューにワンタッチでシーンの材質をBlinnPhong材質に変換する機能を追加しました。メニューLaya Air Tool-->Switch Shader to LayaBlinnPhongオプションをクリックすると、リソースインターフェースのモデルが紫色になり、シーンの効果も変化します。

！[](img/1.png)<br/>(図1)

マウス選択シーンの任意のモデルは、右側のInspectorパネルに新しい材質のShaderタイプが出現しているのを見ることができます。材質の属性はユニティのStandard標準の材質とは違っています。たくさん簡略化されています。LayaAirがサポートしていない属性がいくつか削除されました。これらの特性を修正することでモデルの表示を変更することができます。

！[](img/2 png)<br/>(図2)

####手でBlinnPhongの材質に修正します。

一般的にはメニューのキーを使ってBlinnPhongの材質に変換することをおすすめします。このようなシーンの材質は全部修正されます。材質が見つけられない、見落としられないため、修正されていないことがあります。

もちろん、新素材を作成する際にデフォルトで生成されるのは標準素材です。開発者が手で材質を修正する必要があるShaderタイプはBlinnPhongです。プラグインをインストールしたら、材質パネルのShaderタイプにLayaAir 3 Dオプションが現れます。修正して使ってください。（図3）

![图片4](img/3.gif)<br/>(図3)

BlinnPhong材質の光色スタンプの属性は基本的に標準の材質と一致しています。ユニティで材質パネルは以下の属性を調整できます。

#####拡散反射スタンプ

**DiffuseMap（拡散反射パッチ）**ゲームでは物体の表面の反射と表面の色を表現します。言い換えれば，物体が光に照射されて現れる色と強度を示すことができる。図9のように、もっと詳しいのは元のデモを見ることができます。[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_DiffuseMap%3E)を選択します。


```typescript

var material = new Laya.BlinnPhongMaterial();
//漫反射贴图
Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture) {
    //设置材质纹理
	material.albedoTexture = texture;
}));

earth2.meshRenderer.material = material;
```


！[](img/4 png)<br/>(図4)

#####法線図解

**Normal maps（法線スタンプ）**は、図10に示すように、オブジェクトの高さ図として、凹凸の表面を表示することができます。[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_NormalMap%3E)を選択します。


```typescript

var material = meshSprite3D.meshRenderer.material;
//法线贴图
Laya.Texture2D.load(normalMapUrl[i], Laya.Handler.create(this, function(texture) {
    //设置发现贴图
    material.normalTexture = texture;
}));
```


！[](img/5 png)<br/>(図5)

#####ハイライト

**SpecularMap(ハイライト)**光が模型の表面に照射されると、その表面の性質を表すものです。（金属と皮膚、布、プラスチックの反射量が異なる光など）。高光スタンプ再エンジンは鏡面反射と物体表面の高光色を表現します。材質の反射度が強いです。図7のように、より詳細には、公式例を参照することができる（[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_SpecularMap%3E)を選択します。


```typescript

//获取Sprite3D上的蒙皮网格精灵节点
var skinnedMeshSprite3d = dude2.getChildAt(0).getChildAt(0);
//历遍蒙皮网格节点的材质列表
for (var i:int = 0; i < skinnedMeshSprite3d.skinnedMeshRenderer.materials.length; i++) {
    //获取对应材质
    var material = skinnedMeshSprite3d.skinnedMeshRenderer.materials[i];
    //加载对应的贴图
	Laya.Texture2D.load(specularMapUrl[i], Laya.Handler.create(this,function(mat, tex) {
        mat.specularTexture = tex;//设置高光贴图
    }, [material]));
}
```


！[](img/6.png)<br/>(図6)
