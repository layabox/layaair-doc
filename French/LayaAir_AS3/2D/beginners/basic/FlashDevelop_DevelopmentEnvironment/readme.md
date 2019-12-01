#Flashdevelop Develop Environmental configuration

###Première étape: layaair Engineering

####Moteur téléchargement

En utilisant le développement de layaairide, le téléchargement de layaairide apportera son propre paquet moteur.Si le developpeur utilise des outils tiers, il faut d 'abord télécharger le moteur.Sur la page d 'accueil du site officiel ou dans le menu central de l' développeur, avec l 'entrée des liens téléchargés par le moteur, l' ouverture des liens et les différentes versions de la liste de téléchargement du moteur.[http://new.ldc.layabox.com/download/?type=layaair-LayaAir](http://new.ldc.layabox.com/download/?type=layaair-LayaAir)).

####1.2 Description de la structure du catalogue des paquets de moteur

Comme cet article présente l 'environnement de développement flashdevelop, nous Téléchargeons la version AS3 du moteur.Après téléchargement et décompression, on peut voir la structure de catalogue de la version AS3 comme le montre le diagramme suivant:

​![图片1.jpg](img/1.png)< br / >
Figure 1

- le catalogue « layaairflash » contient le Code de la Bibliothèque des moteurs dont la version flash a besoin.

- Catalogue des codes des moteurs « libs », dans le Sous - Catalogue SRC de ce catalogue.

- « laya.js.exe » est un compilateur de code AS3 dans le système Windows pour la traduction du Code AS3 en Code JS.

- layajsmac est un compilateur de code AS3 dans le système Mac Apple, utilisé pour compiler le Code AS3 en un code JS.

- "playerglobal.swc" est utilisé pour remplacer le rédacteur original AS3 SDK, supprimer les conseils de grammaire API originaux et ajouter les conseils API du moteur.

​



###Deuxième étape installation d 'un navigateur Google Chrome

Lorsqu 'une compilation de codes AS3 est effectuée, le navigateur Chrome est appelé par défaut pour ouvrir le projet d' exécution et doit être installé pour effectuer la mise en page du projet.Cette étape peut être franchie si l 'installation est installée.



 



###Phase 3 configuration de l 'environnement de compilation AS3 dans flashdevelop

​**Mesure 1**: Ouvrez flashdevelop, trouvez la macro dans la barre de menu et ouvrez le panneau de macro éditeur.

​![blob.png](img/2.png)< br / >
Figure 2

​**Mesure 2**: cliquez d 'abord sur ajout d' une macro, puis sélectionnez la macro additionnelle qui vient d 'être ajoutée, modifiez le menu de la macro dans la colonne "label" sous le nom de "Laya compiler" et installez une touche rapide macro dans la colonne "Shortcut" sous le nom de "Alt + F5" (les raccourcis claviers ne sont conçus que pour servir de référence et ne sont pas en conflit avec d' autres raccourcis claviers).

​![blob.png](img/3.png)< br / >
Figure 3

​**Mesure 3**: cliquez sur la zone d 'exploitation «... » à la position droite de la barre entries et ouvrez la fenêtre Éditeur d' ensemble de chaînes de caractères.

​![blob.png](img/4.png)< br / >
Figure 4

​**Mesure 4**: Saisissez une macro - instruction dans le panneau d 'éditeur d' ensemble de chaînes de caractères:


```

SaveAllModified
RunProcessCaptured|D:\LayaBox\LayaAirAs3_1.5.5\as\laya.js.exe;"$(ProjectPath)";iflash=false;
```


​![blob.png](img/5.png)< br / >
Figure 5

* * Tips: D: < layabox > layaairas3 \ \ u 1.5 >******
****



​**Mesure 5**: cliquez sur le bouton & ‧‧; désactiver & ‧‧; et cliquez directement sur le bouton & ‧‧; désactiver & ‧‧****
****

  



**La configuration du compilateur AS3 dans l 'environnement flashdevelop est ainsi terminée.Bienvenue dans les autres chapitres.* *

