# 5. game protagonist and control

###Game character overview

​	In the last few lessons, we created UI with IDE and implemented the process management of the game and the logic function of the UI. But the most important role has not been added, according to the mind map analysis, the game role is the real core logic of the game (Figure 1). In this lesson, we will realize part of the function of the main character of the game, so that the protagonist can be manipulated.

![思维导图.png](img/1.png)<br />（Picture 1）

The production of this lesson ideas:

1. establish basic role classes, which can be classified by initialization methods, and different animations can be played according to the type of role.
2. In the main class, the protagonist is instantiated and the protagonist's control method is realized so that the protagonist can move. 
3. The leading role update method, and the border check, so that the protagonist can not move the screen outside the painting.




### The establishment of the basic role class of the game

In the SRC directory, a new role class Role.as is built, and the display class Sprite (laya.display.Sprite) is inherited.

The main logic in the role class is that:

1. The basic attributes of the role: the role type type, the blood volume HP, the speed speed.

2. The role animation object roleAni:Animation is used to play the role animations of IDE editors.
 Note: the load role atlas resources have been completed in the start page logic, so only the IDE edit animation resource gameRole.ani is loaded.

3. The role initializes the public method init (), initializes the type, blood volume, and speed of the role, and classifications of the roles.

4. Role animation playback method playAction (action:String), which can switch role type and animation state.

 The specific code is as follows ：


```
package
{
	import laya.display.Animation;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	
	/**
	 * @author CHENZHENG
	 * 角色类，飞机、敌人、子弹、道具
	 */	
	public class Role extends Sprite
	{
		/***角色的类型   “hero”:玩家飞机，“enemy”：敌人飞机、“bulle”：子弹、"ufo":道具****/
		public var type:String;
		/***角色的血量***/
		public var hp:Number=0; 
		/***角色的速度***/
		private var speed:Number=0;		
		
		/***角色的动画***/
		private var roleAni:Animation;
		/***当前动画动作***/
		private var action:String;
		
		public function Role()
		{
			//实例化动画
			roleAni=new Animation();
			//加载IDE编辑的动画文件
			roleAni.loadAnimation("GameRole.ani");
		}
		
		/**
		 * 角色初始化
		 * @param type  角色类型：“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
		 * @param hp   血量
		 * @param speed  速度
		 */		
		public function init(type:String,hp:Number,speed:Number):void
		{
			//初始化角色属性
			this.type=type;
			this.hp=hp;
			this.speed=speed;
			//加载动画对象
			this.addChild(roleAni)
			//播放默认飞行动画
			playAction("fly");
		}
		
		/**
		 * 播放动画 
		 * @param action 动画状态："fly"、"hit"、"die"
		 */	
		public function playAction(action:String):void
		{
			this.action=action;
			//播放角色动画,name=角色类型_动画状态，如：hero_fly
			roleAni.play(0,true,this.type+"_"+action);
		} 
		
}
```


When we have set up the role class, we can create the main character plane in the main class. We need to add the following logic to the main class：

1. New role layer container roleLayer is added, and all roles are loaded into it to facilitate the later implementation of role management, such as role collision logic. Of course, at the end of the game, the role layer needs to be emptied in the gameOver () method to prepare for the next game.

2.Create the protagonist global variable hero, and instantiate the protagonist in the game gameInit () method, and display it in the role layer.

3.In the game harness method gameOver (), remove the role layer. When re instantiated, all the roles will be removed to prepare for the next game.

The code reference is as follows:

```
		......
		/**角色层容器***/
		private var roleLayer:Sprite;
		/**玩家主角***/
		private var hero:Role;
		......

		/**
		 游戏中，游戏初始化
		 */
		private function gameInit():void
		{
			......
			//实例化角色层并加载到舞台(如果已实例化，不需要重新new)
			roleLayer||=new Sprite();
			Laya.stage.addChild(roleLayer)
				
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlay();			
			//加载到舞台
			Laya.stage.addChild(play);
						
			//实例化主角(如果已实例化，不需要重新new)
			hero||=new Role()
			//初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置
			hero.init("hero",10,0);
			//主角位置修改
			hero.pos(360,800);
			//角色加载到角色层中
			roleLayer.addChild(hero);
			......
		}
		
        /**
		 游戏结束
		 */
		private function gameOver():void
		{
			......
			//清空角色层子对象
			roleLayer.removeChildren(0,roleLayer.numChildren-1);
			//移除角色层
			roleLayer.removeSelf();
			......
		}
		
```



After completing the logical code, we found that the protagonist plane had been loaded on the screen and played the flight animation.



### Control of the main character of the game

In the previous《aircraft war》 game course, the finger slid, the protagonist automatically aligned the finger to follow the movement. There is an obvious inadequacy in this operation. If the player has a larger finger, the plane is blocked and is not conducive to observation. When I touch other position left fingers, the plane will teleport past, which doesn't make sense.

Therefore, I in this lesson, we will put the control input into modified finger movement and aircraft does not teleport to the fingers, but according to the direction and speed of movement of its coordinates change.

Note: LayaAir engine is independent of touch event (TouchEvent) in Flash. We can identify mouse touch operation directly by mouse event listener (MouseEvent). It also includes multitouch properties.

Because of no role death, we modified the main class gameInit () method, the analog delay 3 second game, to a delay of 30 seconds in order to lengthen the control time.

```
		//模拟游戏结束，30秒时间
		Laya.timer.once(30000,this,gameOver);
```

The other code logic is as follows:

1. Adding two attributes, moveX, moveY, is used to record the touch position of the last frame after each finger movement.

2. In the gameInit () method, it increases the stage mouse press, the mouse movement, and the mouse to lift the monitor. And monitor the mouse movement at the time of press and remove the mobile monitor when it is lifted. Of course, at the end of the game, all the stage monitor needs to be removed.

3. The position of the main character is updated in the mouse movement method onMouseMove (), and the position of the move is subtracted from the previous touch position for the current touch position.

4. Add the update method update () in the role, which temporarily only adds the lead boundary check to make it impossible to move to the outside of the screen. Later, there are other logic to join, such as the role of blood test, enemy machine beyond the border treatment, and so on.

reference code is modified in Main:

```
		......
        /**鼠标上一帧x座标** */		
		private var moveX:Number;
		/**鼠标上一帧y座标** */	
		private var moveY:Number;
		
		......
		/**
		 游戏中，游戏初始化
		 */
		private function gameInit():void
		{
			......
			//角色加载到角色层中
			roleLayer.addChild(hero);
			
			//鼠标按下监听
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
			//鼠标抬起监听
			Laya.stage.on(Event.MOUSE_UP,this,onMouseUp);
			......			
		}
		
		/**
		 按下后开始触发移动
		 */	
		private function onMouseDown():void
		{
			//鼠标按下时的位置，用于计算手指移动量
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
			//开始移动监听
			Laya.stage.on(Event.MOUSE_MOVE,this,onMouseMove);
		}
		
		/**
		 主角跟随鼠标移动
		 */	
		private function onMouseMove():void
		{
			//计算角色移动量(上一帧的位置—当前移动到的位置)
			var xx:Number=moveX-Laya.stage.mouseX;
			var yy:Number=moveY-Laya.stage.mouseY;
			//更新移动位置
			hero.x-=xx;
			hero.y-=yy;
			//更新前一帧位置的座标
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
		}
		/**
		 鼠标抬起、关闭移动监听
		 */		
		private function onMouseUp():void
		{
			Laya.stage.off(Event.MOUSE_MOVE,this,onMouseMove) ;
		}
		
		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除所有舞台事件，鼠标操控
			Laya.stage.offAll();
			......
		}
```



### Lead boundary check updated

When it was compiled and run, it was found that when the finger was moving on the screen, the plane moved, and it wouldn't run down to the finger. But the new problem appears, because the main character plane does not synchronize to the finger, so when it moves too much, the plane will fly out of the screen.

Add the border check function in the role, add the update () method, the specific code is as follows:

```
		......
		
		/**
		 * 角色更新,边界检查
		 */		
		public function update():void
		{
        	//主角边界检查
			if(this.type=="hero")
			{
				//需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
				//判断是否左右超出
				if(this.x<roleAni.width/2)
				{
					this.x=roleAni.width/2;
				}
				else if(this.x>720-roleAni.width/2)
				{
					this.x=720-roleAni.width/2;
				}
				//判断是否上下超出
				if(this.y<roleAni.height/2)
				{
					this.y=roleAni.height/2;
				}
				else if(this.y>1280-roleAni.height/2)
				{
					this.y=1280-roleAni.height/2;
				}
			}
		}
		......
```



After adding the update method in the role, the leading role update () method is called in the main class Main main loop loop (), and  to determine whether each frame is out of bounds.

```
		......
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap()
			//本局游戏数据更新
			play.update(hp,level,score)
				
			//调用主角更新，边界检查等
			hero.update();
		}

		......
```



Here, after the compilation runs, do we need the effect? The discovery of a careful student is still not reached. When the role is moved to the boundary, the part outside the center of the animation is still beyond the screen. So what is the reason for this? We clearly subtract half the width or height of the role animation while checking the border, but it doesn't work.

Add a trace to the border inspection office ("Role width high："+roleAni.width,roleAni.height)Code, after running, press the F12 shortcut to open the debug mode, and we can see that the console output is “role Width and height ：0 0”（Picture 2）。

![思维导图.png](img/2.png)<br />（Picture 2）

Even if the 7000 frame is 0,0, then what's the reason?

This is because after the animation is loaded, only a real animation is completed, and then the width and height of the animation can be obtained by obtaining the rectangular boundary of the animated object. The way we deal with it is: in the role class initialization init () method, add the role of  “animated play to finish” listening events, and set up callback method to get wide height. The code reference is as follows:

```
			......
			
			//加载动画对象
			this.addChild(roleAni)
						
			//监听动画播放完成事件
			roleAni.on(Event.COMPLETE,this,onComplete)
			//播放默认飞行动画
			playAction("fly");

		}
		
		/***动画完成后回调方法***/
		private function onComplete():void
		{
			//如果角色还未有宽，获得角色宽高	
			if(roleAni.width==0)
			{
				//获得动画矩形边界
				var bounds:Rectangle=roleAni.getBounds();
				//角色宽高赋值
				roleAni.size(bounds.width,bounds.height)
			}
		}
		
		......	
```

Add the above code to compile and run, the game protagonist gets the perfect control, no longer beyond the border!

![思维导图.png](img/3.png)<br />（Picture 1）



The revised code in this lesson is as follows：

### Main.as all the main code

```
package {
	
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	
	public class Main
	{
		/**开始页面***/
		private var start:GameStart
		/**地图页面***/
		private var map:GameMap
		/**游戏中界面***/
		private var play:GamePlay
		/**游戏结束页面***/
		private var over:GameOver
		
		/**主角血量***/
		private var hp:int=10;
		/**游戏关卡数***/
		private var level:int=1;
		/**玩家得分***/
		private var score:int=0;
		
		/**角色层容器***/
		private var roleLayer:Sprite;
		/**玩家主角***/
		private var hero:Role;
		
		
		/**鼠标上一帧x座标** */		
		private var moveX:Number;
		/**鼠标上一帧y座标** */	
		private var moveY:Number;
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart));
				
		}
		
		/**
		 资源加载完成后，加载游戏开始界面
		 */
		private function gameStart():void
		{
			//实例化开始页面
			start=new GameStart();
			//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
			start.popup();
			//监听开始游戏开始按钮事件,点击后进入游戏中
			start.btn_start.on(Event.MOUSE_UP,this,gameInit);
		}
		
		/**
		 游戏中，游戏初始化
		 */
		private function gameInit():void
		{
			//缓动动画关闭效果。IDE中页面为Dialog才可用
			start.close();
			
			//实例化地图背景页面(如果已实例化，不需要重新new)
			map||=new GameMap();
			//加载到舞台
			Laya.stage.addChild(map);
			
			//实例化角色层并加载到舞台(如果已实例化，不需要重新new)
			roleLayer||=new Sprite();
			Laya.stage.addChild(roleLayer);
				
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlay();			
			//加载到舞台
			Laya.stage.addChild(play);
						
			//实例化主角(如果已实例化，不需要重新new)
			hero||=new Role();
			//初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置
			hero.init("hero",10,0);
			//主角位置修改
			hero.pos(360,800);
			//角色加载到角色层中
			roleLayer.addChild(hero);
			
			//鼠标按下监听
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
			//鼠标抬起监听
			Laya.stage.on(Event.MOUSE_UP,this,onMouseUp);
			
			
			//模拟游戏结束，15秒时间
			Laya.timer.once(15000,this,gameOver);
			//游戏主循环
			Laya.timer.frameLoop(1,this,loop);
		}
		
		/**
		  按下后开始触发移动
		 */	
		private function onMouseDown():void
		{
			//记录鼠标按下时的位置，用于计算鼠标移动量
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
			//
			Laya.stage.on(Event.MOUSE_MOVE,this,onMouseMove);
		}
		
		/**
		 主角跟随鼠标移动
		 */	
		private function onMouseMove():void
		{
			//计算角色移动量
			var xx:Number=moveX-Laya.stage.mouseX;
			var yy:Number=moveY-Laya.stage.mouseY;
			//更新移动位置
			hero.x-=xx;
			hero.y-=yy;
			//更新本帧的移动座标
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
		}
		/**
		 鼠标抬起、关闭移动监听
		 */		
		private function onMouseUp():void
		{
			Laya.stage.off(Event.MOUSE_MOVE,this,onMouseMove) ;
		}
		
		
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap();
			//本局游戏数据更新
			play.update(hp,level,score);
				
			//如果主角未死亡，调用主角更新，边界检查
			if(hero.hp>0)
			{
				hero.update();
			}
		}

		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除所有舞台事件，鼠标操控
			Laya.stage.offAll();
			
			//移除地图背景
			map.removeSelf();
			//移除游戏中UI
			play.removeSelf();
			
			//清空角色层子对象
			roleLayer.removeChildren(0,roleLayer.numChildren-1);
			//移除角色层
			roleLayer.removeSelf();
			
			//去除游戏主循环
			Laya.timer.clear(this,loop);
			
			//实例化游戏结束页面
			over||=new GameOver();
			//游戏积分显示
			over.txt_score.text=score.toString();
			//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
			over.popup();
			//重新开始事件监听,点击后进入游戏中
			over.on("reStart",this,gameInit);
		}
	}
}
```



### The whole code of the role class Role

```
package
{
	import laya.display.Animation;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.utils.Handler;
	
	/**
	 * @author CHENZHENG
	 * 角色类，飞机、敌人、子弹、道具
	 */	
	public class Role extends Sprite
	{
		/***飞机的类型   “hero”:玩家飞机，“enemy”：敌人飞机、“bulle”：子弹、"ufo":道具****/
		public var type:String;
		/***飞机的血量***/
		public var hp:Number=0; 
		/***飞机的速度***/
		private var speed:Number=0;		
		
		/***角色的动画资源***/
		private var roleAni:Animation;
		/***当前动画动作***/
		private var action:String;
		
		public function Role()
		{
			//实例化动画
			roleAni=new Animation();
			//加载IDE编辑的动画文件
			roleAni.loadAnimation("GameRole.ani");
		}
		
		/**
		 * 角色初始化
		 * @param type  角色类型：“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
		 * @param hp   血量
		 * @param speed  速度
		 */		
		public function init(type:String,hp:Number,speed:Number):void
		{
			this.type=type;
			this.hp=hp;
			this.speed=speed;
			//加载动画对象
			this.addChild(roleAni)
			
			//监听动画完成事件
			roleAni.on(Event.COMPLETE,this,onComplete)
			//播放默认飞行动画
			playAction("fly");

		}
		
		/***动画完成后回调方法***/
		private function onComplete():void
		{
			//如果角色还未有宽，获得角色宽高	
			if(roleAni.width==0)
			{
				//获得动画矩形边界
				var bounds:Rectangle=roleAni.getBounds();
				//角色宽高赋值
				roleAni.size(bounds.width,bounds.height)
			}
		}
		
		/**
		 * 播放动画 
		 * @param action 动画状态   "fly"、"hit"、"die"
		 */	
		public function playAction(action:String):void
		{
			this.action=action;
			//播放角色动画,name=角色类型_动画状态，如：hero_fly
			roleAni.play(0,true,this.type+"_"+action);
		} 
		
		/**
		 * 角色更新,边界检查
		 */		
		public function update():void
		{
			//主角边界检查
			if(this.type=="hero")
			{
				//需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
				//判断是否左右超出
				if(this.x<roleAni.width/2)
				{
					this.x=roleAni.width/2;
				}
				else if(this.x>720-roleAni.width/2)
				{
					this.x=720-roleAni.width/2;
				}
				//判断是否上下超出
				if(this.y<roleAni.height/2)
				{
					this.y=roleAni.height/2;
				}
				else if(this.y>1280-roleAni.height/2)
				{
					this.y=1280-roleAni.height/2;
				}
			}
		}
	}
}
```
