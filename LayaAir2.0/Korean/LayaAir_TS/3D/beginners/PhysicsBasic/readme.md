#Layaiair3D 물리 입문

####3D 물리 여행 빠른 시작

다음은 Layair 엔진으로 3D 물리 프로젝트를 빠르게 시작하고 AS 언어를 가르치고 엔진 코드를 통해 기본적인 3D 물리 응용을 간단히 시사할 것입니다.미리 보기:



![图](img/easyPhysics.gif)

Main 의 주류에서 우리는 3D의 물리세계를 구축하고 간단한 3D 물리세계의 필수 요소 (강체와 충돌기 구성) 에 대한 개념 지식 후속 과정을 자세히 소개하며 3D 지식 지식 지식을 점차적으로 이끌어갔다.



이 간단한 Demo 에 대해 우리는 단지 작은 볼이 중력으로 자연히 떨어지고 다른 작은 볼과 충돌하는 물리적 효과를 만들어 볼 수 있다. 우리는 직접 코드를 복제하거나, 후속된 문서에서 자세한 학습 지식을 수동적으로 두드릴 수 있다.

주 코드 다음과 같습니다:


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

장면 스크립트 코드:

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


물체 복제에 대한 Sprite.instantantiate 방법은 API 에서 알 수 있다. 이 방법은 clone 방법보다 훨씬 편리하다.구체적인 습관은 개인습관과 장면에 따라 사용할 수 있다.

![图](img/图1.png)		


​


  **[tip:이번 사건에서 코드 사용에 물체에 Physicscollider와 RigidBody3D 를 추가하는 데 관련이 있다.rigidbody 가 있을 때 shape 는 rigidbody collidershape 에 추가해야 할 경우 shape를 Physcscollider collidershape에 추가해야 합니다.명**

그리고 저희가 공에 탄력과 굴림마찰력을 추가합니다.


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


수정 후 효과 보기:

![图](img/easyPhysics2.gif)