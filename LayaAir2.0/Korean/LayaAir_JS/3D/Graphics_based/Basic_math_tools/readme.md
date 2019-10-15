#레이아일랜드 기초 수학 도구

좌표과를 말하고 3D에서 자주 사용하는 수학 도구를 소개합니다.(본편의 예례는 빠른 시작 편 예제 항목)

**벡터**

​**Vector2**2차원 벡터**Vectoor3**3차원 벡터**Vectoor4**4차원 벡터는 Layair 3D 엔진에서 사용하는 것이 매우 빈번하고, 2차원 벡터부터 사차원 벡터까지 여기저기 모습을 볼 수 있다.가장 기초적인 용법은 예시에서 부가용으로 사용된다.

코드 중 3D 대상의 이동, 회전, 축소 등 변환은 Vector3 을 사용하여 X, y, z 축 좌표 값으로 사용됩니다.더 자세하게 사용하면 볼 수 있어요.[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Vector3).

**색깔**

그렇다면 각종 컬러 속성부치에서 3차원 벡터의 값은 R, G, B 3가지 색깔을 대표하며 각각 레드, 녹색, 블루로 분류됐다.4차원 벡터는 색상 인자로 사용되고, Vector4 의 우치를 대표하는 Alpha 수치도 있다.Layaiair 3D 엔진 중 세 가지 색상의 최대 값은 1로, 전체적으로 크기가 높을수록 색상이 밝을수록 어두운 색상이 나타나면 1을 넘어 노출된다.

레드, 녹색, 블루는 어떤 색으로 조합할 수 있는지 초보자들은 게임 미술 디자이너들에게 문의할 수 있으며, 예를 들면, 빨간색, 붉은색, 빨간색, 블루 등은 일반적으로 프로젝트 개발 과정에서 프로그래머들은 색상 값을 반복해서 테스트하는 효과가 있다.

예시 중 이하 코드가 벡터로 색상 값으로 사용되었습니다:


```typescript

	//设置方向光的颜色
	directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
```


**4원수 (Quaternion)**

4원 수는 레이어에서 회전을 계산하는 데 사용된다.그것들의 계산은 고효로, 만향절의 자물쇠에 시달리지 않고 빠른 속도로 볼 수 있다.

4위안 수 사용에 대한 수요가 있으면 스스로 이해할 수 있다.여기 제공[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Quaternion).

**포위함 (BoundBox)**

포위함 산법은 이산점이 가장 우수한 포위공간을 구출하는 방법이다. 기본사상은 부피가 크고 특성적이고 단순한 기하체(포위함)로 근사히 복잡한 기하학 대상을 대체한다.Layaiar3D 지원 3중 포위함, 더 자세한 인터페이스 설명[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.BoundBox).

**행렬 (Matrix)**

매트릭스는 장기 진열에 따라 배열된 복수나 실수 집합이다.Layair3D에서 지원합니다**3X3 매트릭스[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix3x3)차다**과**4X4 매트릭스[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix4x4)차다**매트릭스 두 가지.

**사선 (Ray)**

사선은 데이터 유형이며, 디스플레이 대상이 아니라, 그것은 있다**원점**과**방향direction**두 가지 속성.

![图](img/1.png)< br > (그림 1)
