#PBRSpecularmaterial 소재 상세

###### *version :2.1.0beta   Update:2019-5-14*

이 소재는 PBRStandardMaterial 의 소재와 마찬가지로 물리 반사에 기반한 소재이지만 이 소재는 하이라이트에 기반한 소재다.상용어로 매끄러운 메탈 느낌의 소재입니다.

#####주요 속성과 방법

> 속성

`albedoColor:Vector4 `반사율 색상.

`albedoTexture:BaseTexture`만반사 스티커.

`emissionColor:Vector4`방사 색.

`enableEmission:Boolean`방사성 활성화 여부.

`enableReflection:Boolean`반사 여부.

`normalTexture:BaseTexture`법선 스티커.

`normalTextureScale:Number`법선 스티커 조정 계수.

`occlusionTexture:BaseTexture`커버 스티커.

`occlusionTextureStrength:Number`커버 스티커 강도.

`parallaxTexture:BaseTexture`시차 스티커

`parallaxTextureScale:Number`시차 포토 축소 계수.

`renderMode:int`[write-only] 렌더 모드를 설정합니다.

`smoothness:Number`반들반들하다.

`smoothnessSource:int`광활도 데이터 원본.

`smoothnessTextureScale:Number`윤활도 축소 계수.

`specularColor:Vector4`하이라이터 컬러.

`specularTexture:BaseTexture`하이라이트 스티커.

`tilingOffset:Vector4`무늬 평포와 편향.




