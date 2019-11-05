#コードモードのショートカット設定

###一、カスタムショートカットキー

LayaAirIDEのコード部分ショートカットはvscodeの機能を引き継いでいます。個々のショートカットは違います。ユーザーは自分の好みで設定できます。開発者がショートカットを変更したいなら、次の手順で操作してください。



**メニュー→ファイル→オプション→キーボードショートカット。**

ショートカット設定画面を開くと、2つのエディタが開きます。デフォルトのショートカットは左側に設定されています。右側のエディタのkeybiindings.jsonファイルのカスタムショートカットを編集します。

​![blob.png](img/1.png)<br/>
(図1)デフォルトのショートカットキー

**変更方法:**

1、左側（デフォルトキーバインディング）で変更するショートカットコマンドを見つけ、左側の項目を右側（keybiindings.json）にコピーして、keyフィールドを変更すればいいです。図2のように

​![blob.png](img/2.png)<br/>
(図2)ショートカットの変更

2、二回で`Ctrl+K`ショートカットキー、またはkeyboindings.json編集エリアの右下の「定義キーバインディング」ボタンをクリックします。ショートカットキーの設定パネルが現れたら、競合しないショートカットキーを設定し、Enterを押します。Commandの値を私たちが設定するショートカットコマンドに変更したらショートカットの設定が完了します。

​![blob.png](img/3.png)<br/>
（図3）新しいショートカットを設定する

​![blob.png](img/4.png)<br/>
（図4）複数のショートカット設定を使用して、番号を分離します。

​

###二、常用ショートカットキー（General）

𞓜**キー（Press）**𞓜**機能(Function)**𞓜
|--------------------------------------------|
𞓜`Ctrl + Shift + P，F1`コマンドパネルShow Command Paletteを表示します。
𞓜`Ctrl + P`早くQuick Open|を開けます。
𞓜`Ctrl + Shift + N`|新しいウィンドウ/インスタンスNew window/instance 124;
𞓜`Ctrl + Shift + W`|窓を閉じる/実例Close window/instance 124;
𞓜`Ctrl+X`|剪断行（空選）Cut line（empy selection）|
𞓜`Ctrl+C`|複製行（空選択）Copyライン（empy selection）|
𞓜`Alt+ ↑ / ↓`|向上/下移动行子move line up/down|
𞓜`Shift+Alt + ↓ / ↑`|上/下にコピーしたCopyラインup/down 124;
𞓜`Ctrl+Shift+K`|削除行Delete line|
𞓜`Ctrl+Enter`下にInsert line belowを挿入します。
𞓜`Ctrl+Shift+Enter`上にインラインaboveを挿入します。
𞓜`Ctrl+Shift+\`マッチする括弧Jump to matching braacket|にジャンプします。
𞓜`Ctrl+] / [`|インデント/インデントを行うIndent/out dent line 124;
|Home me 124;行頭Go to beginning of lineに移行する
|End 124;が行末Go to end of lineに移動します。
𞓜`Ctrl+Home`|書類の先頭に進むGo to beginning of file|
𞓜`Ctrl+End`|書類の末尾に進むGo to end of file|
𞓜`Ctrl+↑ / ↓`_;向上/下スクロール行Sroll line up/down|
𞓜`Alt+PgUp / PgDown`|向上/下スクロールページSroll page up/down|
𞓜`Ctrl+Shift+[`エリアFold region
𞓜`Ctrl+Shift+]`|展開（折りたたみなし）エリアUnfold region|
𞓜`Ctrl+K Ctrl+[`|折り畳み（折りたたみなし）全サブエリアFold all subregions|
𞓜`Ctrl+K Ctrl+]`|展開（折りたたみなし）全サブエリアUfold all subregions|
𞓜`Ctrl+K Ctrl+0`すべてのエリアFold all regions 124を折り畳みます。
𞓜`Ctrl+K Ctrl+J`|展開（折りたたみなし）全エリアUnfold all regions 124;
𞓜`Ctrl+K Ctrl+C`行のコメントを追加します。Add line comment。
𞓜`Ctrl+K Ctrl+U`|削除行のコメントRemove line comment|
𞓜`Ctrl+/`|行のコメントを切り替えるTogle LINEコメント
𞓜`Shift+Alt+A`ブロックコメントTogle block commentを切り替える
𞓜`Alt+Z`|切り替え改行Togle word wrap|