# 百度小游戏的5M本地包与动态资源加载

> Author: Charley

Habituellement, lorsque nous mettons au point des projets, nous utilisons directement des voies locales, comme celles citées dans l'exemple.


```json

Laya.Texture2D.load("res/layabox.png");
```


Si le catalogue du projet ne dépasse pas 5 m, il n 'y a pas de problème à écrire tant que les ressources locales sont disponibles.

Mais...

Le paquet local de Baidu contient une limite de 5m, et une fois que cette limite est dépassée, il n 'est pas autorisé à télécharger et ne permet pas de prévisualiser la machine.

Notre**Et si le projet est supérieur à 5m?**

Un mode de réalisation consiste à sous - traiter, à partir de la version 2.0 de la petite base de jeux, et à configurer les sous - traitants pour atteindre 10 M.En ce qui concerne la Sous - traitance, une description détaillée sera fournie dans un document distinct.Il y a une autre solution.

Un autre mode de réalisation est le téléchargement dynamique du réseau.

Nous sommes dans un paquet local, le Code JS doit être mis à l 'intérieur, car JS ne permet pas la création dynamique du chargement du réseau.Par conséquent, si le paquet local contient plus de 5m, la première considération est de savoir comment optimiser le volume de JS, par exemple en mélangeant la compression et en séparant le Code UI.Si ce n'est pas le cas, c'est uniquement par le biais d'un petit jeu de sous - traitance.Si JS ne dépasse pas 5m, des ressources de base supplémentaires peuvent être mises à disposition, le cas échéant, pour le préchargement.

En résumé, pour la plupart des petits jeux, le chargement dynamique du réseau est la méthode à utiliser.

Alors...**Et le trajet de chargement dynamique du réseau?**".Local`load()`Méthode suivie`URL.basePath`Méthode

Par exemple:


```java

material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
box.meshRender.material = material;
Laya.URL.basePath = "https://XXXX.com";//请把XXXX换成自己的真实网址；
//在此之下，再使用load加载资源，都会自动加入URL网址。从网络上动态加载。
```


Utiliser`URL.basePath`Une fois la méthode utilisée, les trajets locaux sont automatiquement ajoutés à l 'url.basepath.On obtient ainsi une combinaison de chargement local et de chargement de réseau.

**C'est fini?Non!**

D'après ce qui vient d'être écrit,`res/layabox.png`Vous avez déjà téléchargé le Répertoire local des jeux vidéo, mais si vous l 'utilisez`URL.basePath`Après`res/layabox.png`L 'utilisation n' est pas chargée à partir de l 'local, mais à partir du réseau.Ce n 'est pas ce que nous voulons.

Les moteurs sont utilisés.`URL.basePath`Comment utiliser le chargement local**Traitement de catalogues et de documents spéciaux**Local Packaging List MechanismComme indiqué ci - après:


```json

BMiniAdpter.nativefiles =  [
    "wxlocal",
    "res/atlas/houzi.atlas",
    "res/atlas/houzi.png",
    "common/tishi.png",
    "common/bg.png",
    "ui.json",
    "newLb/bg031.png"
];
```


**Si c 'est le nom de répertoire ou le fichier existant dans bminiadpter.nativefiles, le moteur le considère automatiquement comme un répertoire local.**, même si l 'url.basepath est utilisé, aucun nom de Table des matières ou fichier figurant sur la liste blanche des nativefiles ne peut être téléchargé dynamiquement depuis le réseau, mais seulement depuis le local.



Si vous avez des questions sur ce document, adressez - vous à la communauté Internet pour lui poser des questions et envoyer des liens dans la communauté à l 'administrateur

Site Web communautaire: < https: / / ask.layabox.com >



##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../wechatPay.jpg)