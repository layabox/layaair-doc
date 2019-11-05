#シャダー関連のuniform

###### *version :2.3.0   Update:2019-10-8*

ここでは公式サイトの例を使っています。[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline))**クリッピングヘッド(多Pass)**のsharderを事例として解説します。

まず、カラータイマーのコードを見に来ました。

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


###1.カスタム属性の定義

**BaseMaterail**すべての材質のベースです。BaseMaterailの`_shaderValues:ShaderData`材質の属性です。

Shaderを初期化した後（このShaderの初期化は、**Sub Shader紹介編**詳しく説明していますが、このShaderにPERIOD＿MATERIAL（材質毎）の提出されたuniform値があれば、開発者は使用しなければなりません。`_shaderValues`を選択します。Shader属性をバインドした後、材質を変更する属性エンジンが自動的に関連するShader属性に関連します。

次に、前のカラータイマーコードとShaderを初期化する時のuniformMapを分析します。

>初期化時のuniformMap


```typescript

var uniformMap = {
    'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
    'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
    'u_OutlineWidth': Laya.Shader3D.PERIOD_MATERIAL,
    'u_OutlineLightness': Laya.Shader3D.PERIOD_MATERIAL,
    'u_OutlineColor': Laya.Shader3D.PERIOD_MATERIAL,
    'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL
}
```


この着色器の中で6つを使いました。`uniform`:

`u_MvpMatrix`MVPマトリクス

`u_WorldMat`世界行列

この二つの値は精霊を追うuniformで、エンジンによって処理されて伝わってきます。もし必要がないなら、自分のカスタマイズしたsharerでこの二つの属性をバインディングしなくてもいいです。

`u_OutlineColor`エッジの色

`u_OutlineLightness`画端の明るさ

`u_AlbedoTexture`拡散反射スタンプ

`u_OutlineWidth`引き取り幅

以上の4つのパラメータは私達が設定した素材ごとのuniformです。これは開発者自身がSharder Valuesを通じてuniformに提出する必要があります。

sharerの中のuniformを分析してから、材質のu shardeValuesとuniformを関連付けることができます。

>使用**Shader 3 D**的に命中する`propertyNameToID`方法関連の材質の_sharder Valuesとsharer uniform。


```javascript

//绑定漫反射贴图
public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
//绑定描边颜色
public static OUTLINECOLOR = Laya.Shader3D.propertyNameToID("u_OutlineColor");
//绑定描边宽度
public static OUTLINEWIDTH = Laya.Shader3D.propertyNameToID("u_OutlineWidth");
//绑定描边亮度
public static OUTLINELIGHTNESS = Laya.Shader3D.propertyNameToID("u_OutlineLightness");
```


関連が完了すれば、IDを取得することで対応する属性を変更することができます。

下は私達のカスタム材質の中で_shardeValuesに使うパッケージです。

>パッケージ化_sharder Valuesにより、材質の属性を変更することができます。


```typescript

/**
 * 获取漫反射贴图。
 * @return 漫反射贴图。
 */
get albedoTexture(){
    return this._shaderValues.getTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE);
}

/**
 * 设置漫反射贴图。
 * @param value 漫反射贴图。
 */
set albedoTexture(value) {
    if (value)
        this._defineDatas.add(MultiplePassOutlineMaterial.SHADERDEFINE_ALBEDOTEXTURE);
    else
        this._defineDatas.remove(MultiplePassOutlineMaterial.SHADERDEFINE_ALBEDOTEXTURE);
    this._shaderValues.setTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE, value);
}
/**
 * 获取线条颜色
 * @return 线条颜色
 */
get outlineColor() {
    return this._shaderValues.getVector(MultiplePassOutlineMaterial.OUTLINECOLOR);
}

set outlineColor(value) {
    this._shaderValues.setVector(MultiplePassOutlineMaterial.OUTLINECOLOR, value);
}
/**
 * 获取轮廓宽度。
 * @return 轮廓宽度,范围为0到0.05。
 */
get outlineWidth(){
    return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH);
}

/**
 * 设置轮廓宽度。
 * @param value 轮廓宽度,范围为0到0.05。
 */
set outlineWidth(value){
    value = Math.max(0.0, Math.min(0.05, value));
    this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH, value);
}

/**
 * 获取轮廓亮度。
 * @return 轮廓亮度,范围为0到1。
 */
get outlineLightness() {
    return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS);
}

/**
 * 设置轮廓亮度。
 * @param value 轮廓亮度,范围为0到1。
 */
set outlineLightness(value){
    value = Math.max(0.0, Math.min(1.0, value));
    this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS, value);
}
```


###2.パッケージした属性を使う

材質の属性を包装してから使えます。

>カスタム素材を使う


```typescript

//加载网格
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh) {
    //设置猴子
    var layaMonkey = scene.addChild(new Laya.MeshSprite3D(mesh));
    layaMonkey.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
    layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
    //创建材质
    var customMaterial = new Laya.MultiplePassOutlineMaterial();
    //漫反射贴图
  Laya.Texture2D.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/diffuse.png", Laya.Handler.create(this, function(texture) {
        //设置多描边材质的贴图
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






#### 

