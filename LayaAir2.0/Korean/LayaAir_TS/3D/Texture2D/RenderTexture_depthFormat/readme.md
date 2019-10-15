# RenderTexture的深度格式

###### *version :2.1.0   Update:2019-5-25*

컴퓨터 그래픽학에서**깊이 버퍼**3차원 그래픽에서 그림 심도 좌표를 처리하는 과정이다. 이 과정은 일반적으로 하드웨어에서 완성할 수 있으며, 그것은 소프트웨어에서 완성할 수 있으며, 그것은 시각적인 문제의 해결 방법이다.

Layair3D에서 지원하는 깊이 버퍼 형식:

​`FORMAT_DEPTH_16`

​`FORMAT_STENCIL_8`

​`FORMAT_DEPTHSTENCIL_16_8`

####코드 중 깊이 형식 설정


```typescript

......
//选择渲染目标为纹理
renderTargetCamera.renderTarget = new Laya.RenderTexture(2048, 2048);
//设置深度格式
renderTargetCamera.renderTarget.depthStencilFormat = Laya.BaseTexture.FORMAT_DEPTH_16;
......
```


(demo 주소)
