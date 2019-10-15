#다중 터치 사용

###### *version :2.1.1   Update:2019-8-2*

레이이아르 3D 중에도 여러 가지 터치를 지지하는 편이며 2D보다 더 편한 편이다.2D 중 여러 가지 촉진은 의탁이다.`Event`사건의`touches:Array`[read-only] 터치 목록 속성, 이렇게 조작하는 것은 비교적 번거롭다.그런데 3D에서 사용한 게 스센서 장면에서 나왔습니다.`input:Input3D`3D 입력 속성은 어디에서 얻을 수 있으며 사용하기 매우 편리하다.

>>**주의 사항:**여러 가지 터치 제어 상황에서 한 줄만 사선을 측정할 수 있으니, 여러 터치 점의 중심점이다.여러 사선을 발사하려면 개발자가 스스로 처리해야 한다.

**인put3D 자세**

> 속성

[] (img/1.png)<br>(1)

> 방법

[] (img/2.png)<br>(2)

**Touch 속성**

[] (img/3.png)<br>(2)

아래의 예례 코드 선정은 공식 예례 (() 를 정한다.[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MultiTouch)무엇

주류에 원숭이에 스크립트를 첨가했다.동시에 무대에 다른 편의 출력 표시`Text`텍스트.

스크립트 종류:


```typescript

//重写脚本中的onUpdate方法
override public function onUpdate():void {
    var touchCount:int = _scene.input.touchCount();
    if (1 === touchCount){
        //判断是否为两指触控，撤去一根手指后引发的touchCount===1
        if (isTwoTouch){
            return;
        }
        _text.text = "触控点为1";
        //获取当前的触控点，数量为1
        var touch:Touch = _scene.input.getTouch(0);
        //是否为新一次触碰，并未发生移动
        if (first){
            //获取触碰点的位置
            lastPosition.x = touch.position.x;
            lastPosition.y = touch.position.y;
            first = false;
        }
        else{
            //移动触碰点
            var deltaY:int = touch.position.y - lastPosition.y;
            var deltaX:int = touch.position.x - lastPosition.x;
            lastPosition.x = touch.position.x;
            lastPosition.y = touch.position.y;
            //根据移动的距离进行旋转
            (owner as Sprite3D).transform.rotate(new Vector3(1 * deltaY /2, 1 * deltaX / 2, 0), true, false);
        }
    }
    else if (2 === touchCount){
        _text.text = "触控点为2";
        isTwoTouch = true;
        //获取两个触碰点
        var touch:Touch = _scene.input.getTouch(0);
        var touch2:Touch = _scene.input.getTouch(1);
        //是否为新一次触碰，并未发生移动
        if (first){
            //获取触碰点的位置
            disVector1.x = touch.position.x - touch2.position.x;
            disVector1.y = touch.position.y - touch2.position.y;
            distance = Vector2.scalarLength(disVector1);
            first = false;
        }
        else{
            disVector2.x = touch.position.x - touch2.position.x;
            disVector2.y = touch.position.y - touch2.position.y;
            var distance2:Number = Vector2.scalarLength(disVector2);
            //根据移动的距离进行缩放
            _camera.transform.translate(new Vector3(0, 0, -0.01 * (distance2 - distance)));
            distance = distance2;
        }	
    }
    else if (0 === touchCount){
        _text.text = "触控点归零";
        first = true;
        lastPosition.x = 0;
        lastPosition.y = 0;
        first = true;
        isTwoTouch = false;
    }
}
```


[] (img/4.gif)<br>(4)