#Presupposition/scenario export

Open the scenario we just previewed and configure the output scenario settings.

Click the Laya Export button to export one scene3d and one sprite3d respectively. The structure of the merged folder directory is as follows (Figure 1).

![] (img/1.png)<br> (Figure 1)

See the file resources above. After export, the data resources of. ls,. Lm,. Lmat, and mapping jpg, PNG are generated.

Their specific usage will be described in detail in the subsequent course documentation.

**Tips: It is necessary to use LayaAir3D material ball when exporting at the same time, otherwise there will be a big gap in display after exporting, and part of it can not be used. For scenario models that support Unity export, you can view them in the menu bar -- LayaAir3D -- Help -- Tutorial.**

In the menu bar -- LayaAir3D -- Shortcuts -- Switch to LayaAir3D shader, all materials in the project can be changed to the default material of LayaAir3D (BlinnPhong).

After the export is complete, we copy the file to the bin folder of the simple example.

Tips: This chapter only introduces simple loading applications, which will generate various formats after export. Their detailed description will be introduced in the "Resource Loading Chapter" in the 3D technical document.

The sample code for loading scenario. LS is as follows (here we modify the GameUI class directly).


```javascript

export default class GameUI extends Laya.Scene {
    constructor(){
        super();
        //加载场景文件
        this.loadScene("test/TestScene.scene");
        //加载场景
        		Laya.Scene3D.load('LayaScene_test/Conventional/test.ls',Laya.Handler.create(this,this.onComplete))
    }
    /**
	 * 加载完成
	 */
    onComplete(scene){
        // 将场景加到舞台上
        Laya.stage.addChild(scene);
    }
}
```


Operating effect (Figure 2):

![] (img/2.png)<br> (Figure 2)