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
		* Adding collider components to 3D Wizard
		* BoxCollider    : Box type Collider
		* SphereCollider : Sphere type Collider
		* MeshCollider   : Mesh type Collider
		*/
		meshSprite3d1.addComponent(MeshCollider);
		meshSprite3d2.addComponent(SphereCollider);
		meshSprite3d3.addComponent(BoxCollider);
		
```



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

2. Adding colliders for 3D items, setting up layers, creating ray, collision information, etc..

3. Rewrite scene rendering post-processing method (also can use frame cycle method), in the method to update the created ray, you can draw a vector reference line according to the ray origin to observe, and determine whether the ray and 3D objects intersect.

4. Adding a mouse click event, if you click the mouse and intersect with the 3D object, then we let the 3D object disappear and prompt access to information.

All the code is as follows:

```java
package
{
	import laya.d3.component.physics.BoxCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.Layer;
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
	import laya.display.Stage;
	import laya.display.Text;
	import laya.events.Event;
	import laya.webgl.WebGLContext;

	public class LayaAir3D_MouseInteraction
	{
		public function LayaAir3D_MouseInteraction()
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			
			//添加3D场景
			var scene:Scene = Scene.load("LayaScene_collider3D/collider3D.ls");
			Laya.stage.addChild(scene);			
			
			//创建信息提示框
			var txt:Text=new Text();
			txt.text="鼠标未拾取3D物体！";
			txt.color="#ff0000";
			txt.bold=true;
			txt.fontSize=30;
			txt.pos(100,100);
			Laya.stage.addChild(txt);
			//获得的物品
			var nameArray:Array=[];
			
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera= new Camera( 0, 0.1, 1000);
			camera.transform.position = new Vector3(0,6,10);
			camera.transform.rotate(new Vector3(-30,0,0),false,false);
			//加载到场景
			scene.addChild(camera);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			
			//鼠标拾取相关----------------------------------------------					
			//场景加载完成后回调
			scene.on(Event.HIERARCHY_LOADED,null,function():void{
			
				//为场景中的所有3D子对象加入碰撞器
				for(var i:int=scene.numChidren-1;i>-1;i--)
				{
					var meshSprite3D:MeshSprite3D=scene.getChildAt(0) as MeshSprite3D;
					//设置3D物体在第10层（默认在第0层）
					meshSprite3D.layer=Layer.getLayerByNumber(10);
					//添加盒子型碰撞器组件
					meshSprite3D.addComponent(BoxCollider);
				}
			
				//创建一条射线
				var ray:Ray = new Ray(new Vector3(),new Vector3());
				//创建矢量3D精灵（参考线）
				var phasorSprite3D:PhasorSpriter3D = new PhasorSpriter3D();
				//创建碰撞信息
				var rayCastHit:RaycastHit=new RaycastHit();	
				
				//重写scene的渲染后处理方法lateRender()，并进行碰撞检测，绘制参考线。
				//也可以用帧循环方式，不过参考线会在模型之下，用lateRender方法可使参考线在模型之上
                //还可以创建Scene继承类，在类中覆盖重写此方法
				scene.lateRender=function(state:RenderState):void
				{
					//根据鼠标屏幕2D座标修改生成射线数据 
					camera.viewportPointToRay(new Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);
                  	//射线检测，最近物体碰撞器信息，最大检测距离为300米，只检测第10层
					Physics.rayCast(ray,rayCastHit,300,10);
                  
					//摄像机位置（参考线的另一端）
					var position:Vector3=new Vector3(camera.position.x, 0, camera.position.z);
					//开始绘制矢量3D精灵，类型为线型
					phasorSprite3D.begin(WebGLContext.LINES, camera);
					//根据射线的原点与摄像机位置绘制参考直线（矢量线并不是射线真正的路径，射线垂直于屏幕）
					phasorSprite3D.line(ray.origin, new Vector4(1,0,0,1), position , new Vector4(1,0,0,1));
					//结束绘制
					phasorSprite3D.end();
				};
				
				//鼠标点击事件回调
				Laya.stage.on(Event.MOUSE_DOWN,null,function():void{
					
					//如果碰撞信息中的模型不为空
					if(rayCastHit.sprite3D)
					{
						//从场景中移除模型
						scene.removeChild(rayCastHit.sprite3D);
						//将模型名字存入数组
						nameArray.push(rayCastHit.sprite3D.name);
						//文件提示信息
						txt.text="你获得了汽车"+rayCastHit.sprite3D.name+"!，现有的汽车为："+nameArray;
						//销毁物体(如不销毁还能被检测)
						rayCastHit.sprite3D.destroy();
					}					
				});
			});
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
	import laya.d3.component.physics.BoxCollider;
	import laya.d3.component.physics.MeshCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.Layer;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.PhasorSpriter3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.render.RenderState;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Ray;
	import laya.d3.math.Vector2;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.models.BoxMesh;
	import laya.d3.utils.Physics;
	import laya.d3.utils.RaycastHit;
	import laya.display.Stage;
	import laya.display.Text;
	import laya.events.Event;
	import laya.webgl.WebGLContext;

	public class LayaAir3D_MouseInteraction
	{
		public function LayaAir3D_MouseInteraction()
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			
			//添加3D场景
//			var scene:Scene = Scene.load("LayaScene_truck/truck.ls");
			var scene:Scene=new Scene();
			Laya.stage.addChild(scene);			
			
			//创建信息提示框
			var txt:Text=new Text();
			txt.text="还未装载货物！";
			txt.color="#ff0000";
			txt.bold=true;
			txt.fontSize=30;
			txt.pos(100,50);
			Laya.stage.addChild(txt);
			//获得的物品
			var nameArray:Array=[];
			
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera= new Camera( 0, 0.1, 1000);
			camera.transform.position = new Vector3(1,7,10);
			camera.transform.rotate(new Vector3(-30,0,0),false,false);
			//加载到场景
			scene.addChild(camera);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			
			//创建货车模型，加载到场景中
			var truck3D:Sprite3D=Sprite3D.load("LayaScene_truck/truck.lh");
			scene.addChild(truck3D);
			
			//鼠标点击需要创建的物品，用于克隆使用（货车上的货物）
			var box:Sprite3D=Sprite3D.load("LayaScene_box/box.lh");
			
			//鼠标创建相关----------------------------------------------					
			//货车加载完成后回调
			truck3D.on(Event.HIERARCHY_LOADED,null,function():void{
			
//				trace(truck3D._childs[0].getChildByName("head"),111111)
				//为货车中的所有3D子对象加入碰撞器
				for(var i:int=truck3D.getChildAt(0).numChildren-1;i>-1;i--)
				{
					var meshSprite3D:MeshSprite3D=truck3D.getChildAt(0).getChildAt(i) as MeshSprite3D;
					//添加网格型碰撞器组件
					meshSprite3D.addComponent(MeshCollider);
				}
			
				//创建一条射线
				var ray:Ray = new Ray(new Vector3(),new Vector3());
				//创建矢量3D精灵
				var phasorSprite3D:PhasorSpriter3D = new PhasorSpriter3D();
				//创建碰撞信息
				var rayCastHit:RaycastHit=new RaycastHit();	
				
				//重写scene的渲染后处理方法lateRender()，并进行碰撞检测，绘制参考线，此方法类似于帧循环。
				//渲染场景后再绘制参考线，使参考线在模型上方
				//也可以创建Scene继承类，在类中覆盖重写此方法
				scene.lateRender=function(state:RenderState):void
				{
					//根据鼠标屏幕2D座标修改生成射线数据 
					camera.viewportPointToRay(new Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);
					
					//射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
					Physics.rayCast(ray,rayCastHit,300);
					
					
					//摄像机位置
					var position:Vector3=new Vector3(camera.position.x, 0, camera.position.z);
					//开始绘制矢量3D精灵，类型为线型
					phasorSprite3D.begin(WebGLContext.LINES, camera);
					//根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
					phasorSprite3D.line(ray.origin, new Vector4(1,0,0,1), position , new Vector4(1,0,0,1));
					
					//如果与物品相交
					if(rayCastHit.sprite3D)
					{ 
						//从碰撞信息中获取碰撞处的三角面顶点
						var trianglePositions:Array= rayCastHit.trianglePositions;
						//矢量绘制三角面边线
						phasorSprite3D.line(trianglePositions[0], new Vector4(1,0,0,1), trianglePositions[1], new Vector4(1,0,0,1));
						phasorSprite3D.line(trianglePositions[1], new Vector4(1,0,0,1), trianglePositions[2], new Vector4(1,0,0,1));
						phasorSprite3D.line(trianglePositions[2], new Vector4(1,0,0,1), trianglePositions[0], new Vector4(1,0,0,1));
					}
					
					//结束绘制
					phasorSprite3D.end();
				};
				
				//鼠标点击事件回调
				Laya.stage.on(Event.MOUSE_DOWN,null,function():void{
					
					//如果碰撞信息中的模型不为空,删除模型
//					if(rayCastHit.sprite3D)
//					{
//						//从场景中移除模型
//						scene.removeChild(rayCastHit.sprite3D);
//						//将模型名字存入数组
//						nameArray.push(rayCastHit.sprite3D.name);
//						//文件提示信息
//						txt.text="你获得了汽车"+rayCastHit.sprite3D.name+"!，现有的汽车为："+nameArray;
//						//销毁物体(如不销毁还能被检测)
//						rayCastHit.sprite3D.destroy();
//					}	
					
					//如果点击时有相交的3D物体，则创建物体
					if(rayCastHit.sprite3D)
					{
						//克隆一个货物模型
						var cloneBox:Sprite3D=Sprite3D.instantiate(box);
						//为货物模型也添加碰撞器（可以在货物上继续放放置货物）
						cloneBox.getChildAt(0).addComponent(MeshCollider);
						
						scene.addChild(cloneBox);
						//修改位置到碰撞点处
						cloneBox.transform.position=rayCastHit.position;
						
						//更新提示信息
						nameArray.push(cloneBox.name);
						txt.text="您在货车上装载了 "+nameArray.length+" 件货物!";
					}
				});
			});
		}
	}
}
```

The code is compiled and run, and we can see that objects can be created by clicking on the mouse (Figure 3), and when the ray intersects the model, it shows the triangle at the intersection of the model.

![图3](img/3.gif)<br>（Picture 3）
