# 材质的加载

###### *version :2.1.0beta   Update:2019-5-14*

Dans l'exemple ci - dessus, nous avons créé des matériaux standard, mais dans le cadre d'un projet pratique, nous avons rarement utilisé des codes pour doter les modèles de matériaux, et nous avons créé des matériaux directement dans le logiciel 3D ou dans l'Unity, puis exporté le format layaair à l'aide d'outils.

Dans l 'article layaair3d, nous avons présenté le modèle, qui comprend à la fois la grille et le matériau, le matériau correspondant au modèle est automatiquement chargé.

Le fichier de matériau.lmat produit après l 'exportation peut alors être utilisé pour charger le matériau standard et l' attribuer au modèle de la même manière que celui - ci.


```typescript

//材质加载
Laya.BaseMaterial.load("res/skyBox2/skyBox2.lmat",Laya.Handler.create(this,function(mat) {
		var skyRenderer = camera.skyRenderer;
		//创建天空盒的mesh
		skyRenderer.mesh = Laya.SkyBox.instance;
		//设置天空盒材质
		skyRenderer.material = mat;	
}));
```


[] (IMG / 1.png) <br > (Figure 1)