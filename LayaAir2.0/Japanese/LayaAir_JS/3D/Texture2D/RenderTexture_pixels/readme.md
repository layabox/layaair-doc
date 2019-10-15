#Render Textureの画素読み出し

###### *version :2.1.0   Update:2019-5-25*

これまでのRenderTextureの使用は、やはりリアルタイムでレンダリングされた「カメラ」です。でも、たくさんの時にはカメラのように写真を撮りたいです。これでRenderTextureを使うことができます。`getData`画素読み出しインターフェースは、「写真撮影」機能を実現します。

！[](img/1.png)<br/>(図1)

以下のコードは、公式の例（demoアドレス）から来ています。


```typescript

//在按钮按下后执行的逻辑
//将相机的渲染目标作为纹理传递给BlinnPhong材质的纹理
renderTargetObj.meshRenderer.material.albedoTexture = renderTargetCamera.renderTarget;
var boxMaterial = box.meshRenderer.material;
//获取BlinnPhong材质的纹理
var tex = boxMaterial.albedoTexture;
//获取相机渲染目标的像素数据,默认renderTarget的颜色为RGBA
var out = new Uint8Array(2048*2048*4); 
renderTargetCamera.renderTarget.getData(0, 0, 2048, 2048, out);
//设置纹理的填充像素像素
tex.setPixels(out);
```


レンダリングを開始したら、私たちは画角を調整して写真を撮る効果が見られます。

！[](img/2 gif)<br/>(図2)