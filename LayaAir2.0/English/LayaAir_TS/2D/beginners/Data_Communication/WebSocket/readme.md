# WebSocket

WebSocket is a technology based on WS protocol, which makes it possible to establish a dual full-time connection. WebSockets are common in browsers, but this protocol is not restricted by the use of platforms.

The format of data sent by websocket is generally binary and string. The LayaAir engine has already packaged websocket and Byte classes for us, which can be accomplished by sending and receiving data in combination with Byte classes. Let's build a simple example of sending and receiving data to see how the browser's long connection works.

###Client

The Socket in LayaAir is the encapsulation of websocket. The connection of websocket is asynchronous. So all interaction with the back end must wait for the success of the open event. Only when the front and back end establish the connection channel can they send and receive messages normally. So the four events after instantiating sockets are what we have to monitor:


```typescript

Event.OPEN        :连接正常打开抛出的事件
Event.MESSAGE    :接收到消息抛出的事件
Event.CLOSE        :socket关闭抛出的事件
Event.ERROR        :连接出错抛出的事件
```


The above four events are necessary, which is also the premise of dealing with network messages.

New LayaAir project. Declare a Socket instance and a Byte instance:


```typescript

class Game {
    private socket: Laya.Socket;
    private byte: Laya.Byte;
    constructor() {
        //初始化引擎
        Laya.init(600, 400, Laya.WebGL);
        this.byte = new Laya.Byte();
        //这里我们采用小端
        this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
        this.socket = new Laya.Socket();
        //这里我们采用小端
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
        //建立连接
        this.socket.connectByUrl("ws://localhost:8989");
        this.socket.on(Laya.Event.OPEN, this, this.openHandler);
        this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
        this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
        this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
    }
    private openHandler(event: any = null): void {
        //正确建立连接；
    }
    private receiveHandler(msg: any = null): void {
        ///接收到数据触发函数
    }
    private closeHandler(e: any = null): void {
        //关闭事件
    }
    private errorHandler(e: any = null): void {
        //连接出错
    }
}
new Game();
```


Note: We see that endian is set when we instantiate Byte and Socket, which is easy to overlook. Some developers do not pay attention to this. The endian of the front end and server is inconsistent, resulting in the received data is scrambled, so we must ensure endian consistency when reading and writing data.

Socket connects to servers in three ways:

| Way | Explanation|
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Constructor parameter | Connect immediately to a new Socket ("192.168.1.2", 8899); note that the host parameter here has no WS prefix. A kind of
| Connect method | Pass URL and port number to connect server; socket. connect ("192.168.0.1.2", 898989); note that the host parameter here has no WS prefix. A kind of
|The connectbyurl method | passes the entire URL, such as socket.connectbyurl ("WS: / / localhost: 8989"); here is the WS prefix. A kind of

Event is triggered when the connection is successful. OPEN event, then we can officially send and receive data.

**send data**

Sending data is simple, just call the send function of Socket, and the parameters can be string or Array Buffer.

Send string format:


```typescript

this.socket.send("hello world");//这是发送字符串的形式。
```


Send data in binary format:


```typescript

this.byte.writeByte(1);//写入一个字节
this.byte.writeInt16(20);//写入一个int16的数据
this.byte.writeFloat32(20.5);//写入一个32位的浮点数据
this.byte.writeUTFString("hello");// 写入一个字符串；
var by:Laya.Byte = new Laya.Byte();//这里声明一个临时Byte类型
by.endian = Laya.Byte.LITTLE_ENDIAN;//设置endian；
by.writeInt32(5000);//写入一个int32数据
by.writeUint16(16);//写入一个uint16 数据
this.byte.writeArrayBuffer(by.buffer);//把临时字节数据的数据写入byte中，这里注意写入的是by.buffer;
this.socket.send(this.byte.buffer);//这里是把字节数组的数据通过socket发送给服务器。
this.byte.clear();//清除掉数据;方便下次读写；
```


As we can see above, we read the data we need into a Byte array through a byte array and send it to the server.`byte.buffer`This is an Array Buffer data type. It is important to note that the send parameter is Array Buffer. Many developers may not pay attention to it and pass it directly to Byte, resulting in incorrect data transmission. If written`this.socket.send(this.byte);`This is wrong, and we must pay attention to it.

**receive data**

The data received by the client from the server is dispatched to the Event.MESSAGE listening function. The parameter of receiveHandler is the data sent back by the server. It could be a string or a binary Array Buffer. What we receive is a string that we don't need to read. We can use it directly. But if we receive binary, we need to read it out and convert it to the type we need.


```typescript

 private receiveHandler(msg: any = null): void {
   ///接收到数据触发函数
   //.............这里我们假设收到的是二进制ArrayBuffer
   this.byte.clear();
   this.byte.writeArrayBuffer(msg);//把接收到的二进制数据读进byte数组便于解析。
   this.byte.pos = 0;//设置偏移指针；
   ////下面开始读取数据，按照服务器传递过来的数据，按照顺序读取
   var a:number = this.byte.getByte();
   var b:number = this.byte.getInt16();
   var c:number = this.byte.getFloat32();
   var d:string = this.byte.getString();
   var e:string = this.byte.getUTFString();
 }
```
