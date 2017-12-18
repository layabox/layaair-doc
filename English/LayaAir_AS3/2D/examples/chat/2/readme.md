# Graphic mixed chat room client (on)

### Simple client requirement analysis

In the last lesson, we explained the course of developing webSocket chat server with AS3, which we began to study on the client side. First of all, the need to sort out, clear ideas! (Figure 1) 

![img](img/60.png)<br/>（Picture 1） 

According to mind map analysis, the contents of the client include the main class (socket connection and process management), login interface, chat interface, expression interface and chat dialogue bar. Some of the contents include the production of UI interface and the realization of program logic. Reference diagrams and logic are as follows:

Login interface
Game player nickname input, and according to the user list sent by the server to check whether the duplicate name; click the refresh button to customize avatars; click the OK button on the chat interface and login to the server to send information.

 ![img](img/6.png)<br/>（Picture 2）

Chat main interface
The user inputs the content to be sent, and the content may include the selected emoticon; click the send button, the client sends the data to the server; the client receives the chat message broadcast by the server, and generates a chat dialog of the text and text to be displayed in the chat box.

![img](img/7.png)<br/>（Picture 3）

Facial expression selection interface
Click on the expression and generate the expression logo into the chat interface input box. In this statement, the resources used are all the original developers, this example is only for research and learning, source and resources do not use.

![img](img/8.png)<br/>（Picture 4）



### Create a project and connect to the WebSocket server

Open the LayaAir IDE, create a new empty project, select the type ActionScript3.0 project, project name ChatClient. Then import the project through Flash Buider (Flash Buider environment configuration see "Technical Documentation -2D Basics"). The new ChatClient.as class inherits from the laya engine's Sprite class and is set as the default application.

![img](img/9.png)<br/>（Picture 5）

We first initialize the engine in the class and establish the socketInit () method, which is connected to the port number of the server erected in the last class through the IP.

LayaAir engine socket browser webSocket package, be careful not to use the Flash version of the Socket, or compile error.

After the socket was instantiated, we monitored three events:

Event.OPEN，Monitor whether the server is connected, and the connection triggers the event.

Event.MESSAGE，If the message is heard, the message is received and the data is triggered, further logical processing can be made according to the data.

In the server setup course, we talked about the chat room mainly using three kinds of messages, the login message, the dialogue message and the user's nickname list message. The login message is received by the server, so we only recognize the "dialogue message" and "the user's nickname list message" when the client receives the message event.

Event.ERROR，Monitor whether the connection is wrong, after the error, the connection will be broken, can be used as a broken network hint.

The specific code is as follows

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

Run the server in cmd node, and then we compile and run the client, we can see the server cmd console display output: “A player is online ! ”。

In the Google browser page running on the client, press F12 to open debugger. We can see that we have received the "user list" message, because no other user has logged in, and he has not sent the login message to the server, so the user list is empty.

![img](img/90.png)<br/>（Picture 6）



### Create a visual interface

After the server can connect successfully, we begin to make the chat client UI interface, including the login, chat, and expression selection interface.

First, we import the resources in LayaAir IDE, and we copy the fine arts resources into the ...\ChatClient\laya\assetsdirectory and refresh them in the IDE. You can see that three folders are included, UI resources are stored in chat, face is a chat expression, and icon_head is the user's head image (Figure 7).

Note: because the expression and image of the image need to be used in a graphic mix, so it can not be packaged into an atlas. Right click on the folder, click on the default property settings, and select "do not pack" in the pop-up "directory properties settings" interface.

![img](img/91.png)<br/>（Picture 7）

Interface production here we simply introduce, no detail guidance! For the detailed tutorial, please refer to the "technical document - LayaAir IDE".

In the project manager, the new Login.ui is built, and the type is the Dialog dialog box (with a pop-up animation effect). Drag into the corresponding components and resources from chat into the results shown below (Figure 8). Variable names are selected for the selected controls. The names of VaR variables are txt_warning, txt_name, icon_head, btn_head and btn_ok. They will generate global public variables after publishing.

![img](img/92.png)<br/>（picture 8）



In the project manager, the new Chat.ui is built, and the type is View page. Drag into the corresponding components and resources from chat into the results shown below (Figure 9). The variable names are in order:icon_head、txt_name、chatPanel、chatInfo、btn_face、btn_send。

![img](img/93.png)<br/>（picture 9）



In the project manager, a new chatFace.ui is built, dragged from the chat into the expression picture, and eventually converted to the List component to achieve the effect shown in the following figure (Figure 10). The VaR variable is named faceList.

![img](img/94.png)<br/>（picture 10）



The shortcut key F12 is released, and the project is viewed under code mode. The UI folder is generated in the project. There are three UI display classes: ChatUI.as, ChatFaceUI.as and LoginUI.as. In these three classes, we must not directly add logical codes, and we can implement logic in their derived classes, because if we modify the interface in IDE, we will overwrite the original class when we republish it, and the logic code before it will disappear.



### Login interface function

The main function of login interface is to select names and select avatars for the client, and send "login message" to the server. After receiving the server, the user list and nickname list will be updated. The new LoginView.as is inherited from LoginUI.

The concrete logic is as follows:

1. Check the same method

First, the online nickname list is obtained from the server side, and then it is judged by the inputted nickname.

Note: when the client and server are just connected, the client mirroring in the server is not nickname. After the login message is assigned, the assignment is resolved, and the list of nicknames is sent to all users. As a result, you can see that when the first user is connected, the list of nicknames sent by the server is empty.

Duplicate detection: through the frame of the focus of judgment on the nickname input, focus that are input, do not perform duplicate detection; when the focus is lost that input, perform duplicate checks, such as repetition, display a warning.

2. The function of head changing is relatively simple, which is equivalent to the round selection of the head picture, the head information is kept on the client side, and each chat message is sent with this information.

3. Send the login message. Message body format: {"login":"","name":ChatClient.clientName}; The name is empty or the same, or no socket connection cannot login and send messages, and display a warning message.

The code is as follows:

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



To compile and run the customer service end code, we can see that the login interface has been displayed, and the name and switch head image function is normal. Take the nickname after click the login button, because no duplicate names, so submit messages and close the interface. In Google browser, press F12 to open debugger. We can see that "login information" has been sent out and received the reply of the server on the console. New user nicknames list and welcome message (Figure 11).



![img](img/95.png)<br/>（Picture 11）



