# 骨骼动画模板、播放模式、换装、切换动作

 引擎中使用骨骼动画无论是Spine还是DragonBone其实用法都是一样的，因为在转换过程中转换工具将两种动画都转成了引擎可以使用的相同的格式。本节将进一步介绍骨骼动画的用法。

**一、骨骼动画模板**

 要更好的使用骨骼动画就必须提到模板的概念，在LayaAir引擎中模板是一种特别的概念，表示一种数据结构，这种数据结构可以被复用。骨骼动画就使用到了模板，对于同一个动画来说，可以只创建一个动画模板，然后实例多个播放的实例，这样内存中就只有一份的动画数据，但是却可以在舞台上显示多个动画。

代码示例：

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

**二、骨骼动画播放模式**

在上一部分的示例代码可以看到这样一行代码

```typescript
//从动画模板创建动画播放对象
skeleton0=this.templet.buildArmature(0);
```

 我们在从模板创建动画的时候传了一个参数0，这个参数就表示动画的播放模式。动画有三个播放模式，下面分别说明。

 0：使用模板缓冲的数据，模板缓冲的数据，不允许修改 （内存开销小，计算开销小，不支持换装）

 1：使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存。（内存开销大，计算开销小，支持换装）

 2：使用动态方式，去实时去画（内存开销小，计算开销大，支持换装,不建议使用）

 这三种模式中 0:不支持换装,1,2支持换装。

**三、骨骼动画换装**

在前面的实例中可以看到这样一行代码：

```typescript
 //切换动画皮肤、
 skeleton0.showSkinByIndex(1);
```

我们在这里传了一个参数1，表示切换到1号皮肤。事实上这个动画有三个皮肤，0号是默认皮肤，1号是男角色皮肤，2号是女角色皮肤，下面我们给一个显示不同皮肤的例子。

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

**四、 骨骼动画切换动作**

 除了切换皮肤之外，骨骼动画还能在播放的时候切换动画的动作，比如可以把人物的跑攻击等动作放到同一个动画文件里面，使用的时候只要通过代码切换动作就可以了。

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

