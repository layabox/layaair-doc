#WebSocket Server in Mixed-Arrangement Chat Room

At the beginning of design, layaair engine was mainly used for game client development, but with the popularity of nodejs, the final file compiled by layaair was JS language. So it is also a good choice to develop server with AS and TS language supported by LayaAir. It enables our client program to develop both front and back end. Become a full stack engineer. And the process-oriented writing of ES5 has become more and more difficult to maintain, so it is more important to develop it in object-oriented language.

In this case, we use AS3.0 language to develop a set of mixed layout chat room, which includes the front and back development tutorials. In this lesson, we will first explain the course of developing nodejs WebSocket chat server with AS3.0, and compile and generate the runnable server code of nodejs with layaAir.



###Download and install nodejs

Of course, the installation of nodejs is indispensable to the development of nodejs. From official website[https://nodejs.org/en/](https://nodejs.org/en/)Download a stable version of nodejs. Then you can install next basically. After installation, open CMD input`node -v`If the corresponding version information is displayed, the installation is successful (Figure 1). The detailed information about nodejs is not described here. Please refer to the API document of nodejs Chinese website for details. The website is http://nodejs.cn/api/.



  ![img](img/1.png)<br/> (Fig. 1)



###Download node JS server-side WS module

In the development of instant chat server, the web socket module of node server needs to use the third-party module. Here we choose the WS module (developers can change into the third-party module they are familiar with).

Open cmd, enter the directory where you want to store ws, and enter`npm install ws `Enter. We can see the following hints (Figure 2). This shows that we downloaded successfully, we downloaded to the tools directory under the E disk, downloaded the generated directory named: node_modules, which includes the WS and other files.

![img](img/2.png)<br/> (Figure 2)



###New server project

Create a new Actionscript project named GameServer in Flash Builder, and modify the startup class GameServer. as to remove the code inheriting Sprite. The server runs in node, so it does not need to inherit the display class.

```<code>[CODECONTENT]</code>
<p>用LayaAir编译运行，可以看到在bin_debug下生成了h5目录及相应的js文件。将我们下载安装ws时生成的目录node_modules拷贝到h5目录中，以供服务器程序调用。</p>



<h3> AS3调用nodejs原生模块方法</h3>
<p>
在nodejs中，有较多的模块，比如在本课中会使用到的ws、events、os（详情参考nodejsAPI），js中需要使用时必须导入。原生js调用webSocket方法参考以下代码：</p>

<pre class=

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
```


In the above code, we import the webSocket module through the require () method, and then instantiate it. So how to use LayaAir compilable AS3.0 language?

Looking at the following code, we used the AS3 language method supported by LayaAir.`Java > ><br>[PRECONTENT]<br><br>`It can be imported using native JS methods, imported and generated classes (or objects), and then instantiated.


```

// 导入WebSocket模块:
const WebSocket = require('ws');
// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const wss = new WebSocketServer({ port: 3000});
```


```

		/***导入nodeJs原生WebSocket模块中的Server***/
		const WebSocketServer:Object = __JS__("require('ws').Server");
		
		//创建服务器，端口号设置为8999
		const server:Object = new WebSocketServer({ port: 8999 });
```


In this lesson, we use native JS methods everywhere`__JS__()`。



###The establishment of chat server

####Server Requirement Analysis

After completing the preparation of the nodejs server and knowing how AS3 calls the native method of js, we began to formally set up the chat server. Let's start with a brief analysis of the requirements (Figure 3).

1. GameServer, the main class, establishes a socket server, identifies the local IP address, and monitors the connection of the client.

2. Room class is used to manage connected clients, including client joining, leaving, broadcasting, client list updating, etc.

3. Client-like client, every connection to a client, the server will generate a long connection mirror for sending and receiving messages.

![img](img/3.png)< br / > (Figure 3)

####Main class GameServer

The main class is relatively simple. The WS module is imported to establish the server, and the OS module is imported to detect the IP information of the server's hardware network. It also monitors whether there is a client connection and generates a client Client with a mirror socket after the connection.

Note that the method of JS native bind (this) is added to the listening. We do not use the LayaAir engine here, so we need to add the scope of JS native method binding, otherwise the global object in the method will not be found.

The main class logic code is as follows:


```

		//导入nodejs原生os系统操作模块
		var os:Object =__JS__("require('os')")
		
		//获得网络接口列表。
		var ifaces:Object = os.networkInterfaces();
```






####Room Management Class Room

The main function of this class is client management. In general chat rooms, many such rooms will be created. For example, "group" is equivalent to a room. Many groups are multiple rooms. In this class, we only have one room. Students can expand on this basis.

In addition to the general needs of the room, such as new rooms, leaving the room, receiving messages, attention should be paid to the following logic:

Client Names is mainly used for client to detect renames and update user lists.

2. EventEmitter, a nodejs event emitter module, is imported into the room class for event monitoring and data transfer. It is more efficient at the server level than Evet in LayaAir engine, so native is recommended.

3. Before writing logic code, it is necessary to classify the message format and unify the front-end and back-end. It is suggested that the message class be created separately for management.
In this lesson, there are few messages, including login message, chat message (including system message) and user list message. Therefore, no message class has been established.

The room class code is as follows:


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




####Client client class

When the server is connected to the front end, the server generates a client image of the front end, which has the same socket as the front end. Message receiving and sending are carried out between the two brothers. Therefore, the role of Client class is mainly to listen for message events and client disconnection events, and then notify the room to process the follow-up logic.

The Client class code is as follows:


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




###Compile and run server

When the server is installed, compile the code! Open CMD and enter the * bin-debug/h5 * directory.**Node**Running our compiled * GameSever. max. JS * file shows that the server is running (Figure 4).

![img](img/4.png)<br/>（图4）




Of course, it is not convenient to run and debug in CMD. If you encounter code errors, you cannot interrupt point debugging. Therefore, it is recommended that you download the visual studio code running server to support code view query and breakpoint debugging! (Fig. 5)

![img](img/5.png)<br/> (Fig. 5)

At the end of this lesson, whether the above code has any logical problems can be checked in the process of writing the client.

