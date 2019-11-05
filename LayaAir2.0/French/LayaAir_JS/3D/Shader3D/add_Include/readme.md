#Ajouter

###### *version :2.3.0   Update:2019-10-8*

En construisant un Shader plus complexe, le développeur pourrait créer une banque d'outils pour faciliter son propre développement ultérieur.C'est dans le Code.`addInclude`Bibliothèque de correspondance

Si vous avez besoin d 'une référence, vous pouvez ajouter la référence selon le code ci - dessous.

**Attention:**Besoin de citation`addPass`Avant

> importer des fichiers par référence


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


> ajouter.Bibliothèques citées par layaair3d


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


