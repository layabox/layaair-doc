##Websocket.

Websockets est une technologie basée sur le Protocole WS qui permet d 'établir une connexion duplex complète.Websocket est courant dans le navigateur, mais le protocole n 'est pas limité par la plate - forme d' utilisation.

Le format des données transmises par websocket est généralement binaire et chaîne de caractères.Le moteur layaair nous a déjà emballé les catégories websocket et Byte, et les données d 'émission et de réception peuvent être combinées avec les données Byte.Voici un exemple simple de données d 'expédition et de réception pour voir comment fonctionne la connexion longue du navigateur.

###Client

La connexion de websocket à l 'intérieur de layaair est asynchrone, de sorte que toutes les interactions avec l' extrémité arrière doivent attendre le succès de l 'événement Open et qu' un canal de connexion soit installé à l 'avant et à l' arrière pour que le message puisse être envoyé et envoyé normalement.Les quatre derniers événements de socket sont donc sur écoute:


```

Event.OPEN		:连接正常打开抛出的事件
Event.MESSAGE	:接收到消息抛出的事件
Event.CLOSE		:socket关闭抛出的事件
Event.ERROR		:连接出错抛出的事件
```


Les quatre événements ci - dessus sont nécessaires, et c 'est aussi une condition préalable à notre traitement des messages en ligne.

Nous avons utilisé le projet as pour expliquer la création d'un nouveau projet vide à layaair.Un exemple de socket, un exemple de Byte:


```java

package {
	import laya.events.Event;
	import laya.net.Socket;
	import laya.utils.Byte;
	import laya.webgl.WebGL;

	public class Game {
		
		private var socket:Socket;
		private var byte:Byte;
		public function Game() {
			//初始化引擎
			Laya.init(600, 400,WebGL);//
			this.byte = new Byte();
            this.byte.endian = Byte.LITTLE_ENDIAN;//这里我们采用小端；
			this.socket = new Socket();
			this.socket.endian = Byte.LITTLE_ENDIAN;//这里我们采用小端；
			this.socket.connectByUrl("ws://localhost:8989");//建立连接；
			this.socket.on(Event.OPEN,this,openHandler);
			this.socket.on(Event.MESSAGE,this,receiveHandler);
            this.socket.on(Event.CLOSE,this,closeHandler);
            this.socket.on(Event.ERROR,this,errorHandler);
			
		}
		private function openHandler(event:Object = null):void
		{
			//正确建立连接；
			
		}
		private function receiveHandler(msg:Object = null):void
		{
			///接收到数据触发函数
		}
        private function closeHandler(e:Object= null):void
        {
            //关闭事件
        }
        private function errorHandler(e:Object = null):void
        {
            //连接出错
        }
	}
}
```


Attention & ‧‧;: Nous voyons que Byte et socket sont tous deux installés dans un endroit qui peut facilement être négligé par certains développeurs, ce qui ne concorde pas avec l 'endian de l' avant et du serveur, ce qui fait que les données reçues ne sont pas codées, il est donc important de veiller à ce que les données d 'écriture et de lecture soient cohérentes.

Socket connecte le serveur de trois façons:

"124. Description \ \ 124.
124 ---------------------------------------------------------------------------------------------------------------------
La fonction de configuration \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\\\- 124.
Le procédé 124 Connect \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\ \\\\- 124.
La méthode \ \ 124 connectbyrl \ \ 124, par exemple socket.connectbyrl ("WS: / / localhost: 8989"), permet de transmettre l 'intégralité du URL.- 124.

Une fois la connexion réussie, l 'événement event.open sera déclenché et nous pourrons envoyer et recevoir des données officielles.

#####Transmission de données

Les données de transmission sont simples, il suffit d 'appeler la fonction second de socket, et les paramètres peuvent être string ou arraybuffer.

Envoyer le format de chaîne


```java

this.socket.send("hello world");//这是发送字符串的形式。
```


Transmission de données en format binaire


```java

this.byte.writeByte(1);//写入一个字节
this.byte.writeInt16(20);//写入一个int16的数据
this.byte.writeFloat32(20.5);//写入一个32位的浮点数据
this.byte.writeUTFString("hello");// 写入一个字符串；

var by:Byte = new Byte();//这里声明一个临时Byte类型
by.endian = Byte.LITTLE_ENDIAN;//设置endian；
by.writeInt32(5000);//写入一个int32数据
by.writeUint16(16);//写入一个uint16 数据
byte.writeArrayBuffer(by.buffer);//把临时字节数据的数据写入byte中，这里注意写入的是by.buffer;

this.socket.send(this.byte.buffer);//这里是把字节数组的数据通过socket发送给服务器。
byte.clear();//清除掉数据;方便下次读写；
```


Nous avons vu que nous avons lu les données dont nous avons besoin dans une matrice Byte et que nous les avons envoyées au serveur.`byte.buffer`C 'est un type de données d' arraybuffer.Il est important de noter ici que le paramètre d 'envoi est arraybuffer, que de nombreux développeurs peuvent ne pas avoir remarqué et qu' il a été transmis directement à Byte, ce qui a entraîné une transmission incorrecte des données.Si`this.socket.send(this.byte);`C 'est une erreur.

#####Réception de données

Les données reçues par le client du serveur sont envoyées à la fonction d 'écoute event.message.Le paramètre receivehandler est les données transmises par le serveur.Peut - être une chaîne de caractères, ou peut - être un araybuffer binaire.On reçoit des chaînes de caractères qu 'on n' a pas besoin de lire et qu 'on peut les utiliser directement.Mais ce que nous recevons est binaire et nous devons le lire et le transformer en le type dont nous avons besoin.


```java

private function receiveHandler(msg:Object = null):void
{
	//.............这里我们假设收到的是二进制ArrayBuffer
    this.byte.clear();
    this.byte.writeArrayBuffer(msg);//把接收到的二进制数据读进byte数组便于解析。
    this.byte.pos = 0;//设置偏移指针；
  	////下面开始读取数据，按照服务器传递过来的数据，按照顺序读取
    var a:int = this.byte.getByte();
    var b:int = this.byte.getInt16();
    var c:Number = this.byte.getFloat32();
    var d:String = this.byte.getString();
    var e:String = this.byte.getUTFString();
  	
}
```




