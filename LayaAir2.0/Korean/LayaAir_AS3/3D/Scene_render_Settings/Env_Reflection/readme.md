#장면 환경 반사

###### *version :2.0.1beta   Update:2019-3-19*

장면 환경 반사 두 종류, 하늘상자 반사와 자정의 반사.반사효과는 반드시 Shader 에서 반사 소재가 없어도 효과가 없다. 기본 블리닝은 지지하지 않는다. PBR 소재는 환경 반사를 지원하는 것이다.환경반사와 관련해 유니티에 설치된 후 사용을 추천하는 것이다.

하늘박스 반사: 직접 반사하는 것은 재질이 직접 현재 하늘공을 반사한 환경반사.이것은 잠시 실현되지 않아 후속된 버전 지원을 할 것이다.

####Unity 설정 환경 반사

우선 준비된 소재 볼을 보러 오세요.

[] (img/1.png)<br>(1)

이 재질구에서 우리는 레이이아르3D에서 제공한 PBR 표준 소재를 사용한다.설정 중에 저희가 뽑았습니다.`Enable Reflection`환경 반사 옵션을 열지 여부는 환경반사 효과를 더욱 잘 관찰하기 위해 재질의`MetallicGloss`금속도 최고.설치 후 재질구를 하나 추가합니다.

[] (img/2.png)<br>(2)

그리고 우리는 장면에 하늘상자를 첨가했다.열다**윈도**--**라이트**--**Setting**인터페이스.

[] (img/3.png)<br>(2)

환경의 하늘공 소재를 설치한 다음`Environment Reflections`환경 반사 중 Source 는 Custom 사용자 정의 반사입니다.Cubemap 현재 하늘공의 cubemap 선택합니다.

설치된 후 유닛에서 효과를 볼 수 있는 효과를 보실 수 있는 후 사용합니다.

[] (img/4.png)<br>(4)

####코드 설정 환경 반사 사용

이 부분 코드 는 공식 측에서 예제 를 절선한다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Scene3D&name=EnvironmentalReflection)무엇


```typescript

//设置场景的反射模式(全局有效),场景的默认反射模式也是custom模式
scene.reflectionMode = Scene3D.REFLECTIONMODE_CUSTOM;

//天空盒
BaseMaterial.load("res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Handler.create(null, function(mat:SkyBoxMaterial):void {
    //获取相机的天空盒渲染体
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //设置天空盒mesh
    skyRenderer.mesh = SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
    //设置场景的反射贴图
    scene.customReflection = mat.textureCube;
    //设置曝光强度
    var exposureNumber:Number = 0;
    mat.exposure = 0.6 + 1;
}));

.....

//加载Mesh
Mesh.load("res/threeDimen/staticModel/teapot/teapot-Teapot001.lm", Handler.create(null, function(mesh:Mesh):void {
    teapot = scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
    teapot.transform.position = new Vector3(0, 1.75, 2);
    teapot.transform.rotate(new Vector3(-90, 0, 0), false, false);
}));

//实例PBR材质
var pbrMat:PBRStandardMaterial = new PBRStandardMaterial();
//开启该材质的反射
pbrMat.enableReflection = true;
//设置材质的金属度，尽量高点，反射效果更明显
pbrMat.metallic = 1;

//加载纹理
Texture2D.load("res/threeDimen/pbr/jinshu.jpg", Handler.create(null, function(tex:Texture2D):void {
    //pbrMat.albedoTexture = tex;
    teapot.meshRenderer.material = pbrMat;
}));
```


[] (img/5.png)<br>(도 5)



