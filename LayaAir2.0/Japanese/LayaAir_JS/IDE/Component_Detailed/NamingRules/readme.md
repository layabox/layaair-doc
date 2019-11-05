#コンポーネントリソース命名規則

LayaAirIDEでは、ピクチャおよびコンポーネントは、エディタがリソースプレフィックスに基づいて対応するコンポーネントとして識別されます。例えばbtnuxxxという名前のものはボタンとして認識され、tabuxxxという名前のものはTabコンポーネントとして識別されます。

###ベースコンポーネント命名規則：

|基礎コンポーネント名|コンポーネント中国語名称|リソースプレフィックス（全書き込み、大文字と小文字を区別しない）|リソースプレフィックス（略語、大文字と小文字を区別する）|
|----------------------------------------------------------------------------------------------|
|Label𞓜テキストボックス𞓜label𞓜--|
|TextInput 124;入力ボックス|textiput𞓜input𞓜
𞓜TextAreaベルトスクロールバーのテキスト領域
124 Buttonボタン𞓜button𞓜btn𞓜
|CheckBox|多選枠check box𞓜check check|
|Radio 124;の単一選択枠124; radio𞓜--124;
124タブラベル124タブ
|Radio Group𞓜ラジオボックスボタンセット
|Vlider垂直スライダー
|HSlider|水平スライダー
|Clip|ビットマップスライス
|fontclip𞓜の書体スライス
124プログレスバープログレスバー
𞓜Cobox𞓜プルダウンコンボボックス
|VcrollBar垂直スクロールバー
|HScroll Barレベルスクロールバー
|Image𞓜Image𞓜𞓜124124124;
|スプライトの精霊124;は構成要素の規則によって命名されていないのはすべてスプライト124;と見なされています。

エディタのデフォルトのコンポーネントリソース対応規則を列挙します。

`Label`コンポーネント（テキストボックス）：labeluxxx；

`TextInput`コンポーネント（入力ボックス）：input uxxxまたはtextinput uxxx；

`TextArea`コンポーネント（テキストドメイン、スクロールバー付き）：arauxtarea auxxxまたはtextarea xxx；

`Button`コンポーネント（ボタン）：btnuxxxまたはbuttongxxx；

`CheckBox`コンポーネント（複数選択ボックス）：checkxxxxまたはcheckbox_xxx；

`Radio`コンポーネント（単一選択ボックス）：radioまたはradiouxxx；

`Tab`コンポーネント（ラベルグループ）：tabmuxxx；

`RadioGroup`コンポーネント（単一選択ボックスボタンセット）：radiogroupuxxx；

`VSlider`コンポーネント（垂直スライダー）：vsleder uxxx；

`HSlider`コンポーネント（水平スライダー）：hsleder uxxx；

`Clip`コンポーネント（ビットマップスライス）：clipuxxx；

`ProgressBar`コンポーネント（プログレスバー）：progressiguxxxまたはprogressbaruxxx；

`ComboBox`コンポーネント（フレームを下に引く）：compboxboxまたはcompbobox uxxx；

`VScrollBar`コンポーネント（垂直スクロールバー）：vscrolluxxxまたはvscrollbaruxxx；

`HScrollBar`コンポーネント（水平スクロールバー）：hscrolluxxxまたはhscrollbaruxxx；

`Image`コンポーネント（グラフィックコンポーネント）：イマジネーション；

上記の規則ではなく、Spriteとして認識されます。



以下は例示的なコンポーネント画像である。

![1](img\1.png)（図1）

リソースマネージャに対応して表示されます。

![2](img\2.png)（図2）



###特殊コンポーネント:

特殊なコンポーネントは複数の写真の構成が必要で、ネーミングルールは上記の規則を遵守した上で、ドルを増やして区別して、主に三つのコンポーネントがあります。SrollBar、ProgessBar、Slider。

特殊部品命名規則は下図の通りです。

![3](img\3.png)（図3）

![4](img\4.png)（図4）

![5](img\5.png)（図5）



###容器セット

コンテナコンポーネント（Box、List、Tab、RadioGroup、View Stock、Panel、HBox、Vox、Tree）はデフォルトでは対応リソースが必要なく、ショートカットキーCtrl+Bで変換できます。下図のように：

![6](img\6.png)（図6）

