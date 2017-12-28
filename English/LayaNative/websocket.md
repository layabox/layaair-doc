## Websocket 
LayaPlayer supports websocket.
The current websocket is based on libwebsocket, and the current version (0.9.2) and earlier versions of the LayaPlayer are all use libwebsockets 1.6.
### Detailed feature
1. Support IPv6.
2. Support the setup agent. 
### Limitations
1. WSS protocols are not supported, for example: 'wss://echo.websocket.org'。
2. Subprotocols are not supported, for example: 
    ```javascript
    var ws = new WebSocket('ws://echo.websocket.org','soap');
    ```
    The second parameters are useless and will be ignored directly.

### Prospective
In the future version plans to add wss support, so stay tuned for version update log.
