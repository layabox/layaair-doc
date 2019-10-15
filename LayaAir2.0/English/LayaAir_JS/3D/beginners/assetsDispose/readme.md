#Resource Release of LayaAir3D

###### 修改时间:2019-4-24,version:2.0.1

###Why release resources

In the development of LayaAir3D games, resource release is very important. 3D resources include model, texture, material, animation, etc. In order to achieve good picture effect, the file will be much larger than 2D. And basically all resources of 3D engine will be put into GPU for computing and rendering, so it occupies a lot of memory. When the game level is constantly loaded, the game continues to deepen, and more and more resources are put into the display memory. If the resources are not released, the game will eventually collapse.

Unlike memory, there is a garbage collection mechanism in memory, but unlike display memory, it must be released manually, so the resource release of display memory must be taken seriously.

Observe the display size in the statistical tools in Figures 1 and 2

Figure 1 shows the first scene loaded after the game starts. The area is 30527, occupying 69.2M of display memory.

![1](img/1.png)(图1)</br>


Figure 2 shows the second scenario of game loading, with only 7455 faces, but 118.91M of display memory resources after loading. What is the reason for this? Facial familiar, small scene, mapping is actually much less than the scene in Figure 1, light mapping is much smaller, but the display and memory resources are much larger!

This is because the resources of the first pass scenario have not been released, and its resources are still in the display memory, so the occupancy of the display memory becomes larger. If not manually cleared, the game continues to switch other scenes, when a certain amount of mobile phone memory will be exhausted, game card death, flashback, fever and other phenomena will occur frequently.

![2](img/2.png)(Fig. 2) </br>



###Handling Principles When Loading Resources

Through the example above, we can see that LayaAir3D engine deals with the relationship between resources and memory. In order to achieve the goal of game performance optimization, we should pay attention to some principles when loading resources.

1. When loading resources, do not load all resources at one time, only the required resources (piecewise loading mode). After loading 3D resources, 3D display objects will be created directly according to the suffix names of resources. For example, Scene will be created by. ls and Sprite3D objects will be created by. lh. Even if the created object resources are not put on the stage, they will be directly put into the display memory. Therefore, too much resources will occupy a large amount of display memory.

2. Reasonable management of memory, resources that are often reused need not be released in memory, but resources that are not reused need to be released immediately after use to save performance overhead. For example, protagonist resources, 3D props resources, players often use, can always be stored in the display memory, extraction speed; and some large-scale scenes, when switching, can release resources, scene level mapping, model resources are large, after release can save tens of hundreds of megabytes of display memory overhead.



###Method of Releasing Display Storage Resources

There are two ways to release the memory resources. One is to release the memory resources through objects, but traversing the resource objects is too cumbersome to recommend. The other is to release the memory resources through the resource address. From the resource management point of view, the resource address method is more flexible, and JSON data table can be configured to manage.

####Transitional interface for switching scenarios and releasing resources

When loading resources and switching scenarios, we create a progress display interface in IDE for transition, as shown in Figure 3.

![3](img/3.png)(Fig. 3) </br>

After the issuance of IDE, write a control class, the logical code reference is as follows:


```typescript

export default Progress = (function(_super){
    var scene1;
    function Progress(){
        Progress.super(this);
    }
    Laya.class(Progress,"Progress",_super);
    //初始化，进度计时
    Progress.prototype.init = function(){
        //JS加载IDE生成页面场景JOSN文件获取场景
        Laya.Scene.load("ProgressBar.scene",Laya.Handler.create(this,function(s){
            this.scene1　= Laya.stage.addChild(s);
            //调整场景层级
            this.scene1.zOrder = 1;
            //设置进度条进度为0
            this.scene1.pro.value = 0;
            //进度增加的帧循环
            Laya.timer.loop(20,this,this.onLoop);
        }));
    }
    Progress.prototype.onLoop = function(){
        //进度增加
        this.scene1.pro.value +=0.01;
        //最高进度100%
        if(this.scene1.pro.value>=1){
            this.scene1.pro.value = 1;
            Laya.timer.clearAll(this);
            //移除自己
            this.scene1.removeSelf();
        }
    }
    return Progress;
}(Laya.Scene));

```




####Release explicit memory resources through resource address table

In the main class, we switch scenarios by double-clicking the stage with the mouse, release the display resources by using the resource address, and load new scenarios.

The method of resource path list is flexible, and it is convenient to add and delete resources in the table by configuring the table. For example, when art exports scenarios, create a new JSON table, put all the resource paths that are not needed after switching in this scenario into the J table. If the useful resources do not enter the table, the resources will not be released, such as some common NPC, props, special effects and other game element resources.

Tips: resources include: scene lightmap, material. Lmat, model. LM, various types of map. PNG or. JPG, animation. Lani, bone. LAV and other resources.

Let's introduce the resource table method. Firstly, we set up JSON files in the directory of exported resource files and edit the path resources to be released to form a Json array with the same name as. LS files to make logical calls. In this case, loveScene. json. Figures 5 and 6.

![5](img/5.png)(Fig. 5) </br>

![6](img/6.png)(Fig. 6) </br>

After the Json edit is completed, you can use the checking tool to check whether the format is correct. Then create the main class code as follows:


```typescript

import Progress from "./Progress";
var Main = (function () {
  var scene;
  var load;
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();
    Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,on2DComplete));
  }

  /*加载2D资源完成回调*/
  function on2DComplete(){
    this.load = new Progress();
    this.load.init();
    //加载第一关场景角色3D资源（不能全部加载，否则太占显存）
    Laya.loader.create(["LayaScene_test/test.ls","LayaScene_twonScene/twonScene.ls"],Laya.Handler.create(this,this.on3DComplete));
  }

  var _proto = Main.prototype; 
  /*加载3D资源完成回调*/
  _proto.on3DComplete = function(){
    //实例化场景
    this.scene = Laya.loader.getRes("LayaScene_test/test.ls");
    this.scene.enableFog = true;
    this.scene.fogColor = new Laya.Vector3(0,0,0.6);
    this.scene.fogStart= 2;
    this.scene.fogRange = 4;
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene,0);
    //监听屏幕的鼠标事件切换场景
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.ChangeScene);
  }
  _proto.ChangeScene = function(){
    //关闭鼠标事件的监听
    Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.ChangeScene);
    //删除第一个场景
    this.scene.removeSelf();
    this.load.init();
    //加载第二个场景
    this.scene = Laya.loader.getRes("LayaScene_twonScene/twonScene.ls");
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene,0);
    this.assetsDispose();
  }
  _proto.assetsDispose = function(){
    Laya.loader.load("loveScene.json",Laya.Handler.create(this,this.onAssetOK));//,null,null,1,true,"Scene1");
  }
  _proto.onAssetOK = function(){

    console.log("现有显存中的资源：",Laya.Loader.loadedMap);
    //获取加载的数据（Json数据转换成数组）
    var arr=new Array()
    this.arr = Laya.loader.getRes("loveScene.json");
    for(var i = this.arr.length-1;i>-1;i--)
    {
      var resource = Laya.loader.getRes(this.arr[i].url)
      if (resource)
      {
        //按路径销毁资源
        resource.destroy();
      }
      else {
        console.log(this.arr[i].url);
      }
    }
  }
  return Main;
})();
new Main();

```


Observe the code assetsDispose (assetsUrl: String) method mentioned above. After loading the configuration table, we get the object generated by the resource directly by Laya. loader. getRes (arr [i]. url) method (when created, different types of objects are generated according to the suffix name of the url, which can be read directly by getRes method). LayaAir 2.0 has been unified to call the resource. destroy () method to release resources.

After releasing the resources, you can also view the resources in the existing cache through the Loader. loadeMap attribute.

Compiling and running the above code, we can see the effect of Figure 4. When the release is completed and the new scene is loaded, the memory occupancy is much smaller than before. Previous unreleased resources were 118.91M, and only 59.68M was released.

![4](img/4.png)

###Automatic release of resources

LayaAir2.0 adds a more convenient way for developers to release 3D resources.

After the scene (or wizard) is destroyed (destory notes here that ontology is destroyed rather than its clone destroyed), call`Laya.Resource.destroyUnusedResources()`Unused resources are automatically released.


```typescript

//自动释放没有被使用的资源
Laya.Resource.destroyUnusedResources();
```


