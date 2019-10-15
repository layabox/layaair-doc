#shader 관련 uniform

###### *version :2.3.0   Update:2019-10-8*

여기는 저희가 공식 홈페이지를 사용해서 예례를 표시합니다.[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)----**Shader (다Pass)**가운데 샤더는 사례로 해석한다.

우선 착색기 코드:

#####첫 번째 패스가 사용한 색기:

정점 착색기`outline.vs`코드 다음과 같습니다:


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


원색기`outline.fs`코드 다음과 같습니다:


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


#####두 번째 패스가 사용한 색기:

정점 착색기`outline02.vs`코드 다음과 같습니다:


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


원색기`outline02.fs`코드 다음과 같습니다:


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


###1. 사용자 정의 속성

**Basematerail**모든 소재의 기류입니다.Basematerail의...`_shaderValues:ShaderData`소재의 속성입니다.

Shader 초기화 후**Subshader 소개 편**상세한 설명이 있다. 만약 이 Shader 에서 프리드마크(재질)가 제출한 유포m 수치를 사용하면 개발자는 사용해야 한다.`_shaderValues`Shader 속성을 묶습니다.Shader 속성을 바인딩한 후 재질의 속성 엔진이 자동으로 연결되는 Shader 속성입니다.

그리고 앞의 착색기 코드를 분석하고 Shader 초기화할 때 uniformMap:

> 초기화 시 유포mMap


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


이 색기 중에 저희가 6 개를 썼어요.`uniform`：

`u_MvpMatrix`MVP 행렬

`u_WorldMat`세계 매트릭스

이 두 값은 모두 요정들을 쫓는 uniform 이며 엔진 처리를 통해 전송된다.필요한 것이 없다면 자신의 사용자 정의 샤더에서 이 두 속성에 대해 바인딩 설정을 할 수 있다.

`u_OutlineColor`테두리 색

`u_OutlineLightness`스캐너 밝기

`u_AlbedoTexture`만반사 스티커

`u_OutlineWidth`스캐너 너비

이상 4개변수는 우리가 설치한 재질의 유포m입니다. 개발자는 스스로 유시퍼Values를 통해 uniform 에 제출해야 합니다.

shader 의 유포를 분석한 후 재질의 u shadervalues와 유포m에 연관될 수 있다.

>>사용**Shader3D**중`propertyNameToID`방법 관련 소재의 유시드러비즈와 shader uniform 입니다.


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


연관이 완료되면 얻은 ID 를 통해 대응하는 속성을 수정할 수 있다.

다음은 우리의 사용자 정의 소재 중 'u shadervalues가 사용한 커버입니다.

>> 커버 _shaderValues수정 소재 속성


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


###2. 포장이 좋은 속성을 사용한다

소재 속성을 잘 포장한 후 사용할 수 있습니다.

> 사용자 정의 소재 사용


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

