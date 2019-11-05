#uniformMapテーブル

###### *version :2.3.0   Update:2019-10-8*

ここではエンジンに内蔵されている精霊を追い、カメラごとにシーンごとに提示されるuniform変数を一覧表示します。

###精霊追い

|変数名|記述
|：------------------------------|
|uMvpMatrix124; MVP行列𞓜
世界マトリックス
|uzhu Light Map𞓜光照贴图|
|ugLight mapScareeOffset|の光照射のスケーリングとオフセット


###各カメラ（PERIOD＿CAMERA）

|変数名|記述
|---------------------------------|
|uCamera Directionカメラ距離
|uCamera Posカメラの位置
|uCamera Up𞓜カメラUpベクトル
|ㄒ投影マトリックス
|uプロモーションパラメータ
|uvw 124;ビューマトリックス
|咻帼カメラの视口124;
||ビュー行列x投影行列𞓜

###シーン別（PERIOD＿SCENE）

>イベント関連

|変数名|記述
|-------------|-----------------|
|uTime 124;時間

>反射に関するもの


|変数名|記述
|-------------|-----------------|
|u Reflect Intensit𞓜反射強度
|u Reflect Texture 124;反射スタンプ

>影関係

|変数名|記述
|-------------------------------------------------|
|uhadowMap 1|シャドウグラフ、ぼかしレベルが1以上の場合は|を有効にします。
|uhadowMap 2影図、ぼかしレベルが2以上の場合、|を有効にします。
|uhadowMap 3|シャドウグラフ、ぼかしレベルが3以上の場合に使用できます。
PCFFoffsetシャドウPCF𞓜
|uhadows PSSMDistanceが投影の範囲を生成する。

>シーンフォグ関連

|変数名|記述
|------------------------------------------------------|
|帼帼フォグColor𞓜霧化色
|𞓜FogRange霧化範囲
|u FogStart 124;霧化の開始位置

>ライト関連


|変数名|記述
|------------------------------------------------------|
|u Light Buffer𞓜灯光キャッシュ
|u AmbitentColor環境光124;
|u Light Cluster Bufferクラスターテクスチャ
|ught ShadowVPマトリクス𞓜

>平行光関連


|変数名|記述
|----------------------------------|
|udirection Light.co lor平行光の色
|udirection Light.direction平行光の方向
|udirationLight Count平行光の数


>点光関連


|変数名|記述
|------------------------------------------------------|
|uPointLight.co lor点光の色
|uPointLight.position|点光の位置
|uPointLight.range光の範囲

>集光関連

|変数名|記述
|-------------------|------|
|uSpotLight.co lor集光の色
|u SpotLight.direction集光の方向
|咻uSpotLight.range|集光の範囲
|u SpotLight.spot 124;集光の角度
|u SpotLight.position|集光の位置


