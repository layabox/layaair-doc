#Shaderpass 소개

######  *version :2.3.0   Update:2019-10-8*

SubShader 에서 일련의 정의를 했습니다.**패스 (채널)**.Pass 마다 전체 보카시 프로세스를 정의합니다.Pass 숫자가 지나치면 렌더 성능의 하락을 야기할 수 있다.

ShaderPass 중 중요한 속성:

​`renderState`렌더 상태 가져오기.취득 후 수정도 가능하다.

###1. 다샤드패스 간단한 예시

아래쪽의 예례는 공식 다패스 변두리에서 예례를 보여 준다[demo示例](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)무엇

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


#####사용자 정의 초기화

> Shader 초기화


```typescript

public static function initShader():void {
    //所有的attributeMap属性
    var attributeMap:Object = {'a_Position': VertexMesh.MESH_POSITION0, 
                               'a_Normal': VertexMesh.MESH_NORMAL0, 
                               'a_Texcoord0': VertexMesh.MESH_TEXTURECOORDINATE0
                              };
    //所有的uniform属性
    var uniformMap:Object = {'u_MvpMatrix': Shader3D.PERIOD_SPRITE, 
                             'u_WorldMat': Shader3D.PERIOD_SPRITE,
                             'u_OutlineWidth': Shader3D.PERIOD_MATERIAL, 
                             'u_OutlineLightness': Shader3D.PERIOD_MATERIAL,
                             'u_OutlineColor': Shader3D.PERIOD_MATERIAL,
                             'u_AlbedoTexture': Shader3D.PERIOD_MATERIAL
                            };
	//注册多pass描边Shader
    var customShader:Shader3D = Shader3D.add("MultiplePassOutlineShader");
    //创建一个subShader
    var subShader:SubShader = new SubShader(attributeMap, uniformMap,shaderDefines);
    customShader.addSubShader(subShader);
    
    var vs1:String = __INCLUDESTR__("../customShader/outline.vs");
    var fs1:String = __INCLUDESTR__("../customShader/outline.fs");
    //添加一个Pass
    var pass1:ShaderPass = subShader.addShaderPass(vs1, fs1);
    //剔除正面
    pass1.renderState.cull = RenderState.CULL_FRONT;

    var vs2:String = __INCLUDESTR__("../customShader/outline02.vs");
    var fs2:String = __INCLUDESTR__("../customShader/outline02.fs");
    //添加第二个Pass
    subShader.addShaderPass(vs2, fs2);
}
```


#####사용자 정의

앞의 절차에서 다Pass 를 사용한 Shader 소재를 구성했습니다.그리고 예전과 같이 소재를 사용하면 됩니다.하지만 사용 전에 소재를 초기화하는 것을 기억합니다.


```typescript

//初始化Shader
MultiplePassOutlineMaterial.initShader();
//加载网格
Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Handler.create(this, function(mesh:Mesh):void {
    var layaMonkey:MeshSprite3D = scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
    layaMonkey.transform.localScale = new Vector3(0.3, 0.3, 0.3);
    layaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
    //创建材质
    var customMaterial:MultiplePassOutlineMaterial = new MultiplePassOutlineMaterial();
    //漫反射贴图
    Texture2D.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/diffuse.png", Handler.create(this, function(texture:Texture2D):void {
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


[] (img/1.gif)<br>

###2. stattemap

… 에`subShader`채널을 추가할 때 정점 착색기와 단편적인 색기 외에도 세 번째 출력 변수:**statitmap**렌더 상태표는 이 Shader 의 렌더를 수정할 수 있습니다.

**주의:**

**일.**statteMap이 없을 때 이 소재는 Shader를 따라 제출한다.재질의 보카시 상태를 수정하면 이 쇼더의 소재를 사용하면 보카시 상태를 모두 수정할 수 있다.

**이.**statteMap 설치 후 이 소재 하나에 실속 제출.소재의 보카시 상태를 수정한 뒤 자신의 보카시 상태만 수정했다.

[] (img/2.png)<br>

저희 Blinnphong 소재 보실 수 있어요.`stateMap`코드.

> 블링펑 소재 초기화


```typescript

...
var stateMap: Object = {
			's_Cull': Shader3D.RENDER_STATE_CULL,
			's_Blend': Shader3D.RENDER_STATE_BLEND,
			's_BlendSrc': Shader3D.RENDER_STATE_BLEND_SRC,
			's_BlendDst': Shader3D.RENDER_STATE_BLEND_DST,
			's_DepthTest': Shader3D.RENDER_STATE_DEPTH_TEST,
			's_DepthWrite': Shader3D.RENDER_STATE_DEPTH_WRITE
		}

var shader: Shader3D = Shader3D.add("BLINNPHONG", null, null, true);
var subShader: SubShader = new SubShader(attributeMap, uniformMap);
shader.addSubShader(subShader);
subShader.addShaderPass(MeshBlinnPhongVS, MeshBlinnPhongPS, stateMap);
...
```


>> BLINNPHONG 소재에 연관된 렌더채널, 여기에는 예외만 제거합니다.


```typescript

//关联剔除通道
public static const CULL:int = Shader3D.propertyNameToID("s_Cull");
/**
 * 设置剔除方式。
 * @param value 剔除方式。
 */
public function set cull(value:int):void {
    _shaderValues.setInt(CULL, value);
}

/**
 * 获取剔除方式。
 * @return 剔除方式。
 */
public function get cull():int {
    return _shaderValues.getInt(CULL);
}
```


stateMap 없이 ShaderPass renderstate를 수정할 수밖에 없습니다.

> 다Pass 네임 shader 에서 Pass renderstat 렌더스처 수정 상태


```typescript

var pass1:ShaderPass = subShader.addShaderPass(vs1, fs1);
//修改渲染状态
pass1.renderState.cull = RenderState.CULL_FRONT;
```


스테메이크업에서 키는 다른 보카시 상태다.key 의 값은 대변적인 렌트채널이다.key 이름은 개발자 습관에 따라 글을 쓸 수 있다.

일렉트론
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
하나, 둘, 셋, 하나, 둘, 셋, 셋, 셋, 넷, 넷, 넷, 넷, 넷
124센티미터 테스트
하나, 둘, 하나, 둘, 셋, 셋, 셋, 넷, 셋, 넷, 셋, 넷, 셋, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 셋, 넷, 넷
124테리어 혼합
1244의 혼합원12444 thader3D.RENDE STATEu STATEu BLEND
1,1244의 혼합 목표
하나, 둘, 하나, 둘, 셋, 셋, 넷, 셋, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 넷, 셋, 넷,
"Shader3D.Eunder3D. ENDER STATEu BLEN Du RGB" RGB
1244원 ALPHA "124대 Shader3D.RENDER STATE USRC ALPHA
1244의 혼합 목표 ALPHA, 124대 Shader3D. RENDER, STATE, u DST, ALPHA
12444의 상량 컬러를 혼합하여 124테르3D.RENDER STATE u COLEND COLOR 124장
1244의 혼합 방정식
1244 RGB 혼합 방정식 124사이드 샤더3D. 렌더더스테, 유더비큐, 유아토르토
1244 ALPHA 의 혼합 방정식 124대 Shader3D. RENDER STATE u EQUATION UATION UALPHA

보카시 상태 선택 사항`RenderState`가운데 열거[地址](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=&class=_laya_d3_core_material_renderstate_.renderstate%3Ch1%3Esrcblendrgb)무엇

[] (img/3.png)<br>

상자 선택 부분은 렌더상태로 이 값을 통해 렌더를 수정할 수 있습니다.

비상자 선택 부분은 렌더링 상태로 열거합니다.

**주의하다**statteMap 설정하면 통과할 수 있다`_shaderValues`RenderState 에서 설정된 렌더를 덮어씁니다.

