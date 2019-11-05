#3D 장면을 어떻게 사용하고 2D 인물을 혼합 개발할 것인가

###### *version :2.2.0bate4   Update:2019-9-11*

Layaiair3D에서 3D 좌표를 화면좌표로 바꾸는 것을 지원합니다.

여기서 써야 돼요.**Camera**중**viewport**눈의`project`3차원 벡터 인터페이스를 바꾸다.

[] (img/1.png)<br>(1)

> 위치 변경 및 크기 조정

2D의 배합 패턴의 영향에 주의하십시오.과[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=Secne3DPlayer2D)차다


```typescript

//变换位置
this._position.x = Math.sin(this.scaleDelta += 0.01)  * 2;
this._position.z = Math.cos(this.scaleDelta += 0.01) * 2;
//修改球的位置
this.sphere.transform.position = this._position;
//计算位置
this._camera.viewport.project(this._position, this._camera.projectionViewMatrix, this._outPos);
this._layaMonkey2D.pos(this._outPos.x / Laya.stage.clientScaleX, this._outPos.y / Laya.stage.clientScaleY);

this._layaMonkey2D.scaleX = this._layaMonkey2D.scaleY =  0.125 * this._position.z + 0.75;

```


[] (img/2.gif)<br>(2)