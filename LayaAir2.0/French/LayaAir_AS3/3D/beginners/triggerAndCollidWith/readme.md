#Trigger and Collider Filter

###Déclencheurs

La portée de collision du déclencheur est la même que celle du collisionneur, mais il peut être pénétré en tant qu 'organe de déclenchement et, en cas de collision, ne déclenche que le procédé ontriggerenter et n' a pas d 'effet de collision physique.

L 'ajout d' une collision ou d 'un déclencheur permet d' entendre un événement de collision ou de déclenchement dans le script et l 'utilisateur doit réécrire le procédé de script3d.

#####Trigger


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


#####Collisionneur


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


Collider and Trigger`Enter`Oui.`stay`Oui.`Exit`Trois méthodes.

Toutefois, à layaair2.0, le collisionneur diffère de l 'événement de collision reçu par le déclencheur.Le déclencheur reçoit des informations sur un autre composant de collision avec lui.L 'événement reçu par le collisionneur est une information de collision physique.

​**Le Code de l 'exemple utilisé ici est modifié sur la base du premier chapitre.**Ajouter une nouvelle catégorie de ballscript, sans changement de catégorie principale

#####Scenescript

​**Des modifications partielles sont apportées à la catégorie scenescript.**


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


#####Ballscript


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

Regardez l'effet:

![图](img/1.gif)

Confirmez la sortie à la console.

![图](img/1.png)

###Filtres d'impact

Dans la pratique, il est impossible que tous les objets entrent en collision avec n 'importe quel autre objet, comme les balles tirées par le protagoniste lui - même et qui ne sont pas autorisées par lui - même, ou pour les membres de l' équipe, il faut utiliser un filtre pour définir les groupes qui peuvent entrer en collision et ceux qui ne peuvent pas entrer en collision.


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

Dans le cas du développement physique, il y a également une demande, par exemple pour pouvoir entrer en collision avec un groupe autre que celui qui a été créé.Il faut passer.**Contre - attaquer**Calcule le groupe qui peut entrer en collision.

On trouvera ci - après un segment de code plus simple ou basé sur les éléments ci - dessus.


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

​**S'il faut encore enlever une équipe d'impact, il faut continuer à prendre l'envers.**


```typescript

	rigid.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^  Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```


![图](img/4.gif)