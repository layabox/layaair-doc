# Effect材质详解

###### *version :2.1.0beta   Update:2019-5-14*

EffectMaterail特效材质，靠混合模式产生光效，这种材质常用特效制作。

#### 主要属性与方法

> 属性

`color:Vector4` 颜色。

`renderMode:int` [write-only] 设置渲染模式。

`texture:BaseTexture` 贴图。

`tilingOffset:Vector4` 纹理平铺和偏移。

#### 创建和使用Effect材质

下面代码来自官方示例([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=EffectMaterialDemo)):

```typescript
var earth:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere())) as MeshSprite3D;

earth.transform.position = new Vector3(0, 0, 0);
//创建EffectMaterial材质
var material:EffectMaterial = new EffectMaterial();
//加载地球贴图
Texture2D.load("res/threeDimen/texture/earth.png", Handler.create(this, function(texture:Texture2D):void {
//设置纹理
material.texture = texture;
    
}));
earth.meshRenderer.material = material;
```

![](img/1.gif)<br>(图12)
