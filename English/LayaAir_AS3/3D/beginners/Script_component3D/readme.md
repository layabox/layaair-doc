## LayaAir3D之脚本组件



### 父类组件Component3D

在LayaAir 3D引擎中，为了方便显示对象控制及代码的维护，提供了功能强大的组件类Component3D。我们的动画控制组件、碰撞器、脚本、骨骼挂点等都是基于组件功能的延伸扩展，属于它的子类。并且，LayaAir 3D引擎还支持一个3D对象上添加多个组件，使组件控制更加灵活。

在之前的技术档中，我们介绍了动画控制组件与碰撞器组件的基本功能，在此不再多说。本章节中，**我们主要以脚本组件为示例进行讲解**，因为它继承于组件类，但几乎没有自己的扩展功能，主要使用父类Component3D属性与方法，脚本功能后续更新会增加，敬请期待！。



### 组件的主要属性与方法

**owner**：被绑定组件所属的Sprite3D对象。

**enable：**是指组件是否启用，加载组件时，默认情况下是启用状态，如果修改成fasle后，首先会发送启用更改事件，然后组件的更新方法_update()停止执行。

**_load(owner:Sprite3D)：**组件载入时执行方法，默认无代码。可在继承类中覆盖它，将需要初始化的逻辑代码放入其中。

**_start(state:RenderState)：**加载组件的3D对象实例化完成后，第一次更新时执行，默认无代码。可在继承类中覆盖它，将需要3D对象加载完成后的逻辑代码放入其中。

例如3D显示对象异步加载时就添加了脚本，它的子模型与材质还未加载完成，如果脚本中（如构造方法、`_load()`方法中）逻辑代码获取3D显示对象的子对象或贴图就会出现空对象bug。这时就可以把逻辑代码放入_start()方法中而避免空对象bug发生。

又例如克隆一个带脚本的3D对象，如果3D对象中有较多子对象，脚本克隆会先完成，如果脚本中逻辑不放入_start()方法中，去获取子对象时也会发生空对象bug。

**_update(state:RenderState)：**组件更新方法，相当于帧循环。可在继承类中覆盖它，把需要每帧更新的逻辑代码放入此方法中。



### 组件的相关事件

**COMPONENT_ADDED：**组件被加载完成事件，由组件所有者Sprite3D发送，并且组件作为参数被发送。

**COMPONENT_REMOVED：**组件被移除后事件，由组件所有者Sprite3D发送，并且组件作为参数被发送。

**ENABLE_CHANGED：**组件启用事件，启用属性enable修改后由组件发送，并且启用属性作为参数被发送。



### 脚本组件Script 

脚本继承于组件，因此可以用显示对象的addComponent()方法把脚本添加到3D显示对象上。

在官网的3D引擎示例中，很多示例的摄像机都运用到的摄像机移动脚本CameraMoveScript，摄像机添加了此脚本后，就可以通过鼠标控制它旋转及键盘控制它上下左右前后的移动，开发者们从网上下载示例后，可以找到它进行研究和修改使用。添加脚本组件方法代码如下： 

```java
//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```

当然，在某些逻辑的需要下，也可以把脚本从对象上删除，可以使用3D显示对象的removeComponentByType()方法移除脚本。

```java
//根据类型移除脚本组件
camera.removeComponentByType(CameraMoveScript);
//移除所有组件(包括动画、脚本、碰撞器等，注意，此方法不能移除子对象节点上的组件)
camera.removeAllComponent();
```



### 创建自己的脚本组件

开发者们可以参考摄像机脚本，创建自己的脚本组件用于控制场景中的对象。

在LayaAir 3D游戏开发中，我们基本都在unity中创建场景、角色、动画，导出场景并在代码中加载后，就可以对场景中不同的对象加上相应的控制脚本组件。

比如主角控制脚本、NPC控制脚本、场景物体控制脚本等，一个游戏关卡就这样诞生了，当游戏加载下一个关卡场景后，脚本还可以复用，项目维护起来方便快捷，并且控制与显示进行了分离。

下列示例中，我们修改技术文档中“快速开启3D之旅”的代码，创建一个控制脚本添加到box上，并且4秒钟后移除脚本组件。

首先创建自定义脚本BoxControlScript，用于修改脚本所属对象box的材质、循环旋转。

```java
package
{
	import laya.d3.component.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.render.RenderState;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	
	public class BoxControlScript extends Script
	{
      	/**脚本所属的3D对象***/
		private var box:MeshSprite3D;
		
		public function BoxControlScript()
		{
		}
		/**
		 * 覆写3D对象加载组件时的执行方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function  _load(owner:Sprite3D):void
		{
			//获取脚本所属对象
			box=owner as MeshSprite3D;
		}
		/**
		 * 覆写组件所属3D对象实例化完成后，第一次更新时的执行方法
		 */	
		override public function _start(state:RenderState):void
		{
			//获取模型上的材质
			var material:StandardMaterial=box.meshRender.material;
			//修改材质的反射率颜色，让模型偏红
			material.albedo=new Vector4(1,0,0,1);
		}
		
		/**
		 * 覆写组件更新方法（相当于帧循环）
		 * @param state 渲染状态
		 */	
		override public function _update(state:RenderState):void
		{
			//所属脚本对象旋转更新
			box.transform.rotate(new Vector3(0,0.5,0),false,false);
		}
	}
}
```

然后在“快速开启3D之旅”的代码中，为box添加上述脚本类型，并于4秒后去除脚本。

```java
package {
	import laya.d3.component.Script;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	
	public class LayaAir3D_Script 
	{
		public function LayaAir3D_Script() 
		{
			//初始化引擎
			Laya3D.init(0, 0,true);
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//开启统计信息
			Stat.show();
			
			//添加3D场景---------------------------------
			var scene:Scene = Laya.stage.addChild(new Scene()) as Scene;
			//添加摄像机---------------------------------
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 2, 3));
			//旋转摄像机方向（角度）
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			//设置背景颜色
			camera.clearColor = null;
			
			//添加平行光----------------------------------
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			//灯光的环境色
			directionLight.ambientColor = new Vector3(0.6, 0.6, 0.6);
			//灯光的高光色
			directionLight.specularColor = new Vector3(0.6, 0.6, 0.6);
			//灯光的漫反射颜色
			directionLight.diffuseColor = new Vector3(1.6, 1.6, 1.6);
			//灯光的方向(弧度)
			directionLight.direction = new Vector3(0.3, -1, 0);
			
			//添加自定义模型------------------------------
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
			//模型旋转方向
//			box.transform.rotate(new Vector3(0,45,0),false,false);
			//创建模型的材质
			var material:StandardMaterial = new StandardMaterial();
			//材质的漫反射贴图
			material.diffuseTexture = Texture2D.load("res/layabox.png");
			//为模型赋上材质
			box.meshRender.material = material;
			
          
			//添加自定义脚本并实例化脚本对象------------------------------------------
			box.addComponent(BoxControlScript);
            //可在添加组件时获取组件对象
         	//var boxScript:Script=box.addComponent(BoxControlScript);
          
			//添加定时4秒执行一次回调函数
			Laya.timer.once(4000,this,onLoop,[box,boxScript]);
		}
		
      	//4秒后回调函数，移除脚本组件
		private function onLoop(box:MeshSprite3D,boxScript:Script):void
		{
			//移除BoxControlScript类型脚本组件
			box.removeComponentsByType(BoxControlScript);
			//移除所有组件
//			box.removeAllComponent();
            //如不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
//          boxScript.enable=false;
		}
	}
}
```

上列代码中，如4秒后开发者们不想移除组件，只是停止使用脚本，可设置脚本启用属性为false。



编译运行上述代码，可以得到以下效果（图1）,移除组件后，模型停止旋转。

![图1](img/1.gif)<br>（图1）