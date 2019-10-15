# 创建材质

###### *version :2.1.0beta   Update:2019-5-14*

Si le modèle dans le Code n 'a pas de matériau d' appoint, il n 'est pas possible d' afficher la texture, la texture, etc., du modèle dans la vue 3D, mais seulement par défaut en blanc pur.

Dans le Code du cours « démarrer rapidement le voyage en 3D », nous avons créé un matériau standard et ajouté une image texturée à l 'affiche diffuse réfléchissante et donné des modèles.


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


[] (IMG / 1.png) <br > (Figure 1)

Bien entendu, il s' agit d 'une simple utilisation, nous n' utilisons pour l 'instant que les images les plus importantes, pour obtenir de meilleurs résultats artistiques, les développeurs doivent également connaître la couleur et les propriétés du matériau.
