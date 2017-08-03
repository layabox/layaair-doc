## LayaAir3D之资源释放



### 为什么要资源释放

在LayaAir 3D游戏开发中，资源释放非常重要。3D资源包括了模型、贴图、材质、动画等，为了达到好的画面效果，文件会比2D大很多，而3D引擎基本所有资源都会放入GPU中进行计算渲染，因此占用很多的显存。当游戏关卡的不断加载，游戏不断深入，放入显存中的资源越来越多，如果不释放资源，那么游戏最后终将崩溃。

显存不像内存，内存有垃圾回收机制，而显存不一样，必须手动释放，因此显存的资源释放必须受到重视！

观察图1、图2中统计工具中的显存大小

图1为游戏启动后加载的第一个场景，面数为30527，占用显存85.2M。

![图1](img/1.png)<br>（图1）

图2为游戏加载的第二场景，面数只有7455，但加载后显存资源却有118.91M。这是什么原因呢？面数少，场景小，贴图其实也比图1中场景少很多，光照贴图也小很多，但显存资源却更大了！

这就是因为第一关场景并未被释放掉，它的资源还在显存中，因此显存占用变大了。如果不手动清除，游戏继续切换其他场景，当达到一定量后，手机显存将被耗光，游戏卡死、闪退、发热等现象就有频出。

![图2](img/2.png)<br>（图2）



### 加载资源时处理原则

通过上图的例子我们可以看到LayaAir3D引擎处理资源与显存的关系，为了达到游戏性能优化目的，在加载资源时也要注意一些原则。

1、加载资源时不要一次性把所有资源全部加载，只加载需要资源（分段加载模式）。3D资源加载完成后会根据资源后缀名称直接创建出3D显示对象，比如.ls会创建出Scene，.lh会创建Sprite3D对象等，创建好的对象资源哪怕是没有放到舞台上，也会直接放入显存当中，因此资源过多会占有大量显存。

2、合理管理显存，经常反复使用的资源在显存中不需要释放，而不反复使用的资源在使用完后立即释放以节省性能开销。比如主角资源，3D道具资源，玩家经常使用，可以一直存放在显存中，提取速度快；而一些大型场景，在切换时可以释放掉资源，场景关卡贴图、模型资源都较大，释放后能省几十上百兆大小的显存开销。



### 释放显存资源方法

释放显存资源有两种方法，一种是通过对象来释放显存资源，但遍历资源对象太麻烦，在此不作推荐，另一种是通过资源地址来释放显存资源，从资源管理角度上来说，通过资源地址方法更加灵活，可以配置JSON数据表来管理。

#### 切换场景和释放资源的过渡界面

在加载资源和切换场景时，我们在IDE中制作一个进度显示界面用于过渡，如图3

![图3](img/3.png)<br>（图3）

IDE发布后，编写一个控制类，逻辑代码参考如下：

```java
package view
{
	import ui.ProgressBarUI;
	
	public class AssetLoadView extends ProgressBarUI
	{
		/**资源加载进度***/
		private var progress:int=0;
		
		public function AssetLoadView()
		{
		}
		/**
		 * 初始化，进度计时
		 */	
		public function init():void
		{
			progress=0;
			//进度增加的帧循环
			Laya.timer.loop(20,this,onLoop);
		}
		/**
		 * 资源加载进度模拟（假进度）
		 */		
		private function onLoop():void
		{
			//进度增加
			progress++;
			//最高100%进度
			if(progress>100)
			{
				progress=100;
				this.tips.text="游戏加载完毕，即将进入游戏..."
				Laya.timer.clearAll();
				this.removeSelf();				
			}else
			{
				this.pro.value=progress/100;
				this.tips.text="游戏正在加载中，当前进度为："+progress+"%!"
			}
		}
	}
}
```



#### 通过资源地址表释放显存资源

在主类中，我们以鼠标双击舞台方式切换场景，使用资源地址释放显存资源的方法，并加载新场景。

通过资源路径列表方法灵活，可以通过配置表的方式，表里增加删除资源也很方便。比如美术在导出场景时，新建一个JSON表，将此场景中切换后不需要的资源路径都放到J表中，有用的资源不入表，资源就不释放，比如一些公用的NPC、道具、特效等游戏元素资源。

Tips：资源包括：场景光照贴图lightmap、材质.lmat、模型.lm、各种类型贴图.png或.jpg、动画.lani、骨骼.lav等资源。

下面我们来介绍一下资源表方法，首先在导出的资源文件目录中建立json文件并编辑需释放的路径资源，形成一个Json数组，名字与.ls文件一致，方使逻辑调用，本例中为 loveScene.json。如图5、6。

![图5](img/5.png)<br>（图5）

![图6](img/6.png)<br>（图6）

Json编辑完成后，可用检查工具检测格式是否正确。然后创建主类代码如下：

```java
package
{
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.resource.Resource;
	import laya.utils.Handler;
	import laya.utils.Stat;
	
	import view.AssetLoadView;

	/**
	 * 资源释放示例
	 */	
	public class LayaAir3D_AssetsDespose
	{
		/***3D场景****/
		private var scene:Scene;
		/***3D摄像机****/
		private var camera:Camera;
		/***3D角色****/
		private var role:Sprite3D;
		/***2D加载进度界面（假）****/
		private	var progress:AssetLoadView
		
		public function LayaAir3D_AssetsDespose()
		{
			//初始化引擎
			Laya3D.init(1334, 750 ,true);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
			//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
			Laya.stage.screenMode = "horizontal";
			//开启统计信息
			Stat.show();
			
			//加载2D资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,on2DComplete));
		}
		
		/**
		 * 加载2D资源完成回调
		 */	
		private function on2DComplete():void
		{
			//实例化加载进度页面
			progress=new AssetLoadView();
			progress.init();
			progress.loadTitle.text="资源加载与释放示例";
			Laya.stage.addChild(progress);
			
			//加载第一关场景角色3D资源(不能全部加载，否则太占显存)
			Laya.loader.create([{url:"LayaScene_loveScene/loveScene.ls"},
								{url:"LayaScene_girl/girl.lh"}],Handler.create(this,on3DComplete));
		}
		
		/**
		 * 加载3D资源完成回调 
		 */		
		private function on3DComplete():void
		{
			//实例化场景
			scene=Laya.loader.getRes("LayaScene_loveScene/loveScene.ls");
			Laya.stage.addChild(scene);
			Laya.stage.setChildIndex(scene,0);
			
			//实例化摄像机
			camera=new Camera();
			//移动摄像机位置
			camera.transform.translate(new Vector3(-1, 2, 15));
			//设置摄像机视野范围（角度） 
			camera.fieldOfView=25;	
			camera.transform.lookAt(new Vector3(-1,0,0),new Vector3(0,0,0));
			scene.addChild(camera);

			//实例化角色添加到场景
			role=Laya.loader.getRes("LayaScene_girl/girl.lh");
			scene.addChild(role);

			//双击游戏画面切换场景
			Laya.stage.on(Event.DOUBLE_CLICK,this,onChangeScene);
		}
		
		/**
		 * 加载第二关场景资源，切换场景 
		 */	
		private function onChangeScene():void
		{
			//去除双击事件监听
			Laya.stage.off(Event.DOUBLE_CLICK,this,onChangeScene);
			
			//切换场景加载界面
			progress.init();
			progress.loadTitle.text="正在切换场景，请稍后"
			Laya.stage.addChild(progress);
			
			//移除摄像机与角色
			scene.removeChild(camera);
			scene.removeChild(role);
			
			//列表释放显存资源方法（释放的资源配置表）
			assetsDispose("LayaScene_loveScene/loveScene.json");
			
			//销毁之前场景
			scene.destroy();
			
			//加载第二关场景资源到游戏中
			scene=Scene.load("LayaScene_scene02/scene02.ls");
			Laya.stage.addChild(scene);
			
			//摄像机的位置与对准目标
			camera.transform.position=new Vector3(-1, 1, 8);
			camera.transform.lookAt(new Vector3(-1.5,0.5,0),new Vector3(0,0,0));
			
			//添加摄像机与角色到新场景
			scene.addChild(camera);
			scene.addChild(role);
			role.transform.position=new Vector3(-1, 0, -3.5);
			
			//设置场景层级在最下层
			Laya.stage.setChildIndex(scene,0);
			
			//现有显存中的资源
			trace("现有显存中的资源:",Loader.loadedMap)
		}

		/**
		 * 列表释放显存资源方法(利用资源表方式，每个场景配置资源路径表)
		 * @param target3D 需要释放资源的对象资源表assetsUrl:String
		 */		
		private function assetsDispose(assetsUrl:String):void
		{
			//加载盘释放的资源配置表
			Laya.loader.load([{url:assetsUrl,type:Loader.JSON}],
                             Handler.create(this,onAssetsOK,[assetsUrl]));
		}
		
		/**加载资源释放表完成后**/		
		private function onAssetsOK(assetsUrl:String):void
		{
			//获取加载的数据（Json数组转化成数组）
			var arr:Array=Laya.loader.getRes(assetsUrl);
			for(var i:int=arr.length-1;i>-1;i--)
			{
				//根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
				var resource:Resource=Laya.loader.getRes(arr[i].url);
				//资源释放
				resource.dispose();
			}
		}
	}
}
```

观察上述代码assetsDispose(assetsUrl:String)方法，加载完配置表后，我们通过Laya.loader.getRes(arr[i].url)方法直接获取资源产生的对象（创建时会根据url后缀名产生不同的类型对象，getRes方法可直接读出来），它们都是Resource类的子类，因此对象调用dispose()方法后就可释放资源。

释放完资源后，还可通过Loader.loadeMap属性查看现有缓存中的资源。

编译运行上述代码我们可以看到图4效果，释放完成并加载新场景时，显存占用比之前小很多了。之前未释放资源时为118.91M，释放后显存只占了56.11M。

![图4](img/4.png)<br>（图4）