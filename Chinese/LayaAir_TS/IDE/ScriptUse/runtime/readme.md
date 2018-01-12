# runTime的使用

在LayaAirIDE中资源面板下所有的组件均有runtime的属性，runtime是该组件运行时的逻辑类；相同组件可使用同一runtime类来实现相同的功能，比如不同页面上需要对相同的组件实现同一功能。**需要注意的是组件的runtime逻辑类如果不继承组件自身，并且继承的对象中没有该组件的属性时，这个属性则会失效。**

**runTime脚本与扩展脚本类似，不同的是runtime不能对组件添加新的属性。推荐使用扩展脚本**

**本篇文章将对两个不同页面中的Image组件设置同一个runtime逻辑类来实现相同的功能，运行效果如动图0所示：**

![0](img\0.gif)(图0)

### 一、给页面中的组件设置runtime类

在页面管理目录下创建两个UI页面，分别叫MonkeyPage和BGPage。两个UI页面中各拖入一张Image组件，设置runtime属性为game.ImageRunTime。如图1图2所示：

![1](img\1.png)(图1)

![2](img\2.png)(图2)

设置完成之后保存导出UI，开始编写逻辑代码。



### 二、代码逻辑处理

切换到代码模式下，打开layaUI.max.all.ts文件之后会发现里边有报错，如下图所示：

![3](img\3.png)(图3)

这个报错不用担心，是因为项目中ImageRunTime逻辑类是需要开发者自己创建的，这里还没有创建，同时也没有game包，所以编辑器找不到，导致报错。

接下来我们在src目录下创建一个game包，在game包中创建一个ImageRunTime类，创建之后我们就会发现layaUI.max.all.ts中的报错消失了，如图4所示：

![4](img\4.png)(图4)

然后在ImageRunTime类中编写我们想要实现的效果，比如实现一个点击缩放（类似按钮）的功能，全部代码如下所示：

```typescript
module game {
    /*
    ImageRunTime逻辑类 
    */
    export class ImageRunTime extends Laya.Image{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmal);
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
		private scaleSmal():void
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
		}
    }
}
```

在主运行类中实例化这两个UI界面，代码如下所示：

```typescript
// 程序入口
class GameMain {
    constructor() {
        Laya.init(800, 700);
        //预加载资源
        Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    private onLoaded(): void {
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
new GameMain();
```

最终运行效果如图0所示



### 三、如果runtime逻辑类继承的对象非自身组件

在以上代码中我们演示了继承自身组件Image所实现的效果，如果继承一个Button组件类会出现什么情况呢？我们来操作看下。代码以及实现效果如下所示：

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

![5](img\5.gif)(图5)

这时我们会发现UI页面上的资源显示的很怪异，这时因为按钮的skin默认是三态的，当Image的runtime逻辑类继承自Button组件后，它就不再是一个Image组件了，而是一个Button组件。