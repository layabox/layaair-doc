#Exemples d 'application multiscène 3D

###Application de scénarios multiples

La scène 3D peut être utilisée non seulement en combinaison avec la scène 2D, mais aussi en plusieurs scènes 3D sur la scène, et peut également être incorporée dans la scène 2D pour contrôler la taille et l 'emplacement de l' image de scène affichée par l 'intermédiaire de la vue caméra de la scène.

On l 'utilise aussi souvent dans les jeux, par exemple dans les interfaces d' attributs de l 'équipement de rôle, dans lesquelles sont affichés des modèles et des animations de personnages 3D, et lorsque les icônes d' équipement sont remplacées dans la barre d 'équipement, le modèle de rôle peut également changer de mode.

Dans l 'exemple suivant, nous avons procédé à une simulation simple de l' interface d 'attribut de l' équipement (fig. 1), fonctionnant pour ouvrir l 'interface de l' équipement en double cliquant sur l 'écran, afficher l' animation de personnages 3D en attente et l 'affichage de l' équipement sur le corps, cliquer sur le titre de l 'interface pour faire glisser l' interface et déplacer la scène 3D interne, le personnage suivi.

![1](img/1.gif)(Figure 1) < / BR >



###Development Thought and Code

Arrière - plan de la scène principale en 3D, chargez la carte de la scène de jeu;

Créer un simple type de dialog ui (dialog peut paramétrer les glissières) dans l 'IDE et le publier (fig. 2).Crée la classe rolepview héritée de l 'ui et configure celle - ci en un seul mode (la plupart des ui sont des exemples uniques).Crée une autre scène 3D dans l 'interface pour afficher un rôle et définit une fenêtre de caméra dont la taille est égale ou inférieure à celle de l' interface 2D.

![2](img/2.png)(图2)</br>


Après ajout d 'interface, le script de caméra est désactivé lorsque la souris est enfoncée ou déplacée sur l' interface et que l 'interface est retirée ou que la souris n' est pas enfoncée sur l 'interface.Les paramètres peuvent être définis par les propriétés enable de l 'ensemble script.

Ajoutez une interface pour faire glisser l 'événement, et faites glisser l' interface, l 'écran de caméra viewport se déplace en même temps que la scène d' interface (sinon le rôle de scène 3D sera dans sa position initiale).

Le Code principal layaair3d \ \ u multiscene est le suivant:


```typescript

//初始化引擎
Laya3D.init(1280,720,true);
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//开启统计信息
Laya.Stat.show();
//加载3D资源
Laya.loader.create(["LayaScene_loveScene/loveScene.ls","LayaScene_girl/girl.lh"],Laya.Handler.create(this,on3DComplete));

function on3DComplete(){
    //创建场景
    var scene = Laya.Scene.load("LayaScene_loveScene/loveScene.ls");
    Laya.stage.addChild(scene);
    //创建摄像机添加到场景
    this.camera = new Laya.Camera();
    scene.addChild(this.camera);
    //修改摄像机位置与方向
    this.camera.transform.translate(new Laya.Vector3(0,2,8),true);
    this.camera.transform.rotate(new Laya.Vector3(-23,0,0),true,false);
    //添加摄像机脚本并获取
    this.cameraScript = this.camera.addComponent(CameraMoveScript);

    //加载2D界面资源
    Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,on2DComplete));
}
function on2DComplete(){
    //双击舞台创建角色属性UI
    Laya.stage.on(Laya.Event.DOUBLE_CLICK,this,createRoleUI);
}
function createRoleUI(){
    //创建角色属性UI（单例模型，预防打开多个）
    this.roleProp = RolePropView.getInstance();
    Laya.stage.addChild(this.roleProp);
    //界面拖动事件监听
    this.roleProp.on(Laya.Event.DRAG_MOVE,this,onDragMove);
    //鼠标在界面上按下时摄像机控制脚本失效
    this.roleProp.on(Laya.Event.MOUSE_DOWN,this,onScriptFalse);
    //界面移除或鼠标抬起后摄像机脚本启用
    this.roleProp.on(Laya.Event.RECOVERED,this,onScriptTrue);
    Laya.stage.on(Laya.Event.MOUSE_UP,this,onScriptTrue);
}
/*界面拖动回调*/
function onDragMove(){
    //摄像机控制脚本失效
    this.onScriptFalse();
    //界面中摄像机视口跟随移动
    this.roleProp.camera.viewport = new Laya.Viewport(this.roleProp.x,this.roleProp.y,this.roleProp.width,roleProp.height);
}
/*摄像机控制脚本启用*/
function onScriptTrue(){
    //摄像机控制脚本启用
    this.cameraScript.enable = true;
}
/*摄像机控制脚本失效*/
function onScriptFalse(){
    //摄像机控制脚本失效
    this.cameraScript.enable = false;
}
```


Role propview, création interne de scénarios 3D, rôles, caméras, Code de référence suivant


```typescript

var RolePropView = (function(_super){
    function RolePropView(){
        RolePropView.super(this);

        //设置UI位置为居中显示
        this.xx = (1280 - this.width)/2;
        this.yy = (720 - this.height)/2;

        //与UI搭配的3D场景
        this.UIScene = new Laya.Scene();
        this.addChild(this.UIScene);

        //在对话框中，鼠标可点击触发拖动的区域
        this.dragArea = "0,0,520,80";

        //创建角色
        this.role = Laya.loader.getRes("LayaScene_girl/girl.lh");
        this.UIScene.addChild(this.role);
        //修改角色位置（超出摄像机视口后将不会显示）
        this.role.transform.translate(new Laya.Vector3(0,0,0),false);

        //创建摄像机
        this.camera = new Laya.Camera();
        this.UIScene.addChild(this.camera);
        //设置摄像机视口大小与UI一致
        this.camera.viewport = new Laya.Viewport(this.xx,this.yy,this.width,this.height);
        //摄像机位置
        this.camera.transform.translate(new Laya.Vector3(0,1.2,3),false);
        //关闭按钮事件监听
        this.btn_close.on(Laya.Event.MOUSE_DOWN,this,onClose);
    }
    Laya.class(RolePropView,"RolePropView",_super);
     /*角色装备UI界面单例方法*/
    RolePropView.getInstance = function () {
        if (this.instance == null) {
            this.instance = new RolePropView();
        }
        return this.instance;
    };
    /*关闭按钮事件回调*/
    function onClose(){
        //移除UI界面
        Laya.stage.removeChild(this);
        //恢复UI位置为居中显示
        this.pos(this.xx,this.yy);
        //恢复摄像机视口大小与位置
        this.camera.viewport = new Laya.Viewport(this.xx,this.yy,this.width,this.height);
    }
    return RolePropView;
})(ui.RolePropUI);
```


Compiler et exécuter le Code, comme le montre la figure 1.