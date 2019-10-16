##LayaPlayer 첫 페이지 설명
LayaPlayer 브라우저 아닙니다!
LayaPlayer 브라우저 아닙니다!
LayaPlayer 브라우저 아닙니다!
현재 LayaPlayer 는 index.html 을 통해 작동된 것이지만, 사실 이렇게 하는 것은 편리하기 위해 브라우저와 통일하기 위해서다.Layaplayer는 브라우저에 기반된 것이 아니다. 포장 브라우저나 웹kit 같은 컨트롤을 통해 html 콘텐츠를 실행할 경우 LayaPlayer 내부는 js 정규 표현식으로 이 html 페이지의 내용을 간단히 해석하고, 그 안에 있는 스크립트를 꺼내면 html 자체가 복잡하고, Google의 엔진도 html 옮길 필요가 없어 LayaPlayerhtml 호환할 예정입니다. 이 때문에 가져온 문제는:
1. LayaPlayer 는 html 에만 관심이 있다`<meta>`라벨과`<script>`탭.다른 탭들은 모두 무시된다.그러나`<meta>`태그 현재 포함`name='laya'`속성: 세로 화면 및 다른 설정을 설정하기 위해 사용합니다.</script>

    
```html

    <meta name='laya' screenorientation='landscape' >
    ```

2. script 태그 는 src ='xxx'의 형식으로 구성된 스크립트가 복잡하기 때문에 정규 표현식 해석을 할 수 없어 해석이 잘못될 수 있다.
3. 다른 모든 것을 지지하지 않는다.그래서 DOM 에 의존하는 jquerry도 지지받지 않는다.
4. LayaPlayer 도 Node 에 기반된 것이 아니기 때문에 node 의 모든 스크립트도 지지하지 않는다.
5. 다른 것은 아직 실현되지 않았고, 후속 버전에서 이뤄질 수 있는 기능:

우선급
124대 124대
124타 타임스 프로토콜
124대 오리엔테이션
WebAssembly
xMLHttpRequest 동기화
WebVideo
124대 WebWorker
WebVR 124테오
    



**提示:**  
LayaPlayer 가 실행할 때 지원하지 않는 탭을 만나게 되면 직접 액세스를 틀립니다.그림
[] (img/1.png)
도


