#図文混列チャットルームのWebSocketサーバ

LayaAirエンジンは設計の初めに、主にゲームのクライアント開発に用いられますが、nodejsの流行に伴い、LayaAirコンパイルの最終文書はjs言語です。LayaAirでサポートしているAS、TS言語開発サーバーもいい選択です。クライアントプログラムも前後に同時に開発できます。全スタックエンジニアになります。また、ES 5のプロセスに向けた書き方は、ますます難しくなり、対象に向けた言語で開発することが重要になります。

この例ではAS 3.0言語で図文混成チャットルームを開発します。前後端の開発教程を含みます。この時間はまずAS 3.0でnodejs WebSocketチャットサーバーを開発するコースを説明して、layaAirでコンパイルしてnodejs実行可能なサーバーコードを生成します。



###nodejsをダウンロードしてインストールします。

開発nodejsはもちろんnodejsのインストールが必要です。公式サイトから[https://nodejs.org/en/](https://nodejs.org/en/)nodejsの安定バージョンをダウンロードします。そして基本的にnextをインストールすればいいです。インストールが完了しました。cmd入力を開けます。`node -v`対応して得られたバージョン情報が表示されると、インストールの成功が示される（図1）。nodejsの詳細についてはここでは説明していませんが、nodejs中国語ネットワークAPIドキュメントを参照して理解できます。ウェブサイトはhttp:/nodejs.cn/appi/です。



  ![img](img/1.png)<br/>(図1)



###nodejsサーバーWSモジュールをダウンロードします。

リアルタイムチャットサーバーを開発する時に、nodeサービス端末のwebsocketモジュールは第三者モジュールを使用する必要があります。ここでは、wsモジュールを選択すればいいです。

cmdを開けて、wsを預けたいディレクトリに入って、入力してください。`npm install ws `車を返す。以下のヒントが見られます。これは私達のダウンロードが成功したと説明しています。私達はEディスクの下のtoolsディレクトリにダウンロードして、生成したディレクトリの名前をダウンロードしました。

![img](img/2.png)<br/>(図2)



###新規サーバ項目

Flash BuiderにGameServerというアクションスクリプトプロジェクトを新規に作成し、スタートクラスのGameServer.asを修正し、Spriteを継承するコードを削除し、サーバ端がnodeで動作するので、表示クラスを引き継ぐ必要がありません。

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


上記のコードでは、require()法によりwebSocketモジュールを導入し、実用化して使用します。LayaAirでコンパイルできるAS 3.0言語はどう使いますか？

下記のコードを観察して、LayaAirがサポートするAS 3言語の方法を使いました。`java"><br>[PRECONT]<br><br>`これは、オリジナルのjsメソッドを導入して、クラス（またはオブジェクト）に組み込み、実用化して使用することができます。


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


今回の授業では、原生のjs方法を使うところは全部使ってしまいました。`__JS__()`。



###チャットサーバーの架設

####サーバニーズ分析

nodejsサーバーの準備が完了したら、AS 3がどのようにjs元のライフスタイルを呼び出しているかを確認した後、チャットサーバーの正式な設置を開始します。まず需要を簡単に分析します。

1.メインクラスのGameServerは、socketサーバを確立し、自機のIPアドレスを識別し、クライアントの接続を傍受する。

2.部屋類Roomは、接続されたクライアントを管理し、クライアントの加入、不在、放送、クライアントリストの更新などを含む。

3.クライアントクラスCientは、クライアントを接続するごとに、サーバが長い接続ミラーを生成し、メッセージを送受信します。

![img](img/3.png)<br/>(図3)

####メインクラスGameServer

メインクラスは比較的簡単で、wsモジュールを導入してサーバを確立したり、OSモジュールを導入してサーバのハードウェアネットワークIP情報を検出したりします。クライアント接続があるかどうか確認し、接続後にミラー付きのsocketクライアントCientを生成します。

注意傍受にはjs原生bind（this）の方法が盛り込まれていますが、ここではLayaAirエンジンを使用していないので、js原生法バインディング機能領域に参加したいです。そうでないと、方法の中の大域的な対象は見つけられません。

メインクラスの論理コードは以下の通りです。


```

		//导入nodejs原生os系统操作模块
		var os:Object =__JS__("require('os')")
		
		//获得网络接口列表。
		var ifaces:Object = os.networkInterfaces();
```






####ルーム管理クラスRoom

このクラスの主な役割はクライアントの管理です。普通のチャットルームではこのような部屋をたくさん作ります。例えば、「群」は部屋に相当します。複数のグループは複数の部屋です。この授業では一つの部屋だけを建てました。

部屋の普通の需要を除いて、例えば新しく部屋に参加して、部屋を離れて、メッセージの需要を受け取ります。

1.クライアントのニックネームリストclientNamensは、主にクライアントが重名を検出し、ユーザーリストを更新するために使用されます。

2.ルームクラスにはnodejsイベント送信機モジュールEventEmitterを導入しています。イベントの傍受とデータ転送のために、サーバレベルではLayaAirエンジン中のイベントより効率が高いので、原生を使うことを提案します。

3.論理コードを作成する前に、メッセージをフォーマット分類し、前後に統一し、単独でメッセージクラスを作成して管理することを提案する。
本授業ではメッセージが少なく、ログインメッセージ、チャットメッセージ（システムメッセージを含む）、ユーザリストメッセージの3つに分けられていますので、メッセージクラスはまだ確立されていません。

Room類コードは以下の通りです。


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




####クライアントクラスCient

現在の端末がサーバに接続されると、フロントエンドのクライアントイメージが生成され、フロントエンドと同じsocketがあり、メッセージの受信と送信は兄弟間で行われます。したがって、Clientクラスの役割は主にメッセージイベントとクライアントの切断イベントを監督し、その後、部屋に連絡して後続のロジックを処理する。

Clientクラスのコードは以下の通りです。


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




###コンパイル実行サーバ

サーバーの架設を実現したら、コードをコンパイルします。cmdを開けて、＊bin-debug/h 5*カタログの下に入ります。**node**私達がコンパイルした*GameSever.max.js*ファイルを実行して、サーバーがすでに稼働しているのが見えます（図4）。

![img](img/4.png)<br/>（图4）




もちろん、cmdでのデバッグはあまり便利ではありません。コードエラーがあったら、デバッグを中断することもできません。ですから、Visual Studio Codeをダウンロードして、コードの確認とデバッグをサポートしてください。（図5）

![img](img/5.png)<br/>(図5)

本节の授业はこれで全部终わります。上のコードはまだ论理的な问题がありますか？

