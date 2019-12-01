#Serveur websocket de forum hybride

Au début de la conception, le moteur layaair, bien qu 'il soit principalement utilisé pour le développement du client du jeu, a été mis au point avec l' apparition de nodejs et le document final compilé par layaair était la langue JS.Alors, le développement de serveurs dans les langues as et ts appuyées par layaair est également une très bonne option, qui permet à nos clients de développer simultanément les programmes avant et après!Devenir ingénieurEn outre, il est devenu de plus en plus difficile d'appliquer la formule es5 axée sur le processus, et il est d'autant plus important de la développer dans une langue orientée vers l'objet.

Dans ce cas, nous utilisons la langue as3.0 pour mettre au point un ensemble de forums mixtes de texte qui comprennent des cours de développement avant et après.Ce cours commence par un cours de développement du serveur de discussion nodejs websocket à l 'aide d' as3.0 et par la compilation de codes de serveur nodejs opérationnels à l 'aide de layaair.



###Télécharger et installer nodejs

Le développement de nodejs n 'est certainement pas sans l' installation de nodejs.De l 'Internet[https://nodejs.org/en/](https://nodejs.org/en/)Téléchargez la version stable de nodejs.Ensuite, il suffit de l 'installer sur la route suivante.Installation terminée. Entrée CMD ouverte.`node -v`L 'affichage des informations de mise en page correspondantes indique que l' installation a été couronnée de succès (fig. 1).Pour plus d'informations sur nodejs, voir le document API en chinois de nodejs, à l'adresse http: / / nodejs.cn / API /.



  ![img](img/1.png)< br / > (Figure 1)



###Télécharger le module WS du serveur nodejs

Lors de la mise au point du serveur de discussion instantanée, le module websocket du serveur Node doit être utilisé avec un troisième module, où nous choisissons le module ws (l 'développeur peut être remplacé par un troisième module familier).

Ouvrez le CMD, entrez dans le répertoire où vous voulez enregistrer le WS et saisissez`npm install ws `Retour.On peut voir les indications suivantes (Fig. 2).Cela témoigne du succès de notre téléchargement, nous l 'avons téléchargé dans le catalogue des Tools de la disquette e, qui a été créé sous le nom de Node u modules, y compris les fichiers WS et autres.

![img](img/2.png)< br / > (Figure 2)



###Nouveau projet de serveur

Le nouveau projet ActionScript, baptisé gameserver, a été créé dans Flash Builder, et la classe de démarrage gameserver.as a été modifiée, le Code de succession Sprite a été supprimé et les extrémités du serveur fonctionnent dans le Node, de sorte qu 'il n' est pas nécessaire d 'hériter de la classe D' affichage.

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


Dans le Code susmentionné, le module websocket est importé par la méthode require () et utilisé de manière plus systématique.Comment utiliser la langue as3.0 compilable de layaair?

Observez le code suivant. Nous utilisons la méthode de langue AS3 appuyée par layaair.`Java "><br>[original]<br>< / PR ><br>`Cette invention permet d 'importer et de créer des catégories (ou des objets) à l' aide d 'un procédé JS d' origine, puis de les utiliser de manière plus systématique.


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


Dans ce cours, nous utilisons tous les endroits où nous avons besoin d 'utiliser la méthode JS originale.`__JS__()`".



###Installation d 'un serveur de discussion

####Analyse des besoins du serveur

Lorsque nous aurons fini de préparer le serveur nodejs et que nous aurons appris comment l 'AS3 appelle la méthode d' origine JS, nous commencerons à installer officiellement le serveur de discussion.Une brève analyse des besoins (fig. 3).

Gameserver, catégorie principale, création d'un serveur socket permettant d'identifier l'adresse IP locale et de suivre les connexions du client.

Room Room (room room) pour gérer les connexions avec les clients, y compris l'accès, le départ, la diffusion, la mise à jour de la liste des clients, etc.

Client de type client, pour chaque connexion à un client, le serveur génère un miroir à connexion longue pour envoyer et envoyer des messages.

![img](img/3.png)< br / > (Figure 3)

####Catégorie principale gameserver

La classe principale est relativement simple, le module WS est importé pour créer un serveur et le module os pour détecter des informations IP de réseau matériel du serveur, etc.Et de vérifier s' il y a une connexion client, puis la connexion génère un client client avec un objectif socket.

Notez que la méthode d 'origine JS BIND (this) a été ajoutée à l' écoute, où nous devons ajouter le domaine d 'action de la méthode JS d' origine car nous n 'utilisons pas le moteur layaair, faute de quoi l' objet global de la méthode ne sera pas trouvé.

Les codes logiques principaux sont les suivants:


```

		//导入nodejs原生os系统操作模块
		var os:Object =__JS__("require('os')")
		
		//获得网络接口列表。
		var ifaces:Object = os.networkInterfaces();
```






####Room Management

Le rôle principal de cette catégorie est la gestion du client, beaucoup de ces chambres sont créées dans des forums de discussion ordinaires, par exemple, les "groupes" sont des Chambres, beaucoup de groupes sont des Chambres, dans ce cours nous n 'avons qu' une seule chambre, les camarades peuvent développer sur cette base.

En plus des besoins normaux de la Chambre, tels que les nouveaux besoins d 'admission, de sortie et de réception de messages, il convient d' observer la logique suivante:

Les listes clientnames sont utilisées principalement pour la détection de nouveaux noms de clients et la mise à jour des listes d'utilisateurs.

Le module eventemitter du nodejs eventemitter a été introduit dans la catégorie des pièces pour la surveillance d'événements et la transmission de données, qui est plus efficace au niveau du serveur que dans le moteur layaair, et il est donc recommandé d'utiliser le prototype.

Avant d'élaborer un code logique, il est nécessaire de classer les messages selon un format uniforme et de les gérer séparément.
Il y a moins de messages dans ce cours, classés en trois catégories: message d 'accès, message de discussion (y compris message système) et message de liste d' abonnés, de sorte qu 'aucune catégorie de messages n' a été créée.

Code room:


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




####Client client

Une fois que l 'extrémité courante est connectée au serveur, le serveur génère un miroir client à l' extrémité frontale qui a le même socket que l 'extrémité frontale et qui reçoit et transmet des messages entre ses deux frères.Le rôle de client est donc principalement d 'écouter les événements de messages et les événements de déconnexion du client, puis d' informer la Chambre de la logique de suivi.

Les codes client sont les suivants:


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




###Compiler Operation Server

Lorsque l 'installation du serveur est réalisée, compilez le code!Ouvrez le CMD et entrez dans le catalogue * bin - debug / H5 *.**Node**Exécutez les fichiers * gamesever.max.js * que nous avons compilés et vous verrez que le serveur est opérationnel (fig. 4).

![img](img/4.png)< br / > (Figure 4)



Bien sûr, il n 'est pas facile d' effectuer des réglages dans le CMD et, en cas d 'erreur de code, il n' est pas possible d 'interrompre les réglages de point.(Figure 5)

![img](img/5.png)< br / > (Figure 5)

Ce cours s' achève et le code ci - dessus soulève des questions logiques qui peuvent être testées lors de l 'élaboration du client.

