# 如何自定义Shader

###### *version :2.3.0   Update:2019-10-8*

여기에서 사용자 정의 shader 를 간단하게 소개합니다.LayairierID의 3D 시례 항목 기초에서 수정되었습니다.

####1. 정점 착색기와 원본 착색기 프로그램을 작성합니다.

프로젝트 코드 동급 폴더`customMaterials`하

정점 착색기`simpleShader.vs`코드 다음과 같습니다:


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


원색기`simpleShader.fs`코드 다음과 같습니다:


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


####2. 코드 중 Shader 구성

코드 중**"조립".**Shader, 이 구간 코드가 Main.ts 에 추가됩니다.

>> 인용으로 착색기 코드 가져오기


```typescript

import simpleShaderFS from "./simpleShader.fs";
import simpleShaderVS from "./simpleShader.vs";
```


> 초기화 shader


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


####3. 사용자 정의 소재 실현

사용자 정의 소재와 이 소재를 설정한 Shader.


```typescript

export class CustomMaterial extends Laya.BaseMaterial {
    constructor() {
        super();
        //设置本材质使用的shader名字
        this.setShaderName("CustomShader");
    }
}
```


####4. 사용자 정의 소재 사용

사용자 정의 소재를 사용하기 전에 자신을 초기화하는 Shader.Layaiair 안에 있는 소재가 따라서.`Laya3D.init`초기화.여기 저희가 호출을 해야 돼요.`initShader`방법.여기에 우리가 직접 Main 에서 자신의 Shader 를 초기화한다.


```typescript

........	
	Laya.alertGlobalError = true;

	//初始化自定义Shader
    this.initShader();

    //激活资源版本控制，版本文件由发布功能生成
    Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
.......
```


GameUI 에서 사용자 정의 소재를 사용합니다.


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


실행된 후, 시각의 효과를 조정합니다.

[] (img/2.png)<br>(2)

이 착색기에서 우리는 얻은 지점의 세계 좌표를 3차원 매트릭스로 바꾸고, 다시 법선과 상등한 것이다`v_Normal`이 점의 색상 값으로 표시됩니다.얻은 것이 바로 이 모양의 모형이다.