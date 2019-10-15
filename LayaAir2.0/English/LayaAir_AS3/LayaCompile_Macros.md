#LayaCompiler macro compilation



###1. What is macro compilation?

LayaCompiler supports compiling AS3 into JS and defines an identifier for specific content, which includes`“//[IF-SCRIPT] ”、//[IF- SCRIPT-BEGIN]”、“//[IF-SCRIPT-END] ”、“/*[IF-FLASH]*/ ”、“/*[IF-FLASH-BEGIN]*/”、“/*[IF-FLASH-END]*/”`。 When compiled, the LayaCompiler compiler replaces the macro identifier appearing in the source code with the code defined by the compiler.



###2. Why use macro compilation

Because of the language-level differences between Flash AS3 and JavaScript, LayaCompiler can solve the language differences by macro-tagging, and realize the simultaneous publication of Flash and HTML5.



###3. Explanation of Macro Compiler Usage

####3.1 Compiling and Writing of Single-Line Macro


```java

 /*[IF-FLASH]*/value = byteArray.readUnsignedInt();
 //[IF-SCRIPT]value = byteArray.readInt();
```


**Single-line macro usage description**

1.`/*[IF-FLASH]*/`Peer content will be executed when the flash version is released, and will be commented out by the compiler when the HTML5 version is released, and will not be executed. Such as:`value = byteArray.readUnsignedInt();`The flash version is executed normally, and the JS version is not executed.

2.`//[IF-SCRIPT]`Peer content, when released Flash version, will be regarded as comment code not to be executed. When compiled into JS, the comment will be removed and can be executed normally. Such as:`value = byteArray.readInt();`Flash version is not executed, compiled into JS version is executed normally;

3. If added in the first line of AS3 file`/*[IF-FLASH]*/`That AS3 class will not be compiled into JS.



####3.2 Writing of multiline macros


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


**Multi-line macro description**

1.`/*[IF-FLASH-BEGIN]*/`And`/*[IF-SCRIPT-BEGIN]`Represents the beginning of a multiline macro;

2.`/*[IF-FLASH-END]*/`And`[IF-SCRIPT-END]*/`Represents the end of a multiline macro;

3.`/*[IF-FLASH-BEGIN]*/`And`/*[IF-FLASH-END]*/`The code between them is normally run in the Flash version, annotated when compiling the JS version, and not executed.

4.`/*[IF-SCRIPT-BEGIN]`And`[IF-SCRIPT-END]*/`The code between them is regarded as annotation code in Flash version. When compiling JS files, the annotation will be removed and the JS will be executed normally.

