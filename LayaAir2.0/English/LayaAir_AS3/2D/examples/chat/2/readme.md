# 图文混排聊天室之客户端（上）

### 客户端简单需求分析

上节课我们讲解了用AS3开发webSocket聊天服务器的课程，这节课我们开始客户端部分的研究。首先对需求进行整理，理清思路！（图1） 

![img](img/60.png)<br/>（图1） 

根据思维导图分析，客户端的内容包括了主类（socket连接与流程管理）、登录界面、聊天界面、表情界面、聊天对话条，部分内容包括了UI界面的制作与程序逻辑的实现。参考图与逻辑如下：

登录界面
玩家昵称输入，并根据服务器发送的用户列表检查是否重名；点击刷新按钮可自定义头像；点击确定按钮登录聊天界面并向服务器发送登录信息。

 ![img](img/6.png)<br/>（图2）

聊天主界面
用户输入发送内容，内容可包括选择的表情标识；点击发送按钮，客户端发送数据给服务器；客户端收到服务器广播的聊天消息，生成图文混排的聊天对话条显示到聊天框中。

![img](img/7.png)<br/>（图3）

表情选择界面
点击选择表情，生成表情标识到聊天界面输入框中。在此声明一下：所使用资源全部为原开发者所有，本例只做研究学习之用，源码和资源请勿商用。

![img](img/8.png)<br/>（图4）



### 创建项目并连接WebSocket服务器

打开LayaAir IDE，新建一个空项目，选择类型为ActionScript3.0项目，项目名称为ChatClient。然后通过Flash Buider导入项目（Flash Buider环境配置请看“技术文档-2D基础篇”）。新建ChatClient.as类继承于laya引擎的Sprite类，并设置为默认应用程序。

![img](img/9.png)<br/>（图5）

我们在类中首先进行引擎初始化，并建立socketInit()方法，与上节课中架设的服务器通过IP与端口号进行连接。

LayaAir引擎中的socket是浏览器webSocket的封装，注意不要使用Flash版的Socket，否则编译会报错。

在socket实例化后，我们监听了三个事件：

Event.OPEN，监听是否连接服务器，连接后触发该事件；

Event.MESSAGE，监听是否收到消息，接收到消息数据后触发，可以根据数据作进一步逻辑处理。

在服务器架设课程中我们讲到了聊天室主要用到了三种消息，登录消息、对话消息与用户昵称列表消息。登录消息由服务端接收，因此在客户端接收消息事件中我们只识别“对话消息”与“用户昵称列表消息”即可。

Event.ERROR，监听是否连接错误，报错后，连接会断开，可作断网提示。

具体代码如下

```
package
{
	
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Socket;
	import laya.webgl.WebGL;
	
	/**
	 *聊天系统客户端 
	 * @author CHENZHENG
	 * 
	 */	
	public class ChatClient extends Sprite
	{

		/***客户端webSocket****/
		public static var socket:Socket;
		
		/***是否连接上webSocket服务器****/
		public static var isConnect:Boolean=false;
		
		public function ChatClient()
		{
			//初始化引擎
			Laya.init(1280, 768,WebGL);
			//最小比例缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//自动横屏
			Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
			
			//连接服务器
			socketInit();
		}
		
		/**初始化webSocket,连接服务器*/
		private function socketInit():void
		{
			//实例化客户端socket
			socket = new Socket();
			//监听是否连接服务器
			socket.on(Event.OPEN,this,socketOpen);
			//监听服务器发送的消息
			socket.on(Event.MESSAGE,this,socketMessage);
			//监听连错误
			socket.on(Event.ERROR,this,socketError);
			
			//连接服务器
			socket.connect("10.10.20.51",8999);
			//方法2：socket.connectByUrl("ws://10.10.20.51:8999");
		}
		
		/**webSocket错误,服务器断开*/
		private function socketError():void 
		{
			//服务器连接中断
			isConnect=false;
		}
		
		/**收到webSocket消息*/
		private function socketMessage(msg:String):void
		{
			//接收消息分为两类：用户昵称列表消息，对话消息
			trace("收到消息："+msg);
			//把JSON字符串转化成object
			var obj:Object=JSON.parse(msg);
			//是否用户列表类型
			if(obj.hasOwnProperty("clients"))
			{
				trace("用户昵称列表-----"+obj.clientNames);
			}//是否聊天信息
			else if(obj.hasOwnProperty("name"))
			{
				trace("用户消息-----"+obj.name+obj.head+obj.data);
			}
		}
		
		/**webSocket已连接**/
		private function socketOpen():void
		{
			trace("服务端连接成功！")
			//服务器已连接
			isConnect=true;
		}
	}
}
```

在cmd 中node运行服务器，然后我们对客户端进行编译运行，我们可以看到在服务器cmd控制台显示输出：“有玩家上线了！！”。

在客户端运行的谷歌浏览器页面中按F12打开调试工具，我们可以看到，已收到了“用户列表”消息，因为没有其他用户登陆，自己也没有发登录消息给服务器，因此用户列表为空。

![img](img/90.png)<br/>（图6）



### 创建可视化界面

服务器可以连接成功后， 我们开始制作聊天客户端UI界面，包括了登录、聊天、表情选择界面。

首先在LayaAir IDE中导入资源，我们将分好类的美术资源拷贝到...\ChatClient\laya\assets目录中，并在IDE中刷新。可以看到包括三个文件夹，chat中存放UI资源，face中为聊天表情，icon_head中为用户头像（图7）。

注：因为表情与头像图片需用于图文混排，所以不能打包成图集。在文件夹上右键，点开默认属性设置，在弹出的“目录属性设置”界面中选择“不打包”。

![img](img/91.png)<br/>（图7）

界面制作在此我们简单介绍，不作细节指导！详细教程请查阅“技术文档—LayaAir IDE篇”。

项目管理器中新建Login.ui，类型为Dialog对话框（有弹出动画效果）。从chat中拖入相应的组件、资源组合成下图所示效果（图8）。并对选择的控件进行变量命名，var变量名依次分别为：txt_warning、txt_name、icon_head、btn_head、btn_ok，它们会在发布后生成全局公共变量。

![img](img/92.png)<br/>（图8）



项目管理器中新建Chat.ui，类型为View页面。从chat中拖入相应的组件、资源组合成下图所示效果（图9）。var变量名依次为：icon_head、txt_name、chatPanel、chatInfo、btn_face、btn_send。

![img](img/93.png)<br/>（图9）



项目管理器中新建chatFace.ui，从chat中拖入表情图片，最终转化成List组件达到下图所示效果（图10）。var变量名为faceList。

![img](img/94.png)<br/>（图10）



快捷键F12进行发布，在“代码模式”下查看项目，项目中生成了ui文件夹，里面有三个UI显示类：ChatUI.as、ChatFaceUI.as、LoginUI.as。在这三个类中，我们一定不要直接添加逻辑代码，可以在它们的派生类中去实现逻辑，因为如果在IDE中修改了界面，重新发布时会覆盖原来的类，之前写的逻辑代码会全部消失。



### 登录界面功能

登录界面主要功能是为客户端取名字及选择头像，并发送“登录消息”给服务器，服务器收到后会更新用户列表及昵称列表。新建LoginView.as继承于LoginUI。
具体逻辑如下：

1.检查重名方法

首先需要从服务器端获得在线的昵称列表，然后通过输入的昵称进行判断；

注：当客户端与服务器刚连接时，服务器中的客户端镜像是没有昵称的，有“登录消息”后才解析赋值，并更新昵称列表发送给所有用户。因此可以看到，第一个用户连接后，服务器发送过来的昵称列表为空。

重名检测：通过对昵称输入框进行焦点判断，有焦点时表示正在输入，不执行重名检测；当焦点失去说明输入完成，执行重名检查，如重名，显示警告信息。

2.换头像功能比较简单，相当于把头像图片进行轮选，头像信息保存在客户端，每次聊天消息发送时都带有此信息。

3.发送登录消息。消息体格式为：{"login":"","name":ChatClient.clientName}；名字为空或重名，或无socket连接时不能登录和发送消息，并显示警告信息。

代码如下：

```
package view
{
	import laya.events.Event;	
	import ui.LoginUI;

	/**
	 * 登录界面及功能
	 * @author CHENZHENG
	 * 
	 */	
	public class LoginView extends LoginUI
	{
		/**是否重名*/
		private var isSameName:Boolean=false;
		
		public function LoginView()
		{
			//警告暂时隐藏
			this.txt_warning.visible=false;
			//限制字符输入
//			this.txt_name.restrict="a-zA-Z\u4e00-\u9fa5";
			//监听文本输入
			this.txt_name.on(Event.INPUT,this,onInput)
			//监听输入文本框是否焦点是否离开
			this.txt_name.on(Event.BLUR,this,onIsName)
			//确定按钮监听
			this.btn_ok.on(Event.MOUSE_DOWN,this,onLogin)
			//头像刷新按钮监听	
			this.btn_head.on(Event.MOUSE_DOWN,this,onChangeHead)
		}
		
		/**修改用户头像*/
		private function onChangeHead():void
		{
			//头像编号增加
			ChatClient.headIndex++;
			//最多到编号15，否则重新开始
			if(ChatClient.headIndex>15) ChatClient.headIndex=0
			//改变玩家头像
			this.icon_head.skin="icon_head/head"+ChatClient.headIndex+".png"
		}
		
		/**正在输入文本*/
		private function onInput():void
		{
			//输入文本时警告不显示
			this.txt_warning.visible=false;
			//初始化警告文本
			this.txt_warning.text="您的昵称已被占用，请重新输入"
			//无重名
			this.isSameName=false;
		}
		
		/**检查是否重名*/
		private function onIsName():void
		{
			//名字输入框中文本
			var txt:String=txt_name.text;
			//检测是否重名
			if(ChatClient.clientNames.indexOf(txt)!=-1)
			{
				//有重名时显示警告
				this.txt_warning.visible=true;
				this.isSameName=true;
			}else
			{
				//无重名时用户取名成功
				ChatClient.clientName=txt;
			}
		}
		
		/**登录*/
		private function onLogin():void
		{
			//注：登录时如焦点从文本输入框移动直接点击按钮，引擎会先激发失去焦点事件，然后才激发鼠标事件！
			//如果有重名且未连接服务器，不允许登录
			if(isSameName||!ChatClient.isConnect) return;
			
			//如果没有用户昵称
			if(ChatClient.clientName=="")
			{
				//修改警告信息
				this.txt_warning.text="登录前必须输入用户昵称！"
				//显示警告
				this.txt_warning.visible=true;
				//退出登录 
				return;
			}
			
			//用户登录信息数据
			var  msgLogin:Object ={"login":"","name":ChatClient.clientName};
			//发送用户登录信息给服务器
			ChatClient.socket.send(JSON.stringify(msgLogin));
			//发送可以登录事件
			this.event("loginOK");
		}
	}
}
```



修改主类ChatClient.as，加入用户昵称列表、用户昵称、头像编号，及登录界面实例等属性。加载资源并实例化显示登录界面。注：先实例显示界面后再进行socket连接，否则消息收到后的部分逻辑会报错，对象为空。

修改后的主类代码如下：

```
package
{
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.net.Socket;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	import view.LoginView;
	
	/**
	 *聊天系统客户端 
	 * @author CHENZHENG
	 * 
	 */	
	public class ChatClient extends Sprite
	{
		/***登录界面****/
		private var login:LoginView;
		
		/***游戏所需资源数组****/
		private var assetArr:Array=[{url: "res/atlas/chat.atlas"}];
		/***客户端webSocket****/
		public static var socket:Socket;
		/***是否连接上webSocket服务器****/
		public static var isConnect:Boolean=false;
		
		/***用户昵称（用户昵称）****/
		public static var clientName:String="";
		/***用户昵称列表****/
		public static var clientNames:Array=[];
		/**用户头像编号*/
		public static var headIndex:int=0;
		
		public function ChatClient()
		{
			//初始化引擎
			Laya.init(1280, 768,WebGL);
			//最小比例缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//自动横屏
			Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
			
			//加载引擎需要的资源
			Laya.loader.load(assetArr, Handler.create(this, onLogin));
			
		}
		/**加载完资源，实例化登录UI*/		
		private function onLogin():void 
		{
			//实例化登录界面
			login=new LoginView();
			//弹出登录界面
			login.popup();
			//监听登录成功事件
			login.on("loginOK",this,onChatUI);
			//位置居中
			login.pos(Laya.stage.width - login.width>>1,Laya.stage.height - login.height>>1);
			
			//连接服务器
			socketInit();
		}
		
		/**登录设置成功后，打开聊天界面*/
		private function onChatUI():void
		{		
        	//关闭登录界面
			login.close();
		}
		
		/**初始化webSocket,连接服务器*/
		private function socketInit():void
		{
			//实例化客户端socket
			socket = new Socket();
			//监听是否连接服务器
			socket.on(Event.OPEN,this,socketOpen);
			//监听服务器发送的消息
			socket.on(Event.MESSAGE,this,socketMessage);
			//监听连错误
			socket.on(Event.ERROR,this,socketError);
			
			//连接服务器
			socket.connect("10.10.20.51",8999);
			//socket.connectByUrl("ws://10.10.20.51:8999");
		}
		
		/**webSocket错误,可能接服务器断开*/
		private function socketError():void 
		{
			//服务器连接中断
			isConnect=false;
			//错误提示
			login.txt_warning.text="服务器断开，无法登录！！"
			//显示提示
			login.txt_warning.visible=true;
		}
		
		/**收到webSocket消息*/
		private function socketMessage(msg:String):void
		{
			//接收消息分为两类：用户昵称列表消息，对话消息
			trace(msg)
			//把JSON字符串转化成object
			var obj:Object=JSON.parse(msg);
			//是否是用户列表类型
			if(obj.hasOwnProperty("clients"))
			{
				//更新用户昵称列表
				clientNames=obj.clients;
				trace("用户昵称列表-----"+ChatClient.clientNames);
			}//是否是聊天信息
			else if(obj.hasOwnProperty("name"))
			{
				trace("用户消息-----"+obj.name+obj.head+obj.data);
			}
		}
		
		/**webSocket已连接**/
		private function socketOpen():void
		{
			//服务器已连接
			isConnect=true;
			//警告信息不显示
			login.txt_warning.visible=false;
		}
	}
}
			
```



编译运行客服端代码，我们可以看到登录界面已经显示出来，取名和切换头像功能正常。取好昵称后点击登录按钮，因为未有重名，所以提交了消息且界面关闭。在谷歌浏览器下按F12打开调试工具，我们可以在控制台上看到“登录信息”已发出并收到了服务器的回复——新的用户昵称列表与欢迎消息（图11）。



![img](img/95.png)<br/>（图11）



