#Exporting Tail System in Unity

###### *version :2.1.1beta   Update:2019-8-2*

The LayaAir3D plug-in is supported**Trail Renderer**Component export.

Let's first add a Sphere to Unity3D`Trail Renderer`And a simple tailing effect was made. The effect is shown in Figure 1.

![] (img/1.png)<br> (Figure 1)

After editing, we choose to export the preset.

**Tip**The material used for tailing can only be`LayaAir3D/Trail Shader`If other Shaders are used, they are automatically converted to the Trail Shader when they are exported. Automatic conversion will lead to a large deviation between the actual effect and the design effect, so we should pay attention to this point in the design.

![] (img/2.png)<br> (Figure 2)

**Be careful:**An object with a trailer will be a trailer wizard after it is exported, and it will not carry a model, as there will be no Sphere after it is exported here. So you need to add it to the object after exporting.

Here we use the IDE's 3D sample project and simply modify the GameUI class code.


```typescript

//....上面为原本示例代码,去掉了示例代码的旋转摄像机
//加载拖尾
Laya.Sprite3D.load('LayaScene_tst/Conventional/Sphere.lh',Laya.Handler.create(this,function(sp){
    //将加载的拖尾添加给示例盒子
    box.addChild(sp);
    //为了体现效果，我们移动盒子和摄影机观察效果
    Laya.timer.frameLoop(1,this,function(){
        //使用差速来体现移动
        box.transform.translate(new Laya.Vector3(0,0.05,0),false);
        camera.transform.translate(new Laya.Vector3(0,04,0),false);
    });
}));
```


![] (img/3.gif) < br > (fig. 3)

