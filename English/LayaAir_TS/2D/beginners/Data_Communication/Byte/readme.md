# Byte 二进制读写

在开发项目中，二进制的操作是不可或缺的。在html5时代，对二进制的支持已经有了很大的突破。但是api的繁琐对开发者开发项目来说不太方便。在页游时代，ActionScript3.0的二进制数组ByteArray，功能完善，api操作简单易懂，因此Laya的Byte在参考ByteArray的同时承接了html5的TypedArray类型化数组的特点。下面看下主要的用法。

## 常用方法

- 构造方法

  #### 参数：

  `length` :长度

  当传入length参数时,一个内部数组缓冲区被创建,该缓存区的大小是传入的length大小。

  `typedArray`:类型化数组

  当传入一个包含任意类型元素的任意类型化数组对象(`typedArray)` (比如 **Int32Array)**作为参数时,typeArray被复制到一个新的类型数组。typeArray中的每个值会在复制到新的数组之前根据构造器进行转化.新生成的类型化数组对象将会有跟传入的数组相同的length(译者注:比如原来的typeArray.length==2,那么新生成的数组的length也是2,只是数组中的每一项进行了转化)。

  `ArrayBuffer`：二进制数据缓冲区。

  上面的三种方法都可以实例化一个Byte，根据参数的不同创建二进制数据。

  ​

  ​