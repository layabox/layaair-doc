#Layaair3d animation 1

À l'heure actuelle, le moteur layaair3d a procédé à d'importants ajustements de la partie animée, tout en conservant l'ancienne version de l'animation, mais il est recommandé aux concepteurs d'utiliser de nouveaux modules d'animation.La nouvelle version de l 'ensemble animateur animator intègre plusieurs types d' animation de l 'ancienne version sans les classer pour les créer, ce qui permet d' économiser du temps de développement, y compris l 'animation osseuse, l' animation de matériaux, l 'animation rigide, l' animation de caméras, etc.

L 'ensemble d' animation animator supporte l 'animation exportée par Unity, le modèle d' animation squelettique peut être édité de manière intégrée après l 'introduction de l' Unity, l 'animation de matériau, l' animation rigide pouvant être éditée directement dans l 'unité et exportée pour être utilisée.

###Personnage d 'animation

L 'animation de personnages de jeux en 3D est largement utilisée dans les jeux en 3D, les modèles d' animation de rôles peuvent être introduits dans l 'unité et exportés vers layaair pour être utilisés.

####Édition d 'animation en Unity

Import ModelDans un gestionnaire de ressources Unity, les ressources de modèle Fbx, les ressources d 'autocollage sont importées par le bouton droit (Import New Assets) et traînées dans la scène pour ajuster et enregistrer le maquette de matériau.

Créer un contrôleur d 'animation.Dans un gestionnaire de ressources Unity, un contrôleur d 'animation (create) est créé par le bouton droit et, selon le nom de l' animation, le présent exemple s' appelle "monkeyaction".

Éditer le Contrôleur d 'animation.Double - cliquez pour ouvrir le Contrôleur d 'animation et la zone d' affichage présente une interface d 'édition du Contrôleur d' animation.

![1](img/1.png)(Figure 1) < / BR >

Commande d 'animation liée.Sélectionnez le modèle de rôle dans la scène, attribuez le Contrôleur d 'animation de rôle à l' ensemble d 'animation du modèle sélectionné (fig. 2) et, s' il n' y a pas d 'ensemble d' animation, l 'animation exportée ne peut pas être lue.

![2](img/2.png)(Figure 2) < / BR >

Après ces étapes, nous avons terminé l 'édition de l' animation de rôle dans l 'Unity, en cliquant sur le bouton d' exécution de l 'Unity, et alors nous pouvons voir l' animation.Si la diffusion de l'animation ne pose pas de problème, les ressources nécessaires à layaair pourraient être exportées conformément à la méthode antérieure d'utilisation de l'outil de prise en charge Unity.

**Tips: les autres animations sont traitées de la même manière dans l 'Unity, et les étapes suivantes sont nécessaires: ajouter un module d' animation au modèle de scène - créer un contrôleur d 'animation - Ajouter l' animation au Contrôleur d 'animation - Ajouter le Contrôleur d' animation au module d 'animation du modèle.**

####Réalisation d 'animation de rôle dans layaair

Les ressources exportées sont copiées dans le catalogue du projet Bin et les ressources de rôle sont chargées par Code, après quoi l 'animation est automatiquement diffusée et recyclée (fig. 3), le Code de référence étant le suivant:


```typescript

var Main = (function () {
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    var scene = Laya.stage.addChild(new Laya.Scene3D());

    //添加照相机
    var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
    camera.transform.translate(new Laya.Vector3(0, 3, 3));
    camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
    camera.clearColor = null;

    //添加方向光
    var directionLight = scene.addChild(new Laya.DirectionLight());
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp){
      //加载到场景
      var hero = scene.addChild(sp);
      //让摄影机指向角色
      camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0))
    }));
  }
  return Main;
} ());

Main();
```


![3](img/3.gif)(Figure 3) < / BR >



####Control and Decomposition of Role Animation

**Acquisition d 'un ensemble d' animation**

A travers l 'exemple ci - dessus, on voit que l' animation est automatiquement diffusée et qu 'elle comprend plusieurs actions.Il faut d 'abord obtenir l' ensemble d 'animation sur le modèle avant de commander la lecture, l' arrêt, etc.

La classe sprite3d du modèle 3D du moteur layaair - 3D fournit un procédé de getcomponent bytype () pour obtenir des composants sur le modèle.Le modèle avec animation a donné par défaut à l 'ensemble animateur animator lors de sa création, de sorte que nous pouvons l' obtenir en référence au code suivant.

Ouvre le fichier LH et affiche que l 'ensemble d' animation est attaché à un sous - objet du modèle, ce qui permet d 'utiliser "getchildat (0)" pour obtenir un sous - modèle d' objet.L 'ensemble d' animation est ensuite obtenu par le procédé getcomponentbytype (animator)


```typescript

//获取角色动画组件
var ani = hero.getChildAt(0).getComponent(Laya.Animator);
```


**Il y a parfois dans les fichiers -Par conséquent, avant l 'acquisition de l' ensemble d 'animation, on peut ouvrir. LS ou LH pour voir une relation hiérarchique avec un modèle d' ensemble d 'animation, puis obtenir le modèle par des procédés tels que getchildat () ou getchildbyname () avant d' obtenir l 'ensemble d' animation.Sinon, le programme se trompe!**

**Commande de lecture**

Avec l 'ensemble d' animation, pourquoi ne diffuser qu 'une seule action?Il existe deux façons de commander et de Commuter les actions.



####Définition de code

Dans l 'exemple précédent, l' animation n 'est pas séparée dans l' Unity, nous utilisons l 'animation take 001 par défaut du modèle, et le module ne produit qu' un seul fichier d 'analyse d' animation au format LANI.

La commande de lecture d 'un segment de l' animation nécessite donc l 'ajout d' un clip d 'animation personnalisé dans le Code, et la mise en oeuvre d' un coefficient de trame de début et de fin dans le clip d 'animation.

Voir le procédé play () dans l 'ensemble animé animateur animé d' animator, dont les paramètres sont les suivants:

**Après la version 1.7.10, la méthode play () annule les paramètres de bouclage, de démarrage et de fin de trame.Si l 'animation est cyclique, sélectionnez les attributs d' animation de l 'éditeur Unity et le moteur d' exportation suivra ses réglages pour la lecture d 'animation.Voir les options loop Time dans les figures 5 et 6!**


```java

/**
* 播放动画。
* @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
* @param	playbackRate 播放速率。
*/
play(name:String=null,playbackRate:Number=1.0)
```



**Si une trame de l 'animation doit être projetée sur une trame particulière, un montage d' animation supplémentaire (fragment) animationclip peut être créé sur la base de l 'animation originale, et la classe animator la plus récente fournit un exemple d' addclip () qui permet à l 'développeur de créer un montage d' animation et de définir un nom, puis de le reproduire par play (nom de montage d 'animation).**


```java

//创建一个动画动作状态
var state1 = new Laya.AnimatorState();
//设置动作状态的名称
state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
state1.clipStart = 10/40;
//设置动作状态播放的结束时间
state1.clipEnd = 20/40;
//得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
state1.clip = ani.getDefaultState().clip;
//动画播放是否循环
state1.clip.islooping = true;
//添加动画状态到动画组件里
ani.addState(state1);
//播放动画
ani.play("hello");
```


Modifier le code dans l 'exemple comme suit:


```typescript

Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp){
  //加载到场景
  var hero = scene.addChild(sp);
  //让摄影机指向角色
  camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0))
  //获取角色动画组件
  var ani = hero.getChildAt(0).getComponent(Laya.Animator);
  //创建一个动画动作状态
  var state1 = new Laya.AnimatorState();
  //设置动作状态的名称
  state1.name = "hello";
  //设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
  state1.clipStart = 10/40;
  //设置动作状态播放的结束时间
  state1.clipEnd = 20/40;
  //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
  state1.clip = ani.getDefaultState().clip;
  //动画播放是否循环
  state1.clip.islooping = true;
  //添加动画状态到动画组件里
  ani.addState(state1);
  //播放动画
  ani.play("hello");
}));
```


Après l 'opération de compilation, l' animation debout de 0 à 34 trames est diffusée en boucle.

![4](img/4.gif)Figure 4 < / BR >



####Définition de la lecture de montage d 'animation dans Unity

L 'animation peut être segmentée dans l' unité et les fragments du montage peuvent être nommés.Lors de la commande des ressources exportées, un transfert d 'animation peut être effectué par le nom pour faciliter l' utilisation par les développeurs.(cette façon de procéder permet d 'ajouter des fichiers d' analyse animés à l 'exportation des ressources, ce qui augmente le nombre d' accès à http et permet aux concepteurs d 'examiner de quelle manière les circonstances le justifient)

Les fragments d'animation de l'Unity sont divisés comme suit:

Sélectionnez le fichier de modèle dans le gestionnaire de ressources, sélectionnez les animations dans l 'interface Inspector à droite, affichez l' animation take - 001 par défaut, cliquez pour éditer le nom personnalisé, cliquez sur un signe supplémentaire pour ajouter un fragment d 'animation et modifier la trame de début et de fin du fragment (fig. 5).

Cochez l 'option "loop Time" dans le diagramme ci - dessous.

![5](img/5.png)Figure 5 < / BR >

Dans cet exemple, ajouter quatre segments d 'animation en fonction du nombre de trames d' animation fournies par les beaux - arts (fig. 6).

![6](img/6.png)Figure 6 < / BR >

2) Lorsque la modification est achevée, le fichier d 'animation correspondant est ajouté au modèle de gestionnaire de ressources, de sorte que le Contrôleur d' animation doit être modifié pour ajouter le nouveau fragment d 'animation au Contrôleur d' animation, faute de quoi il n 'est pas possible d' exporter un fichier d 'Analyse complet de ressources d' animation (fig. 7).

![7](img/7.png)Figure 7 < / BR >

Après l 'exécution de l' étape précédente, les ressources exportées génèrent également quatre fichiers d 'analyse d' animation LANI.

Modifier le Code de l 'exemple en utilisant le nom de l' animation de lecture, l 'effet étant le suivant (fig. 8).


```typescript

Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp){
  //加载到场景
  var hero = scene.addChild(sp);
  //让摄影机指向角色
  camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0))
  //获取角色动画组件
   this.ani = hero.getChildAt(0).getComponent(Laya.Animator);
}));
//监听默认动画完成后播放站立动画
this.ani.on(Laya.Event.COMPLETE,this,onAniComplete);
//播放攻击动画
this.ani.play("attack");
/***当前动画播放完成后回调***/
function onAniComplete()
{
  //切换站立动画
  this.ani.play("stand");
}
```


![8](img/8.gif)(Figure 8) < / BR >