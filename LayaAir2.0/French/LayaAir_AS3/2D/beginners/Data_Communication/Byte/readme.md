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
  var byte:Byte = new Byte();
  //或者传入一个类型化数组
  var uint8Byte:Uint8Array = new Uint8Array(10);
  var byte:Byte = new Byte(uint8Byte);
  //或者传入一个ArrayBuffer类型
  var buffer:ArrayBuffer = new ArrayBuffer(20);
  var byte:Byte = new Byte(buffer);
  ```


​


- Oui.**Writearraybuffer**(araybuffer: *, offset: Unit = 0, Length: Unit = 0): void

Écris les données tampons binaires spécifiées.Spécifie le décalage et la longueur des données comme suit:



  
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


- lis les données.


  **Getbyte**(): int lit un octet dans un flux de octets.


  **Getint16**(): int lit la valeur int 16 à l 'emplacement actuel du décalage de octets.


  **Getint32**(): int lit la valeur int 32 à l 'emplacement actuel du décalage de octets


  **Getfloat32**(): Number lit la valeur float32 à une position de décalage de octets spécifiée.


  **Getfloat32array**(START: int, Len: int): *: les données de la longueur spécifiée sont lues à partir d 'une position spécifiée pour créer un objet float32array et revenir à cet objet.


  **Getfloat64**(): Number lit la valeur float64 à une position de décalage de octets spécifiée.


  **Getint16**(): int lit la valeur int 16 à l 'emplacement actuel du décalage de octets.


  **Getint32**(): int lit la valeur int 32 à l 'emplacement actuel du décalage de octets.


  **Getunit8**(): uint lit la valeur Unit8 à l 'emplacement actuel du décalage de octets.


  **Getunit16**(): uint lit la valeur UNIT16 à l 'emplacement actuel du décalage de octets.


  **Getunit32**(): uint lit la valeur unit32 à l 'emplacement actuel du décalage de octets.


  **Getint16array**(START: int, Len: int): *: les données de la longueur spécifiée sont lues de l'emplacement spécifié pour créer un objet int16array et revenir à cet objet.


  **Getstring**(: String lit les valeurs de type caractères.


  **Getutfbytes**(Len: int = - 1): String lit une chaîne de caractères qui doit être écrite par writeutfbytes.


  **Getutfstring**(): String lit la chaîne UTF - 8.



* Écris des données.

- Oui.**Writebyte**(valeur: int): void insère un octet dans le flux bytique.



  
```typescript

   var byte:Byte = new Byte();
   byte.writeByte(10);//0-255之间
  ```


- Oui.**Writefloat32**(Value: Number): void insère la valeur float32 à la position actuelle du décalage de octets.Champ d 'application: $left [$2 ^ {128}, 2 {127} \ \ right] $, approximativement - 3.4e38-3.4e + 38.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(10.021);
  ```


- Oui.**Writefloat64**(valeur: nombre): void indique la valeur float64 dont la plage numérique est de - 1,7e308 à 1,7e + 308.

- Oui.**Writeint16**(valeur: int): void insère la valeur int 16 à l'emplacement actuel du décalage de octets.Portée - 32768 à + 32 767.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  ```



- Oui.**Writeint32**(valeur: int): void insère la valeur int 32 à la position actuelle du décalage de octets.- 2, 147, 483, 648 à + 2, 147, 483, 647 avec un nombre entier de symboles.

- Oui.**Writeunit16**(valeur: int): void insère la valeur UNIT16 à la position actuelle du décalage de octets.

- Oui.**Writeunit32**(valeur: int): void insère la valeur unit32 à la position actuelle du décalage de octets.

- Oui.**Writeunit8**(valeur: int): void insère la valeur Unit8 à la position actuelle du décalage de octets.

- Oui.**Writeutfbytes**(valeur: String): les chaînes écrites selon le procédé sont lues par readutfbytes.

- Oui.**Writeutfstring**(valeur: String): void écrit une chaîne UTF - 8 dans un flux de octets.

- Oui.**Clear**(): void clearance data.



  
```typescript

  var byte:Byte = new Byte();
  byte.clear();//清除所有数据归零。
  ```


- Oui.**Getsystemendian ()**: String [Static] acquiert l 'ordre de stockage des octets du système.



  
```typescript

  trace(Byte.getSystemEndian());//打印系统的字节顺序
  ```







- ###Attribut

♪ Big, U endian ♪**: String = bigendian [Static] indique que le octet le plus efficace du nombre de bytes est situé en tête de la séquence de bytes.****
****
- Oui.**Little 'u endian**: String = littleendian [Static] indique que les octets valides les plus faibles d 'un nombre multibyte se trouvent en tête de la séquence d' octets.****
****
- Oui.**[pos]**: int position actuellement lue.****



  
```typescript

  var byte:Byte = new Byte();
  byte.writeInt16(120);
  byte.pos =0;//读取位置归零。
  ```
****


- Oui.**Length**= longueur d 'octet Int.****
****
- Oui.**Endian**: ordre bytique string.****



  
```typescript

  var byte:Byte = new Byte();
  byte.endian = Byte.BIG_ENDIAN;//设置为大端；
  ```
****

- Oui.**Bytesavailable * *: int [Read - only] octets pouvant être lus de la position actuelle du flux de octets à la fin.



  
```typescript

  var byte:Byte = new Byte();
  byte.writeFloat32(20.0);
  byte.writeInt16(16);
  byte.writeUTFString("hell world");
  byte.pos = 6;
  trace(byte.bytesAvailable)
  ```


Nous allons maintenant utiliser un code complet pour illustrer cette catégorie d 'applications, par exemple dans la connexion réseau, nous recevons et envoyons des messages réseau.


```typescript

var msg:Object ={name:"xxx",age:18,weight:65.5,height:175};
var byte:Byte = new Byte();//实例化byte数组
byte.endian = Byte.LITTLE_ENDIAN;//设置大小端
byte.writeUTFString(msg.name);//写入数据
byte.writeByte(msg.age);
byte.writeFloat32(msg.weight);
byte.writeInt16(msg.height);
```


Les résultats sont les suivants:


```typescript

//设置pos为0 开始从头开始按照写入的顺序读取读取
byte.pos = 0;
trace(byte.getUTFString());
trace(byte.getByte());
trace(byte.getFloat32());
trace(byte.getInt16());
```


##H5 matrice de typification

Le Byte de Laya est encapsulé par une matrice de type H5, dont le développeur peut se référer à la description officielle API de MDN.Pour élargir l 'application de son projet.

##- Oui.[DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)L 'affichage fournit un ordre de tri (Byte) non lié à l' ordre de tri (Byte) des octets dans la mémoire d 'une plate - forme.`ArrayBuffer`] (https: / / developer.mozilla.org / zh - cn / docs / WEB / javascript / Reference / Global u objects / arraybuffer) read and Writing Multi - Digital subsurface interface. [Uint8Array](https://developer.mozilla.org/zh_CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)Le type de matrice représente une matrice complète à huit bits sans symbole, le contenu de création étant initialisé en zéro.Après la création, les éléments de la matrice peuvent être cités sous la forme d 'un objet ou par l' utilisation d 'un index d' indexation matriciel.
##- Oui.**Int8array**: la matrice de type correspond à une Matrice binaire avec un nombre entier de symboles à huit bits.Initialisez le contenu en zéro.Une fois établi, vous pouvez utiliser la méthode de l 'objet pour citer des éléments dans une matrice ou utiliser la grammaire d' index de matrice standard. **Int16array ()**B) une matrice de type représente une matrice de 16 bits de code binaire avec un symbole.
##- Oui.**Unin16array ()**; types de matrices représentant des nombres binaires de 16 bits non marqués **Int32array ()**; types de matrices représentant des nombres binaires de 32 bits
##- Oui.**Unit32array ()**; types de matrices représentant des nombres binaires à 32 bits non marqués **Float32array ()**B) une matrice de type représente une matrice de 32 points flottants.
- Oui.**Float64array ()**B) une matrice de type représente une matrice de 64 points flottants.