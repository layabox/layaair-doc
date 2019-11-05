#The Use of RunTime

In LayaAirIDE, all components under the resource panel have runtime attributes, and runtime is the logical class of runtime when the component runs; the same component can use the same runtime class to achieve the same function, for example, the same component needs to achieve the same function on different pages.**It is important to note that if the runtime logic class of a component does not inherit the component itself and there are no attributes of the component in the inherited object, this attribute will fail.**

**RunTime script is similar to script script, but different from runtime script, it inherits pages, scenarios or component classes and implements logic. Setting the Runtime property of the scene in the IDE can associate with the scene or object.**

***Compared with script scripting, inherited page classes can directly use page-defined attributes (defined by VAR attributes in IDE), such as this. tipLbll, this. scoreLbl, with code prompting effect.**
***Suggestion: If it is page-level logic, it needs frequent access to multiple elements in the page, using runtime inheritance writing, if it is a small independent module, single function, it is recommended to use script scripting method.**

**This article will set up the same runtime logic class for the image component in two different pages to achieve the same function. The effect is shown in Motion Figure 0.**

![0](img\0.gif)(Fig. 0)

###Setting up runtime classes for components on the page

Create two UI pages in the page management directory called MonkeyPage and BGPage. As follows,

Be careful!! This example export type is separated mode, only non-file mode can generate UI class scripts, default to file mode, file mode will not generate UI class.

![1](img\ide1.png)



Drag an Image component into each of the two UI pages, and drag the script imageRunTime into the runtime property box. As shown in Figure 1 and Figure 2:

![1](img\ide2.png)(Fig. 1)

![2](img\ide3.png)(Fig. 2)

After setting up, save the export UI and start writing logical code.



###2. Code Logic Processing

When you open the GameConfig. as class in code mode, you will find an error in it, as shown in the following figure ():

![3](img\ide5.png)(Fig. 3)

There is no need to worry about this error, because the ImageRunTime logic class in the project needs to be created by the developer himself. It has not been created here, and there is no game package, so the editor can not find it, resulting in an error.

Next we create a game package in the SRC directory and an ImageRunTime class in the game package. After creation, we will find that the error in the GameConfig class disappears, as shown in Figure 4:

![4](img\ide6.png)(Fig. 4)

Then we write the effect we want to achieve in the ImageRunTime class, such as a click-and-zoom (button-like) function. The whole code is as follows:


```typescript

package game
{
	import laya.events.Event;
	import laya.ui.Image;
	import laya.utils.Tween;
	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Image
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Event.MOUSE_DOWN,this,scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Event.MOUSE_UP,this, scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Event.MOUSE_OUT,this, scaleBig);
		}
		private function scaleBig():void
		{
			//变大还原的缓动效果
			Tween.to(this, {scaleX:1,scaleY:1},scaleTime);
		}
		private function scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
	}
}
```


Instantiate these two UI interfaces in the main runtime class with the following code:


```typescript

package {
    import laya.display.Scene;
    import laya.net.AtlasInfoManager;
    import laya.net.ResourceVersion;
    import laya.utils.Handler;
    import laya.utils.Stat;
    import laya.utils.Utils;
    import laya.d3.core.particleShuriKen.module.StartFrame;
    import laya.display.Sprite;
    import ui.BGPageUI;
    import ui.MonkeyPageUI;
    
    public class Main {
        public function Main() {
            //根据IDE设置初始化引擎      
            if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
            else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            
            //打开调试面板（IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
            if (GameConfig.debug || Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
            if (GameConfig.stat) Stat.show();
            Laya.alertGlobalError = true;
            
            //激活资源版本控制，版本文件由发布功能生成
            ResourceVersion.enable("version.json", Handler.create(this, this.onVersionLoaded), ResourceVersion.FILENAME_VERSION);
        }
        
        private function onVersionLoaded():void {
            //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
            AtlasInfoManager.enable("fileconfig.json", Handler.create(this, this.onConfigLoaded));
        }

        private function onConfigLoaded():void {
            //加载场景
            //GameConfig.startScene && Scene.open(GameConfig.startScene);

            //实例化BGPageUI页面
            var bgPage:BGPageUI = new BGPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            bgPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(bgPage);
            //实例化MonkeyPageUI页面
            var monkeyPage:MonkeyPageUI = new MonkeyPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            monkeyPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(monkeyPage);
            //设置第二个页面的坐标
            monkeyPage.x = 350;
        }
    }
}
```


The final operation effect is shown in Figure 0.



###3. If the object inherited by the runtime logic class is not its own component

In the above code, we have demonstrated the effect of inheriting its own component image. What happens if inheriting a button component class? Let's see how it works. The code and implementation effect are as follows:


```typescript

package game
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.ui.Button;
	import laya.ui.Image;
	import laya.utils.Tween;

	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Button
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
		}
		......
	}
}
```


![5](img\5.gif)(Fig. 5)

At this time, we will find that the resources displayed on the UI page are very strange. This is because the skin of the button is in three states by default. When the runtime logic class of image inherits from the button component, it is no longer an image component, but a button component.



