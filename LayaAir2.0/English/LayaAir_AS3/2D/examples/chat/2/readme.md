#The client of mixed layout chat room (I)

###Client Simple Requirement Analysis

In the last lesson, we explained the course of developing webSocket chat server with AS3. In this lesson, we started the research of client side. First of all, the needs are sorted out and ideas are sorted out. (Fig. 1)

![img](img/60.png)<br/>（图1） 


According to Mind Map analysis, the content of client includes the main class (socket connection and process management), login interface, chat interface, expression interface, chat bar, and part of the content includes UI interface production and program logic implementation. References and logic are as follows:

Login interface
Player's nickname input, and according to the list of users sent by the server to check whether rename; click the refresh button to customize the avatar; click the confirmation button to login to the chat interface and send login information to the server.



 ![img](img/6.png)<br/> (Figure 2)

Chat main interface
Users input and send content, which can include the selected expression identification; click the send button, the client sends data to the server; the client receives the chat message broadcasted by the server, and generates a chat bar mixed with pictures and text to display in the chat box.

![img](img/7.png)<br/> (Figure 3)

Expression selection interface
Click on the selected expression to generate the expression logo into the chat interface input box. Here's a statement: All the resources used are owned by the original developer. This example is only for research and learning. The source code and resources are not commercially available.

![img](img/8.png)< br / > (Figure 4)



###Create projects and connect to WebSocket servers

Open LayaAir IDE, create an empty project, select the type of ActionScript 3.0 project, the project name is ChatClient. Then import the project through Flash Buider (see "Technical Documents - 2D Foundation Chapter" for Flash Buider environment configuration). The new ChatClient. as class inherits from the Laya engine's Prite class and is set as the default application.

![img](img/9.png)<br/> (Fig. 5)

We first initialize the engine in the class, and establish socketInit () method, which connects with the server set up in the last lesson through IP and port number.

Socket in LayaAir engine is the encapsulation of browser webSocket. Be careful not to use Flash version Socket, otherwise compilation will error.

After socket instantiation, we listened to three events:

Event. OPEN, which monitors whether to connect to the server and triggers the event after connection.

Event. MESSAGE, which monitors whether a message is received or not, triggers after receiving the message data, can be further processed according to the data.

In the course of Server Setup, we talked about three kinds of messages used in chat room: login message, conversation message and user nickname list message. The login message is received by the server, so we can only identify "conversation message" and "user nickname list message" in the event that the client receives the message.

Event. ERROR, monitor whether the connection is wrong, after the error is reported, the connection will be disconnected, you can make a disconnection prompt.

The code is as follows


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


The node runs the server in cmd, and then we compile and run the client. We can see that the output is displayed in the CMD console of the server: "Some players are online!!".

When you open the debugging tool by pressing F12 on the Google Browser page running on the client side, we can see that you have received the "User List" message, because no other user has logged in and no login message has been sent to the server, so the user list is empty.

![img](img/90.png)< br / > (Figure 6)



###Creating Visual Interface

After the server was able to connect successfully, we started to make a chat client UI interface, including login, chat, expression selection interface.

First, import resources in LayaAir IDE. We will copy the classified art resources into the \ ChatClient laya assets directory and refresh them in IDE. It can be seen that there are three folders, the chat contains UI resources, the face contains chat expressions, and the icon head contains the user's head image (Figure 7).

Note: Because facial expressions and head pictures need to be mixed with pictures and text, they can not be packaged into an atlas. Right-click on the folder, click on the default property settings, and select "Not packaged" in the pop-up "Catalog Property Settings" interface.

![img](img/91.png)<br/> (Figure 7)

Interface production here we briefly introduce, do not make detailed guidance! For detailed tutorials, please refer to "Technical Documents - LayaAir IDE Chapter".

A new Login. UI is created in the Project Manager with the type of Dialog dialog (with pop-up animation effects). Drag the corresponding components and resources from the chat to compose the effect shown in the following figure (Figure 8). The variable names of the selected controls are txt_warning, txt_name, icon_head, btn_head and btn_ok, which generate global public variables after publication.

![img](img/92.png)<br/> (Figure 8)



Create a new Chat. UI in the Project Manager, type View page. Drag the corresponding components and resources from chat to form the effect shown in the figure below (Figure 9). The VaR variable names are icon ﹣ head ﹣ TXT ﹣ name ﹣ chatpanel ﹣ chatinfo ﹣ BTN ﹣ face ﹣ BTN ﹣ send.

![img](img/93.png)<br/> (Figure 9)



Create a new chatFace. UI in the project manager, drag the emoticons from the chat and convert them into List components to achieve the effect shown below (Figure 10). The var variable is named faceList.

![img](img/94.png)<br/> (Fig. 10)



Press F12 to publish. View the project in code mode. The project generates a UI folder, which contains three UI display classes: chatui.as, chatfaceui.as and loginui.as. In these three classes, we must not add logic code directly. We can implement logic in their derived classes, because if the interface is modified in the IDE, the original class will be overwritten when redistributed, and all the logic code written before will disappear.



###Login Interface Function

The main function of the login interface is to select the name and avatar for the client and send the "login message" to the server. The server will update the list of users and nicknames when it receives it. New LoginView. as inherits from LoginUI.
The concrete logic is as follows:

1. Check the method of renaming

First, we need to get an online list of nicknames from the server, and then we can judge by the input nicknames.

Note: When the client is connected to the server, the client image in the server does not have a nickname. The assignment is resolved after the "login message" and the list of nicknames is updated and sent to all users. So you can see that after the first user connects, the nickname list sent by the server is empty.

Duplicate Name Detection: By judging the focus of the nickname input box, when there is a focus, it indicates that the input is in progress, and does not perform duplicate name detection; when the focus is lost, it performs duplicate name checking, such as duplicate name, to display warning information.

2. The function of changing the head image is relatively simple, which is equivalent to rotating the head image. The head image information is saved in the client, and this information is carried every time the chat message is sent.

3. Send login message. The message body format is {"login":"", "name": ChatClient. clientName}; the name is empty or renamed, or no socket connection can not log in and send messages, and display warning information.

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




Modify the main class ChatClient. as, add the user nickname list, user nickname, Avatar number, and login interface instance and other attributes. Load resources and instantiate the login interface. Note: connect the socket after the instance display interface, otherwise some logic errors will be reported after the message is received, and the object is empty.

The modified main class code is as follows:


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




Compiling and running the customer service code, we can see that the login interface has been displayed, and the function of naming and switching the avatar is normal. After the nickname is taken, click the login button, because there is no rename, so the message is submitted and the interface is closed. When you open the debugging tool by pressing F12 under Google Browser, you can see on the console that "login information" has been sent and received a response from the server - a new list of user nicknames and welcome messages (Figure 11).



![img](img/95.png)<br/> (Fig. 11)



