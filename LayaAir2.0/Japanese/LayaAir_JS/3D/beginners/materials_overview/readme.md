#LayaAir 3 D素材の概要

###材質の概要

材質は物体の素材の質感です。例えば、木、金属、ガラス、毛、水など、彼らの粗さ、光沢度、反射、透明、色、テクスチャなどの材質の属性は違います。

ほとんどの3 Dエンジンは独立した材質がプログラムコード制御に使われています。3 D作成ソフトの中で材質処理も最も重要な部分の一つです。ゲーム美術の開発者たちがよく言っています。3 Dゲームのシーンでは、モデルを3分見て、7分は材質によるものです。

材質の種類もたくさんあります。三次元製作ソフトには標準材質、多次元材質、合成材質、両面材質、光線追跡材質などがあります。LayaAir 3 Dエンジンで現在主に支持されているのは、標準材質のPBRStandarMatrialです。



###標準素材の作成

コード内のモデルに素材がない場合、3 Dビューではモデルのテクスチャや質感などが表示されません。デフォルトは純白です。

「3 Dのクイックオープン」コースのコードには、標準的な素材を使って拡散反射スタンプにテクスチャー画像を追加し、モデルを付与しました。


```typescript

//创建材质
var material = new Laya.PBRStandardMaterial();
//加载漫反射贴图
Laya.Texture2D.load("../../../../res/threeDimen/texture/earth.png", Laya.Handler.create(null, function(texture){
// 	//设置漫反射二维纹理贴图
material.albedoTexture = texture;
// 	//为box模型赋材质
box.meshRenderer.material = material;
}));
```


もちろん、これは簡単な使い方です。一番重要な拡散反射板だけを使って、より良い美術効果を達成するために、開発者は材質の光と贴图の属性を理解しなければなりません。



###材質のロード

「LayaAir 3 Dモデル」というドキュメントでは、モデルグリッドと材質の二つの部分が含まれています。ロード.ls，lhデータの場合、モデルに対応する材質が自動的にロードされます。

最新のエンジンバージョンでは、モデルグリッドと材質が分離されています。unityエクスポートプラグインツールは、素材とエクスポートされたlmモデルファイルを結合しません。したがって.lmフォーマットのリソースをロードすると，その材質を新たに与えてこそ完全に表示されます。そうでないとホワイトモードとして表示されます。

この場合は、エクスポート後に発生するlmatの材質ファイルを使用して、標準的な材質を作成し、モデルを付与することができます。モデルのロードと似ています。


```typescript

//异步加载材质文件创建标准材质（也可以预加载）
box .meshRenderer.material = Laya.BlinnPhongMaterial.load("truck/Assets/Materials/t0200.lmat");
```




###ローディングしたモデルから素材を取得します。

上記の例では標準的な材質を作成しましたが、実際のプロジェクトではコードを使ってモデルに材質を与えることが少ないです。直接に3 Dソフトで作ったり、ユニティで材質を作ったりして、ツールでLayaAir形式を導出してから使います。

使用時にエンジンは自動的にモデルに材質をロードします。また、一つのモデルにはいくつかの標準的な材質があります。自動的に開発時間を節約してくれます。しかし、このような状況で、もし私達が材質を変えたり、変えたりしたらどうすればいいですか？まずモデルから現在の材質を取得する必要があります。

LayaAir 3 Dエンジンは、メッシュレンダリング器MeshRenderer類と蒙皮アニメーションメッシュレンダリタSkinedMeshRendererを提供しています。テレビモデルでそれらの実例を提供しています。それらを通じてモデル上の材質を取得することができます。

Tips：Mesh Sprite 3 DモデルはMeshRenderer、SkinedMesh Sprited 3 DモデルはSkinedMeshRendererです。

取得した材質は二つのタイプで、一つは自分の材質のMaterialで、もし自身の材質が修正されたら、自分の模型の表示だけが変化します。一つは共有材質のPBRShared Materialです。材質が相対的に独立していますので、複数のモデルは同じ材質を使えます。材質の部分も変わります。そのため、開発者は状況に応じて選択する必要があります。



###自身の材質を取得し、変更します。


```typescript

......
//加载导出的卡车模型
Laya.Sprite3D.load("LayaScene_test_Light/test_Light.lh",Laya.Handler.create(this,function(sprite){
  var hero = scene.addChild(sprite);
  //获取车身模型（查看.lh文件，模型	中两个对象，车头“head”与车身"body",它们都用同一个材质）
  var materials = hero.getChildAt(1).getChildAt(0) ;
  //从模型上获取自身材质
  var material = materials.meshRenderer.material;
  //修改材质的反射颜色，让模型偏红
  material.albedoColor = new Laya.Vector4(1,0,0,1)
}));
```


コンパイル運転後、車体とヘッドモデルは同じ材質を使用していますが、車体の材質が赤色で、ヘッドに影響しません。

![1](img/1.png)（図1）<br/>



###共有素材の取得と変更


```typescript

Laya.Sprite3D.load("LayaScene_test_Light/test_Light.lh",Laya.Handler.create(this,function(sprite){
  var hero = scene.addChild(sprite);
  //获取车身模型（查看.lh文件，模型	中两个对象，车头“head”与车身"body",它们都用同一个材质）
  var materials = hero.getChildAt(1).getChildAt(0) ;
  //获取模型的共享材质
  var material = meshSprite3D.meshRenderer.sharedMaterial;
  //修改材质的反射颜色，让模型偏红
  material.albedoColor = new Laya.Vector4(1,0,0,1); 
 }));
```


コンパイル運転の効果は以下の通りです。共有材質を修正した後、車体モデルと車体モデルはこの材質を使用しています。材質は全部変更されました。（図2）

![2](img/2.png)（図2）<br/>



###素材リストの取得と変更

3 D制作ソフトの中には、一つのモデルがいくつかの材質を持っています。私たちは多次元の材質と言います。ただし、ツールを通じてデータをエクスポートしてロードすると、エンジンは自動的にモデルの材質リスト配列materialsまたはsharedMaterialsを作成しますので、材質を修正する時はfor循環または再帰的な方式で行うことができます。

下記のコードは模型または模型容器のサブオブジェクトを取得し、材質を修正する方法を提供します。直接にすべてのシーンのサブオブジェクトに材質を修正しました。


```typescript

......
//加载场景
 Laya.Sprite3D.load("LayaScene_01/loveScene.ls",Laya.Handler.create(this,function(scene){
   var model = scene.addChild(scene);
  	setModelMaterial(model)
 }));
//修改模型材质(场景或模型)
function setModelMaterial(model){
  //如果是模型网格显示对象
  if(model instanceof Laya.MeshSprite3D){
      //获取模型网格对象
      var meshSprite3D = model;
      //对模型网格中的所有材质进行修改
      for(var m = 0;m < materials.meshRenderer.sharedMaterials.length;m++){
        //获取共享材质
        var mat =  materials.meshRenderer.sharedMaterials[m];
        //修改材质反射颜色
        material.albedoColor = new Laya.Vector4(0.5,0.5,1,1);
      }
  }
  //如果是蒙皮模型网格显示对象
  if(model instanceof Laya.SkinnedMeshSprite3D){
    //获取蒙皮模型网格显示对象
    var skinnedMeshSprite3D = model;
    //获取材质列表数组
    var materials1 = skinnedMeshSprite3D.skinnedMeshRenderer.materials;
    //对蒙皮模型网格中的所有材质进行修改
    for(var n = 0;n < materials1.length;n++){
      //获取共享材质
      var mat1 = materials1[n];
      //修改材质反射颜色
      mat1.albedoColor = new Laya.Vector4(0.5,0.5,1,1);
    }
  }
  //递归方法获取子对象
  for(var i = 0;i < model._childs.length;i++){
    setModelMaterial(model._childs[i]);
  }
}
```


コンパイル運転後の効果は以下の通りです。シーン中のすべてのモデルの材質に青色が加わっています。

![3](img/3.png)（図3）<br/>