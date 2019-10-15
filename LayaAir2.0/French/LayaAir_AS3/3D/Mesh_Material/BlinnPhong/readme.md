#Blinnphong Materials

###### *version :2.1.0beta   Update:2019-5-14*

Étant donné que les normes et autres matériaux de l'Unity diffèrent de ceux de layaair, l'utilisation par les concepteurs des ressources 3D exportées peut avoir des effets artistiques différents de ceux de l'Unity, et les concepteurs ont du mal à obtenir les effets souhaités en modifiant les paramètres d'attribut des matériaux ou en ajustant les lumières dans le Code.

Afin d 'aligner les performances du moteur layaair sur celles de l' Unity, l 'ajout officiel de matériaux blinnphongmaterial dans le module d' exportation Unity et dans le moteur permet aux concepteurs d 'obtenir des résultats immédiats, de réduire le temps nécessaire pour modifier les effets du Code et d' améliorer l 'efficacité du travail.Il est donc recommandé que ce matériau soit utilisé dans toute la mesure possible lors de la mise au point ultérieure.

####Principales caractéristiques et méthodes

Attributs

`albedoColor:Vector4`Reflectance color

`albedoIntensity:Number`L 'inverse.

`albedoTexture:BaseTexture`Contraste.

`enableLighting:Boolean`Allume la lumière.

`normalTexture:BaseTexture`Maquette.

`renderMode:int`[Write - only] définit un mode de rendu.

`shininess:Number`High Light Strength, range 0 - 1.

`specularColor:Vector4`High Light Color

`specularTexture:BaseTexture`High Light

`tilingOffset:Vector4`Pavage et décalage de texture.



####La scène se transforme en matériaux blinnphong.

Une fois installé le nouveau module, une touche a été ajoutée au menu untiy layaair3d pour transformer le matériau de scène en une fonction de matériau blinnphong (fig. 6), et un clic sur l 'option layaair Tool - > Switch Shader to layablinnphong permet de constater que le modèle de l' interface ressources se transforme en violet et que les effets de la scène changent, ce qui montre que le type de matériau a été modifié avec succès.

[] (IMG / 1.png) <br > (Figure 1)

La souris sélectionne n 'importe quel modèle dans la scène, et nous voyons apparaître un nouveau type de matériau Shader dans le panneau Inspector à droite (fig. 7).Les propriétés du matériau diffèrent de celles du standard Standard Material de l 'Unity, ce qui simplifie considérablement les choses et supprime certaines des propriétés que layaair ne supporte pas.Nous pouvons modifier l 'affichage du modèle en modifiant ces propriétés.

[] (IMG / 2.png) <br > (Figure 2)

####Manuel pour le matériau blinnphong

En règle générale, nous recommandons d 'utiliser une touche dans le menu pour convertir tous les matériaux de la scène en matériaux blinnphong, de sorte que tous les matériaux de la scène soient modifiés et qu' il n 'y ait pas de cas où un matériau n' est pas trouvé ou ignoré, ce qui entraîne des changements.

Bien entendu, lors de la création d 'un nouveau matériau, le matériau standard est généré par défaut, lorsque le type Shader du matériau doit être modifié manuellement par l' développeur sous la forme de blinnphong.Une fois que nous avons installé le module, les options layaair3d apparaissent dans le type Shader du panneau de matériau pour nous permettre de les modifier.(Figure 3)

![图片3](img/3.gif)< br > (Figure 3)

Les propriétés de l 'autocollant photochrome du matériau blinnphong sont sensiblement identiques à celles du matériau standard et les caractéristiques suivantes peuvent être ajustées dans l' unité:

#####Diffuse reflectance

**Diffusemap (diffuse reflectance)**La réflexion et la couleur de surface de l 'objet sont affichées dans le jeu.En d 'autres termes, il peut montrer la couleur et l' intensité de l 'objet éclairé.Pour plus de détails, voir la figure 9.[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_DiffuseMap%3E)).


```typescript

var material:BlinnPhongMaterial = new BlinnPhongMaterial();
//漫反射贴图
Texture2D.load("res/threeDimen/texture/earth.png", Handler.create(this, function(texture:Texture2D):void {
    //设置材质纹理
	material.albedoTexture = texture;
}));
//material.albedoTexture
earth2.meshRenderer.material = material;
```


[] (IMG / 4.png) <br > (Figure 4)

#####Maquette

**Normal Maps**Est une carte grise qui peut être utilisée comme carte d 'altitude d' un objet pour afficher une surface concave et, comme le montre la figure 10, un exemple officiel peut être consulté plus en détail (([demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_NormalMap%3E)).


```typescript

var material:BlinnPhongMaterial = meshSprite3D.meshRenderer.material as BlinnPhongMaterial;
//法线贴图
Texture2D.load(normalMapUrl[i], Handler.create(this, function(texture:Texture2D):void {
    //设置发现贴图
    material.normalTexture = texture;
}));
```


[] (IMG / 5.png) <br > (Figure 5)

#####High Light

**Specular Map**Est utilisé pour exprimer les propriétés de surface lorsque la lumière est irradiée sur la surface du modèle (par exemple, les métaux et la peau, le tissu, le plastique réfléchissant différemment la lumière) afin de distinguer les différents matériaux.Reflectance Mirror and High - Light Color of the Object Surface are presented in High - light Map and Reactor.Plus le matériau réfléchit.Pour plus de détails, voir la figure 7 ci - dessous.[demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=BlinnPhong_SpecularMap%3E)).


```typescript

//获取Sprite3D上的蒙皮网格精灵节点
var skinnedMeshSprite3d:SkinnedMeshSprite3D = dude2.getChildAt(0).getChildAt(0) as SkinnedMeshSprite3D;
//历遍蒙皮网格节点的材质列表
for (var i:int = 0; i < skinnedMeshSprite3d.skinnedMeshRenderer.materials.length; i++) {
    //获取对应材质
    var material:BlinnPhongMaterial = skinnedMeshSprite3d.skinnedMeshRenderer.materials[i] as BlinnPhongMaterial;
    //加载对应的贴图
	Texture2D.load(specularMapUrl[i], Handler.create(this,function(mat:BlinnPhongMaterial, tex:Texture2D):void {
        mat.specularTexture = tex;//设置高光贴图
    }, [material]));
}
```


[] (IMG / 6.png) <br > (Figure 6)
