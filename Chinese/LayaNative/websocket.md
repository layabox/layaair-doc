## websocket 
LayaPlayer支持websocket。  
现在的websocket基于libwebsocket来实现的，当前版本（0.9.2）及之前版本的LayaPlayer都是用的libwebsockets 1.6。  
### 特性
1. 支持ipv6。
2. 支持设置代理。  
### 限制  
1. 不支持安全连接，所以类似  wss://echo.websocket.org 这种地址是无法连接上的。
2. 不支持子协议,例如:  
    ```javascript
    var ws = new WebSocket('ws://echo.websocket.org','soap');
    ```
    第二个参数是没有用的,会被直接忽略掉。

### 计划
在0.9.5版加上对wss的支持。
