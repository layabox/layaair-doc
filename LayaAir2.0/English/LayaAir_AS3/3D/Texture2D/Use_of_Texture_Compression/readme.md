# Texture2D的GPU纹理压缩的使用

###### *version :2.1.0   Update:2019-5-25*

在2.0正式版中已经支持纹理这个功能了。Unity导出时，在工具面板勾选平台对应的平台导出即可。

![](img/1.png)<br>(图1)

**IOS 与  Android**	支持纹理压缩功能，由于安卓和IOS的纹理压缩图片完全不一样，所以资源必须分三份。

**Conventional**    通用平台，只是普通的JPG和PNG。

我们来看下导出后的资源列表：

![](img/2.png)<br>(图2)

导出后分了3个不同的文件夹，对应的3个平台可以使用的资源。

纹理压缩使用示例（[地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Texture&name=TextureGPUCompression)）

在这里使用了 `URL.basePath` 方法，去设置加载路径，并且不同的平台加载不同的资源，来使用压缩纹理

```typescript
if (Browser.onAndroid)
    URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Android/";
else if (Laya.Browser.onIOS)
   	URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/IOS/";
else
    URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Conventional/";

Scene3D.load("scene.ls", Handler.create(.......));
```

