# 创建材质

###### *version :2.1.0beta   Update:2019-5-14*

如果在代码中的模型没有赋材质，在3D视图中无法显示模型的纹理、质感等，只默认为纯白色。

在“快速开启3D之旅”课程的代码中，我们创建使用了标准材质，并在漫反射贴图上添加了一张纹理图片，并赋给了模型。

```typescript
//添加自定义模型
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(1, 1, 1))) as MeshSprite3D;
box.transform.rotate(new Vector3(0, 45, 0), false, false);

//创建材质
var material:BlinnPhongMaterial = new BlinnPhongMaterial();
Texture2D.load("res/layabox.png", Handler.create(this, function(tex:Texture2D):void {
  	//纹理加载完成后赋值
	material.albedoTexture = tex;
}));
//将材质赋值给自定义模型
box.meshRenderer.material = material;
```

![](img/1.png)<br>(图1)

当然，这只是简单的一种用法，我们暂时只运用了最重要的漫反射贴图，要达到更好的美术效果，开发者还需了解材质的光色与贴图属性。
