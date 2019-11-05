#The Use of RunTime

In LayaAirIDE, all components under the resource panel have runtime attributes, and runtime is the logical class of runtime when the component runs; the same component can use the same runtime class to achieve the same function, for example, the same component needs to achieve the same function on different pages.**It should be noted that if the runtime logic class of a component does not inherit the component itself and there are no attributes of the component in the inherited object, this attribute will fail.**

**RunTime script is similar to script script, but different from runtime script, it inherits pages, scenarios or component classes and implements logic. Setting the Runtime property of the scene in the IDE can associate with the scene or object.**

##-**Compared with script mode, inherited page class can directly use page defined attributes (defined by VAR attribute in IDE), such as this.tiplbll, this.scorelbl, with code prompt effect. The script script can only get nodes by this. owner. getChildByName ("xxx") and so on.** **Suggestion: If it is page-level logic, it needs frequent access to multiple elements in the page, using runtime inheritance writing, and if it is a small independent module with single function, it is recommended to use script scripting method. See IDE for new 2D sample project.**

**This article will set up the same runtime logic class for the image component in two different pages to achieve the same function. The effect is shown in Motion Figure 0.**

![0](img\0.gif)(Fig. 0)

###Setting up runtime classes for components on the page

Create two UI pages in the page management directory called MonkeyPage and BGPage. As follows,

Be careful!! The export type of this example is split mode, non-file mode can generate UI class scripts, default is file mode, file mode will not generate page class.

![1](img\ide1.png)

Drag an Image component into each of the two UI pages and set the runtime attribute to game. ImageRunTime. Drag the script onto the script icon of runtime. Figure 1, 2, 3 shows: (Note! The export type of this example is split mode, which generates scenario code files. The default mode is file mode. File mode does not generate code classes. If it is not a non-file mode, it can not generate new page classes.) As shown in Figure 1 and Figure 2, this example shows that:

![1](img\ide3.png)(Fig. 1)

![2](img\ide2.png)(Fig. 2)

After setting up, save the exported UI according to F12 and start writing logic code.



###2. Code Logic Processing

Switch to code mode.

Then we write the effect we want to achieve in the ImageRunTime class, such as a click-and-zoom (button-like) function. The whole code is as follows:


```typescript


    /*
    ImageRunTime逻辑类 
    */
    export default class ImageRunTime extends Laya.Image{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
        }
        private scaleBig():void
		{
			//变大还原的缓动效果
			Laya.Tween.to(this, {scaleX:1,scaleY:1},this.scaleTime);
		}
		private scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
		}
    }

```


Instantiate these two UI interfaces in the main runtime class with the following code:


```typescript

import GameConfig from "./GameConfig";
import { ui } from "./ui/layaMaxUI";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景, 如果在编辑器中制作场景就打开下面一行注释，把实例页面的代码注掉
		//GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

		 //实例化BGPageUI页面
		 var bgPage: ui.BGPageUI = new ui.BGPageUI();
		 //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
		 bgPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
		 //添加到stage
		 Laya.stage.addChild(bgPage);
		 //实例化MonkeyPageUI页面
		 var monkeyPage: ui.MonkeyPageUI = new ui.MonkeyPageUI();
		 //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
		 monkeyPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
		 //添加到stage
		 Laya.stage.addChild(monkeyPage);
		 //设置第二个页面的坐标
		 monkeyPage.x = 350;

	}
}
//激活启动类
new Main();
```


The above code is compatible with 1.0.

2.0 can also create a mainscene, drag two pages into the scene, and set the background color, as shown below.

Note: Setting the background color of the page scene is only a reference when designing the scene. Actual operation is not effective, and rect drawing on the page is required to be effective.

This method can be used in any four export modes.

![2](img\ide4.png)

Then run the project using scenario management as described in the code comment

The final operation effect is shown in Figure 0.



###3. If the object inherited by the runtime logic class is not its own component

In the above code, we demonstrate the effect of inheriting our own component image. What happens if we inherit a Button component class? Let's see how it works. The code and implementation effect are as follows:


```typescript

module game {
    /*
    ImageRunTime逻辑类 
    */
    export class ImageRunTime extends Laya.Button{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
        }
        ......
    }
}
```


![5](img\5.gif)(Fig. 5)

At this point, we will find that the resources on the UI page display very strange, because the skin of the button defaults to three-state, when the Runtime logic class of Image inherits from the Button component, it is no longer an Image component, but a Button component.

