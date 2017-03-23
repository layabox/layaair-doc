# LayaCompile宏编译



### **1、什么是宏编译？**

　　LayaCompile支持将AS3编译成JS，并定义了一个代表特定内容的标识符，它们包括“//[IF-SCRIPT] ”、//[IF- SCRIPT-BEGIN]”、“//[IF-SCRIPT-END] ”、“/*[IF-FLASH]*/ ”、“/*[IF-FLASH-BEGIN]*/”、“/*[IF-FLASH-END]*/”。LayaCompiler编译器在编译时会把源代码中出现的宏标识符替换成编译器定义的代码。



### **2、为什么要使用宏编译**

　　由于Flash AS3与JavaScript存在语言级的差异，通过宏的标识，LayaCompiler可以解决语言的差异，实现Flash与HTML5同时发布。



### **3、宏编译用法说明**

#### 3.1 单行宏编译写法

```java
 /*[IF-FLASH]*/value = byteArray.readUnsignedInt();
 //[IF-SCRIPT]value = byteArray.readInt();
```

**单行宏用法说明**

　　1、`/*[IF-FLASH]*/`同行的内容，在发布Flash版本时会被执行，而发布HTML5版本时会被编译器注释掉，不被执行。如： `value = byteArray.readUnsignedInt();`在Flash版本被正常执行，编译成JS版本不被执行；

　　2、 `//[IF-SCRIPT]`同行的内容，在发布Flash版本时会被视为注释代码不被执行，编译成JS时会去掉注释，可以正常执行。如： `value = byteArray.readInt();` 在Flash版本不被执行，编译成JS版本被正常执行；

　　3、如果是在AS3类文件的第一行添加`/*[IF-FLASH]*/`，那这个AS3类将不被编译到JS中。



#### **3.2 多行宏的写法**

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

**多行宏写法说明**

​    1、`/*[IF-FLASH-BEGIN]*/` 与`/*[IF-SCRIPT-BEGIN]` 代表多行宏的开始；

​    2、`/*[IF-FLASH-END]*/` 与`[IF-SCRIPT-END]*/` 代表多行宏的结束；

​    3、`/*[IF-FLASH-BEGIN]*/`与`/*[IF-FLASH-END]*/` 之间的代码在Flash版本中被正常运行，在编译JS版本时被注释，不被执行；

​    4、`/*[IF-SCRIPT-BEGIN]` 与`[IF-SCRIPT-END]*/` 之间的代码在Flash版本中被视为注释代码，在编译JS文件时会去掉注释，JS中被正常执行；

