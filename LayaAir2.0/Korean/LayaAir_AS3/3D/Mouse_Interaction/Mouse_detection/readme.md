#어떻게 3D 요정에게 마우스 검사를 할 것인가

###### *version :2.1.1   Update:2019-8-2*

레이아라 3D에서 마우스 검출을 사용하려면 물체에 물리적 충돌기를 추가해야 한다.여기에 써야 돼요.**물리 시스템**편**방사선 검사**과**충돌기**두 지식점.

아래의 코드 는 공식 예례 () 에서 나온다[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MouseInteraction)）：

주류 에서 우리 는 다시 장면 에 원숭이 네 개 를 첨가하여 원숭이 를 각각 이름 을 지어서 위치 와 축소 를 조정 하고 덧붙였다`PhysicsCollider`물리 충돌기, 사용된 격자형 충돌함.

[] (img/1.png)<br>(1)


```typescript

{
    //在舞台上添加鼠标事件监听
    Laya.stage.on(Event.MOUSE_DOWN,this, onMouseDown);
}
//点击触发事件
private function onMouseDown():void {
    //记录点击到舞台上的点
    point.x = MouseManager.instance.mouseX;
   	point.y = MouseManager.instance.mouseY;
    //产生射线
    _camera.viewportPointToRay(point,_ray);
    //拿到射线碰撞的物体
    _scene.physicsSimulation.rayCast(_ray,_outHitResult);
    //如果碰撞到物体
    if (_outHitResult.succeeded)
    {
        //删除碰撞到的物体
        text.text = "碰撞到了" + _outHitResult.collider.owner.name ;
        trace("碰撞到物体！！")
    }

}
```


[] (img/2.gif)<br>(2)

