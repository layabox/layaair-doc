#LayaCompiller 매크로 컴파일



###1, 무엇이 홍 편역입니까?

LayaCompiller 지원은 AS3 를 JS 로 편역하고, 대표적인 내용의 아이콘을 정의합니다.`“//[IF-SCRIPT] ”、//[IF- SCRIPT-BEGIN]”、“//[IF-SCRIPT-END] ”、“/*[IF-FLASH]*/ ”、“/*[IF-FLASH-BEGIN]*/”、“/*[IF-FLASH-END]*/”`.LayaCompiller 번역기가 번역할 때 원본 코드에 나타난 매크로 인터페이스를 번역기 정의 코드로 대체합니다.



###2, 왜 매크로 번역

Flash AS3 와 자바스크립트의 언어급 차이로 매크로 표시를 통해 LayaCompiller 언어의 차이를 해결하고 플래쉬와 HTML5 를 동시에 발표할 수 있다.



###3, 매크로 컴파일 용법 설명

####3.1 일행매크로 번역법


```java

 /*[IF-FLASH]*/value = byteArray.readUnsignedInt();
 //[IF-SCRIPT]value = byteArray.readInt();
```


**일방 매크로 용법 설명**

1.`/*[IF-FLASH]*/`동행 내용은 플래쉬 버전을 발표하면 실행되고 HTML5 버전을 발표할 때 편집기 주석으로 실행되지 않습니다.예:`value = byteArray.readUnsignedInt();`Flash 버전에서 실행되었습니다. JS 버전으로 번역되지 않습니다.

2.`//[IF-SCRIPT]`동행한 내용은 Flash 버전을 발표할 때 주석 코드가 실행되지 않고 JS 로 번역될 때 주석을 제거하고 실행할 수 있다.예:`value = byteArray.readInt();`Flash 버전에서 실행되지 않고 JS 버전으로 번역되어 실행됨;

3. AS3 류 파일의 첫 번째 줄에 추가`/*[IF-FLASH]*/`이 AS3 류는 JS 에 번역되지 않을 것이다.



####3.2 다행매의 문법


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


**다행거창법 설명**

1.`/*[IF-FLASH-BEGIN]*/`과`/*[IF-SCRIPT-BEGIN]`대표는 다행굉의 시작;

2.`/*[IF-FLASH-END]*/`과`[IF-SCRIPT-END]*/`대표는 다행웅의 끝;

3.`/*[IF-FLASH-BEGIN]*/`과`/*[IF-FLASH-END]*/`Flash 버전에서 일반 실행, JS 버전을 번역할 때 주석되지 않습니다.

4.`/*[IF-SCRIPT-BEGIN]`과`[IF-SCRIPT-END]*/`Flash 버전에서 주석 코드로 간주하며 JS 파일을 편집할 때 주석을 제거합니다. JS 에서 정상적으로 실행됩니다.

