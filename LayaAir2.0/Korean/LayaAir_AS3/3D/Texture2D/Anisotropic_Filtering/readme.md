# 纹理的各向异性过滤

###### *version :2.1.0   Update:2019-5-25*

각 이성 필터 (Anissotropic Filtering) 은 필터, 시각 변화로 3D 물체의 표면을 기울일 때 발생한 텍스처 오류를 사용한다.

이 속성은 높을수록 효과가 뚜렷해진다.또 다른 gpu 가 받아들일 수 있는 가장 높은 수치는 다르다.아래 두 장의 캡처는 같은 시각과 다른 것이다`anisoLevel`각자 이성 등급 하의 효과.

[] (img/1.png)<br>(2) anisoLevel = 0

[] (img/2.png)<br>(2) anisoLevel=10

설정 코드:


```typescript

//设置各向异性等级
texture.anisoLevel = 10;
```


