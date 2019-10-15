#Introduction physique à layaair3d

####Démarrage rapide du voyage en physique 3D

Nous allons démarrer rapidement un projet de physique en 3D avec le moteur layaair et suivre un cours en langue as, avec une simple démonstration de code moteur pour réaliser une application physique en 3D de base.Voyons les résultats:



![图](img/easyPhysics.gif)

Dans la catégorie principale de main, nous avons construit un monde physique en 3D et ajouté les éléments nécessaires à un monde physique en 3D simple (corps rigides et composants de collisionneurs) sur ces notions que nous présenterons en détail et nous mènerons progressivement à la connaissance des 3D.



Pour ce simple demo, nous n 'avons créé que les effets physiques de la chute naturelle de la pesanteur en collision avec une autre boule, nous pouvons frapper manuellement sur le Code pour voir les effets, ou bien nous pouvons copier directement le Code, les documents ultérieurs dans le détail des points d' apprentissage.

Les codes principaux sont les suivants:


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
		
        loadComplete(){
            var _scene = new Laya.Scene3D();
            Laya.stage.addChild(_scene);
            _scene.addComponent(SceneScript);
        }
    }

//激活启动类
new Main();
```

Script de scène:

```typescript


export default class SceneScript extends Laya.Script3D{
    constructor(){
        super();
    }

    onAwake(){
        this.scene = this.owner;
    }

    onStart(){
        var camera = this.scene.addChild(new Laya.Camera( 0, 0.1, 100));

        camera.transform.translate(new Laya.Vector3(1, 6, 10));
        camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
        camera.clearColor = null;
        
        var directionLight = this.scene.addChild(new Laya.DirectionLight());
        directionLight.diffuseColor = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        var sphere = this.scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(1,100,100)));
        sphere.transform.rotate(new Laya.Vector3(0,90,0),false,false);
        sphere.transform.translate(new Laya.Vector3(0,3,0));
        sphere.meshRenderer.material = new Laya.BlinnPhongMaterial;
        var material = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex){
            material.albedoTexture = tex;
        }));
        sphere.meshRenderer.material = material;
        
        //添加物理组件
        sphere.addComponent(Laya.PhysicsCollider);
        //给球添加刚体
        var rigid = sphere.addComponent(Laya.Rigidbody3D);
        //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.SphereColliderShape(1);
        //添加一个地板
        var floor = this.scene.addChild(new Laya.MeshSprite3D(new Laya.PlaneMesh(10,10)));
        //给地板添加物理组件
        var floorCollicar = floor.addComponent(Laya.PhysicsCollider);
        // 添加collidershape
        floorCollicar.colliderShape = new Laya.BoxColliderShape(10,0,10);
        //克隆一个球                
        Laya.timer.once(1000,this,function(){
          //一秒之后复制一个球
             var cloneSphere = Laya.Sprite3D.instantiate(sphere);
            //设置位置偏移
             cloneSphere.transform.translate(new Laya.Vector3(1,4,0));
            //添加到场景
            this.scene.addChild(cloneSphere);
        });
    }
}  
 
```


Le procédé sprite.instantané de réplication d 'objets peut être compris à partir de l' API et est plus commode que le procédé Clone.Des habitudes particulières peuvent être utilisées en fonction des coutumes et des scènes personnelles.

![图](img/图1.png)		


​


  **[tip: dans le cas présent, il s'agit d'ajouter un code à un objet physicscollider et rigidbody3d.Lorsque l 'objet est rigidbody, le shape doit être ajouté au collidershape de rigidbody et, si ce n' est pas le cas, au collidershape de physicscollider.]**

Ensuite, on ajoute une force d'élasticité et de frottement.


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


Regardez les effets de la modification suivante:

![图](img/easyPhysics2.gif)