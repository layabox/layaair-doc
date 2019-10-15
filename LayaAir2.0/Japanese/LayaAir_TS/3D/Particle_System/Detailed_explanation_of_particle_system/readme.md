#粒子属性の詳細

###### *version :2.1.1beta   Update:2019-8-2*

！[](img/1.png)<br/>(図1)

粒子システムの詳細な使い方については、調べてみてもいいです。[Unity官方文档](https://docs.unity3d.com/Manual/PartSysReference.html)。ここではLayaAir導出ツールサポートの導出部分だけを簡単に紹介します。

**注意:**エクスポート時にサポートされていない部分があれば、エクスポート後に予期せぬエラーが発生する可能性があります。

------

**ベースパネル**

1.`Duration`粒子の持続時間
2.`Looping`ループするかどうか
3.`Startdelay`粒子開始遅延
1.*Contstant*定数
2.*Random Between two Content*最大最小定数
4.`StartLifetime`粒子生命
1.*Contstant*定数
2.*Random Between two Content*ランダムで最大小数点以下の定数をとる
5.`StartSpeed`粒子速度
1.*Contstant*定数
2.*Random Between two Content*ランダムで最大小数点以下の定数をとる
6.`StartSize`開始サイズ
1.*Contstant*定数
2.*Random Between two Content*ランダムで最大小数点以下の定数をとる
7.`3DStartSize`3 D開始サイズ
1.*Contstant*定数
2.*Random Between two Content*ランダムで最大小数点以下の定数をとる
8.`StartRotation`回転開始
1.*Contstant*定数
9.`3DRotaion`3 D回転パラメータ
1.*Contstant*定数
2.*Random Between two Content*ランダムで最大小数点以下の定数をとる
10.`RandomizeRotation`ランダム回転の確率
11.`StartColor`開始色
1.*Color*定数色
2.*random Between two Color*ランダムに二つの色の中で値を取ります。
12.`GravityModifier`重力修正
13.`Simulation Space`アナログ空間
1.*local*モデル
2.*Hirarchy*世界
14.`ScalingMode`ズームモード
1.*Hirarchy*階層スケーリング
2.*local*自己スケール
15.`Play On Awake`開始時に再生
16.`Max Partticles`最大粒子数
17.`AutoRandomSeed`自由回転速度

------

**Emission**送信モジュール

`Rate over Time`発射粒子数

`Bursts`発射粒子数

------

**シート**シェイプモジュール

このモジュールは粒子エミッタの体積と形状を定義する。

1.`Sphere`ボール
1.*Radius*半径
2.*Emit from shell*シェルからの発射
3.*Randomize Direction*臨機化の方向
2.`Hemisphere`半球の形状
1.*Radius*半径
2.*Emit from shell*シェルからの発射
3.*Randomize Direction*臨機化の方向
3.`cone`円錐形
1.*アングル*角度
2.*Radius*半径
3.*Emit from*発射
4.*ベース*ベース
1.*Base Shell*ベースケース
2.*Volume*体積
3.*Volume Shell*体積ケース
5.*Randomize Direction*臨機化の方向
4.`Box`箱の形
1.*BoxX*箱X
2.*BoxY*箱Y
3.*BoxZ*ケースZ
4.*Emitform*発射
1.*volume*
5.*Randomize Direction*臨機化の方向
5.`circle`リング
1.*Radius*半径
2.*Arc*角度
3.*Emit From Edge*エッジショットに基づく
4.*Randomize Direction*臨機化の方向

------

**Velocity over Lifetime**生命の速度変化に基づいて

1.
1.*Contstant*定数モードで、速度は一定です。
2.*Curive*線モードで、粒子速度はlifetimeに従って動きます。
3.*Random from two Content*ランダムスピードモード
2.`Space`スペース
1.*Local*モデル空間
2.*ワールド*世界空間

------

**Color over Lifetime**生命による色の変化

1.`Color`色
1.*Graadient*勾配
2.*Random between two Gradient*二つの勾配の中でランダムに値を取る

------

**Size over Lifetime**生命の大きさの変化に基づいて

1.`Separate Axes`軸別に分離する
1.*size*サイズ
1.*Curve*曲線
2.*Random Between Two Contnts*は二つの定数の中でランダムに値をとる。
2.`Separate Axes`軸の選択
1.*size*サイズ
1.*Curve*曲線
2.*Random Between Two Contnts*は二つの定数の中でランダムに値をとる。

------

**Texture Sheet Animation**画像アニメーション

1.`Tiles`タイル状の寝台
2.`Animation`アニメーション
1.*Single Row*1行
2.*whole Sheet*全表
3.`Random Row`ランダムな行
4.`Frame over Time`アニメーションフレームは時間とともに変化します。
1.*contants*定数
2.*curves*曲線
3.*Random Between Two Contnts*二つの定数の中でランダムに値を取る
5.`Start Frame`開始フレーム数
1.*コンサート*
2.*Random Between Two Contnts*は二つの定数の中でランダムに値をとる。
6.`Cycles`サイクル
7.`Flip U`Uを反転
8.`Flip V`Vを反転

------

**Rotation over Lifetime**生命の回転による変化

1.`Separate Axes`軸別未選択
1.*アングラーVelocity*角速度
2.*Contstant*定数
3.*Curve*曲線
4.*Random Between Two Contnts*二つの定数の中でランダムに値を取る



------

**Render**レンダリングモード

このモードはレンダリングモードでサポートされています。

1.`RenderMode`レンダリングモード
1.*Billboard*粒子はいつもカメラに向かっています。
2.*Stretch ed Billboard*
1.*カメラスケール
2.*Velocity Scale*速度比率
3.*レングススコープ*長さ比率
3.*Horizontal Billboard*粒子平面はXZ「底」平面に平行である
4.*Verical Billboard*粒子はY軸に直立していますが、カメラ向けです。
5.*Mesh*粒子はテクスチャではなく3 Dグリッドから描画されます。
－（サポート）しかし、面数が特に大きいモデルがあるとエラーが発生します。エラーの原因はindexが65536を超えたからです。
2.`Sorting Fudge`値が小さいほどレンダリングの優先度が高くなります。

