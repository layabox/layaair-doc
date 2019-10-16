## websocket 
LayaPlayer 지원websocket.
현재 websocket 은 libwebsocket 에 기반돼 현재 버전 (0.9.2) 및 기존 버전의 LayaPlayer 모두 사용하는 libwebsockets 1.6.
###특성
1. ipv6 지원.
2. 프록시를 지원합니다.
3. 버전 1.0부터 wss 프로토콜 지원

```javascript

 var ws = new WebSocket('wss://echo.websocket.org');
 ```
**TIPS:
CA 파일 읽기 경로
ios 버전: 프로젝트 디렉토리 아래 resource/ca/cacert.pem
Android 버전: 프로젝트 디렉토리 아래 asets/cacert.pem
###제한
다음 프로토콜을 지원하지 않습니다. 예를 들어:

```javascript

var ws = new WebSocket('ws://echo.websocket.org','soap');
```

두 번째 인자수는 쓸모가 없어 바로 무시된다.
