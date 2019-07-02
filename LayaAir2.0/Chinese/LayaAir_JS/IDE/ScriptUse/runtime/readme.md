# runTime的使用

在LayaAirIDE中资源面板下所有的组件均有runtime的属性，runtime是该组件运行时的逻辑类；相同组件可使用同一runtime类来实现相同的功能，比如不同页面上需要对相同的组件实现同一功能。**需要注意的是组件的runtime逻辑类如果不继承组件自身，并且继承的对象中没有该组件的属性时，这个属性则会失效。**


**本篇文章将对两个不同页面中的Image组件设置同一个runtime逻辑类来实现相同的功能，运行效果如动图0所示：**

![0](img\0.gif)(图0)

### 一、给页面中的组件设置runtime类

在页面管理目录下创建两个scene场景，分别叫MonkeyPage和BGPage，接下来我们在src目录下创建一个game包，在game包中创建一个ImageRunTime类,然后两个scene中各拖入一张Image组件设置runtime属性为game.ImageRunTime(将脚本拖拽到runtime的script图标上)。如图1,2,3所示： （注意！导出类型为分离模式，会生成场景代码文件，默认不会生成)

![1](img\ide1.png)(图1)

![1](img\ide3.png)(图2)

![2](img\ide2.png)(图3)

设置完成之后保存导出UI，开始编写逻辑代码。



### 二、代码逻辑处理

切换到代码模式下，

接下来我们在src目录下创建一个game包，在game包中创建一个ImageRunTime类，创建之后实例化UI页面则不会报错，如图4所示：

![4](img\4.png)(图4)

然后在ImageRunTime类中编写我们想要实现的效果，比如实现一个点击缩放（类似按钮）的功能，全部代码如下所示：

```typescript
export default class ImageRunTime extends Laya.Image{
	constructor(){
			super();
			this.scaleTime = 100;
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
		}
       scaleBig()
        {		
            //变大还原的缓动效果
            Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
        }
        scaleSmall()
        {	
            //缩小至0.8的缓动效果
            Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
        }
}
```

在主运行类中实例化这两个UI界面，代码如下所示：

```typescript
import GameConfig from "./GameConfig";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded() {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	}
}
//激活启动类
new Main();

```

在编辑模式下按f9 在设置面板的中的引擎预览栏目里，将启动场景设置为mainscene

![5](img\ide5.png) 

最终运行效果如图0所示



### 三、如果runtime逻辑类继承的对象非自身组件

在以上代码中我们演示了继承自身组件Image所实现的效果，如果继承一个Button组件类会出现什么情况呢？我们来操作看下。代码以及实现效果如下所示：

```typescript
export default class ImageRunTime extends Laya.Button{
	constructor(){
			super();
			...
		}
	...
	...
	...
```

![5](img\5.gif)(图5)

这时我们会发现UI页面上的资源显示的很怪异，这时因为按钮的skin默认是三态的，当Image的runtime逻辑类继承自Button组件后，它就不再是一个Image组件了，而是一个Button组件。