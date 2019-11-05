#Use of Target Texture

###### *version :2.0.1beta   Update:2019-3-19*

Target texture refers to the camera.**RenderTarget**Attribute. It places the camera's view on a texture that can be applied to another object. This makes it easy to create mirrors, monitor cameras and other effects. Notice that the camera using this property disables rendering to the screen.

The examples we use here（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=RenderTargetCamera)) Code. Camera is the scene rendering camera, renderTarget Camera is the camera that opens the RenderTarget attribute.


```typescript

//设置目标纹理
renderTargetCamera.renderTarget = new Laya.RenderTexture(2048, 2048);
//设置顺序
renderTargetCamera.renderingOrder = -1;
```


In LayaAir engine, the order of rendering is smaller, the priority of rendering is higher.


```typescript

//获取场景中预先放置的屏幕
var renderTargetObj = scene.getChildAt(0).getChildByName("RenderTarget");
//在按钮点击后  将目标纹理赋值给屏幕。
this.changeActionButton.on(Laya.Event.CLICK, this, function(){
			(renderTargetObj.meshRenderer.material as BlinnPhongMaterial).albedoTexture = renderTargetCamera.renderTarget;
 });
```


![] (img/1.png)<br> (Figure 1) before the button is clicked

![] (img/2.png)<br> (Figure 2) After clicking the button