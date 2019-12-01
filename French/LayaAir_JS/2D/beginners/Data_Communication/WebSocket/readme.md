#Websocket.

Websocket est une technologie basée sur le Protocole WS qui permet d 'établir une connexion à double temps.Websocket est courant dans le navigateur, mais le protocole n 'est pas limité par la plate - forme d' utilisation.

Le format des données transmises par websocket est généralement binaire et chaîne de caractères.Les moteurs layaair nous ont déjà emballés pour les catégories websocket et Byte, et les données de réception et de réception peuvent être combinées avec les données Byte.Voici un exemple simple de données d 'expédition et de réception pour voir comment fonctionne la connexion longue du navigateur.

###Client

La connexion de websocket à l 'intérieur de layaair est asynchrone, de sorte que toutes les interactions avec l' extrémité arrière doivent attendre le succès de l 'événement Open et qu' un canal de connexion soit installé à l 'avant et à l' arrière pour que le message puisse être envoyé et envoyé normalement.Les quatre derniers événements de socket sont donc sur écoute:


```typescript

Event.OPEN        :连接正常打开抛出的事件
Event.MESSAGE    :接收到消息抛出的事件
Event.CLOSE        :socket关闭抛出的事件
Event.ERROR        :连接出错抛出的事件
```


Ces quatre événements sont nécessaires, et c 'est là une condition préalable à notre traitement des messages sur Internet.

Création d'un nouveau projet d'espace de layaair.Un exemple de socket, un exemple de Byte:


```typescript

//初始化引擎
Laya.init(600,400,Laya.WebGL);
this.byte = new Laya.Byte();
//这里我们采用小端
this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
this.socket = new Laya.Socket();
//这里我们采用小端
this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
//建立连接
this.socket.connectByUrl("ws://localhost:8989");
this.socket.on(Laya.Event.OPEN, this, openHandler);
this.socket.on(Laya.Event.MESSAGE, this, receiveHandler);
this.socket.on(Laya.Event.CLOSE, this, closeHandler);
this.socket.on(Laya.Event.ERROR, this, errorHandler);
function openHandler(event){
        //正确建立连接；
}
function receiveHandler(msg){
    ///接收到数据触发函数
}
function closeHandler(e){
    //关闭事件
}
function errorHandler(e){
    //连接出错
}
```


Attention & ‧‧;: lorsque l 'on voit que Byte et socket sont en place, c' est un endroit facile à ignorer, certains développeurs ne s' en soucient pas, l 'extrémité frontale ne concorde pas avec l' endian du serveur, ce qui fait que les données reçues ne sont pas codées, il faut donc veiller à ce qu 'elles soient cohérentes lors de la lecture et de l' écriture.

Socket connecte le serveur de trois façons:

"124. Description \ \ 124.
124 ---------------------------------------------------------------------------------------------------------------------
La fonction de configuration \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\\\- 124.
Le procédé 124 Connect \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\ \\\\- 124.
La méthode \ \ 124 connectbyrl \ \ 124, par exemple socket.connectbyrl ("WS: / / localhost: 8989"), permet de transmettre l 'intégralité du URL.- 124.

La connexion réussie déclenche event.L 'événement Open nous permet d' envoyer et de recevoir les données officielles.

**Transmission de données**

Les données de transmission sont simples, il suffit d 'appeler la fonction d' envoi de socket et les paramètres peuvent être string ou arraybuffer.

Envoyer le format de chaîne:


```typescript

this.socket.send("hello world");//这是发送字符串的形式。
```


Envoi de données en format binaire:


```typescript

this.byte.writeByte(1);//写入一个字节
this.byte.writeInt16(20);//写入一个int16的数据
this.byte.writeFloat32(20.5);//写入一个32位的浮点数据
this.byte.writeUTFString("hello");// 写入一个字符串；
var by = new Laya.Byte();//这里声明一个临时Byte类型
by.endian = Laya.Byte.LITTLE_ENDIAN;//设置endian；
by.writeInt32(5000);//写入一个int32数据
by.writeUint16(16);//写入一个uint16 数据
this.byte.writeArrayBuffer(by.buffer);//把临时字节数据的数据写入byte中，这里注意写入的是by.buffer;
this.socket.send(this.byte.buffer);//这里是把字节数组的数据通过socket发送给服务器。
this.byte.clear();//清除掉数据;方便下次读写；
```


Nous voyons que les données dont nous avons besoin sont lues dans une matrice Byte, et envoyées au serveur.`byte.buffer`C 'est un type de données d' arraybuffer.Il est important de noter ici que le paramètre d 'envoi est arraybuffer, que de nombreux développeurs peuvent ne pas avoir remarqué et qu' il a été transmis directement à Byte, ce qui a entraîné une transmission incorrecte des données.Si`this.socket.send(this.byte);`C 'est une erreur.

**Réception de données**

Les données reçues par le client du serveur sont envoyées à la fonction d 'écoute event.message.Le paramètre receivehandler est les données transmises par le serveur.Peut - être une chaîne de caractères, ou peut - être un araybuffer binaire.On reçoit des chaînes de caractères qu 'on n' a pas besoin de lire et qu 'on peut les utiliser directement.Mais ce que nous recevons est binaire et nous devons le lire et le transformer en le type dont nous avons besoin.


```typescript

//.............这里我们假设收到的是二进制ArrayBuffer
this.byte.clear();
this.byte.writeArrayBuffer(msg);//把接收到的二进制数据读进byte数组便于解析。
this.byte.pos = 0;//设置偏移指针；
////下面开始读取数据，按照服务器传递过来的数据，按照顺序读取
var a = this.byte.getByte();
var b = this.byte.getInt16();
var c = this.byte.getFloat32();
var d = this.byte.getString();
var e = this.byte.getUTFString();
```
