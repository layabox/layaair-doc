#인clude 추가

###### *version :2.3.0   Update:2019-10-8*

비교적 복잡한 Shader 를 구축할 때 개발자는 도구 라이브러리를 구축할 수 있으며, 자신의 후속 개발에 편리하다.이때 코드가 필요해요.`addInclude`대응 라이브러리.

인용이 필요할 때 아래 코드에 따라 인용할 수 있습니다.

**주의:**인용 수요`addPass`이전

> 인용된 방식으로 파일 가져오기


```typescript

import LightingGLSL from "./files/Lighting.glsl";
import BRDFGLSL from "./files/PBRLibs/BRDF.glsl";
import PBRSpecularLightingGLSL from "./files/PBRLibs/PBRSpecularLighting.glsl";
import PBRStandardLightingGLSL from "./files/PBRLibs/PBRStandardLighting.glsl";
import PBRUtilsGLSL from "./files/PBRLibs/PBRUtils.glsl";
import ColorsGLSL from "./files/postProcess/Colors.glsl";
import ShadowHelperGLSL from "./files/ShadowHelper.glsl";
import SamplingGLSL from "./files/postProcess/Sampling.glsl";
import StdLibGLSL from "./files/postProcess/StdLib.glsl";
```


> Include 를 추가합니다.Layaiar3D 인용 라이브러리


```typescript

Laya.Shader3D.addInclude("Lighting.glsl", LightingGLSL);
Laya.Shader3D.addInclude("ShadowHelper.glsl", ShadowHelperGLSL);
Laya.Shader3D.addInclude("BRDF.glsl", BRDFGLSL);
Laya.Shader3D.addInclude("PBRUtils.glsl", PBRUtilsGLSL);
Laya.Shader3D.addInclude("PBRStandardLighting.glsl",PBRStandardLightingGLSL);
Laya.Shader3D.addInclude("PBRSpecularLighting.glsl",PBRSpecularLightingGLSL);
Laya.Shader3D.addInclude("Colors.glsl", ColorsGLSL);
Laya.Shader3D.addInclude("Sampling.glsl", SamplingGLSL);
Laya.Shader3D.addInclude("StdLib.glsl", StdLibGLSL);
```


