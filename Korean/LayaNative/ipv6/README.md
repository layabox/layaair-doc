#iOS 에 대한 ipv6
애플은 2016년 6월 1일부터 ipv6 표준을 강제 집행하기 때문에 개발자가 발표할 때 http 요청과 소cket은 도메인 이름을 사용해야 하는 방식으로 ip 주소를 사용할 수 없다.
개발자는 appstore를 제출하기 전에 ipv6 이 정상인지 테스트 방법을 참고하여 애플 공식 문서를 참고하십시오:

  



[ipv6测试方法官方文档](https://developer.apple.com/library/mac/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/UnderstandingandPreparingfortheIPv6Transition/UnderstandingandPreparingfortheIPv6Transition.html%3Ch1%3E//apple_ref/doc/uid/TP40010220-CH213-SW1)  



**우정 힌트:**  
1. 애플 공식 홈페이지에 따라 ipv6 을 테스트하는 경우가 많지만 여전히 아이pv6에 의해 무정하게 거절할 수 없다.이런 현상이 나타나면 개발자는 ipv6 을 호환할 수 있는 웹 서버를 교체해야 한다.
2. 개발자의 서버가 중국에 설치되면 사과가 심사를 할 때 방문이 늦을 수도 있다.두 가지 방법이 있다.
*(1)、외국에 서버 한 대 설치, 심사 통과 후 도메인을 중국으로 지목했다.
* (2), 프로젝트 자원을 로컬 app 에 싸서 다운로드하는 것을 피할 수 있습니다.[打包资源](https://ldc.layabox.com/doc/?nav=ch-as-5-2-0)



