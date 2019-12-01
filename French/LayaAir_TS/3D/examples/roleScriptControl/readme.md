#Commande de script de rôle 3D et détection de collision

###Analyse des besoins

Ce cours s' adresse principalement aux débutants sur l 'utilisation combinée de moteurs 3D, y compris le traitement et le chargement de scénarios 3D, la détection de collision de rôle et le transfert de commande d' animation.Un exemple de développement de base similaire à celui d 'un jeu rpg est présenté aux développeurs.

**Les besoins fondamentaux sont les suivants:**

Un dispositif de commande de tige de bascule permet de commander le Mouvement des personnages dans la scène et de les déplacer et de les maintenir en attente lorsque le dispositif de commande de tige de bascule est détaché.

Le bouton d 'attaque peut être converti en animation d' attaque de personnages, appuyer sur le bouton peut frapper sans interruption, cliquer sur un bouton pour au moins une fois une animation d 'attaque complète, après la fin de la lecture, le bouton d' attaque a une priorité supérieure à celle du levier d 'attaque, si le levier d' attaque est toujours sous tension, l 'animation mobile est diffusée et déplacée après l' arrêt de l 'attaque.

Il faut des barrières dans les scènes, certains acteurs locaux ne peuvent pas marcher et arrêter de bouger quand ils marchent jusqu 'à la zone de blocage.

Le clonage a le même rôle et les deux sont contrôlés simultanément, l'un sans que l'autre ne soit affecté lorsqu'il y a un blocage.

Figure 1.

![1](img/1.gif)(Figure 1) < / BR >



###Analysis of Engine technique

1, le berceau: en utilisant le moteur 2D de la souris de l 'écoute, moteur 2D de l' événement de la souris supporte Multi - contact contact, s' adapte au multi - point de fonctionnement complexe du téléphone mobile.

Role Control: layaair3d Engine Supporting Component Development Model, so role Control we use the script Components, Effective Separation of Control and display.

Scénario: Au moment de l 'établissement du document, la topographie avancée du moteur 3D est en cours d' amélioration, de sorte que les barrières dans la scène sont temporairement évaluées à l 'aide d' un Collisionneur de zone de marche et d 'un détecteur de rayons.

Les beaux - arts peuvent produire un modèle séparé dans une scène 3D, par exemple la figure 2.Lors de l 'utilisation de l' Export, il n 'y a pas de rendu, mais il est nécessaire d' ajouter un Collisionneur de grille au Code, de générer un rayon avec le collisionneur à partir de la position avant du personnage et de détecter l 'impact sans informations de collision, le personnage ne peut pas marcher et les personnages ayant des informations de collision peuvent marcher.Bien entendu, on peut aussi, à l'inverse, ne pas faire de zone de marche pour créer un modèle.

Lorsque la fonction topographique avancée sera améliorée, le document technique sera présenté en détail et les développeurs sont recommandés d 'utiliser la topographie avancée pour améliorer les performances.

![2](img/2.png)(Figure 2) < / BR >



###Dispositif de commande de levier et Bouton d 'attaque

L 'interface avec le Code est sensiblement identique à l' exemple de transfert de rôle et d 'animation dans le document technique - 3D, ici peu.

Le Contrôleur de tige distante est connecté à l 'interface de bouton d' attaque pour les jeux 2D et 3D, que les développeurs peuvent utiliser en référence.Deux interfaces, nommées rocker.ui, attack.ui et rocker.ui, sont créées dans la layaairide et comprennent des images de contact et des cartes de base, et attack.ui est constitué d 'un bouton d' attaque qui peut être élargi avec d 'autres boutons de compétences.Les interfaces sont les figures 3 et 4 ci - dessous.

![3](img/3.png)(图3)</br>



![4](img/4.png)Figure 4 < / BR >

Après la publication des ressources d 'exportation, les catégories correspondantes apparaissent dans le dossier ui du projet, et nous établissons le dossier View et créerons les catégories rockerview et attackview qui lui succéderont, où seront élaborés des codes logiques de commande de levier et d' attaque, comme suit:


```typescript

class RockerView extends ui.RockerUI{
    /***触摸区域****/
    private touchRect:Laya.Sprite;
    /***控制器中心点****/
    private originPiont:Laya.Point;
    /***摇杆与中心点的x轴距离****/
    private deltaX:number;
    /***摇杆与中心点的y轴距离****/
    private deltaY:number;
    /***当前多点触摸id****/
    private curTouchId:number=0;
    /***手指（鼠标）是否按下****/
    private isDown:Boolean=false;
    /***摇杆的角度****/
    public angle:number=-1;        
    /***摇杆的弧度****/
    public radians:number=-1;
    /***是否左手遥控****/
    public isleftControl:Boolean=true; 
    constructor(touchSp:Laya.Sprite) {
        super();
        this.touchRect = touchSp;
        //鼠标按下事件监听
        this.touchRect.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        //鼠标抬起事件监听
        this.touchRect.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        //鼠标是否移除屏幕事件监听
        // this.touchRect.on(Laya.Event.MOUSE_OUT,this,this.onBlur);
        //控制器中心点位置初始化
        this.originPiont = new Laya.Point(this.width/2,this.height/2);
        //默认为控制器不显示
        this.visible = false;
    }
    /*鼠标按下事件回调*/
    private onMouseDown(e:Laya.Event):void{
        //左右手遥控
        if(this.isleftControl){
            //如果按下时是右边屏幕位置或已经按下鼠标，则返回
            if(e.stageX > Laya.stage.width/2 || this.isDown)return;
        }
        else{
            //如果按下时是左边屏幕位置或已经按下鼠标，则返回
            if(e.stageX < Laya.stage.width/2 || this.isDown)return;
        }
        //记录当前按下id
         this.curTouchId = e.touchId;
         //已按下
         this.isDown = true;
         //更新摇杆到屏幕按下位置
         this.pos(Laya.stage.mouseX - (this.width / 2),Laya.stage.mouseY - (this.height / 2));
         //初始化摇杆控制点位置
         this.knob.pos(this.width / 2, this.height / 2);
         //按下后显示摇杆
         this.visible = true;
         //摇杆移动控制事件监听
         this.touchRect.on(Laya.Event.MOUSE_MOVE,this,this.onMove);
    }
    /*鼠标抬起事件回调*/
    private onMouseUp(e:Laya.Event):void{
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if(e.touchId != this.curTouchId)return;
        this.isDown = false;
        this.visible = false;
        //移除摇杆移动事件监听
        this.touchRect.off(Laya.Event.MOUSE_MOVE,this,this.onMove);
        //修改摇杆角度与弧度为-1（代表无角度）
        this.radians = this.angle = -1;
    }
    /*鼠标移动事件回调*/
    private onMove(e:Laya.Event):void{
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if(e.touchId != this.curTouchId)return;
        //将移动时的鼠标屏幕坐标转化为摇杆局部坐标
        var locationPos:Laya.Point = this.globalToLocal(new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY),false);
        //更新摇杆控制点位置
        this.knob.pos(locationPos.x,locationPos.y);
        //更新控制点与摇杆中心点位置距离
        this.deltaX = locationPos.x - this.originPiont.x;
        this.deltaY = locationPos.y - this.originPiont.y;
        //计算控制点在摇杆中的角度
        var dx:number = this.deltaX * this.deltaX;
        var dy:number = this.deltaY * this.deltaY;
        this.angle = Math.atan2(this.deltaX,this.deltaY) * 180 / Math.PI; 
        if(this.angle < 0) this.angle += 360;
        //对角度取整
        this.angle = Math.round(this.angle);
        //计算控制点在摇杆中的弧度
        this.radians = Math.PI / 180 * this.angle;
        //强制控制点与中心距离不超过80像素
        if(dx+dy >= 80*80){
            //控制点在半径为80像素的位置（根据弧度变化）
            var x:number = Math.floor(Math.sin(this.radians) * 80 +this.originPiont.x);
            var y:number = Math.floor(Math.cos(this.radians) * 80 + this.originPiont.y);
            this.knob.pos(x,y);
        }
        else{
            //不超过80像素取原坐标
            this.knob.pos(locationPos.x,locationPos.y);
        }
    }
}
```



```typescript

class attackView extends ui.attackUI {
    /*是否按下攻击按钮*/
    public isAttack:Boolean = false;
    /*按下时的多点触摸ID*/
    private touchId:number;
    constructor() {
        super();
        //按钮按下与抬起事件监听
        this.btn_attack.on(Laya.Event.MOUSE_DOWN,this,this.onAttack);
        this.stage.on(Laya.Event.MOUSE_UP,this,this.onUp);
    }
    /*抬起攻击按钮事件回调*/
    private onUp(e:Laya.Event):void{
        //如果抬起时的ID与按下时的相同 则为不攻击
        if(e.touchId == this.touchId) this.isAttack = false;
    }
    /*按下攻击按钮事件回调*/
    private onAttack(e:Laya.Event):void{
        //获取按下时的id
        this.touchId = e.touchId;
        //获取事件传参值
        this.isAttack = true;
    }
}
```


###Type d 'exemple

Il n 'y a pratiquement pas de logique de contrôle dans la catégorie principale de l' exemple, c 'est aussi la création de scènes, de caméras, de rôles.Dans l 'exemple, il n' y aura pas d 'éclairage, il suffit d' éclairer l 'image avec la lumière, il est conseillé aux développeurs de ne pas ajouter de lumière si la scène n' a pas de lumière dynamique, les performances seront beaucoup plus élevées et l 'ombre de rôle peut utiliser un Modèle d' affichage transparent.

Il est nécessaire d 'obtenir un modèle de zone de marche du modèle de scène`moveArea.meshRender.enable=false`Et ajoutez - lui un collimateur de grille, meshcollider, un détecteur de grille plus précis, qui correspond au modèle lui - même et ne détectera pas la zone vide.Bien sûr, les dépenses de performance seront plus importantes.

La barre de bascule, le bouton d 'attaque et la quantité de déplacement de la caméra sont disposés de manière statique afin de faciliter l' utilisation et la commande du script de commande de rôle.

Tous les codes du Groupe principal sont les suivants:


```typescript

class Example_roleControl {
    /*3D场景*/
    private scene:Laya.Scene;
    /*3D角色*/
    private role:Laya.Sprite3D;
    /*3D摄像机*/
    public camera:Laya.Camera;
    /*摇杆控制器*/
    public static rocker:RockerView;
    /*攻击按钮控制器*/
    public static attack:attackView;
    /*摄像机移动向量*/
    public static cameraTranslate:Laya.Vector3;
    constructor() {
        //初始化引擎
        Laya3D.init(1334,750,true);
        //画布垂直居中对齐
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //画布水平居中对齐
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        //等比缩放
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        //自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        Example_roleControl.cameraTranslate = new Laya.Vector3;
        //预加载2D资源
        Laya.loader.load("res/atlas/myAssets.atlas",Laya.Handler.create(this,this.on2DComplete));
    }
    /*加载2D资源完成回调*/
    private on2DComplete():void{
        //实例化摇杆控制器
        Example_roleControl.rocker = new RockerView(Laya.stage);
        Laya.stage.addChild(Example_roleControl.rocker);
        //实例化攻击按钮
        Example_roleControl.attack = new attackView();
        Laya.stage.addChild(Example_roleControl.attack);
        //实例化加载进度页面
        var progress:ProgressView = new ProgressView();
        Laya.stage.addChild(progress);
        //加载3D资源
        Laya.loader.create(["LayaScene_scene03/scene03.ls","LayaScene_girl/girl.lh"],Laya.Handler.create(this,this.on3DComplete));
    }
    /*加载3D资源完成回调*/
    private on3DComplete():void{
        //创建3D场景
        this.createScene();
        //创建3D摄像机
        this.createCamera();
        //创建3D角色
        this.createRole();
        //游戏帧循环
        Laya.timer.frameLoop(1,this,this.onFrameLoop);
        
    }
    /*创建3D场景*/
    private createScene():void{
        //实例化场景
        this.scene = Laya.loader.getRes("LayaScene_scene03/scene03.ls");
        Laya.stage.addChild(this.scene);
        //将场景层级调至最低（UI界面后面）
        Laya.stage.setChildIndex(this.scene,0);
        //获取场景模型中的角色移动碰撞区模型
        var moveArea:Laya.MeshSprite3D = this.scene.getChildAt(0).getChildByName("MoveArea") as Laya.MeshSprite3D;
        //设置为不渲染
        moveArea.meshRender.enable = false;
        //加载网格碰撞器组件
        moveArea.addComponent(Laya.MeshCollider);
    }
    /*创建3D摄像机*/
    private createCamera():void{
        //实例化摄像机
        this.camera = new Laya.Camera();
        //移动摄像机位置
        this.camera.transform.translate(new Laya.Vector3(0,4.5,12));
        //设置摄像机视野范围（角度）
        this.camera.fieldOfView = 25;
        this.scene.addChild(this.camera);
    }
    /*创建3D角色*/
    private createRole():void{
        //实例化角色
        this.role = Laya.loader.getRes("LayaScene_girl/girl.lh");
        this.scene.addChild(this.role);
        //角色位置
        this.role.transform.position = new Laya.Vector3(0,0,1);
        //加入角色控制器脚本
        this.role.addComponent(RoleControlScript);
        //摄像机对准角色模型附近位置
        this.camera.transform.lookAt(new Laya.Vector3(0,0.5,1),new Laya.Vector3(0,0,0));
        //克隆一个角色（克隆包括子对象、组件、脚本等。tips：用此方法克隆Sprite3D继承类会有问题）
        var role1:Laya.Sprite3D = Laya.Sprite3D.instantiate(this.role);
        this.scene.addChild(role1);
        //角色位置
        this.role.transform.position = new Laya.Vector3(-1,0,1);
    }
    /*游戏帧循环*/
    private onFrameLoop():void{
        //摄像机位置改变（数据为角色控制脚本修改）
        this.camera.transform.translate(Example_roleControl.cameraTranslate,false);
    }
}
new Example_roleControl;
```




###Ensemble script de commande de rôle

La fonction du composant est relativement puissante et le script est hérité du composant.Des propriétés et des procédés importants peuvent être consultés dans le document technique layaair3d.

Le modèle de développement de l 'ensemble de scripts nous offre un autre mode de pensée qui, à la différence de l' héritage, est plus souple et plus variable, peut être ajouté à tout moment pour obtenir l 'effet souhaité et pour obtenir une séparation complète entre le contrôle et l' affichage.Les développeurs peuvent essayer plus souvent cette méthode.

Dans ce mode de réalisation, nous utilisons un procédé de commande de rôle, dans lequel nous exécutons principalement les fonctions suivantes.

Pour commander l 'animation, on obtient l' ensemble d 'animation de rôle auquel appartient le script et l' on obtient l 'ensemble d' animation dans le procédé de recouvrement de l 'ensemble d' écriture.

Animation de personnages, marche, stand - by, méthode d 'attaque, l' animation de personnages est achevée sur écoute d 'événements.

Détection de collision de rôle, dans le procédé de mise à jour de script \ \ Update (), détection de collision entre le rayon de position de rôle et la zone de marche pour déterminer si le rôle est bloqué.

Mise à jour de rôle, dans le procédé de mise à jour de script \ \ Update (), l 'angle de la tige de bascule, le bouton d' attaque et la commande du transfert d 'animation de rôle selon ses propriétés sont obtenus.

La caméra met à jour le déplacement de synchronisation en suivant le déplacement du rôle.

Tous les codes du script sont les suivants:


```typescript

class RoleControlScript extends Laya.Script{
    /*角色模型*/
    public roleModel:Laya.Sprite3D;
    /*角色动画组件*/
    public roleAni:Laya.Animator;
    /*角色当前动作*/
    public currentAction:string = "stand";
    /*角色动画是否完成*/
    public aniComplete:Boolean = true;
    /*角色移动速度*/
    public speed:number = 0.04;
    /*3D摄像机*/
    public camera:Laya.Camera;
    /*摇杆控制器*/
    private rocker:RockerView;
    /*攻击按钮控制器*/
    private attack:attackView;
    /*摇杆上一帧角度*/
    private lastAngle:number = 0;
    /*检测移动区碰撞器的射线*/
    private ray:Laya.Ray;
    /*碰撞检测信息*/
    private outHitInfo:Laya.RaycastHit;
    constructor() {
        super();
        this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,-2,0));
        this.outHitInfo = new Laya.RaycastHit();
    }
    /*覆写3D组件方法，指3D对象加载组件时执行
    *owner：此组件所属的3D对象
    */
    public _load(owner:Laya.Sprite3D):void{
        //获取控制器UI
        this.rocker = Example_roleControl.rocker;
        this.attack = Example_roleControl.attack;
    }
    /*覆写加载组件的3D对象实例化完成后，第一次更新时执行*/
    public _start(state:Laya.RenderState):void{
        //获取被绑定脚本的模型，需等待角色实例化完成
        //获取有动画组件的内层模型（.lh资源导出时会在角色外包裹一层sprite3D）
        this.roleModel = this.owner.getChildByName("girl1") as Laya.Sprite3D;
        //模型缩放
        this.roleModel.transform.localScale = new Laya.Vector3(0.8,0.8,0.8);
        //获取角色动画组件
        this.roleAni = this.roleModel.getComponentByType(Laya.Animator) as Laya.Animator;
        //动画完成事件监听
        this.roleAni.on(Laya.Event.COMPLETE,this,this.onComplete);
    }
    /*覆写3D组件更新方法（相当于帧循环）*/
    public _update(state:Laya.RenderState):void{
        //如果是攻击状态播放击球动画（优先播放击球动画）
        if(this.attack.isAttack){
            if(this.currentAction != "play"){
                this.play();
                //摄像机移动向量
                Example_roleControl.cameraTranslate = new Laya.Vector3(0,0,0);
            }
        }
        //上次击球动画如果未结束，不执行以下代码
        if(!this.aniComplete)return;
        //如果摇杆有方向角度
        if(this.rocker.angle != -1){
            //摇杆控制角色旋转方向（笨帧摇杆的角度-上一帧的角度=本帧应当旋转的角度）
            this.roleModel.transform.rotate(new Laya.Vector3(0,this.rocker.angle - this.lastAngle,0),false,false);

            //通过弧度和速度计算角色在x，z轴上移动的量
            var speedX:number = Math.sin(this.rocker.radians) * this.speed;
            var speedZ:number = Math.cos(this.rocker.radians) * this.speed;
            //记录角色本帧的角度
            this.lastAngle = this.rocker.angle;
            //行走区域碰撞检测，如未与行走区域模型碰撞，则不移动
            //射线原点
            var rayOrigin:Laya.Vector3 = new Laya.Vector3(0,0,0);
            //根据角色位置计算射线原点
            Laya.Vector3.add(this.owner.transform.position,new Laya.Vector3(speedX,2,speedZ),rayOrigin);
            //射线原点位置更新
            this.ray.origin = rayOrigin;

            //物理射线与碰撞器相交检测
            Laya.Physics.rayCast(this.ray,this.outHitInfo,5);
            //如果未有碰撞则返回
            if(this.outHitInfo.distance < 0)speedX = speedZ = 0;
            //更新角色位置
            this.owner.transform.translate(new Laya.Vector3(speedX,0,speedZ),false);
            //播放行走动画
            if(this.currentAction != "go")this.go();
        }
        else{
            //如果摇杆未有角度则播放待机动画
            if(this.currentAction != "stand")this.stand();
        }
        //摄像机移动向量
        //注：因为克隆需求，所以提供移动向量给主类，由主类控制摄像机更新。
        //如果只有单一主角，可以直接在脚本中控制摄像机移动。
        Example_roleControl.cameraTranslate = new Laya.Vector3(speedX,0,speedZ);
    }
    /*动画播放完成回调*/
    private onComplete():void{
        //角色动画完成
        this.aniComplete = true;
        //如果结束的动画剪辑名为play，则播放站立待机动画
        if(this.roleAni.currentPlayClip.name == "play") this.stand();
    }
    /*角色行走动画*/
    public go():void{
        this.roleAni.play("go",1.4);
        this.currentAction = "go";
    }
    /*角色待机动画*/
    public stand():void{
        this.roleAni.play("stand");
        this.currentAction = "stand";
    }
    /*角色击球动画*/
    public play():void{
        this.roleAni.play("play");
        this.currentAction = "play";
        this.aniComplete = false;
    }
}
```


Si le personnage se déplace, se tient debout et attaque l 'animation play, il peut être contrôlé comme un acteur principal lorsque le script est ajouté à l' objet.Voilà la souplesse du script.

Compiler le code d 'exécution pour obtenir un effet de démonstration à la figure 1.