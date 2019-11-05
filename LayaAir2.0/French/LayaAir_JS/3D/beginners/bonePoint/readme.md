##Layaair3d.

###Point d 'ancrage

La technologie des points d 'ancrage osseux est très courante dans les jeux en 3D, par exemple lorsque les armes changent avec les mains du personnage, alors on peut lier les armes à celles des os de la main, les armes étant des sous - couches du squelette de la main, et naturellement on peut les modifier avec les mouvements de la main.

Bien entendu, le modèle 3D lié peut également être enlevé ou remplacé par un code, ce qui permet d 'obtenir une fonction de conversion d' une arme ou d 'un équipement.

###Installer un point d 'accrochage d' os dans l 'Unity

Les points d 'accrochage osseux sont très faciles à installer dans l' Unity et peuvent être utilisés directement au niveau des ressources de la scène.Figure 1

Les objets à lier peuvent être soit un récipient en 3D, soit un modèle en 3D ajustant leur position, puis les glisser sous le squelette spécifié en tant que sous - étage et les attacher en tant que point d 'ancrage.

Parfois, nous avons besoin d'être désarmés dès le début, mais nous avons besoin d'être accrochés pour nous préparer à un changement ultérieur d'arme, alors nous pourrions également mettre un conteneur à noeuds vides, gameobject, et, le cas échéant, y ajouter différents modèles 3D ou plus.
![1](img\1.png)< / BR >

(Figure 1)

**Une fois que nos points d 'accrochage d' os sont installés, les os et les objets d 'accrochage sont automatiquement exportés vers les fichiers LS LS.Cependant, il convient de noter en particulier que si l 'objet du conteneur vide n' est attaché qu 'au point d' ancrage osseux pour ajouter ensuite l 'objet secondaire de manière dynamique, ignore NULL Game objects de gameobject Setting ne peut pas être sélectionné dans le connecteur d' exportation sans que l 'objet du point d' ancrage du conteneur vide ne soit exporté.**

###Réalisation d 'un point d' accrochage osseux dans un code

En général, on ajoute des squelettes à l 'Unity.Cependant, le moteur layaair fournit également un mode de fixation du Code qui permet d 'ajouter et d' enlever des points d 'accrochage osseux avec souplesse.

La classe de composants d 'animation animator fournit deux exemples de procédés**Linksprite3dtoavatarnode ()**Et**Unlinksprite3dtoavatarnode ()**L 'ajout et la suppression de points accrochés peuvent être réalisés (figures 2 et 3).

Avant d 'ajouter l' animation osseuse, il faut que les beaux - arts donnent le nom des noeuds osseux associés.

![2](img\2.png)</br>


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

![5](img\5.png)</br>

(Figure 5)

Selon la figure 4, les effets de l 'attaque magique peuvent être obtenus par deux types: main.js, principale catégorie, pour la diffusion d' animations et la production d 'armes magiques.La simulation produit la magie et la jette.

Weaponscript.js réalise des vols magiques et des destructions.Tous les codes sont les suivants:


```javascript

import WeaponScript from "./WeaponScript";

var Main = (function () {
  var box;
  var weaponIsClone = false;
  var scene;
  var heroAni;
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    this.scene = Laya.stage.addChild(new Laya.Scene3D());

    //添加照相机
    var camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100)));
    camera.transform.translate(new Laya.Vector3(0, 3, 3));
    camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
    camera.clearColor = null;

    //添加方向光
    var directionLight = this.scene.addChild(new Laya.DirectionLight());
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    //添加自定义模型
    this.box = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3, 0.3, 0.3));

    Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp){
      var hero = this.scene.addChild(sp);
      hero.getChildAt(0).addChild(this.box);
      this.heroAni = hero.getChildAt(0).getComponent(Laya.Animator);
      this.heroAni.linkSprite3DToAvatarNode("Dummy002",this.box);

      Laya.timer.frameLoop(1,this,this.onFrame);
    }));

  }
  var _proto = Main.prototype;
  _proto.onFrame = function(){
    //获取动画当前播放的百分比
    var s = this.heroAni.getCurrentAnimatorPlayState(0)._normalizedTime - Math.floor(this.heroAni.getCurrentAnimatorPlayState(0)._normalizedTime)
    //当动画播放到百分之五十到六十之间时进行克隆
    if (0.6>s&&s>0.5)
    {
      if(this.weaponIsClone) return;
      console.log("sssssssssssss");
      //克隆模型（位置，矩阵，等信息全被克隆）
      var weaponClone = Laya.Sprite3D.instantiate(this.box);
      //为模型添加在定义脚本
      weaponClone.addComponent(WeaponScript);
      //把克隆的武器放入场景中
      this.scene.addChild(weaponClone);
      //设置为已克隆
      this.weaponIsClone = true;
    }
    else if (s>0.98)
    {
      this.weaponIsClone = false;
    }
  }
  return Main;
} ());

new Main();  
```





```javascript

export default class WeaponScript extends Laya.Script3D{
    constructor(){
        super();
    }
    onAwake(){
        console.log("Script awake");
        this.lifeTime =100;
    }
    onUpdate(){
        this.owner.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
        this.owner.transform.translate(new Laya.Vector3(0,0,0.2),false);
        this.lifeTime --;
        if(this.lifeTime<0){
            this.lifeTime =100;
            //直接销毁脚本保定对象会报错（对象销毁后脚本还会在更新一次，找不到绑定对象会错误）
            //因此延迟一帧销毁
            Laya.timer.frameOnce(1,this,function(){
                this.owner.destroy();
            })
        }
    }
}
```
