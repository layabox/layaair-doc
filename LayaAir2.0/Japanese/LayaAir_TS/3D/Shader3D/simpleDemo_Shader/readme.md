# 如何自定义Shader

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


パッチ`simpleShader.fs`コードは以下の通りです


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


####2.コードの中でShaderを構成する

コードに**組み立てる**Shader、このセグメントのコードはMain.tsに追加されます。

>参照によるカラーコードの導入


```typescript

import simpleShaderFS from "./simpleShader.fs";
import simpleShaderVS from "./simpleShader.vs";
```


>シャダを初期化する


```typescript

//初始化我们的自定义shader
initShader() {
    
    //所有的attributeMap属性
    var attributeMap = {'a_Position': Laya.VertexMesh.MESH_POSITION0, 'a_Normal': Laya.VertexMesh.MESH_NORMAL0};
    
    //所有的uniform属性
    var uniformMap = {'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE};
    
    //注册CustomShader 
    var customShader = Laya.Shader3D.add("CustomShader");
    
    //创建一个SubShader
    var subShader = new Laya.SubShader(attributeMap, uniformMap);
    
    //我们的自定义shader customShader中添加我们新创建的subShader
    customShader.addSubShader(subShader);
    
    //往新创建的subShader中添加shaderPass
    subShader.addShaderPass(simpleShaderVS, simpleShaderFS);
}
```


####3.カスタム素材の実現

私達は材質をカスタマイズして、この材質の使うShaderを設定します。


```typescript

export class CustomMaterial extends Laya.BaseMaterial {
    constructor() {
        super();
        //设置本材质使用的shader名字
        this.setShaderName("CustomShader");
    }
}
```


####4.カスタム素材を使用する

カスタム材質を使う前に、自分のShaderを初期化することを必ず覚えてください。LayaAirの中に持っている材質はフォローします。`Laya3D.init`初期化ここで私達は私達が書いたのを呼び出します。`initShader`方法。ここでは直接Mainで自分のShaderを初期化します。


```typescript

........	
	Laya.alertGlobalError = true;

	//初始化自定义Shader
    this.initShader();

    //激活资源版本控制，版本文件由发布功能生成
    Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
.......
```


GameUIでは私達のカスタム材質を使用します。


```typescript

//添加自定义模型
var box = scene.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1)));

//为了更好的表现该自定义shader我们去掉模型旋转,同时给摄影机添加了移动脚本
camera.addComponent(CameraMoveScript);
//box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
// var material:BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
// Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex) {
// 	material.albedoTexture = tex;
// }));
// box.meshRenderer.material = material;

//创建一个自定义材质，并且添加给box
var _material = new CustomMaterial();
box.meshRenderer.material = _material;
```


運転後、私達は画角を調整して得た効果図：

！[](img/2 png)<br/>(図2)

この着色器では，得られた点の世界座標を三次元マトリックスに変換し，法線に乗って待ちます。`v_Normal`この点の色の値として表示されます。得られたのはこのようなモデルです。