# RenderTexture的像素读取

###### *version :2.1.0   Update:2019-5-25*

​	在之前的RenderTexture的使用还是实时的渲染 “摄像机”。但是在很多的时候我需要像相机一样 “拍”一张照片，这样我们就可以使用RenderTexture的 `getData` 像素读取接口来实现 “拍照” 功能。

![](img/1.png)<br>(图1)

​	下面的代码来自于官方示例（demo地址）:

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

在开始渲染后，我们调整视角就可以看到拍照的效果了。

![](img/2.gif)<br>(图2)