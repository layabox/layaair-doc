# 拖尾系统详解

###### *version :2.1.1beta   Update:2019-8-2*

​**레이어3D에서 트래일 Sprite3D로 구성되어 있습니다.여기에 드레미는 유닛에서 편집하고 사용하는 것을 추천한다.**

이제 슬라이드 인터페이스를 보도록 하겠습니다.

[] (img/1.png)<br>(1)

현재 내보내는 속성 설명을 지원합니다:

--------

`Time`미루다 생존하다

`minVertexDistance`최소 트랙터 거리

`width`트랙 너비 설정 (너비 곡선으로)

`Color`colorGradient 방식을 사용하여, 두 개의 선택 모드 가 있습니다

1.*Fixed*고정 모드
2.*Blend*혼합 모드

`texture Mode`텍스처 패턴은 일반 텍스처와 동일한다.

1.*Stretch* 궤적 전체의 길이 응용 텍스처
2.*Tile* 무늬를 궤적 길이의 평포를 따라서 문양

`alignment`궤적 규범

1.*ALIGNMENTu VIEW* 궤적을 카메라로 향할 수 있다
2.*ALIGNMENTuTRANSFORM Z * 궤적 변환 구성 요소 방향을 맞추기