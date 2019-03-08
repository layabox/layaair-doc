## websocket 
LayaPlayer支持websocket。  
现在的websocket基于libwebsocket来实现的，当前版本（0.9.2）及之前版本的LayaPlayer都是用的libwebsockets 1.6。  
### 特性
1. 支持ipv6。
2. 支持设置代理。
3. 从版本1.0开始支持wss协议
```javascript
 var ws = new WebSocket('wss://echo.websocket.org');
 ```   
 **TIPS:    
 CA文件读取路径  
ios版本：在工程目录下的resource/ca/cacert.pem  
Android版本：在工程目录下的 assets/cacert.pem 
### 限制  
1. 暂不支持子协议,例如:  
    ```javascript
    var ws = new WebSocket('ws://echo.websocket.org','soap');
    ```
    第二个参数是没有用的,会被直接忽略掉。
