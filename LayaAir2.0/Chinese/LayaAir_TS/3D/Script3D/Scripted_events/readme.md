# 脚本的事件

###### *version :2.1.0beta   Update:2019-6-26*

前面介绍完了如何创建自定义脚本，然后让我们来看下脚本具体的那些事件。具体的描述可以查看API ([地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.component.Script3D))。

关于脚本的添加使用这里不做过的讲解，在以往的示例中都有或多或少的使用脚本。关于脚本的官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Script&name=ScriptDemo)）。该示例中对onAwake，onStart，onUpdate，onDisable 进行了接管。在材质加载完成之后，给cube添加了脚本。并且在4秒后执行的移除脚本操作。

```typescript
/**
 * 创建后只执行,只会执行一次，此时所有节点和组件以及创建完毕
 */
public onAwake():void {}

/**
 * 脚本每次启动后执行，例如被添加到一个激活的对象上或者设置脚本的enabled = true
 */
public onEnable():void {}

/**
 * 第一次执行update之前执行，只会执行一次
 */
public onStart():void {}

/**
 * 开始触发时执行
 */
public onTriggerEnter(other:PhysicsComponent):void {}

/**
 * 持续触发时执行
 */
public onTriggerStay(other:PhysicsComponent):void {}

/**
 * 结束触发时执行
 */
public onTriggerExit(other:PhysicsComponent):void {}

/**
 * 开始碰撞时执行
 */
public onCollisionEnter(collision:Collision):void {}

/**
 * 持续碰撞时执行
 */
public  onCollisionStay(collision:Collision):void {}

/**
 * 结束碰撞时执行
 */
public onCollisionExit(collision:Collision):void {}

/**
 * 鼠标按下时执行
 */
public onMouseDown():void {}

/**
 * 鼠标拖拽时执行
 */
public onMouseDrag():void {

}

/**
 * 鼠标点击时执行
 */
public onMouseClick():void {}

/**
 * 鼠标弹起时执行
 */
public onMouseUp():void {}

/**
 * 鼠标进入时执行
 */
public onMouseEnter():void {}

/**
 * 鼠标经过时执行
 */
public onMouseOver():void {}

/**
 * 鼠标离开时执行
 */
public onMouseOut():void {}

/**
 * 键盘按下时执行
 */
public  onKeyDown(e:Event):void {}

/**
 * 键盘产生一个字符时执行
 */
public  onKeyPress(e:Event):void {}

/**
 * 键盘抬起时执行
 */
public  onKeyUp(e:Event):void {}

/**
 * 每帧更新时执行
 */
public  onUpdate():void {}

/**
 * 每帧更新时执行，在update之后执行
 */
public  onLateUpdate():void {}

/**
 * 渲染之前执行
 */
public  onPreRender():void {}

/**
 * 渲染之后执行
 */
public  onPostRender():void {}

/**
 * 禁用时执行
 */
public  onDisable():void {}

/**
 * 手动调用销毁时执行
 */
public  onDestroy():void {}
```





