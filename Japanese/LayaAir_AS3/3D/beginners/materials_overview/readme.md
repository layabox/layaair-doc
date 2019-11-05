##LayaAir 3 D素材の概要

###材質の概要

材質は物体の素材の質感で、例えば木、金属、ガラス、毛髪、水など、それらの粗さ、光沢度、反射、透明、色、テクスチャなどの材質の属性は違います。

ほとんどの3 Dエンジンは独立した材質がプログラムコードのコントロールに使われています。3 D制作ソフトの中で材質処理も一番重要な部分の一つです。ゲーム美術開発者たちはいつも3 Dゲームのシーンでモデルを見て、7分は材質によって作られます。

材質の種類もたくさんあります。三次元製作ソフトには標準材質、多次元材質、合成材質、両面材質、光線追跡材質などがあります。LayaAir 3 Dエンジンで現在主に支持されているのは標準素材のStandardMatrialです。



###標準素材の作成

コード内のモデルに素材がない場合、3 Dビューではモデルのテクスチャや質感などが表示されません。デフォルトは純白です。

「3 Dのクイックオープン」コースのコードには、標準的な素材を使って拡散反射スタンプにテクスチャー画像を追加し、モデルを付与しました。


```java

//创建标准材质
var material:StandardMaterial = new StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Texture2D.load("res/layabox.png");
//为box模型赋材质
box.meshRender.material = material;
```


もちろん、これは簡単な使い方です。一番重要な拡散反射板だけを使って、より良い美術効果を達成するために、開発者は材質の光と贴图の属性を理解しなければなりません。



###材質のロード

「LayaAir 3 Dモデル」編では、モデルグリッドと材質の2つの部分を含み、ロード.ls，lhデータの場合、モデルに対応する材質は自動的にロードされます。

最新のエンジンバージョンでは、モデルグリッドと材質が分離されています。unityエクスポートプラグインツールは、素材とエクスポートされたlmモデルファイルを結合しません。したがって.lmフォーマットのリソースをロードすると，その材質を新たに与えてこそ完全に表示されます。そうでないとホワイトモードとして表示されます。

この場合は、エクスポート後に発生するlmatの材質ファイルを使用して、標準的な材質を作成し、モデルを付与することができます。モデルのロードと似ています。


```java

//异步加载材质文件创建标准材质（也可以预加载）
var material:StandardMaterial = StandardMaterial.load("truck/Assets/Materials/t0200.lmat");
//为box模型赋材质
box.meshRender.material = material;
```




###ローディングしたモデルから素材を取得します。

上記の例では標準的な材質を作成しましたが、実際のプロジェクトではコードを使ってモデルに材質を与えることが少ないです。直接に3 Dソフトで作ったり、ユニティで材質を作ったりして、ツールでLayaAir形式を導出してから使います。

使用時にエンジンは自動的にモデルに材質をロードします。また、一つのモデルにはいくつかの標準的な材質があります。自動的に開発時間を節約してくれます。しかし、このような状況で、もし私達が材質を変えたり、変えたりしたらどうですか？まずモデルから現在の材質を取得する必要があります。

LayaAir 3 Dエンジンは、私たちにメッシュレンダリング器MeshRender類と蒙皮アニメーションメッシュレンダリタSkinedMeshRenderを提供しています。テレビモデルでそれらの実例を提供しています。それらを通じてモデルの材質を取得することができます。

Tips：Mesh Sprite 3 DモデルはMeshRenderで、SkinedMesh Sprited 3 DモデルはSkinedMeshRenderです。

取得した材質は二つの種類に分けられています。一つは自分の材質のMaterialで、もし自身の材質が修正されたら、自分の模型の表示だけが変化します。一つは共有材質のShardMaterialです。材質が比較的独立しているため、複数のモデルは同じ材質を使用できます。取得したのは共有材質であり、修正されたら、自身のモデルの表示は変化します。他のモデルはこの材料を使用します。質の部分も変わる。そのため、開発者は状況に応じて選択する必要があります。



####自身の材質を取得し、変更します。


```java

......
//加载导出的卡车模型
var role3D:Sprite3D=Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
role3D.on(Event.HIERARCHY_LOADED,this,onLoadComplete,[role3D]);
scene.addChild(role3D);
/** 模型与材质加载完成后回调***/		
private function onLoadComplete(role3D:Sprite3D):void
{
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身"body",它们都用同一个材质）
  var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //从模型上获取自身材质
  var material:StandardMaterial=meshSprite3D.meshRender.material;
  //修改材质的反射颜色，让模型偏红
  material.albedo=new Vector4(1,0,0,1);	
}
```


コンパイル運転後、車体とヘッドモデルは同じ材質を使用していますが、車体の材質が赤色で、ヘッドに影響しません。

![图片1](img/1.png)<br/>(図1)



####共有素材の取得と変更


```java

......
//加载导出的卡车模型
role3D=Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
role3D.on(Event.HIERARCHY_LOADED,this,onLoadComplete);
scene.addChild(role3D);

/** 模型与材质加载完成后回调***/		
private function onLoadComplete():void
{
  //获取模型（查看.lh文件，模型中两个对象，车头“head”与车身"body",它们都用同一个材质）
  var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //从模型上获取共享材质
  var sharedMaterial:StandardMaterial=meshSprite3D.meshRender.sharedMaterial;
  //修改材质的反射颜色，让模型偏红
  sharedMaterial.albedo=new Vector4(1,0,0,1);	
}
```

コンパイル運転の効果は以下の通りです。共有材質を修正した後、車体モデルと車体モデルはこの材質を使用しています。材質は全部変更されました。

![图片2](img/2.png)<br/>(図2)



####素材リストの取得と変更

3 d制作ソフトの中で、一つのモデルがいくつかの材質がある場合がよくあります。私達は多次元の材質と言います。ただし、ツールを通じてデータをエクスポートしてロードすると、エンジンは自動的にモデルの材質リスト配列materialsまたはsharedMaterialsを作成しますので、材質を修正する時はfor循環または再帰的な方式で行うことができます。

下記のコードは模型または模型容器のサブオブジェクトを取得し、材質を修正する方法を提供します。直接にすべてのシーンのサブオブジェクトに材質を修正しました。


```java

......
//加载场景
scene = Scene.load("LayaScene_loveScene/loveScene.ls");
//场景模型与材质加载完成监听与回调
scene.on(Event.HIERARCHY_LOADED,this,function():void
{
    setModelMaterial(scene)
});
/**
*修改模型材质
* @param model 场景或模型
 */		
private function setModelMaterial(model:*):void
{
  //如果是模型网格显示对象
  if (model is MeshSprite3D) 
  {
    //获取模型网格对象
    var meshSprite3D:MeshSprite3D = model as MeshSprite3D;
    //获取材质列表数组
    var materials:Array=meshSprite3D.meshRender.materials;
    //对模型网格中的所有材质进行修改
    for (var m:int = 0; m < materials.length; m++)
    {
      //获取共享材质
      var mat:StandardMaterial = materials[m] as StandardMaterial;
      //修改材质反射颜色
      mat.albedo=new Vector4(0.5,0.5,1,1);
    }
  }
  //如果是蒙皮模型网格显示对象
  if (model is SkinnedMeshSprite3D) 
  {
    //获取蒙皮模型网格显示对象
    var skinnedMeshSprite3D:SkinnedMeshSprite3D = model as SkinnedMeshSprite3D;
    //获取材质列表数组
    var materials1:Array=skinnedMeshSprite3D.skinnedMeshRender.materials;
    //对蒙皮模型网格中的所有材质进行修改
    for (var n:int = 0; n < materials1.length; n++)
    {
      //获取共享材质
      var mat1:StandardMaterial = materials1[n] as StandardMaterial;
      //修改材质反射颜色
      mat1.albedo=new Vector4(0.5,0.5,1,1);
    }
  }
  //递归方法获取子对象
for (var i:int = 0; i < model._childs.length; i++)
  {
    setModelMaterial(model._childs[i]);
  }
```


コンパイル運転後の効果は以下の通りです。シーン中のすべてのモデルの材質に青色が加わっています。

![图片3](img/3.png)<br/>(図3)