##LayaAir 3 D骨格掛点

###骨格掛点の概要

骨格の挂け技术は3 Dゲームの中で非常に普遍的で、たとえば武器は役の手の动作に従って変化して、それでは私达は武器と手の骨格を挂けることができて结び付けることを行って、武器は手の骨格のサブクラスとして、自然と使いやすい动作と変化することができます。

もちろん、バインディングされた3 Dモデルは、コードによってバインディングを除去したり、別の3 Dモデルを交換したりすることもでき、このような方法で武器や装備の換装機能を実現することができる。



###ユニティに骨格掛点を設置する

骨格掛点はユニティに設置されていてとても便利です。シーンの資源階層で直接操作できます。以下の図（図1）

バインディングを必要とするオブジェクトは3 D容器でもいいです。3 Dモデルだけでもいいです。位置を調整した後、指定された骨格の下にドラッグしてサブレベルとして接着点を連結することに成功しました。動画を再生する時、骨格アニメーションに従って変化していることが分かります。

ある時、私達は最初の時に武器を持たない必要がありますが、またハングアップが必要です。今後武器を換えるために準備します。それなら私達は骨の下に空いているノードの容器GameObjectを入れてもいいです。必要な時には別の3 Dモデルや複数のモデルを追加します。

![图1](img/1.png)<br/>(図1)

**Tips：私たちの骨格の掛点が設置されたら、骨格と掛点の対象は自動的に.lsまたは.lhファイルに導かれます。get ChildByName()方法でそれらを入手できます。ただし、特に注意する必要があります。骨格のハングアップは空の容器オブジェクトだけを結びつけて、後で動的にサブオブジェクトを追加するために使用されます。エクスポートプラグインでは、GameObject SettingのIgnore Null Game Objectは空ノードの設定を無視しています。そうでないと、空容器のハンガーポイントオブジェクトは.lsまたは.lhに導かれません。**  



###コードの中で骨格を実現します。

一般的に、私たちはユニティに骨格掛点を追加します。しかし、LayaAirエンジンはコードのかけ方も提供しています。骨格のハンガーアップを柔軟に追加して除去することができます。

アニメイトアニメーションモジュール類は二つの実例的な方法を提供しています。**linkSprite 3 D ToAvatarNode()**を選択します**unlink Sprite 3 D ToAvatarNode（）**ハンガーポイントの追加と除去が可能です（図2、図3）。

Tips：コードは骨格動画を追加する前に、美術が骨格ノードに関連する名前を提供する必要があります。

![图2](img/2.png)<br>（图2）



![图3](img/3.png)<br/>(図3)

具体的に使用するコードは以下の通りです。

シーンから骨格アニメーションモデルを取得します。模型のアニメーションコンポーネントを取得します。


```typescript

  //从场景中获取动画模型
  var monkey:Sprite3D=scene.getChildByName("monkey") as Sprite3D;
  //获取动画模型中动画组件
  var monkeyAni:Animator=monkey.getComponentByType(Animator) as Animator;

  //需要挂点的3D对象
  var box:MeshSprite3D=new MeshSprite3D(new BoxMesh(1,1,1));
  //将3D对象加载到角色中（一定要加入到角色的Animator模型上）
  monkey.getChildAt(0).addChild(box);
  //将挂点物品添加到某个骨骼上（美术提供骨骼的名称）
  monkeyAni.linkSprite3DToAvatarNode("RHand",box);

  //将挂点物品从骨骼上移除（美术提供骨骼的名称）
  //monkeyAni.unLinkSprite3DToAvatarNode("RHand",box);
```




###骨格掛点運用例

魔法攻撃の簡単な例をあげて、骨格掛点の運用を示します（図4）。

![图4](img/4.gif)<br/>(図4)

まず図1のように、ユニティに魔法絞りを右骨格のサブノード階層に設定し、右骨格の名前を「RHand」に変更し、魔法絞りを「weappon」として出力します。導出後、手骨格と絞りがモデルのサブレベルファイルに現れることがわかった（図5）。必要に応じて名前によって取得できる。

![图5](img/5.png)<br/>(図5)

図4の魔法攻撃効果によって、2つのカテゴリーで実現できます。一つは主にLaya 3 DuBonePoint.asで、アニメ放送と魔法兵器の生成を実現するためのものです。攻撃動画が36フレームぐらいまで再生された時、武器を掛けるのと同じ新しい魔法武具をクローンし、武器シナリオを追加して飛行に使います。また、シミュレーションで魔法が発生し、魔法をかける効果を再表示します。

ウェポンScript.asが魔法飛行と破壊を実現。すべてのコードは以下の通りです。


```typescript

package {
  import laya.d3.core.Camera;
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.light.DirectionLight;
  import laya.d3.math.Vector3;
  import laya.d3.math.Vector4;
  import laya.d3.resource.models.BoxMesh;
  import laya.display.Stage;
  import laya.utils.Stat;
  import laya.d3.core.scene.Scene3D;
  import laya.d3.core.material.BlinnPhongMaterial;
  import laya.webgl.resource.Texture2D;
  import laya.utils.Handler;
  import laya.d3.component.Animator;
  import laya.d3.component.Script3D;
  public class LayaAir3D {
    public var box :MeshSprite3D;
  public var scene:Scene3D;
  public var weaponIsClone:Boolean = false;
  public var heroAni:Animator;
  public function LayaAir3D() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Stage.SCALE_FULL;
    Laya.stage.screenMode = Stage.SCREEN_NONE;

    //开启统计信息
    Stat.show();

    //添加3D场景
    scene = Laya.stage.addChild(new Scene3D()) as Scene3D;

    //添加照相机
    var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
    camera.transform.translate(new Vector3(0, 3, 3));
    camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
    camera.clearColor = null;

    //添加方向光
    var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
    directionLight.color = new Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));

    box = new MeshSprite3D(new BoxMesh(0.3,0.3,0.3));

    Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
      var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
      hero.getChildAt(0).addChild(box);
      heroAni = hero.getChildAt(0).getComponent(Animator)
      heroAni.linkSprite3DToAvatarNode("Dummy002",box);

      Laya.timer.frameLoop(1,this,function():void{
        onFrame();
      })
    }));
  }
  private function onFrame():void{ 
    //当动画播放到百分之五十到六十之间时进行克隆
    if (0.6>(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime))>0.5)
    {
      if(weaponIsClone)return;
      trace("sssssss")
      //克隆模型（位置，矩阵，等信息全被克隆）
      var weaponClone:Sprite3D = Sprite3D.instantiate(this.box);
      //为模型添加在定义脚本
      weaponClone.addComponent(WeaponScript);		
      //把克隆的武器放入场景中
      scene.addChild(weaponClone);
      weaponIsClone = true;
    }
    else if ((heroAni.getCurrentAnimatorPlayState(0)._normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime))>0.98)
    {
      weaponIsClone = false;
    }

  }
}
}
```



```typescript

package {
	import laya.components.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.RenderState;
	import laya.d3.core.material.PBRStandardMaterial;
	import laya.d3.math.Vector4;
	import laya.d3.math.Vector3;
	import laya.d3.core.material.PBRSpecularMaterial;
	import laya.d3.component.Script3D;

	public class WeaponScript extends Script3D {
		//**************** wq *****************************************
        //被脚本绑定的物体
        private var weapon:MeshSprite3D;
        //武器生命周期
        public var lifeTime:int = 30;
		public function WeaponScript() {

        }
        /**
		 * 复写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
		 */
        override public function onAwake():void{
            //得到3D对象
            weapon  = this.owner as MeshSprite3D;
        }
        /**
		 * 覆写组件更新方法（相当于帧循环）
		 */	
        override public function onUpdate():void{
            //所属脚本对象旋转更新
            weapon .transform.rotate(new Vector3(0,0.5,0),false,false);
            weapon.transform.translate(new Vector3(0,0,0.2),false);
            lifeTime--;
            if (lifeTime<0)
            {
                lifeTime = 100;
                //直接销毁脚本保定对象会报错（对象销毁后脚本还会在更新一次，找不到绑定对象会错误）
                //因此延迟一帧销毁
                Laya.timer.frameOnce(1,this,function():void{
                    weapon.destroy();
                })
            }
        }
    }
}
```
