#Transfert de rôle 3D et animation

###Analyse d 'exemples 3D et préparation des ressources

Grâce à l 'apprentissage de documents techniques, nous avons acquis une connaissance fondamentale du développement de jeux 3D.On trouvera ci - après des exemples d'application intégrée de la technologie 3D.

Observez l 'exemple suivant (fig. 1), qui est semblable à l' interface de sélection de rôle 3D dans le jeu, et analysons d 'abord la partie du monde de jeu 3D dans l' exemple.

![1](img/1.gif)(图1)</br>



####Interface 2D et liaison 3D

La scène 3D est souvent mélangée à l 'interface 2D, dans laquelle la partie ui de l' interface est éditée pour layaairide, y compris les pages d 'avancement de chargement de ressources et les pages de contrôle ui du jeu.Leurs méthodes de fabrication sont parfaitement compatibles avec le jeu 2D et, si l 'interface d' édition de l 'IDE n' est pas familière, on peut se référer au document technique layaairide.



####Scène 3D

Dans l 'exemple, le modèle de scène est produit à partir du Fbx dans 3ds Max, puis importé à l' édition dans unty, avec deux tâches principales:

Pour éditer les images d 'éclairage de scène, les images d' éclairage peuvent produire des effets statiques entre les modèles, la couleur d 'éclairage et l' atmosphère, ce qui est très important pour améliorer la qualité artistique du jeu.

Ii) Animation d 'un matériau UV mobile pour éditer des annonces publicitaires.Il convient de noter que les animations UV de matériaux dans les 3ds Max ne sont pas prises en charge dans l 'unty et doivent donc être produites dans l' unité.

Le procédé de production de l 'unité d' animation du matériel est décrit dans le document technique layaair 3D - layaair3d animation 2.



####Personnage 3D et animation osseuse

Le modèle de personnage 3D et l 'animation squelettique sont édités et exportés dans les 3ds Max, puis importés dans l' Unity pour traiter le montage d 'animation, augmenter l' ensemble d 'animation, etc.

Lorsque l 'animation squelettique d' un personnage est produite dans un max, il est préférable d 'éditer une pluralité d' actions en une seule fois sur l 'axe temporel, d' éditer l 'animation produite par l' intermédiaire d 'une connexion d' animation, ce qui entraîne des erreurs et des tremblements après l 'introduction de l' Unity.

Dans ce mode de réalisation, pour plusieurs modes de connexion animée, l 'animation après la connexion a posé de nombreux problèmes, il s' est produit des tremblements, des interactions de modèles, et il a fallu beaucoup de temps pour atteindre ces résultats.

Pour la méthode d 'édition dans l' unité d 'animation squelettique, voir document technique - moteur layaair 3D - Animation layaair3d 1.



####Effet 3D

L 'effet de l' anneau optique est l 'animation rigide (Animation transformée: rotation, déplacement, zoom), qui peut être introduite dans l' Unity dans les 3ds Max, mais il est recommandé de créer un modèle uniquement dans 3ds Max et une animation dans l 'Unity, étant donné que l' animation qui lie le matériau au corps rigide peut être produite dans l 'unty, ce qui permet d' obtenir de meilleurs résultats.

L 'animation Unity de l' anneau optique est réalisée de la même manière que l 'animation de processus et de matériaux.

Lorsque les ressources 3D ci - dessus ont été produites dans l 'unité, quatre dossiers de ressources ont été exportés par l' intermédiaire de l 'outil d' exportation layaair pour les ressources de scène layascene u scene02, les deux ressources de rôle layascene u girl et layascene u boy, et les ressources de l 'anneau optique layascene u effect.Et copie des ressources au titre du point H5.



###Mise en oeuvre de code pour une fonction d 'instance 3D

####Mise en oeuvre de l 'interface UI

Éditez l 'interface dans l' IDE et définissez les attributs var et name des éléments de l 'interface pour les appels de code, par exemple (Figure 2) (fig. 3).

Veille à ce que la résolution de l 'interface corresponde à la résolution définie dans laya.init () et à ce que l' écran soit correctement adapté.

Analyse de progressbar.ui

![2](img/2.png)(Figure 2) < / BR >

Analyse de contrôle de rôle

![3](img/3.png)(Figure 3) < / BR >

Après avoir édité l 'interface ci - dessus, les ressources sont exportées dans l' IDE et les ressources d 'emballage et les catégories ui correspondantes sont générées dans le dossier de projet.Nous avons créé deux catégories de contrôle de l'affichage ui qui leur succéderont respectivement, selon le code suivant:

Progress ui Display Control class progressview, in class we used pseudo - step Band (sinon, l 'interface s' efface si la ressource initiale est petite)


```typescript

var ProgressView = (function(_super){
    function ProgressView(){
        ProgressView.super(this);
        this.progress = 0;
        //进度增加的帧循环
        Laya.timer.loop(30,this,this.onLoop);
    }
    Laya.class(ProgressView,"ProgressView",_super);
    var _proto = ProgressView.prototype;
    /*资源加载进度模拟（假进度）*/
    _proto.onLoop = function(){
        //进度增加
        this.progress++;
        //最高100%进度
        if(this.progress > 100){
            this.progress = 100;
            this.tips.text = "游戏加载完毕，即将进入游戏...";
            //清除所有事件监听，包括帧循环
            Laya.timer.clearAll(this);
            //进度100%后，自动移除界面
            this.removeSelf();
        }
        else{
            //更新组件显示进度
            this.pro.value = this.progress/100;
            this.tips.text = "游戏正在加载中，当前进度为："+this.progress+"%!";
        }
    }
    return ProgressView;
})(ui.ProgressUI);
```


L 'unité de commande de rôle ui affiche la classe de commande conterlview, et nous envoyons le nom de bouton actuellement cliqué à la classe principale par un événement.


```typescript

var ControlView = (function(_super){
    function ControlView(){
        ControlView.super(this);
        //监听UI鼠标点击事件
        this.on(Laya.Event.MOUSE_DOWN,this,this.onClick);
    }
    Laya.class(ControlView,"ControlView",_super);
    var _proto = ControlView.prototype;
    _proto.onClick = function(e){
        //发送点击的组件名称
        this.event("btn_action",e.target.name);
    }
    return ControlView;
})(ui.ControlUI);
```


Mise en oeuvre combinée de 2D et 3D

La classe scéne 3D est une classe Sprite d 'objets d' affichage héritée de la classe 2D, de sorte qu 'elle peut être chargée sur la scène comme un objet d' affichage 2D et ajuster son niveau par le biais de setchildindex () pour traiter sa relation avec le masquage de couche supérieure et inférieure de l 'arrière - plan et de l' interface.

Dans ce mode de réalisation, l 'interface d' avancement de chargement de ressources et l 'interface de commande de rôle doivent être disposées sur la couche supérieure de la scène 3D et peuvent être mises en oeuvre par le procédé ci - dessus, avec le Code laya.stage.setchildindex (scene, 0), le Code de chargement de l' interface et de la scène dans la classe principale étant le suivant:


```typescript

//初始化引擎
Laya3D.init(1280, 720, true);
/*****角色资源名数组******/
this.roleArray= ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

//加载2D界面资源
Laya.loader.load(["res/atlas/comp.atlas","res/atlas/myAssets.atlas"], Laya.Handler.create(this, onUIComplete));

/*界面资源加载完成后*/
function onUIComplete() {
    //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
    Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
    { url: this.roleArray[0] }, { url: this.roleArray[1] },
    { url: "LayaScene_effect/effect.lh" }
    ], Laya.Handler.create(this, this.onSceneOK));
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //创建资源载入界面
    var assetLoad = new ProgressView();
    Laya.stage.addChild(assetLoad);
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;
}
```


L 'interface de commande est au - dessus de la scène 3D.

L 'animation en 3D contient une animation UV de matériau, qui est automatiquement chargée et diffusée après chargement. LS. Si nécessaire, on peut appuyer sur la commande d' animation du rôle pour obtenir l 'ensemble d' animation avant de l 'avoir commandée par l' ensemble d 'animation.



####Création et commande de rôle 3D

La commande d 'animation de rôle est d' autant plus importante qu 'il est nécessaire d' obtenir l 'ensemble d' animation que, dans ce cas, le préchargement est appliqué, de sorte que la création d 'un rôle peut être obtenue directement à partir d' un modèle de rôle.

Tips: si le chargement asynchrone de sprite.load () n'est pas effectué au moyen d'un préchargement, il faudra ajouter des ressources d'écoute pour le chargement de l'événement avant d'obtenir l'ensemble d'animation, faute de quoi il y aura erreur de notification.

#####Créer un rôle

Ajouter dans la catégorie principale les attributs globaux associés aux personnages, y compris les ressources de personnages actifs, l 'ensemble d' animation de personnages actifs, le nom d 'action de personnages actifs, etc., et ajouter une méthode de création de personnages dont le Code est le suivant:


```typescript

//初始化引擎
Laya3D.init(1280, 720, true);
/*****角色资源名数组******/
this.roleArray= ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
/*当前场景中角色资源*/
this.currentRole = "LayaScene_girl/girl.lh";
/*当前角色动作名*/
this.currentActive = "stand";
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

//加载2D界面资源
Laya.loader.load(["res/atlas/comp.atlas","res/atlas/myAssets.atlas"], Laya.Handler.create(this, onUIComplete));

/*界面资源加载完成后*/
function onUIComplete() {
    //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
    Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
    { url: this.roleArray[0] }, { url: this.roleArray[1] },
    { url: "LayaScene_effect/effect.lh" }
    ], Laya.Handler.create(this, this.onSceneOK));
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //创建资源载入界面
    var assetLoad = new ProgressView();
    Laya.stage.addChild(assetLoad);
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;

    //创建角色
    this.createRole3D();
}
/*创建角色并获取动画组件*/
function createRole3D(){
    //创建角色
    this.role3D = Laya.loader.getRes(this.currentRole);
    //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
    this.roleAni = (this.role3D.getChildAt(0)).getComponentByType(Laya.Animator);
    //监听动画完成事件
    this.roleAni.on(Laya.Event.COMPLETE,this,this.onAniComplete);
    //播放上一个角色的当前动作
    this.roleAni.play(this.currentActive);
    //角色位置
    this.role3D.transform.position = new Laya.Vector3(-3,0,1);
    this.scene.addChild(this.role3D);
}
/*动画播放完成后回调*/
function onAniComplete(){
    //如果当前的完成动画剪辑名为“play”击球
    if(this.roleAni.currentPlayClip.name == "play"){
        //完成击球后播放准备动作动画
        this.roleAni.play("ready");
        this.currentActive = "ready";
    }
}
```


Dans le code ci - dessus, nous ajoutons le retour de la lecture animée.`this.roleAni.on(Laya.Event.COMPLETE,this,this.onAniComplete);`Pour l 'essentiel comme pour l' animation 2d, il s' agit d 'un programme après la lecture d' un clip d 'animation qui permet de déterminer le nom Current playclip.name de l' animation, ce qui facilite l 'édition de la logique de jeu par les développeurs.



#####Commande d 'animation de rôle

La commande de rôle est commandée par un clic de bouton dans l 'ui.`this.control.on("btn_action",this,this.onBtnAction)`Pour contrôler le rôle.

Le procédé de transfert de rôle consiste à remplacer les ressources de rôle et à créer de nouveau l 'impression que, bien que le type de rôle ait été créé lors du chargement des ressources par laya.loader.create, le rôle de transfert est inséré dans la cuve d' objet, de sorte que lorsque le changement de rôle fait appel à Plusieurs fois à la méthode de création de rôle createrole3d () Il est créé directement à partir de la cuve d 'objet.

Le transfert d 'animation se fait principalement par l' intermédiaire de l 'ensemble d' animation pour la lecture, l 'arrêt et le transfert de l' action.Modifier le Code comme suit:


```typescript

/*界面资源加载完成后*/
function onUIComplete() {
    ......
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //监听控制界面按钮信息
    this.control.on("btn_action", this, onBtnAction);
    ......
}
/*控制界面动作监听回调
action：当前执行的控制名称
*/
function onBtnAction(action) {
    if (action == "change") {
        //切换角色
        this.changeRole();
    } else if (action == "playAni") {
        //播放当前动作
        this.roleAni.play(this.currentActive);
    } else if (action == "stopAni") {
        //停止动画
        this.roleAni.stop();
    } else if (action == "stand" || action == "go" || action == "ready" || action == "play") {
        //播放动作
        this.roleAni.play(action);
        this.currentActive = action;
    }
}
/*切换角色*/
function changeRole() {
    //移除角色
    this.role3D.removeSelf();
    //移除所有事件监听
    this.roleAni.offAll();
    //当前角色索引
    var index = this.roleArray.indexOf(this.currentRole);
    //下一个角色
    index++;
    if (index > this.roleArray.length - 1) {
        index = 0;
    }
    this.currentRole = this.roleArray[index];
    //创建角色
    this.createRole3D();
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;

    //创建角色
    this.createRole3D();
}
```




####Création d 'animation

L 'appel d' animation à effet spécifique est assez simple, ici nous n 'avons pas besoin de le contrôler, donc il suffit de l' envoyer directement au pied du personnage, code suivant:


```typescript

/*创建特效*/
function createEffect3D() {
    //创建特效
    this.effect3D = Laya.loader.getRes("LayaScene_effect/effect.lh");
    this.scene.addChild(this.effect3D);
    //特效位置
    this.effect3D.transform.position = new Laya.Vector3(-3, 0.01, 1.2);
    //特效缩放
    this.effect3D.transform.localScale = new Laya.Vector3(0.15, 0.15, 0.15);
}
```


Ajouter un procédé de création d 'effets spéciaux dans le retour terminé de chargement de scène, et après l' opération de compilation, l 'effet est indiqué dans la figure 1.



####Code final complet


```typescript

//初始化引擎
Laya3D.init(1280, 720, true);
/*****角色资源名数组******/
this.roleArray = ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
/*当前场景中角色资源*/
this.currentRole = "LayaScene_girl/girl.lh";
/*当前角色动作名*/
this.currentActive = "stand";
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

//加载2D界面资源
Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/myAssets.atlas"], Laya.Handler.create(this, onUIComplete));

/*界面资源加载完成后*/
function onUIComplete() {
    //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
    Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
    { url: this.roleArray[0] }, { url: this.roleArray[1] },
    { url: "LayaScene_effect/effect.lh" }
    ], Laya.Handler.create(this, this.onSceneOK));
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //监听控制界面按钮信息
    this.control.on("btn_action", this, onBtnAction);
    //创建资源载入界面
    var assetLoad = new ProgressView();
    Laya.stage.addChild(assetLoad);
}
/*控制界面动作监听回调
action：当前执行的控制名称
*/
function onBtnAction(action) {
    if (action == "change") {
        //切换角色
        this.changeRole();
    } else if (action == "playAni") {
        //播放当前动作
        this.roleAni.play(this.currentActive);
    } else if (action == "stopAni") {
        //停止动画
        this.roleAni.stop();
    } else if (action == "stand" || action == "go" || action == "ready" || action == "play") {
        //播放动作
        this.roleAni.play(action);
        this.currentActive = action;
    }
}
/*切换角色*/
function changeRole() {
    //移除角色
    this.role3D.removeSelf();
    //移除所有事件监听
    this.roleAni.offAll();
    //当前角色索引
    var index = this.roleArray.indexOf(this.currentRole);
    //下一个角色
    index++;
    if (index > this.roleArray.length - 1) {
        index = 0;
    }
    this.currentRole = this.roleArray[index];
    //创建角色
    this.createRole3D();
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;

    //创建角色
    createRole3D();
    //创建特效
    createEffect3D();
}
/*创建特效*/
function createEffect3D() {
    //创建特效
    this.effect3D = Laya.loader.getRes("LayaScene_effect/effect.lh");
    this.scene.addChild(this.effect3D);
    //特效位置
    this.effect3D.transform.position = new Laya.Vector3(-3, 0.01, 1.2);
    //特效缩放
    this.effect3D.transform.localScale = new Laya.Vector3(0.15, 0.15, 0.15);
}
/*创建角色并获取动画组件*/
function createRole3D() {
    //创建角色
    this.role3D = Laya.loader.getRes(this.currentRole);
    //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
    this.roleAni = (this.role3D.getChildAt(0)).getComponentByType(Laya.Animator);
    //监听动画完成事件
    this.roleAni.on(Laya.Event.COMPLETE, this, this.onAniComplete);
    //播放上一个角色的当前动作
    this.roleAni.play(this.currentActive);
    //角色位置
    this.role3D.transform.position = new Laya.Vector3(-3, 0, 1);
    this.scene.addChild(this.role3D);
}
/*动画播放完成后回调*/
function onAniComplete() {
    //如果当前的完成动画剪辑名为“play”击球
    if (this.roleAni.currentPlayClip.name == "play") {
        //完成击球后播放准备动作动画
        this.roleAni.play("ready");
        this.currentActive = "ready";
    }
}
```
