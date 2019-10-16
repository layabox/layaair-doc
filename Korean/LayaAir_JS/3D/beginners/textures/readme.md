#Layaiar3D의 소재 빛과 스티커

###재질 빛과 스티커 속성

표준 소재 속성 과 조명 빛 속성 은 일정 한 유사, 만반사, 하이라이트, 환경색 등 속성 을 구현 하지만 소재 는 더욱 완벽 해 물체 미술 효과 를 더욱 편리 한 반사율, 만반사 색상, 만반사 색과 고광색, 고광색, 환경색과 환경 스티커, 반사 색과 반사 스티커.다음은 이 속성에 대해 상세하게 소개합니다.



###반사율

반사율(albedo)이 주로 반영된 것은 소재의 밝고 색상, 수치가 높을수록 재질이 밝다.

반사율의 수치는 사차원 벡터로 아래의 코드를 살펴보고, 벡터 중 4개 원소는 각각 홍색, 녹색, 블루, 투명 alpha를 대표한다.

투명 alpha 효과는 백분율, 0 은 투명, 1 은 투명, 투명, 투명 또는 투명 디스플레이, 반사율만 조정하면 안 되고, 재질의 보카시 패턴을 혼합 형태로 만들어야 목적(도 1)을 다룰 수 있다.

3D의 여행 과정 중 코드 수정


```typescript

//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//只有设置了渲染模式为透明混合类型才能达到透明效果
//设置材质蓝色染色及30%半透明
material.albedo=new Laya.Vector4(1,1,2,0.3);
//渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
material.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;;
//为box模型赋材质
box.meshRender.material = material;
```


![1](img/1.png)(1)반사율 염색과 투명</br>



###만반사 색상과 만반사 스티커

만반사 색상(diffuseColor)은 소재의 단일색, 미술업계에서 물체의 고유색으로 불릴 수 있다.반면 만반사 스티커(diffuseTexture)는 소재의 2D 고유 텍스처 이미지를 가리키며 나무 소재에 나무 무늬 그림을 사용해야 한다. 벽돌 벽 소재는 벽돌 타일 무늬 그림을 사용해야 한다.

게임에서 가장 많이 사용하는 것은 만반사 스티커, 게임 미술 스티커를 그릴 때 작업량이 가장 큰 것도 만반사 스티커, 그것은 기본적으로 물체의 기본 질감을 반영할 수 있다.

만반사 컬러와 스티커는 레이레이아아이리 엔진에서도 혼합할 수 있다. 이 제품은 융합 효과가 있다. 만반사색은 모형 빛을 빛으로 염색할 수 있다(뒷빛은 변하지 않는다), 불빛과 비슷한 만반사 광원색으로 더욱 전체적인 색조(도)가 생긴다.

‘ 3D의 여단 ’ 과정 중 코드 수정은 다음과 같이 파란색 만반사 색깔을 창건해 빛깔이 파랗다.보기 (그림 2) 효과:


```typescript

//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0, 0, 0);
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射颜色
material.diffuseColor=new Laya.Vector3(.5,.5,2);
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//为box模型赋材质
box.meshRender.material = material;
```


![2](img/2.png)(도2) 만반사 색상과 스티커를 혼합</br>



###하이라이터

하이라이트(specular Color)와 조명이 높은 빛과 마찬가지로 모형 물체 변각을 가리키거나 광원처에 있는 하이라이트 컬러를 가리킨다.

모형상의 하이라이트는 불빛과 재질의 고광색에 영향을 받아 불빛이나 불빛이 없는 하이라이트가 검은색이라면 재질에 하이라이트와 하이라이터를 설치해도 모형상의 하이라이트는 나오지 않는다.

하이라이트 스티커 (specularTexture) 는 2D 무늬 그림으로 사진 속 픽셀 컬러는 해당 모형에 맞는 하이라이트 컬러와 밝기, 픽셀 컬러가 밝을수록 픽셀 곳의 모형이 밝아진다.

물론 고광색과 하이라이트 스티커는 동시에 사용할 수 있으며 효과는 더욱 좋고 개발자들이 반복적으로 테스트를 해 필요한 효과를 조절할 수 있다.

"빠른 속도로 3D 여단 과정 중 코드 를 수정 해 장면 에서 트럭 한 대 를 가재 해 볼 수 있 고 하이라이트 스티커 를 관찰 해 볼 수 있 는 것 과 기본 조명 하이라이트 를 비교 하 고 코드 는 다음과 같습니다:


```typescript

//创建平行光 -------------------
var light = scene.addChild(new Laya.DirectionLight());
//修改灯光方向
light.direction = new Laya.Vector3(0.3, -1, 0);
//设置高光色为白色
light.specularColor = new Laya.Vector3(1,1,1);
//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成事件监听
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,onLoadComplete);
scene.addChild(this.role3D);
this.scene.addChild(this.role3D);
/** 模型与材质加载完成后回调***/        
function onLoadComplete()
{
  //获取模型
  var meshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
  //从模型上获取共享材质
  var sharedMaterial = meshSprite3D.meshRender.sharedMaterial;
  //修改材质的高光颜色，让高光处偏红
  sharedMaterial.specularColor = new Laya.Vector4(1,0,0,1);
  //加载高光贴图（与漫反射一致，也可单独制作高光贴图）
  sharedMaterial.specularTexture = sharedMaterial.diffuseTexture;
  //sharedMaterial.specularTexture = Laya.Texture2D.load("LayaScene_truck/Assets/texture/t0200.png");
}
```


상술한 코드를 번역하여, (도3)에서 재질과 하이라이트 스티커를 사용하여 효과가 좋다.(사진 4)에는 불빛의 기본 화이트 하이라이트를 사용하여 효과가 보통이다.

![3](img/3.png)(2)</br>>

![4](img/4.png)(사진 4)</br>>



###환경색과 환경 스티커

환경색 (ambient) 은 조명 환경색과 마찬가지로 재질에 융합 염색을 하여 재질이 어떤 색조에 따라 재질에 밝아질 수 있으며, 모의전등 빛을 발광하는 효과가 있다.

환경 스티커 (ambient Texture) 도 2D 텍스처 그림으로 Layair 엔진에서 환경 스티커를 잠시 취소하고 모형에 대한 영향을 미칠 수 있으며, 후속 버전은 자발광 스티커를 대체할 수 있으니 당분간 환경색 처리 모형을 사용해 주십시오.

3D 여단 과정 중 코드 수정 (그림 6) 효과:


```typescript

//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0, 0, 0);
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//设置环境色，提亮模型
material.ambientColor =new Laya.Vector3(2,2,2);
//为box模型赋材质
box.meshRender.material = material;
```


![5](img/5.png)(사진 5) 고정불빛 아래 재질은 환경색 사용하지 않음</br>

![6](img/6.png)(사진 6) 고정불빛 아래 재질은 환경 색상으로 밝힌다</br>



###반사 색상과 반사 스티커

반사 색상 (reflectColor) 은 환경색과 유사한 색상으로 재질 전체에 색을 융합하여 염색한다.

반사 스티커 (reflect Texture) 는 일반적으로 카세트 무늬 스티커 TextureCube 를 사용하여 모형에 대한 포괄, 모의 주변 환경이 모형적인 효과를 반영한다.

반사 스티커는 효과와 동시에 반사율 albedo, 렌더모드와 관련된다.

렌더는 양면 불투명으로 바꾸어야 반사 스티커 (Standardmaterial.RENDERMODE OPAQUEDOUBLEFACE) 를 표시할 수 있다.

반사율 albedo 수치가 높을수록 반사 스티커 효과는 작을수록 만반사 스티커 효과는 높을수록 실제 모형 소재 효과에 따라 조절, 거울, 금속면이 다른 반사율을 조절할 수 있다.

‘ 3D의 여행 ’ 과정 중 코드 수정은 다음과 같이 더 나은 관찰 효과를 위해 구형 모형을 사용한다.실행 후 (그림 7) 효과를 얻을 수 있습니다:


```typescript

//添加方向光
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0.5, 0.5, 0.5);//为球体增加高光
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//添加自定义模型
var sphere = scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh()));
sphere.transform.rotate(new Laya.Vector3(0,45,0),false,false);
//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//降低反射率，加强反射贴图反射
material.albedo = new Laya.Vector4(0.2,0.2,0.2,0);
//设置渲染模式为双面不透明(否者无法显示反射贴图)
material.renderMode = Laya.StandardMaterial.RENDERMODE_OPAQUEDOUBLEFACE;
//创建反射贴图，用立方体全视角贴图进行赋值（类似于360全景包裹）
material.reflectTexture = Laya.TextureCube.load("skyBox/skyCube.ltc");
//为球型模型赋材质
sphere.meshRender.material = material;
```


![7](img/7.png)(图7)反射贴图</br>







###법선 요철 스티커

법선 요철 스티커(normalTexture)는 3D에서 매우 중요한 역할을 하고 있으며, 모형 표현의 정밀도가 주로 법선 스티커에 영향을 받아, 고정도, 고면수 모형의 세부 사항을 모방하여 게임 화면의 품질을 크게 향상시킬 수 있다.물론 법선 스티커를 사용하면 하드웨어에 대한 성능 향상을 요구한다.

법선 스티커는 미술 디자이너를 위해 두 가지 방법으로 제작한 것은 3D 프로듀싱에서 모형 고모 베이킹에서 저모형 플로팅, 작업량이 크며, 작업량이 크다는 것은 만반사 스티커로 일부 도구로 플랜 스티커, 작업량이 작지만 효과는 베이킹 방법보다 조금 낮다.법선 스티커 효과 (도 8) 가 제시한 것은 만반사 스티커로 전환된 것이다.

![8](img/8.png)(图8)</br>


만약 법선 스티커를 사용하려면 개발 과정에서 다음 문제를 주의해야 합니다:

1. 법선 스티커는 모형 데이터에 대해 일정한 요구가 있다. 모형상 절선 정보가 없으면 법선의 요철 효과를 낼 수 없을 것이다.예를 들어 Layaiair 3D 엔진에서 자체적으로 가져온 메쉬 형식 BoxMesh, Spheremesh, CylinderMersh 등은 절선 정보가 없는 것이며, 법선 스티커를 사용해도 볼록이 나오지 않는다.

2. 법선 스티커를 사용하려면 Layaiair의 유닛 플러그인을 통해 내보내며 메쉬 Setting 칸을 설정할 때 '접선 무시' 옵션 '옵션을 선택하지 않도록 주의해야 한다.

![9](img/9.png)(그림 9)</br>>

3. 법선 스티커를 사용해야 한다면, 게임 장면에서는 불빛을 사용해야 한다. 그렇지 않으면 모형에도 요철 효과가 생기지 않는다.

유닛 3D에서 Cube 모형 (unity 에서 만든 모형 테이프 절선 정보) 를 생성하고 플랫폼과 법선 스티커를 부과한 후 레이레이레이어로 내보내며, 법선 스티커도 자동으로 모형으로 가재됩니다.3D의 여단 과정 중 코드 수정 후 (그림 10) 요철 효과.


```typescript

//添加方向光
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0.5, 0.5, 0.5);//为球体增加高光
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//创建unity中导出的模型
this.box = Laya.Sprite3D.load("layaScene_box/box.lh");
//模型与材质加载完成事件监听
box.on(Laya.Event.HIERARCHY_LOADED,this,onLoadComplete);
//也可以代码加载法线贴图
//加载到场景中
scene.addChild(this.box);
/** 模型与材质加载完成后回调***/        
function onLoadComplete()
{
  //也可以代码加载法线贴图
  //从模型中获取meshSprite3D对像
  //var meshSprite3D = this.box.getChildAt(0);
  //获取模型的材质实例
  //var material = meshSprite3D.meshRender.material;
  //为材质添加法线贴图
  //material.normalTexture = Laya.Texture2D.load("layaScene_box/Assets/texture/layabox_normal.png");
}
```


![10](img/10.png)(도 10) 법선 스티커</br>



###내보내는 재질 파일.

재질의 빛과 스티커에 대한 속성을 통해 물체의 소재 속성과 스티커를 어떻게 수정할 것인지 잘 알고 있다.

그러나 현재 미술의 효과는 기본적으로 유닛 편집기를 통해 이뤄진 뒤 데이터를 내보내서 사용된다.현재 Layaiair 3D 엔진이 완벽한 가운데 H5 게임 엔진의 특징으로 유닛의 모든 소재와 속성을 완전히 포함할 수 없기 때문에 유닛의 효과와 실제 게임의 효과와 차이가 있다.

미래 버전에서는 유닛에 전용된 Layaiair 표준 재질 개발자들을 사용하여 유닛에서 제작한 미술 효과와 게임의 효과를 완전히 일치시켜 개발자들을 사용하게 할 수 있다.

그렇다면 기다리던 동안 우리는 어떻게 수정하고 미술 효과에 이를 수 있을까?유닛에서 재질마다 내보내면 lmat 형식 파일을 생성할 수 있으며, 우리는 소재를 수정할 수 있다.

예를 들어 다음 코드 를 통해 한 장면을 가재한 후, 우선 빛을 통해 밤 효과를 보다.


```typescript

//添加3D场景
var scene = Laya.Scene.load("LayaScene_01/loveScene.ls");
Laya.stage.addChild(scene);
//创建摄像机(横纵比，近距裁剪，远距裁剪)
var camera = new Laya.Camera( 0, 0.1, 1000);
//加载到场景
scene.addChild(camera);
//移动摄像机位置
camera.transform.position=new Laya.Vector3(-8, 4, 20);
//旋转摄像机角度
camera.transform.rotate(new Laya.Vector3( -8, -25, 0), true, false);
//设置摄像机视野范围（角度） 
camera.fieldOfView=35;
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);
//创建平行光 -------------------
var light = scene.addChild(new Laya.DirectionLight());
//修改灯光方向
light.direction = new Laya.Vector3(0.3, -1, 0);
//设置为无高光
light.specularColor=new Laya.Vector3(0,0,0);
//设置环境光偏暗蓝
light.ambientColor=new Laya.Vector3(0.2,0.2,1);
//设置漫反射光偏暗
light.diffuseColor=new Laya.Vector3(0.5,0.5,0.5);
```


![11](img/11.png)(도 11)</br>>

상도에 따르면 ‘Love’의 모델을 등불로 바꾸는 밝기가 필요하다면, 코드를 통해 상대적으로 번거로움을 수정하고, 상대적으로 대응하는 소재 파일을 수정하고 소재 파일을 열어 관찰하면 재질 파일에 저장된 것은 각종 광색 속성과 스티커(사진 12), 재질의 환경광 색상을 수정하는 1.5, 1.2,2,2.웹 페이지 파일을 새로 고칠 수 있으면 효과를 볼 수 있고, 모형이 등골에 이르는 효과 (도 13).

![12](img/12.png)(사진 12)</br>>

![13](img/13.png)(사진 13)</br>>

이런 방법으로 장면의 다양한 소재 속성을 조절해 미술에 필요한 효과를 얻을 수 있다.물론, 후속으로 기대되는 유닛 중 레이아라 전속 소재로 유닛에서 편집과 게임에서 일치하는 최종효과를 거두고 있다.