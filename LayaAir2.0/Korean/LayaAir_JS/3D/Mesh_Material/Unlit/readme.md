#Unlit 소재 설명

###### *version :2.1.0beta   Update:2019-5-14*

**Unlit 는 빛을 받지 않는다**소재.이런 소재의 가장 큰 특징은 빛의 영향을 받지 않고 성능을 가장 아끼는 것이다.이런 소재는 원본 스티커를 직접 보여주는 스타일입니다.

####주요 속성과 방법

> 속성

`albedoColor:Vector4`반사율 색상.

`albedoIntensity:Number`반조율 강도.

`albedoTexture:BaseTexture`반조율 스티커.

`enableVertexColor:Boolean`정점 색상을 지원합니까?

`renderMode:int`[write-only] 렌더 모드를 설정합니다.

`tilingOffset:Vector4`무늬 평포와 편향.

####재질 만들기

그림 1 중 왼쪽에서 사용한 블리닝 소재, 오른쪽에 사용하는 것은 언라이트 소재입니다.둘의 대조는 Unlit 의 특징을 더욱 구현할 수 있다.자세한 상황은 자세히 볼 수 있다[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=UnlitMaterialDemo%3E)성


```typescript

//创建Unlit材质
var material2 = new Laya.UnlitMaterial();
//加载纹理
Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture){
    //设置反照率贴图
    material2.albedoTexture = texture;
}));
earth2.meshRenderer.material = material2;
```


[] (img/1.png)<br>(1)

