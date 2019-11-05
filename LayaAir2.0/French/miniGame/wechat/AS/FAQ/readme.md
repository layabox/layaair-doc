#Résumé des problèmes courants

]*Autohor: Charley version: 2.0.1 Update: 2019 - 03 - 13*

####Il y a des ressources qui ne peuvent pas être chargées normalement.

Les fichiers d 'extension qui ne figurent pas sur la liste blanche ne peuvent pas être téléchargés avec succès et ne peuvent donc pas être utilisés.Cependant, il est possible de l 'utiliser par le chargement dynamique par URL et de ne pas l' envoyer dans un paquet local.

La liste blanche des types de documents connus est la suivante: PNG, JPG, JPEG, GIF, SVG, JS, json, CER, obj, Dae, Fbx, Mtl, STL, 3ds, MP3, PVR, WAV, plit, TTF, fnt, GZ, ccz, m4a, MP4, bmpp, Atlas, swf, Ani, part, proto, Bin, SK, mipmaps, txp, tt, map, Ogg, dat, Dae, FBX silk, dbbin, dbmv, etc., lmat, LM, LS, LH, LANI, lav, LS ani, LTC.



####Pourquoi le jeu a - t - il des dents sur certains modèles?

Avant la version 7.0.3, les microcommunications forcent l 'extension de la toile de Canvas à la taille physique de l' écran pour l 'adaptation de l' ensemble de l 'écran.On dirait qu 'il y a une sensation de mosaïque périphérique dans certains modèles à haute résolution.On peut alors adapter le modèle principal en ajustant la taille de la toile du modèle de conception.



####3, l 'effet sous H5 se révèle normal, la publication après le petit jeu commence à faire une erreur, le message erroné est lié à json.

Comme la lecture des ressources locales dans un petit jeu permet de vérifier le codage, alors que la plupart des fichiers non photographiques dans le projet sont codés pour ASCII, le moteur appelle l 'interface locale pour lire le fichier, la participation par défaut informe le petit jeu que le format de codage est ASCII, ce qui entraîne une erreur lorsque le format de codage des fichiers du paquet initial local (par exemple le fichier json) n' est pas ASCII.Le développeur doit donc vérifier le codage du fichier et passer par`MiniAdpter['getUrlEncode']`Dites à un petit jeu quel est le vrai Code du fichier, de sorte que le petit jeu puisse vérifier selon le code correct.


```js

//告诉小游戏你的文件编码是什么
MiniAdpter['getUrlEncode'] = getUrlAndEncode;//假如getUrlAndEncode是开发者识别文件编码的方法
```


Exemples de méthodes de codage de fichiers d 'identification de l' Développeur (version AS3):


```javascript

//该方法示例仅做参考，视项目情况自行修改或拓展
public static var getUrlAndEncode:Function = function(url:String,type:String):String
{
	if (url.indexOf(".fnt") != -1 || url.indexOf("xxx.json") != -1) 
    {
		return "utf8";
	} else if (type == "arraybuffer") 
    {
		return "";
	}
	return "ascii";
}
```




En outre, la lecture est chargée dynamiquement à partir du réseau sans limitation de vérification codée.Ainsi, il est possible de charger et de lire dynamiquement json dans le réseau.



####Le son ne peut pas être préchargé

Etant donné que les jeux de micro - messages ne supportent pas l 'utilisation de fichiers audio précontraints dans la mémoire, la lecture sonore est assurée directement par la catégorie de gestion audio soundmanger.







###Mise à jour ultérieure:

This paper will synthesize some usual Small Problems that developed developed a micro - credit game.Si vous avez des questions sur ce document, demandez à la communauté du site officiel.

Ce document est mis à jour de façon irrégulière pour répondre aux problèmes récurrents des petits jeux que les promoteurs de la communauté ont rencontrés.

Site Web communautaire: < https: / / ask.layabox.com >



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)