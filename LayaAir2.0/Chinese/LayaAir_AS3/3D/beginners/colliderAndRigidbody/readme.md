# 碰撞器与刚体

在简单入门中有涉及到添加碰撞体与刚体的操作，在本篇中会讲解具体的操作。

2.0中的3d碰撞器为PhysicsCollider。3D的刚体为Rigidbody3D。

要产生碰撞必须为游戏对象添加刚体（Rigidbody）和碰撞器，刚体可以让物体在物理影响下运动。碰撞体是物理组件的一类，它要与刚体一起添加到游戏对象上才能触发碰撞。如果两个刚体相互撞在一起，除非两个对象有碰撞体时物理引擎才会计算碰撞，在物理模拟中，没有碰撞体的刚体会彼此相互穿过。

物体发生碰撞的必要条件：两个物体都必须带有碰撞器(PhysicsCollider)，其中一个物体还必须带有Rigidbody3D刚体。

碰撞盒:colliderShape，是模型在3D世界中进行物理运算与碰撞的形状盒。

### 1.添加碰撞器与刚体

​	我们首先创建一个简单的小球，并且给小球加上碰撞器与刚体。

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
不同的模型只是需要创建不同的Mesh和ColliderShape。**注意不要在同时在刚体与碰撞器上添加shape**，图1就是小球的效果了。

![图](img/1.png)图1

### 2.简单案例

  	在知道如何添加碰撞器与刚体之后，可以大胆去制作一个简单的场景去测试这部分功能。

想要碰撞与显示同步，就需要模型与碰撞盒相同。

##### 主类:

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

##### 脚本类:

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

在本次案例中只是简单的使用了5种几何体，具体效果如图2:

##### ![图](img/1.gif)图2

### 3.导出的物体添加刚体或者碰撞器

**导出时如果需要带刚体，最好碰撞器**

##### 	(1)如果导出的物体带刚体与碰撞器，可以直接使用

##### 	(2)如果导出的物体不带碰撞器与刚体,需要添加物理组件

​	在这里我们使用的网格碰撞盒

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

##### 	(3)如果导出的物体有碰撞器，但是有需求添加刚体

​	有两种处理方法，一是使用网格碰撞盒，二是从碰撞器上获取碰撞盒，再加给刚体。但是这两种方法都需要将碰撞器上的碰撞盒清除。第二种方法时需要注意同一个碰撞盒不能同时加在碰撞器与刚体上。

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

看下添加后的效果：

![图](img/2.gif)

##### 