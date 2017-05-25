## WebSocket

​	WebSockets 是一种基于 ws 协议的技术，它使得建立全双工连接成为可能。websocket 常见于浏览器中，但是这个协议不受使用平台的限制。

​	websocket 发送数据的格式一般为二进制和字符串。LayaAir引擎已经为我们封装好了websocket 和Byte的类，收发数据结合Byte类就可以完成。下面我们搭建一个简单的收发数据的例子来看下浏览器的长连接是如何工作的。

### 客户端

​	LayaAir内部的Socket是对websocket的封装，websocket的连接是异步的，所以一切和后端的交互都要等待open事件成功之后，前后端建立了连接通道才可以正常的收发消息。因此实例化socket之后四个事件是我们必须监听的：

``` 
Event.OPEN		:连接正常打开抛出的事件
Event.MESSAGE	:接收到消息抛出的事件
Event.CLOSE		:socket关闭抛出的事件
Event.ERROR		:连接出错抛出的事件
```

上面这四个事件是必要的，这也是我们处理网络消息的前提。

​	这里我们用AS项目进行讲解，新建一个LayaAir的空项目。声明一个Socket的实例，声明一个Byte的实例：

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

​	注意：我们看到我们实例化Byte和socket的时候都设置了endian，这个是很容易忽略的地方，有些开发者不注意这个，前端和服务端的endian不一致，导致了接收的数据是乱码，所以读写数据的时候一定要保证endian的一致。

​	Socket连接服务器有三种方式：

| 方式             | 说明                                       |
| -------------- | ---------------------------------------- |
| 构造函数传参         | 立即连接 比如 new Socket("192.168.1.2",8899);注意这里的host参数没有ws前缀。 |
| connect方法      | 传递url和端口号，连接服务器；socket.connect("192.168.0.1.2"，8989);注意这里的host参数没有ws前缀。 |
| connectByUrl方法 | 传递整个url，比如 socket.connectByUrl("ws://localhost:8989");这里有ws前缀。 |

​	连接成功之后，会触发Event.OPEN事件，我们就可以正式的收发数据。

##### 发送数据

​	发送数据很简单，只需要调用socket的send函数即可，参数可以是String或者ArrayBuffer。

发送字符串格式

```java
this.socket.send("hello world");//这是发送字符串的形式。
```

发送二进制格式的数据

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
byte.clear();//清除掉数据;方便下次读写；
this.socket.send(this.byte.buffer);//这里是把字节数组的数据通过socket发送给服务器。
```

​	上面我们看到，我们通过一个字节数组把我们需要的数据读入一个Byte数组，最后发送给服务器的是`byte.buffer`,这是一个ArrayBuffer的数据类型。这里一定要注意send的参数是ArrayBuffer，很多开发者可能不注意，直接传递成了Byte，导致发送数据不正确。假如写成`this.socket.send(this.byte);`这是错误的，这点一定要注意。

##### 接收数据

​	客户端从服务器接收到的数据都会派发到Event.MESSAGE监听函数中。receiveHandler的参数就是服务器发送回来的数据。可能是字符串，也可能是二进制ArrayBuffer。接收到的是字符串我们不用读，拿来直接用就可以。但是接收到的是二进制的话我们需要读取出来，转成我们需要的类型。

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



