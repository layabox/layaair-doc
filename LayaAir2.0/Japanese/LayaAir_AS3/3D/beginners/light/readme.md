##LayaAir 3 Dの光源

照明は3 D世界において重要であり、3 D物体が立体影の変化、色の色調の変化、投影などを発生させて照明の設定方式に達することができる。

##ライトの種類

照明の種類は様々ですが、光源によって効果が異なり、異なるパラメータを設定することができます。IDEが作成した3 Dプロジェクトでは、コードを修正して、異なる種類の照明効果を見ることができます。

###点光（PointLight）

光は四方八方に向けて光を発する光源であり、全方向光または球状光とも呼ばれ、現実の点光源は電球やろうそくなどであり、点光源は強度、色、減衰半径の属性があると感じられる。


```java

	//创建点光
	var light:PointLight = scene.addChild(new PointLight()) as PointLight;
	//移动灯光位置
	light.transform.translate(new Vector3(-3,5,0));
	//设置点光照亮范围
	light.range=6;
```

rangeは点光源を設定する範囲であり、点光の照射範囲に相当し、数値が大きいほど、光照射範囲が大きくなり、図1では光照射範囲が小さいため、光に照らされていないところが黒であり、図2では照明範囲が照明とモデルの距離を超えているため、全てが明るく照らされている。





  ![图片2](img/2.png)（図1）




###平行光(Direction Light)

平行光は点光と大きな違いがあります。一定の方向があります。ラジアン値で設定できます。また、減衰や光照射範囲もなく、全シーンのモデルを照らします。3 D世界では常に一定方向の太陽光をシミュレートしている。


```java

	//创建平行光
	var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
	//设置平行光方向
	light2.transform.worldMatrix.setForward(new Vector3(0, -1.0, 0));
```


set Forward平行光の方向は、それぞれx、y、z軸の方向を表しています。負の数は負の軸、正の数は正の軸、値の範囲は-1—0—1で、範囲を超えたら-1または1です。初心者たちはこの範囲内で値を設定して方向の変化を観察することができます。



###集光（SpotLight）

スポットライトとは、特定の光源の方向から射出される光のことで、例えば懐中電灯、舞台の筒などです。光照射領域は距離因子によって徐々に拡大し，同時に光照射領域の端にも減衰現象がある。

```java

	//添加聚光
	var light:SpotLight=scene.addChild(new SpotLight()) as SpotLight;
	//设置聚光的位置
	light.transform.position=new Vector3(0,5,0)
	//设置聚光的方向
	light3.transform.worldMatrix.setForward(new Vector3(0,-1,0));
	//设置聚光范围
	light.range=5;
	//设置聚光锥形角度
	light3.spotAngle = 50;
```


スポットライトは集光の減衰であり、設定された値が小さいほど、集光絞りのボケが小さく、逆に絞りが大きい。

directionは集光の方向であり、方向の値設定方式は平行光と一致する。

rangeは集光の照射範囲であり，点光と類似しており，違いは集光の方向のみで，点光の方向はない。

![图片3](img/3.png)（図2）![图片4](img/4.png)（図3）



##光の要素

シーンで照明を使用すると、照明の範囲内のすべての3 Dモデルに影響が出ます。LayaAir 3 Dエンジンの照明には、シーンの明るさや色などを調整するための要素が含まれています。

###環境色（ambientColor）

**Tips：エンジン1.7.9版の後、照明の環境色設定をキャンセルしました。旧版はそのまま使用できます。環境色は材質に設定できます。**

環境色はシーンの雰囲気色を簡単に理解できます。シーン中のモデルでは、それらの明るい面と暗い面は同時に環境色に影響され、環境色が明るいモデルほど全体的な輝度が高くなります。もちろん、環境色も色調処理によく使われています。環境色によって、赤橙黄緑青紫などの雰囲気を整えられます。

コード設定環境色は次のように黄色の環境光が発生し、モデル全体が黄色で覆われています（図4）。

前回のコースでは3次元ベクトルを紹介しましたが、色の値を設定するために使用できます。もう一度振り返ってみますと、ベクトルの3つの要素はそれぞれ赤、緑、青の色を表しています。それらを組み合わせて千変万化の色になります。各色の最高値は1で、それを超えると露出効果が発生します。


```java

//设置灯光的环境色为纯黄色（计算机中，红+绿=黄）
light.ambientColor = new Vector3(1,1,0);
```


![图片5](img/5.png)（図4）



###拡散反射色(diffuseColor)

**Tips：エンジン1.7.9版の後、カラーライトの色属性設定を追加しました。diffuseColorと同じです。**

光源の色とも言われています。ライトは光の面の明るさや色に影響されます。例えば、キャンドルライトをなぞらえ似せて、光源の色を黄色く調整することができます。

下記のコードの中で、光源の色が純紅であることを設定しましたが、モデルは光の当たる部分に赤色の影響を与えます。環境光（材質環境光色または旧版灯光環境光色）が黄色であるため、受光面が赤＋黄＝オレンジ色の色が混合されています。


```java

//设置灯光的漫反射色为纯红色
//light.diffuseColor = new Vector3(1,0,0);
//设置灯光颜色为纯红色(与diffuseColor作用相同)
light.color = new Vector3(1,0,0);
```


![图片6](img/6.png)（図5）

環境光をオフにすると、（図6）の効果が見られます。黄色の環境色の影響がないので、モデルの受光面はすべて光源色になります。そのため、プロジェクト開発の過程で、照明の様々な光と色の属性の混合影響を総合的に考慮しなければなりません。

![图片7](img/7.png)（図6）



###ハイライトカラー(specularColor)

**Tips：エンジン1.7.9版の後、照明のハイライトカラー設定をキャンセルしました。旧版はそのまま使用できます。ハイライトの色は材質に設定できます。**

モデルにとっては、光源の方向に向かっていて、角度が鋭く滑らかなところで高い光が発生し、高い光の明るさと色は、照明の高い光の色によって調整され、デフォルトのハイライト色は純白である。

調整モデルの高光色には二つの方法があります。一つはライトの上に調光色を設置することです。一つは材質の上に高い光のスタンプを設置することです。多くの場合は直接材質の上で高光色を調整し、処理がより便利で、効果がより真実です。

ボックスモデルは高光を発生できないので、比較的滑らかな球体モデルで観察したが、図7-1ではコードに高光色が設定されておらず、エンジンのデフォルト値は純白色であるため、白色調光を示した。下記のコードの中で、私達は高い光の色を設定して青で、図7-2ははっきり見えるため、球面の上で青の高い光を生んで、拡散の反射の赤色と加算して紫色を形成したためです。


```java

//修改材质的高光颜色
 material.specularColor = new Vector4(0.5,0.5,1);
```


![图片8-1](img/8-1.png)（図7-1）![图片8-2](img/8-2.png)（図7-2）



###投影（show）

投影は照明モデルを照射する時に発生する瞬間的な影であり、照明角度、照明強度、モデル位置などによって変化することができる。投影は3 D世界の最も重要な要素の一つであり、より強い立体感を生み出すことができる。

リアルタイムシャドウは非常に損失性能があり、ゲームシーン、特にモデル量が大きいので、一般的にはリアルタイム投影を使わず、静的な光照射スタンプを使用しています。

シーンに投影を発生させるには、ライトの次の属性を知る必要があります。

**show:**投影を開始するかどうか、ブール値はtrueに設定してから有効になります。

**show Distance:**投影の範囲とは、カメラからモデルまでの距離のことで、単位はメートルです。この範囲より大きいモデルは投影と投影を受け入れられず、開発者はシーンの大きさに応じて設定することができる。

**shadowPSSMCount：**シャドウスタンプの数が多くなればなるほど、シャドウがきめ細かくなり、性能損失が大きくなります。

**show Resolution：**投影の品質、投影範囲の影の大きさ。数値設定により品質が大きくなればなるほど、投影品質が高くなり、性能損失も高くなります。投影の質量値は2のN乗の単位で設定され、デフォルトは512で1024、2048…などに設定されます。

**shadowPCFType：**影は等級の0-3をぼかして、はっきりしない値はもっと大きくて、影は柔らかくて、効果はもっと良くて、しかし更に性能を消耗します。



ライトの属性をオンとセットするだけでは足りません。また、モデル上で投影属性を変更する必要があります。それぞれ：

**receive Shadow:**投影を受け入れるかどうかは、モデルのこの属性がtrueである場合、計算された投影はこのモデルに表示されます。ゲームでは、シーンの地面と、シーンの中で動くことができるエリアのモデルキャスティングのプロパティをtrueに設定します。

**cast Shadow:**投影が生成されるかどうかは、モデルのこの属性がtrueである場合、ライトは、影を発生させるモデル位置、モデルグリッドの形状の大きさ、照明の角度などに基づいて投影計算を行い、その後、影を受けるモデルに投影を生じる。例えばシーンのキャラクターやNPCなどのアクティブなゲーム要素がこの属性をオンにします。

投影をよく理解するために、以下のコードの例では平行光を使用してボックスボックスボックスボックスボックスボックスボックスボックスボックスのモデルとスフィアモデルを作成し、シーンにロードします。ボールは影を作るために使用されます。箱に投影を受けます。


```java

package {
	
	import laya.d3.core.BaseCamera;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.d3.resource.models.SphereMesh;
	import laya.display.Stage;
	import laya.utils.Stat;

	public class LayaAir3D 
    {
		public function LayaAir3D()
        {
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景
			var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;
			 
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 100);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 4, 8));
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			
			//创建方向光
		    var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
		    //移动灯光位置
		    light.transform.translate(new Vector3(0,5,0));
			//设置灯光方向
		    light.transform.worldMatrix.setForward(new Vector3(0.3,-1, 0));
			//设置灯光漫反射颜色
			light.diffuseColor = new Vector3(1, 0, 0);
          
          	//设置灯光环境色
//		    scene.ambientColor = new Vector3(1, 1, 0); 
		 
		    //添加灯光投影
		    light.shadow=true;
			//产生投影的范围（如过小将不会产生投影）
		    light.shadowDistance=45;
          	//生成阴影贴图数量
			light.shadowPSSMCount = 1;
			//模糊等级,越大越高,效果更好，更耗性能
          	light.shadowPCFType=1;
			//投影质量
		    light.shadowResolution=2048;

			 
			//创建盒子模型
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1.5,1.5,1.5))) as MeshSprite3D;
			//自身y座标旋转
			box.transform.rotate(new Vector3(0,45,0),true,false);
			//接收阴影
			box.meshRenderer.receiveShadow=true;
			
			//创建球体模型
			var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh())) as MeshSprite3D;
			//按父空间移动球体
			sphere.transform.translate(new Vector3(0,1.5,0),false);
			//产生阴影
			sphere.meshRenderer.castShadow=true;
			//创建材质
			var material:PBRSpecularMaterial = new PBRSpecularMaterial();
			//材质加载漫反射贴图
		Texture2D.load("h5/res/layabox.png",Handler.create(this,function(text:Texture2D):void{
          material.albedoTexture = text;
          //为模型赋材质（单个材质可赋给多个模型）
          sphere.meshRenderer.material = material;
          box.meshRenderer.material = material;
       	 }));
		}		
	}
}
```




![图片9](img/9.png)（図8）![图片10](img/10.png)（図9）

上記の2つの図は投影開始前と投影開始後の効果です。ライトとモデルに上記で紹介した関連属性を設定する必要があります。どのような部分が欠けても影が出ません。

