## LayaAir3D release resource



### Why should the release of resources

In LayaAir 3D game development, resource release is very important. 3D resources including models, textures, materials, animation and so on, in order to achieve a good picture effect, the file is much greater than 2D, while the 3D engine basically all resources will be calculated into GPU rendering, so take a lot of memory. Continuous loading when the points of the game, the game continues, more and more resources into the memory, if you do not release the resources, then the game will eventually collapse.

Unlike RAM memory, memory garbage collection mechanism, and memory is not the same, must be manually released, so the memory resource release must be taken seriously!

Observe the memory size in the statistics tool in Figure 1 and Figure 2

Figure 1 shows the first scene loaded after the game starts, with a face count of 30527 and memory usage of 85.2M.

![图1](img/1.png)<br>（Picture 1）

Figure 2 is the second game loading scene, the number is only 7455, but after the loading of memory resources but 118.91M. What is the reason for this? Face a few small scenes, texture is also in Figure 1 the scene a lot less, lightmap is much smaller, but the memory resources are greater!

This is because the first scene has not been released, its resource is still in memory, so the memory usage becomes large. If you do not manually clear, the game continues to switch to other scene, when reaching a certain amount, mobile phone memory will be depleted, the game stuck, flash back, fever phenomenon is frequent.

![图2](img/2.png)<br>（Picture 2）



### Processing principles when loading resources

Through the above examples we can see the relationship between the LayaAir3D engine and memory resources, in order to achieve the purpose of optimizing the game performance, when loading resources should also pay attention to some principles.

1. Don't load all the resources at once, but only need to load the resource (subsection loading mode). 3D after the completion of loading of resources according to the resource name suffix directly create the 3D display objects, such as.Ls will create Scene,.Lh creates a Sprite3D object, created the object resources even if there is on stage, will also directly into the memory, so too many resources will occupy a lot of memory.

2. The rational management of memory, often repeated use of resources do not need to be released in the video memory, without the repeated use of the resources in immediately after release in order to save the performance overhead. For example, the protagonist of resources, 3D resources often use props, game player, can be kept in memory, fast extraction speed; and some of the large scene, when switching can release resources, scene level mapping and model resources are larger, after the release of memory overhead can save tens of hundreds of megabytes in size.



### Handles principles when loading resources

The release of memory resources in two ways, one is to release the memory resources through the object, but the object traversal resources too much trouble, this is not recommended, the other is to release the memory resource through address, from the resource management perspective, through the resource address method is more flexible and can be configured to manage JSON data table.

#### Transition interface for switching scene and releasing resources

When loading resources and switching scenes, we make a progress display interface for the transition in IDE, as shown in Figure 3

![图3](img/3.png)<br>（Picture 3）

After the IDE is published, a control class is written, and the logical code is referenced as follows:


```typescript
class AssetLoadView extends ui.ProgressBarUI{
    /*资源加载进度*/
    private progress:number = 0;
    constructor() {
        super();
    }
    /*初始化，进度计时*/
    public init():void{
        this.progress = 0;
        //进度增加的帧循环
        Laya.timer.loop(20,this,this.onLoop);
    }
    /*资源加载进度模拟（假进度）*/
    private onLoop():void{
        //进度增加
        this.progress++;
        //最高100%进度
        if(this.progress > 100){
            this.progress = 100;
            this.tips.text = "游戏加载完毕，即将进入游戏...";
            Laya.timer.clearAll(this);
            this.removeSelf();
        }
        else{
            this.pro.value = this.progress/100;
            this.tips.text = "游戏正在加载中，当前进度为："+this.progress+"%!";
        }
    }
}
```



#### Address table memory resources by resource release

In the main class, we have to double click on the stage scene mode switching method using memory address resources, release resources, and loading a new scene.

Through the resource path list method is flexible, you can through configuration table, add delete resources is also very convenient. For example, when the art export scene, a new JSON table, the scene after the switch does not need the resource path is placed in the J table, useful resources into the table, the resources are not released, such as some public NPC, props, special effects and other game element resources.

Tips：resources include: scene light mapping lightmap, material .lmat, model .lm, various types of maps .png or.jpg, animation .lani, skeletal .lav and other resources

Here we introduce the resource table method, first in the export of the resource file directory to establish JSON file and edit the path resources to be released, form a json array, the name consistent with the .ls file, so that the logic call, in this case for  loveScene.json. (Picture 5, 6)

![图5](img/5.png)<br>（Picture 5）

![图6](img/6.png)<br>（Picture 6）

After the Json editing is completed, check tool checking format is correct. Then create the main class code as follows:


```typescript
class LayaAir3D_AssetsDespose {
    /*3D场景*/
    private scene:Laya.Scene;
    /*3D摄像机*/
    private camera:Laya.Camera;
    /*3D角色*/
    private role:Laya.Sprite3D;
    /*2D加载进度界面（假）*/
    private progress:AssetLoadView;
    constructor() {
        //初始化引擎
        Laya3D.init(1334,750,true);
        //画布垂直居中对齐
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //画布水平居中对齐
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        //等比缩放
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        //自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
        Laya.stage.screenMode = "horizontal";
        //开启统计信息
        Laya.Stat.show();

        //加载2D资源
        Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,this.on2DComplete));
    }
    /*加载2D资源完成回调*/
    private on2DComplete():void{
        //实例化加载进度页面
        this.progress = new AssetLoadView();
        this.progress.init();
        this.progress.loadTitle.text = "资源加载与释放示例";
        //加载第一关场景角色3D资源（不能全部加载，否则太占显存）
        Laya.loader.create([{url:"LayaScene_loveScene/loveScene.ls"},
                                {url:"LayaScene_girl/girl.lh"}],Laya.Handler.create(this,this.on3DComplete));
    }
    /*加载3D资源完成回调*/
    private on3DComplete():void{
        //实例化场景
        this.scene = Laya.loader.getRes("LayaScene_loveScene/loveScene.ls");
        Laya.stage.addChild(this.scene);
        Laya.stage.setChildIndex(this.scene,0);

        //实例化摄像机
        this.camera = new Laya.Camera();
        //移动摄像机位置
        this.camera.transform.translate(new Laya.Vector3(-1,2,15));
        //设置摄像机视野范围（角度）
        this.camera.fieldOfView = 25;
        this.camera.transform.lookAt(new Laya.Vector3(-1,0,0),new Laya.Vector3(0,0,0));
        this.scene.addChild(this.camera);

        //实例化角色添加到场景
        this.role = Laya.loader.getRes("LayaScene_girl/girl.lh");
        this.scene.addChild(this.role);
        
        //双击游戏画面切换场景
        Laya.stage.on(Laya.Event.DOUBLE_CLICK,this,this.onChangeScene);
    }
    /*加载第二关场景资源，切换场景*/
    private onChangeScene():void{
        //去除双击事件监听
        Laya.stage.off(Laya.Event.DOUBLE_CLICK,this,this.onChangeScene);
        //切换场景加载界面
        this.progress.init();
        this.progress.loadTitle.text = "正在切换场景，请稍后";
        Laya.stage.addChild(this.progress);

        //移除摄像机与角色
        this.scene.removeChild(this.camera);
        this.scene.removeChild(this.role);

        //列表释放显存资源方法（释放的资源配置表）
        this.assetsDispose("LayaScene_loveScene/loveScene.json");

        //销毁之前场景
        this.scene.destroy();
        
        //加载第二关场景资源到游戏中
        this.scene = Laya.Scene.load("LayaScene_scene02/scene02.ls");
        Laya.stage.addChild(this.scene);

        //摄像机的位置与对准目标
        this.camera.transform.position = new Laya.Vector3(-1,1,8);
        this.camera.transform.lookAt(new Laya.Vector3(-1.5,0.5,0),new Laya.Vector3(0,0,0));

        //添加摄像机与角色到新场景
        this.scene.addChild(this.camera);
        this.scene.addChild(this.role);
        this.role.transform.position = new Laya.Vector3(-1,0,-3.5);

        //设置场景层级在最下层
        Laya.stage.setChildIndex(this.scene,0);

        //现有显存中的资源
        console.log("现有显存中的资源：",Laya.Loader.loadedMap);
    }
     /**
     * 列表释放显存资源方法(利用资源表方式，每个场景配置资源路径表)
     * target3D 需要释放资源的对象资源表assetsUrl:String
     */ 
    private assetsDispose (assetsUrl:string):void{
        //加载盘释放的资源配置表
        Laya.loader.load([{url:assetsUrl,type:Laya.Loader.JSON}],
                             Laya.Handler.create(this,this.onAssetsOK,[assetsUrl]));
    }
    /*加载资源释放表完成后*/
    private onAssetsOK(assetsUrl:string):void{
        //获取加载的数据（Json数组转化成数组）
        var arr:any = Laya.loader.getRes(assetsUrl);
        for(var i:number = arr.length - 1;i>-1;i--){
            //根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
            var resource:Laya.Resource = Laya.loader.getRes(arr[i].url);
            //资源释放
            resource.dispose();
        }
    }
}
new LayaAir3D_AssetsDespose;
```


Observe the above code assetsDispose (assetsUrl:String) method, after loading the configuration table, we use Laya.loader.getRes (arr[i].url) method for direct access to resources of the object (created will produce different types of objects, according to the URL suffix getRes method can be directly read out), they are a subclass of Resource, so called dispose (object I can release resources) method.

After releasing the resources, you can also view the resources in the existing cache through the Loader.loadeMap attribute.

Compile and run the above code we can see in Figure 4, the release is completed and when loading a new scene, much less memory usage than before. Before the release of resources for 118.91M, after the release of memory accounted for only 56.11M.

![图4](img/4.png)<br>（Picture 4）