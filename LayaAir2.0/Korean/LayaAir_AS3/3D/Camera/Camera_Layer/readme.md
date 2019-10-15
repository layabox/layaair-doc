#가시 커버 레이어

###### *version :2.0.1beta   Update:2019-3-19*

우리가 게임을 만들 때, 우리는 어떤 장면에서 볼 수 없는 물체를 무시하고'은신'에 이르게 할 수 있다.이럴 때 저희가 쓸 수 있어요.**레이어 도층**이 속성.대상의 도층과 카메라를 설치할 수 있는 도층이 원하는 효과를 얻을 수 있다.

**Tip**Layaiair에서 카메라가 초기에 모든 도층을 볼 수 있기 때문에 사용하기 전에 호출해야 합니다**removeAllayers**방법은 모든 도층을 제거한다.

우리가 내놓은 장면을 보자.

[] (img/1.png)<br>(1)


```typescript

......
//设置图层
staticLayaMonkey.layer = 1;//本体猴
layaMonkey_clone1.layer = 2;
layaMonkey_clone2.layer = 3;
layaMonkey_clone3.layer = 4;
......
//移除所有图层
camera.removeAllLayers();
//添加显示图层(为相机添加一个蒙版)
camera.addLayer(5);
//显示用计数
layerIndex = 0
//给 ‘切换图层’ 按钮添加事件 每一次点击切换一个显示层
changeActionButton.on(Event.CLICK, this, function():void {
    //清除所有图层
    camera.removeAllLayers();
    //计数自加一
    layerIndex ++;
    //设置可视图层
    camera.addLayer(layerIndex%4 + 1);
    //将地板图层加入，地板不参与事件
    camera.addLayer(5);
});
```


다음 효과 추가하기 (그림 2):

[] (img/2.gif)<br>(2)

이번 예례[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer)성
