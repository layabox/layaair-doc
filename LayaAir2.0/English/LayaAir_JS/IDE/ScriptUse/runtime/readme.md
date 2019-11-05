#The Use of RunTime

In LayaAirIDE, all components under the resource panel have runtime attributes, and runtime is the logical class of runtime when the component runs; the same component can use the same runtime class to achieve the same function, for example, the same component needs to achieve the same function on different pages.**It should be noted that if the runtime logic class of a component does not inherit the component itself and there are no attributes of the component in the inherited object, this attribute will fail.**

**RunTime scripts inherit pages, scenarios or component classes to implement logic. Setting the Runtime property of the scene in the IDE can associate with the scene or object.**

##-**Compared with script scripting, inherited page classes can directly use page-defined attributes (defined by VAR attributes in IDE), such as this. tipLbll, this. scoreLbl, with code prompting effect.** **Suggestion: If it is page-level logic, it needs frequent access to multiple elements in the page, using runtime inheritance writing, if it is a small independent module, single function, it is recommended to use script scripting method.**


**This article will set the same runtime logic class for image components in two different pages to achieve the same function. The running effect is shown in figure 0:**

![0](img\0.gif)(Fig. 0)

###Setting up runtime classes for components on the page

Create two scene scenarios in the page management directory called MonkeyPage and BGPage. Next, we create a game package in the SRC directory, create an ImageRunTime class in the game package, and then drag an image component into each scene to set the runtime attribute to game. ImageRunTime (drag the script onto the script icon of runtime). Figure 1, 2, 3 shows: (Note! The export type is split mode, which generates scenario code files. By default, file mode does not generate scenario classes.

![1](img\ide1.png)(图1)



![1](img\ide3.png)(Fig. 2)

![2](img\ide2.png)(Fig. 3)

After setting up, save the export UI and start writing logical code.



###2. Code Logic Processing

Switch to code mode.

Next, we create a game package in the SRC directory and an ImageRunTime class in the game package. Once created, we instantiate the UI page without error, as shown in Figure 4.

![4](img\4.png)(Fig. 4)

Then we write the effect we want to achieve in the ImageRunTime class, such as a click-and-zoom (button-like) function. The whole code is as follows:


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


Instantiate these two UI interfaces in the main runtime class with the following code:


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


In editing mode, press F9 in the engine preview section of the settings panel, and set the boot scenario to main scene.

![5](img\ide5.png) 


The final operation effect is shown in Figure 0.



###3. If the object inherited by the runtime logic class is not its own component

In the above code, we demonstrate the effect of inheriting our own component image. What happens if we inherit a Button component class? Let's see how it works. The code and implementation effect are as follows:


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


![5](img\5.gif)(Fig. 5)

At this point, we will find that the resources on the UI page display very strange, because the skin of the button defaults to three-state, when the Runtime logic class of Image inherits from the Button component, it is no longer an Image component, but a Button component.