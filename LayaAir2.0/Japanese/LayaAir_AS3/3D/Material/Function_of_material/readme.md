#材質の機能紹介

###### *version :2.1.0beta   Update:2019-5-14*

###1.モデルから素材を取得する

エクスポートしたモデルを使うと、エンジンは自動的にモデルに材質をロードします。また、一つのモデルにはいくつかの標準材質があります。自動的に開発時間を節約してくれます。しかし、このような状況で、もし私達が材質を変えたり、変えたりしたらどうですか？まずモデルから現在の材質を取得する必要があります。

LayaAir 3 Dエンジンは、メッシュレンダリタMeshRenderer類と蒙皮動画メッシュレンダリタSkinedMeshRendererを提供しています。テレビモデルでそれらの実例を提供しています。それらを通じてモデル上の材質を取得することができます。

​**Tips**：Mesh Sprite 3 DモデルはmeshRendererで、SkinedMesh Sprited 3 DモデルはskinedMesh Rendererです。

######この二つの種類の多くは父類から継承された共通のインターフェースです。父類を見ることができます。**BaseRenderer**のAPI([API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.render.BaseRender)を選択します。

取得した材質は2種類に分けられます。

素材自体**Material**自分の材質が修正されたら、自分の模型の表示だけが変化します。

共有素材**Shared Material**材質が独立しているため、複数のモデルは同じ材質で使用できます。取得したのは共有材質であり、修正したのであれば、自身のモデルの表示は変わります。他のモデルはこの材質を使う部分も変わります。

！[](img/1.png)<br/>！

どのように使うかは、開発者たちが具体的なニーズに応じて自分で選ぶべきです。

以下は要約コードです。具体的なコードはデモを見ることができます。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=MaterialDemo)を選択します。

！[](img/3 png)<br/>(図3)

>グリッドレンダリングでモデルの材質を取得する


```typescript

//初始化3D场景
var scene:Scene3D = Laya.stage.addChild(Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls")) as Scene3D;
//从场景获取球型精灵
sphere = scene.getChildByName("Sphere") as MeshSprite3D;
//获取球型精灵自带的BlinnPhong材质
billinMaterial = sphere.meshRenderer.material;
```


>材質を手に入れたら、材質を変えたり、他のモデルに使ったりします。ここで私達は上に持ってきた材質を新たに作成したボールに追加します。
>


```typescript

//代码创建一个球体
var sphere2:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(0.5))) as MeshSprite3D;
//将创建的球放置在导出球的同一点
sphere2.transform.position =  sphere.transform.position;
//将创建的球平移
sphere2.transform.translate(new Vector3(0, 1.3, 0),false);
//将从导出球上拿到的材质 贴给代码创建的球
sphere2.meshRenderer.material = billinMaterial;
```


その後、効果が見られます。図4に示すように、

！[](img/4 png)<br/>(図4)

###2.モデルの材質を修正する

素材を手に入れることができる以上、自然と材質を変えることができます。

同じメッシュの精霊を通っていますか？`meshRenderer`グリッドレンダリングを変更します。


```typescript

......
//创建一个新的PBRStandard材质
pbrStandardMaterial = new PBRStandardMaterial();
//获取新的纹理
pbrTexture = Loader.getRes("res/threeDimen/texture/earth.png") as Texture2D;
//为PBRStandard材质设置漫反射贴图
pbrStandardMaterial.albedoTexture = pbrTexture;
//修改导出球的材质
sphere.meshRenderer.material = pbrStandardMaterial;
```


！[](img/5 png)<br/>(図5)

###3.影を受けることができるかどうか

前に影を落とす**照明編**の**ライトに影を付けるにはどうすればいいですか？**節に紹介があります[地址](https://ldc2.layabox.com/doc/?nav=zh-as-4-6-4)を選択します。ここでは材質の中で設定したい属性だけを説明します。

レンタクラスの`castShadow`影と影が生まれるかどうか`receiveShadow`影を受け入れることができますか？

>下のコードは影の例から来ています。


```typescript

//前面给灯光设置好阴影参数之后，获取猴子模型与地板模型并且分别设置产生阴影与接受阴影
//地面接收阴影
var grid:Sprite3D = scene.addChild(Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Sprite3D;
//设置地板可以接受阴影
(grid.getChildAt(0) as MeshSprite3D).meshRenderer.receiveShadow = true;

//获取一个静态网格猴子
var staticLayaMonkey:MeshSprite3D = scene.addChild(new MeshSprite3D(Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm"))) as MeshSprite3D;

//省略调整猴子的代码.....

//设置静态网格猴子产生阴影
staticLayaMonkey.meshRenderer.castShadow = true;

//获取蒙皮网格猴子
var layaMonkey:Sprite3D = scene.addChild(Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh")) as Sprite3D;

//设置蒙皮网格猴子可以产生阴影
(layaMonkey.getChildAt(0).getChildAt(0) as SkinnedMeshSprite3D).skinnedMeshRenderer.castShadow = true;
```


！[](img/6.png)<br/>(図6)

###4.材質の最適化について

エンジンはローディングシーンで物体を統合処理し、シーン性能を大幅に向上させる。原則としては同じ材質のモデルですので、開発者はシーンモデルを編集する時にできるだけ同じ材質を使います。これにより、今後の性能最適化のための最も基本的な条件を達成することができます。もっと具体的には今後の性能最適化編で解説します。