# ShaderPass介绍

######  *version :2.3.0   Update:2019-10-8*

Sub Shaderには一連のものが定義されている。**Pass(チャネル)**。各Passは完全なレンダリングプロセスを定義している。注意Passの数が多すぎるとレンダリング性能が低下します。

Shader Passで重要な属性：

​`renderState`レンダリング状態を取得します。取得後もこれを修正することができます。

###1.多ShaderPassの簡単な例

下の例は、公式マルチパスの説明例から来ています。[demo示例](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)を選択します。

#####最初のPassで使用した着色器:

頂点検出器`outline.vs`コードは以下の通りです


```c++

attribute vec4 a_Position; 
attribute vec3 a_Normal;

uniform mat4 u_MvpMatrix; 
uniform float u_OutlineWidth;

void main()
{
    vec4 position = vec4(a_Position.xyz + a_Normal * u_OutlineWidth, 1.0);
    gl_Position = u_MvpMatrix * position;
}
```


パッチ`outline.fs`コードは以下の通りです


```c++

#ifdef FSHIGHPRECISION
precision highp float; 
#else 
    precision mediump float; 
#endif 

uniform float u_OutlineLightness; 
uniform vec4 u_OutlineColor;

void main() 
{ 
    vec3 finalColor = u_OutlineColor.rgb * u_OutlineLightness; 
    gl_FragColor = vec4(finalColor,0.0); 
}
```


#####第二のPassで使用した着色器:

頂点検出器`outline02.vs`コードは以下の通りです


```c++

#include "Lighting.glsl";

attribute vec4 a_Position; 
attribute vec2 a_Texcoord0; 

uniform mat4 u_MvpMatrix; 
uniform mat4 u_WorldMat; 


attribute vec3 a_Normal; 
varying vec3 v_Normal; 
varying vec2 v_Texcoord0; 

void main() 
{ 
    gl_Position = u_MvpMatrix * a_Position; 
        
    mat3 worldMat=mat3(u_WorldMat); 
    v_Normal=worldMat*a_Normal; 
    v_Texcoord0 = a_Texcoord0; 
    gl_Position=remapGLPositionZ(gl_Position); 
}
```


パッチ`outline02.fs`コードは以下の通りです


```c++

#ifdef FSHIGHPRECISION 
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v_Texcoord0;
varying vec3 v_Normal;

uniform sampler2D u_AlbedoTexture;

void main()
{
    vec4 albedoTextureColor = vec4(1.0);
    
    albedoTextureColor = texture2D(u_AlbedoTexture, v_Texcoord0);
    gl_FragColor=albedoTextureColor;
}
```


#####カスタムShaderを初期化する

>カラーフィルタコードの導入


```javascript

import OutlineFS from "../customShader/outline.fs";
import OutlineVS from "../customShader/outline.vs";
import Outline02FS from "../customShader/outline02.fs";
import Outline02VS from "../customShader/outline02.vs";
```


>Shaderを初期化する


```typescript

static initShader() {
    //所有的attributeMap属性
    var attributeMap = {
        'a_Position': Laya.VertexMesh.MESH_POSITION0, 
        'a_Normal': Laya.VertexMesh.MESH_NORMAL0, 
        'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
  	};
    //所有的uniform属性
    var uniformMap = {
        'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 
        'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
        'u_OutlineWidth': Laya.Shader3D.PERIOD_MATERIAL, 
        'u_OutlineLightness': Laya.Shader3D.PERIOD_MATERIAL,
        'u_OutlineColor': Laya.Shader3D.PERIOD_MATERIAL,
        'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL
	};
	//注册多pass描边Shader
    var customShader = Laya.Shader3D.add("MultiplePassOutlineShader");
    //创建一个subShader
    var subShader = new Laya.SubShader(attributeMap, uniformMap,shaderDefines);
    customShader.addSubShader(subShader);
    
    //添加一个Pass
    var pass1 = subShader.addShaderPass(OutlineVS, OutlineFS);
    //剔除正面
    pass1.renderState.cull = Laya.RenderState.CULL_FRONT;

    //添加第二个Pass
    subShader.addShaderPass(Outline02VS, Outline02FS);
}
```


#####カスタムシャーダーを使う

前のステップでは、多Passのエッジを使ったShaderの材質を構成しています。そして以前と同じように材質を使えばいいです。使用前に材質を初期化してください。


```typescript

//初始化Shader
MultiplePassOutlineMaterial.initShader();
//加载网格
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh) {
    var layaMonkey = scene.addChild(new Laya.MeshSprite3D(mesh));
    layaMonkey.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
    layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
    //创建材质
    var customMaterial = new MultiplePassOutlineMaterial();
    //漫反射贴图
    Laya.Texture2D.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/diffuse.png", Laya.Handler.create(this, function(texture) {
        customMaterial.albedoTexture = texture;
    }));
    //设置材质
    layaMonkey.meshRenderer.sharedMaterial = customMaterial;
    //开启旋转
    Laya.timer.frameLoop(1, this, function() {
        layaMonkey.transform.rotate(this.rotation, false);
    });
}));
```


！[](img/1.gif)<br/>

###2.stateMap

はい、`subShader`チャンネルを追加する場合は、頂点のスポットライトとフラグメントのスポットライトの他に、三つ目のオプションパラメータがあります。**stateMap**レンダリング状態表は、このパラメータでこのShaderのレンダリング状態を修正することができます。

**注意:**

**1.**stateMapがない場合、この材質はShader毎に提出します。つまり、一つの材質のレンダリング状態を修正して、このシャダーを使った材質はレンダリング状態に応じて全部修正されます。

**2.**stateMapを設置した後、材質は材質のインスタンスごとに提出します。つまり、素材のレンダリング状態を修正して、自分自身のレンダリング状態だけを修正します。

！[](img/2 png)<br/>

私達はBlinnphongの材質の添加を見てもいいです。`stateMap`のコードです。

>BLINNPHONG素材初期化


```typescript

var stateMap = {
			's_Cull': Laya.Shader3D.RENDER_STATE_CULL,
			's_Blend': Laya.Shader3D.RENDER_STATE_BLEND,
			's_BlendSrc': Laya.Shader3D.RENDER_STATE_BLEND_SRC,
			's_BlendDst': Laya.Shader3D.RENDER_STATE_BLEND_DST,
			's_DepthTest': Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
			's_DepthWrite': Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
		}

var shader = Laya.Shader3D.add("BLINNPHONG", null, null, true);
var subShader = new Laya.SubShader(attributeMap, uniformMap);
shader.addSubShader(subShader);
subShader.addShaderPass(MeshBlinnPhongVS, MeshBlinnPhongPS, stateMap);
```


>BLINNPHONG材質関連のレンダリング通路は、ここでは削除例のみです。


```typescript

//关联剔除通道
static CULL = Laya.Shader3D.propertyNameToID("s_Cull");
/**
 * 设置剔除方式。
 * @param value 剔除方式。
 */
set cull(value:int) {
    this._shaderValues.setInt(BlinnPhongMaterial.CULL, value);
}

/**
 * 获取剔除方式。
 * @return 剔除方式。
 */
get cull() {
    return this._shaderValues.getInt(BlinnPhongMaterial.CULL);
}
```


stateMapがない場合は、ShaderPassのrenderstateを修正することによってしか修正できません。

>マルチPassのエッジsharderでPassのrendentを使ってレンダリング状態を修正します。


```typescript

var pass1:ShaderPass = subShader.addShaderPass(OutlineVS, OutlineFS);
//修改渲染状态
pass1.renderState.cull = Laya.RenderState.CULL_FRONT;
```


stateMapでkeyは異なるレンダリング状態を表しています。keyの値は対応するレンダリングチャネルである。key名は開発者の習慣によって自分で書くことができます。

|属性名|チャンネル𞓜
|----------------------------------------------|
|Shader 3 D.RENDERUTEUCULLを取り除く。
|深さ試験|Shader 3 D.RENDER_STATEdePTH|
|深さ書き込み
|混𞓜Shader 3 D.RENDER_STATEUBLEND124;
|混合源|Shader 3 D.RENDER_STATEUBLEND|
|混合目標|Shader 3 D.RENDER_STATEUBLEND|
|混合源RGB|Shader 3 D.RENDER_STATEuBLENDUSRC|
|混合目標RGB|Shader 3 D.RENDER_STATEuBLENDUDST|
|混合源ALPHA|Shader 3 D.RENDER_STATEUBLENDUSRCALPHA|
|混合目標ALPHA Shader 3 D.RENDER_STATEUBLENDUDST
|混常量色|Shader 3 D.RENDER_STATEuBLEND咻
|混合方程式|Shader 3 D.RENDER_STATEuBLENDUQUATION
|RGB混合方程式|Shader 3 D.RENDER_STATEuBLENDUQUATION＿RGB|
|ALPHA混合方程式|Shader 3 D.RENDER_STATEuBLENDUEQUATIONUALPHA|

各レンダリング状態のオプションについては、表示できます。`RenderState`における列挙([地址](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=&class=_laya_d3_core_material_renderstate_.renderstate%3Ch1%3Esrcblendrgb)を選択します。

！[](img/3%png)<br/>

枠の選択部分はレンダリング状態です。これらの値でレンダリング状態を変更できます。

枠以外の部分はレンダリング状態のリストです。

**注意**：stateMapを設置すれば、通過できます。`_shaderValues`RenderStateで設定されたレンダリング状態を上書きします。

