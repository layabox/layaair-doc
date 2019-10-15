#Byte Binary Reading and Writing

In the development project, binary operation is indispensable. In the era of HTML 5, there has been a great breakthrough in support of binary. But the complexity of API is not convenient for developers to develop projects. In the era of paging, the binary array ByteArray of ActionScript 3.0 has perfect functions and easy to understand. Therefore, Laya's Byte takes on the characteristics of HTML 5's TypedArray typed array while referring to ByteArray. Here's the main usage

###common method

- Construction method



  ####Parameters:


  `length`Length

When the length parameter is passed in, an internal array buffer is created, and the size of the buffer is the length size of the passed in.


  `typedArray`Typed arrays

When an arbitrarily typed array object containing arbitrarily typed elements is passed in（`typedArray)`(for example**Int32Array)**As a parameter, typeArray is copied to a new type array. Each value in typeArray is converted according to the constructor before it is copied to the new array. The newly generated typed array object will have the same length as the incoming array.


  `ArrayBuffer`Binary data buffer.

All three methods above can instantiate a Byte and create binary data according to the different parameters.



  
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


-**Write Array Buffer**(arraybuffer:*, offset: uint = 0, length: uint = 0): void

Writes the specified binary buffer data. The offset and length of the specified data are as follows:



  
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


- Read data


  **GetByte**(): int reads a byte in the byte stream.


  **GetInt16**(): int reads the Int16 value at the current byte offset position.


  **GetInt32**(): int reads the Int32 value at the current byte offset position


  **GetFloat32**(): Number reads Float32 at the specified byte offset position.


  **GetFloat32 Array**(start: int, len: int): * Read the specified length of data from the specified location to create a Float32Array object and return it.


  **GetFloat64**(): Number reads the Float64 value at the specified byte offset position.


  **GetInt16**(): int reads the Int16 value at the current byte offset position.


  **GetInt32**(): int reads the Int32 value at the current byte offset position.


  **GetUint8**(): uint reads the Uint8 value at the current byte offset position.


  **GetUint16**(): uint reads the Uint16 value at the current byte offset position.


  **GetUint32**(): uint reads the Uint32 value at the current byte offset position.


  **GetInt16 Array**(start: int, len: int): * Read the specified length of data from the specified location to create an Int16Array object and return it.


  **GetString**(): String reads character values.


  **GetUTFBytes**(len: int = 1): String reads a string, which must be written by the writeUTFBytes method.


  **GetUTFString**(): String reads UTF-8 strings.



----------------------------------Write data----------------------------------

-**WriteByte**(value: int): Void writes a byte in the byte stream.



  
```typescript

   var byte:Byte = new Byte();
   byte.writeByte(10);//0-255之间
  ```


-**WriteFloat32**(value: Number): Void writes the Float32 value at the current byte offset position. The range is $ left [- 2 ^{128}, 2 ^{127}  right]$, about - 3.4E38 - 3.4E + 38.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(10.021);
  ```


-**WriteFloat64**(value: Number): Void writes float64-digit values ranging from - 1.7E308 to 1.7E+308.

-**WriteInt16**(value: int): Void writes the Int16 value at the current byte offset position. Range - 32768 to + 32767.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  ```



-**WriteInt32**(value: int): Void writes the Int32 value at the current byte offset position. - Signed integers between 2,147,483,648 and + 2,147,483,647.

-**WriteUint16**(value: int): Void writes the Uint16 value at the current byte offset position.

-**WriteUint32**(value: int): Void writes the Uint32 value at the current byte offset position.

-**WriteUint8**(value: int): Void writes the Uint8 value at the current byte offset position.

-**WritteUTFBytes**(value: String): Void writes a string, which is read by the readUTFBytes method.

-**WritteUTFString**(value: String): void writes UTF-8 strings to the byte stream.

-**Clear**(): void clears data.



  
```typescript

  var byte:Byte = new Byte();
  byte.clear();//清除所有数据归零。
  ```


-**GetSystem Endian ()**String [static] gets the byte storage order of the system.



  
```typescript

  trace(Byte.getSystemEndian());//打印系统的字节顺序
  ```







- ###attribute

- ** BIG_ENDIAN**String = bigEndian [static] indicates that the most significant byte of a multibyte number is at the front of the byte sequence.****
****
-**LITTLE_ENDIAN**String = littleEndian [static] indicates that the lowest valid byte of a multibyte number is at the front of the byte sequence.****
****
-**[pos]**The current read position of int.****



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  byte.pos =0;//读取位置归零。
  ```
****


-**Length**Int byte length.****
****
-**Endian**String byte order.****



  
```typescript

  var byte:Byte = new Byte();
  byte.endian = Byte.BIG_ENDIAN;//设置为大端；
  ```
****

-**Bytes Available**: The number of bytes that int [read-only] can read from the current location of the byte stream to the end.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(20.0);
  byte.writeInt16(16);
  byte.writeUTFString("hell world");
  byte.pos = 6;
  trace(byte.bytesAvailable)
  ```


Next, we will demonstrate the application of this class through a complete code, such as network connection, we receive and send network messages.


```typescript

var msg:Object ={name:"xxx",age:18,weight:65.5,height:175};
var byte:Byte = new Byte();//实例化byte数组
byte.endian = Byte.LITTLE_ENDIAN;//设置大小端
byte.writeUTFString(msg.name);//写入数据
byte.writeByte(msg.age);
byte.writeFloat32(msg.weight);
byte.writeInt16(msg.height);
```


The output is as follows:


```typescript

//设置pos为0 开始从头开始按照写入的顺序读取读取
byte.pos = 0;
trace(byte.getUTFString());
trace(byte.getByte());
trace(byte.getFloat32());
trace(byte.getInt16());
```


##H5 typed array

Laya's byte encapsulates a typed array of h5, and developers can refer to the official API instructions of mdn. To expand the application of their own projects.

##-[DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)Views provide a sequence (byte order) independent of the order of bytes in memory in the platform.[`ArrayBuffer`] (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) Read and write the underlying interface of multi-character type. [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)The array type represents an 8-bit unsigned integer array whose content is initialized to 0 at creation time. Once created, elements in an array can be referenced either as objects or as array subscript indexes.
##-**Int8Array**: type array represents an array of 8-bit signed integers with binary complement. Content initialization is 0. Once established, you can use the object method to reference elements in an array, or use the standard array indexing syntax. **Int16Array ()**; type array represents a 16 bit signed array of binary complements.
##-**Uint16Array ()**Type arrays represent 16-bit unsigned arrays of binary complements **Int32Array ()**; type array represents a 32-bit signed array of binary complements
##-**Uint32Array ()**Type arrays represent 32-bit unsigned arrays of binary complements **Float32Array ()**Type arrays represent 32-bit floating-point arrays.
-**Float64array()**Type arrays represent 64-bit floating-point arrays.