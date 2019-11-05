##http 납치의 보호
여기에서 말한 http 납치는 인터넷 서비스 공급자나 어떤 단계는 설비를 통해 dns 납치나 http 납치법을 통해 사용자가 요청한 결과를 수정하고 페이지에 광고를 삽입하는 행위를 뜻한다.
http 납치로 사용자가 가져온 html 데이터가 동태수정됩니다. 예를 들어 페이지가 삽입됩니다`<script>`태그, 광고 코드를 실행하려면, 이 코드가 일반적으로 LayaPlayer 에서 실행할 수 없습니다. app 이 시작하자마자 스테레를 틀리게 할 수 있습니다.</script>
이 문제에 대해 ISP 에 신고를 제외한 해결 방법은 script 태그에 특수 속성을 더하면 삽입된 script 탭과 구별할 수 있다.
* 용법 예제: *

```html

<meta name='laya' layajsprotect='true' >

<script src='main.js' loader='laya' ></script>
```

`layajsprotect='true'`이 보호를 열다.
`loader='laya'`이것은 자신의 js, 실행 가능.