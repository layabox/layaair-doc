#Ecran

Il y a souvent des besoins d'interception lors de l'élaboration des projets, par exemple en ce qui concerne l'interception de contenus sur les écrans pour le partage ou le dessin secondaire.

###Fonction d 'interception

La fonction d 'écran d' interception est une fonction propre à layaplayer et tous les appels doivent être faits par l 'objet Conch, le Code étant le suivant:

```javascript

if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){

    }
}
```

**Description des fonctions**: capturescreen a besoin d 'une fonction de régression comportant trois paramètres, l' image imagedata, le type araybuffer, la largeur et la hauteur de l 'image.

**Tips**  
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*  
*Si vous utilisez la langue as pour développer`Browser.window['conch'] `Ceci permet d 'obtenir l' objet Concord.*

###Conservation des images

Après le retour de la fonction de retour de l 'écran d' interception, l 'image peut être stockée localement par saveaspng du nch, les fonctions spécifiques étant les suivantes:


```javascript

conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.png";
```

Après layanative - 0.9.13, les images peuvent également être stockées localement par saveasjpeg de Conch, avec les fonctions suivantes:


```javascript

conch.saveAsJpeg( arrayBuff,width,height,conch.getCachePath()+"/test.jpg" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.jpg";
```



**Description des fonctions**Saveasjpeg et saveaspng doivent être introduits dans trois paramètres, le premier étant les données imagedata de l 'image, le second et le troisième étant de largeur et de hauteur respectivement, et le troisième de manière à enregistrer le chemin complet et le nom de fichier.

**Tips**- Oui.
*Le trajet complet stocké peut être rempli par l 'développeur en fonction de ses propres besoins, mais il faut s' assurer que le trajet est correct.`conch.getCachePath()`Le répertoire cache de l 'application est obtenu en tant que Répertoire de stockage.*


###Création d'images directement par putimagedata
Après l 'interception, les données imagedata peuvent être mises dans l' objet image, en plus de la possibilité d 'enregistrer l' image dans un local, en plaçant les données imagedata dans le code suivant:

```javascript

var image = window.document.createElement("img");
image.putImageData(arrayBuff,width,height);
```

**Description des fonctions**: la fonction putimagedata requiert trois paramètres: données binaires, largeur et hauteur de l 'image.

**Tips**  
*putImageData函数是同步函数，putImageData后可直接使用image，不需要等待onload函数*
###Fonction de conversion de format
Après layanative - 0.9.13, les données imagedata de l 'image peuvent être converties en format JPG ou PG après l' interception, le code suivant:

```javascript

var jpg = conch.convertBitmapToJpeg(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.jpg", jpg);//保存到本地或者其他操作

var png = conch.convertBitmapToPng(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.png", png);//保存到本地或者其他操作
```

###Exemples de codes simples


```javascript

if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){
        /*
        //存储文件的方式
        conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
        window.globalImage = window.document.createElement("img");
		window.globalImage.onload=function()
		{
			...使用image对象
		}
		window.globalImage.src = "file:///" + conch.getCachePath()+"/test.png";
        */

        //
        window.image = window.document.createElement("img");
        image.putImageData(arrayBuff,width,height);
        //...使用image对象
    }
}

```

