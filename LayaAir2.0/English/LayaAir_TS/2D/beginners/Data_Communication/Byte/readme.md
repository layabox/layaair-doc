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
  var byte:Laya.Byte = new Laya.Byte();
  //或者传入一个类型化数组
  var uint8Byte:Uint8Array = new Uint8Array(10);
  var byte:Laya.Byte = new Laya.Byte(uint8Byte);
  //或者传入一个ArrayBuffer类型
  var buffer:ArrayBuffer = new ArrayBuffer(20);
  var byte:Laya.Byte = new Laya.Byte(buffer);
  ```


​


-**Write Array Buffer**(arraybuffer:*, offset: number = 0, length: number = 0): void

Writes the specified binary buffer data. The offset and length of the specified data are as follows:



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  var byte1:Laya.Byte = new Laya.Byte();
  byte1.writeFloat32(20.0);//写入一个四个字节的浮点数
  byte1.writeInt16(16);//写入一个两个字节的整数
  byte1.writeUTFString("hell world");//写入一个字符串；
  byte.writeArrayBuffer(byte1.buffer,6);//把byte1的数据从第六个字节开始读入byte中。省略其中的浮点数20.0和整数16
  byte.pos = 0;//
  console.log(byte.readUTFString())//从byte中读出字符串。
  ```


- Read data


  **GetByte**Number reads a byte in the byte stream.


  **GetInt16**(): Number reads the Int16 value at the current byte offset position.


  **GetInt32**(): Number reads Int32 at the current byte offset position


  **GetFloat32**(): Number reads Float32 at the specified byte offset position.


  **GetFloat32 Array**(start: number, len: number): any reads the specified length of data from the specified location for creating a Float32Array object and returning it.


  **GetFloat64**(): Number reads the Float64 value at the specified byte offset position.


  **GetInt16**(): Number reads the Int16 value at the current byte offset position.


  **GetInt32**Number reads the Int32 value at the current byte offset position.


  **GetUint8**(): Number reads the Uint8 value at the current byte offset position.


  **GetUint16**(): Number reads the Uint16 value at the current byte offset position.


  **GetUint32**(): Number reads the Uint32 value at the current byte offset position.


  **GetInt16 Array**(start: number, len: number): any reads the specified length of data from the specified location for creating an Int16Array object and returning it.


  **GetString**(): string reads character values.


  **GetUTFBytes**(len: number = 1): String reads a string, which must be written by the writeUTFBytes method.


  **GetUTFString**(): string reads the UTF-8 string.



Write data - -----------------------------------------------------------------------------------------------------------------------------------------------------------------

-**WriteByte**(value: number): Void writes a byte in the byte stream.



  
```typescript

   var byte:Laya.Byte = new Laya.Byte();
   byte.writeByte(10);//0-255之间
  ```


-**WriteFloat32**(value: number): Void writes the Float32 value at the current byte offset position. The range is $ left [- 2 ^{128}, 2 ^{127}  right]$, about - 3.4E38 - 3.4E + 38.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeFloat32(10.021);
  ```


-**WriteFloat64**(value: number): Void writes float64-digit values ranging from - 1.7E308 to 1.7E+308.

-**WriteInt16**(value: number): Void writes the Int16 value at the current byte offset position. Range - 32768 to + 32767.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeInt16(120);
  ```


-**WriteInt32**(value: number): Void writes the Int32 value at the current byte offset position. - Signed integers between 2,147,483,648 and + 2,147,483,647.

-**WriteUint16**(value: number): Void writes the Uint16 value at the current byte offset position.

-**WriteUint32**(value: number): Void writes the Uint32 value at the current byte offset position.

-**WriteUint8**(value: number): Void writes the Uint8 value at the current byte offset position.

-**WritteUTFBytes**(value: string): Void writes a string, which is read by the readUTFBytes method.

-**WritteUTFString**(value: string): void writes UTF-8 strings to the byte stream.

-**Clear**(): void clears data.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.clear();//清除所有数据归零。
  ```


-**GetSystem Endian ()**String [static] gets the byte storage order of the system.



  
```typescript

  console.log(Laya.Byte.getSystemEndian());//打印系统的字节顺序
  ```







- ###attribute

- ** BIG_ENDIAN**String = bigEndian [static] indicates that the most significant byte of a multibyte number is at the front of the byte sequence.****
****
-**LITTLE_ENDIAN**String = littleEndian [static] indicates that the lowest valid byte of a multibyte number is at the front of the byte sequence.****
****
-**[pos]**Number's current reading position.****



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeInt16(120);
  byte.pos =0;//读取位置归零。
  ```
****


-**Length**Number byte length.****
****
-**Endian**String byte order.****



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.endian = Laya.Byte.BIG_ENDIAN;//设置为大端；
  ```
****

-**Bytes Available**: Number [read-only] The number of bytes of data that can be read from the current location of the byte stream to the end.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeFloat32(20.0);
  byte.writeInt16(16);
  byte.writeUTFString("hell world");
  byte.pos = 6;
  console.log(byte.bytesAvailable)
  ```


Next, we will demonstrate the application of this class through a complete code, such as network connection, we receive and send network messages.


```typescript

var msg:any ={name:"xxx",age:18,weight:65.5,height:175};
var byte:Laya.Byte = new Laya.Byte();//实例化byte数组
byte.endian = Laya.Byte.LITTLE_ENDIAN;//设置大小端
byte.writeUTFString(msg.name);//写入数据
byte.writeByte(msg.age);
byte.writeFloat32(msg.weight);
byte.writeInt16(msg.height);
```


Output Look at the results:


```typescript

//设置pos为0 开始从头开始按照写入的顺序读取读取
byte.pos = 0;
console.log(byte.getUTFString());
console.log(byte.getByte());
console.log(byte.getFloat32());
console.log(byte.getInt16());
```


##H5 typed array

Laya's byte encapsulates a typed array of h5, and developers can refer to the official API instructions of mdn. To expand the application of their own projects.

##-[DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)Views provide a sequence (byte order) independent of the order of bytes in memory in the platform.[`ArrayBuffer`] (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) Read and write the underlying interface of multi-character type. [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)The array type represents an 8-bit unsigned integer array whose content is initialized to 0 at creation time. Once created, elements in an array can be referenced either as objects or as array subscript indexes.
##-**Int8Array**Type array represents an array of 8-bit signed integers with binary complements. Content initialization is 0. Once established, you can use the object method to reference elements in an array, or use the standard array indexing syntax. **Int16Array ()**A type array represents a 16-bit signed array of binary complements.
##-**Uint16Array ()**Type arrays represent 16-bit unsigned arrays of binary complements **Int32Array ()**Type arrays represent 32-bit signed arrays of binary complements
##-**Uint32Array ()**Type arrays represent 32-bit unsigned arrays of binary complements **Float32Array ()**Type arrays represent 32-bit floating-point arrays.
-**Float64Array ()**Type arrays represent 64-bit floating-point arrays.