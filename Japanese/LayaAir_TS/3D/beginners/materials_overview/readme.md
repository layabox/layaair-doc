#LayaAir 3 D素材の概要

###材質の概要

材質は物体の素材の質感です。例えば、木、金属、ガラス、毛、水など、彼らの粗さ、光沢度、反射、透明、色、テクスチャなどの材質の属性は違います。

ほとんどの3 Dエンジンは独立した材質がプログラムコード制御に使われています。3 D作成ソフトの中で材質処理も最も重要な部分の一つです。ゲーム美術の開発者たちがよく言っています。3 Dゲームのシーンでは、モデルを3分見て、7分は材質によるものです。

材質の種類もたくさんあります。三次元製作ソフトには標準材質、多次元材質、合成材質、両面材質、光線追跡材質などがあります。LayaAir 3 Dエンジンでは、現在主に標準素材のStandardMatrialをサポートしています。



###標準素材の作成

コード内のモデルに素材がない場合、3 Dビューではモデルのテクスチャや質感などが表示されません。デフォルトは純白です。

「3 Dのクイックオープン」コースのコードには、標準的な素材を使って拡散反射スタンプにテクスチャー画像を追加し、モデルを付与しました。


```typescript

//创建标准材质
var material:Laya.StandardMaterial = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//为box模型赋材质
box.meshRender.material = material;
```


もちろん、これは簡単な使い方です。一番重要な拡散反射板だけを使って、より良い美術効果を達成するために、開発者は材質の光と贴图の属性を理解しなければなりません。



###材質のロード

「LayaAir 3 Dモデル」というドキュメントでは、モデルグリッドと材質の二つの部分が含まれています。ロード.ls，lhデータの場合、モデルに対応する材質が自動的にロードされます。

最新のエンジンバージョンでは、モデルグリッドと材質が分離されています。unityエクスポートプラグインツールは、素材とエクスポートされたlmモデルファイルを結合しません。したがって.lmフォーマットのリソースをロードすると，その材質を新たに与えてこそ完全に表示されます。そうでないとホワイトモードとして表示されます。

この場合は、エクスポート後に発生するlmatの材質ファイルを使用して、標準的な材質を作成し、モデルを付与することができます。モデルのロードと似ています。


```typescript

//异步加载材质文件创建标准材质（也可以预加载）
var material:Laya.StandardMaterial = Laya.StandardMaterial.load("truck/Assets/Materials/t0200.lmat");
//为box模型赋材质
box.meshRender.material = material;
```




###ローディングしたモデルから素材を取得します。

上記の例では標準的な材質を作成しましたが、実際のプロジェクトではコードを使ってモデルに材質を与えることが少ないです。直接に3 Dソフトで作ったり、ユニティで材質を作ったりして、ツールでLayaAir形式を導出してから使います。

使用時にエンジンは自動的にモデルに材質をロードします。また、一つのモデルにはいくつかの標準的な材質があります。自動的に開発時間を節約してくれます。しかし、このような状況で、もし私達が材質を変えたり、変えたりしたらどうすればいいですか？まずモデルから現在の材質を取得する必要があります。

LayaAir 3 Dエンジンは、メッシュレンダリング器MeshRender類と蒙皮アニメーションメッシュレンダリタSkinedMeshRenderを提供しています。テレビモデルでそれらの実例を提供しています。それらを通じてモデルの材質を取得することができます。

Tips：Mesh Sprite 3 DモデルはMeshRenderで、SkinedMesh Sprited 3 DモデルはSkinedMeshRenderです。

取得した材質は二つのタイプで、一つは自分の材質のMaterialで、もし自身の材質が修正されたら、自分の模型の表示だけが変化します。一つは共有材質のShardMaterialです。材質が比較的独立しているため、複数のモデルは同じ材質を使うことができます。取得したのは共有材質で、修正したら、自身のモデルの表示は変化します。他のモデルはこの材料を使います。質の部分も変わる。そのため、開発者は状況に応じて選択する必要があります。



###自身の材質を取得し、変更します。


```typescript

......
//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,this.onLoadComplete);
this.scene.addChild(this.role3D);
//模型与材质加载完成后回调
private onLoadComplete():void{
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身“body”，它们都用同一个材质）
  var meshSprite3D:Laya.MeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
  //从模型上获取自身材质
  var material:Laya.StandardMaterial = meshSprite3D.meshRender.material as Laya.StandardMaterial;
  //修改材质的反射颜色，让模型偏红
  material.albedo = new Laya.Vector4(1,0,1,1);
}
```


コンパイル運転後、車体とヘッドモデルは同じ材質を使用していますが、車体の材質が赤色で、ヘッドに影響しません。

![1](img/1.png)(图1)</br>







###共有素材の取得と変更


```typescript

//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,this.onLoadComplete);
this.scene.addChild(this.role3D);
//模型与材质加载完成后回调
private onLoadComplete():void{
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身“body”，它们都用同一个材质）
  var meshSprite3D:Laya.MeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
  //从模型上获取共享材质
  var shareMaterial:Laya.StandardMaterial = meshSprite3D.meshRender.shareMaterial as Laya.StandardMaterial;
  //修改材质的反射颜色，让模型偏红
  shareMaterial.albedo = new Laya.Vector4(1,0,0,1);
}
```


コンパイル運転の効果は以下の通りです。共有材質を修正した後、車体モデルと車体モデルはこの材質を使用しています。材質は全部変更されました。（図2）

![2](img/2.png)(图2)</br>







###素材リストの取得と変更

3 D制作ソフトの中には、一つのモデルがいくつかの材質を持っています。私たちは多次元の材質と言います。ただし、ツールを通じてデータをエクスポートしてロードすると、エンジンは自動的にモデルの材質リスト配列materialsまたはsharedMaterialsを作成しますので、材質を修正する時はfor循環または再帰的な方式で行うことができます。

下記のコードは模型または模型容器のサブオブジェクトを取得し、材質を修正する方法を提供します。直接にすべてのシーンのサブオブジェクトに材質を修正しました。


```typescript

......
//加载场景
this.scene = Laya.Scene.load("LayaScene_loveScene/loveScene.ls");
Laya.stage.addChild(this.scene);
//场景模型与材质加载完成监听与回调
this.scene.on(Laya.Event.HIERARCHY_LOADED,this,function():void{
	this.setModelMaterial(this.scene);
});
//修改模型材质(场景或模型)
private setModelMaterial(model:any):void{
  //如果是模型网格显示对象
  if(model instanceof Laya.MeshSprite3D){
  //获取模型网格对象
  var meshSprite3D:Laya.MeshSprite3D = model as Laya.MeshSprite3D;
  //获取材质列表数组
  var materials:Array<any> = meshSprite3D.meshRender.materials;
  //对模型网格中的所有材质进行修改
  for(var m:number = 0;m < materials.length;m++){
  //获取共享材质
  var mat:Laya.StandardMaterial = materials[m] as Laya.StandardMaterial;
  //修改材质反射颜色
  mat.albedo = new Laya.Vector4(0.5,0.5,1,1);
  }
  }
  //如果是蒙皮模型网格显示对象
  if(model instanceof Laya.SkinnedMeshSprite3D){
  //获取蒙皮模型网格显示对象
  var skinnedMeshSprite3D:Laya.SkinnedMeshSprite3D = model as Laya.SkinnedMeshSprite3D;
  //获取材质列表数组
  var materials1:Array<any> = skinnedMeshSprite3D.skinnedMeshRender.materials;
  //对蒙皮模型网格中的所有材质进行修改
  for(var n:number = 0;n < materials1.length;n++){
  //获取共享材质
  var mat1:Laya.StandardMaterial = materials1[n] as Laya.StandardMaterial;
  //修改材质反射颜色
  mat1.albedo = new Laya.Vector4(0.5,0.5,1,1);
  }
  }
  //递归方法获取子对象
  for(var i:number = 0;i < model._childs.length;i++){
  	this.setModelMaterial(model._childs[i]);
  }
}
```


コンパイル運転後の効果は以下の通りです。シーン中のすべてのモデルの材質に青色が加わっています。

![3](img/3.png)（図3）<br/>