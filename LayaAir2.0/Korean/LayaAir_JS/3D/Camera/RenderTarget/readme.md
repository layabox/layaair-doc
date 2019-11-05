# 目标纹理的使用

###### *version :2.0.1beta   Update:2019-3-19*

목표 무늬는 카메라를 가리킨다.**RenderTarget**속성.이것은 카메라의 보기를 하나의 무늬에 놓아 이 무늬는 다른 대상에 적용할 수 있다.이렇게 하면 거울 만들기, 카메라 모니터링 등 효과가 편리하다.이 속성 카메라를 사용하여 스크린에 사용할 수 있는 기능을 사용했습니다.

여기에서 우리가 사용하는 예례의 코드[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=RenderTargetCamera)무엇camera 는 광경 카메라를 보며, rendertCamera는 Rendertrget 속성을 활성화시키는 카메라를 시작합니다.


```typescript

//设置目标纹理
renderTargetCamera.renderTarget = new Laya.RenderTexture(2048, 2048);
//设置顺序
renderTargetCamera.renderingOrder = -1;
```


Layair 엔진에서 렌더링 순서는 작을수록 우선도가 높다.


```typescript

//获取场景中预先放置的屏幕
var renderTargetObj = scene.getChildAt(0).getChildByName("RenderTarget");
//在按钮点击后  将目标纹理赋值给屏幕。
this.changeActionButton.on(Laya.Event.CLICK, this,function() {
    //设置网格精灵的纹理
	renderTargetObj.meshRenderer.material.albedoTexture = renderTargetCamera.renderTarget;
 });
```


[] (img/1.png)<br>(1) 버튼 누르기 전에 누르기

[] (img/2.png)<br>(2) 단추를 누르고