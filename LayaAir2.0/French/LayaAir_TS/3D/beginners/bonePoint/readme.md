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

![2](img\2.png)< / BR >

(Figure 2)

![3](img\3.png)< / BR >

(Figure 3)

Les codes utilisés sont les suivants:

Acquisition d 'un modèle d' animation d 'os à partir d' une scène - acquisition d 'un module d' animation à partir d 'un modèle - création d' un objet d 'accrochage - fixation d' un os et d 'un objet d' accrochage à partir d 'un ensemble d' animation.


```javascript

//从场景中获取动画模型
var monkey = this.scene.getChildByName("monkey");
//获取动画模型中动画组件
 var ani:Laya.Animator = monkey.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
//需要挂点的3D对象
var box:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3,0.3,0.3));
//将3D对象加载到角色中（一定要加入到角色的Animator模型上）
 hero.getChildAt(0).addChild(box);
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

Selon la figure 4, les effets de l 'attaque magique peuvent être réalisés par deux catégories principales, main.ts, pour la diffusion d' animations et la production d 'armes magiques.La simulation produit la magie et la jette.

Weaponscript.ts réalise des vols magiques et des destructions.Tous les codes sont les suivants:


```typescript

/**武器克隆**/import WeaponScript from "./WeaponScript";
// 程序入口
class Main {
  private scene:Laya.Scene3D;
  private ani:Laya.Animator;
  public weaponIsClone:Boolean = false;
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    this.scene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

    //添加照相机
    var camera: Laya.Camera = ( this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
    camera.transform.translate(new Laya.Vector3(0, 3, 3));
    camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
    camera.clearColor = null;

    //添加方向光
    var directionLight: Laya.DirectionLight =  this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    //创建一个用于放置的cube
    var box:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3,0.3,0.3));

    Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
      var hero:Laya.Sprite3D =  this.scene.addChild(sp) as Laya.Sprite3D;
      //获取角色动画
      hero.getChildAt(0).addChild(box);
      this.ani = hero.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
      //加cube加入
      this.ani.linkSprite3DToAvatarNode("Dummy002",box);

      Laya.timer.frameLoop(1,this,this.onFrame,[box]);
    }));
  }

  public onFrame(box:Laya.MeshSprite3D){
    //当动画播放到百分之五十到六十之间时进行克隆
    var s:number = (this.ani.getCurrentAnimatorPlayState(0)._normalizedPlayTime-Math.floor(this.ani.getCurrentAnimatorPlayState(0)._normalizedPlayTime));
    if (0.6>s&&s>0.5)
    {
      if (this.weaponIsClone)return;
      //克隆模型（位置，矩阵，等信息全被克隆）
      var weaponClone:Laya.Sprite3D = Laya.Sprite3D.instantiate(box);
      //为模型添加在定义脚本
      weaponClone.addComponent(WeaponScript);
      //把克隆的武器放入场景中
      this.scene.addChild(weaponClone);
      this.weaponIsClone = true;
    }
    else if (s>0.98)
    {
      this.weaponIsClone = false;
    }
  }
}
new Main();
```





```typescript

 export default class WeaponScript extends Laya.Script {
    /**被脚本绑定的武器**/
    public weapon: Laya.Sprite3D;
    /**武器生命周期**/
    public lifeTime: number = 100;
    constructor() {
        super();
    }
    //获取绑定对象
    public onAwake(): void {
        this.weapon = this.owner as Laya.Sprite3D;
    }
    //覆盖组件更新方法，实现武器帧循环
    public onUpdate(): void {
        //武器旋转更新
        this.weapon.transform.rotate(new Laya.Vector3(2, 2, 0), true, false);
        //武器移动更新
        this.weapon.transform.translate(new Laya.Vector3(0, 0, 0.2), false);
        //生命周期递减
        this.lifeTime--;
        if (this.lifeTime < 0) {
            this.lifeTime = 100;
            //直接销毁脚本绑定对象会报错（对象销毁后脚本还会更新一次，报找不到绑定对象错误），
            //因此延迟一帧以销毁
            Laya.timer.frameOnce(1, this, function () { this.weapon.destroy(); });
        }
    }
}
```
