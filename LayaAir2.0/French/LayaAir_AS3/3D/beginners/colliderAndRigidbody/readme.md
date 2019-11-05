#Collider and Rigid

L 'ajout d' un corps de collision et d 'un corps rigide à l' entrée simple est décrit dans ce chapitre.

2.0 Le collisionneur 3D est physicscollider.Le Corps rigidbody3d est rigidbody3d.

Pour créer une collision, il faut ajouter un rigidbody et un collisionneur à l 'objet de jeu, ce qui permet à l' objet de se déplacer sous l 'effet physique.L 'objet de collision est une catégorie d' éléments physiques qui doivent être ajoutés à l 'objet de jeu avec le corps rigide pour déclencher la collision.En cas de collision entre deux corps rigides, le moteur physique calcule la collision à moins que les deux objets ne soient en collision et, dans la simulation physique, les corps qui n 'ont pas de collision se traversent l' un l 'autre.

Conditions nécessaires à la collision d'un objet: les deux objets doivent être munis d'un collisionneur (physicscollider) et l'un d'eux doit également être muni d'un rigidbody3d.

Collision Box: Collider Shape, is a model Box for Physical operation and collision in 3D World.

###Ajout de collimateurs et de corps rigides

Nous allons d 'abord créer une petite balle simple et ajouter un collisionneur et un rigide à la balle.


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

Différents modèles sont simplement nécessaires pour créer des Mess et collidershape différents.**Attention à ne pas ajouter de shape sur un corps rigide et un collisionneur en même temps.**Le diagramme suivant est l 'effet de la balle.

![图](img/1.png)

###Cas simples

Après avoir appris à ajouter un collisionneur et un rigide, on peut créer une scène simple pour tester cette partie de la fonction.

Pour synchroniser la collision avec l 'affichage, il faut un modèle identique à la boîte de collision.

#####Catégorie principale:


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


#####Catégorie de scripts:


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


En l'espèce, on n'a utilisé que cinq géométries simples, avec les effets concrets suivants:

![图](img/1.gif)

###Ajout de rigides ou de collimateurs d'objets exportés

**Si vous avez besoin de rigides pour l 'exporter, il est préférable d' avoir un collisionneur.**

#####1) Si l 'objet exporté est doté d' un rigide et d 'un collisionneur, il peut être utilisé directement

#####2) Si l 'objet exporté n' est pas muni d 'un collisionneur et d' un rigide, il faut ajouter un composant physique

C'est ici qu'on utilise la boîte d'impact de grille.


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


#####3) Si l 'objet exporté est muni d' un collisionneur, il est nécessaire d 'ajouter des rigides

Il existe deux procédés de traitement, l 'un consistant à utiliser une cartouche de collision de grille, l' autre à obtenir une cartouche de collision à partir d 'un collisionneur et à l' ajouter à un corps rigide.Toutefois, dans les deux cas, les boîtes de collision sur le collisionneur doivent être enlevées.Dans le second procédé, il faut veiller à ce que la même boîte de collision ne soit pas appliquée simultanément au collisionneur et au corps rigide.


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


Regardez les effets ajoutés ci - après:

![图](img/2.gif)

##### 