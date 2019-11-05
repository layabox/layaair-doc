##LayaAir 3 D素材の光と色のスタンプ

###材質の光色と貼り付けの属性

標準の材質の属性は照明の光の色の属性と一定の類似があって、拡散反射、高光、環境色などの属性の上で体現していますが、材質はもっとそろっていて、物体の美術効果を調整しやすくて、主に反射率、拡散反射色と拡散反射スタンプ、高光色と高光彩スタンプ、環境色と環境スタンプ、反射色と反射スタンプ、法線凹凸スタンプを含みます。これらの属性を詳細に紹介します。



####反射率

反射率は主に材質の明るさと色を反映しています。数値が高いほど、材質が明るいです。

反射率の値は四次元ベクトルで、下記のコードを調べます。ベクトルの中の四つの要素はそれぞれ赤、緑、青、透明alphaを表しています。

透明アルファ効果はパーセンテージ、0は全透明、1は不透明で、半透明または全透明表示に設定する必要があるなら、反射率だけを調整するのはまだ無理です。また、材質のレンダリングモードを設定する必要があります。

「3 Dの高速オープンツアー」コースのコードを修正すると、図1の効果が得られます。


```java

	//创建标准材质
	var material:StandardMaterial = new StandardMaterial();
	//创建漫反射二维纹理贴图
	material.diffuseTexture = Texture2D.load("res/layabox.png"); 	

	//只有设置了渲染模式为透明混合类型才能达到透明效果
	//设置材质蓝色染色及30%半透明
	material.albedo=new Vector4(1,1,2,0.3);
	//渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
	material.renderMode=StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;;
	//为box模型赋材质
	box.meshRender.material = material;
```


![图片1](img/1.png)<br/>(図1)反射率染色と透明



####拡散反射色と拡散反射スタンプ

拡散反射色（diffuseColor）とは、素材の単一自身色を指し、美術業界ではそれを物体の固有色と呼ぶことができる。拡散反射板（diffuseTexture）とは、材質の2 D固有のテクスチャ画像を指します。例えば、木の材質は木のテクスチャ画像を使います。

ゲームの中で一番多く使われているのは拡散反射スタンプです。ゲーム美術スタンプの中で仕事量が一番多いのも拡散反射スタンプです。

拡散反射色とパッチはLayaAir 3 Dエンジンにおいても混合して使用でき、それらは融合効果があり、拡散反射色はモデルの光面を染色し（バックライト面は変化しない）、照明の拡散反射光源色に類似して、より全体的な色調を発生する（図2）。

「速く3 Dの旅を開く」コースのコードを修正して、青い色の拡散反射を作成しました。


```java

	//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
	var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
	directionLight.color = new Vector3(1, 1, 1);
	directionLight.direction = new Vector3(0.5, -1, 0);	
	scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

	//创建标准材质
	var material:StandardMaterial = new StandardMaterial();
	//创建漫反射颜色
	material.diffuseColor=new Vector3(.5,.5,2);
	//创建漫反射二维纹理贴图
	material.diffuseTexture = Texture2D.load("res/layabox.png");
	//为box模型赋材质
	box.meshRender.material = material;
```


![图片2](img/2.png)<br/>(図2)拡散反射色とスタンプが混在しています。



####高光色とハイライト

高光色（specularColor）は、照明の高光色と同じように、モデル物体の角を曲がったり、光源に向かって発生している高光色を指します。

モデルの高光色は照明と材質の高光色と同時に影響を受け、もし明かりや照明のない高光色が黒であれば、材質に高光色とハイライトを設置したとしても、モデル上の高い光は同様に現れません。

ハイライト（specularTexture）は、2 Dテクスチャ画像であり、画像の画素色は、それぞれのモデルにおける高い光の色と明るさを表しており、ピクセルの色が明るいほど、ピクセルにおけるモデルは高い光で明るくなる。

もちろん、高光色とハイライトは同時に使用できます。効果がより良いかもしれません。開発者たちはテストを繰り返して、必要な効果を調節できます。

「高速3 Dオープンツアー」コースのコードを修正して、シーンの中にトラックを載せます。高光色、高光彩スタンプを使って、標準の照明だけを使って高光量を比較してみてください。コードは下記の通りです。


```java

......
//创建平行光 -------------------
  var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
//修改灯光方向
light.direction = new Vector3(0.3, -1, 0);

//加载导出的卡车模型
role3D=Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成事件监听
role3D.on(Event.HIERARCHY_LOADED,this,onLoadComplete);
scene.addChild(role3D);

/** 模型与材质加载完成后回调***/		
private function onLoadComplete():void
{
  //获取模型
  var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //从模型上获取共享材质
  var sharedMaterial:StandardMaterial=meshSprite3D.meshRender.sharedMaterial;
  //修改材质的高光颜色，让高光处偏红
  sharedMaterial.specularColor=new Vector4(1,0,0,1);
  //加载高光贴图（与漫反射一致，也可单独制作高光贴图）
  sharedMaterial.specularTexture=sharedMaterial.diffuseTexture;
  //sharedMaterial.specularTexture=Texture2D.load("LayaScene_truck/Assets/texture/t0200.png");
}	
```

上記のコードをコンパイルして、（図3）の中で材質の高い光色と高い光のスタンプを使って、効果はもっと良いです。（図4）ではライトのみを使用したデフォルトの白色高光色が一般的です。

![图片3](img/3.png)<br/>(図3)

![图片4](img/4.png)<br/>(図4)



####環境色と環境スタンプ

環境色（ambient）は照明環境色と同じで、材質に対して色融合して染色するので、材質をある色の色調に向かわせます。同時に材質を明るくして、ランプボックスの発光効果を模擬します。

環境スタンプ（ambient Texture）も一枚の二次元テクスチャ画像です。LayaAirエンジンで環境スタンプのモデルへの影響を一時的にキャンセルしました。その後のバージョンは自発光スタンプを追加して交換します。今は環境色処理モデルを一時的に使ってください。

「高速3 Dオープンツアー」コースのコードを修正すると、以下のようになります。


```java

//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(1, 1, 1);
directionLight.direction = new Vector3(0.5, -1, 0);	
scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

//创建标准材质
var material:StandardMaterial = new StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Texture2D.load("res/layabox.png");
//设置环境色，提亮模型
material.ambientColor =new Vector3(2,2,2);
//为box模型赋材质
box.meshRender.material = material;
```


![图片5](img/5.png)<br/>(図5)照明を固定すると、材質は環境色を使用していません。

![图片6](img/6.png)<br/>(図6)照明を固定すると、材質は環境色を使用して明るくなります。



####反射色と反射パッチ

反射色（reflectColor）は環境色に似ていますので、素材全体に色を合わせて染色します。

反射スタンプ（reflect Texture）は、一般的に箱のテクスチャを使ってTextureCubeを貼っています。モデルを全体的にくるみ、周辺環境をモデルに反映する効果をシミュレーションします。

反射パッチの表示効果は、反射率アルベド、レンダリングモードのrendemodeにも関連しています。

レンダリングモードは両面の不透明度に変えなければ反射スタンプを表示できません。

反射率albedoの数値が高いほど、反射スタンプの効果が小さいほど、拡散反射スタンプの効果が強くなります。水面、鏡面、金属面など、実際のモデルの材質効果によって調整できます。

「高速3 Dオープンツアー」コースのコードは以下の通りです。反射効果をより良く観察するために球形モデルを使用します。運転後に効果が得られます。


```java

//添加方向光
//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(1, 1, 1);
directionLight.direction = new Vector3(0.5, -1, 0);	
scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

//添加自定义模型
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh())) as MeshSprite3D;
sphere.transform.rotate(new Vector3(0,45,0),false,false);

//创建标准材质
var material:StandardMaterial = new StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Texture2D.load("res/layabox.png");

//降低反射率，加强反射贴图反射
material.albedo=new Vector4(0.2,0.2,0.2,0);
//设置渲染模式为双面不透明(否者无法显示反射贴图)
material.renderMode=StandardMaterial.RENDERMODE_OPAQUEDOUBLEFACE;
//创建反射贴图，用立方体全视角贴图进行赋值（类似于360全景包裹）
material.reflectTexture = TextureCube.load("skyBox/skyCube.ltc");

//为球型模型赋材质
sphere.meshRender.material = material;
```


![图片7](img/7.png)<br/>(図7)反射スタンプ



####法線凹凸貼り付け

法線凹凸スタンプは3 Dにおいて非常に重要な役割を果たしています。モデル表現の精細さは主に法線スタンプの影響を受けています。高精度、高面数モデルの細部をシミュレートして、ゲーム画面の品質を大幅に向上させます。もちろん、法線スタンプを使うと、ハードウェアの性能に対する要求が高まります。

法線のスタンプは美術デザイナーに提供しています。彼らは2つの方法で制作しています。3 D制作ソフトの中でモデルの高型焼きによって低モードで使用される法線のスタンプを作るのです。仕事量は膨大です。一つは拡散反射スタンプでいくつかのツールを通じて法線のスタンプに転化し、仕事量は少ないですが、効果は焙煎方法よりやや悪いです。法線スタンプの効果は（図8）に示すように、拡散反射パッチで変換されます。

![图片8](img/8.png)<br/>(図8)



法線スタンプを使用する必要がある場合は、開発中に以下の問題に注意する必要があります。

1.法線スタンプはモデルデータに対して一定の要求があり、モデルに切断情報がないと法線凹凸の効果が得られない。例えばLayaAir 3 Dエンジンに内蔵されている各種MeshメッシュタイプBoxMesh、Sphere Mesh、Cylinder Meshなどは、接線情報がないので、法線スタンプを使っても、ビューに凹凸が表示されません。

2.法線スタンプを使用する必要がある場合、モデルはLayaAirのunityプラグインから導出され、Mesh Settingグリッド設定時には「無視カット」オプションにチェックを付けないように注意する必要があります。

![图片9](img/9.png)<br/>(図9)

3.ファウルスタンプを使う必要があるなら、ゲームシーンでライトを使わなければいけません。モデルでも凹凸効果がありません。



unity 3 DからCubeモデル（unityで作成されたモデルバンドカット情報）を作成し、拡散反射パッチと法線スタンプを付与した後、LayaAirでプラグインからデータを導出して使用すると、法線スタンプも自動的にモデルにロードされます。「クイックオープン3 Dツアー」コースのコードは以下の通りです。コンパイル運転後は凹凸効果があります。


```java

......
  //添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
  var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(1, 1, 1);
directionLight.direction = new Vector3(0.5, -1, 0);	
scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

//创建unity中导出的模型
var box:Sprite3D=Sprite3D.load("layaScene_box/box.lh");
//模型与材质加载完成事件监听
box.on(Event.HIERARCHY_LOADED,this,onLoadComplete);
//也可以代码加载法线贴图

//加载到场景中
scene.addChild(box);
/** 模型与材质加载完成后回调***/		
private function onLoadComplete(role3D:Sprite3D):void
{
  //也可以代码加载法线贴图
  //从模型中获取meshSprite3D对像
  //var meshSprite3D:MeshSprite3D=box.getChildAt(0) as MeshSprite3D;
  //获取模型的材质实例
  //var material:StandardMaterial=meshSprite3D.meshRender.material as StandardMaterial;
  //为材质添加法线贴图
  //material.normalTexture=Texture2D.load("layaScene_box/Assets/texture/layabox_normal.png");
}
			
```


![图片10](img/10.png)<br/>(図10)法線スタンプ



###エクスポートする材質ファイル.lmat修正

素材の色と性質についての了解を通して、コードによって物体の材質属性とスタンプを修正する方法を理解しました。柔軟にコントロールするには、達成する効果が必要です。

しかし、現在の美術上の効果は基本的にunityエディタで実現され、データをエクスポートして使用されます。LayaAir 3 Dエンジンは現在完備されていますが、H 5のゲームエンジンの特徴で、unityの素材の種類と属性は全く含まれていませんので、unityでの効果と実際のゲームでの効果は違います。

未来バージョンでは、unityで専用のLayaAir標準素材を作成して開発者達に使用します。unityで作成された美術効果とゲームの効果を完全に一致させて開発者達が使用しやすいです。

待っている間、どのように修正して美術効果をあげますか？unityでは、素材ごとにエクスポート時に生成されます。lmat形式のファイルは、材質を変更します。lmatファイル方式で美術効果を調整できます。

例えば、次のコードを通して、シーンをロードし、その後、照明設定によって夜間効果を達成する（図11）。


```java

......	
  //添加3D场景
  var scene:Scene = Scene.load("LayaScene_loveScene/loveScene.ls");
Laya.stage.addChild(scene);

//创建摄像机(横纵比，近距裁剪，远距裁剪)
var camera:Camera = new Camera( 0, 0.1, 1000);
//加载到场景
scene.addChild(camera);
//移动摄像机位置
camera.transform.position=new Vector3(-8, 4, 20);
//旋转摄像机角度
camera.transform.rotate(new Vector3( -8, -25, 0), true, false);
//设置摄像机视野范围（角度） 
camera.fieldOfView=35;
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);

//创建平行光 -------------------
var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
//修改灯光方向
light.direction = new Vector3(0.3, -1, 0);
//设置环境光偏暗蓝
scene.ambientColor=new Vector3(0.2,0.2,1);
//设置灯光光偏暗
light.color=new Vector3(0.5,0.5,0.5);
```

![图片11](img/11.png)<br/>(図11)

上記の図によれば、「Love」の形のモデルをランプボックスの明るさに変更する必要がある場合、コード修正によって相対的に面倒で、比較的簡単な方法で、それに対応する材質ファイルを修正します。lmat、材質ファイルを開けて観察しますと、材質ファイルに保存されているのは各種の光色属性とスタンプ（図12）です。カバー材質の環境光の色を変更します。新しいウェブページのファイルは効果を見ることができて、模型は明るくなりました。

![图片12](img/12.png)<br/>(図12)

![图片13](img/13.png)<br/>(図13)

以上の方法で、シーンの中の各種の材質の属性を調節して、美術に必要な効果を達成させます。もちろん、今後のユニティではLayaAirの専属材質がunityで直接編集されてゲームと一致する最終効果が期待されます。

