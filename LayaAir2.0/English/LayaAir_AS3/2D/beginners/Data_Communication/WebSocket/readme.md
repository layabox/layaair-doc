##WebSocket

WebSockets is a technology based on WS protocol, which makes it possible to establish full-duplex connections. WebSockets are common in browsers, but this protocol is not restricted by the use of platforms.

The format of data sent by websocket is generally binary and string. The layaair engine has encapsulated the websocket and byte classes for us, which can be completed by sending and receiving data combined with byte classes. Let's build a simple example of sending and receiving data to see how the browser's long connection works.

###Client

The socket inside LayaAir is the encapsulation of websocket, and the connection of websocket is asynchronous, so all interaction with the back end must wait for the success of the open event, before the front and back end can send and receive messages normally. So the four events after instantiating sockets are what we have to monitor:


```

Event.OPEN		:连接正常打开抛出的事件
Event.MESSAGE	:接收到消息抛出的事件
Event.CLOSE		:socket关闭抛出的事件
Event.ERROR		:连接出错抛出的事件
```


The above four events are necessary, which is also the premise of dealing with network messages.

Here we use the AS project to explain the new LayaAir air project. Declare an instance of Socket and an instance of Byte:


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


Note: When we instantiate Byte and socket, we set endian, which is easy to overlook. Some developers do not pay attention to this. The inconsistency of endian between the front end and the server leads to the inconsistency of the received data, so we must ensure endian consistency when reading and writing data.

Socket connects to servers in three ways:

|Method description|
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Constructor parameter | Connect immediately to a new Socket ("192.168.1.2", 8899); note that the host parameter here has no WS prefix. A kind of
| Connect method | Pass URL and port number to connect server; socket. connect ("192.168.0.1.2", 898989); note that the host parameter here has no WS prefix. A kind of
| The connectByUrl method | passes the entire url, such as socket. connectByUrl ("ws://localhost:898989"); there is a WS prefix. A kind of

When the connection is successful, the Event.OPEN event will be triggered, and we can send and receive data formally.

#####send data

Sending data is very simple. You only need to call the send function of socket. The parameters can be string or arraybuffer.

Send string format


```java

this.socket.send("hello world");//这是发送字符串的形式。
```


Send data in binary format


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


As we can see above, we read the data we need into a Byte array through a byte array and send it to the server.`byte.buffer`This is an Array Buffer data type. It is important to note that the send parameter is Array Buffer. Many developers may not pay attention to it and pass it directly to Byte, resulting in incorrect data transmission. If written`this.socket.send(this.byte);`This is wrong, and we must pay attention to it.

#####receive data

The data received by the client from the server is sent to the Event.MESSAGE listening function. The parameter of receiveHandler is the data sent back by the server. It could be a string or a binary Array Buffer. What we receive is a string that we don't need to read. We can use it directly. But if we receive binary, we need to read it out and convert it to the type we need.


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




