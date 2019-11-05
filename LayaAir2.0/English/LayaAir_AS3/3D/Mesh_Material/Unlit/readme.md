# Unlit材质详解

###### *version :2.1.0beta   Update:2019-5-14*

**Unlit is not exposed to light**Texture of material. The greatest feature of this material is that it is not affected by light and saves most performance. This material is a direct display of the original texture style.

####Main attributes and methods

> attribute

`albedoColor:Vector4`Albedo color.

`albedoIntensity:Number`Albedo intensity.

`albedoTexture:BaseTexture`Albedo mapping.

`enableVertexColor:Boolean`Supports vertex color.

`renderMode:int`[write-only] Sets the rendering mode.

`tilingOffset:Vector4`Texture tiling and migration.

####Create and use materials

In Figure 1, the BlinnPhong material is used on the left and the Unlit material is used on the right. Two one-to-one comparisons can more reflect the characteristics of Unlit. Details can be viewed as follows:（[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=UnlitMaterialDemo%3E));


```typescript

//创建Unlit材质
var material2:UnlitMaterial = new UnlitMaterial();
//加载纹理
Texture2D.load("res/threeDimen/texture/earth.png", Handler.create(this, function(texture:Texture2D):void {
    //设置反照率贴图
    material2.albedoTexture = texture;
}));
earth2.meshRenderer.material = material2;
```


![] (img/1.png)<br> (Figure 1)

