# 引擎常见问题Frequently Asked Questions



###La différence entre les quatre modes de publication des moteurs


 **Mode intégré**Le mode intégré génère un fichier de code de classe de scène dans lequel le contenu ui de l 'éditeur contient des informations sur la scène ui créée par l' IDE, sans tenir compte de la taille de JS, du développement normal des options les plus courantes H5 et de la vitesse d 'ouverture la plus rapide sans que Cela implique le chargement asynchrone des pages.

**Mode de chargement**Le mode de chargement génère également une catégorie de scènes, les autres données ui sont placées dans un ui.json et doivent être utilisées avec ce json.L 'utilisation peut être chargée en tant que ressource.

**Mode de séparation**Le mode de séparation génère également une catégorie de scènes sur la base d 'un mode de chargement, mais il crée un fichier de données de scènes séparé pour chaque scène, à la différence du mode de chargement qui charge toutes les scènes une fois.Après 2.0, la mise au point de petits jeux ou de jeux légers est un mode courant pour réduire la taille du paquet principal et pour augmenter la vitesse de chargement.

**Mode fichier**Le mode fichier est unique en 2.0, il n 'est pas créé de catégorie de scène pour développer un petit jeu, c' est - à - dire pour réduire encore la taille du paquet JS, il est utilisé avec le chargement de scene.load.Dans les trois premières catégories de scènes, les variables sont déclarées, et le Code indique que les variables internes peuvent être manipulées directement.



####Script et utilisation de Runtime

Si le développeur ne connaît pas ces deux concepts, il peut se référer à des documents Runtime et script, puis créer un exemple de projet de moteur avec son propre projet, et découvrir que l 'insertion d' un script Runtime dans le scénario permet de faire fonctionner directement le contenu de ce script, ce qui est très pratique, c 'est une manière unique de distinguer les composants de script supplémentaires du moteur principal de layair, qui est préférée à 1.Les concepteurs de modèles de développement peuvent recourir davantage à cette méthode.

Le développement de script consiste à utiliser le script comme un composant d 'un objet, ce qui permet d' écrire la logique de développement dans ces procédés, et un grand nombre d 'opérations nécessitant le programme principal sont prises en charge par le moteur.



####Code user Prediction


```

下面采用伪代码：
先声明一个预设变量
{Laya.loader.create("prefab/预设名字.json",Handler.create(this,onComplete));
}
private function onComplete(obj:Object):Void{
  一个预设变量.json = ojb
  一个sprite = Pool.getItemByCreateFun("自己起一个名字", this.一个预设变量.create, this.一个预设变量);
}
```


