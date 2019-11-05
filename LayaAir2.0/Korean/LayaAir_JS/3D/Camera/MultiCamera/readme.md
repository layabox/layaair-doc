#다중 카메라 창 사용

###### *version :2.2.0   Update:2019-8-24*

같은 장면에서 다양한 카메라를 사용할 수 있으며, 장면에 가재된 후에는 각자의 게임 보기 화면이 생길 수 있다.우리가 이전에 만났던 게임에서 2인3D 게임을 사용하면 23D 카메라를 사용했고, 왼쪽 스크린에서 한 게이머를 나타내며, 오른쪽 스크린에서 다른 것을 보여, 매우 풍부한 게임성을 보여 준다.

하지만 멀티카메라의 단점은 성능을 많이 소모하고, 모형 삼각면수와 DrawCall 수량이 배로 상승할 수 있으며, 몇 배의 기능이 소모되므로 개발자들은 심사숙고해야 한다.

3D 장면의 크기는 위치와 2D 게임과 다르게, 주로 카메라의 시선(Viewport)을 통해 스크린 분할을 진행한다.

다음 경우에는 우리가 한 장면을 생성하고, 간단하게 모형을 적용하고, Viewport를 통해 좌우 시각 분리, 코드:


```typescript

//创建场景
var scene = Laya.stage.addChild(new Laya.Scene3D());
//创建相机1
var camera1 = scene.addChild(new Laya.Camera(0, 0.1, 100));
//设置相机1清除颜色
camera1.clearColor = new Laya.Vector4(0.3, 0.3, 0.3, 1.0);
camera1.transform.translate(new Laya.Vector3(0, 0, 1.5));
//设置裁剪空间的视口
camera1.normalizedViewport = new Laya.Viewport(0, 0, 0.5, 1.0);

//创建相机2
var camera2 = scene.addChild(new Laya.Camera(0, 0.1, 100));
camera2.clearColor = new Laya.Vector4(0.0, 0.0, 1.0, 1.0);
camera2.transform.translate(new Laya.Vector3(0, 0.15, 0.5));
camera2.normalizedViewport = new Laya.Viewport(0.5, 0.0, 0.5, 0.5);

//添加平行光
var directionLight = scene.addChild(new Laya.DirectionLight());

//加载模型
Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(null, function(sp){
    //将模型加到场景上
    var layaMonkey = scene.addChild(sp);
}))
```


상술한 코드를 편집해서 실행 효과는 그림 6과 같다.개발자들은 동시에 테스트를 할 수 있으며, 싱글 카메라에 있을 때, 드래wCall, 삼각면수가 적게 될 수 있다.과[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=MultiCamera)차다

[] (img/1.png)<br>(1)

####Camera 의 눈 수정

위의 예에 우리는 카메라의 시각을 설치했다.우리는 위쪽 코드 기초에서 동태 수정 카메라를 진행한다.

**주의:** `Camera`의`normalizedViewport`공간을 재단하는 시각과`viewport`화면 픽셀 좌표의 눈은 모두 get/set 방법이다.그래서 카메라 인자 인자를 수정할 때 단순한 지식 개정 인자 인자 변수를 수정할 수 없고, 시각 재부치를 필요로 한다.

> 동기 수정 카메라 뷰어


```typescript

Laya.timer.once(3000,this,function () 
{	
    //获取第一个摄影的视口
    var viewport1 = camera1.normalizedViewport;
    //修改参数
    viewport1.width = 0.2;
    //重新赋值是视口
    camera1.normalizedViewport = viewport1;

    var viewport2 = camera2.normalizedViewport;
    viewport2.width = 0.8;
    viewport2.x = 0.2;
    camera2.normalizedViewport = viewport2;
});
```


[] (img/2.gif)<br>(2)

