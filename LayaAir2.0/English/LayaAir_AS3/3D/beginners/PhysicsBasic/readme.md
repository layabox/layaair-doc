

# LayaAir3D之物理入门

#### 快速开启3D物理之旅

以下我们将用LayaAir引擎快速开始一个3D物理项目，并且以AS语言为教程，简单演示用引擎代码实现一个基本的3D物理应用。我们先预览一下效果:



![图](img/easyPhysics.gif)

在Main的主类中，我们构建了一个3D的物理世界，并且添加了简单3D物理世界所必须的要素（刚体和碰撞器组件）关于这些概念知识后续教程我们会详细的介绍，逐步带领大家了解3D知识。



对于这个简单的Demo，我们只是创建了小球受重力自然下落与另一个小球发生碰撞的物理效果，我们可以手动敲一下代码体验一下效果，或者可以直接复制代码，后续的文档中详细的学习知识点。

主类代码如下:

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
场景脚本代码：
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

​	关于物体复制的Sprite.instantiate方法可以从API去了解，这个方法要比clone方法要更方便一些。具体习惯可以根据个人习惯和场景去使用。

![图](img/图1.png)		

​	

  **[ tip:在本次案例中有涉及到使用代码给物体添加PhysicsCollider与RigidBody3D。在当物体有rigidbody时shape需要添加到rigidbody的collidershape上，没有的话需要将shape添加到PhysicsCollider的collidershape。]**

​	然后我们给球添加上弹力和滚动摩擦力

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

看下修改后的效果:

![图](img/easyPhysics2.gif)