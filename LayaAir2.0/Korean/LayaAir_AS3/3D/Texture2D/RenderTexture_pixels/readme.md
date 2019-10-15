#RenderTexture 픽셀 읽기

###### *version :2.1.0   Update:2019-5-25*

기존 렌더스튜어의 사용은 실시간으로 ‘ 카메라 ’ 를 사용하고 있다.하지만 나는 카메라처럼 사진 한 장을 많이 찍어야 한다. 이렇게 하면 렌더스처를 사용할 수 있다.`getData`픽셀 읽기 인터페이스'사진'기능 실현.

[] (img/1.png)<br>(1)

다음 코드 (demo 주소):


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


렌더를 시작하면 우리는 시각을 조정하면 사진을 찍는 효과를 볼 수 있다.

[] (img/2.gif)<br>(2)