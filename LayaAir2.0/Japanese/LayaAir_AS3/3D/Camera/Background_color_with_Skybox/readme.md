#カメラの背景色とスカイボックス

###### *version :2.0.1beta   Update:2019-3-19*

####背景色

3 Dシーンでは、背景色をカメラで制御し、カメラのclear Color属性を設定することにより3 D空間の背景色を変更し、色は3 DベクトルVector 3（赤、緑、青）を使用して調整し、エンジンはデフォルトでは黒一色に設定します。


```typescript

//相机设置清楚标记,使用固定颜色
camera.clearFlag = BaseCamera.CLEARFLAG_SOLIDCOLOR;	
//设置背景颜色
camera.clearColor = new Vector4(0.5,0.5,0.6,1);
```


####スカイボックス

シーンでは空の遠景を表現することが多いです。例えば、青い空、白い雲、夕暮れ、星空など、LayaAir 3 Dエンジンでは、カメラのプロパティにスカイボックス（SkyBox）を追加して作成します。

カメラが直交投影を使用すれば、スカイボックスは効果が得られなくなります。開発者たちは試してみてもいいです。

スカイボックスはキューブモデルと6枚のシームレスな材質スタンプで構成されています。360パノラマ地図に似ています。視野角の回転によって、四方八方に遠景効果があります。


```typescript

//天空盒代码
BaseMaterial.load("res/threeDimen/skyBox/skyBox1/skyBox.lmat", Handler.create(this, function(mat:BaseMaterial):void {
    //设置相机的清除标识为天空盒
    camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
    //获取相机的天空渲染器
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```


！（img/1.png）<br/>（図1）スカイボックス

>**注意:**背景色とスカイボックスを使う時は、必ずカメラの`clearFlag`タグ属性をクリアして、自分の必要な効果に対応します。