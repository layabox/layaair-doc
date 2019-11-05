#무늬의 격식

###### *version :2.1.0   Update:2019-5-25*

현재 Layaiar3D가 지원하는 텍스처 형식:

**Tip**아래에 있는 예에서 우리는 게임에서 텍스처의 최종 크기를 256x256픽셀로 사용했습니다.

> 플랫폼 통용

`FORMAT_R8G8B8`정말 컬러, 하지만 Alpha 값은 없습니다.(192 KB 256x256)

`FORMAT_R8G8B8A8`진채색, alpha 통로가 있다.alpha 통로가 가장 높은 퀄리티 소재 형식입니다.이것은 주로 투명 스티커에 사용된다.(256 KB 256x256)

`FORMAT_ALPHA8`고품질 alpha 채널 색상 없이.(64 KB 256x256)

> 윈도

`FORMAT_DXT1`압축된 RGB 무늬.이것은 가장 흔한 만반사 무늬 형식이다.4위 / 픽셀 (32KB 256x256)

`FORMAT_DXT5`압축된 RGBA 무늬.1 바이트 / 픽셀 (64 KB 256x256)

> 앤드로이드

`FORMAT_ETC1RGB`압축된 RGB 무늬.앤드로이드 프로젝트의 기본 텍스처 형식입니다.ETC1 은 OpenGL ES 2.0 기준의 일부이며 모든 OpenGL ES 2.0 GPU 를 지원하지만 Alpha 를 지원하지 않는다.4위 / 픽셀 (32KB 256x256)

> 아이오스

`FORMAT_PVRTCRGB_2BPPV`압축된 RGB 무늬.2위 / 픽셀 (16 KB 256x256)

`FORMAT_PVRTCRGBA_2BPPV`압축된 RGBA 무늬.2위 / 픽셀 (16 KB 256x256)

`FORMAT_PVRTCRGB_4BPPV`압축된 RGB 무늬.4위 / 픽셀 (32KB 256x256)

`FORMAT_PVRTCRGBA_4BPPV`압축된 RGBA 무늬.4위 / 픽셀 (32KB 256x256)