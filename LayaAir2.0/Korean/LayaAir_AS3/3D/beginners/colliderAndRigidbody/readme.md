#충돌기 와 강체

간단한 입문에서 충돌체 첨가와 강체의 조작에 관련되어 본 편에서는 구체적인 조작을 설명할 수 있다.

2.0의 3d 충돌기는 Physicscollider.3D의 강체는 Rigidbody3D 입니다.

충돌이 생기려면 게임 대상에 강체 (Rigidbody) 와 충돌기를 추가해야 하며, 강체는 물리적 영향 아래 운동을 할 수 있다.충돌체는 물리 구성 요소의 종류이며, 그것은 강체와 함께 게임 대상에 추가해야 충돌할 수 있다.두 개의 강체가 서로 충돌하면 두 개의 대상이 충돌할 때 물리엔진이 충돌을 계산할 수 있으며 물리 모의에서 충돌하지 않은 직접체는 서로를 통과할 수 있다.

물체가 충돌할 필요조건: 두 개의 물체는 충돌기 (Physicscollider) 를 가져야 한다.

충돌함: colliderShape, 모형이 3D 세계에서 물리 연산과 충돌하는 형태 상자입니다.

###1. 충돌기와 강체 추가

우리는 먼저 간단한 작은 공을 만들고 작은 공에 부딪치기와 강체를 추가한다.


```javascript

//新建一个球体模型
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh(1))) as MeshSprite3D;
//给球体添加碰撞器
var spherePhy:PhysicsCollider = sphere.addComponent(PhysicsCollider);
//新建一个球形的碰撞盒
var sphereShape:SphereColliderShape = new SphereColliderShape(1)

/* 没有刚体时：
//给碰撞器添加碰撞盒
spherePhy.colliderShape = sphereShape;
*/
//有刚体
 //给球添加刚体
 var sphereRigid:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//将碰撞盒添加到刚体上
shpereRigid.colliderShape = sphereShape;
```

다른 모형은 다른 Messh와 ColliderShap을 만들어야 할 뿐이다.**동시에 강체와 충돌기에 shape 를 추가하지 않도록 주의하세요.**다음 그림은 작은 볼의 효과다.

![图](img/1.png)

###2. 간단한 사례

부딪치기와 강체를 어떻게 첨가하는지 알고서 간단한 장면을 만들어 이 부분을 테스트할 수 있다.

충돌과 동기화시키려면 모형과 충돌함 같은 것이 필요하다.

#####주 종류:


```javascript

package {

    import laya.utils.Handler;
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

        private function loadComplete():void
        {
            var _scene:Scene3D = new Scene3D();
            Laya.stage.addChild(_scene);
            _scene.addComponent(SceneScript);
        }
    }
}
```


#####스크립트 종류:


```javascript

package  script{

    import laya.d3.core.Camera;
    import laya.d3.core.MeshSprite3D;
    import laya.d3.core.Sprite3D;
    import laya.d3.core.light.DirectionLight;
    import laya.d3.math.Vector3;
    import laya.utils.Handler;
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
    import laya.d3.resource.models.BoxMesh;
    import laya.d3.resource.models.CylinderMesh;
    import laya.d3.component.Script3D;
    import laya.d3.resource.models.CapsuleMesh;
    import laya.d3.physics.shape.CylinderColliderShape;
    import laya.d3.physics.shape.CapsuleColliderShape;
    import laya.d3.resource.models.ConeMesh;
    import laya.d3.physics.shape.ConeColliderShape;

    public class SceneScript extends Script3D{
        private var scene:Scene3D;
        public function SceneScript() {
           
        }      

        override public function onAwake():void{
            scene = owner as Scene3D;
        }  

        override public function onStart():void{
            var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;

            camera.transform.translate(new Vector3(0, 5, 20));
            camera.transform.rotate(new Vector3( 0, 1, 0), true, false);
            camera.clearColor = null;
            
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
            directionLight.diffuseColor = new Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));


            //添加球体模型
            var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh(1))) as MeshSprite3D;
			sphere.transform.translate(new Vector3(0,1,0));
            sphere.meshRenderer.material = new BlinnPhongMaterial();

            //添加正方体模型
			var cube:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(2,2,2))) as MeshSprite3D;
			cube.transform.translate(new Vector3(4,3,0));
			cube.meshRenderer.material = new BlinnPhongMaterial();

			//圆柱体模型
			var cylinder:MeshSprite3D = scene.addChild(new MeshSprite3D(new CylinderMesh(1,2))) as MeshSprite3D;
			cylinder.transform.translate(new Vector3(8,5,0));
			cylinder.meshRenderer.material = new BlinnPhongMaterial();
			
            //胶囊体模型
            var capsule:MeshSprite3D = scene.addChild(new MeshSprite3D(new CapsuleMesh(0.5,2))) as MeshSprite3D;
			capsule.transform.translate(new Vector3(-4,1,0));
            capsule.meshRenderer.material = new BlinnPhongMaterial();

            //圆锥模型
            var cone:MeshSprite3D = scene.addChild(new MeshSprite3D(new ConeMesh(0.5,2))) as MeshSprite3D;
            cone.transform.translate(new Vector3(-8,1,0));
            cone.meshRenderer.material = new BlinnPhongMaterial();
            //添加物理组件
		    sphere.addComponent(PhysicsCollider);
			cube.addComponent(PhysicsCollider);
			cylinder.addComponent(PhysicsCollider);
			capsule.addComponent(PhysicsCollider);
            cone.addComponent(PhysicsCollider);

            var sphererigid:Rigidbody3D = sphere.addComponent(Rigidbody3D);
            var cuberigid:Rigidbody3D = cube.addComponent(Rigidbody3D);
            var cylinderrigid:Rigidbody3D = cylinder.addComponent(Rigidbody3D);
            var capsulerigid:Rigidbody3D = capsule.addComponent(Rigidbody3D);
            var conerigid:Rigidbody3D = cone.addComponent(Rigidbody3D);

            sphererigid.colliderShape = new SphereColliderShape(1);
            cuberigid.colliderShape = new BoxColliderShape(2,2,2);
            cylinderrigid.colliderShape = new CylinderColliderShape(1,2);
            capsulerigid.colliderShape = new CapsuleColliderShape(0.5,2);
            conerigid.colliderShape = new ConeColliderShape(0.5,2);
			//添加一个地板
			var floor:MeshSprite3D = scene.addChild(new MeshSprite3D(new PlaneMesh(100,10))) as MeshSprite3D;
			//给地板添加物理组件
			var floorCollicar:PhysicsCollider = floor.addComponent(PhysicsCollider);
			// 添加collidershape
			floorCollicar.colliderShape = new BoxColliderShape(100,0,10);
            //给地板一个角度
            floor.transform.rotate(new Vector3(0,0,0.5),false);


            //材质相关
			var material:BlinnPhongMaterial = new BlinnPhongMaterial();
            Texture2D.load("res/layabox.png", Handler.create(null, function(tex:Texture2D):void {
                material.albedoTexture = tex;
            }));
            sphere.meshRenderer.material = material;
			cube.meshRenderer.material = material;
			cylinder.meshRenderer.material = material;
            capsule.meshRenderer.material = material;
            cone.meshRenderer.material = material;
        }
    }
}
```


이번 사건에서 간단히 5가지 기하체를 사용했을 뿐, 구체적인 효과는 그림:

![图](img/1.gif)

###3. 내보내는 물체에 강체 또는 충돌기 추가

**내보내면 강체가 필요하다면 충돌기가 좋다**

#####(1) 내보내는 물체대 강체와 충돌기, 직접 사용할 수 있다

#####(2) 내보내는 물체는 충돌기와 강체가 없다면 물리 구성 요소를 추가해야 한다

여기서 저희가 사용한 격자 충돌함.


```javascript

//////读取导出的lh文件
		Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
				//获取你需要素材
                var cube:MeshSprite3D = sp.getChildAt(0) as MeshSprite3D;
                cube.transform.translate(new Vector3(0,3,0));
                scene.addChild(cube);
                var cubeCollider:PhysicsCollider = cube.addComponent(PhysicsCollider);
				//网格触发器
                var cubeShape:MeshColliderShape = new MeshColliderShape();
				//通过导出的网格来获取shape
                cubeShape.mesh = cube.meshFilter.sharedMesh as Mesh;
				//如果不需要刚体
				//cubeCollider.colliderShape = cubeShape;
				//需要刚体
                var cubeRigid:Rigidbody3D = cube.addComponent(Rigidbody3D);
                cubeRigid.colliderShape = cubeShape;

		}));
```


#####(3) 내보내는 물체에 충돌기가 있다면, 수요가 강체를 추가한다

두 가지 처리 방법이 있다. 하나는 격자 충돌함, 둘째는 충돌함에서 충돌 상자를 가져와 강체에 덧붙여 준다.그러나 이 두 가지 방법은 모두 충돌기 위의 충돌곽을 제거해야 한다.두 번째 방법은 같은 충돌상자를 동시에 충돌기와 강체에 넣지 않도록 주의해야 한다.


```javascript

	//方法一
      Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
                var cube:MeshSprite3D = sp.getChildAt(0) as MeshSprite3D;
                cube.transform.translate(new Vector3(0,3,0));
                scene.addChild(cube);
				//移除之前的碰撞盒
                var cubeCollider:PhysicsCollider = cube.getComponent(PhysicsCollider);
                cubeCollider.colliderShape = null;
				//添加刚体与碰撞盒
                var cubeRigid:Rigidbody3D = cube.addComponent(Rigidbody3D);
                var cubeShape:MeshColliderShape = new MeshColliderShape();
                cubeShape.mesh = cube.meshFilter.sharedMesh as Mesh;
                cubeRigid.colliderShape = cubeShape;
        }));

	///方法二		
	Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
                var cube:MeshSprite3D = sp.getChildAt(0) as MeshSprite3D;
                cube.transform.translate(new Vector3(0,3,0));
                scene.addChild(cube);
                var cubeCollider:PhysicsCollider = cube.getComponent(PhysicsCollider);
                var cubeRigid:Rigidbody3D = cube.addComponent(Rigidbody3D);
				//获取到之前的碰撞盒
                var cubeShape:ColliderShape = cubeCollider.colliderShape;
                cubeCollider.colliderShape = null;
                cubeRigid.colliderShape = cubeShape;
            }));
```


추가 후 효과 보기:

![图](img/2.gif)

##### 