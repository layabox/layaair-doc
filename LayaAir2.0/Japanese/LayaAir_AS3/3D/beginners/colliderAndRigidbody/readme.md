#衝突器と剛体

簡単な入門では衝突体と剛体の添加に関する操作がありますが、本編では具体的な操作を説明します。

2.0の3 d衝突器はPhysics Colliderである。3 Dの剛体はRigidbod3 Dです。

衝突を起こすには剛体と衝突器をゲームオブジェクトに追加しなければならず、剛体は物体を物理的に動かすことができます。衝突体は物理的なコンポーネントの一種で、剛体と一緒にゲームオブジェクトに追加すると衝突を引き起こすことができます。2つの剛体が互いに衝突すると、衝突体がある場合以外は物理エンジンが衝突を計算することができ、物理シミュレーションでは衝突体の剛体験がない。

物体が衝突するために必要な条件：2つの物体は必ず衝突器（Physics Collider）を持っていなければならず、その中の1つの物体はまだRigidbody 3 D剛体を持っていなければならない。

衝突箱：collider Shapeは、モデルが3 D世界で物理演算と衝突を行う形状の箱です。

###1.衝突器と剛体を追加する

まず簡単なボールを作成して、ボールに衝突器と剛体を加えます。


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

異なるモデルは異なるMeshとCollider Shapeを作成する必要があります。**シャープを剛体と衝突器に同時に加えないように注意してください。**次の図はボールの効果です。

![图](img/1.png)

###2.簡単なケース

衝突器と剛体を追加する方法を知ったら、大胆に簡単なシーンを作ってこの機能をテストします。

衝突と表示の同期には、衝突箱と同じモデルが必要です。

#####メインクラス:


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


#####スクリプトクラス:


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


今回のケースでは5種類の幾何学体を簡単に使用しただけで、具体的な効果は図のようです。

![图](img/1.gif)

###3.エクスポートした物体に剛体または衝突器を追加します。

**エクスポート時に剛体が必要なら、衝突器が一番いいです。**

#####（1）導出した物体が剛体と衝突器を有する場合、直接使用することができる。

#####（2）導出した物体が衝突器と剛体を持たない場合は、物理的なコンポーネントを追加する必要がある。

ここで使っているグリッドの衝突箱


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


#####（3）導出した物体に衝突器がある場合、剛体を追加する必要がある。

2つの処理方法があります。1つはメッシュ衝突箱を使用し、2つは衝突器から衝突箱を取得し、さらに剛体に加えることです。しかし、この2つの方法はいずれも衝突器上の衝突箱を取り除く必要がある。第二の方法は、同じ衝突箱が衝突器と剛体に同時に加えられないことに注意する必要がある。


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


追加した効果を見てください。

![图](img/2.gif)

##### 