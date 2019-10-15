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

Shader 초기화 후**Shaderpass 소개 편**상세한 설명이 있다. 만약 이 Shader 에서 프리드마크(재질)가 제출한 유포m 수치를 사용하면 개발자는 사용해야 한다.`_shaderValues`Shader 속성을 묶습니다.Shader 속성을 바인딩한 후 재질의 속성 엔진이 자동으로 연결되는 Shader 속성입니다.

그리고 앞의 착색기 코드를 분석하고 Shader 초기화할 때 uniformMap:

> 초기화 시 유포mMap


```typescript

var uniformMap:Object = {
    'u_MvpMatrix': Shader3D.PERIOD_SPRITE,
    'u_WorldMat': Shader3D.PERIOD_SPRITE,
    'u_OutlineWidth': Shader3D.PERIOD_MATERIAL,
    'u_OutlineLightness': Shader3D.PERIOD_MATERIAL,
    'u_OutlineColor': Shader3D.PERIOD_MATERIAL,
    'u_AlbedoTexture': Shader3D.PERIOD_MATERIAL
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


```typescript

//绑定漫反射贴图
public static const ALBEDOTEXTURE:int = Shader3D.propertyNameToID("u_AlbedoTexture");
//绑定描边颜色
public static const OUTLINECOLOR:int = Shader3D.propertyNameToID("u_OutlineColor");
//绑定描边宽度
public static const OUTLINEWIDTH:int = Shader3D.propertyNameToID("u_OutlineWidth");
//绑定描边亮度
public static const OUTLINELIGHTNESS:int=Shader3D.propertyNameToID("u_OutlineLightness");
```


연관이 완료되면 얻은 ID 를 통해 대응하는 속성을 수정할 수 있다.

다음은 우리의 사용자 정의 소재 중 'u shadervalues가 사용한 커버입니다.

>> 커버 _shaderValues수정 소재 속성


```typescript

/**
 * 获取漫反射贴图。
 * @return 漫反射贴图。
 */
public function get albedoTexture():BaseTexture {
    return _shaderValues.getTexture(ALBEDOTEXTURE);
}

/**
 * 设置漫反射贴图。
 * @param value 漫反射贴图。
 */
public function set albedoTexture(value:BaseTexture):void {
    if (value)
        _defineDatas.add(MultiplePassOutlineMaterial.SHADERDEFINE_ALBEDOTEXTURE);
    else
        _defineDatas.remove(MultiplePassOutlineMaterial.SHADERDEFINE_ALBEDOTEXTURE);
    _shaderValues.setTexture(ALBEDOTEXTURE, value);
}
/**
 * 获取线条颜色
 * @return 线条颜色
 */
public function get outlineColor():Color {
    return _shaderValues.getVector(OUTLINECOLOR);
}

public function set outlineColor(value:Color):void {
    _shaderValues.setVector(OUTLINECOLOR, value);
}
/**
 * 获取轮廓宽度。
 * @return 轮廓宽度,范围为0到0.05。
 */
public function get outlineWidth():Number {
    return _shaderValues.getNumber(OUTLINEWIDTH);
}

/**
 * 设置轮廓宽度。
 * @param value 轮廓宽度,范围为0到0.05。
 */
public function set outlineWidth(value:Number):void {
    value = Math.max(0.0, Math.min(0.05, value));
    _shaderValues.setNumber(OUTLINEWIDTH, value);
}

/**
 * 获取轮廓亮度。
 * @return 轮廓亮度,范围为0到1。
 */
public function get outlineLightness():Number {
    return _shaderValues.getNumber(OUTLINELIGHTNESS);
}

/**
 * 设置轮廓亮度。
 * @param value 轮廓亮度,范围为0到1。
 */
public function set outlineLightness(value:Number):void {
    value = Math.max(0.0, Math.min(1.0, value));
    _shaderValues.setNumber(OUTLINELIGHTNESS, value);
}
```


###2. 포장이 좋은 속성을 사용한다

소재 속성을 잘 포장한 후 사용할 수 있습니다.

> 사용자 정의 소재 사용


```typescript

//加载网格
Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Handler.create(this, function(mesh:Mesh):void {
    //设置猴子
    var layaMonkey:MeshSprite3D = scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
    layaMonkey.transform.localScale = new Vector3(0.3, 0.3, 0.3);
    layaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
    //创建材质
    var customMaterial:MultiplePassOutlineMaterial = new MultiplePassOutlineMaterial();
    //漫反射贴图
    Texture2D.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/diffuse.png", Handler.create(this, function(texture:Texture2D):void {
        //设置多描边材质的贴图
        customMaterial.albedoTexture = texture;
    }));
    //设置材质
    layaMonkey.meshRenderer.sharedMaterial = customMaterial;
    //开启旋转
    Laya.timer.frameLoop(1, this, function():void {
        layaMonkey.transform.rotate(rotation, false);
    });
}));
```






#### 

