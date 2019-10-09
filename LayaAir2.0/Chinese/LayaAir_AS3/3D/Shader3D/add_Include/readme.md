# 添加 Include

###### *version :2.3.0   Update:2019-10-8*

在构建一个比较复杂的Shader时，开发者可能会去构建一个工具库，方便自己的后续开发。在这时就需要在代码中 `addInclude` 对应类库 。

需要引用时可以按照下面的代码去添加引用即可。

**注意：**引用需要在 `addPass`之前

> 添加Include。LayaAir3D引用的类库

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

