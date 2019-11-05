#Effect Materials

###### *version :2.1.0beta   Update:2019-5-14*

Effect Material specific Effect material, which is used to produce Optical Effect by Mixing mode.

####Principales propriétés et méthodes

Attributs

`color:Vector4`Couleur.

`renderMode:int`[Write - only] définit un mode de rendu.

`texture:BaseTexture`Patch

`tilingOffset:Vector4`Pavage et décalage de texture.

####Création et utilisation de matériaux Effect

Le code ci - dessous est un exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=EffectMaterialDemo)):


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


[] (IMG / 1.gif) <br > (Figure 1)
