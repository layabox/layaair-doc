#Detailed skyprocesedural Material

###### *version :2.1.0beta   Update:2019-5-14*

Le ciel programmé de skyproceduralmaterial permet d 'obtenir des réflexes atmosphériques, de simuler la lumière du jour et d' utiliser des sommets pour colorer le ciel.

####Principales propriétés et méthodes

Attributs

`sunDisk:int`Réglez l 'état du soleil.

`sunSize:Number`La taille du soleil est de 0 à 1.

`sunSizeConvergence:Number`Le soleil se contracte de 0 à 20.

`atmosphereThickness:Number`L 'épaisseur de l' atmosphère est comprise entre 0 et 5.

`skyTint:Vector4 `La couleur du ciel.

`groundTint:Vector4`Couleur du sol

`exposure:Number`L 'exposition est de 0 à 8.

####Création et utilisation de matériaux

Code ci - dessous pour l 'exemple officiel[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_Procedural)"Il y a un réglage dans la boîte à ciel, et une mise à jour de la position de la lumière pour montrer l'effet du coucher de soleil,`SkyDome.instance`C 'est une grille de boîte à ciel circulaire incorporée dans layaair3d.


```typescript

//初始化天空渲染器
var skyRenderer:SkyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = SkyDome.instance;
//使用程序化天空盒
var pro_sky:SkyProceduralMaterial = new SkyProceduralMaterial();
//设置太阳大小
pro_sky.sunSize = 0.5;
//设置太阳状态为高质量状态
pro_sky.sunDisk = SkyProceduralMaterial.SUN_HIGH_QUALITY;
//设置天空颜色
pro_sky.skyTint = new Vector4(1, 1, 1, 1);
//设置地面颜色
pro_sky.groundTint = new Vector4(0, 0, 0, 1);

skyRenderer.material = pro_sky;

......
//设置相机的清除标识为天空盒(这个参数必须设置为CLEARFLAG_SKY，否则无法使用天空盒)
camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
......
```


[] (IMG / 1.gif) <br > (Figure 1)
