# Texture2D的GPU纹理压缩的使用

###### *version :2.1.0   Update:2019-5-25*

2.0 정판에서는 문리 기능을 지원했다.유닛이 내보내면 도구 판넬에서 플랫폼을 선택하면 됩니다.

[] (img/1.png)<br>(1)

**IOS 앤드로이드**문양 압축 기능을 지원하는 것은 안탁과 아이오스의 문양 압축 이미지가 완전히 다르기 때문에 자원은 3인분 정도 나눠야 한다.

**Conventionnal**일반 JPG 와 PNG 입니다.

다음 자원 목록을 내보내기:

[] (img/2.png)<br>(2)

내보내면 세 개의 다른 폴더를 나누어 사용하기 위한 세 개의 플랫폼을 사용할 수 있는 자원을 사용합니다.

무늬 압축 사용 예제 (()[地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Texture&name=TextureGPUCompression)차다

여기 사용했어요.`URL.basePath`방법, 가재 경로를 설정하고, 다른 플랫폼에 다른 자원을 싣고 압축 무늬를 사용합니다


```typescript

if (Laya.Browser.onAndroid)
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Android/";
else if (Laya.Browser.onIOS)
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/IOS/";
else
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Conventional/";

Laya.Scene3D.load("scene.ls", Laya.Handler.create(.......));
```


