# 多摄像机窗口的使用

###### *version :2.2.0   Update:2019-8-24*

Dans la même scène, plusieurs caméras peuvent être utilisées et, lorsqu 'elles sont chargées dans la scène, elles produisent leurs propres images de jeu.Dans les jeux que nous avons rencontrés auparavant, comme deux caméras 3D, l 'un à l' écran gauche et l 'autre à l' écran droit, le jeu est très riche.

Toutefois, les inconvénients de plusieurs caméras sont une forte consommation, le nombre de triangles de modèles et le nombre de drawcall vont doubler, et plusieurs caméras supplémentaires risquent de doubler leurs pertes de performances, ce qui oblige les concepteurs à prendre en considération, le cas échéant.

L 'affichage d' une scène 3D n 'est pas très différent de celui d' un jeu 2D, il est contrôlé principalement par l 'entrée de la caméra (viewport) qui permet la segmentation de l' écran.

Dans l 'exemple suivant, nous créerons une scène et chargerons simplement un modèle et procéderons à la séparation de la vue gauche et droite par viewport, avec le code suivant:


```typescript

//创建场景
var scene = Laya.stage.addChild(new Laya.Scene3D());
//创建相机1
var camera1 = scene.addChild(new Laya.Camera(0, 0.1, 100));
//设置相机1清除颜色
camera1.clearColor = new Laya.Vector4(0.3, 0.3, 0.3, 1.0);
camera1.transform.translate(new Laya.Vector3(0, 0, 1.5));
//设置裁剪空间的视口
camera1.normalizedViewport = new Laya.Viewport(0, 0, 0.5, 1.0);

//创建相机2
var camera2 = scene.addChild(new Laya.Camera(0, 0.1, 100));
camera2.clearColor = new Laya.Vector4(0.0, 0.0, 1.0, 1.0);
camera2.transform.translate(new Laya.Vector3(0, 0.15, 0.5));
camera2.normalizedViewport = new Laya.Viewport(0.5, 0.0, 0.5, 0.5);

//添加平行光
var directionLight = scene.addChild(new Laya.DirectionLight());

//加载模型
Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(null, function(sp) {
    //将模型加到场景上
    var layaMonkey = scene.addChild(sp);
}))
```


Compiler et exécuter le code ci - dessus, l 'effet de fonctionnement est le graphique 6.Les développeurs peuvent aussi tester, et sous une seule caméra, le nombre de drawcall et de triangles sera beaucoup moins élevé.([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=MultiCamera)- Oui.

[] (IMG / 1.png) <br > (Figure 1)

####Comment modifier dynamiquement la vue de camera

Dans l 'exemple ci - dessus, nous avons installé une vue de caméra.Nous modifions dynamiquement l 'image de la caméra sur la base du code ci - dessus.

**Attention:** `Camera`A`normalizedViewport`Espace de découpage`viewport`La vue des coordonnées des pixels de l 'écran est un procédé d' accès / set.Il est donc impossible de modifier le paramètre d 'affichage en modifiant le paramètre d' affichage d 'une caméra avec une connaissance simple et il faut lui donner une nouvelle valeur.

> modification dynamique de l 'affichage d' une caméra


```typescript

Laya.timer.once(3000,this,function ():void 
{	
    //获取第一个摄影的视口
    var viewport1:Laya.Viewport = camera1.normalizedViewport;
    //修改参数
    viewport1.width = 0.2;
    //重新赋值是视口
    camera1.normalizedViewport = viewport1;

    var viewport2:Laya.Viewport = camera2.normalizedViewport;
    viewport2.width = 0.8;
    viewport2.x = 0.2;
    camera2.normalizedViewport = viewport2;
});
```


[] (IMG / 2.gif) <br > (Figure 2)

