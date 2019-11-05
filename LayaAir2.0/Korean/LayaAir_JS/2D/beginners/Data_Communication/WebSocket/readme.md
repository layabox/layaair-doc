#WebSocket

WebSocket 은 ws 프로토콜을 기반으로 하는 기술이다. 더블 아르바이트 연결이 가능하다.웹소cket은 브라우저에서 흔히 볼 수 있지만 이 프로토콜은 플랫폼의 제한을 받지 않습니다.

Websocket 데이터를 보내는 형식은 일반적으로 2진과 문자열입니다.Layaiair 엔진은 이미 위bsocket과 Byte 종류를 봉쇄해 버라이터 종류를 결합시켜 Byte 종류를 완성할 수 있습니다.다음은 간단한 수신 데이터 예를 작성하여 브라우저 의 긴 연결이 어떻게 되는지 알아보자.

###클라이언트

Layaiair 내부의 Socket 은 websocket 에 대한 재킷, websocket의 연결은 비보적이기 때문에 모든 것과 백엔의 교섭을 기다려야 open 사건이 성공한 후 전후 연결 통로를 세워 정상적인 수신 소식이다.그래서 실제 소cket 이후의 네 가지 사건은 우리가 감청해야 할 것이다:


```typescript

Event.OPEN        :连接正常打开抛出的事件
Event.MESSAGE    :接收到消息抛出的事件
Event.CLOSE        :socket关闭抛出的事件
Event.ERROR        :连接出错抛出的事件
```


위의 네 가지 사건은 필수적인 것이며, 이것은 우리가 인터넷 소식을 처리하는 전제이다.

Layaiair 프로젝트 새로 만들기.Socket 실례를 성명합니다. Byte 실례:


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


주의: 우리는 실제 예화 Byte 와 Socket 을 볼 때 endian 을 설치한 것을 보았는데, 이것은 무시하기 쉬운 곳이고, 일부 개발자는 이것을 주의하지 않는다. 앞부분과 서버의 endian이 일치하지 않아 수신된 데이터가 엉망이므로, 데이터를 읽을 때 반드시 endian의 일치를 보장해야 한다.

Socket 연결 서버에 세 가지 방식이 있습니다:

124대 방식
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
"192.168.1.2" 8899"에"여기 있는 host 파라다이스 파라다이스 파라다이스 파라다이스 파라다이스 파라다이스 파라다이스 파라다이스 파라다이스 파라다이스 파라마에 대한 주의를 기울였다.124대
"192.168.1.1.2." 8989는 URL 및 포트 번호, 연결 서버, socket.connect.connect("192.168.1.1.2." 89898989는 이곳의 host 인자를 주목합니다.124대
"Ws:localhost:889"는 124url 전송, 예를 들어 socket.connectbyUl("ws:ws:localhost:889", 여기에 Wath 가 있다.124대

연결이 성공하면 이벤트가 촉발된다.OPEN 사건, 이때 우리는 본격적인 수신 자료를 받을 수 있게 되었다.

**데이터 보내기**

송신 데이터는 간단합니다. Socket 의 send 함수를 호출해야 합니다. 인자가 string 또는 ArrayBuffer 로 사용할 수 있습니다.

문자열 형식 보내기:


```typescript

this.socket.send("hello world");//这是发送字符串的形式。
```


바이너리 형식의 데이터 보내기:


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


위에서 우리는 하나의 바이트 배열로 우리가 필요한 데이터를 Byte 배열에 읽어, 마지막으로 서버에 보내는 것은`byte.buffer`ArrayBuffer 의 데이터 형식입니다.여기에 세드의 인자가 ArrayBufffer에 주의해야 한다. 많은 개발자들이 주의하지 않을 수 있으며, 바로 Byte 로 전달돼 데이터 발송이 잘못됐다.쓰다`this.socket.send(this.byte);`이것은 잘못된 것이니, 이 점은 반드시 주의해야 한다.

**수신 데이터**

클라이언트가 서버에서 받은 데이터는 Event.MESSAGE 감청 함수에 포함됩니다.receiveHandler 인자가 서버에서 보낸 데이터입니다.문자열일지도 모르지만 2진제 ArrayBufer일 수도 있다.접수된 것은 우리가 읽지 않고 직접 사용하면 된다.하지만 접수된 것은 2진제가 되면 우리가 읽어야 하고 필요한 유형으로 바꿔야 한다.


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
