# 脚本的事件

###### *version :2.1.0beta   Update:2019-6-26*

前面介绍完了如何创建自定义脚本，然后让我们来看下脚本具体的那些事件。具体的描述可以查看API ([地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.component.Script3D))。

关于脚本的添加使用这里不做过的讲解，在以往的示例中都有或多或少的使用脚本。关于脚本的官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Script&name=ScriptDemo)）。该示例中对 `onAwake`，`onStart`，`onUpdate`，`onDisable`  进行了接管。在材质加载完成之后，给cube添加了脚本。并且在4秒后执行的移除脚本操作。

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





