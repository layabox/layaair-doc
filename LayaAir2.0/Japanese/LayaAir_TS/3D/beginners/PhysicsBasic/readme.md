#LayaAir 3 Dの物理入門

####速く3 D物理の旅を開けます。

次にLayaAirエンジンを使って3 D物理プロジェクトを迅速に開始します。AS言語を教程として、エンジンコードで基本的な3 D物理応用を簡単に実証します。まず効果をプレビューします。



![图](img/easyPhysics.gif)

Mainのメインクラスでは、3 Dの物理的な世界を構築し、簡単な3 D物理の世界に必要な要素（剛体と衝突器のコンポーネント）を追加しました。これらの概念知識については、後続の教程で詳しく紹介します。



この簡単なデモに対して、重力によってボールが自然に落下して他のボールと衝突する物理的効果を創建しただけです。コードを手動で叩いて効果を体験したり、直接コードをコピーしたりして、後続の文書で詳しく勉強します。

メインクラスのコードは以下の通りです


```typescript

import GameConfig from "./GameConfig";
import SceneScript from "./script/SceneScript"; 
class Main {
         constructor() {
            //初始化引擎
            Laya3D.init(0, 0);
            //适配模式
            Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
            Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
            //开启统计信息
            Laya.Stat.show();
           	Laya.loader.load("res/layabox.png",Laya.Handler.create(this,this.loadComplete));
        }        
        private loadComplete():void{
            var _scene:Laya.Scene3D = new Laya.Scene3D();
            Laya.stage.addChild(_scene);
            _scene.addComponent(SceneScript);
        }
    }

//激活启动类
new Main();
```

シーンスクリプトコード:

```typescript


export default class SceneScript extends Laya.Script3D{
        private scene:Laya.Scene3D
        constructor(){
            super();
        }

        onAwake():void{
            this.scene = this.owner as Laya.Scene3D;
        }
    
        onStart():void{
            var camera:Laya.Camera = (this.scene.addChild(new Laya.Camera( 0, 0.1, 100))) as Laya.Camera;

            camera.transform.translate(new Laya.Vector3(1, 6, 10));
            camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
            camera.clearColor = null;
            
			var directionLight:Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
            directionLight.diffuseColor = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

            //添加自定义模型
            var sphere:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(1,100,100))) as Laya.MeshSprite3D;
            sphere.transform.rotate(new Laya.Vector3(0,90,0),false,false);
			sphere.transform.translate(new Laya.Vector3(0,3,0));
            sphere.meshRenderer.material = new Laya.BlinnPhongMaterial;
            var material:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
            Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D):void {
                material.albedoTexture = tex;
            }));
            sphere.meshRenderer.material = material;
            
			//添加物理组件
			sphere.addComponent(Laya.PhysicsCollider);
			//给球添加刚体
			var rigid:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
			//有刚体的shape要加在刚体上
			rigid.colliderShape = new Laya.SphereColliderShape(1);
			//添加一个地板
			var floor:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(new Laya.PlaneMesh(10,10))) as Laya.MeshSprite3D;
			//给地板添加物理组件
			var floorCollicar:Laya.PhysicsCollider = floor.addComponent(Laya.PhysicsCollider);
			// 添加collidershape
			floorCollicar.colliderShape = new Laya.BoxColliderShape(10,0,10);
            //克隆一个球                
            Laya.timer.once(1000,this,function():void{
              //一秒之后复制一个球
                 var cloneSphere:Laya.MeshSprite3D = Laya.Sprite3D.instantiate(sphere) as Laya.MeshSprite3D;
                //设置位置偏移
                 cloneSphere.transform.translate(new Laya.Vector3(1,4,0));
                //添加到场景
                this.scene.addChild(cloneSphere);
            });
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