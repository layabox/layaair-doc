# WebSocket

WebSocketは、WSプロトコルに基づく技術であり、デュアルワーク接続の確立が可能になる。websocketはよくブラウザにありますが、このプロトコルはプラットフォームの使用に制限されません。

websocketでデータを送るフォーマットは、一般にバイナリと文字列です。LayaAirエンジンはすでに私達のためにwebsocketとByte種類をカプセル化しました。送受信データはByte類と結合して完成できます。簡単な送受信データの例を作ってみます。ブラウザの長い接続はどのように動作していますか？

###クライアント

LayaAir内部のSocketはwebsocketに対するパッケージであり、websocketの接続は非同期であるため、すべてのバックエンドとの対話はopenイベントの成功を待って、前後に接続チャネルを確立してこそ正常にメッセージを送受できる。したがって、実例化されたsocketの後の4つのイベントは、私たちが待ち受けているものです。


```typescript

Event.OPEN        :连接正常打开抛出的事件
Event.MESSAGE    :接收到消息抛出的事件
Event.CLOSE        :socket关闭抛出的事件
Event.ERROR        :连接出错抛出的事件
```


上の4つの事件は必要です。これも私たちがネットニュースを処理する前提です。

LayaAir空のプロジェクトを新規作成します。ソケットの例を宣言し、Byteの例を宣言します。


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


注意：実際のByteとSocketを見た時はendianが設置されています。これは見落としやすいところです。一部の開発者はこれに注意しないで、フロントエンドとサーバーのendianが一致しないので、受信したデータは文字化けです。だからデータを読む時は必ずendianの一致を保証してください。

ソケット接続サーバには3つの方法があります。

124方式124は124を説明する。
|------------------------------------------|
|コンストラクタは、すぐにnew Socket（「192.168.1.2」、8899）と接続されています。ここのhostパラメータは、wsプレフィックスがないことに注意してください。𞓜
|connect方法|は、urlとポート番号を転送し、サーバを接続します。socket.co nnect（「192.168.0.1.2」、8989）、ここのhostパラメータは、wsプレフィックスがないことに注意してください。𞓜
connectByUrl方法は、socket.co.nnectByUrl（「ws:/local host:8989」）のように、全体urlを転送します。ここには、wsプレフィックスがあります。𞓜

接続が成功すると、イベントが発生します。OPENイベントは、正式にデータを送受信することができます。

**データを送信**

データを送るのは簡単です。Socketのsend関数を呼び出すだけでいいです。パラメータはstringまたはArayBufferでもいいです。

送信文字列のフォーマット:


```typescript

this.socket.send("hello world");//这是发送字符串的形式。
```


バイナリ形式のデータを送信:


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


上で見ましたが、バイト配列を通して必要なデータをByte配列に読み込んで、最後にサーバーに送るのは`byte.buffer`これはArayBufferのデータタイプです。ここでは、sendのパラメータはArayBufferであることに注意しなければならない。多くの開発者は注意しないで、直接Byteに伝達して、データの送信が正しくないことを招くかもしれない。書き上げたら`this.socket.send(this.byte);`これは間違いです。これは注意しなければなりません。

**データを受信する**

クライアントがサーバから受信したデータはいずれもEvent.MESSAGE傍受関数に送信されます。receive Handlerのパラメータはサーバから送られてきたデータです。文字列かもしれませんが、バイナリアラーバッファーかもしれません。受信したのは文字列です。私たちは読まずに持ってきて直接使えばいいです。しかし、受信したのがバイナリだったら、私たちは読み取って、必要なタイプに変えなければなりません。


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
