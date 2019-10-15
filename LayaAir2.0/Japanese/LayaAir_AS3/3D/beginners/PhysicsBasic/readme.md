#LayaAir 3 Dの物理入門

####速く3 D物理の旅を開けます。

次にLayaAirエンジンを使って3 D物理プロジェクトを迅速に開始します。AS言語を教程として、エンジンコードで基本的な3 D物理応用を簡単に実証します。まず効果をプレビューします。



![图](img/easyPhysics.gif)

Mainのメインクラスでは、3 Dの物理的な世界を構築し、簡単な3 D物理の世界に必要な要素（剛体と衝突器のコンポーネント）を追加しました。これらの概念知識については、後続の教程で詳しく紹介します。



この簡単なデモに対して、重力によってボールが自然に落下して他のボールと衝突する物理的効果を創建しただけです。コードを手動で叩いて効果を体験したり、直接コードをコピーしたりして、後続の文書で詳しく勉強します。

メインクラスのコードは以下の通りです


```typescript

package {

    import laya.display.Stage;
    import laya.utils.Stat;
    import laya.d3.core.scene.Scene3D;
    import script.SceneScript;
  
    public class Main {
        public function Main() {
            //初始化引擎
            Laya3D.init(0, 0);
            //适配模式
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //开启统计信息
            Stat.show();
           Laya.loader.load("res/layabox.png",Handler.create(this,loadComplete));
        }        
        private function loadComplete():void{
            var _scene:Scene3D = new Scene3D();
            Laya.stage.addChild(_scene);
            _scene.addComponent(SceneScript);
        }
    }
}
```

シーンスクリプトコード:

```typescript

package script
{
    import laya.d3.core.scene.Scene3D;
    import laya.d3.core.material.BlinnPhongMaterial;
    import laya.webgl.resource.Texture2D;
    import laya.d3.resource.models.SphereMesh;
    import laya.d3.resource.models.PlaneMesh;
    import laya.d3.physics.PhysicsCollider;
    import laya.d3.physics.Rigidbody3D;
    import laya.d3.physics.shape.SphereColliderShape;
    import laya.d3.physics.shape.BoxColliderShape;
    import laya.physics.RigidBody;
    import laya.d3.core.Camera;
    import laya.d3.core.MeshSprite3D;
    import laya.d3.core.Sprite3D;
    import laya.d3.core.light.DirectionLight;
    import laya.d3.math.Vector3;
    import laya.d3.component.Script3D;
    import laya.utils.Handler;

    public class SceneScript extends Script3D{
        private var scene:Scene3D
        public function SceneScript(){

        }

        override public function onAwake():void{
            scene = owner as Scene3D;
        }
    
        override public function onStart():void{
            var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;

            camera.transform.translate(new Vector3(1, 6, 10));
            camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
            camera.clearColor = null;
            
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
            directionLight.diffuseColor = new Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));

            //添加自定义模型
            var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh(1,100,100))) as MeshSprite3D;
            sphere.transform.rotate(new Vector3(0,90,0),false,false);
			sphere.transform.translate(new Vector3(0,3,0));
            sphere.meshRenderer.material = new BlinnPhongMaterial;
            var material:BlinnPhongMaterial = new BlinnPhongMaterial();
            Texture2D.load("res/layabox.png", Handler.create(null, function(tex:Texture2D):void {
                material.albedoTexture = tex;
            }));
            sphere.meshRenderer.material = material;
            
			//添加物理组件
			sphere.addComponent(PhysicsCollider);
			//给球添加刚体
			var rigid:Rigidbody3D = sphere.addComponent(Rigidbody3D);
			//有刚体的shape要加在刚体上
			rigid.colliderShape = new SphereColliderShape(1);
            
			//添加一个地板
			var floor:MeshSprite3D = scene.addChild(new MeshSprite3D(new PlaneMesh(10,10))) as MeshSprite3D;
			//给地板添加物理组件
			var floorCollicar:PhysicsCollider = floor.addComponent(PhysicsCollider);
			// 添加collidershape
			floorCollicar.colliderShape = new BoxColliderShape(10,0,10);
            //克隆一个球                
            Laya.timer.once(1000,this,function():void{
              //一秒之后复制一个球
                 var cloneSphere:MeshSprite3D = Sprite3D.instantiate(sphere) as MeshSprite3D;
                //设置位置偏移
                 cloneSphere.transform.translate(new Vector3(1,4,0));
                //添加到场景
                scene.addChild(cloneSphere);
            });
        }
    }  

}
```


物体コピーのSprite.instantiate方法についてはAPIから知ることができます。この方法はclone法よりもっと便利です。具体的な習慣は個人の習慣や場面によって使うことができます。

![图](img/图1.png)		


​


  **[tip:今回のケースでは、コードを使って物体にPhysics ColliderとRigidBodyの3 Dを追加することに関連しています。物体がrigidbodyを持っている時にshpeをrigidbodyのcollider sharpeに追加する必要があります。ない場合はshopをPhysics Colliderのcollider sharpeに追加する必要があります。」**

そしてボールに弾力と転がり摩擦を加えます。


```java

.......
  //添加一个重量
  rigid.mass = 10;
  //添加弹力
  rigid.restitution = 1;
  //添加滚动摩擦力
  rigid.rollingFriction = 0.5
.......
```


修正後の効果を見てください。

![图](img/easyPhysics2.gif)