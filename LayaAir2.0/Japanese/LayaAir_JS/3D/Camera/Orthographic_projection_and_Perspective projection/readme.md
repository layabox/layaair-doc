#カメラの直交射影と透視投影

###### *version :2.0.1beta   Update:2019-3-19*

私達が世界を観察する時、見たのはすべて“近くて遠いです”の透視の効果の世界を持つので、3 Dエンジンの中で、人の目の見た世界をより良いシミュレーションするため、デフォルトのカメラは“透視投影”の効果を持っています。

！[](img/1.png)<br/>(図1)デフォルト投影の効果図

しかし、ゲームの多くの部分は、特に斜め45度の視角を持つ2 D、3 Dの混合ゲームで、ゲーム画面は透視効果がありません。この時、私たちはカメラを「直交射影」に設定して、近距離の透視効果を生まないようにします。


```typescript

//正交投影属性设置
camera.orthographicProjection = true;
//正交垂直矩阵距离,控制3D物体远近与显示大小
camera.orthographicVerticalSize = 7;
//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0, 26.5, 45));
//旋转摄像机角度
camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
```


！[](img/2 png)<br/>(図2)直交射影の効果図

