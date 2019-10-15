#RenderTexture Pixel Reading

###### *version :2.1.0   Update:2019-5-25*

In the past, Render Texture was used to render "cameras" in real time. But a lot of times I need to "take" a picture like a camera, so we can use RenderTexture.`getData`Pixel reading interface realizes the function of "photographing".

![] (img/1.png)<br> (Figure 1)

The following code comes from the official example (demo address):


```typescript

//在按钮按下后执行的逻辑
//将相机的渲染目标作为纹理传递给BlinnPhong材质的纹理
(renderTargetObj.meshRenderer.material as BlinnPhongMaterial).albedoTexture = renderTargetCamera.renderTarget;
var boxMaterial:BlinnPhongMaterial = box.meshRenderer.material as BlinnPhongMaterial;
//获取BlinnPhong材质的纹理
var tex:Texture2D = boxMaterial.albedoTexture as Texture2D;
//获取相机渲染目标的像素数据,默认renderTarget的颜色为RGBA
var out:Uint8Array = new Uint8Array(2048*2048*4); 
renderTargetCamera.renderTarget.getData(0, 0, 2048, 2048, out);
//设置纹理的填充像素像素
tex.setPixels(out);
```


After we start rendering, we can adjust the angle of view to see the effect of the photograph.

![] (img/2.gif) <br> (Figure 2)