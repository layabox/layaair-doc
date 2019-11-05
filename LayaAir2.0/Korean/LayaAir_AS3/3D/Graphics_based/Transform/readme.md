#Layair3D Transform 변환

앞에서 Layair3D의 좌표계와 기초 수학 도구를 말했는데, 예시 코드에서 transform 은 변환 대상 (() 입니다.[Transform3D](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.core.Transform3D)API, 그는 3D의 세계에서 매우 중요합니다. 모든 디스플레이 개체 변화에 관한 모든 것이 그에게 쓰입니다.

예시 코드에서 이동 (translate) 이 두 가지 변환, 3차원 벡터 대표x, y, z 의 값에 사용되었습니다.두 가지 방법은 모두 인자에서 일부 공간으로 이동할지 여부를 설정하여 회전할 수 있다.


```typescript

	//移动摄像机
	camera.transform.translate(new Vector3(0, 3, 3));
	//旋转摄像机
	camera.transform.rotate(new Vector3(-30, 0, 0), true, false);
```


회전 에 관해, transform3D 에서 두 개의 회전 인터페이스 를 제공했고, 하나의 각도 / 호도 회전`rotate`또 일종 은 오로라 뿔 회전 이다`localRotationEuler:Vector3`.

[] (img/1.png)<br>(1)

효과 를 편리하게 관찰하기 위해 공식 예제 를 절선했다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=TransformDemo)우선 우리**클론**두 원숭이(복제의 지식점은 요정 Sprite3D 의 장절 자세한 설명을 통해 효과를 볼 수 있으며 복제후에는 원숭이 두 개의 위치를 관찰하기 편리하다.


```typescript

//克隆sprite3d
var layaMonkey_clone1:Sprite3D = Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Vector3(0.0, 0, 0.5));
var layaMonkey_clone2:Sprite3D = Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Vector3(0.0, 0, 0.5));
var layaMonkey_clone3:Sprite3D = Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Vector3(0.0, 0, 0.5));
//平移
layaMonkey_clone1.transform.translate(new Vector3(1.5, 0, 0.0));
layaMonkey_clone2.transform.translate(new Vector3( -1.5, 0, 0.0));
layaMonkey_clone3.transform.translate(new Vector3( 2.5, 0, 0.0));
```


[] (img/2.png)<br>(2)

그리고 저희 회전과...**축소**바꾸다.우리는 복제체 1은 Y 축으로 90도 회전하고 복제체에 그의 축소 수치를 설정합니다 (0.5, 0.5, 0.5) 입니다.효과를 다시 보다.(이번 크기 조정 사용은 국부 축소와 국부축소 원점과 동일하며 참고의 좌표계와 달리 세계 축소하는 배수는 전역에 기반된다.


```typescript

//旋转
layaMonkey_clone2.transform.rotate(new Vector3(0, 60, 0), false, false);
//缩放
var scale:Vector3 = new Vector3(0.1, 0.1, 0.1);
layaMonkey_clone3.transform.localScale = scale;
```


[] (img/3.png)<br>(2)

위에 소개된 3 중 변환, transform 중 다른 상용 속성과 방법:

> 방법

`lookAt(target:Vector3, up:Vector3, isLocal:Boolean = false):void`목표 위치를 관찰하다.

> 속성

`localPosition:Vector3`국부 위치.

`localScale:Vector3`축소

`localMatrix:Matrix4x4`국부 행렬.

`position:Vector3`세계 위치.

`localRotation:Quaternion`국부 회전.

`scale:Vector3`세계 축소.

`worldMatrix:Matrix4x4`세계 매트릭스

`rotation:Quaternion`세계 회전.

`right:Vector3`[read-only] 오른쪽으로 갑니다.

`forward:Vector3`[read-only] 앞으로 가기.


####3D 세계 의 자부 관계

3D 세계에서 아버지의 노드 변환, 그 노드가 호응의 변환에 따라 변한다.하지만 노드 변경은 아버지의 물체에 영향을 주지 않는다.