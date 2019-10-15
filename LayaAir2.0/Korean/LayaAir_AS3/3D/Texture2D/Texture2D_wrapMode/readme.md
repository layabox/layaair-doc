# 纹理的循环模式

###### *version :2.1.0   Update:2019-5-25*

무늬의 순환 모드.Layair3D 지원`WARPMODE_CLAMP`무늬의 가장자리`WARPMODE_REPEAT`문양이 평포 두 가지 모드를 되풀이하다.Layaiar3D에서 기본 사용입니다.`Repeat`모드

예시 중 큐브 모형이 사용하는 것은 자신이 다시 쓰는 박스 mesh 를 만드는 방법이다.

순환 모드 이전 효과 그림 설정:

[] (img/1.png)<br>(1)


```typescript

//在U方向上使用WARPMODE_CLAMP
texture.wrapModeU = BaseTexture.WARPMODE_CLAMP;
//在V方向使用WARPMODE_REPEAT
texture.wrapModeV = BaseTexture.WARPMODE_REPEAT;
```


설정 후 (그림 2):

[] (img/2.png)<br>(2)

