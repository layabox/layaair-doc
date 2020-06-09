# 添加 Include

###### *version :2.7.0beta   Update:2020-6-9*

在构建一个比较复杂的Shader时，开发者可能会去构建一个工具库，方便自己的后续开发。在这时就需要在代码中 `addInclude` 对应函数库 。

需要引用时可以按照下面的代码去添加引用即可。

**注意：**引用需要在 `addPass`之前

> 引用的方式导入文件

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

> 添加Include，LayaAir引用的函数库

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

需要注意的是:同一个库文件只能addInclude一次，否则会报错。