##LayaAir 3 D骨格掛点

###骨格掛点の概要

骨格の挂け技术は3 Dゲームの中で非常に普遍的で、たとえば武器は役の手の动作に従って変化して、それでは私达は武器と手の骨格を挂けることができて结び付けることを行って、武器は手の骨格のサブクラスとして、自然と使いやすい动作と変化することができます。

もちろん、バインディングされた3 Dモデルは、コードによってバインディングを除去したり、別の3 Dモデルを交換したりすることもでき、このような方法で武器や装備の換装機能を実現することができる。

###ユニティに骨格掛点を設置する

骨格掛点はユニティに設置されていてとても便利です。シーンの資源階層で直接操作できます。以下の図（図1）

バインディングを必要とするオブジェクトは3 D容器でもいいです。3 Dモデルだけでもいいです。位置を調整した後、指定された骨格の下にドラッグしてサブレベルとして接着点を連結することに成功しました。動画を再生する時、骨格アニメーションに従って変化していることが分かります。

ある時、私達は最初の時に武器を持たない必要がありますが、またハングアップが必要です。今後武器を換えるために準備します。それなら私達は骨の下に空いているノードの容器GameObjectを入れてもいいです。必要な時には別の3 Dモデルや複数のモデルを追加します。
![1](img\1.png)<br/>

（図1）

**Tips：私たちの骨格の掛点が設置されたら、骨格と掛点の対象は自動的に.lsまたは.lhファイルに導かれます。get ChildByName()方法でそれらを入手できます。ただし、特に注意する必要があります。骨格のハングアップは空の容器オブジェクトだけを結びつけて、後で動的にサブオブジェクトを追加するために使用されます。エクスポートプラグインでは、GameObject SettingのIgnore Null Game Objectは空ノードの設定を無視しています。そうでないと、空容器のハンガーポイントオブジェクトは.lsまたは.lhに導かれません。**

###コードの中で骨格を実現します。

一般的に、私たちはユニティに骨格掛点を追加します。しかし、LayaAirエンジンはコードのかけ方も提供しています。骨格のハンガーアップを柔軟に追加して除去することができます。

アニメイトアニメーションモジュール類は二つの実例的な方法を提供しています。**linkSprite 3 D ToAvatarNode()**を選択します**unlink Sprite 3 D ToAvatarNode（）**ハンガーポイントの追加と除去が可能です（図2、図3）。

Tips：コードは骨格動画を追加する前に、美術が骨格ノードに関連する名前を提供する必要があります。

![2](img\2.png)<br/>

（図2）

![3](img\3.png)<br/>

（図3）

具体的に使用するコードは以下の通りです。

シーンから骨格アニメーションモデルを取得します。模型のアニメーションコンポーネントを取得します。


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


###骨格掛点運用例

魔法攻撃の簡単な例をあげて、骨格掛点の運用を示します（図4）。

![4](img\4.gif)<br/>
（図4）

まず図1のように、ユニティに魔法絞りを右骨格のサブノード階層に設定し、右骨格の名前を「RHand」に変更し、魔法絞りを「weappon」として出力します。導出後、手骨格と絞りがモデルのサブレベルファイルに現れることがわかった（図5）。必要に応じて名前によって取得できる。

![5](img\5.png)<br/>
（図5）

図4の魔法攻撃効果によって、二つのカテゴリーで実現できます。一つはメインクラスのMain.tsで、アニメーション再生と魔法兵器の生成を実現するためのものです。一つは、攻撃動画が36フレームぐらいまで再生された時に、武器を掛けるのと同じ新しい魔法兵器を複製し、武器のシナリオを追加して飛行に使用します。魔法を生成し、魔法をかける効果をシミュレーションします。

ウェポンScript.tsが魔法飛行と破壊を実現。すべてのコードは以下の通りです。


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
