#Procédé d 'optimisation de mémoire

###Optimisation de la mémoire au moyen d 'un réservoir d' objets

Optimization of the object Pool is a very important Optimization Mode in the Development of the Game and an important factor influencing the Performance of the Game.

Dans le jeu, de nombreux objets sont créés et enlevés sans cesse, tels que des balles d 'attaque personnalisée, la création et l' élimination d 'effets spéciaux, l' élimination et la rafraîchissement du NPC, et sont très consommables, en particulier dans de nombreux cas.

La technique de réservoir d 'objets permet de résoudre les problèmes ci - dessus, de récupérer le réservoir d' objets lorsqu 'il disparaît et d' en extraire l 'utilisation directement du réservoir d' objets lorsque de nouveaux objets sont nécessaires.

L 'avantage est de réduire le coût de l' utilisation de l 'objet de mise à jour et de permettre à l' objet d 'être réutilisé, ce qui réduit les possibilités d' une nouvelle distribution de mémoire et de fonctionnement du récupérateur d 'ordures.

**Attention!**Le mécanisme de récupération des ordures n 'est utilisé que lorsque la mémoire est jugée insuffisante et que le nettoyage prend beaucoup de temps, ce qui risque de provoquer le phénomène de carton.**L 'utilisation d' un réservoir d 'objet réduit l' objet de déchets du programme et améliore efficacement la vitesse de fonctionnement et la stabilité du programme**".

####1.1 catégories de réservoirs cibles du moteur layaair

Le moteur layaair fournit des réservoirs.[laya.utils.Pool](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.utils.Pool), pour le stockage et la réutilisation d 'objets.Le plus souvent`对象池创建`Méthode`getItemByClass()`Et`回收到对象池`Méthode`recover()`".Comme le montrent les figures 1 - 1 et 1 - 2.

![1](img/1.png)< / BR >

Graphique 1) procédé de création d 'une cellule d' objet

![2](img/2.png)< / BR >

Figure 2) procédé de récupération de l 'objet dans la cuve de l' objet et de retour de l 'objet utilisé dans la cuve de l' objet

####1.2 exemples d'optimisation d'un réservoir d'objets

Le code ci - après permet de créer 100 flocons de neige tous les 100 trames à l 'aide d' un pool d 'objets, d' éliminer la scène lorsque le flocon de neige se déplace au - delà de la limite ou est réduit à 0, et d 'appeler le procédé pool.recover () pour récupérer l' objet spécifié dans la Pool d 'objets.

##### 


```typescript

//初始化引擎
Laya.init(1136, 640, Laya.WebGL);
//等比缩放
Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
//背景颜色
Laya.stage.bgColor = "#232628";
//帧循环
Laya.timer.frameLoop(1, this, onFrame);
this.createTime = 0;
function onFrame() {
    //如果创建对象时间为100帧间隔后
    if (this.createTime >= 100) {
        //每200帧间隔创建30个雪花
        for (var i = 0; i < 100; i++) {

            //img:Image=new Image(); //不使用对象池的写法
            //通过对象池创建图片，如对象池中无相应的对象，则根据Image类型执行new Image()创建
            var img = Laya.Pool.getItemByClass("img", Laya.Image);
            //通过锚点设置轴心点
            img.anchorX = img.anchorY = 0.5;
            //图片的资源
            img.skin = "res/snow0.png"
            //在舞台上方随机位置创建
            img.x = Math.random() * 1136;
            img.y = Math.random() * -150;
            //对象池中的图片被缩放了，需重新设置其缩放属性。
            //如果对象中还有其他属性被改变了，
            img.scaleX = img.scaleY = 1;
            //加载到舞台
            Laya.stage.addChild(img);
            //到100帧后创建完对象后时间归0
            this.createTime = 0;
        }
    } else {
        //更新创建时间
        this.createTime++;
    }
    //检测每个舞台中的图片对象，并进行位置更新。
    for (var j = 0; j < Laya.stage.numChildren; j++) {
        //获取舞台中的图片对象
        var img1 = Laya.stage.getChildAt(j);
        //位置更新
        img1.y++;
        //缩放更新
        img1.scaleX -= 0.001;
        img1.scaleY -= 0.001;
        //图片旋转
        img1.rotation++;
        //超出边界或缩放小于0
        if (img1.y > 640 + 20 || img1.scaleX <= 0) {
            //从舞台中移除
            Laya.stage.removeChild(img1);
            //img1.destroy(); //不使用对象池的编写方式,直接用destroy清空             
            //回收到对象池
            Laya.Pool.recover("img", img1);
        }
    }
}
```


###Utilisation de handler.create

Dans le processus de développement, Handler est fréquemment utilisé pour effectuer des échéanciers asynchrones.Laya.handler.create utilise la gestion de bassin d 'objet intégré et peut donc créer un processeur de retour en utilisant l' objet Handler.Le code suivant crée un processeur de retour à charge de ressources à l 'aide de laya.handler.create:

Un.`Laya.loader.load(urls, Laya.Handler.create(this, onAssetLoaded));`

Nous chargeons souvent les ressources par lots en fonction de la logique du jeu et de l 'étape, les premières ressources étant chargées et déclenchées par la méthode de retour d' événements complete créée par laya.handler.create () et récupérées par la piscine de l 'objet.L 'utilisation directe du procédé dans la Cellule d' objet permet d 'économiser les frais de mémoire.

####Utilisez Handler. Create là où vous avez besoin d'attention.

![3](img/3.png)</br>


Dans des circonstances exceptionnelles, nous avons besoin d'attention.`Laya.Hanlder.create()`Mode d 'emploi`Laya.Hanlder.create()`Description de la méthode.

Crée un Handler à partir de la piscine d 'objet, qui est exécuté une fois par défaut et récupéré immédiatement.

En d 'autres termes, si vous avez besoin de déclencher ce retour à plusieurs reprises, vous devez avoir raison.`Laya.Hanlder.create()`Méthode`once`Paramètre`false`".Ou`new Laya.Handler()`Créer

Par exemple, nous avons besoin de charger des ressources dans l 'interface de démarrage du jeu, d' afficher l 'état d' avancement des ressources de chargement, et le codage suivant est erroné.

Un.`Laya.loader.load(urls, Laya.Handler.create(this, onAssetLoaded), Laya.Handler.create(this, onLoading));`

Dans le code ci - dessus, utilisez`Laya.Handler.create(this,onLoading)`Le procédé de retour est destiné à traiter l 'événement de progression de chargement de Progress, qui est récupéré par le réservoir d' objet après une seule opération de retour.

La bonne formule est:


```

Laya.loader.load(urls, Laya.Handler.create(this,onAssetLoaded), Laya.Handler.create(this,onLoading, null, false));
```


Ou:

Un.`Laya.loader.load(urls, Laya.Handler.create(this,onAssetLoaded), new Laya.Handler(this, onLoading));`

**Tips**Il n'y a pas de confusion.`Handler()`C'est comme ça qu'il n'y a pas de bassin d'objets.`Handler.create()`Par défaut, utilisez le bassin de l 'objet.Il ne faut pas confondre avec Handler.

**Handler () API, voir la figure 4.**- Oui.

![4](img/4.png)</br>


(Figure 4)

###Release Memory

JavaScript ne peut pas démarrer le recycleur d 'ordures.Pour qu 'un objet puisse être récupéré, toutes les références à l' objet doivent être supprimées.De Sprite.`destory()`Le procédé aide à définir une référence interne comme null.

Par exemple, les codes suivants garantissent que les objets peuvent être récupérés comme déchets:

Un.`//创建一个Sprite实例`
Deux.`var sp = new Laya.Sprite();`
Trois.`//将sp内部引用设置为null`
Quatre.`sp.destroy();`

Lorsque l 'objet est NULL, il ne sera pas immédiatement supprimé de la mémoire.Le récupérateur de déchets ne fonctionne que si le système estime que la mémoire est suffisamment basse.La distribution de mémoire (et non la suppression d 'objet) déclenche la récupération des déchets.

La récupération des ordures peut absorber une grande quantité de CPU et influer sur les performances.Par réutilisation d 'objets, on tente de limiter l' utilisation de la récupération des ordures.En outre, la référence est réglée, dans la mesure du possible, sous forme de NULL, de sorte que le récupérateur d 'ordures passe moins de temps à rechercher l' objet.Dans certains cas (par exemple, lorsque les deux objets sont cités l 'un par l' autre), il n 'est pas possible d' installer simultanément deux références NULL, et le récupérateur de déchets balaie et efface les objets qui ne peuvent pas être accessibles, ce qui est plus consommable que les compteurs de référence.

###Déchargement des ressources

Le jeu s' effectue toujours avec beaucoup de ressources qui doivent être déchargées à temps après avoir été utilisées, sinon elles restent dans la mémoire.

L 'exemple suivant permet de comparer l' état des ressources avant et après le déchargement des ressources après le chargement:


```javascript

var assets = [];
assets.push("res/apes/monkey0.png");
assets.push("res/apes/monkey1.png");
assets.push("res/apes/monkey2.png");
assets.push("res/apes/monkey3.png");
Laya.loader.load(assets, Laya.Handler.create(this, onAssetsLoaded));
function onAssetsLoaded() {
    for (var i = 0, len = assets.length; i < len; ++i) {
        var asset = assets[i];
        //查看log，清理前资源一直在内存中
        console.log(Laya.loader.getRes(asset));
        //调用清理方法
        Laya.loader.clearRes(asset);
        //查看log，清理后，资源被卸载
        console.log(Laya.loader.getRes(asset));
    }
}
```


###Sur les filtres et les masques

Essayez de réduire au minimum l 'utilisation de filtres.Lorsque le filtre (blurfilter et glowfilter) est appliqué à l 'affichage d' un objet, deux bitmap sont créés dans la mémoire.Chaque bitmap a la même taille que l 'objet affiché.Crée le premier bitmap comme une version de grillage d 'un objet d' affichage, puis pour générer un autre bitmap d 'un filtre d' application:

![5](img/5.png)< / BR >

(Figure 5)

Deux bitmap dans une mémoire d 'application de filtres

Lorsque vous modifiez une propriété du filtre ou un objet d 'affichage, les deux bits de la mémoire sont mis à jour pour créer les bits générés, qui peuvent absorber une grande partie de la mémoire.En outre, ce procédé consiste à calculer l 'unité centrale et à réduire les performances lors de la mise à jour dynamique.

Colorfiter doit calculer chaque point de pixel sous le rendu canvas, alors que la consommation de GPU sous webgl peut être négligeable.

Dans la mesure du possible, on utilise des bitmap créés par l 'outil de création d' images pour simuler des filtres.En évitant de créer des bitmap dynamiques pendant l 'exécution, on peut aider à réduire la charge CPU ou GPU.En particulier, une image qui utilise un filtre et ne peut pas être modifiée.