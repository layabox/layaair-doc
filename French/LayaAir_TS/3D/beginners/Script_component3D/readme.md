#Ensemble de script layaair3d

###Ensemble parent Component 3D

Dans le moteur layaair 3D, afin de faciliter l 'affichage du contrôle d' objet et la maintenance du Code, une classe de composants puissante Component 3D est fournie.Nos composants de commande d 'animation, les collisions, les scripts, les points d' accrochage osseux et ainsi de suite sont basés sur l 'extension de la fonction du composant, appartenant à sa sous - catégorie.En outre, le moteur layaair 3D supporte l 'ajout d' une pluralité de composants sur un objet 3D, ce qui permet une commande plus souple du composant.

Dans l 'ancien profil technique, nous avons présenté les fonctions de base de l' ensemble commande d 'animation et de l' ensemble collisionneur.Aux fins du présent chapitre,**Nous avons donné l'exemple de l'ensemble script.**Dans la mesure où il hérite de la catégorie des composants, mais il n 'y a guère de fonction d' extension propre, principalement à l 'aide des attributs de Component 3D de la catégorie paternelle et de la méthode, la fonction script sera mise à jour ultérieurement, s' il vous plaît!



###Principales propriétés et procédés d 'assemblage

**Owner**: objet sprite3d associé à l 'ensemble lié.

**Enable:**Si le composant est activé ou non, lorsqu 'il est chargé, il est activé par défaut.

***Load (owner: sprite3d):**Procédé d 'exécution lors de l' embarquement d 'un composant, sans Code par défaut.Elle peut être recouverte dans la catégorie de succession, dans laquelle le Code logique doit être initialisé.

***Start (State: renderstate):**Une fois que l 'objet 3D de l' ensemble de chargement a été mis à jour, il n 'y a pas de code par défaut.Il peut être recouvert dans la catégorie d 'héritage, dans laquelle le Code logique est inséré une fois que l' objet 3D a été chargé.

Par exemple, un script est ajouté lors du chargement asynchrone d 'un objet d' affichage 3D, son Sous - modèle et son matériau n 'ont pas été remplis si le script est rempli (par exemple, un procédé de construction, un procédé de construction, etc.).`_load()`Dans le procédé, un code logique permet d 'obtenir un sous - objet ou une image d' un objet d 'affichage 3D, ce qui crée un bug d' objet vide.Ces codes logiques peuvent alors être insérés dans le procédé \ \ ustart () pour éviter que des objets vides ne se produisent.

Par exemple, le clonage d 'un objet 3D avec un script, s' il y a plus de sous - objets dans l' objet 3D, le clonage de script est effectué en premier, et si la logique du script n 'est pas insérée dans le procédé \ \ Start () Il se produit également un bug d' objet vide lors de l 'acquisition du sous - objet.

***Update (State: renderstate):**Procédé de mise à jour de composants correspondant à un cycle de trames.Elle peut être recouverte dans la catégorie d 'héritage et un code logique nécessitant une mise à jour de chaque trame peut être inséré dans le procédé.



###événement associé à un composant

* * Component \ \ added:**Le composant est chargé d 'un événement d' exécution, envoyé par le propriétaire du composant sprite3d et transmis comme paramètre.****
****
**Component \ \ removed:**L 'événement postérieur au retrait du composant est transmis par le propriétaire du composant, sprite3d, et le composant est envoyé comme paramètre.****
****
**Enable \ \ Changed: * * * l 'événement d' activation du composant est transmis par le composant avec les modifications d 'attributs d' activation et les attributs d 'activation sont transmis comme paramètres.



###Ensemble script

Le script est hérité de l 'ensemble, ce qui permet d' ajouter le script à l 'objet d' affichage 3D en utilisant le procédé addcomponent () de l 'objet d' affichage.

Dans l 'exemple des moteurs 3D du réseau officiel, de nombreux exemples de caméras ont été utilisés dans le script mobile camera movescript, auquel la caméra a ajouté un script qui permet de commander sa rotation et son déplacement vers et vers le bas par le clavier à l' aide de la souris.Ajouter le code suivant pour le procédé d 'assemblage de scripts:


```typescript

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


Bien entendu, le script peut également être supprimé de l 'objet si certaines nécessités logiques l' exigent, et le script peut être supprimé par la méthode removecomponentbytype () de l 'objet affiché en 3D.


```typescript

//根据类型移除脚本组件
camera.removeComponentByType(CameraMoveScript);
//移除所有组件(包括动画、脚本、碰撞器等，注意，此方法不能移除子对象节点上的组件)
camera.removeAllComponent();
```




###Créer son propre module de script

Les développeurs peuvent consulter le script de caméra et créer leurs propres composants de script pour commander les objets dans la scène.

Dans le développement du jeu layaair 3D, on crée des scènes, des personnages, des animations dans l 'unité, on exporte les scènes et on les charge dans le Code, ce qui permet d' ajouter des éléments de script de commande à différents objets de la scène.

Par exemple, un script de commande d 'acteur principal, un script de commande de NPC, un script de commande d' objet de scène, etc. un niveau de jeu est ainsi créé, et lorsque le jeu charge la scène de niveau suivant, le script peut être multiplexé, l 'entretien du projet est facilité et rapide et la commande et l' affichage sont séparés.

Dans l 'exemple suivant, nous modifions le code "voyage à démarrage rapide en 3D" dans le document technique pour créer un script de commande à ajouter sur Box et supprimer l' ensemble script dans quatre secondes.

Un script personnalisé boxcontrolscript est d 'abord créé pour modifier le matériau et la rotation de l' objet Box auquel appartient le script.


```typescript

class BoxControlScript extends Laya.Script {
    /*脚本所属的3D对象*/
    private box:Laya.MeshSprite3D;
    constructor() {
        super();
    }
    /*3D对象加载组件时的执行方法
    owner加载此组件的3D对象
    */
    public _load(owner:Laya.Sprite3D):void{
        //获取脚本所属对象
        this.box = owner as Laya.MeshSprite3D;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    public _start(state:Laya.RenderState):void{
        //获取模型上的材质
        var material:Laya.StandardMaterial = this.box.meshRender.material as Laya.StandardMaterial;
        //修改材质的反射率颜色，让模型偏红
        material.albedo = new Laya.Vector4(1,0,0,1);
    }
    /*覆写组件更新方法（相当于帧循环）
    *state渲染状态
    */
    public _update(state:Laya.RenderState):void{
        //所属脚本对象旋转更新
        this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
}
```


Le type de script ci - dessus est ensuite ajouté à Box dans le code "démarrer rapidement le voyage en 3D" et le script est supprimé quatre secondes plus tard.


```typescript

class LayaAir3D_Script  {
    private box:Laya.MeshSprite3D;
    private boxScript:Laya.Script;
    constructor() {
        //初始化引擎
        Laya3D.init(0,0,true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene:Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
        //添加摄像机
        var camera:Laya.Camera = (scene.addChild(new Laya.Camera(0,0.1,100))) as Laya.Camera;
        //移动摄像机位置
        camera.transform.translate(new Laya.Vector3(0,2,3));
        //旋转摄像机方向（角度）
        camera.transform.rotate(new Laya.Vector3(-30,0,0),true,false);
        //设置背景颜色
        camera.clearColor = null;

        //添加平行光
        var directionLight:Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //灯光的环境色
        directionLight.ambientColor = new Laya.Vector3(0.6,0.6,0.6);
        //灯光的高光色
        directionLight.specularColor = new Laya.Vector3(0.6,0.6,0.6);
        //灯光的漫反射颜色
        directionLight.diffuseColor = new Laya.Vector3(1.6,1.6,1.6);
        //灯光的方向（弧度）
        directionLight.direction = new Laya.Vector3(0.3,-1,0);

        //添加自定义模型
        this.box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1))) as Laya.MeshSprite3D;
        //模型旋转方向
        // box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
        //创建模型的材质
        var material:Laya.StandardMaterial = new Laya.StandardMaterial();
        //材质的漫反射贴图
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        //为模型赋上材质
        this.box.meshRender.material = material;

        //添加自定义脚本并实例化脚本对象
        this.box.addComponent(BoxControlScript);
        //可在添加组件时获取组件对象
        // this.boxScript = box.addComponent(BoxControlScript);
        //添加定时4秒执行一次回调函数
        Laya.timer.once(4000,this,this.onLoop);
    }
    //4秒后回调函数，移除脚本组件
    private onLoop():void{
        //移除BoxControlScript类型脚本组件
        this.box.removeComponentsByType(BoxControlScript);
        //移除所有组件
        // this.box.removeAllComponent();
        //如果不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
        // this.boxScript.enable = false;
    }
}
new LayaAir3D_Script;
```


Dans le Code précédent, si les développeurs ne veulent pas enlever le composant dans quatre secondes, mais cessent simplement d 'utiliser le script, la propriété d' activation du script peut être définie comme False.

La compilation et l 'exécution de ce code permettent d' obtenir l 'effet ci - après (fig. 1) après élimination du composant, le modèle cesse de tourner.

![1](img/1.gif)(图1)</br>



