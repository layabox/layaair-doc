#터치 및 충돌기 필터

###1. 터치

촉발기의 충돌 범위와 충돌기는 마찬가지지만, 뚫을 수 있으며 촉발기관으로서 충돌이 발생할 때 onTriggerEnter 방법만 촉발하고 물리적 충돌이 생기지 않을 수 있다.

충돌이나 터치기를 추가하면 스크립트에서 충돌이나 촉발 사건을 들을 수 있으며, 사용자는 Script3D 의 방법을 다시 써야 한다.

#####트리거


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


#####충돌기


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


충돌기 와 촉발기 는 모두 나뉜다`Enter`,`stay`,`Exit`세 가지 방법.

그러나 레이어리아에서 충돌기는 터치기와 접수된 충돌 사건과는 다르다.터치기가 접수된 것은 그와 충돌하는 또 다른 충돌 메시지다.충돌기가 접수된 사건은 물리적 충돌 정보다.

​**이번 사용의 사례 코드, 1편의 기초에서 수정합니다.**BallScript 종류를 새로 추가하여 주류는 수정되지 않았습니다

#####SceneScript 종류

​**SceneScript 종류에 대한 일부 수정이 있습니다.**


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


#####BalScript 종류


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

효과 보기:

![图](img/1.gif)

동시에 콘솔에서 출력 확인

![图](img/1.png)

###2. 충돌기 필터

실제 개발에서 모든 물체는 다른 물체와 충돌할 수 없다. 예를 들어 주인공이 발사한 총탄과 자신은 충돌을 허용하지 않는다. 또는 총탄은 팀에 대한 동료, 어떤 그룹을 충돌할 수 있는지 설정할 수 있으며, 어떤 팀이 충돌할 수 있는지, 다음 코드를 볼 수 있다.


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

실제 개발에서 수요는 1팀 외에 다른 팀과 충돌할 수 있다.그러면 통과가 필요해요.**반역하다**충돌할 수 있는 그룹을 연산해서 설정합니다.

다음은 비교적 간단한 코드 단락을 주고, 아니면 윗글에 기반한 항목이다.


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

​**만약 또 부딪치는 팀을 없애야 한다면, 계속 반대로 해야 한다.**


```typescript

	rigid.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^  Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```


![图](img/4.gif)