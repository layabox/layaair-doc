#2D 지도3D 인물을 섞어 게임 개발을 진행하도록 하겠습니다.

###### *version :2.2.0bate4   Update:2019-9-11*

레이아라 3D에서 정교 투영 카메라에서 스크린 좌표가 세계 좌표로 변환하는 것을 지원한다.

이거 써야 돼.**Camera**의`convertScreenCoordToOrthographicCoord`인터페이스.

**주의:**이 인터페이스는 화소의 값을 대비해야 한다.2D 세계의 알맞은 패턴**물리 해상도 모드**또한 축소된 적절한 패턴을 사용하여 stage 를 줄일 수 있으므로 개발자는 전가 시 통합참고과에 주의해야 한다. 적절한 패턴에 대해 구체적으로 문서를 볼 수 있다.[屏幕适配的缩放模式详解](https://ldc2.layabox.com/doc/?nav=zh-as-1-8-3).

[] (img/1.png)<br>(1)

다음 코드는 공식 예시의 기초에 클릭 이벤트를 추가해 클릭 장면을 통해 원숭이를 대응할 수 있다.과[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Advance&name=Scene2DPlayer3D)무엇

> 원숭이 방치


```typescript

//监听一次点击事件
Laya.stage.once(Laya.Event.MOUSE_DOWN,this,function () 
{
    scene.addChild(layaMonkey);
    this._layaMonkey = layaMonkey;
    //设置缩放
    var tmpLocalScale = layaMonkey.transform.localScale;
    tmpLocalScale.setValue(0.3, 0.3, 0.3);
    layaMonkey.transform.localScale = tmpLocalScale;
    /*添加部分*/
    _pos.x = Laya.stage.mouseX;
    _pos.y = Laya.stage.mouseY;
    
    //转换2D屏幕坐标系统到3D正交投影下的坐标系统
    camera.convertScreenCoordToOrthographicCoord(this._pos, this._translate);
    layaMonkey.transform.position = _translate;
    //设置选择
    var tmpRotationEuler = layaMonkey.transform.rotationEuler;
    tmpRotationEuler.setValue(-30, 0, 0);
    layaMonkey.transform.rotationEuler = tmpRotationEuler;
});
```


[] (img/2.gif)<br>

(2)
