#Byte binaire lire et écrire

Dans les projets de développement, le fonctionnement binaire est indispensable.À l 'époque du HTML5, l' appui au système binaire a fait un grand pas en avant.Toutefois, la lourdeur de l'API ne facilite pas le développement des projets par les promoteurs.À l'époque de l'itinérance des pages, bytearray, une Matrice binaire d'actionscript3.0, fonctionnant bien et fonctionnant facilement, Byte de Laya a pris en charge les caractéristiques de la matrice type type type type type type type type type type type type type type type type type type type type tml5, tout en se référant à bytearray.Voici l'usage principal.

###Méthode courante

- méthodes de construction



  ####Paramètres:


  `length`Longueur

Lorsqu 'un paramètre length est introduit, une zone tampon de matrice interne est créée et la taille de la zone tampon est la taille de length introduite.


  `typedArray`Matrice de type

Lorsqu 'un objet de matrice de type arbitraire contenant un type quelconque est introduit`typedArray)`Par exemple**(En milliers de dollars des États - Unis)**En tant que paramètre, typearray est copié dans une nouvelle matrice de type.Chaque valeur de type type type de matrice est convertie en fonction du constructeur avant d 'être copiée dans une nouvelle matrice.


  `ArrayBuffer`: zone tampon binaire de données.

Les trois procédés ci - dessus permettent d 'personnaliser un Byte et de créer des données binaires en fonction de différents paramètres.



  
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


- Oui.**Writearraybuffer**(araybuffer: *, offset: number = 0, Length: number = 0): void

Écris les données tampons binaires spécifiées.Spécifie le décalage et la longueur des données comme suit:



  
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


- lis les données.


  **Getbyte**(): Number lit un octet dans un flux de octets.


  **Getint16**(): Number lit la valeur int 16 à l 'emplacement actuel du décalage de octets.


  **Getint32**(): Number lit la valeur int 32 à l 'emplacement actuel du décalage de octets


  **Getfloat32**(): Number lit la valeur float32 à une position de décalage de octets spécifiée.


  **Getfloat32array**(START: NUMBER, Len: Number): any read the Data of the specific length from the location to create a float32 Array object and Return to the object.


  **Getfloat64**(): Number lit la valeur float64 à une position de décalage de octets spécifiée.


  **Getint16**(): Number lit la valeur int 16 à l 'emplacement actuel du décalage de octets.


  **Getint32**(): Number lit la valeur int 32 à l 'emplacement actuel du décalage de octets.


  **Getunit8**(): Number lit la valeur Unit8 à l 'emplacement actuel du décalage de octets.


  **Getunit16**(): Number lit la valeur UNIT16 à l 'emplacement actuel du décalage de octets.


  **Getunit32**(): Number lit la valeur unit32 à l 'emplacement actuel du décalage de octets.


  **Getint16array**(START: NUMBER, Len: Number): any read the Data of the specific length from the location to create an ent16array object and Return to the object.


  **Getstring**(: String lit les valeurs de type caractères.


  **Getutfbytes**(Len: number = - 1): String read chain, must be writeutfbytes.


  **Getutfstring**(: String lit la chaîne UTF - 8.



* Écris des données.

- Oui.**Writebyte**(valeur: nombre): void écrit un octet dans un flux de bytes.



  
```typescript

   var byte:Laya.Byte = new Laya.Byte();
   byte.writeByte(10);//0-255之间
  ```


- Oui.**Writefloat32**(Value: Number): void insère la valeur float32 à la position actuelle du décalage de octets.Champ d 'application: $left [$2 ^ {128}, 2 {127} \ \ right] $, approximativement - 3.4e38-3.4e + 38.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeFloat32(10.021);
  ```


- Oui.**Writefloat64**(valeur: nombre): void indique la valeur float64 dont la plage numérique est de - 1,7e308 à 1,7e + 308.

- Oui.**Writeint16**(Value: Number): void insère la valeur int16 à la position actuelle du décalage de octets.Portée - 32768 à + 32 767.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeInt16(120);
  ```


- Oui.**Writeint32**(Value: Number): void insère la valeur int 32 à la position actuelle du décalage de octets.- 2, 147, 483, 648 à + 2, 147, 483, 647 avec un nombre entier de symboles.

- Oui.**Writeunit16**(Value: Number): void insère la valeur UNIT16 à l'emplacement actuel du décalage de octets.

- Oui.**Writeunit32**(Value: Number): void insère la valeur unit32 à l'emplacement actuel du décalage de octets.

- Oui.**Writeunit8**(Value: Number): void insère la valeur Unit8 à l'emplacement actuel du décalage de octets.

- Oui.**Writeutfbytes**(valeur: String): void écrit dans une chaîne de caractères qui doit être lue par readutfbytes.

- Oui.**Writeutfstring**(valeur: String): void écrit une chaîne UTF - 8 dans un flux de octets.

- Oui.**Clear**(): void clearance data.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.clear();//清除所有数据归零。
  ```


- Oui.**Getsystemendian ()**: String [Static] acquiert l 'ordre de stockage de bytes du système.



  
```typescript

  console.log(Laya.Byte.getSystemEndian());//打印系统的字节顺序
  ```



- Oui.###Attribut

♪ Big, U endian ♪**= String = bigendian [Static] indique que le octet le plus efficace du nombre de bytes est situé en tête de la séquence de bytes.****
****
- Oui.**Little 'u endian**: String = littleendian [Static] indique que les octets valides les plus faibles d 'un nombre multibyte se trouvent en tête de la séquence d' octets.****
****
- Oui.**[pos]**: Number actuellement lu.****



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeInt16(120);
  byte.pos =0;//读取位置归零。
  ```
****


- Oui.**Length**: nombre de bytes.****
****
- Oui.**Endian**: ordre bytique string.****



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.endian = Laya.Byte.BIG_ENDIAN;//设置为大端；
  ```
****

- Oui.**Bytesavailable * *: nombre de octets [Read - only] pouvant être lus de la position actuelle du flux de octets à la fin.



  
```typescript

  var byte:Laya.Byte = new Laya.Byte();
  byte.writeFloat32(20.0);
  byte.writeInt16(16);
  byte.writeUTFString("hell world");
  byte.pos = 6;
  console.log(byte.bytesAvailable)
  ```


Nous allons maintenant utiliser un code complet pour illustrer cette catégorie d 'applications, par exemple dans la connexion réseau, nous recevons et envoyons des messages réseau.


```typescript

var msg:any ={name:"xxx",age:18,weight:65.5,height:175};
var byte:Laya.Byte = new Laya.Byte();//实例化byte数组
byte.endian = Laya.Byte.LITTLE_ENDIAN;//设置大小端
byte.writeUTFString(msg.name);//写入数据
byte.writeByte(msg.age);
byte.writeFloat32(msg.weight);
byte.writeInt16(msg.height);
```


Les résultats sont les suivants:


```typescript

//设置pos为0 开始从头开始按照写入的顺序读取读取
byte.pos = 0;
console.log(byte.getUTFString());
console.log(byte.getByte());
console.log(byte.getFloat32());
console.log(byte.getInt16());
```


##H5 matrice de typification

Le Byte de Laya est encapsulé par une matrice de type H5, dont le développeur peut se référer à la description officielle API de MDN.Pour élargir l 'application de son projet.

##- Oui.[DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)L 'affichage fournit un ordre de tri (Byte) non lié à l' ordre de tri (Byte) des octets dans la mémoire d 'une plate - forme.`ArrayBuffer`] (https: / / developer.mozilla.org / zh - cn / docs / WEB / javascript / Reference / Global u objects / arraybuffer) read and Writing Multi - Digital subsurface interface. [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)Le type de matrice représente une matrice complète à huit bits sans symbole, le contenu de création étant initialisé en zéro.Après la création, les éléments de la matrice peuvent être cités sous la forme d 'un objet ou par l' utilisation d 'un index d' indexation matriciel.
##- Oui.**Int8array**: la matrice de type correspond à une Matrice binaire avec un nombre entier de symboles à huit bits.Initialisez le contenu en zéro.Une fois établi, vous pouvez utiliser la méthode de l 'objet pour citer des éléments dans une matrice ou utiliser la grammaire d' index de matrice standard. **Int16array ()**B) une matrice de type représente une matrice de 16 bits de code binaire avec un symbole.
##- Oui.**Unin16array ()**; types de matrices représentant des nombres binaires de 16 bits non marqués **Int32array ()**; types de matrices représentant des nombres binaires de 32 bits
##- Oui.**Unit32array ()**; types de matrices représentant des nombres binaires à 32 bits non marqués **Float32array ()**B) une matrice de type représente une matrice de 32 points flottants.
- Oui.**Float64array ()**B) une matrice de type représente une matrice de 64 points flottants.