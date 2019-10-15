#Subshader 소개

###### *version :2.3.0   Update:2019-10-8*

​**SubShader 착색기**샤더의 렌더로 이해할 수 있습니다.Shader 마다 최소한 subshader 1개, subshader가 많을 수 있습니다.

Layair3D에서 SubShader 속성 소개:

​`setFlag`태그 추가.

​`getFlag`표기를 얻다.

​`addShaderPass`Shaderpas를 추가합니다.

###1. Subshader 만들기

앞 의 간단한 사용자 정의 shader 사용 중 우리 는 이미 간단한 접촉 이 수bshader 에 가장 중요 한 사용 했 다`addShaderPass`Shaderpass 인터페이스를 추가합니다.


```typescript

 //所有的attributeMap属性
var attributeMap = {
    'a_Position': Laya.VertexMesh.MESH_POSITION0,
    'a_Normal': Laya.VertexMesh.MESH_NORMAL0
};

//所有的uniform属性
var uniformMap = {
    'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 
    'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE
};

//注册CustomShader 
var customShader = Laya.Shader3D.add("CustomShader");

//创建一个SubShader
var subShader = new Laya.SubShader(attributeMap, uniformMap);

//我们的自定义shader customShader中添加我们新创建的subShader
customShader.addSubShader(subShader);

//往新创建的subShader中添加shaderPass
subShader.addShaderPass(simpleShaderVS, simpleShaderFS);
```


###2. attributeMap 과 uniformMap

SubShader 창건에 필요한 두 개의 중요한 인자를 강조합니다:`attributeMap`,`uniformMap`.

> 관련`spriteDefines`과`materialDefines`뒤에 있을 거예요.**Shader 매크로 정의**편 강연.동시에 2.3.3 버전에서 SubShader 창건을 최적화시켰으니 이 두 가지 속성을 다시 전할 필요가 없다.

[] (img/1.png)<br>

이 두 개**Object**모두 자신의 Shader 중 attribute 변수 이름이나 uniform 변수를 key, 예를 들어 au Position, u MvpMatrix.

**attributemap**중key 대응 value 는 이 속성이 렌더할 때 대응하는 정상 채널이다.

**uniformMap**중key 대응 value 는 이 속성 제출 주기입니다.

`uniformMap`현재 지원하는 주기 형식:

**Shader3D.PERIODu CAMERA**shader 변수 주기 제출 카메라.****
****
**Shader3D.PERIODu CUSTOM**shader 변수 주기, 사용자 정의****
****
**Shader3D.PERIODu MuTERIAL**shader 변수 주기 제출 재질.****
****
**Shader3D.PERIODU SCEN**shader 변수 주기 제출 장면.****
****
**Shader3D.PERIODu SPRITE *: shader 변수 주기, 요정과 카메라, 주: 요정은 MVP 행진을 포함해서 복합 속성을 포함하기 때문에 카메라가 변화할 때도 제출해야 한다.

한 장면마다 카메라를 쫓고, 요정과 카메라를 쫓는 이 세 주기의 uniform 은 엔진이 자동으로 전입되는 수치다.

재질과 사용자 정의 주기의 uniform 모두 개발자가 접수한 전입.공식 예시 다Pass 네임 Shader 중[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)개발자 스스로 처리한다**테두리 색**,**라인 너비**등uniform 값.(개발자에 대한 자신의 처리는 유포m 수치가 있다.**shader 관련 uniform**편중

엔진 지원에 대한 attribute, 엔진에서 처리한 유form과 대응 양식을 볼 수 있습니다.(attribute 표, uniform 표)


