#Gestion de mémoire cache physique

> Author: Charley

###Cache physique

En plus des paquets locaux, les petits jeux permettent à l 'développeur d' utiliser un espace de cache physique de 50m.En d 'autres termes, après le premier chargement, les ressources dans la mémoire tampon physique ne nécessitent pas de téléchargement dynamique et utilisent directement les ressources de mémoire tampon locales.Ainsi, non seulement les joueurs peuvent économiser beaucoup de flux de téléchargement, mais ils ont aussi la même vitesse d 'ouverture que les jeux app originaux.



###Mécanisme de gestion de cache par défaut pour moteur layaair

Dans le moteur layaair, la couche de moteur a automatiquement mis en place un mécanisme de gestion de cache pour le développeur, et le mécanisme de gestion de cache automatique a été activé par défaut.

En mode de gestion de cache automatique,**Si l 'on détecte que la ressource n' est pas tamponnée localement, la ressource distante est automatiquement tamponnée.Notez que seules les images et les fichiers sonores sont mis en cache en mode cache automatique**Si un autre format de fichier doit être mis en antémémoire, le téléchargement et le cache peuvent être effectués par l 'intermédiaire d' une interface de mise en antémémoire manuelle.

Si le fichier cache est supérieur à 50 m, le contenu de la mémoire cache initiale est automatiquement nettoyé, chaque fois que l 'espace 5m est nettoyé, de sorte que l' écriture cyclique garantit que le fichier cache est toujours le fichier 50m le plus récent téléchargé.



###Interface de gestion manuelle du cache du moteur layaair

####Désactiver le cache automatique

Si les ressources usuelles du jeu sont supérieures à 50 m, l 'utilisation de fichiers caches gérés automatiquement ne répond pas nécessairement aux attentes de l' développeur.En particulier, les ressources initialement chargées, si elles sont des ressources d 'utilisation courante, alors que la mémoire tampon des ressources après le chargement est supérieure à 50 m, les ressources précédemment tamponnées sont nettoyées, et une fois de plus à la prochaine utilisation.Par conséquent, lorsque les ressources usuelles sont supérieures à 50 m, il est recommandé que le développeur détermine lui - même quelles ressources sont mises en mémoire tampon plus significatives et mieux adaptées à l 'expérience des utilisateurs.Le mode cache automatique peut alors être supprimé.

S' il n 'est pas nécessaire de gérer automatiquement le cache du moteur, bminiadpter.autocachefile peut être configuré en faux.Il convient de noter qu 'une fois que le cache automatique est désactivé, comme il n' y a pas de nettoyage automatique, plus de 50 m risque d 'aboutir à l' échec de l 'écriture du cache.



####Téléchargement manuel et cache des fichiers locaux

Lorsqu 'il n' est pas prévu d 'utiliser une fonction de cache automatique ou, en mode cache automatique, un contenu de fichier qui n' est pas cache automatiquement, tel que json, peut être mis en antémémoire, le procédé downloadfile peut être utilisé pour télécharger le fichier cible et le mettre en antémémoire locale.


```javascript

/**
* 下载文件 
* @param fileUrl 文件地址(全路径)
* @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
* @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
* @param encoding 文件编码默认 ascill，非图片文件加载需要设置相应的编码，二进制编码为空字符串
*/             
public static function downLoadFile(fileUrl:String, fileType:String = "",callBack:Handler = null,encoding:String = "ascii"):void
```




####Effacer le fichier de cache

Etant donné que le plafond de cache pour les jeux de petite taille est un espace physique de 50m, il est nécessaire de nettoyer le cache lorsque le plafond est atteint, que la mémoire cache soit gérée automatiquement ou manuellement.La taille de mémoire cache par défaut pour chaque nettoyage est de 5m, si vous voulez modifier la valeur par défaut pour chaque nettoyage de mémoire cache, par modification

Les propriétés bminiadpter.minclearsize sont suffisantes.

Si vous voulez supprimer un fichier cache spécifié ou tous les fichiers cache, vous pouvez utiliser la méthode remove ou removeall.


```javascript

/**
* 删除指定缓存文件
* @param fileUrl文件路径(绝对地址)
* @param callBack 删除回调函数
*/
public static function remove(fileUrl:String,callBack:Handler):void {}
```



```javascript

/**
* 清空缓存空间全部文件内容 
*/  
public static function removeAll():void{}
```




Si vous avez des questions sur ce document, adressez - vous à la communauté Internet pour lui poser des questions et envoyer des liens dans la communauté à l 'administrateur

Site Web communautaire: < https: / / ask.layabox.com >



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)