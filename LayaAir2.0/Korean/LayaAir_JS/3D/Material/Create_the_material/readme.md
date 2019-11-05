#재질 생성

###### *version :2.1.0beta   Update:2019-5-14*

코드에 있는 모형이 재질이 없다면 3D 보기에서 모형의 무늬, 질감 등을 표시할 수 없을 정도로 기본적으로 순백색이다.

'3D의 여행'과정을 빠른 속도로 개설한 코드에서 표준 소재를 만들었고, 만반사 스티커에 무늬 그림을 추가해 모형에 부여했다.


```typescript

//添加自定义模型
var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1)));
box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);

//创建材质
var material = new Laya.BlinnPhongMaterial();
Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex){
  	//纹理加载完成后赋值
	material.albedoTexture = tex;
}));
//将材质赋值给自定义模型
box.meshRenderer.material = material;
```


[] (img/1.png)<br>(1)

물론 이것은 단순한 용법일 뿐, 우리는 당분간 가장 중요한 만반사 스티커만 운용할 뿐, 개발자는 재질의 빛과 스티커 속성을 알아야 한다.
