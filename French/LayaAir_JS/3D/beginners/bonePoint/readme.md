## LayaAir3D之骨骼挂点

###Point d 'ancrage

La technologie des points d 'ancrage osseux est très courante dans les jeux en 3D, par exemple lorsque les armes changent avec les mains du personnage, alors on peut lier les armes à celles des os de la main, les armes étant des sous - couches du squelette de la main, et naturellement on peut les modifier avec les mouvements de la main.

Bien entendu, le modèle 3D lié peut également être enlevé ou remplacé par un code, ce qui permet d 'obtenir une fonction de conversion d' une arme ou d 'un équipement.

###Installer un point d 'accrochage d' os dans l 'Unity

Les points d 'accrochage osseux sont très faciles à installer dans l' Unity et peuvent être utilisés directement au niveau des ressources de la scène.Figure 1

Les objets à lier peuvent être soit un récipient en 3D, soit un modèle en 3D ajustant leur position, puis les glisser sous le squelette spécifié en tant que sous - étage et les attacher en tant que point d 'ancrage.

Parfois, nous avons besoin d'être désarmés dès le début, mais nous avons besoin d'être accrochés pour nous préparer à un changement ultérieur d'arme, alors nous pourrions également mettre un conteneur à noeuds vides, gameobject, et, le cas échéant, y ajouter différents modèles 3D ou plus.
![1](img\1.png)</br>


(Figure 1)

**Une fois que nos points d 'accrochage d' os sont installés, les os et les objets d 'accrochage sont automatiquement exportés vers les fichiers LS LS.Cependant, il convient de noter en particulier que si l 'objet du conteneur vide n' est attaché qu 'au point d' ancrage osseux pour ajouter ensuite l 'objet secondaire de manière dynamique, ignore NULL Game objects de gameobject Setting ne peut pas être sélectionné dans le connecteur d' exportation sans que l 'objet du point d' ancrage du conteneur vide ne soit exporté.**

###Réalisation d 'un point d' accrochage osseux dans un code

En général, on ajoute des squelettes à l 'Unity.Cependant, le moteur layaair fournit également un mode de fixation du Code qui permet d 'ajouter et d' enlever des points d 'accrochage osseux avec souplesse.

La classe de composants d 'animation animator fournit deux exemples de procédés**Linksprite3dtoavatarnode ()**Et**Unlinksprite3dtoavatarnode ()**L 'ajout et la suppression de points accrochés peuvent être réalisés (figures 2 et 3).

Avant d 'ajouter l' animation osseuse, il faut que les beaux - arts donnent le nom des noeuds osseux associés.

![2](img/2.png)</br>


(Figure 2)

![3](img\3.png)< / BR >

(Figure 3)

Les codes utilisés sont les suivants:

Acquisition d 'un modèle d' animation d 'os à partir d' une scène - acquisition d 'un module d' animation à partir d 'un modèle - création d' un objet d 'accrochage - fixation d' un os et d 'un objet d' accrochage à partir d 'un ensemble d' animation.


```javascript

//从场景中获取动画模型
var monkey = this.scene.getChildByName("monkey");
//获取动画模型中动画组件
var monkeyAni = monkey.getComponentByType(Laya.Animator);
//需要挂点的3D对象
var box = new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1));
//将3D对象加载到scene中（一定要加入到场景）
this.scene.addChild(box);
//将挂点物品添加到某个骨骼上（美术提供骨骼的名称）
monkeyAni.linkSprite3DToAvatarNode("RHand",box);
//将挂点物品从骨骼上移除（美术提供骨骼的名称）
//monkeyAni.unLinkSprite3DToAvatarNode("RHand",box);
```


###Exemple d 'application de point d' accrochage d 'os

On trouvera ci - après une brève illustration de l 'attaque magique.

![4](img\4.gif)</br>

(Figure 4)

Tout d 'abord, comme indiqué à la figure 1, un cercle de lumière magique a été créé dans l' Unity en tant que sous - noeud du squelette de la main droite.Après l 'Export, on peut découvrir que le squelette et le cercle lumineux apparaissent dans le fichier sous - stratifié du modèle (fig.

![5](img\5.png)< / BR >
(Figure 5)

Selon la figure 4, les effets de l 'attaque magique peuvent être réalisés par deux catégories principales, laya3d ou bonepoint.js, pour la diffusion d' animations et la production d 'armes magiques.Encore une fois, la simulation produit des effets magiques et les jette.

Weaponscript.js réalise des vols magiques et des destructions.Tous les codes sont les suivants:


```javascript

//初始化引擎
Laya3D.init(1280, 720, true);
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//开启统计信息
Laya.Stat.show();
this.weaponIsClone = false;
//加载3D资源
Laya.loader.create("LayaScene_monkey/monkey.ls", Laya.Handler.create(this, onComplete));

//资源加载完成回调
function onComplete() {
    //创建场景
    this.scene = Laya.loader.getRes("LayaScene_monkey/monkey.ls");
    Laya.stage.addChild(this.scene);
    //从场景中获取动画模型
    var monkey = this.scene.getChildByName("monkey");
    //获取动画模型中动画组件
    this.monkeyAni = monkey.getComponentByType(Laya.Animator);
    //获取挂点骨骼(Unity中设置的挂点骨胳会被导出，可获取)
    var handBip = monkey.getChildByName("RHand");
    //获取挂点的武器模型
    this.weapon = handBip.getChildByName("weapon");
    //监听动画完成事件
    this.monkeyAni.on(Laya.Event.COMPLETE, this, onAniComplete);
    //帧循环，用于监控动画播放的当前帧
    Laya.timer.frameLoop(1, this, onFrame);
}
function onAniComplete() {
    //动画播放完成后武器激活显示
    this.weapon.active = true;
    //动画播放完成后，设置为未克隆，方便下次克隆新武器
    this.weaponIsClone = false;
}
//在攻击动画播放到一定帧时，克隆一个新武器特效
function onFrame() {
    //在动画35-37帧之间时克隆一个飞出的武器
    //（不能用==35帧方式，帧率不满时可能跳帧，导致克隆失败。后期版本将支持帧标签事件，可解决此问题）
    if (this.monkeyAni.currentFrameIndex >= 35 && this.monkeyAni.currentFrameIndex <= 37) {
        //确保在35-37帧之间只克隆一次
        if (this.weaponIsClone) return;
        //克隆新武器（模型、位置、矩阵等全被克隆）
        var weaponClone = Laya.Sprite3D.instantiate(this.weapon);
        //为武器特效添加脚本
        weaponClone.addComponent(WeaponScript);
        //将克隆武器放入场景中
        this.scene.addChild(weaponClone);
        //设置为已克隆
        this.weaponIsClone = true;
        //隐藏原始武器
        this.weapon.active = false;
    }
}      
```





```javascript

var WeaponScript = (function(_super){
    function WeaponScript(){
        WeaponScript.super(this);
        /**武器生命周期**/
        this.lifeTime = 100;
    }
    Laya.class(WeaponScript,"WeaponScript",_super);
    WeaponScript.prototype._load = function(owner){
        this.weapon = owner;
    }
    WeaponScript.prototype._update = function(state){
        //武器旋转更新
        this.weapon.transform.rotate(new Laya.Vector3(2,2,0),true,false);
        //武器移动更新
        this.weapon.transform.translate(new Laya.Vector3(0,0,0.2),false);
        //生命周期递减
        this.lifeTime--;
        if(this.lifeTime<0)
        {
            this.lifeTime=100;
            //直接销毁脚本绑定对象会报错（对象销毁后脚本还会更新一次，报找不到绑定对象错误），
            //因此延迟一帧以销毁
            Laya.timer.frameOnce(1,this,function(){this.weapon.destroy();});
        }
    }
    return WeaponScript;
})(Laya.Script);
```
