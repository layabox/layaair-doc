#Présentation fonctionnelle des matériaux

###### *version :2.1.0beta   Update:2019-5-14*

###Acquisition de matériaux à partir de modèles

En utilisant le modèle exporté, le moteur chargera automatiquement le matériau sur le modèle, et dans de nombreux cas un modèle aura plusieurs matériaux standard, de manière automatique nous a permis d 'économiser beaucoup de temps de développement.Mais dans ces conditions, si nous devons changer et changer de matière?Nous devons d'abord obtenir le matériel actuel sur le modèle.

Les moteurs layaair 3D nous ont fourni des présentateurs de grille meshrender et skinnedmeshrender, qui donnent des exemples sur des modèles visuels, grâce auxquels nous pouvons obtenir des matériaux sur des modèles.

​**Tips**: le modèle meshsprite3d est le modèle meshrender, le modèle skinnedmeshsprite3d le modèle skinnedmeshrender.

######Ces deux catégories sont des interfaces communes héritées de la catégorie "père", qui peuvent être consultées**Baserenderer**API[API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.render.BaseRender)).

Les matériaux obtenus se répartissent en deux catégories:

Matériau propre**Material**, si le matériau est modifié, seuls les modèles peuvent être modifiés;

Matériau partagé**Sharedmaterial**Étant donné que le matériau est relativement indépendant, plusieurs modèles peuvent être utilisés avec le même matériau, si l 'on obtient un matériau partagé et modifié, l' affichage de leur propre modèle peut changer, et d 'autres modèles peuvent changer la partie de ce matériau utilisée.

[] (IMG / 1.png) <br > [] (IMG / 2.png) <br >

Les concepteurs doivent choisir eux - mêmes la manière de l'utiliser en fonction de leurs besoins spécifiques.

Voici le code d 'économie, qui peut être consulté sur Demo.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=MaterialDemo)).

[] (IMG / 3.ping) <br > (Figure 3)

> obtenir le matériau sur le modèle par l 'intermédiaire du rendu de grille


```typescript

//初始化3D场景
var scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls")) as Laya.Scene3D;
//从场景获取球型精灵
this.sphere = scene.getChildByName("Sphere") as Laya.MeshSprite3D;
//获取球型精灵自带的BlinnPhong材质
this.billinMaterial = this.sphere.meshRenderer.material;
```


Après avoir obtenu le matériau, nous pouvons le modifier ou l 'utiliser dans d' autres modèles, c 'est - à - dire ajouter le matériau ci - dessus à la balle nouvellement créée:
]


```typescript

//代码创建一个球体
var sphere2 = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.5))) as Laya.MeshSprite3D;
//将创建的球放置在导出球的同一点
this.sphere2.transform.position =  this.sphere.transform.position;
//将创建的球平移
this.sphere2.transform.translate(new Laya.Vector3(0, 1.3, 0),false);
//将从导出球上拿到的材质 贴给代码创建的球
this.sphere2.meshRenderer.material = this.billinMaterial;
```


Les résultats sont ensuite visibles, comme le montre la figure 4:

[] (IMG / 4.png) <br > (Figure 4)

###Modification de la teneur des modèles

Maintenant qu 'on peut obtenir le matériau, on peut naturellement le remplacer.

C'est la même chose avec les griffes.`meshRenderer`Le rendu de grille est modifié.


```typescript

......
//创建一个新的PBRStandard材质
this.pbrStandardMaterial = new Laya.PBRStandardMaterial();
//获取新的纹理
this.pbrTexture = Laya.Loader.getRes("res/threeDimen/texture/earth.png") as Laya.Texture2D;
//为PBRStandard材质设置漫反射贴图
this.pbrStandardMaterial.albedoTexture = this.pbrTexture;
//修改导出球的材质
this.sphere.meshRenderer.material = this.pbrStandardMaterial;
```


[] (IMG / 5.png) <br > (Figure 5)

###Acceptation de l'ombre

L'ombre est devant.**Luminaire**A**Comment ajouter une ombre à la lumière**Section Introduction[地址](https://ldc2.layabox.com/doc/?nav=zh-ts-4-6-4)).Seuls les attributs correspondants à définir dans le matériau sont indiqués ici:

Rendu`castShadow`Est - ce que l 'ombre et`receiveShadow`L 'ombre est - elle acceptable?

> le code ci - dessous est un exemple de l 'ombre


```typescript

//前面给灯光设置好阴影参数之后，获取猴子模型与地板模型并且分别设置产生阴影与接受阴影
//地面接收阴影
var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Laya.Sprite3D;
//设置地板可以接受阴影
(grid.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.receiveShadow = true;

//获取一个静态网格猴子
var staticLayaMonkey = this.scene.addChild(new Laya.MeshSprite3D(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm"))) as Laya.MeshSprite3D;

//省略调整猴子的代码.....

//设置静态网格猴子产生阴影
staticLayaMonkey.meshRenderer.castShadow = true;

//获取蒙皮网格猴子
var layaMonkey = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh")) as Laya.Sprite3D;

//设置蒙皮网格猴子可以产生阴影
(layaMonkey.getChildAt(0).getChildAt(0) as Laya.SkinnedMeshSprite3D).skinnedMeshRenderer.castShadow = true;
```


[] (IMG / 6.png) <br > (Figure 6)

###Concernant l'optimisation des matériaux

Le moteur combine les objets lors du chargement de la scène, ce qui améliore considérablement les performances de la scène.Le principe de la fusion est un modèle de même matière, de sorte que les concepteurs s' efforcent d 'utiliser le même matériau dans l' édition du modèle de scène et, dans la mesure du possible, de le réduire au minimum.Cela permettrait d'atteindre les conditions minimales d'une optimisation future des performances.Plus précisément dans l 'avenir de l' optimisation des performances.