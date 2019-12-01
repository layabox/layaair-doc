#Modèle d 'animation squelette

L 'utilisation de l' animation squelettique dans le moteur est identique, que ce soit Spine ou dragonbone, car l 'outil de conversion transforme les deux animations en un format identique pour le moteur.L'utilisation de l'animation osseuse est décrite plus en détail dans la présente section.

**Modèle d 'animation squelette**

Pour mieux utiliser l 'animation squelettique, il faut mentionner le concept de modèle, qui est un concept particulier dans le moteur layaair, indiquant une structure de données pouvant être multiplexée.L 'animation squelettique est utilisée dans un modèle qui, pour la même animation, ne crée qu' un modèle d 'animation, puis des exemples multiples d' exemples de lecture, de sorte qu 'il n' y a qu 'une seule donnée d' animation dans la mémoire, mais qu 'une pluralité d' Animations peuvent être affichées sur la scène.

Exemple de code:


```typescript

module laya{
  export  class SkeletonTempletSample {
    templet: Laya.Templet;
    constructor() {
        Laya.WebGL.enable();
        Laya.init(1000, 900);
        //创建动画模板
        this.templet = new Laya.Templet();
        this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.templet.on(Laya.Event.ERROR, this, this.onError);
        this.templet.loadAni("res/spine/goblins/goblins.sk");
    }
    onError() {
        console.log("parse error");
    }
    parseComplete() {
        //创建第一个动画
        var skeleton0: Laya.Skeleton;
        //从动画模板创建动画播放对象
        skeleton0 = this.templet.buildArmature(0);
        skeleton0.pos(200, 700);
        //切换动画皮肤
        skeleton0.showSkinByIndex(1);
        //播放
        skeleton0.play(0, true);
        Laya.stage.addChild(skeleton0);

        //创建第二个动画
        var skeleton1: Laya.Skeleton;
        skeleton1 = this.templet.buildArmature(0);
        skeleton1.pos(500, 700);
        skeleton1.showSkinByIndex(1);
        skeleton1.play(0, true);
        Laya.stage.addChild(skeleton1);    
    }
}
}
new laya.SkeletonTempletSample();
```


**Skeletal Animation**

Vous pouvez voir ce code de ligne dans la partie précédente.


```typescript

//从动画模板创建动画播放对象
skeleton0=this.templet.buildArmature(0);
```


Lors de la création d 'une animation à partir d' un modèle, nous avons transmis un paramètre 0 qui représente le mode de lecture de l 'animation.L 'animation comporte trois modes de lecture, décrits ci - après.

0: données tamponnées à l 'aide d' un modèle, données tamponnées à l 'aide d' un modèle, ne peuvent pas être modifiées

Utiliser sa propre zone tampon, chaque animation aura sa propre zone tampon, ce qui coûte cher en mémoire.(la mémoire coûte cher, calcule les petites dépenses, supporte le changement)

2: Désactiver en temps réel au moyen d 'une méthode dynamique

Dans ces trois modes, 0: ne prend pas en charge le changement et 1,2 prend en charge le changement.

**Bone Animation**

Dans l 'exemple précédent, le Code de ligne suivant est visible:


```typescript

 //切换动画皮肤、
 skeleton0.showSkinByIndex(1);
```


Nous avons transmis ici un paramètre 1 pour passer à la peau n° 1.En fait, cette animation a trois peaux, 0 peau par défaut, 1 peau de rôle masculin et 2 peau de rôle féminin.


```typescript

module laya {
    export class SkeletonTempletSample {
        templet: Laya.Templet;
        constructor() {
            Laya.WebGL.enable();
            Laya.init(1000, 900);
            this.templet = new Laya.Templet();
            this.templet.on(Laya.Event.COMPLETE, this, this.parseComplete);
            this.templet.on(Laya.Event.ERROR, this, this.onError);
            this.templet.loadAni("res/spine/goblins/goblins.sk");
        }
        onError() {
            console.log("parse error");
        }
        parseComplete() {
            //创建第一个动画
            var skeleton0: Laya.Skeleton;
            //从动画模板创建动画播放对象
            skeleton0 = this.templet.buildArmature(0);
            skeleton0.pos(200, 700);
            //切换动画皮肤 使用标号为0的皮肤
            skeleton0.showSkinByIndex(0);
            //播放
            skeleton0.play(0, true);
            Laya.stage.addChild(skeleton0);

            //创建第二个动画
            var skeleton1: Laya.Skeleton;
            skeleton1 = this.templet.buildArmature(0);
            skeleton1.pos(450, 700);
            //切换动画皮肤 使用标号为1的皮肤
            skeleton1.showSkinByIndex(1);
            skeleton1.play(0, true);
            Laya.stage.addChild(skeleton1);

            //创建第三个动画
            var skeleton2: Laya.Skeleton;
            skeleton2 = this.templet.buildArmature(0);
            skeleton2.pos(700, 700);
            //切换动画皮肤 使用标号为2的皮肤
            skeleton2.showSkinByIndex(2);
            skeleton2.play(0, true);
            Laya.stage.addChild(skeleton2);
        }
    }
}
new laya.SkeletonTempletSample();
```


**Bone Animation**

En plus de changer la peau, l 'animation squelettique peut changer l' animation pendant la lecture, par exemple en plaçant des actions telles que l 'attaque d' un personnage dans le même fichier d 'animation.


```typescript

module laya{
 export class SkeletonChangeActionSample {
  constructor()
   {
       Laya.WebGL.enable();
       Laya.init(1000,900);
       this.test();
   }
   skeleton:Laya.Skeleton;
   text:Laya.Text;
   test()
   {
      var skeleton=new Laya.Skeleton();
      skeleton.url="res/spine/alien/alien.sk";
      skeleton.pos(300,700);
      Laya.stage.addChild(skeleton);

      this.text=new Laya.Text();
      Laya.stage.addChild(this.text);
      this.text.color="#00ff00";
      this.text.fontSize=30;
      Laya.stage.addChild(this.text);

      Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.changeAction);
   }
   tActionID:number=0;
   changeAction()
   {
       this.tActionID++;
       var aniCount:number;
       //获取动画动作数量
       aniCount=this.skeleton.getAnimNum();
       this.tActionID=this.tActionID%aniCount;
       //显示当前要播放的动画名
       this.text.text=this.skeleton.getAniNameByIndex(this.tActionID);
       //切换播放的动画
       this.skeleton.play(this.tActionID,true);
   }
}
}
new laya.SkeletonChangeActionSample();
```


