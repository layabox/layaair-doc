# RenderTexture的像素读取

###### *version :2.1.0   Update:2019-5-25*

L 'utilisation antérieure de rendertexture est encore une "caméra" de rendu en temps réel.Mais dans bien des cas, j'ai besoin d'une photo, comme un appareil photo, pour qu'on puisse utiliser rendertexture.`getData`L 'interface de lecture de pixels permet de réaliser la fonction de "photographie".

[] (IMG / 1.png) <br > (Figure 1)

Le code suivant provient de l'exemple officiel (adresse Demo):


```typescript

//在按钮按下后执行的逻辑
//将相机的渲染目标作为纹理传递给BlinnPhong材质的纹理
(renderTargetObj.meshRenderer.material as Laya.BlinnPhongMaterial).albedoTexture = renderTargetCamera.renderTarget;
var boxMaterial = box.meshRenderer.material as Laya.BlinnPhongMaterial;
//获取BlinnPhong材质的纹理
var tex = boxMaterial.albedoTexture as Laya.Texture2D;
//获取相机渲染目标的像素数据,默认renderTarget的颜色为RGBA
var out = new Uint8Array(2048*2048*4); 
renderTargetCamera.renderTarget.getData(0, 0, 2048, 2048, out);
//设置纹理的填充像素像素
tex.setPixels(out);
```


Après avoir commencé à rendre compte, nous avons ajusté notre vue pour voir l 'effet de la photo.

[] (IMG / 2.gif) <br > (Figure 2)