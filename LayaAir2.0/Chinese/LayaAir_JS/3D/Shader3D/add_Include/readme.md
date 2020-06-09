# 添加 Include

###### *version :2.7.0   Update:2020-6-9*

在构建一个比较复杂的Shader时，开发者可能会去构建一个工具库，方便自己的后续开发。在这时就需要在代码中 `addInclude` 对应类库 。

需要引用时可以按照下面的代码去添加引用即可。

**注意：**引用需要在 `addPass`之前

> 引用的方式导入文件

```typescript
let LightingGLSL = `...这里面是Shader源码`;
let BRDFGLSL = `...这里面是Shader源码`;
let PBRSpecularLightingGLSL = `...这里面是Shader源码`;
let PBRStandardLightingGLSL = `...这里面是Shader源码`;
let PBRUtilsGLSL = `...这里面是Shader源码`;
let ColorsGLSL = `...这里面是Shader源码`;
let ShadowHelperGLSL = `...这里面是Shader源码`;
let SamplingGLSL = `...这里面是Shader源码`;
let StdLibGLSL = `...这里面是Shader源码`;
```

> 添加Include。LayaAir3D引用的类库

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