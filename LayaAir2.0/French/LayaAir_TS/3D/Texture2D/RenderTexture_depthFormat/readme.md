#Format de profondeur

###### *version :2.1.0   Update:2019-5-25*

En informatique,**Tampon de profondeur**Est un procédé de traitement des coordonnées de profondeur d 'image dans une image tridimensionnelle, qui est généralement réalisé dans le matériel, peut également être réalisé dans un logiciel, c' est une solution au problème de visibilité.

Les formulaires de tampon de profondeur appuyés dans layaair3d sont les suivants:

​`FORMAT_DEPTH_16`

​`FORMAT_STENCIL_8`

​`FORMAT_DEPTHSTENCIL_16_8`

####Définir un format de profondeur dans un code


```typescript

......
//选择渲染目标为纹理
renderTargetCamera.renderTarget = new Laya.RenderTexture(2048, 2048);
//设置深度格式
renderTargetCamera.renderTarget.depthStencilFormat = Laya.BaseTexture.FORMAT_DEPTH_16;
......
```


(adresse Demo)
