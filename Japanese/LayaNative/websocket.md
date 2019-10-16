## websocket 
LayaPlayerはwebsocketをサポートします。
現在のwebsocketはlibwebsocketに基づいて実現されており、現在のバージョン（0.9.2）および以前のバージョンのLayaPlayerはlibwebsockets 1.6を使用しています。
###特性
1.ipv 6に対応しています。
2.設定エージェントをサポートします。
3.バージョン1.0からWSSプロトコルをサポートする。

```javascript

 var ws = new WebSocket('wss://echo.websocket.org');
 ```
＊TIPS:
CAファイル読み出し経路
iosバージョン：工程カタログ下のreource/ca/cacert.pem
Androidバージョン：工程カタログ下のクラスメイト/cacert.pem
###制限
サブプロトコルは一時的にサポートされません。

```javascript

var ws = new WebSocket('ws://echo.websocket.org','soap');
```

二つ目のパラメータは無駄です。直接無視されます。
