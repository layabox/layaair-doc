#Laya Compiler



###Qu 'est - ce que c' est?

Layacompiler supporte la traduction de l 'AS3 en JS et définit un identificateur représentant un contenu particulier qui comprend`“//[IF-SCRIPT] ”、//[IF- SCRIPT-BEGIN]”、“//[IF-SCRIPT-END] ”、“/*[IF-FLASH]*/ ”、“/*[IF-FLASH-BEGIN]*/”、“/*[IF-FLASH-END]*/”`".Lors de la compilation, le compilateur layacompiler remplace les macro - identificateurs apparaissant dans le code source par un code défini par le compilateur.



###Pourquoi utiliser la macro - Compilation

En raison de la différence de niveau linguistique entre Flash AS3 et Javascript, layacompiler peut résoudre la différence linguistique par l 'identification macro et obtenir la publication simultanée de flash et de HTML5.



###Description de l 'utilisation de la macro - Compilation

####3.1 Édition de macro à une ligne


```java

 /*[IF-FLASH]*/value = byteArray.readUnsignedInt();
 //[IF-SCRIPT]value = byteArray.readInt();
```


**Monoligne macro**

1,0`/*[IF-FLASH]*/`Le contenu correspondant est exécuté lors de la publication de la version Flash, tandis que la version HTML 5 est annotée par le compilateur et non exécutée.Par exemple:`value = byteArray.readUnsignedInt();`La version Flash est normalement exécutée et la version JS n'est pas exécutée;

Deux.`//[IF-SCRIPT]`Le contenu correspondant est considéré comme non exécuté lors de la publication de la version flash et les notes sont supprimées lors de la traduction en JS, ce qui permet une exécution normale.Par exemple:`value = byteArray.readInt();`La version Flash n'est pas exécutée et la version JS est normalement exécutée;

Ajout à la première ligne des fichiers de la catégorie AS3`/*[IF-FLASH]*/`Cette catégorie AS3 ne sera pas compilée dans le JS.



####3.2 Formulation des macros multirangées


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


**Description de macro - écriture multiligne**

1,0`/*[IF-FLASH-BEGIN]*/`Et`/*[IF-SCRIPT-BEGIN]`Représente le début d 'une macro multiligne;

Deux.`/*[IF-FLASH-END]*/`Et`[IF-SCRIPT-END]*/`Représentant la fin de la macro multiligne;

Trois.`/*[IF-FLASH-BEGIN]*/`Et`/*[IF-FLASH-END]*/`Les codes entre eux fonctionnent normalement dans la version Flash, sont annotés lors de la compilation de la version JS et ne sont pas exécutés;

Quatre,`/*[IF-SCRIPT-BEGIN]`Et`[IF-SCRIPT-END]*/`Les codes entre eux sont considérés comme des codes annotés dans la version Flash, les notes sont supprimées lors de la compilation des fichiers JS et sont normalement exécutés dans la version JS;

