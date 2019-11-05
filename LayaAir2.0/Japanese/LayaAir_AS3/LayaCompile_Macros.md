#LayaCommpilerマクロコンパイル



###1、マクロコンパイルとは？

LayaComplerはAS 3をJSにコンパイルすることをサポートし、特定のコンテンツを表す識別子を定義しています。`“//[IF-SCRIPT] ”、//[IF- SCRIPT-BEGIN]”、“//[IF-SCRIPT-END] ”、“/*[IF-FLASH]*/ ”、“/*[IF-FLASH-BEGIN]*/”、“/*[IF-FLASH-END]*/”`。LayaComplerコンパイラは、コンパイル時にソースコードに現れるマクロ識別子をコンパイラ定義のコードに置き換えます。



###2、なぜマクロコンパイルを使うのですか？

Flash AS 3とJavaScriptは言語レベルの違いがあるため、マクロの表示によってLayaCommpilerは言語の違いを解決できます。FlashとHTML 5は同時に発表されます。



###3、マクロコンパイルの使い方説明

####3.1マクロのコンパイルの書き方


```java

 /*[IF-FLASH]*/value = byteArray.readUnsignedInt();
 //[IF-SCRIPT]value = byteArray.readInt();
```


**単一行マクロの使い方説明**

1、`/*[IF-FLASH]*/`同業者のコンテンツは、Flashバージョンのリリース時に実行されますが、HTML 5バージョンのリリース時にコンパイラによってコメントされ、実行されません。例えば:`value = byteArray.readUnsignedInt();`Flashバージョンは正常に実行され、JSバージョンにコンパイルされて実行されません。

2、`//[IF-SCRIPT]`同業者の内容は、Flashバージョンをリリースする際にはコメントコードとして実行されないと見なされ、JSにコンパイルされるとコメントが削除され、正常に実行できます。例えば:`value = byteArray.readInt();`Flashバージョンでは実行されず、JSバージョンにコンパイルされて正常に実行されます。

3、AS 3類ファイルの最初の行に追加する場合`/*[IF-FLASH]*/`このAS 3類はJSにコンパイルされません。



####3.2複数行のマクロの書き方


```java

 /*[IF-FLASH-BEGIN]*/
    if (!flag)
    {
        msg = "AS3";
        flag = true;
    }
    /*[IF-FLASH-END]*/
    if (flag)
    {
        result = 100;
    }
    /*[IF-SCRIPT-BEGIN]
       else {
       msg = "JS";
       }
     [IF-SCRIPT-END]*/
```


**マルチ行マクロの書き方説明**

1、`/*[IF-FLASH-BEGIN]*/`を選択します`/*[IF-SCRIPT-BEGIN]`複数行のマクロの開始を表します。

2、`/*[IF-FLASH-END]*/`を選択します`[IF-SCRIPT-END]*/`複数行のマクロの終了を表します。

3、`/*[IF-FLASH-BEGIN]*/`を選択します`/*[IF-FLASH-END]*/`間のコードはFlashバージョンで正常に実行され、JSバージョンをコンパイルする時にコメントされ、実行されません。

4、`/*[IF-SCRIPT-BEGIN]`を選択します`[IF-SCRIPT-END]*/`間のコードはFlashバージョンではコメントコードとして扱われ、JSファイルをコンパイルする際にはコメントを削除し、JSでは正常に実行されます。

