#Ajouter

###### *version :2.3.0   Update:2019-10-8*

En construisant un Shader plus complexe, le développeur pourrait créer une banque d'outils pour faciliter son propre développement ultérieur.C'est dans le Code.`addInclude`Bibliothèque de correspondance

Si vous avez besoin d 'une référence, vous pouvez ajouter la référence selon le code ci - dessous.

**Attention:**Besoin de citation`addPass`Avant

> ajouter.Bibliothèques citées par layaair3d


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


