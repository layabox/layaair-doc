#Explanation of Effect Material

###### *version :2.1.0beta   Update:2019-5-14*

The effectmaterial special effect material, which produces light effect by mixing mode, is often used to make special effects.

####Main attributes and methods

> attribute

`color:Vector4`Color.

`renderMode:int`[write-only] Sets the rendering mode.

`texture:BaseTexture`Map.

`tilingOffset:Vector4`Texture tiling and migration.

####Create and use Effect materials

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=EffectMaterialDemo)):


```typescript

var earth = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere()));

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


![] (img/1.gif) <br> (Fig. 1)
