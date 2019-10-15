# 触发器与碰撞器过滤器

###1. trigger

The collision range of the trigger is the same as that of the collider, but it can penetrate and act as a trigger mechanism. When the collision occurs, the onTrigger Enter method will only be triggered, and the physical collision effect will not be produced.

Adding collisions or triggers can monitor collisions or triggers in scripts, and users need to rewrite methods in Script3D.

#####trigger


```typescript

		/**
         * 当其他碰撞器进入绑定物体碰撞器时触发（子弹进入物品时）
         * 注：如相对移动速度过快，可能直接越过
         */
        override public function onTriggerEnter(other:PhysicsComponent):void{
        }

        /**
         * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹在物品内时）
         * 注：如相对移动速度过快，可能直接越过
         */
        override public function onTriggerStay(other:PhysicsComponent):void{
        }

        /**
         * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
         * 注：如相对移动速度过快，可能直接越过
         */
        override public function onTriggerExit(other:PhysicsComponent):void{
        }
```


#####Collider


```typescript

		/**
         * 与触发器相同
         */
        override public function onCollisionEnter(collision:Collision):void{
        }
        override public function onCollisionStay(collision:Collision):void{
        }
        override public function onCollisionExit(collision:Collision):void{
        }
```


Collider and trigger are divided into`Enter`,`stay`,`Exit`Three methods.

But in LayaAir 2.0, colliders and triggers receive different collision events. The trigger receives information about another collision component that collides with it. The event received by the collider is a physical collision information.

​**The sample code used in this article is modified on the basis of the first one.**Add a new BallScript class, the main class has not been modified

#####SceneScript class

​**Some modifications have been made to the SceneScript class.**


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
    import laya.events.Event;

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
            //添加一个重量
            rigid.mass = 10;
            //给球添加弹力
            rigid.restitution = 1;
            // 给球添加滚动摩擦力
            rigid.rollingFriction = 0.5;
            //给球添加脚本
            sphere.addComponent(BallScript);
            //给球一个名字 方便识别
            sphere.name = "本体球";

			//添加一个地板
			var floor:MeshSprite3D = scene.addChild(new MeshSprite3D(new PlaneMesh(10,10))) as MeshSprite3D;
			//给地板添加物理组件
			var floorCollicar:PhysicsCollider = floor.addComponent(PhysicsCollider);
			// 添加collidershape
			floorCollicar.colliderShape = new BoxColliderShape(10,0,10);
            //监听一次舞台mousedown事件
            Laya.stage.once(Event.MOUSE_DOWN,this,cloneBall,[sphere]);
        }
        /**
         * 点击克隆球体
         */
        public function cloneBall(sphere:MeshSprite3D):void{
                //一秒之后复制一个球
                 var cloneSphere:MeshSprite3D = Sprite3D.instantiate(sphere) as MeshSprite3D;
                //获取母体球的脚本
                var sphereScript:Script3D = sphere.getComponent(BallScript);
                //销毁掉之前加上去的脚本
                sphereScript.destroy();
                //设置位置偏移
                 cloneSphere.transform.translate(new Vector3(1,4,0));
                //添加到场景
                scene.addChild(cloneSphere);
                //获取克隆球的刚体
                var rigid:Rigidbody3D = cloneSphere.getComponent(Rigidbody3D);
                //设置为触发器
                rigid.isTrigger = true;
                //给个名字方便识别
                cloneSphere.name = "克隆球";
        }
    }  

}
```


#####BallScript class


```typescript

package script
{
    import laya.d3.component.Script3D;
    import laya.d3.physics.Collision;
    import laya.d3.core.MeshSprite3D;
    import laya.d3.physics.PhysicsComponent;

    public class BallScript extends Script3D{
        private var ball:MeshSprite3D;
        public function BallScript(){

        }
        
        override public function onAwake():void{
            //绑定球
            ball = owner as MeshSprite3D;
        }
        /**
         * 当其他碰撞器进入绑定物体碰撞器时触发（子弹进入物品时）
         * 注：如相对移动速度过快，可能直接越过
         */
        override public function onTriggerEnter(other:PhysicsComponent):void{
            trace("触发器enter" + ball.name);
        }

        /**
         * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹在物品内时）
         * 注：如相对移动速度过快，可能直接越过
         */
        override public function onTriggerStay(other:PhysicsComponent):void{
            trace("触发器stay" + ball.name );
        }

        /**
         * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
         * 注：如相对移动速度过快，可能直接越过
         */
        override public function onTriggerExit(other:PhysicsComponent):void{
            trace("触发器exit" + ball.name);
        }

        /**
         * 与触发器相同
         */
        override public function onCollisionEnter(collision:Collision):void{
            trace("碰撞器enter" + ball.name);
        }
        override public function onCollisionStay(collision:Collision):void{
            trace("碰撞器stay" + ball.name );
        }
        override public function onCollisionExit(collision:Collision):void{
            trace("碰撞器exit" + ball.name);
        }

        override public function onDisable():void{
            trace("脚本已被移除");
        }
    }   
}
```

Look at the effect:

![图](img/1.gif)

Confirm the output at the console at the same time

![图](img/1.png)

###2. Collider filter

In actual development, it is impossible for all objects to collide with any other objects, such as bullets fired by the protagonist himself and not allowed to collide with themselves, or bullets for teammates, which groups can collide and which groups can not collide with filters, see the code example below.


```typescript

......
//给球一个名字 方便识别
sphere.name = "本体球";
//给本体球添加碰撞组
rigid.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
......
//给地板添加可以碰撞的组
floorCollicar.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
.....

//cloneBall方法内     
//给个名字方便识别
cloneSphere.name = "克隆球";
//给克隆球添加碰撞组
rigid.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
......
```


![图](img/2.gif)

In practical development, there are also requirements, such as collision with other groups except one group. Then we need to pass it.**Take inverse**Operate to set collisible groups.

Here is a relatively simple code snippet, or based on the project above.


```typescript

......
//给球一个名字 方便识别
sphere.name = "本体球";
//给本体球添加碰撞组
rigid.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
......
//给地板添加可以碰撞的组
floorCollicar.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
.....

//cloneBall方法内     
//给个名字方便识别
cloneSphere.name = "克隆球";
//给克隆球添加碰撞组
	rigid.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^  Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;

......
```


![图](img/3.gif)

​**If you need to remove a collision group, you need to continue to reverse it.**


```typescript

	rigid.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^  Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```


![图](img/4.gif)