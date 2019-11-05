#コンポーネントリソース命名規則

LayaAirIDEでは、ピクチャおよびコンポーネントは、エディタがリソースプレフィックスに基づいて対応するコンポーネントとして識別されます。例えばbtnuxxxという名前のものはボタンとして認識され、tabuxxxという名前のものはTabコンポーネントとして識別されます。

###ベースコンポーネント命名規則：

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

![1](img\1.png)(图1)


リソースマネージャに対応して表示されます。

![2](img\2.png)（図2）



###特殊コンポーネント:

特殊なコンポーネントは複数の写真の構成が必要で、ネーミングルールは上記の規則を遵守した上で、ドルを増やして区別して、主に三つのコンポーネントがあります。SrollBar、ProgessBar、Slider。

特殊部品命名規則は下図の通りです。

![3](img\3.png)(图3)



![4](img\4.png)（図4）

![5](img\5.png)（図5）



###容器セット

コンテナコンポーネント（Box、List、Tab、RadioGroup、View Stock、Panel、HBox、Vox、Tree）はデフォルトでは対応リソースが必要なく、ショートカットキーCtrl+Bで変換できます。下図のように：

![6](img\6.png)（図6）

