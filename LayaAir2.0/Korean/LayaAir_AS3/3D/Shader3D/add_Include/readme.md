#인clude 추가

###### *version :2.3.0   Update:2019-10-8*

비교적 복잡한 Shader 를 구축할 때 개발자는 도구 라이브러리를 구축할 수 있으며, 자신의 후속 개발에 편리하다.이때 코드가 필요해요.`addInclude`대응 라이브러리.

인용이 필요할 때 아래 코드에 따라 인용할 수 있습니다.

**주의:**인용 수요`addPass`이전

> Include 를 추가합니다.Layaiar3D 인용 라이브러리


```typescript

Shader3D.addInclude("Lighting.glsl", __INCLUDESTR__("files/Lighting.glsl"));

Shader3D.addInclude("ShadowHelper.glsl", __INCLUDESTR__("files/ShadowHelper.glsl"));

Shader3D.addInclude("BRDF.glsl", __INCLUDESTR__("files/PBRLibs/BRDF.glsl"));

Shader3D.addInclude("PBRUtils.glsl", __INCLUDESTR__("files/PBRLibs/PBRUtils.glsl"));

Shader3D.addInclude("PBRStandardLighting.glsl",__INCLUDESTR__("files/PBRLibs/PBRStandardLighting.glsl"));

Shader3D.addInclude("PBRSpecularLighting.glsl",__INCLUDESTR__("files/PBRLibs/PBRSpecularLighting.glsl"));

Shader3D.addInclude("Colors.glsl", __INCLUDESTR__("files/postProcess/Colors.glsl"));

Shader3D.addInclude("Sampling.glsl", __INCLUDESTR__("files/postProcess/Sampling.glsl"));

Shader3D.addInclude("StdLib.glsl", __INCLUDESTR__("files/postProcess/StdLib.glsl"));
```


