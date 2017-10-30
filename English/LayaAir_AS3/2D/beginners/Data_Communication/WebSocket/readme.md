## WebSocket

​	WebSockets is a technology based on the ws protocol, which makes it possible to establish a full-duplex connection. Websocket is common in the browser, but this protocol is not limited by the use of the platform.

​	Websocket sends data in a format that is usually binary and string. The LayaAir engine has packaged the websocket and Byte classes for us, sending and receiving data together with the Byte class. Let's set up a simple example of sending and receiving data to see how the browser's long connection works.

### Client

​	LayaAir internal Socket is websocket package, the websocket connection is asynchronous, so after all the interaction and back-end to wait for the open event, before and after the end of establishing a connection channel can send and receive messages normal. Therefore, after instantiating the socket, the four event is that we must listen:

``` 
Event.OPEN		:The connection is normally opened to throw the event
Event.MESSAGE	:Receive the event thrown by the message
Event.CLOSE		:socket off throws the event
Event.ERROR		:Connection error throws an event
```

The above four events are necessary, which is the premise of our handling of network messages.

​	Here we use the AS project to explain, create a new LayaAir empty project. Declare an instance of Socket that declares an instance of Byte:

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
			//Initialize the engine
			Laya.init(600, 400,WebGL);//
			this.byte = new Byte();
            this.byte.endian = Byte.LITTLE_ENDIAN;//Here we use small endian;
			this.socket = new Socket();
			this.socket.endian = Byte.LITTLE_ENDIAN;//Here we use small endian;
			this.socket.connectByUrl("ws://localhost:8989");//establish connection;
			this.socket.on(Event.OPEN,this,openHandler);
			this.socket.on(Event.MESSAGE,this,receiveHandler);
            this.socket.on(Event.CLOSE,this,closeHandler);
            this.socket.on(Event.ERROR,this,errorHandler);
			
		}
		private function openHandler(event:Object = null):void
		{
			//Correctly establish a connection;
			
		}
		private function receiveHandler(msg:Object = null):void
		{
			///Received data trigger function
		}
        private function closeHandler(e:Object= null):void
        {
            //Close event
        }
        private function errorHandler(e:Object = null):void
        {
            //Connection error
        }
	}
}
```

​	Note: we see us instantiate Byte and socket are set in endian, this is very easy to ignore the place, some developers do not pay attention to this, front end and server endian inconsistent, resulting in the received data is garbled, so Read and write data must ensure that the endian of the same.

​	There are three ways to connect to a Socket server:

| Mode             | Description                                       |
| -------------- | ---------------------------------------- |
|  Constructor arguments         |  immediately connected, such as new, Socket ("192.168.1.2", 8899); note that the host parameter here does not have a WS prefix. |
| connect method      | pass url and port number, connect to the server; socket.connect ("192.168.0.1.2", 8989); Note that the host parameter here does not have the ws prefix. |
| connectByUrl method | method passes the entire url, such as socket.connectByUrl ("ws: // localhost: 8989"); there is a ws prefix. |

​	After the connection is successful, will trigger Event.OPEN event, we can formally send and receive data.

##### send data

​	Send data is very simple, only need to call the socket send function can be, the parameters can be String or ArrayBuffer.

Send the string format

```java
this.socket.send("hello world");//This is the form in which the string is sent.
```

Send data in binary format

```java
this.byte.writeByte(1);//Write a byte
this.byte.writeInt16(20);//Write an int16 of data
this.byte.writeFloat32(20.5);//Write a 32-bit floating point data
this.byte.writeUTFString("hello");// Write a string;

var by:Byte = new Byte();//Declare a temporary Byte type here
by.endian = Byte.LITTLE_ENDIAN;//Set endian;
by.writeInt32(5000);//Write an int32 data
by.writeUint16(16);//Write a uint16 data
byte.writeArrayBuffer(by.buffer);//The temporary byte data into the byte, the note here is written by.buffer;

this.socket.send(this.byte.buffer);//This is the byte array of data through the socket sent to the server.
byte.clear();//Clear the data; to facilitate the next read and write;
```

​	As we can see above, we read the data we want into a Byte array through a byte array, and finally the byte.buffer is sent to the server, which is a data type of ArrayBuffer. It's important to note that the send parameter is ArrayBuffer, and many developers may not notice it and pass it directly to Byte, causing the sending data to be incorrect. If written in this.socket.send (this.byte), this is wrong, this must pay attention.

##### receive data

​	The data received by the client from the server is distributed to the Event.MESSAGE listener function. The receiveHandler parameter is the data that is sent back by the server. It could be a string, or it could be a binary ArrayBuffer. What we receive is strings. We don't need to read them. We can use them directly. But when received is binary, we need to read it and turn it into the type we need.

```java
private function receiveHandler(msg:Object = null):void
{
	//.............Here we assume that the binary ArrayBuffer is received
    this.byte.clear();
    this.byte.writeArrayBuffer(msg);//Read the received binary data into a byte array for easy parsing.
    this.byte.pos = 0;//Set offset pointer;
  	////The following began to read the data, according to the server to pass the data, in accordance with the order to read
    var a:int = this.byte.getByte();
    var b:int = this.byte.getInt16();
    var c:Number = this.byte.getFloat32();
    var d:String = this.byte.getString();
    var e:String = this.byte.getUTFString();
  	
}
```



