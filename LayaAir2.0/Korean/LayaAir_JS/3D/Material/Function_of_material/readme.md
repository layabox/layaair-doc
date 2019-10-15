#소재의 기능 소개

###### *version :2.1.0beta   Update:2019-5-14*

###1. 모형에서 소재 가져오기

내보내는 모형을 사용하면 엔진이 자동으로 모형에 재질을 가재할 수 있으며, 많은 모형상 여러 표준 소재가 생길 수 있으며 자동으로 개발시간을 아끼는 경우가 많다.하지만 이런 상황에서 우리가 변화하고 재질 교체가 필요하면 어떨까?우선 모형에서 현재 소재를 가져야 합니다.

Layaiair 3D 엔진은 네일 칸 렌더링 머신 및 복피 애니메이션 샘플렉스 스코니 SkinedMershRenderer, 시시시각각 모형에 대한 실례를 제공해 모형 소재를 얻을 수 있습니다.

​**Tips**Meshsprite3D 모형에서 meshRenderer, SkinedMesprite3D 모형에서 skinedMeshRenderer.

######이 두 종류 는 많은 것 이 ‘ 부류 ’ 를 계승하는 공통 인 인터페이스 를 볼 수 있다**BaseRenderer**API[API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.render.BaseRender)무엇

가져온 재질은 두 종류로 나뉜다:

자체 소재**Matrial**만약 자신의 소재가 수정되었다면 자신의 모형 디스플레이만 변화할 뿐;

공유 소재**Sharedmaterial**소재가 상대적으로 독립되므로 여러 모형이 같은 소재를 사용하여 공유 소재로 수정되면 자체 모델이 바뀌고 다른 모델은 이 소재에 사용되는 부분도 변한다.

[] [img/1.png)<br!] [img/2.png)< br

개발자들은 구체적인 수요에 따라 스스로 선택해야 한다.

다음은 정선 코드, 구체적인 코드 는 데모 () 를 볼 수 있다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=MaterialDemo)무엇

[] (img/3.png)<br>(2)

>> 격자 렌더를 통해 모형 소재를 가져왔습니다.


```typescript

//初始化3D场景
var scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls"));
//从场景获取球型精灵
this.sphere = scene.getChildByName("Sphere");
//获取球型精灵自带的BlinnPhong材质
billinMaterial = this.sphere.meshRenderer.material;
```


> 소재를 가져온 후, 재질 수정이나 이 소재를 다른 모형으로 사용할 수 있습니다. 여기에서 받은 소재를 새로 만든 공입니다:
>>


```typescript

//代码创建一个球体
var sphere2 = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.5)));
//将创建的球放置在导出球的同一点
this.sphere2.transform.position =  this.sphere.transform.position;
//将创建的球平移
this.sphere2.transform.translate(new Laya.Vector3(0, 1.3, 0),false);
//将从导出球上拿到的材质 贴给代码创建的球
this.sphere2.meshRenderer.material = billinMaterial;
```


그리고 효과를 볼 수 있습니다. 그림 4개처럼:

[] (img/4.png)<br>(4)

###2. 모델 소재 수정

소재를 받을 수 있는 만큼 자연스럽게 소재를 바꿀 수 있습니다.

같은 건 네일렉트로닉 요정을 통해서.`meshRenderer`격자 렌더기 수정.


```typescript

......
//创建一个新的PBRStandard材质
this.pbrStandardMaterial = new Laya.PBRStandardMaterial();
//获取新的纹理
this.pbrTexture = Laya.Loader.getRes("res/threeDimen/texture/earth.png");
//为PBRStandard材质设置漫反射贴图
this.pbrStandardMaterial.albedoTexture = this.pbrTexture;
//修改导出球的材质
this.sphere.meshRenderer.material = this.pbrStandardMaterial;
```


[] (img/5.png)<br>(도 5)

###3. 음영을 받아들일 수 있을까

그림자가 앞에 있어요.**등광편**의**어떻게 조명에 그림자 추가**명절에는 소개가 있다.[地址](https://ldc2.layabox.com/doc/?nav=zh-js-4-6-4)무엇재질에 대한 상대적인 속성만 설명합니다:

렌더링`castShadow`음영과`receiveShadow`음영을 받아들일 수 있을까.

> 아래의 코드 음영의 예로부터


```typescript

//前面给灯光设置好阴影参数之后，获取猴子模型与地板模型并且分别设置产生阴影与接受阴影
//地面接收阴影
var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh"));
//设置地板可以接受阴影
grid.getChildAt(0).meshRenderer.receiveShadow = true;

//获取一个静态网格猴子
var staticLayaMonkey = this.scene.addChild(new Laya.MeshSprite3D(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm")));

//省略调整猴子的代码.....

//设置静态网格猴子产生阴影
staticLayaMonkey.meshRenderer.castShadow = true;

//获取蒙皮网格猴子
var layaMonkey = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"));

//设置蒙皮网格猴子可以产生阴影
layaMonkey.getChildAt(0).getChildAt(0).skinnedMeshRenderer.castShadow = true;
```


[] (img/6.png)<br>(도 6)

###4. 소재 최적화

엔진은 가재 장면을 가재할 때 물체에 합병처리할 수 있으며, 광경 성능을 크게 향상시킬 수 있다.합병원칙은 같은 소재의 모형이므로 개발자는 편집 장면을 편집할 때 같은 소재를 최대한 사용하고 적을수록 좋다.이렇게 하면 앞으로 성능 최적화의 기본 조건에 도달할 수 있다.더 구체적인 것은 향후 성능 최적화편에서 설명할 것이다.