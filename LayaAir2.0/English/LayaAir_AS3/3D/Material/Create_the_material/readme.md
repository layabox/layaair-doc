# 创建材质

###### *version :2.1.0beta   Update:2019-5-14*

If the model in the code is not endowed with material, the texture and texture of the model can not be displayed in the 3D view, only the default is pure white.

In the code for Quick Open 3D Travel, we created a texture image using standard materials, added a texture image to the diffuse reflection map, and assigned it to the model.


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


![] (img/1.png)<br> (Figure 1)

Of course, this is only a simple use. We only use the most important diffuse mapping for the time being. In order to achieve a better artistic effect, developers need to understand the light and color of the material and the properties of the mapping.
