# 可视遮罩层Layer

###### *version :2.0.1beta   Update:2019-3-19*

私たちがゲームを作っている間に、シーン上の物体が見えないようにして、“隠れ”の効果を達成したいかもしれません。この時に私達は使うことができます。**Layerレイヤー**この属性です。対象のレイヤーを設定して、カメラの可視レイヤーを設置して、所望の効果を達成できます。

**Tip**：LayaAirではカメラの初期時にすべてのレイヤーが見えますので、使う前に呼び出しが必要です。**removeAllLayers**すべてのレイヤーを削除します。

私たちが並べた場面を見てください。

！[](img/1.png)<br/>(図1)


```javascript

......
//设置图层
staticLayaMonkey.layer = 1;//本体猴
layaMonkey_clone1.layer = 2;
layaMonkey_clone2.layer = 3;
layaMonkey_clone3.layer = 4;
......
//移除所有图层
this.camera.removeAllLayers();
//添加显示图层(为相机添加一个蒙版)
this.camera.addLayer(5);
//显示用计数
this.layerIndex = 0
//给 ‘切换图层’ 按钮添加事件 每一次点击切换一个显示层
this.changeActionButton.on(Laya.Event.CLICK, this, function(){
    //清除所有图层
    this.camera.removeAllLayers();
    //计数自加一
    this.layerIndex ++;
    //设置可视图层
    this.camera.addLayer(this.layerIndex%4 + 1);
    //将地板图层加入，地板不参与事件
    this.camera.addLayer(5);
});
```


追加後の効果(図2):

！[](img/2 gif)<br/>(図2)

今回のサンプルアドレス([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLayer)）0
