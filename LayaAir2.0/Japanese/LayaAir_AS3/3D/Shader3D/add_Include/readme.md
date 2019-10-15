#Includeを追加

###### *version :2.3.0   Update:2019-10-8*

より複雑なShaderを構築する時、開発者はツールライブラリを構築して、自分の後続の開発に便利になるかもしれません。この時点でコードに必要です。`addInclude`対応クラス。

参照が必要な場合は、以下のコードに従って参照を追加すればいいです。

**注意:**引用は`addPass`前に

>Includeを追加します。LayaAir 3 D引用ライブラリ


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


