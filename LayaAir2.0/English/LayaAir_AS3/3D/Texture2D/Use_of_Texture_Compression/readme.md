# Texture2D的GPU纹理压缩的使用

###### *version :2.1.0   Update:2019-5-25*

Texture is already supported in the 2.0 official version. When Unity is exported, the platform corresponding to the platform can be selected in the tool panel.

![] (img/1.png)<br> (Figure 1)

**IOS and Android**Support texture compression function, because Android and IOS texture compression pictures are completely different, so resources must be divided into three parts.

**Conventional**Universal platform, just ordinary JPG and PNG.

Let's look at the list of exported resources:

![] (img/2.png)<br> (Figure 2)

After export, it is divided into three different folders, corresponding to the resources available for the three platforms.

Examples of texture compression usage（[地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Texture&name=TextureGPUCompression))

It is used here.`URL.basePath`Method, to set the loading path, and different platforms load different resources to use compressed texture


```typescript

if (Browser.onAndroid)
    URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Android/";
else if (Laya.Browser.onIOS)
   	URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/IOS/";
else
    URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Conventional/";

Scene3D.load("scene.ls", Handler.create(.......));
```


