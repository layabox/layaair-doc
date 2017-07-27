## Byte  二进制读写

​	在开发项目中，二进制的操作是不可或缺的。在html5时代，对二进制的支持已经有了很大的突破。但是api的繁琐，对开发者开发项目来说不太方便。在页游时代，Actionscript3.0的二进制数组ByteArray，功能完善，api操作简单易懂，因此Laya的Byte在参考ByteArray的同时承接了html5的TypedArray类型化数组的特点。下面看下主要的用法。

### 常用方法

- 构造方法

  #### 参数：

  `length`   :长度

  当传入length参数时,一个内部数组缓冲区被创建,该缓存区的大小是传入的length大小。

  `typedArray`:类型化数组

  当传入一个包含任意类型元素的任意类型化数组对象(`typedArray)` (比如 **Int32Array)**作为参数时,typeArray被复制到一个新的类型数组。typeArray中的每个值会在复制到新的数组之前根据构造器进行转化.新的生成的类型化数组对象将会有跟传入的数组相同的length(译者注:比如原来的typeArray.length==2,那么新生成的数组的length也是2,只是数组中的每一项进行了转化)。

  `ArrayBuffer`：二进制数据缓冲区。

  上面的三种方法都可以实例化一个Byte，根据参数的不同创建二进制数据。

  ```java
  //实例化一个二进制数组Byte；
  var byte:Byte = new Byte();
  //或者传入一个类型化数组
  var uint8Byte =new Uint8Array(10);
  var byte:Byte = new Byte(uint8Byte);
  //或者传入一个ArrayBuffer类型
  var buffer =new ArrayBuffer(20);
  var byte:Byte = new Byte(buffer);
  ```

  ​

- **writeArrayBuffer**(arraybuffer:*, offset:uint = 0, length:uint = 0):void

  写入指定的二进制缓冲数据。指定数据的偏移量和长度，如下：

  ```javascript
  var byte:Byte = new Byte();
  var byte1:Byte = new Byte();
  byte1.writeFloat32(20.0);//写入一个四个字节的浮点数
  byte1.writeInt16(16);//写入一个两个字节的整数
  byte1.writeUTFString("hell world");//写入一个字符串；
  byte.writeArrayBuffer(byte1.buffer,6);//把byte1的数据从第六个字节开始读入byte中。省略其中的浮点数20.0和整数16
  byte.pos = 0;//
  trace(byte.readUTFString())//从byte中读出字符串。
  ```

- 读取数据

  **getByte**():int在字节流中读一个字节。

  **getInt16**():int在当前字节偏移量位置处读取 Int16 值。

  **getInt32**():int在当前字节偏移量位置处读取 Int32 值

  **getFloat32**():Number在指定字节偏移量位置处读取 Float32 值。

  **getFloat32Array**(start:int, len:int):*从指定的位置读取指定长度的数据用于创建一个 Float32Array 对象并返回此对象。

  **getFloat64**():Number在指定字节偏移量位置处读取 Float64 值。

  **getInt16**():int 在当前字节偏移量位置处读取 Int16 值。

  **getInt32**():int在当前字节偏移量位置处读取 Int32 值。

  **getUint8**():uint在当前字节偏移量位置处读取 Uint8 值。

  **getUint16**():uint在当前字节偏移量位置处读取 Uint16 值。

  **getUint32**():uint在当前字节偏移量位置处读取 Uint32 值。

  **getInt16Array**(start:int, len:int):*从指定的位置读取指定长度的数据用于创建一个 Int16Array 对象并返回此对象。

  **getString**():String读取字符型值。

  **getUTFBytes**(len:int = -1):String 读字符串，必须是 writeUTFBytes 方法写入的字符串。

  **getUTFString**():String 读取 UTF-8 字符串。

-----------------------------------写入数据--------------------------

- **writeByte**(value:int):void在字节流中写入一个字节。

   ```java
   var byte:Byte = new Byte();
   byte.writeByte(10);//0-255之间
   ```

- **writeFloat32**(value:Number):void在当前字节偏移量位置处写入 Float32 值。范围是$\left[-2^{128}, 2^{127}\right]$，约为-3.4E38—3.4E+38。

   ```java
   var byte:Byte = new Byte();
   byte.writeFloat32(10.021);
   ```

- **writeFloat64**(value:Number):void写入float64位数值 其数值范围为-1.7E308～1.7E+308。

- **writeInt16**(value:int):void在当前字节偏移量位置处写入 Int16 值。范围-32768 到 +32767之间。

   ```java
   var byte:Byte = new Byte();
   byte.writeInt16(120);
   ```

- **writeInt32**(value:int):void在当前字节偏移量位置处写入 Int32 值。-2,147,483,648 到 +2,147,483,647 之间的有符号整数。

- **writeUint16**(value:int):void在当前字节偏移量位置处写入 Uint16 值。

- **writeUint32**(value:int):void在当前字节偏移量位置处写入 Uint32 值。

- **writeUint8**(value:int):void在当前字节偏移量位置处写入 Uint8 值。

- **writeUTFBytes**(value:String):void写入字符串，该方法写的字符串要使用 readUTFBytes 方法读取。

- **writeUTFString**(value:String):void将 UTF-8 字符串写入字节流。

- **clear**():void清除数据。

   ```java
   var byte:Byte = new Byte();
   byte.clear();//清除所有数据归零。
   ```

- **getSystemEndian()**:String[static] 获取系统的字节存储顺序。

   ```java
   trace(Byte.getSystemEndian());//打印系统的字节顺序
   ```

   ###属性

- **BIG_ENDIAN** : String = bigEndian[static] 表示多字节数字的最高有效字节位于字节序列的最前面。

- **LITTLE_ENDIAN** : String = littleEndian[static] 表示多字节数字的最低有效字节位于字节序列的最前面。

- **[pos]** : int当前读取到的位置。

   ```java
   var byte:Byte = new Byte();
   byte.writeInt16(120);
   byte.pos =0;//读取位置归零。
   ```

- **length**: int字节长度。

- **endian** : String字节顺序。

   ```java
   var byte:Byte = new Byte();
   byte.endian = Byte.BIG_ENDIAN;//设置为大端；
   ```

- **bytesAvailable** : int[read-only] 可从字节流的当前位置到末尾读取的数据的字节数。

   ```java
     var byte:Byte = new Byte();
     byte.writeFloat32(20.0);
     byte.writeInt16(16);
     byte.writeUTFString("hell world");
     byte.pos = 6;
     trace(byte.bytesAvailable)
   ```

   ​	下面我们通过一个完整的代码来演示下这个类的应用，比如网络连接中，我们接收和发送网络消息。

   ```java
       var msg:Object ={name:"xxx",age:18,weight:65.5,height:175};
       var byte:Byte = new Byte();//实例化byte数组
       byte.endian = Byte.LITTLE_ENDIAN;//设置大小端
       byte.writeUTFString(msg.name);//写入数据
       byte.writeByte(msg.age);
       byte.writeFloat32(msg.weight);
       byte.writeInt16(msg.height);


       //设置pos为0 开始从头开始按照写入的顺序读取读取
       byte.pos = 0;
       trace(byte.getUTFString());
       trace(byte.getByte());

       trace(byte.getFloat32());
       trace(byte.getInt16());
   ```

   ​

   ##h5 类型化数组

   ​	Laya的byte封装的就是h5的类型化数组，开发者可以参考mdn的官方api说明。来扩展自己的项目的应用。

- [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)视图提供了一个与平台中字节在内存中的排列顺序(字节序)无关的从[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)读写多数字类型的底层接口.

- [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

- **[Int8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)** :类型数组表示二进制补码8位有符号整数的数组。内容初始化为0。 一旦建立，你可以使用对象的方法引用数组中的元素，或使用标准数组索引语法。

- **[Int16Array()](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)**;类型数组表示二进制补码16位有符号的数组。

- **[Uint16Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)**;类型数组表示二进制补码16位无符号的数组

- **[Int32Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)**;类型数组表示二进制补码32位有符号的数组

- **[Uint32Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)**;类型数组表示二进制补码32位无符号的数组

- **[Float32Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)**;类型数组表示32位浮点数数组。

- **[Float64Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)**;类型数组表示64位浮点数数组。


   ​	