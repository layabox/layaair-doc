## Read and write Byte binary data

​	Binary operations are essential in development projects. In the HTML5 era, support for binary systems has been a major breakthrough. But API's complexity is not very convenient for developer development projects. In the Webpage Game era, Actionscript3.0 binary is array ByteArray, with perfect function, easy to operate, so Laya Byte undertake the characteristics of TypedArray typed array HTML5 in reference to ByteArray at the same time. Here's a look at the main usage.

### Common method

- Construction method

  #### Parameter:

  `length`   :size of data
  
  When the length parameter is passed in, an internal array buffer is created, defined the size of the incoming length.

  `typedArray`: Type of array

  TypeArray is copied to a new type array when a typed array object (`typedArray)` (such as **Int32Array)**, is passed into a parameter that contains any type element. Each value in typeArray will be copied to the new array constructor before transformation. According to the type of object to the new array will have the same with the introduction of an array of length (translator's note: such as the original typeArray.length==2, so the new generation of length array is 2, but each item in the array of transformation).

  `ArrayBuffer`：binary data buffer.

  The three methods above can instantiate a Byte and create binary data based on the parameters.

  ```java
  //Instantiate a binary array Byte;
  var byte:Byte = new Byte();
  //Or pass into a typed array
  var uint8Byte =new Uint8Array(10);
  var byte:Byte = new Byte(uint8Byte);
  //Or pass in to a ArrayBuffer type
  var buffer =new ArrayBuffer(20);
  var byte:Byte = new Byte(buffer);
  ```

  ​

- **writeArrayBuffer**(arraybuffer:*, offset:uint = 0, length:uint = 0):void

  Write the specified binary buffer data. Specify the offset and length of the data as follows:

  ```javascript
  var byte:Byte = new Byte();
  var byte1:Byte = new Byte();
  byte1.writeFloat32(20.0);//Writes a four byte floating point number
  byte1.writeInt16(16);//Writes an integer of two bytes
  byte1.writeUTFString("hello world");//Writes a string;
  byte.writeArrayBuffer(byte1.buffer,6);//Read the byte1 data from sixth bytes into the byte. Omit the floating point numbers 20 and integers 16
  byte.pos = 0;//
  trace(byte.readUTFString())//Read string from byte
  ```

- Read data

  **getByte**():int Reads a byte in the byte stream.

  **getInt16**():int Reads the Int16 value at the current byte offset position.

  **getInt32**():int Reads the Int32 value at the current byte offset position

  **getFloat32**():Number Reads the Float32 value at the specified byte offset position.

  **getFloat32Array**(start:int, len:int): Reads the specified length of data from the specified location, creates a Float32Array object, and returns the object.

  **getFloat64**():Number Reads the Float64 value at the specified byte offset position.

  **getInt16**():int  Reads the Int16 value at the current byte offset position.

  **getInt32**():int Reads the Int32 value at the current byte offset position.

  **getUint8**():uint Reads the Uint8 value at the current byte offset position.

  **getUint16**():uint Reads the Uint16 value at the current byte offset position.

  **getUint32**():uint Reads the Uint32 value at the current byte offset position.

  **getInt16Array**(start:int, len:int): Reads the specified length of data from the specified location, creates a Int16Array object, and returns the object.

  **getString**(): String Read character value.

  **getUTFBytes**(len:int = -1): String Read string must be a string written by the writeUTFBytes method.

  **getUTFString**():String reads UTF-8 Character string.

-----------------------------------Write data--------------------------

- **writeByte**(value:int):void Writes a byte in a byte stream

   ```java
   var byte:Byte = new Byte();
   byte.writeByte(10);// Between 0-255
   ```

- **writeFloat32**(value:Number):void Writes the Float32 value at the current byte offset position. Range is Writes the Float32 value at the current byte offset position. Range is $\left[-2^{128}, 2^{127}\right]$，around -3.4E38—3.4E+38。

   ```java
   var byte:Byte = new Byte();
   byte.writeFloat32(10.021);
   ```

- **writeFloat64**(value:Number):void Writes to the float64 bit value, whose value range is -1.7E308～1.7E+308

- **writeInt16**(value:int):void Writes at the current byte offset position  Int16 value range between-32768 and +32767

   ```java
   var byte:Byte = new Byte();
   byte.writeInt16(120);
   ```

- **writeInt32**(value:int):voidWrites at the current byte offset position Int32 value. Signed integer between -2,147,483,648 and +2,147,483,647

- **writeUint16**(value:int):void Writes at the current byte offset position Uint16 value.

- **writeUint32**(value:int):void Writes at the current byte offset position Uint32 value.

- **writeUint8**(value:int):void Writes at the current byte offset position  Uint8 value.

- **writeUTFBytes**(value:String):void To write a string, the string written by that method to use  readUTFBytes Method reads.

- **writeUTFString**(value:String):void Writes a UTF-8 string to a byte stream.

- **clear**():void Clear data.

   ```java
   var byte:Byte = new Byte();
   byte.clear();//清除所有数据归零。
   ```

- **getSystemEndian()**:String[static] Gets the byte storage order of the system

   ```java
   trace(Byte.getSystemEndian());// order of bytes in the print system
   ```

   ### Attribute

- **BIG_ENDIAN** : String = bigEndian[static] Most significant byte that represents a multi byte digit is at the front of the byte sequence.

- **LITTLE_ENDIAN** : String = littleEndian[static] Lowest significant byte representing a multi byte digit is at the front of the byte sequence.

- **[pos]** : int Current read to location.

   ```java
   var byte:Byte = new Byte();
   byte.writeInt16(120);
   byte.pos =0;// Reading position is reset to zero.
   ```

- **length**: int size of data;

- **endian** : String Byte order.

   ```java
   var byte:Byte = new Byte();
   byte.endian = Byte.BIG_ENDIAN;//  Set to big end;
   ```

- **bytesAvailable** : int[read-only]  The number of bytes of data that can be read from the current position of the byte stream to the end.

   ```java
     var byte:Byte = new Byte();
     byte.writeFloat32(20.0);
     byte.writeInt16(16);
     byte.writeUTFString("hell world");
     byte.pos = 6;
     trace(byte.bytesAvailable)
   ```

   ​	Below we through a complete code to demonstrate the application of this class, such as network connectivity, we receive and send network messages.

   ```java
       var msg:Object ={name:"xxx",age:18,weight:65.5,height:175};
       var byte:Byte = new Byte();// Instantiate a byte array
       byte.endian = Byte.LITTLE_ENDIAN;// Set the size end
       byte.writeUTFString(msg.name);// Write data
       byte.writeByte(msg.age);
       byte.writeFloat32(msg.weight);
       byte.writeInt16(msg.height);


       // Set pos to 0 reading from the beginning in the order in which it was written
       byte.pos = 0;
       trace(byte.getUTFString());
       trace(byte.getByte());

       trace(byte.getFloat32());
       trace(byte.getInt16());
   ```

   ​

   ##h5 Typed array

   ​	Laya's byte package is a typed array of H5, and developers can refer to the official API description of mdn. To extend the application of your project.

- [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) The DataView view provides an underlying interface to read and write multiple numeric types from the [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), irrespective of the order in which the bytes in the memory are arranged in the platform (byte order)

- [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) The Uint8Array array type represents a 8 bit unsigned integer array, created when the content is initialized to 0. After you've created, you can refer to elements in an array in the form of objects or indexed by an array index.

- **[Int8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)** :A type array representing an array of binary complement 8 bit signed integers. The content is initialized to 0. Once established, you can use object methods to refer to elements in an array, or use standard array index syntax.

- **[Int16Array()](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)**;Type array represents binary complement, 16 bit signed array.

- **[Uint16Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)**;Type array represents binary complement, 16 bit unsigned array

- **[Int32Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)**;Type array represents binary complement, 32 bit signed array

- **[Uint32Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)**;Type array represents binary complement, 32 bit unsigned array

- **[Float32Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)**;Type array representing an array of 32 bit floating numbers.

- **[Float64Array()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)**;Type array represents an array of 64 bit floating point numbers.


   ​	
