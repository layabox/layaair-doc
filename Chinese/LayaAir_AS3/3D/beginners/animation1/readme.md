## LayaAir3D之动画一

目前LayaAir3D引擎针对动画部分作了大量的调整，虽对老版本动画进行了保留，但建议开发者们使用新的动画组件方式。新版动画Animator组件整合了老版动画的几种类型，不用分类去创建，节省了开发时间，它包括了骨骼动画、材质动画、刚体动画、摄像机动画等。

Animator动画组件支持unity导出的动画，骨骼动画模型在导入unity后可以进行整合编辑，材质动画、刚体动画可直接在unity中编辑，然后导出使用。



### 角色骨骼动画

游戏角色蒙皮骨骼动画在3D游戏中有大量的运用，可将角色动画模型导入unity中编辑，然后导出到LayaAir中使用。

#### unity中动画编辑步骤

1、导入模型。在unity资源管理器中，右键导入（Import New Assets）FBX格式模型资源、贴图资源，并将模型拖拽至场景中，调整好材质贴图并保存，本例中保存场景名为“monkey”。

2、创建动画控制器。在unity资源管理器中，右键点开菜单创建（Create）动画控制器（Animator Controller）,并根据动画取名，本例中取名为"monkeyAction"。

3、编辑动画控制器。双击打开动画控制器，视图区会出现动画控制器编辑界面；点开导入的模型右侧“小三角”，其中“播放标志”文件为模型的动画文件，默认名为“Take 001”，拖拽它至动画控制器编辑界面（图1），保存完成。

![图片1](img/1.png)<br>

（图1）

4、绑定动画控制器。选择场景中的角色模型，将角色动画控制器赋予到选中模型的动画组件上（图2），如无动画组件，需增加，否则导出的动画不能播放。

![图片2](img/2.png)<br>（图2）

经过以上步骤，我们完成了角色动画在unity中的编辑，点击unity中运行按钮，这时我们就可以看到动画播放了。如果动画播放没有问题，就可以按之前“unity插件工具使用”教程方法导出LayaAir所需资源。

**Tips：其他的动画在unity中处理方式也一致，都需要以下步骤：场景模型上添加动画组件——创建动画控制器——将动画加入动画控制器中——动画控制器添加入模型的动画组件中。**



#### LayaAir中角色动画的实现

导出后的资源拷贝到项目h5目录下，通过代码加载角色资源，创建后将自动播放动画并循环（图3），参考代码如下

```java
package {
	import laya.d3.component.Animator;
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.utils.Stat;

	public class LayaAir3D_Animator
	{
		public function LayaAir3D_Animator() 
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//预加载角色动画资源
			Laya.loader.create("monkey/monkey.lh",Handler.create(this,onModelOK),null,Sprite3D);
		}		
		
		private function onModelOK():void
		{
			//添加3D场景
			var scene:Scene = new Scene();
			Laya.stage.addChild(scene);
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 1000);
			//加载到场景
			scene.addChild(camera);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -25, 0, 0), false, false);
			//移动摄像机位置
			camera.transform.position=new Vector3(0, 5, 10);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			//添加蒙皮动画角色模型
			var role3D:Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
          	//加载到场景
			scene.addChild(role3D);
		}
	}
}
```

![动图3](img/3.gif)<br>（图3）



#### 角色动画的控制与分解

**获取动画组件**

通过上面的示例，我们看到动画自动播放了，动画包括了几个动作，那么怎么控制动画的播放呢？首先需要获取模型上的动画组件，然后才能通过它控制播放、停止等。

LayaAir 3D引擎的3D模型Sprite3D类提供了getComponentByType()方法来获取模型上的组件。带动画的模型在加载创建时引擎默认赋予了Animator动画组件，因此我们可以获取它，参考以下代码。

打开.lh文件查看，动画组件绑定在模型的子对象上，因此使用了"getChildAt(0)"，通过它获取子对象模型。然后通过getComponentByType(Animator)方法获取动画组件

```java
	//获取角色动画组件
	var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;
```

**Tips：有时候在.lh或.ls文件中，存在着多个父子层级关系，动画组件不可能都在第一层级上，可能是每二层，可能是第三层。因此在获取动画组件之前，可以打开.ls或.lh查看有动画组件模型的层级关系，然后通过getChildAt()、或getChildByName()等方法获取模型后，再获取动画组件。否则程序会报错！！**



**播放控制**

有了动画组件后，怎么只播放其中一个动作呢？有两种方法实现对动作的控制与切换。

1、播放动画帧方式。

上例中，在unity中并未对动画进行拆分，我们使用了模型的默认动画Take 001，插件只导出了一个.lani格式的动画解析文件。

因此控制播放其中某段动画，需要设置播放方法的“开始帧”与“结束帧”方式实现。

查看Animator动画组件中play()方法，具体方法参数如下：

```java
		/**
		 * 播放动画。
		 * @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
		 * @param	loop 是否循环播放。
		 * @param	playbackRate 播放速率。
		 * @param	startFrame 开始帧率。
		 * @param	endFrame 结束帧率.-1表示为最大结束帧率。
		 */
	play(name:String=null,loop:Boolean=true,playbackRate:Number=1.0,startFrame:int=0,endFrame:int=-1)
```

修改示例中的代码如下：

```java
		......
          
			//添加蒙皮动画角色模型
			var role3D:Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
          	//加载到场景
			scene.addChild(role3D);
			//获取角色动画组件
			var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;
			//播放控制器中某个动画(播放第0帧到34帧的站立呼吸动画)
			ani.play(null,true,1,0,34);
		}
	}
}
```

编译运行后效果如下，只循环播放了0-34帧的站立动画。

![动图4](img/4.gif)<br>（图4）



2、播放动画片段（动画剪辑）名方式

unity中可以对动画进行分段，并对剪辑的片段取名。 导出的资源在控制时，可通过名称进行动画切换，方便开发者们使用。（这种方式在资源导出时增加了动画解析文件，以致增加Http访问次数，使用哪种方式开发者们可根据情况自行考虑）

unity中动画片段分段方法如下：

1)、在“资源管理器”中选择模型文件，在右侧inspector界面中选择Animations，出现了默认的动画Take 001，可点击编辑自定义名称，点击加号增加动画片段，及修改片段的起始与结束帧（图5）。

Tips：如需在游戏中动画循环播放，请勾选下图中“Loop Time"选项。

![图5](img/5.png)<br>（图5）

在本示例中一共4个动作，根据美术提供的动画帧数，修改增加成4个动画片段（图6）。

![图6](img/6.png)<br>（图6）

2)、修改完成后在资源管理器模型中也会增加相应的动画文件，因此还需修改动画控制器，将新生成的动画片段加入动画控制器中，否则无法导出完整的动画资源解析文件（图7）。

![图7](img/7.png)<br>（图7）

完成上列步骤后，重新导出，导出的资源里也生成了4个.lani动画解析文件。

修改示例代码，运用播放动画名方式，效果如（图8）。

```java
		......
          
			//添加蒙皮动画角色模型
			var role3D:Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
          	//加载到场景
			scene.addChild(role3D);
			//获取角色动画组件
			var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;			
			//监听默认动画完成后播放站立动画
			ani.on(Event.COMPLETE,this,onAniComplete,[ani]);
			//播放攻击动画
			ani.play("attack");
		}
		/***当前动画播放完成后回调***/
		private function onAniComplete(ani:Animator):void
        {
            //切换站立动画
			ani.play("stand");
        }
	}
}
```
![图8](img/8.gif)<br>（图8）


