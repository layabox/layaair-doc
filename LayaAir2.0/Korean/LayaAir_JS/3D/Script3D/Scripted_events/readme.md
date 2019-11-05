#스크립트 이벤트

###### *version :2.1.0beta   Update:2019-6-26*

앞쪽에 자정의 스크립트를 작성한 후 스크립트의 구체적인 사건들을 살펴보자.구체적인 묘사는 API () 를 볼 수 있다[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.component.Script3D)무엇

스크립트의 추가는 여기에서 하지 않은 설명을 사용하여 이전의 예시에는 모두 얼마든지 사용된 스크립트를 사용합니다.스크립트 공식 예제[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Script&name=ScriptDemo)무엇이 예례 중 옳다`onAwake`,`onStart`,`onUpdate`,`onDisable`인수를 진행하다.재질에 가재 완료 후 큐브에 스크립트를 추가했습니다.또한 4초 후 실행된 스크립트를 제거합니다.


```typescript

/**
 * 创建后只执行,只会执行一次，此时所有节点和组件以及创建完毕
 */
 onAwake() {}

/**
 * 脚本每次启动后执行，例如被添加到一个激活的对象上或者设置脚本的enabled = true
 */
 onEnable() {}

/**
 * 第一次执行update之前执行，只会执行一次
 */
 onStart() {}

/**
 * 开始触发时执行
 */
 onTriggerEnter(other) {}

/**
 * 持续触发时执行
 */
 onTriggerStay(other) {}

/**
 * 结束触发时执行
 */
 onTriggerExit(other) {}

/**
 * 开始碰撞时执行
 */
 onCollisionEnter(collision) {}

/**
 * 持续碰撞时执行
 */
 onCollisionStay(collision) {}

/**
 * 结束碰撞时执行
 */
 onCollisionExit(collision) {}

/**
 * 鼠标按下时执行
 */
 onMouseDown() {}

/**
 * 鼠标拖拽时执行
 */
 onMouseDrag() {

}

/**
 * 鼠标点击时执行
 */
 onMouseClick() {}

/**
 * 鼠标弹起时执行
 */
 onMouseUp() {}

/**
 * 鼠标进入时执行
 */
 onMouseEnter() {}

/**
 * 鼠标经过时执行
 */
 onMouseOver() {}

/**
 * 鼠标离开时执行
 */
 onMouseOut() {}

/**
 * 键盘按下时执行
 */
 onKeyDown(e) {}

/**
 * 键盘产生一个字符时执行
 */
 onKeyPress(e) {}

/**
 * 键盘抬起时执行
 */
 onKeyUp(e) {}

/**
 * 每帧更新时执行
 */
 onUpdate() {}

/**
 * 每帧更新时执行，在update之后执行
 */
 onLateUpdate() {}

/**
 * 渲染之前执行
 */
 onPreRender() {}

/**
 * 渲染之后执行
 */
 onPostRender() {}

/**
 * 禁用时执行
 */
 onDisable() {}

/**
 * 手动调用销毁时执行
 */
 onDestroy() {}
```






