#PBRStandardmaterial 소재 상세

###### *version :2.1.0beta   Update:2019-5-14*

물리 일반 반사 소재, 경질 표면(건축 재질)에 기반사되어 디자인된 것은 일반적으로 거칠고 질감이 있는 소재입니다.

#####주요 속성과 방법

> 속성

`albedoColor:Vector4`만반사 색.

`albedoTexture:BaseTexture`만반사 스티커.

`emissionColor:Vector4`방사 색.

`emissionTexture:BaseTexture`방사 스티커.

`enableEmission:Boolean`방사성 활성화 여부.

`enableReflection:Boolean`반사 여부.

`metallic:Number`금속도.

`metallicGlossTexture:BaseTexture`메탈 윤기 스티커.

`normalTexture:BaseTexture`법선 스티커.

`normalTextureScale:Number`법선 스티커 조정 계수.

`occlusionTexture:BaseTexture`커버 스티커.

`occlusionTextureStrength:Number`커버 스티커 강도.

`parallaxTexture:BaseTexture`시차 스티커.

`parallaxTextureScale:Number`시차 포토 축소 계수.

`renderMode:int`[write-only] 렌더 모드를 설정합니다.

`smoothness:Number `반들반들하다.

`smoothnessSource:int`광활도 데이터 원본.

`smoothnessTextureScale:Number`윤활도 축소 계수.

`tilingOffset:Vector4`무늬 평포와 편향.

#####재질 만들기

아래의 코드 는 공식 예례 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo)무엇


```typescript

//实例PBR材质
var mat:PBRStandardMaterial = new PBRStandardMaterial();
//反射贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_AlbedoTransparency.png', Handler.create(this, function(texture:Texture2D):void {
    mat.albedoTexture = texture;
}));

//法线贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Normal.png', Handler.create(this, function(texture:Texture2D):void {
    mat.normalTexture = texture;
}));

//金属光滑度贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_MetallicSmoothness.png', Handler.create(this, function(texture:Texture2D):void {
    mat.metallicGlossTexture = texture;
}));

//遮挡贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Occlusion.png', Handler.create(this, function(texture:Texture2D):void {
    mat.occlusionTexture = texture;
}));

//反射颜色
mat.albedoColor = new Vector4(1, 1, 1, 1);
//光滑度缩放系数
mat.smoothnessTextureScale = 1.0;
//遮挡贴图强度
mat.occlusionTextureStrength = 1.0;
//法线贴图缩放系数
mat.normalScale = 1;
//光滑度数据源:从金属度贴图/反射贴图获取。
mat.smoothnessSource = PBRStandardMaterial.SmoothnessSource_MetallicGlossTexture_Alpha;

var barrel:MeshSprite3D = scene.getChildByName("Wooden_Barrel") as MeshSprite3D;
var barrel1:MeshSprite3D = scene.getChildByName("Wooden_Barrel (1)") as MeshSprite3D;
var barrel2:MeshSprite3D = scene.getChildByName("Wooden_Barrel (2)") as MeshSprite3D;
var barrel3:MeshSprite3D = scene.getChildByName("Wooden_Barrel (3)") as MeshSprite3D;

barrel.meshRenderer.sharedMaterial = mat;
barrel1.meshRenderer.sharedMaterial = mat;
barrel2.meshRenderer.sharedMaterial = mat;
barrel3.meshRenderer.sharedMaterial = mat;
```


[] (img/1.png)<br>(1)

