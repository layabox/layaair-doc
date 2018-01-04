## LayaAir3D mouse interaction

### Mouse interaction overview

In the LayaAir2D engine, 2D display objects have mouse events for us to use, writing logic is simple and convenient. In the LayaAir 3D engine does not achieve this function, 3D space is more complex, display objects in space depth, distance, stacking, cutting, father son relationship, and the space is constantly changing. Therefore, the 3D engine uses a collision device, layer and physical ray detection, collision information in the way of mouse judgment, let us first to understand their concepts and functions.



#### Collider

Collider is a physical component that can be added to a 3D display object and is mainly used for collision detection of objects in 3D space. According to the shape of the 3D display object, it is also divided into different types.

The LayaAir3D engine now supports three types of colliders : **SphereCollider**，**BoxCollider**，**MeshCollider**. From **Collision Detection Accuracy** and **Consumption Performance** Low to High SphereCollider-BoxCollider-MeshCollider; Choose the appropriate collider that your game development needs.

Here's how to add a collider component to a 3D display object:

Tips：The collider must be added to the MeshSprite3D type display object and cannot be added to the Sprite3D object, otherwise it will fail.

```java
/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//添加Mesh碰撞器组件并获取
var meshCollider:MeshCollider=meshSprite3d1.addComponent(MeshCollider);
//设置mesh碰撞器网格属性（否则无法被检测）
meshCollider.mesh=meshSprite3d1.meshFilter.sharedMesh;
//添加球形碰撞器组件并获取
var sphereCollider:SphereCollider = meshSprite3d2.addComponent(SphereCollider);
//设置球形碰撞器中心位置
sphereCollider.center = meshSprite3d2.meshFilter.sharedMesh.boundingSphere.center.clone();
//设置球形碰撞器半径
sphereCollider.radius = meshSprite3d2.meshFilter.sharedMesh.boundingSphere.radius;
//添加盒形碰撞器
var boxCollider:BoxCollider =meshSprite3d3.addComponent(BoxCollider);
boxCollider.setFromBoundBox(meshSprite3d3.meshFilter.sharedMesh.boundingBox);
		
```

At the start of the engine 1.7.12 and the export plug-in 1.7.0 version, the Collider added to the 3D model in Unity can be exported and the engine is automatically loaded to create. However, the export of MeshCollider is not supported for the time being, and the function will be improved in the subsequent version.

In Unity, after adding BoxCollider and SphereCollider to the model, it can also set up the size of collision box or collision ball according to the requirement. The collision box can be smaller or larger than the actual model, and the location can also be changed, which is convenient for developers to process logically.

Tips: in the Unity editor, a 3D object can support multiple colliders, but the LayaAir export plug-in (1.7.0 version) currently supports only the first collision exporter, which is the developer's attention. If we want to add multiple colliders on the model, we can decompose it into multiple sub mesh models when making models, and add bumper to detect each sub grid model. In the subsequent 1.7.13 version, we will support multiple collisions derived from 3D objects without submeshes.


#### Layer

There are 32 layers in the default scenario, and you can choose to throw the 3D sprite in any layer. On the camera, the camera can be trimmed according to the hierarchy; **used in collision detection to control which layer to collide, and what layer does not collide**。

Here's how to specify the 3D sprite layer:

```java
		//指定3D精灵的层
		meshSprite3d1.layer = Layer.getLayerByNumber(10);
		meshSprite3d2.layer = Layer.getLayerByNumber(13);
		
```



#### Ray

Ray is a data type, not a display object. It has the attributes of origin and direction.

In the game, because the view space is constantly changing, in order to simulate the position of the mouse in the 3D space, the LayaAir3D engine provides the camera Camera method of creating rays, which produces a ray perpendicular to the screen.

The camera creates a ray method as follows:

```java
      //射线初始化（必须初始化）
      var ray:Ray = new Ray(Vector3.ZERO,Vector3.ZERO);
      //获取鼠标在屏幕空间位置
      var point:Vector2 = new Vector2();
      point.elements[0] = Laya.stage.mouseX;
      point.elements[1] = Laya.stage.mouseY;
      //摄像机产生射线方法，通过2D座标获取与屏幕垂直的一条射线
      camera.viewportPointToRay(point, ray);
		
```



#### Physical ray detection

When we were in the scene 3D display object created colliders, they set up (the default layer in the zeroth layer), and creates a ray, we can detect whether the intersection of physical ray, developers can own logic judgment according to requirements, such as the rat, and to create a standard pickup.

The physical ray detection we use the Physics physical, it provides us with two methods, the first method for collision detection to obtain the information of collision (rayCast), and obtain the collision detection (rayCastAll) for all collision information, they are static method, the developer can choose to use according to the demand, such as API (Figure 1)

 ![图1](img/1.png)<br>（Picture 1）



#### Collision information RayCastHit

The collision information of ray detection must be initialized before detection. If the ray intersects the 3D display object, the information of intersection object, intersection space position and intersected triangle vertex can be obtained from the RayCastHit attribute of collision information.

Sprite3D is the intersection of the 3D display object, if there is no intersection object is null.

Position is the spatial location of the point where the ray intersects the model.

The trianglePositions property is the array of vertices on the intersecting triangle. Of course, there must be a premise that the type of the collider must be MeshCollider, otherwise the vertex position attribute is 0.



### Example of mouse pick up

According to the above concepts and methods, we will make an example of mouse picking, according to the following steps:

1. Create several 3D objects in the scene, take three cars as an example, build the scene through unity and export it.

2. Setting up an instance of the Scene, and the scenario script control class SceneScript, and adding the script with addScript () when loading the scene.

3. Overwrite the script's `_start()` method, set the layer, create rays, collision information, and add a collider to the 3D item in the scene.

4. Rewrite scene rendering post-processing `_postRenderUpdate()` method (also can use frame cycle method), in the method to update the created ray, you can draw a vector reference line according to the ray origin to observe, and determine whether the ray and 3D objects intersect.

Tips: you can also use the script update method `_update()`, but the drawing reference line will not see the reference line of the mouse click position after the model. So we use the rendering method `_postRenderUpdate()`. It means that after rendering the scene, we will draw the vector reference line.

5. Adding a mouse click event, if you click the mouse and intersect with the 3D object, then we let the 3D object disappear and prompt access to information.

All the code is as follows:

```java
package
{
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.display.Stage;
	import laya.display.Text;
	import laya.events.Event;
	import laya.utils.Handler;

	public class LayaAir3D_MouseInteraction
	{
		/**提示信息文本框**/
		public static var txt:Text;
		
		public function LayaAir3D_MouseInteraction()
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			
			//加载3D资源
            Laya.loader.create(["LayaScene_collider3D/collider3D.ls",
                            "LayaScene_truck/truck.lh",
                            "LayaScene_box/box.lh"],Laya.Handler.create(this,this.onComplete));
			
			//创建信息提示框
			txt=new Text();
			txt.text="还未获得汽车！！";
			txt.color="#ff0000";
			txt.bold=true;
			txt.fontSize=30;
			txt.pos(100,50);
			Laya.stage.addChild(txt);			
		}
		
		private function onComplete():void
		{
			//添加3D场景
			var scene:Scene = Laya.loader.getRes("LayaScene_collider3D/collider3D.ls");
			Laya.stage.addChild(scene);
			//为场景添加控制脚本			
			scene.addScript(SceneScript);
		}
	}
}
```


The script class SceneScript code is as follows:

**Tips: from the 1.7.10 version, update method and rendering of the scene itself (lateRender) postprocessing method was canceled, but the scene increases the script component control function, so it can pass through the script component in the final rendering method of executing _postRenderUpdate () to achieve the mouse drawing reference line.**


```java
package
{
	
	import laya.d3.component.Script;
	import laya.d3.component.physics.BoxCollider;
	import laya.d3.component.physics.MeshCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.ComponentNode;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.PhasorSpriter3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.render.RenderState;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Ray;
	import laya.d3.math.Vector2;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.utils.Physics;
	import laya.d3.utils.RaycastHit;
	import laya.events.Event;
	import laya.events.MouseManager;
	import laya.webgl.WebGLContext;
	
	public class SceneScript extends Script
	{
		private var scene:Scene;
		/**3D摄像机**/
		private var camera:Camera;
		/**用于鼠标检测的射线**/
		private var ray:Ray;
		/**画矢量线的3D显示对象**/
		private var phasorSprite3D:PhasorSpriter3D;
		/**碰撞信息**/
		private var rayCastHit:RaycastHit;	
		
		
		/**鼠标点击创建的3D对象**/
		public static var box:Sprite3D;
		/***获得的物品***/
		private var nameArray:Array=[];
		
		public function SceneScript()
		{
		}
		
		/**
		 * 覆写3D对象加载组件时执行的方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function _load(owner:ComponentNode):void
		{
			//获取脚本所属对象
			scene=owner as Scene;
		}
		
		/**
		 * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
		 */	
		override public function _start(state:RenderState):void
		{
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			camera= new Camera( 0, 0.1, 1000);
			camera.transform.position = new Vector3(1,7,10);
			camera.transform.rotate(new Vector3(-30,0,0),false,false);
			//加载到场景
			scene.addChild(camera);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			//创建一条射线
			ray = new Ray(new Vector3(),new Vector3());
			//创建矢量3D精灵
			phasorSprite3D = new PhasorSpriter3D();
			//创建碰撞信息
			rayCastHit =new RaycastHit();
			
			
			//为场景中3D对象添加组件
			for(var i:int=scene.numChildren-1;i>-1;i--)
			{
				var meshSprite3D:MeshSprite3D=scene.getChildAt(i) as MeshSprite3D;
				//添加网格型碰撞器组件
				var boxCollider:BoxCollider=meshSprite3D.addComponent(BoxCollider);
              	//为盒形碰撞器设置盒子大小（否则没有尺寸，无法被射线检测）
                boxCollider.setFromBoundBox(meshSprite3D.meshFilter.sharedMesh.boundingBox);
			}
			
			//鼠标点击事件回调
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
		}
				
		/**
		 * 渲染的最后阶段执行
		 * @param	state 渲染状态参数。
		 */		
		override public function _postRenderUpdate(state:RenderState):void
		{

			//根据鼠标屏幕2D座标修改生成射线数据 
//			camera.viewportPointToRay(new 	Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);		
			camera.viewportPointToRay(new Vector2(MouseManager.instance.mouseX,
                                                  MouseManager.instance.mouseY),ray);
			
			//射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
			Physics.rayCast(ray,rayCastHit,300);			
			
          	//画参考线-----------------------------------------------------
			//摄像机位置
			var position:Vector3=new Vector3(camera.position.x, 0, camera.position.z);
			//开始绘制矢量3D精灵，类型为线型
			phasorSprite3D.begin(WebGLContext.LINES, camera);
			//根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
			phasorSprite3D.line(ray.origin, new Vector4(1,0,0,1), position , new Vector4(1,0,0,1));
			//结束绘制
			phasorSprite3D.end();
		}
		
       	/**
		 * 鼠标点击拾取
		 */
		private function onMouseDown():void
		{
			//如果碰撞信息中的模型不为空,删除模型
			if(rayCastHit.sprite3D)
			{
				//从场景中移除模型
				scene.removeChild(rayCastHit.sprite3D);
				//将模型名字存入数组
				nameArray.push(rayCastHit.sprite3D.name);
				//文件提示信息
				LayaAir3D_MouseInteraction.txt.text="你获得了汽车"+
                  							rayCastHit.sprite3D.name+"!，现有的汽车为："+nameArray;
				//销毁物体(如不销毁还能被检测)
				rayCastHit.sprite3D.destroy();
			}	
		}
	}
}
```



Compile the code, you can get the following effect (Figure 2), click the mouse to get the car, and remove the car model from the scene.

 ![图2](img/2.gif)<br>（Picture 2）



### Create object by mouse

In the game, we also often use the mouse to control the placement of game items, such as the formation of games, placed in the ground building, role, props and so on.

The mouse placed objects and picking objects roughly the same method, also need to use Collider, ray, ray detection, collision information and other 3D elements and methods.

When creating objects, click the model ray and intersect it, we can get the click position through the collision information rayCastHit.position, and then place the created objects here. And when we create things, we use cloning, and developers pay attention to it.

In the example we used in picking up the box Collider in BoxCollider, create a sample we use a mesh Collider MeshCollider, it can obtain more accurate intersection triangles vertex model, method for rayCastHit.trianglePositions, according to the vertex position we can draw it for observation!

The reference code is as follows:

```java
package
{
	import laya.d3.component.physics.MeshCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.display.Stage;
	import laya.display.Text;
	import laya.events.Event;
	import laya.utils.Handler;

	public class LayaAir3D_MouseInteraction
	{
		/**自定义场景**/		
		private var gameScene:GameScene;
		/**提示信息文本框**/
		public static var txt:Text;
		
		public function LayaAir3D_MouseInteraction()
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			
			//加载3D资源
			Laya.loader.create([{url:"LayaScene_truck/truck.lh"},
								{url:"LayaScene_box/box.lh"}],Handler.create(this,onComplete));
			
			//创建信息提示框
			txt=new Text();
			txt.text="还未装载货物！";
			txt.color="#ff0000";
			txt.bold=true;
			txt.fontSize=30;
			txt.pos(100,50);
			Laya.stage.addChild(txt);			
		}
		
		private function onComplete():void
		{
			//创建3D场景
			var scene:Scene=new Scene();
			//初始化场景（摄像机、碰撞相关对象、添加碰撞器等）
			Laya.stage.addChild(scene);
			//为场景添加控制脚本
			scene.addScript(SceneScript);
			
			//创建货车模型，加载到场景中
			var truck3D:Sprite3D=Laya.loader.getRes("LayaScene_truck/truck.lh");
			gameScene.addChild(truck3D);
			//获取货车的车身（车头不进行装货）
			var meshSprite3D:MeshSprite3D=truck3D.getChildAt(0).getChildByName("body") as MeshSprite3D;
          	//添加网格型碰撞器组件
          	var meshCollider:MeshCollider=meshSprite3D.addComponent(MeshCollider);
          	//为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
         	boxCollider.mesh=meshSprite3D.meshFilter.sharedMesh;
		}
	}
}
```

The scene script control class code is modified as follows:

```java
package
{
	
	import laya.d3.component.Script;
	import laya.d3.component.physics.BoxCollider;
	import laya.d3.component.physics.MeshCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.ComponentNode;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.PhasorSpriter3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.render.RenderState;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Ray;
	import laya.d3.math.Vector2;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.utils.Physics;
	import laya.d3.utils.RaycastHit;
	import laya.events.Event;
	import laya.events.MouseManager;
	import laya.webgl.WebGLContext;
	
	public class SceneScript extends Script
	{
		private var scene:Scene;
		/**3D摄像机**/
		private var camera:Camera;
		/**用于鼠标检测的射线**/
		private var ray:Ray;
		/**画矢量线的3D显示对象**/
		private var phasorSprite3D:PhasorSpriter3D;
		/**碰撞信息**/
		private var rayCastHit:RaycastHit;	
		
		
		/**鼠标点击创建的3D对象**/
		public static var box:Sprite3D;
		/***获得的物品***/
		private var nameArray:Array=[];
		
		public function SceneScript()
		{
		}
		
		/**
		 * 覆写3D对象加载组件时执行的方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function _load(owner:ComponentNode):void
		{
			//获取脚本所属对象
			scene=owner as Scene;
		}
		
		/**
		 * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
		 */	
		override public function _start(state:RenderState):void
		{
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			camera= new Camera( 0, 0.1, 1000);
			camera.transform.position = new Vector3(1,7,10);
			camera.transform.rotate(new Vector3(-30,0,0),false,false);
			//加载到场景
			scene.addChild(camera);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			//创建一条射线
			ray = new Ray(new Vector3(),new Vector3());
			//创建矢量3D精灵
			phasorSprite3D = new PhasorSpriter3D();
			//创建碰撞信息
			rayCastHit =new RaycastHit();
	
			
			//鼠标点击需要创建的物品，用于克隆使用（货车上的货物）
			box=Laya.loader.getRes("LayaScene_box/box.lh");
			//鼠标点击事件回调
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
		}		
		
		/**
		 * 渲染的最后阶段执行
		 * @param	state 渲染状态参数。
		 */		
		override public function _postRenderUpdate(state:RenderState):void
		{
			//根据鼠标屏幕2D座标修改生成射线数据 
//			camera.viewportPointToRay(new Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);
			
			camera.viewportPointToRay(new Vector2(MouseManager.instance.mouseX,
                                                  MouseManager.instance.mouseY),ray);
			
			//射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
			Physics.rayCast(ray,rayCastHit,300);			
			
          	//画参考线-----------------------------------------------------
			//摄像机位置
			var position:Vector3=new Vector3(camera.position.x, 0, camera.position.z);
			//开始绘制矢量3D精灵，类型为线型
			phasorSprite3D.begin(WebGLContext.LINES, camera);
			//根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
			phasorSprite3D.line(ray.origin, new Vector4(1,0,0,1), position , new Vector4(1,0,0,1));
			
			//如果与物品相交,画三面边线
			if(rayCastHit.sprite3D)
			{ 
				//从碰撞信息中获取碰撞处的三角面顶点
				var trianglePositions:Array= rayCastHit.trianglePositions;
				//矢量绘制三角面边线
				phasorSprite3D.line(trianglePositions[0], new Vector4(1,0,0,1), 
                                    trianglePositions[1], new Vector4(1,0,0,1));
				phasorSprite3D.line(trianglePositions[1], new Vector4(1,0,0,1), 
                                    trianglePositions[2], new Vector4(1,0,0,1));
				phasorSprite3D.line(trianglePositions[2], new Vector4(1,0,0,1),
                                    trianglePositions[0], new Vector4(1,0,0,1));
			}			
			//结束绘制
			phasorSprite3D.end();
		}		
		
		/**
		 * 鼠标放置
		 */
		private function onMouseDown():void
		{
			//如果点击时有相交的3D物体，则创建物体
			if(rayCastHit.sprite3D)
			{
				//克隆一个货物模型 
				var cloneBox:MeshSprite3D=Sprite3D.instantiate(box).getChildAt(0) as MeshSprite3D;

			    //添加网格型碰撞器组件
          		var meshCollider:MeshCollider=meshSprite3D.addComponent(MeshCollider);
          		//为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
         	 	meshCollider.mesh=meshSprite3D.meshFilter.sharedMesh;	
                            
				scene.addChild(cloneBox);
				//修改位置到碰撞点处
				cloneBox.transform.position=rayCastHit.position;
				
				//更新提示信息
				nameArray.push(cloneBox.name);
				LayaAir3D_MouseInteraction.txt.text="您在货车上装载了 "+nameArray.length+" 件货物!";
			}
		}
	}
}
```


The code is compiled and run, and we can see that objects can be created by clicking on the mouse (Figure 3), and when the ray intersects the model, it shows the triangle at the intersection of the model.

![图3](img/3.gif)<br>（Picture 3）
