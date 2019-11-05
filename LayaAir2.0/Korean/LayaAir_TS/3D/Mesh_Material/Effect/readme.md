#Effect 소재 설명

###### *version :2.1.0beta   Update:2019-5-14*

EffectMacterail 특효 소재로 혼합 모드로 광효가 생기는 소재는 특효로 제작된다.

####주요 속성과 방법

> 속성

`color:Vector4`색깔.

`renderMode:int`[write-only] 렌더 모드를 설정합니다.

`texture:BaseTexture`스티커.

`tilingOffset:Vector4`무늬 평포와 편향.

####Effect 소재 만들기

아래 코드 는 공식 예제 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=EffectMaterialDemo)):


```typescript

var earth = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere())) as Laya.MeshSprite3D;

earth.transform.position = new Laya.Vector3(0, 0, 0);
//创建EffectMaterial材质
var material = new Laya.EffectMaterial();
//加载地球贴图
Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture) {
    //设置纹理
    material.texture = texture; 
}));
earth.meshRenderer.material = material;
```


[] (img/1.gif)<br>(12)
