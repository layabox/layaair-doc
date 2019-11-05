#どのようにShaderをカスタマイズしますか？

###### *version :2.3.0   Update:2019-10-8*

ここでは、カスタムシャーダーの使い方を簡単に紹介します。今回はLayaAirIDEの3 Dサンプル項目をもとに修正します。

####1.頂点着色器と片元着色器プログラムを作成します。

プロジェクトコードと同じレベルのフォルダに置く`customMaterials`下へ

頂点検出器`simpleShader.vs`コードは以下の通りです


```c++

#include "Lighting.glsl";

attribute vec4 a_Position;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;


attribute vec3 a_Normal;
varying vec3 v_Normal;

void main()
{
	gl_Position = u_MvpMatrix * a_Position;
	mat3 worldMat=mat3(u_WorldMat);
	v_Normal=worldMat*a_Normal;
	gl_Position=remapGLPositionZ(gl_Position);
}
```


パッチ`simpleShader.ps`コードは以下の通りです


```c++

#ifdef FSHIGHPRECISION
precision highp float;
#else
precision mediump float;
#endif

varying vec3 v_Normal;

void main()
{	
  gl_FragColor=vec4(v_Normal,1.0);
}
```


配置したディレクトリ構造:

！[](img/1.png)<br/>(図1)

####2.コードの中でShaderを構成する

このコードの中でLayaComplerコンパイラが提供するマクロコンパイル関数を使用します。`__INCLUDESTR__`を選択します。この関数はテキストファイルをプログラムコードに含めます。テキストを識別し、文字列に変換します。

コードに**組み立てる**Shader、このセグメントコードはMain.asに追加されます。


```typescript

//初始化我们的自定义shader
public function initShader():void {
    
    //所有的attributeMap属性
    var attributeMap:Object = {'a_Position': VertexMesh.MESH_POSITION0, 'a_Normal': VertexMesh.MESH_NORMAL0};
    
    //所有的uniform属性
    var uniformMap:Object = {'u_MvpMatrix': Shader3D.PERIOD_SPRITE, 'u_WorldMat': Shader3D.PERIOD_SPRITE};
    
    //通过 __INCLUDESTR__ 方法引入顶点着色器程序和片元着色器程序。
    var vs:String = __INCLUDESTR__("customShader/simpleShader.vs");
    var ps:String = __INCLUDESTR__("customShader/simpleShader.ps");
    
    //注册CustomShader 
    var customShader:Shader3D = Shader3D.add("CustomShader");
    
    //创建一个SubShader
    var subShader:SubShader = new SubShader(attributeMap, uniformMap);
    
    //我们的自定义shader customShader中添加我们新创建的subShader
    customShader.addSubShader(subShader);
    
    //往新创建的subShader中添加shaderPass
    subShader.addShaderPass(vs, ps);
}
```


####3.カスタム素材の実現

私達は材質をカスタマイズして、この材質の使うShaderを設定します。


```typescript

package material {
	import laya.d3.core.material.BaseMaterial;
	
	public class CustomMaterial extends BaseMaterial {
		public function CustomMaterial() {
			super();
			//设置本材质使用的shader名字
			setShaderName("CustomShader");
		}
	}
}
```


####4.カスタム素材を使用する

カスタム材質を使う前に、自分のShaderを初期化することを必ず覚えてください。LayaAirの中に持っている材質はフォローします。`Laya3D.init`初期化ここで私達は私達が書いたのを呼び出します。`initShader`方法。ここでは直接Mainで自分のShaderを初期化します。


```typescript

........	
	Laya.alertGlobalError = true;

	//初始化自定义Shader
    initShader();

    //激活资源版本控制，版本文件由发布功能生成
    ResourceVersion.enable("version.json", Handler.create(this, this.onVersionLoaded), ResourceVersion.FILENAME_VERSION);
.......
```


GameUIでは私達のカスタム材質を使用します。


```typescript

//添加自定义模型
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1))) as MeshSprite3D;

//为了更好的表现该自定义shader我们去掉模型旋转,同时给摄影机添加了移动脚本
camera.addComponent(CameraMoveScript);
//box.transform.rotate(new Vector3(0, 45, 0), false, false);
// var material:BlinnPhongMaterial = new BlinnPhongMaterial();
// Texture2D.load("res/layabox.png", Handler.create(null, function(tex:Texture2D):void {
// 	material.albedoTexture = tex;
// }));
// box.meshRenderer.material = material;

//创建一个自定义材质，并且添加给box
var _material : CustomMaterial = new CustomMaterial();
box.meshRenderer.material = _material;
```


運転後、私達は画角を調整して得た効果図：

！[](img/2 png)<br/>(図2)

この着色器では，得られた点の世界座標を三次元マトリックスに変換し，法線に乗って待ちます。`v_Normal`この点の色の値として表示されます。得られたのはこのようなモデルです。