#最初のプログラム：テキストを表示する「ハローLayabox」


 **【ヒント】本文を読む前に、「開発環境（TSコードコンパイラ）を構築する」と「TSプロジェクトを作成し、ディレクトリ構造を詳細に理解する」の2つを読まなければなりません。**



​**ステップ1**：src右クリックを選択し、左クリックして「新規ファイル」をクリックし、srcディレクトリの下にハローLayabox.tsのファイルを作成します。（Tips：Hello Layabox.tsはsrcディレクトリで作成しなければなりません。コンパイルされます）



​	![图片](img/1.png)<br/>

そして修正します。layaディレクトリの下のcomple.jsファイルは、起動類をハローLayabox.tsと修正します。

![图片](img/111.png)


​**ステップ2**：srcディレクトリの下にあるハローLayabox.tsをクリックして、次のコードを作成します。


```typescript

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色为白色，默认颜色为黑色
txt.color = "#ffffff";  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```


​

​**ステップ3**：コードが完了したら、F 5でコンパイルして、ポップアップページでコードの運行結果を見ることができます。

​![图片](img/2.png)<br/>
図(2)



​**ステップ4**：表示に成功したら、表示ウィンドウを閉じます。私たちはコードを作り続けて、文字を美しく見せるようにします。コードを引き続き改善すると以下の通りです。


```typescript

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色
txt.color = "#FF0000";
//设置文本字体大小，单位是像素
txt.fontSize    = 66;  
//设置字体描边
txt.stroke = 5;//描边为5像素
txt.strokeColor = "#FFFFFF";  
//设置为粗体
txt.bold = true;  
//设置文本的显示起点位置X,Y
txt.pos(60,100);  
//设置舞台背景色
Laya.stage.bgColor  = '#23238E';  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```




**ステップ5**：作成が完了したら、再度F 5でコンパイルし、美化後の運転結果は下図のようになります。
​![图片](img/3.png)<br/>
図(3)

**ここで、もしこの入門教程に従って、上図の表示を完成したら、ご入門の成功をおめでとうございます。Type Script言語で開発されたLayaAirエンジンHTML 5プログラムはすでに完成しました。LayaAirエンジンが開発したAPIの使用方法は、オンラインAPIとエンジンの例を公式サイトLayabox開発者センターに確認してください。**

**Type Scriptに関する知識は訪問してください。[https://www.tslang.cn/docs/home.html](https://www.tslang.cn/docs/home.html)中国語のネット、このウェブサイトは保存して、常用します！多くの問題はこれを見て解決できます。**