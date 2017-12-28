# Graphic chat room WebSocket server

　　LayaAir engine at the beginning of the design, although mainly used for game client development, but with the prevalence of nodejs, plus the final file compiled by LayaAir js language. Then use LayaAir support AS, TS language development server is also a very good choice, it allows our client programs can also be developed before and after the end! Into a full stack of engineers. And ES5 process-oriented wording has become more and more difficult to maintain, with object-oriented language development is even more important.

​	In this case we use AS3.0 language to develop a set of graphic chat room, which includes the development of front and back-end tutorial. This lesson we first explain to AS3.0 to develop nodejs WebSocket chat server course, and compile with layaAir generate nodejs run server code.



### Download and install nodejs

　　If you have not install it yet, you need from the official website [https://nodejs.org/en/](https://nodejs.org/en/) download a  stable version of nodejs. Then basic all the way next installation on the trip. Installation is complete, open cmd input `node -v` If the corresponding version information is displayed to indicate the installation is successful (Figure 1).Details on nodejs here is not elaborated, you can refer to nodejs network API documentation to understand http://nodejs.org/api/

  ![img](img/1.png)<br/>（Picture 1）



### Download the nodejs server WS module

When developing an instant messenger server, the websocket module of the node server needs third party modules. Here we choose the WS module (the developer can change into the third party module that is familiar).

Open cmd, enter the directory where you want to store WS, and enter `npm install ws `enter. We can see the following tips (Figure 2). This shows that we downloaded successfully, we downloaded to the E directory under the tools directory, download the generated directory named: node_modules, which includes the WS and other documents.

![img](img/2.png)<br/>（Picture 2）



### New server project

In the Flash Builder, a new Actionscript project named GameServer, and modify the startup class GameServer.as, remove the code inherited Sprite, server-side run in node, so do not need to inherit the display class.
````java
package
{
	/**
	 *聊天室服务器 
	 */	
	public class GameServer
	{
		public function GameServer()
		{
			
		}
	}
}
````
Compile and run with LayaAir, you can see in the bin_debug generated under the H5 directory and the corresponding JS file. Copy the directory node_modules generated when we download and install ws to the H5 directory for the server program call.


### AS3 call nodejs native module method

In nodejs, there are more modules, such as WS, events, and OS that will be used in this lesson (details refer to nodejsAPI), and must be imported when JS needs to be used. The native JS calls the webSocket method for reference to the following code:

```
// 导入WebSocket模块:
const WebSocket = require('ws');
// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const wss = new WebSocketServer({ port: 3000});
```

In the code above, the webSocket module is imported through the require () method, and then instantiated. So how can we use AS3.0 compiled LayaAir language?

Observe the following code, we use LayaAir support AS3 language method `__JS__()`, it can be imported using the native js method, import and generate classes (or objects), and then can be instantiated.

```
		/***导入nodeJs原生WebSocket模块中的Server***/
		const WebSocketServer:Object = __JS__("require('ws').Server");
		
		//创建服务器，端口号设置为8999
		const server:Object = new WebSocketServer({ port: 8999 });
```
```
		//导入nodejs原生os系统操作模块
		var os:Object =__JS__("require('os')")
		
		//获得网络接口列表。
		var ifaces:Object = os.networkInterfaces();
```

In this lesson, all of us need to use the native js method, are used `__JS__()`。



### Chat server set up

#### Server requirement analysis

After completing the nodejs server preparation and understanding how AS3 calls the JS native method, we start the official setup of the chat server. First, a brief analysis of the requirements (Figure 3).

1. The main class GameServer, the establishment of socket server, identify the IP address of the machine, and listen to the client connection.

2. Room type, used to manage the connection client, including the client to join, leave, broadcast, client list updates, etc..

3. Client class, each connected to a client, the server will generate a long connection mirror, send and receive messages.

![img](img/3.png)<br/>（Picture 3）

#### GameServer main class

The main class is relatively simple, import the WS module for the establishment of the server, and import the OS module to detect the server's hardware network, IP information, etc.. And monitor whether there is client connection, connect to generate a mirrored socket client Client.

The method of adding JS native bind (this) into the monitoring listener, because we don't use the LayaAir engine, we need to join the JS native method binding domain, otherwise the global object in the method can not be found.

The main class logic code is as follows:

```
package
{
	public class GameServer
	{
		/**新建一个聊天房间 ***/		
		private var room:Room = new Room();
		
		/***导入第三方ws原生WebSocket服务器模块***/
		private const WebSocketServer:Object = __JS__("require('ws').Server");
		
		/***webSocket服务器***/
		private var server:Object;
		
		public function GameServer()
		{
			///创建服务器，端口号设置为8999
			server = new WebSocketServer({ port: 8999 });
			trace("启动服务器,端口号:"+8999);
			trace("服务器IP地址为:"+IP);
			//服务器监听客户端连接事件(需加js原生的作用域绑定bind(this))
			server.on('connection',connectionHandler.bind(this));
		}
		
		/**
		 * 有客户端连接成功
		 * @param webSocket 连接时会分配一个客户端的webSocket镜像
		 */		
		private function connectionHandler(webSocket:Object):void
		{
			trace("有玩家上线了！！！")
			//新的客户端连接服务器，创建client类
			var client:Client = new Client(webSocket);
			//添加到房间
			room.addUser(client);
		}
		
		/**
		 * 获取本机的ip地址 
		 */		
		private function get IP():String
		{
			//导入nodejs原生os系统操作模块
			var os:Object =__JS__("require('os')")
			//获得网络接口列表。
			var ifaces:Object = os.networkInterfaces();
			//本机IP地址
			var ip:String= '';
			//遍历网络接口,获得本机ip地址
			for (var dev:String in ifaces)
			{
				//有多种接口，包括物理地址、IP地址等
				var info:Object=ifaces[dev]
//				trace(info)
				for(var i:String in info)
				{
					if (ip === '' && info[i].family === 'IPv4' && !info[i]["internal"])
					{
						ip = info[i].address;
						return ip;
					}
				}
			}
			return ip;
		}
	}
}
```





#### management Room

The main function of the client management, the general chat room creates a lot of this room, such as "group" is equivalent to the room, a group is more than one room, in this lesson we just set up a room, the students can be extended on this basis.

In addition to the general needs of the room, such as the new room, leave the room, receive information needs, we should pay attention to the following logic:

1. The client nickname list clientNames is mainly used for the client to detect duplicate and update the list of users to use.

2. The nodejs event launcher module EventEmitter is introduced into the room class for event monitoring and data transfer. It is more efficient at the server level than the event in the LayaAir engine, so it is recommended to use native.

3. Before writing the logic code, it needs to format the message and unify the front and back sides. It is suggested to create the message class separately to manage it.
There are few messages in this class, which are divided into three kinds: login message, chat message (including system message) and user list message, so the message class is not established yet.

Room Class code is as follows:

```
package
{
	/**
	 *客户端房间管理 
	 * @author CHENZHENG
	 * 
	 */	
	public class Room
	{
		/***所有客户端的连接 */		
		public var clients:Array = [];
		/***所有客户端昵称列表**/
		public var clientNames:Array=[];
			
		/***原生nodejs的事件发送模块***/		
		public var EventEmitter:Object =__JS__("require('events').EventEmitter");
		
		/**webSocket事件发送者***/
		public var eventEmitter:Object=new EventEmitter();
		
		/****定义一个简单的消息体（注：-1为系统头像）****/
		public var msgData:Object ={"name":"","head":-1,"data":""};
		
		public function Room()
		{
			//监听消息产生事件(js原生的作用域绑定bind(this))
			eventEmitter.on("message",onMessage.bind(this));
			//监听离开房间事件(js原生的作用域绑定bind(this))
			eventEmitter.on("leaveRoom",removeUser.bind(this));
		}
		/**
		 * 添加新连接的客户端 
		 */		
		public function addUser(client:Client):void
		{
			//加入一个客户端
			this.clients.push(client);
			//客户端消息事件对象，用于发送消息
			client.eventEmitter=this.eventEmitter;
			
			//给新客户端发送在线用户列表（用于判断是重名和更新用户列表）
			var msgClients:Object={"clients":this.clientNames}
			//发送用户列表
			client.webSocket.send(JSON.stringify(msgClients))
		}
		/**
		 *移除房间用户 
		 */		
		private function removeUser(client:Client):void
		{
			//查找离开的客户端昵称索引
			var index:int=clientNames.indexOf(client.clientName);
			//如果找到
			if(index!=-1)
			{
				//删除离开的客户端昵称
				clientNames.splice(index,1);
			}
			
			//查找客户端索引
			var index1:int = this.clients.indexOf(client);
			//如果找到
			if(index1!=-1)
			{	
				//删除离开的客户端
				this.clients.splice(index1,1);
				//离开消息提示
				trace("系统消息:"+client.clientName+"离开了房间！");
				msgData.name ="系统";
				msgData.head=-1;
				msgData.data = "“"+client.clientName+"”离开了我们的房间！！";
				//系统广播离开消息
				this.broadcast(JSON.stringify(msgData));
			}
			
			//更新用户昵称列表
			updateClientNames();
		}
		
		/**
		 *接收到消息
		 */
		private function onMessage(msg:Object):void
		{
			//接收的消息分为两类：登录用户昵称消息，对话消息
			//如果是刚连接的消息,更新客户端名称，并发出欢迎消息
			if(msg.hasOwnProperty("login"))
			{
				//连接提示消息
				msgData.name="系统";
				msgData.head=-1;
				msgData.data ="欢迎“"+msg.name+"”加入我们的房间！！";
				this.clientNames.push(msg.name);
				//更新用户昵称列表（向所有人广播）
				updateClientNames();
			}else//否则直接使用对话消息
			{
				//直接生成对话消息体
				msgData.name = msg.name;
				msgData.head=msg.head;
				msgData.data = msg.data;
			}
			
			//系统广播对话消息或欢迎消息
			this.broadcast(JSON.stringify(msgData));
		}
		
		/**
		 * 广播消息 
		 * @param msg 发送的消息字符串
		 */		
		public function broadcast(msg:String):void
		{
			//获取客户端总数
			var len:int = this.clients.length;
			var client:Client;
			//遍历所有客户端并发送消息
			for(var i:int = 0;i<len;i++)
			{
				client =this.clients[i];
				client.webSocket.send(msg);
			}
		}
		/**
		 * 新增用户昵称并广播给所有人
		 * @param clientName 新增的用户昵称
		 */		
		public function updateClientNames():void
		{
			//用户列表信息
			var msgClients:Object={"clients":this.clientNames};
			//广播给所有客户端
			broadcast(JSON.stringify(msgClients));
		}
	}
}
```



#### class Client

After the current end is connected to the server, the server generates a front-end client mirror, which has the same socket as the front end, and the message is received and sent between the two brothers. Therefore, the Client class is used to monitor message events and client disconnect events, and then notify the room to process subsequent logic.

Class Client code is as follows:

```
package
{
	/**
	 *服务器端被连接时产生的客户端镜像 
	 * @author CHENZHENG
	 */	
	public class Client
	{
		/***客户端镜像socket**/
		public var webSocket:Object;
		/***原生nodejs事件发送者***/
		public var eventEmitter:Object;
		/***连接的客户端名称***/
		public var clientName:String="";
		/***消息体（注：-1为系统头像）***/
		private var  msgData:Object ={"name":"","head":-1,"data":""};
		
		public function Client(webSocket:Object)
		{
			//socket实例
			this.webSocket = webSocket;			
			//客户端消息监听(需加js原生的作用域绑定bind(this))
			this.webSocket.on("message",messageHandler.bind(this));
			//客户端断开监听(需加js原生的作用域绑定bind(this))
			this.webSocket.on("close",closeHandler.bind(this));
		}
		/**
		 * 接收客户端发送过来消息 
		 * @param msg
		 */		
		public function messageHandler(msg:String):void
		{
			//消息转化成obj
			var obj:Object=JSON.parse(msg);
			//更新客户端名称
			this.clientName=obj.name;
			//客户端有消息到,相当于layaAir引擎中的事件发送，可带数据
			eventEmitter&&eventEmitter.emit("message",obj);
		}
		/**
		 * 客户端断开连接 
		 */		
		public function closeHandler():void
		{
			//发送客户端离开消息
			eventEmitter&&eventEmitter.emit("leaveRoom",this);
		}
	}
}
```



### Compile and run server

When the server has been set up, the code is compiled! Open the cmd，and enter the *bin-debug/h5* directory. **node** runs our compiled *GameSever.max.js* file, and you can see that the server is already running (Figure 4).

![img](img/4.png)<br/>（Picture 4）



Of course, in cmd  running debugging is not very convenient, if you encounter code errors, but also can not interrupt point debugging, so it is recommended that students download the  Visual Studio Code   to run the server, support code view query and breakpoint debugging! (Fig 5)

![img](img/5.png)<br/>（Picture 5）

This lesson ends here, the code above has a logical problem and can be tested.

