#LayaPlayer 환경에서 주요 대상 점용 상황을 살펴보다

개발자 디버깅 메모리 점용을 위해 LayaPlayer-0.9.6 이후 버전을 통계해 일반 스크립트 대상이 메모리 중 점용정보를 통계했다. 아이메이지, XMLHttpRequest, sprite2D, graphics, context2D, particleTemplate2D, XmlNode 등 정보를 포함했다.

###1. 어떻게 열어

config.js 에서 다음 함수를 호출할 수 있습니다:


```javascript

conch.config.enableMemorySurvey(true);
```


config.js 위치:
``Android: 工程目录下的assets/scripts/config.js  ``<br>``IOS:工程目录下的resources/scripts/config.js``

**주의자: 공식 발표를 할 때는 끄고, 성능을 소모하기 때문이다.**

###2、어떻게 사용하는지

다음 함수를 통해 현재 점용된 상황을 인쇄할 수 있습니다:


```javascript

conch.config.printAllMemorySurvey("");//参数为log写入的位置，如果写的是""，默认会写入cache目录下
```


이 함수를 호출한 후 appCache 디렉토리에서 memoryStaatis.txt, log 창 아래에 인쇄할 수 있으며, log 인쇄 log

[] (img/0.jpg)

이 사례의 log 에 따르면 sprite2D 개수는 2개, grphics 개수가 1개라고 합니다.
마지막 줄 은 일부 메모리 정보 다
Reserve texture manager size = 128.0MB, / 무늬 미리 설정한 size
Reserve atlas size = 80.00MB, / 내부 큰 그림이 모아진 size
Sound size = 0.06MB, / wav 가 차지하는 size
Image no release yet = 0 / 아직 청산하지 않은 아이mage 개수

구체적 현존 텍스처 관리와 image 관계 참고해주세요.[显存管理](https://ldc.layabox.com/doc/?nav=ch-as-5-2-1)

**TIPS: log 속 size 와 countsize 모두 예상 수치로 부정확해 상대 수를 주로 본다.**

###3. 실제 사용

항목의 실제 응용은 항목의 구석에서 단추를 만들 수 있으며, 모든 클릭을 클릭하여 printAllMerySurvey 함수를 실행할 수 있습니다.
예를 들어: 로그인 페이지에서 클릭, 관련 정보를 기록합니다.
주성에 들어서자, 관련 정보를 기록하다.
사본에 들어가서 조회해서 관련 정보를 기록합니다.
다시 주성으로 돌아가 조회, 관련 정보를 기록하다.

이렇게 하면 비교할 수 있고, 사본을 드나드는 후 남겨진 노드가 삭제되지 않았습니다.

