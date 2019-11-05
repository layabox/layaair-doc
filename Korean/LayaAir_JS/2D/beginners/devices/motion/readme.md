#laya.device.motion 상세: 팽이 와 가속계

[TOC]

laya.device.motion 중 4개의 종류 공급자를 사용하여 각각 정보 AcccccelrationInfo, 가속계 Accccellerator, 팽이 Gyroscope, 회전 정보 저장 Rotationfo.이 데이는 laya.device.motion API 관련 내용을 상세하게 설명합니다.

##1, 팽이

​`Gyroscope`통과하다`change`사건이 설비 방향에 대하여 감청을 진행하다.이 사건은 두 개의 반향 변수:

##--`absolute`—만약 설비가 제공되는 방위가 설비 좌표 시스템과 지구 좌표 시스템 사이의 차이라면`true`만약 장치가 지구좌표 시스템에 검출되지 않는다면`absolute`되다`false`. `rotationInfo`—Rotationinfo 형식, 포함`alpha`、`beta`、`gamma`세 값은 아래에서 자세하게 토론할 것이다.

​`alpha`、`beta`과`gamma`속성은 장치의 방향을 지시해야 하며, 그 표현 형식은 지구상에서 고정된 좌표계에서 고정된 장치에 고정된 좌표계로 변환된다.좌표학과는 반드시 아래의 설명에 따라 조정해야 한다.

지구 좌표학과는 사용자의 위치에 위치한 동쪽, 북쪽, 상계이다.84 세계측지 시스템의 spheriod 의 사용자 위치를 갖춘 3개 축이 있다.

- 동(X)은 지상에서 북축에서 수직으로 동쪽을 향하고 있다.

- 北(Y)는 지상에서 정북으로 향하고 있다.

- 상위(Z)는 지면에 수직으로 올라가는 것이 정직하다.

전화나 플랫폼, 장치 좌표학과의 표준 방향으로 설정합니다.장치가 회전하거나 활동키보드를 펼칠 때 화면 방향이 달라진다면 장치의 좌표계 방향에 영향을 주지 않는다.

-x 화면이나 키보드 평면에 화면이나 키보드의 오른쪽이 정확합니다.

-y 는 화면이나 키보드 화면에 스크린이나 키보드의 위쪽을 정정합니다.

-z 는 스크린이나 키보드 화면이나 키보드를 떠날 때 정확합니다.

회전은 반드시 오른손 규칙을 사용해야 하며, 즉 한 축을 따라 이 축의 방향으로 회전하는 방향으로 시계바늘을 돌려야 한다.두 개의 계열에서 다시 시작하여 다음 규칙을 회전:

일.####설비 좌표계 z 축 을 축 으로 회전 하다`alpha`도`alpha`역할은 [0, 360].

![blob.png](img/1.png)< br >>
(그림 1)

이.####장치 좌표계 x 축으로 회전`beta`도`beta`역할은 [-180, 180].

![blob.png](img/2.png)< br >>
(2)

삼.####장치 좌표계 y 축은 축으로 회전`gamma`도`gamma`역할은[-90, 90].

![blob.png](img/3.png)< br >>
(그림 3)
회전 방위 정보를 보여 줍니다:


```typescript

Laya.init(550, 400);

this.info = new Laya.Text();
this.info.fontSize = 50;
this.info.color = "#FFFFFF";
this.info.size(Laya.stage.width, Laya.stage.height);
 Laya.stage.addChild(this.info);

 Laya.Gyroscope.instance.on(Laya.Event.CHANGE, this, onDeviceorientation);

function onDeviceorientation(absolute, rotationInfo) {
    this.info.text =
        "alpha:" + Math.floor(rotationInfo.alpha) + '\n' +
        "beta :" + Math.floor(rotationInfo.beta) + '\n' +
        "gamma:" + Math.floor(rotationInfo.gamma);
}
```




##2、가속계

​`Accelerator`정기적으로 장비를 발송하는 운동 센서 검사의 활동.이 데이터는 3차원축에 있는 운동을 나타낸다.장치가 이동할 때 센서가 이동하고 장치의 가속 좌표를 측정합니다.멈춰도 중력을 포함하는 가속 좌표를 얻을 수 있다.

​`change`이벤트 조정함수는 다음 인자를 가지고 있습니다:

##--`acceleration`—`AccelerationInfo`유형.숙주 설비 가 지구 좌표계 에 대한 가속 정보 를 제공하고, 그 표현 형식 은 팽이 장절 의 주 좌표계 를 정의하는 단위 는 단위 이다`m/s^2`. `accelerationIncludingGravity`—`AccelerationInfo`유형.중력의 영향을 배제할 수 없는 가속 데이터의 실현 (예를 들어 팽이가 부족한 대신 중력의 영향을 받는 가속데이터를 제공할 수 있다.많은 응용에 있어서는 좋지 않지만 이런 정보를 제공하는 것은 최대한의 지지를 제공하는 것이다.이 상황에서`accelerationIncludingGravity`속성이 숙주 설비의 가속 정보를 제공하고 가속도 상등방향의 반대 반중력을 가속화시킨다.그 표현 형식은 팽이 장절의 주좌표계를 정의한다.정보 를 가속 시키는 단위 는`m/s^2`.
##--`rotationRate`—`RotationInfo`유형.속성 제공 숙주 설비 는 공간 에서 회전 속도 를 그 표현 형식 은 팽이 장절 의 각도 변화 속도 를 지정 해 단위 는 반드시`deg/s`. `interval`—하드웨어에서 데이터를 얻은 간격, 단위는 밀리초입니다.

###2.1 장치 물리 방향 운동 정보 가져오기

가속계 축은 설비의 물리적 방향이다. 이것은 네가 설비를 회전하고 가속계 축도 따라서 회전할 수 있다는 것이다.

장치를 가져오는 운동 정보를 보여 줍니다:


```typescript

Laya.init(550, 400);

this.info = new Laya.Text();
this.info.fontSize = 50;
this.info.color = "#FFFFFF";
this.info.size(Laya.stage.width, Laya.stage.height);
Laya.stage.addChild(this.info);

Laya.Accelerator.instance.on(Laya.Event.CHANGE, this, onMotoin);

function onMotoin(acceleration, accelerationIncludingGravity, rotationRate, interval) {
    this.info.text =
        'acceleration:(' + acceleration.x.toFixed(3) + ', ' + acceleration.y.toFixed(3) + ', ' + acceleration.z.toFixed(3) + ')\n' +
        'accelerationIncludingGravity:(' + accelerationIncludingGravity.x.toFixed(3) + ', ' + accelerationIncludingGravity.y.toFixed(3) + ', ' + accelerationIncludingGravity.z.toFixed(3) + ')\n' +
        'rotationRate: alpha ' + Math.floor(rotationRate.alpha) + ', beta ' + Math.floor(rotationRate.beta) + ', gamma ' + Math.floor(rotationRate.gamma) + '\n' +
        'interval: ' + interval;
}
```


### **2.2 장치 표시 방향 운동 정보**

Google은 방향의 운행 정보를 표시할 수 있기 때문에, 장치를 회전해도 가속계 축이 달라지지 않는다는 뜻이다.사용하다`Accelerator.getTransformedAcceleration()`표시 방향의 실행 정보를 얻을 수 있습니다.

상례 코드`onMotion`함수 중 사용`AccelerationInfo`앞선 사용`Accelerator.getTransformedAcceleration()`변환 정보:


```typescript

function onMotoin(acceleration, accelerationIncludingGravity, rotationRate, interval)
{
	acceleration = Accelerator.getTransformedAcceleration(acceleration);
  	accelerationIncludingGravity = Accelerator.getTransformedAcceleration(accelerationIncludingGravity);
  	......
}
```
