#Afficher et changer

> l 'affichage de l' image est la base du développement du jeu.

##Affichage et transfert d 'images au moyen d' un procédé loadimage

###1.1 Description générale

La recherche laya.display.sprite dans le document API permet de trouver la méthode loadimage () et, comme le montre la figure 1, nous connaissons d 'abord les paramètres de cette méthode.

![图1](img/1.png) <br /> (图1)



###1.2 exemples de téléchargement d'images

Créer une catégorie d 'entrée main.js, dont le code sera rédigé comme suit:


```javascript

//初始化舞台
Laya.init(1334, 750);
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
var img = new Laya.Sprite();
//加载显示图片，坐标位于100,50
img.loadImage("res/img/monkey1.png",100,50);
//添加到舞台
Laya.stage.addChild(img);
```


"Dans le Code de l'exemple,"`100,50`"Est l 'information des coordonnées d' affichage de l 'image.L 'effet d' exécution de l 'exemple de code est illustré dans la figure 2 - 1:

![图2-1](img/2-1.png)< br / > (figures 2 - 1)

###1.3 exemples de transfert d 'images au moyen de loadimage

Le transfert d 'image est effectué sur la base de l' affichage d 'une image, ce qui permet d' ajouter un dessin vide, puis d 'obtenir une nouvelle ressource d' image qui est reprogrammée au moyen d 'une logique de code.Des descriptions de code spécifiques peuvent être mentionnées dans les notes de code et l 'API, ainsi que dans l' expérience d 'exécution d' exemples.

Dans la catégorie main.js, nous modifions le Code comme suit:


```javascript

//初始化舞台
Laya.init(1334, 750);

//需要切换的图片资源路径
this.monkey1 = "res/img/monkey1.png";
this.monkey2 = "res/img/monkey2.png";
//切换状态
this.flag = false;

//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
this.img = new Laya.Sprite();
//显示绘制的图片
switchImg();
//侦听switchImg中图片区域的点击事件，触发后执行switchImg切换图片
this.img.on(Laya.Event.CLICK,this,switchImg);
//添加到舞台
Laya.stage.addChild(img);

function switchImg(){
    //清空图片
    this.img.graphics.clear();
    //获得要切换的图片资源路径
    var imgUrl = (this.flag = !this.flag)? this.monkey1:this.monkey2;
    //加载显示图片，坐标位于100,50
    this.img.loadImage(imgUrl, 100, 50);
}
```


L'effet du Code d'exécution est illustré dans la figure 2 - 2:

![动图2-2](img/2-2.gif)< br / > (Figure 2 - 2)







##Affichage et transfert d 'images au moyen d' un procédé drawtexture

###2.1 Description générale

La recherche de laya.display.graphics dans le document API permet de trouver la méthode drawtexture () et, en plus, de connaître la méthode load () et la méthode getres () de laya.net.loadermanager, ainsi que la méthode create () de laya.utils.handler, dont les paramètres sont indiqués dans les figures 3, 4, 5 et 6 de chaque méthode:

![图3](img/3.png)< br / > (Figure 3)

![图4](img/4.png) <br /> (图4)



![图2](img/5.png)< br / > (Figure 5)

![图2](img/6.png)< br / > (Figure 6)



###2.2 exemples de téléchargement d 'images

Le procédé loadimage () peut charger instantanément des ressources d 'images extérieures ou lire des ressources d' images à partir de la zone tampon, alors que le procédé drawtexture () doit d 'abord charger l' image, puis dessiner l 'ajout à la scène, de sorte qu' il doit être utilisé dans le Code d 'exemples pour charger (().`Laya.loader.load()`Et le retour`Handler.create()`Pour afficher une image, vous pouvez consulter la partie annotée du Code ainsi que la description API correspondante.

Créer une catégorie main.js, dont le code sera rédigé comme suit:


```javascript

//初始化舞台
Laya.init(1334, 750);

//需要切换的图片资源路径
this.monkey2 = "res/img/monkey2.png";

//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//先加载图片资源，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
Laya.loader.load(this.monkey2,Laya.Handler.create(this,graphicsImg));
function graphicsImg(){
    var img = new Laya.Sprite();
    //获取图片资源，绘制到画布
    img.graphics.drawTexture(Laya.loader.getRes(this.monkey2),100,50);
    //添加到舞台
    Laya.stage.addChild(img);
}
```


L'effet d'exploitation du Code est indiqué dans la figure 7 - 1.

![图7-1](img/7-1.png) <br /> (图7-1)











###2.3 exemples d 'images commutées par drawtexture

Le transfert d 'image est effectué sur la base de l' affichage d 'une image, ce qui permet d' ajouter un dessin vide, puis d 'obtenir une nouvelle ressource d' image qui est reprogrammée au moyen d 'une logique de code.Des descriptions de code spécifiques peuvent être mentionnées dans les notes de code et l 'API, ainsi que dans l' expérience d 'exécution d' exemples.

Dans la catégorie main.js, nous modifions le Code comme suit:


```javascript

//初始化舞台
Laya.init(1334, 750);

//需要切换的图片资源路径
this.monkey1 = "res/img/monkey1.png";
this.monkey2 = "res/img/monkey2.png";
//切换状态
this.flag = false;
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//加载多张图片，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
Laya.loader.load([this.monkey1,this.monkey2],Laya.Handler.create(this,graphicsImg));
function graphicsImg(){
    //创建一个实例
    this.img = new Laya.Sprite();
    //添加到舞台
    Laya.stage.addChild(this.img);
    //显示初始化绘制的图片
    switchImg();
    //侦听switchImg中图片区域的点击事件，触发后执行switchImg切换纹理绘制
    this.img.on(Laya.Event.CLICK,this,switchImg);			

    //设置图片坐标s
    this.img.pos(100,50);
}
function switchImg(){
    //清空绘制
    this.img.graphics.clear();
    //获得要切换的图片资源路径
    var imgUrl = (this.flag = !this.flag)? this.monkey2:this.monkey1;
    //获取图片资源
    var texture = Laya.loader.getRes(imgUrl);
    //绘制纹理
    this.img.graphics.drawTexture(texture);                        
    //设置纹理宽高
    this.img.size(texture.width, texture.height);   
}
```


L'effet d'exploitation du Code est indiqué dans la figure 7 - 2.

![动图7-2](img/7-2.gif)< br / > (Figure 7 - 2)





