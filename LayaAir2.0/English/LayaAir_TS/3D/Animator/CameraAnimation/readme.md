# 摄像机动画的使用

###### *version :2.1.0beta   Update:2019-6-13*

LayaAir3D插件支持摄影机动画导出。建议在unity中编辑好再导出使用。

下面的示例我们现在unity中编辑一个简单的摄像机动画，该动画只是简单的移动摄像机。和材质动画一样给摄像机添加上Animator组件，并且添加上设置好动画。导出后使用。

在这个动画中我们只是在不断的改变摄影机的位置，注意Cube的位置是没有改变的。

![](img/1.png)<br>(图1)

在导出场景后，添加到场景上就能看到效果了。

```typescript
Laya.Scene3D.load('LayaScene_scene/Conventional/scene.ls',Laya.Handler.create(this,function(scene){
    Laya.stage.addChild(scene);
}));
```

![](img/2.gif)<br>(图2)