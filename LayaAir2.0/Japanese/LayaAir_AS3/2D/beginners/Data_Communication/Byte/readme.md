#Byteバイナリ読み書き

開発プロジェクトにはバイナリの操作が不可欠です。httml 5時代には、バイナリへの支持が大きくブレークしました。しかし、アプリの煩雑さは開発者開発プロジェクトにとっては不便です。ページ遊びの時代には、アクションScript 3.0のバイナリ配列ByteArayが機能的に完備されており、apiの操作が分かりやすいので、LayaのByteはByteArayを参照しながらhtml 5のTypediary配列の特徴を受けました。主な使い方を見てみます。

###一般的な方法

-作成方法



  ####パラメータ:


  `length`長さ:

lengthパラメータが入力されると、入力されたlengthサイズの内部配列バッファが作成される。


  `typedArray`：行列のタイプ化

任意の種類の要素を含む任意のタイプ化された配列オブジェクトが入力されます。`typedArray)`（たとえば**Int 32 Aray）**パラメータとして、typeArayを新しいタイプの配列にコピーします。typeArayの各値は、新しい配列にコピーする前にコンストラクタによって変換されます。新たに生成されたタイプ化配列オブジェクトは、導入された配列と同じlengthがあります。


  `ArrayBuffer`：バイナリデータバッファです。

上の3つの方法はいずれもByteを実装し、パラメータによってバイナリデータを作成します。



  
```typescript

  //实例化一个二进制数组Byte
  var byte:Byte = new Byte();
  //或者传入一个类型化数组
  var uint8Byte:Uint8Array = new Uint8Array(10);
  var byte:Byte = new Byte(uint8Byte);
  //或者传入一个ArrayBuffer类型
  var buffer:ArrayBuffer = new ArrayBuffer(20);
  var byte:Byte = new Byte(buffer);
  ```


​


を選択します。**writeArayBuffer**(arrayboffer:*，offset:uint=0，length:uint=0)：void

指定したバイナリバッファデータを書き込みます。データのオフセット量と長さを指定します。



  
```typescript

  var byte:Byte = new Byte();
  var byte1:Byte = new Byte();
  byte1.writeFloat32(20.0);//写入一个四个字节的浮点数
  byte1.writeInt16(16);//写入一个两个字节的整数
  byte1.writeUTFString("hell world");//写入一个字符串；
  byte.writeArrayBuffer(byte1.buffer,6);//把byte1的数据从第六个字节开始读入byte中。省略其中的浮点数20.0和整数16
  byte.pos = 0;//
  trace(byte.readUTFString())//从byte中读出字符串。
  ```


→データの読み込み


  **getByte**（）：intバイトストリームで1バイト読む。


  **get Int 16**（）：int現在のバイトオフセット量位置でInt 16値を読み出す。


  **get Int 32**（）：int現在のバイトオフセット量位置でInt 32値を読み出す


  **get Float 32**（）：Numberは、指定されたバイトオフセット位置でFloat 32値を読み出す。


  **get Float 32 Aray**（start:int，len:int）＊指定された位置から指定された長さのデータを読み出してFloat 32 Arayオブジェクトを作成し、このオブジェクトに戻す。


  **get Float 64**（）：Numberは、指定されたバイトオフセット位置でFloat 64値を読み出す。


  **get Int 16**（）：int現在のバイトオフセット量位置でInt 16値を読み出す。


  **get Int 32**（）：int現在のバイトオフセット量位置でInt 32値を読み出す。


  **getUint 8**（）：uintは、現在のバイトオフセット量位置でUint 8値を読み出す。


  **getUint t 16**（）：uintは、現在のバイトオフセット量位置でUint 16値を読み出す。


  **getUint 32**（）：uintは、現在のバイトオフセット量位置でUint 32値を読み出す。


  **get Int 16 Aray**（start:int，len:int）＊指定された位置から指定された長さのデータを読み出して、Int 16 Arayオブジェクトを作成し、このオブジェクトに戻す。


  **get String**（）：Stringは文字型の値を読みだします。


  **getUTFBytes**（len：int=-1）：String読み出し文字列は、必ずwriteUTFBytesメソッドに書き込まれた文字列でなければなりません。


  **getUTFstring**（）：SteringはUTF-8文字列を読みだします。



--------------データを書き込む------------------------

を選択します。**writeByte**（value：int）：voidはバイトストリームにバイトを書き込みます。



  
```typescript

   var byte:Byte = new Byte();
   byte.writeByte(10);//0-255之间
  ```


を選択します。**writeFloat 32**（value：Number）：voidは現在のバイトオフセット位置にFloat 32値を書き込みます。範囲は$left[-2^{128}、2^{127}\right]$で、約-3.4 E 38—3.4 E+38です。



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(10.021);
  ```


を選択します。**writeFloat 64**（value：Number）：float 64ビットの値をvoidで書き込むと、その数値範囲は-1.7E 308～1.7 E+308です。

を選択します。**writeInt 16**（value：int）：voidは、現在のバイトオフセット量位置にInt 16値を書き込みます。範囲-32768から+32767までの間。



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  ```



を選択します。**writeInt 32**（value：int）：voidは、現在のバイトオフセット量位置にInt 32値を書き込みます。-2,147,483,648から+2,147,483,647までの間の符号付き整数。

を選択します。**writeUint 16**（value：int）：voidは、現在のバイトオフセット量位置にUint 16値を書き込みます。

を選択します。**writeUint 32**（value：int）：voidは、現在のバイトオフセット量位置にUint 32値を書き込みます。

を選択します。**writeUint 8**（value：int）：voidは、現在のバイトオフセット量位置にUint 8値を書き込みます。

を選択します。**writeUTFBytes**（value：String）：ReadUTFBytes方法で読みだし、voidは文字列を書きます。

を選択します。**writeUT Fstring**（value：String）：voidはUTF-8文字列をバイトストリームに書き込みます。

を選択します。**clear**（）：voidデータクリア。



  
```typescript

  var byte:Byte = new Byte();
  byte.clear();//清除所有数据归零。
  ```


を選択します。**get System Endan()**：String[static]システムのバイト格納順序を取得します。



  
```typescript

  trace(Byte.getSystemEndian());//打印系统的字节顺序
  ```







- ###属性

-***BIGuENDIAN**：String=bigEndan[static]は、複数バイトの数字の最上位の有効バイトがバイトのシーケンスの先頭にあることを意味する。****
****
を選択します。**LITTLESHINDIAN**：String=little Edian[static]は、バイト数の最小有効バイトがバイトシーケンスの先頭にあることを示しています。****
****
を選択します。**[pos]**：int現在読み込んでいる位置。****



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  byte.pos =0;//读取位置归零。
  ```
****


を選択します。**length**：intバイト長。****
****
を選択します。**エンディアン**：Stringバイト順。****



  
```typescript

  var byte:Byte = new Byte();
  byte.endian = Byte.BIG_ENDIAN;//设置为大端；
  ```
****

を選択します。**bytes Available*：int[read-only]バイトストリームの現在位置から末尾まで読み取れるデータのバイト数。



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(20.0);
  byte.writeInt16(16);
  byte.writeUTFString("hell world");
  byte.pos = 6;
  trace(byte.bytesAvailable)
  ```


以下では、ネットワーク接続において、ネットワークメッセージを受信し、送信するなど、完全なコードを通して、この種類のアプリケーションを実証します。


```typescript

var msg:Object ={name:"xxx",age:18,weight:65.5,height:175};
var byte:Byte = new Byte();//实例化byte数组
byte.endian = Byte.LITTLE_ENDIAN;//设置大小端
byte.writeUTFString(msg.name);//写入数据
byte.writeByte(msg.age);
byte.writeFloat32(msg.weight);
byte.writeInt16(msg.height);
```


出力は結果を見てください。


```typescript

//设置pos为0 开始从头开始按照写入的顺序读取读取
byte.pos = 0;
trace(byte.getUTFString());
trace(byte.getByte());
trace(byte.getFloat32());
trace(byte.getInt16());
```


##h 5タイプ化配列

Layaのbyteパッケージはh 5の類型化配列であり、開発者はmdnの公式アプリを参照して説明することができる。を選択します。

##を選択します。[DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)ビューは、プラットフォーム内のバイトのメモリ内の並べ替え順序（バイト順）とは無関係に[`ArrayBuffer`」（https://developer.mozila.org/zh-CSN/docs/Web/JavaScript/Reference/Global Object/ArayBuffer）マルチデジタルタイプの下層インターフェースを読み書きます。 [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)配列タイプは8ビットの符号なし整数配列を表し、作成時には0に初期化されます。作成後は、配列内の要素をオブジェクトとして参照することができます。
##を選択します。**Int 8 Aray**：タイプ配列は、バイナリ補数8ビットのシンボル整数の配列を表します。コンテンツを0に初期化します。いったん確立すると、オブジェクトの方法で配列の要素を参照するか、標準配列インデックス文法を使用することができます。 **Int 16 Aray()**;タイプ配列は、バイナリ補数16ビットのシンボルがある配列を表します。
##を選択します。**Uint 16 Aray()**;タイプ配列は、バイナリ補数16ビットの符号なし配列を表します。 **Int 32 Aray()**;タイプ配列は、バイナリ補数32ビットのシンボルがある配列を表します。
##を選択します。**Uint 32 Aray()**;タイプ配列は、バイナリ補数32ビットの符号なし配列を表します。 **Float 32 Aray()**;タイプ配列は32ビットの浮動小数点配列を表します。
を選択します。**Float 64 Aray()**;タイプ配列は64ビットの浮動小数点配列を表します。