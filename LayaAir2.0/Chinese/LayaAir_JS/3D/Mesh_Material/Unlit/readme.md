# Unlit材质详解

###### *version :2.1.0beta   Update:2019-5-14*

**Unlit不受光**材质。这种材质最大的特点就是不受光照影响，且最省性能。这种材质是直接显示原贴图的样式。

#### 主要属性和方法

> 属性

`albedoColor:Vector4` 反照率颜色。

`albedoIntensity:Number` 反照率强度。

`albedoTexture:BaseTexture` 反照率贴图。

`enableVertexColor:Boolean` 是否支持顶点色。

`renderMode:int` [write-only] 设置渲染模式。

`tilingOffset:Vector4` 纹理平铺和偏移。

#### 创建和使用材质

图1中，左边使用的BlinnPhong材质，右边使用的就是Unlit材质。两个一对比就能更体现Unlit的特点了。详情可以查看:([demo地址](<https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=UnlitMaterialDemo>))；

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

![](img/1.png)<br>(图1)

