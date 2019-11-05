#Includeを追加

###### *version :2.3.0   Update:2019-10-8*

より複雑なShaderを構築する時、開発者はツールライブラリを構築して、自分の後続の開発に便利になるかもしれません。この時点でコードに必要です。`addInclude`対応クラス。

参照が必要な場合は、以下のコードに従って参照を追加すればいいです。

**注意:**引用は`addPass`前に

>参照の方式でファイルをインポートします。


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


>Includeを追加します。LayaAir 3 D引用ライブラリ


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


