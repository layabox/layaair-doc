#Explanation of Effect Material

###### *version :2.1.0beta   Update:2019-5-14*

Effect Materail special effect material, which produces light effect by mixing mode, is commonly used for special effect production.

####Main attributes and methods

> attribute

`color:Vector4`Color.

`renderMode:int`[write-only] Sets the rendering mode.

`texture:BaseTexture`Map.

`tilingOffset:Vector4`Texture tiling and migration.

####Create and use Effect materials

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=EffectMaterialDemo)):


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


![] (img/1.gif) < br > (fig. 12)
