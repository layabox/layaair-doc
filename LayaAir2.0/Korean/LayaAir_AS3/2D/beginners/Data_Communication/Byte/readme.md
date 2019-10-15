#Byte 2진수 읽기

개발 항목에서 이진수의 조작은 불결한 것이다.html5 시대에 2진수에 대한 지지는 이미 큰 돌파를 보이고 있다.하지만 에이피의 번거로움은 개발자 개발 사업에 불편했다.페이지 유휴 시대에는 Action Script3.0의 2진수 ByteArray, 기능이 완벽하고, api 조작이 간단하고 알기 쉽기 때문에 Laya ByteArray 는 ByteArray를 참고하면서 html5 의 TypedArray 유형화 디지털 특성을 접수했다.다음은 주요 용법을 살펴본다

###상용 방법

-구조법



  ####인자:


  `length`길이

length 인자 변수를 불러올 때, 내부 디지털 버퍼링이 생성되었을 때, 이 캐시 영역의 크기는 전입된 length 크기입니다.


  `typedArray`형식화 배열

임의 유형 요소를 포함하는 임의 형식화 배열 대상 (`typedArray)`가령**인터32Array)**인자할 때, typerray는 새로운 유형 배열로 복사되었다.typerray의 모든 값은 새로운 그룹으로 복사하기 전에 구조기에 따라 변화된다. 새로운 생성된 유형화 배열 대상은 전입된 숫자와 같은 length(번역자 주: 예를 들어 typerray.length=2, 그러면 새로 생성된 숫자의 length 도 2. 다만 디지털 중 하나하나가 바뀌게 된다.


  `ArrayBuffer`바이너리 버퍼

위의 세 가지 방법은 모두 하나의 Byte 를 사실화하여 인자에 따라 2진수 데이터를 생성할 수 있다.



  
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


--**writeArrayBufer**(arraybufffer: ofset:uint=0,length:uint=0:0:void

지정한 바이너리 버퍼 데이터를 기록합니다.지정한 데이터의 이동량과 길이가 다음과 같습니다:



  
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


읽기 데이터


  **getByte**(): int 는 바이트 흐름에서 바이트를 읽습니다.


  **getInt 16**(): int 는 현재 바이트 편이량 위치에서 Int 16값을 읽습니다.


  **getint 32**(): int 현재 바이트 편이량 위치에서 인트32값을 읽습니다


  **getFloat32**(): Number 는 바이트 편이량 위치에서 Float32 값을 읽습니다.


  **getFloat 32Array**(start: int, len: int) * 지정한 위치에서 지정한 길이를 읽는 데이터가 Float 32Array 대상을 생성하고 이 대상으로 되돌아갑니다.


  **getFloat64**(): Number 는 바이트 편이량 위치에서 Float64 값을 읽습니다.


  **getInt 16**(): int 는 현재 바이트 편이량 위치에서 Int 16값을 읽습니다.


  **getint 32**(): int 는 현재 바이트 이동량 위치에서 인트 32값을 읽습니다.


  **getUint8**(): uint 는 현재 바이트 편이량 위치에서 Uint8 값을 읽습니다.


  **getUint16**(): uint 는 현재 바이트 편이량 위치에서 Uint16 값을 읽습니다.


  **getUint32**(): uint 가 현재 바이트 편이량 위치에서 Uint32 값을 읽습니다.


  **getInt 16Array**(start: int, len: int) * 지정한 위치에서 지정한 길이를 읽는 데이터는 Int 16Array 대상을 만들기 위해 이 대상을 만듭니다.


  **getstring**(): String 문자 형 값을 읽습니다.


  **getUTFBytes**(len:int=1): String 문자열 읽는 것은 writeUTFytes 방법으로 쓴 문자열입니다.


  **getUTFString**(): String UTF-8 문자열을 읽습니다.



------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--**writebyte**(value: int): void 는 바이트 흐름에 글쓰기.



  
```typescript

   var byte:Byte = new Byte();
   byte.writeByte(10);//0-255之间
  ```


--**write Float32**(value: Number): void 는 현재 바이트 편환량 위치에 Float32 치를 기록합니다.범위는left[-2 {128}, 2 {127}, 2 {127right]$, 약 3.4E38-3.4E+38.48.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(10.021);
  ```


--**write Float64**(value:Number): void 는 float64 비트 수치 수치 수치를 기록하는 범위는 - 1.7E308~1.7E+308.

--**writent 16**(value: int): void 는 현재 바이트 변환량 위치에 Int 16치를 기록합니다.범위-32768에서 + 32767사이다.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  ```



--**writent 32**(value: int): void 는 현재 바이트 변환량 위치에 Int32 값을 기록합니다.-2, 147, 483, 6488에서 + 2, 147, 483, 647의 부호 정수.

--**writeuint16**(value: int): void 는 현재 바이트 변환량 위치에 Uint16 값을 기록합니다.

--**writeuint32**(value: int): void 는 현재 바이트 변환량 위치에 Uint32 치를 기록합니다.

--**writeuint8**(value: int): void 는 현재 바이트 변환량 위치에 Uint8 값을 기록합니다.

--**writeUTFBytes**(value: String): void 에 문자열을 쓰기, 이 방법의 문자열은 readUTFBytes 방법을 사용해야 합니다.

--**writeUTFString**(value: String): void 는 UTF-8 문자열을 문자열에 쓴다.

--**clear**():void 에서 데이터를 삭제합니다.



  
```typescript

  var byte:Byte = new Byte();
  byte.clear();//清除所有数据归零。
  ```


--**getSystemEndian ()**String[static] 시스템의 바이트 기억 순서.



  
```typescript

  trace(Byte.getSystemEndian());//打印系统的字节顺序
  ```







- ###속성

-*BIG, u ENDIAN**String = bigEndian[static] 여러 바이트 숫자의 가장 높은 바이트를 표시합니다.****
****
--**LITLEuENDIAN**String = littleEndian[static]다바이트 숫자의 최저 바이트 순서에 위치한 가장 앞쪽에 있습니다.****
****
--**[pos]**int 현재 읽는 위치입니다.****



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  byte.pos =0;//读取位置归零。
  ```
****


--**length**int 바이트 길이.****
****
--**en.**String 바이트 순서.****



  
```typescript

  var byte:Byte = new Byte();
  byte.endian = Byte.BIG_ENDIAN;//设置为大端；
  ```
****

--**bytesavailable**: int [read-only] 바이트에서 흐르는 현재 위치에서 끝으로 읽을 수 있는 데이터의 바이트 수.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(20.0);
  byte.writeInt16(16);
  byte.writeUTFString("hell world");
  byte.pos = 6;
  trace(byte.bytesAvailable)
  ```


이 종류의 응용을 네트워크 연결에 접속하거나 네트워크 메시지를 수신 및 발송합니다.


```typescript

var msg:Object ={name:"xxx",age:18,weight:65.5,height:175};
var byte:Byte = new Byte();//实例化byte数组
byte.endian = Byte.LITTLE_ENDIAN;//设置大小端
byte.writeUTFString(msg.name);//写入数据
byte.writeByte(msg.age);
byte.writeFloat32(msg.weight);
byte.writeInt16(msg.height);
```


출력 결과:


```typescript

//设置pos为0 开始从头开始按照写入的顺序读取读取
byte.pos = 0;
trace(byte.getUTFString());
trace(byte.getByte());
trace(byte.getFloat32());
trace(byte.getInt16());
```


##h5 유형화 배열

레이야의 byte 는 h5 의 유형화 배열로 개발자가 mdn 공식 api 설명을 참고할 수 있다.자신의 프로젝트를 확장하는 응용.

##--[DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)보기 는 플랫폼 에서 바이트 를 메모리 에서 배열 순서 (바이트 순서) 와 무관하다`ArrayBuffer`](htttps://developer.mozilla.org/zh-CN/docs/Web/Javascript/Reference/Globalu Objects/ArrayBufffer)를 읽으며 다양한 숫자 형식의 인터페이스를 읽는다. [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)배열 유형은 8명의 부호 정형 수치를 나타내며, 생성 시 내용이 0으로 초기화됐다.작성 후, 대상 방식이나 그룹 하표 인덱스를 사용할 수 있는 방식으로 배열의 요소를 인용할 수 있습니다.
##--**인트8Array**형식 배열은 바이너페이스 8비트 기호 정수를 나타낸다.내용 초기화 0.만약 설립되면, 당신은 대상을 사용할 수 있는 방법으로 배열의 요소를 인용하거나 표준 배열 색인 문법을 사용할 수 있습니다. **인트16Array ()**유형 디지털은 2진수 부호 16위에 기호 있는 그룹을 나타냈다.
##--**Uint16Array ()**그리고 유형 배열은 2진수 코드 16위 부호 없는 그룹 **인트32Array ()**그리고 유형 배열은 2진수 코드 32위 기호 있는 그룹
##--**Uint32Array ()**그리고 유형 배열은 2진수 부호 없는 숫자 32위 **Float32Array ()**유형 배열은 32비트 포인트 숫자를 나타낸다.
--**Float64Array ()**유형 배열은 64비트 포인트 숫자를 나타낸다.