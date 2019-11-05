#Detailed material description of PBR Specular Material

###### *version :2.1.0beta   Update:2019-5-14*

This material is based on physical reflection as PBRStandard Material, but this material is based on high light. Commonly used phrases are used to make smooth metallic materials.

#####Main attributes and methods

> attribute

`albedoColor:Vector4 `Reflectivity color.

`albedoTexture:BaseTexture`Diffuse reflection mapping.

`emissionColor:Vector4`Radiation color.

`enableEmission:Boolean`Whether to activate the radiation properties.

`enableReflection:Boolean`Whether to turn on reflex or not.

`normalTexture:BaseTexture`Normal mapping.

`normalTextureScale:Number`Normal mapping scaling factor.

`occlusionTexture:BaseTexture`Occlusion maps.

`occlusionTextureStrength:Number`Occlusion map strength.

`parallaxTexture:BaseTexture`Parallax Mapping

`parallaxTextureScale:Number`Parallax map scaling coefficient.

`renderMode:int`[write-only] Sets the rendering mode.

`smoothness:Number`Smoothness.

`smoothnessSource:int`Smoothness data source.

`smoothnessTextureScale:Number` 光滑度缩放系数。

`specularColor:Vector4`High light color.

`specularTexture:BaseTexture`High-light mapping.

`tilingOffset:Vector4`Texture tiling and migration.




