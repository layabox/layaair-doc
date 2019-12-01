#Comment

Les besoins en matière d'interception sont souvent satisfaits lors de l'élaboration des projets, par exemple en ce qui concerne l'interception de contenus sur les écrans pour affichage, partage et dessin secondaire.

Le procédé drawtocanvas est fourni dans la catégorie Sprite de layaair pour réaliser la demande d 'interception.API comme le montre la figure 1:

![1](img\1.png)(Figure 1)

D 'après l' API, il y a deux modes d 'utilisation.Un**Dessiner l 'image en tant que source d' image dans d 'autres Sprite**L 'un est**Acquisition de données d 'image originales et mise en commun sur Internet**".Nous allons ensuite utiliser des exemples de codes pour réaliser ces deux fonctions.

###Dessiner les images interceptées dans d 'autres Sprite

Mise en oeuvre de deux Sprite sur stage, l 'une pour afficher l' image originale et l 'autre pour afficher l' image interceptée; tous les codes sont indiqués comme suit:


```typescript

//初始化引擎
Laya.init(800, 600, Laya.WebGL);
//实例化一个sprite，用来显示原始图片
this.sp = new Laya.Sprite();
this.sp.loadImage("res/a.png");
Laya.stage.addChild(this.sp);

//给stage添加一个点击事件，点击之后截取原始图片中的一部分
Laya.stage.on(Laya.Event.CLICK, this, this.onClick);

function onClick() {
    //定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
    var htmlC = this.sp.drawToCanvas(100, 100, 0, 0);
    //获取截屏区域的texture
    var interceptT = new Laya.Texture(htmlC);
    var spDeposit = new Laya.Sprite();
    //绘制截取的纹理
    spDeposit.graphics.drawTexture(interceptT, 0, 0, 100, 100);
    //设置显示容器的坐标
    spDeposit.x = 300;
    Laya.stage.addChild(spDeposit);
}
```


Les effets de fonctionnement sont indiqués à la figure 2:

![2](img\2.gif)(Figure 2)



###Enregistrement de données d 'interception partagées

Les données d 'image sont enregistrées et transmises au serveur.Tous les codes sont les suivants:


```typescript

//初始化引擎
Laya.init(800, 600, Laya.WebGL);
//实例化一个sprite，用来显示原始图片
this.sp = new Laya.Sprite();
this.sp.loadImage("res/a.png");
Laya.stage.addChild(this.sp);

//给stage添加一个点击事件，点击之后截取原始图片中的一部分
Laya.stage.on(Laya.Event.CLICK, this, this.onClick);

function onClick() {
    //定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
    var htmlC = this.sp.drawToCanvas(100, 100, 0, 0);
    //获取原生的canvas对象
    var canvas = htmlC.getCanvas();
    //打印图片base64信息，可以发给服务器或者保存为图片
    console.log(canvas.toDataURL("image/png"));
}
```


Après avoir cliqué sur le stage, nous pouvons voir les informations de base 64 de sortie, comme indiqué dans la figure 3:

![3](img\3.gif)(图3)




Passez à l'écran d'interception sous layanative.[这里](https://ldc.layabox.com/doc/?nav=zh-js-7-2-7)