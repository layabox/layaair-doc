#유닛에서 트랙터 시스템 내보내기

###### *version :2.1.1beta   Update:2019-8-2*

Layaiar3D 플러그인에서 지원합니다**TrailRenderer**부품 내보내기.

저희가 일단 유닛 3D에 Sphere 에 첨가할게요.`Trail Renderer`그리고 간단한 트랙 효과를 제작했다.효과는 그림 1과 같다.

[] (img/1.png)<br>(1)

편집이 끝난 후에 우리는 미리 미리 내보내는 것을 선택했다.

**Tip**트랙터 사용한 소재는 오직`LayaAir3D/Trail Shader`다른 Shader 가 내보내면 이 Trail Shader로 자동으로 이동합니다.자동 변환은 실제 효과와 디자인의 효과가 비교적 큰 편차가 있기 때문에 디자인할 때 주의해야 한다.

[] (img/2.png)<br>(2)

**주의:**트레일러를 착용한 대상이 내보내면 트롤 요정이며 모형을 휴대하지 않고, 여기에서 내보내면 Sphere 가 없다.그래서 내보내면 대상에 추가해야 합니다.

여기에 IDE 3D를 사용한 예시 항목을 간단히 개정합니다.


```typescript

//....上面为原本示例代码,去掉了示例代码的旋转摄像机
//加载拖尾
Sprite3D.load('LayaScene_tst/Conventional/Sphere.lh',Handler.create(this,function(sp:Sprite3D):void{
    //将加载的拖尾添加给示例盒子
    box.addChild(sp);
    //为了体现效果，我们移动盒子和摄影机观察效果
    Laya.timer.frameLoop(1,this,function():void{
        //使用差速来体现移动
        box.transform.translate(new Vector3(0,0.05,0),false);
        camera.transform.translate(new Vector3(0,04,0),false);
    });
}));
```


[] (img/3.gif)<br>(3)

