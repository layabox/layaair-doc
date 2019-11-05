#LayaAir 3 D基礎数学ツール

座標系を話し終わったら、3 Dでよく使われる数学ツールを紹介します。（本編の例は、クイックスタート編の例として挙げられている）

**ベクトル**

​**Vector 2**二次元ベクトル、**Vector 3**三次元ベクトル、**V ector 4**四次元ベクトルは、これらのベクトルはLayaAir 3 Dエンジンにおいて非常に頻繁に使用され、二次元ベクトルから四次元ベクトルまで至るところにその姿が見られます。基本的な使い方としては、一例で値付けのために使います。

コード中の3 Dオブジェクトの移動、回転、スケーリングなどの変換は、すべてVector 3を使用して、そのx、y、z軸座標の割り当てです。より詳細な使用は確認できます。[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Vector3)。

**色**

さまざまな色属性の値において、3次元ベクトルの値はそれぞれR、G、Bの3色を表し、それぞれ赤、緑、青である。色パラメータとして四次元ベクトルを使用するところもあります。Vector 4のw値で表されるアルファ値です。LayaAir 3 Dエンジンでは、3つの色の最大値は1で、パーセンテージで設定されています。全体の値が大きいほど、色が明るいほど、小さい色が暗いほど、値が1を超えると露出効果があります。

赤、緑、青はどのような色に組み合わせることができますか？初心者たちはゲーム美術デザイナーに相談して学習することができます。例えば赤と緑は黄色、赤と青は紫などです。プロジェクトの開発過程で、プログラマーは色の値を調整して、良い効果を試してみます。

例では、以下のコードが使用されています。ベクトルは色の割り当てとして使用されます。


```typescript

	//设置方向光的颜色
	directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
```


**四元(Quaternion)**

四元の数はLayaAirで回転の計算に使われます。それらの計算はコンパクトで効率的で，ユニバーサル・スローインの悩みを受けず，球面補間を迅速に行うことができる。

四元の数の使用については、必要なものは自分で知ることができます。ここでは提供のみ[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Quaternion)。

**包囲ボックス(BoundBox)**

エンクロージャアルゴリズムは、解離点セットの最適な包囲空間を求める方法であり、基本的な考え方は、複雑な幾何学的オブジェクトの代わりに、容積がやや大きく、特性が簡単な幾何学的体（エンクロージャと呼ばれる）を用いて近似的に代替される。LayaAir 3 D対応3の中で包囲箱、より詳細なインターフェース説明が見られます。[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.BoundBox)。

**行列(Matrix)**

行列は、長方形のアレイに配列された複数または実数のセットです。LayaAir 3 Dでのサポート**3 X 3行列([API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix3x3))**和**4 X 4行列([API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix4x4))**の行列の2種類があります。

**放射線(Ray)**

放射線はデータの種類です。オブジェクトを表示するのではありません。**原点オリジナル**を選択します**方向ディレクション**二つの属性。

![图](img/1.png)<br/>(図1)
