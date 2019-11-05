#다역 처리

많은 신인 개발자들이 디모의 운행을 완료할 때 자원이 나타날 수 없는 문제가 발생할 수 있다 (코드가 완전히 정확한 경우) 이때 브라우저 콘솔을 열면 자원 다역이 발견된다.

힌트 내용은 다음과 같습니다:

*No'Access-Control-Allow-Origin'header is present on the requested resource. Origin'file:/'is therrefore not allowed access.*

**왜 도메인을 건너요?**

브라우저 기본적으로 로컬 파일을 추가하면 교차역 방문이 발생할 수 있습니다.이것이 바로**대역**.

**어떻게 다역 문제를 해결합니까?**

다역은 두 가지로 나뉜다.파일 요청 다역으로 데이터 요청

#####1. 파일 요청 다역

파일 요청 다역 해결 방법은 두 가지, 브라우저에 부팅 인자를 추가하는 것이다.Crome 예를 들어 chrome 브라우저 빠른 방식으로 열린 아이콘 — 오른쪽에서 속성 열기 — 단축식 1칸 — 목표 말미에 추가하기 (앞쪽에 인용번호가 있다면 – allow-file-accccess-from-files.그림 아래에 제시한 것처럼:

![1](img\1.png)(그림 1)

이때 열린 Crome 브라우저 페이지를 모두 닫고 다시 실행하면 됩니다.

**이상 방법 은 로컬 디버그 의 문제 를 해결할 수 있을 뿐, 기타 호스트 존재 의 다국적 문제 를 해결할 수 없다**.파일의 다국적 문제를 철저히 해결하려면 webServer (일반적인 webserver 대부분은 apache, nginx, tomcat 등) 을 요청하는 도메인 이름에 글로벌 마크를 추가하여 nginx 를 예를 입력하십시오:


```

http {

  ......

  add_header Access-Control-Allow-Origin *;

  add_header Access-Control-Allow-Headers X-Requested-With;

  add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

  ......

}

```


이렇게 GET, POST, OPTIONS 다운로드 요청의 지원도 가능하며, addu header Acccess-Control-Allow-Origin[http://www.layabox.com;](http://www.layabox.com%3B/)지정 허용 url;

#####2. 데이터 요청 다역

데이터 요청 다운로드에 백엔드 조정이 필요합니다. 요청에 header 표시를 더해서 php 언어를 예를 들어 있습니다:


```

header("Access-Control-Allow-Origin: *");
```


반드시 *, 모든 호스트 다역 접근을 허용할 수 있으며 개발자 또한 도메인 호스트 아래 호스트 를 지정할 수 있습니다



**위신 헤더 영역:**

백스테이지에서 그림을 자신의 서버에 다운로드하고 자신의 서버를 통해 프로필 자원을 방문할 수 있다