# BlinnPhong材质详解

###### *version :2.1.0beta   Update:2019-5-14*

유닛의 기준과 기타 재질과 레이어 표준 소재의 차이가 있기 때문에 개발자가 내보내는 3D 자원을 사용하면 유닛 중 다른 효과를 발견할 수 있다. 코드에서 다양한 소재 인자를 수정하거나 조명을 조절하는 데 필요한 효과가 있어 개발자들에게 불편을 끼칠 수 있다.

Layaiair 엔진에서 실행 효과와 유닛에서 조정하는 미술 효과가 일치하기 위해 레이야아 공식 유닛 내보내기 플러그인 중과 엔진 중 BlinphongManmaterial 소재를 늘리기 위해 개발자들의 견해를 얻는 데 따라 코드 수정 효과를 줄이는 시간, 효율성을 높일 수 있다.그래서 앞으로 개발에 최대한 이 소재를 사용할 것을 건의합니다.

####주요 속성과 방법 설명:

> 속성

`albedoColor:Vector4`반사율 색상.

`albedoIntensity:Number`반조율 강도.

`albedoTexture:BaseTexture`반조율 스티커.

`enableLighting:Boolean`빛을 사용하지 여부.

`normalTexture:BaseTexture`법선 스티커.

`renderMode:int`[write-only] 렌더 모드를 설정합니다.

`shininess:Number`하이라이트 강도, 범위는 0~1.

`specularColor:Vector4`하이라이터 컬러.

`specularTexture:BaseTexture`하이라이트 스티커.

`tilingOffset:Vector4`무늬 평포와 편향.



####세트를 블리닉 소재로 바꾸기.

새 플러그인을 설치한 뒤 Untiy Layair 3D 메뉴 중 하나로 재질을 블리닉 소재로 변경, 메뉴 레이어투 Tool 클릭 - - - - - - Switch Shader to Layablinphong 옵션을 추가한 뒤 자원 인터페이스의 모델이 자색으로 변하는 효과를 발견해 재질의 종류가 변경되었다는 것을 설명한다.

[] (img/1.png)<br>(1)

마우스가 장면을 선택하는 임의 모형을 선택하면 오른쪽 인스타그램에 새로운 소재 Shader 종류가 나타난다.소재 속성은 유닛에서 Standard 표준 소재와 다르며, 레이야아가 지원하지 않는 속성을 제거했다.우리는 이러한 속성을 수정하여 모형 디스플레이를 바꿀 수 있다.

[] (img/2.png)<br>(2)

####Blinphong 소재로 수동적으로 수정

일반적인 경우 메뉴 중 하나인 버라이너 소재로 바뀐 것을 추천합니다. 이러한 장면의 모든 재질은 수정되지 않습니다. 어떤 소재는 찾을 수 없거나 소홀해서 수정되지 않은 상황이 발생할 수 없습니다.

물론 새로운 소재를 생성할 때 기본 재질이 표준 소재로 생성되었을 때 개발자가 수동적으로 재질을 수정해야 하는 Shader 타입은 블리닉Phong입니다.플러그인을 설치한 후 재질 패널의 Shader 유형에 레이야아아3D 옵션이 수정될 수 있습니다.(그림 3)

![图片4](img/3.gif)< br > (그림 3)

BlinPhong 소재의 광색 스티커 속성 기본과 표준 소재의 기본 일치, 유닛 소재 패널에서 다음 속성 조절 가능:

#####만반사 스티커

**DiffuseMap (만반사 스티커)**게임에서 물체 표면의 반사와 표면색을 나타낸다.빛에 비친 색상과 강도를 표현할 수 있다는 얘기다.만약 9, 더 자세한 것은 원demo:[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_DiffuseMap%3E)무엇


```typescript

var material = new Laya.BlinnPhongMaterial();
//漫反射贴图
Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture) {
    //设置材质纹理
	material.albedoTexture = texture;
}));

earth2.meshRenderer.material = material;
```


[] (img/4.png)<br>(4)

#####법선 스티커

**Normal maps (법선 스티커)**그레이스케이팅입니다. 그것은 물체의 한 높이도에서 볼록볼록한 표면을 보여주기 위해 그림을 10개처럼 상세하게 보여줍니다.[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_NormalMap%3E)무엇


```typescript

var material = meshSprite3D.meshRenderer.material;
//法线贴图
Laya.Texture2D.load(normalMapUrl[i], Laya.Handler.create(this, function(texture) {
    //设置发现贴图
    material.normalTexture = texture;
}));
```


[] (img/5.png)<br>(도 5)

#####하이라이트 스티커

**Specular Map (하이라이트 스티커)**광선이 모형 표면에 비칠 때 표면 속성을 나타내는 것이다. (금속과 피부, 천, 플라스틱 반사량의 광선)을 나타내며 다른 소재를 구분한다.하이라이트 스티커 재엔진에서 거울 반사와 물체 표면의 하이라이트 컬러를 표현한다.소재의 반광 정도가 강합니다.예를 들면 7, 더 자세한 것은 공식 예례를 살펴볼 수 있다[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_SpecularMap%3E)무엇


```typescript

//获取Sprite3D上的蒙皮网格精灵节点
var skinnedMeshSprite3d = dude2.getChildAt(0).getChildAt(0);
//历遍蒙皮网格节点的材质列表
for (var i:int = 0; i < skinnedMeshSprite3d.skinnedMeshRenderer.materials.length; i++) {
    //获取对应材质
    var material = skinnedMeshSprite3d.skinnedMeshRenderer.materials[i];
    //加载对应的贴图
	Laya.Texture2D.load(specularMapUrl[i], Laya.Handler.create(this,function(mat, tex) {
        mat.specularTexture = tex;//设置高光贴图
    }, [material]));
}
```


[] (img/6.png)<br>(도 6)
