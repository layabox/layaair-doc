#Outil layadcc

##Présentation
Layadcc: Laya - Dynamic content check, solution de mise à jour thermique fournie par layaplayer.L 'avantage est que la mise à jour des différences d' exécution permet de réduire efficacement le trafic de réseau.Ses données principales sont les fichiers DCC qui décrivent les valeurs de vérification de tous les fichiers du projet.Le fichier CC est produit par l 'outil layadcc.

Layadcc parcourt tous les fichiers de projet et génère un fichier binaire filetable.bin contenant toutes les valeurs de vérification des fichiers.Layaplayer obtient ce fichier (le cas échéant) du serveur au moment du démarrage pour déterminer quels fichiers doivent être mis à jour.

Le layadcc peut également être utilisé pour emballer les ressources dans l 'app.

##Type de paquet layaplayer
Il existe actuellement trois types de programmes de sous - traitance.

1. ####App Package:

App lui - même ne dispose d'aucune ressource et a un volume minimum.
Lors de la première opération de layaplayer, toutes les ressources disponibles sont téléchargées à partir du serveur et stockées en cache sur place.Lors de la deuxième exécution et au - delà, les fichiers DCC sont d 'abord obtenus à partir du serveur, puis, lorsque le téléchargement d' un document est nécessaire, on vérifie si les ressources locales doivent être mises à jour, les ressources non mises à jour ne sont téléchargées que lorsqu 'elles doivent être mises à jour et les ressources non mises à jour sont lues directement à partir de la mémoire cache locale.
Local cache

Deux.####Ressources disponibles

Le paquet app lui - même contient une partie ou la totalité des ressources de jeu, et il est plus grand.
Les données sont toujours mises à jour, c 'est - à - dire que chaque opération continue d' être vérifiée à partir du fichier DCC du serveur, que si un fichier dans le sac est déjà vieux, un nouveau fichier est téléchargé, stocké dans le cache, et que les fichiers mis en mémoire cache sont toujours utilisés pour les opérations ultérieures, tant que le fichier cache n 'a pas été modifié.
Après plusieurs mises à jour, la plupart des fichiers app ne sont peut - être plus valables, chaque fois qu 'il s' agit d' une mémoire cache locale, et il est donc recommandé de les remettre à jour et de les emballer avec de nouvelles ressources.

Trois.####App out package (Single machine package):

Toutes les ressources sont directement conditionnées dans l 'APP, sans qu' il soit nécessaire de télécharger le réseau, ni même de le relier.Max.
Comme il n 'y a pas d' URL, il n 'est pas possible de procéder à une mise à jour dynamique des ressources, mais seulement de mettre à jour l' app si l 'on veut mettre à jour les ressources.

##Installation et utilisation de layadcc
Layadcc est basé sur node.js et a donc besoin de node.js.
###Installation node.js
A nodejs.[官网](https://nodejs.org/en/)Télécharger
Node.js ne doit pas être trop âgé pour supporter la version 0.xx, peut consulter la version Node sur ordre
Par exemple:

```bash

$ node -v
v4.2.0
```

C 'est la version.
###Installation de layadcc

```bash

npm install -g layadcc
```

Si l 'installation s' effectue avec succès, le layadcc peut être exécuté directement dans la ligne de commande.

###Méthodes d'utilisation


```

layadcc 资源目录 [options]
options:
    -cache 生成资源包.
    -lwr 文件路径全部转为小写。（一般不需要）
    -url url 如果要打包资源的话，对应的url.
    -cout outpath 打包资源的输出目录，如果不设置的话，就是在资源目录下。
例如:
   layadcc d:/game/wow -cache -url www.game.com
```

###Opérations opérationnelles
####4.1 environnement opérationnel
Assurez - vous de l'installation correcte.
Méthode de vérification:
[IMG / 2.ping]
Figure 1
Tant que layadcc n'a pas été mal signalé.

####4.2 HTML5 environnement du projet
En supposant qu'il y ait un jeu, placé sous F: / work / test / bestgame / catalogue (page de démarrage index.html sous ce catalogue), son catalogue est structuré comme suit:
[IMG / 3.ping]
Figure 2
L 'adresse URL après la publication du projet est la suivante:`http://www.layabox.com/bestgame/index.html`  
(si l'adresse URL n'est pas nécessaire pour une version unique)

####4.3 Ressources de conditionnement
Le projet HTML 5 doit maintenant être emballé et placé dans le projet app.

```

 layadcc F:/work/test/bestgame -cache -url http://www.layabox.com/bestgame/index.html
```

Dans le cas d 'un paquet unique, saisissez:

```

 layadcc F:/work/test/bestgame -cache -url http://stand.alone.version/index.html
```


Les figures suivantes:
[IMG / 2 GIF]
Figure 3

Oui.`-cache`Après les paramètres, tous les fichiers de ressources sont parcourus et exportés`-cout`Sous la table des matières spécifiée, si ce n 'est pas le cas`-cout`Paramètre, crée un répertoire layadccout sous le Répertoire de travail (voir la figure ci - dessus) et le répertoire case sous le Répertoire de sortie est la ressource à utiliser pour emballer l 'app.
Ce répertoire est ensuite copié dans le répertoire correspondant à l 'article construit, ce qui permet de compiler et de compiler les paquets pour générer l' app.
Dans différents environnements de développement, il est nécessaire de les placer dans différents catalogues (ce qui peut être fait automatiquement si l 'outil de ligne de commande layaairide ou layabox est utilisé).

**Android Eclipse:**  
![1](img/1.jpg)< br / >
Figure 4 Ressources d 'Android

**Android Studio:**  
[IMG / 5.ping]
(Figure 5)

**IOS xcode:**  
![2](img/2.jpg)< br / >
Figure 6.

####4.4 mise à jour des serveurs
C'est l'opération la plus courante depuis la publication de l'app.Chaque fois que le contenu du projet HTML 5 est mis à jour et doit être soumis au serveur ou à un test local, un nouveau DCC est généré pour permettre au client de mettre à jour les ressources les plus récentes.Le schéma de fonctionnement est le suivant:
[IMG / 1.gif]
Figure 7

Après l 'exécution de layadcc, un répertoire Update est généré sous le répertoire spécifié (maintenant le chemin actif).Ce répertoire Update est ensuite copié dans le même répertoire que le serveur local ou distant.
**Tips:**   
Pour faciliter et éviter les erreurs, il est proposé d 'exécuter le layadcc directement dans le Répertoire du serveur.

**Catalogue update**   
[IMG / 4.ping]
Figure 8

Trajet relatif de tous les fichiers de ressources
Code d 'étalonnage pour l' ensemble des paquets de ressources pour les statistiques de DCC.
File.bin - DCC principal file, it is the Verification Value of each file.
Les fichiers DCC dans le format de texte filetable.txt, à l 'exception des trois premières lignes, représentent un fichier et une valeur de vérification correspondante correspondant exactement à allfiles.txt, c' est - à - dire que le fichier correspondant à la quatrième ligne est la première ligne de allfiles.txt.
Le fichier filetable1.txt n 'est plus utilisé.

**Attention:**  
Si le Répertoire sur le serveur Web ne contient pas de répertoire update ou si le répertoire Update ne contient pas de contenu, le mécanisme de mise à jour DCC du client est désactivé et toutes les ressources sont téléchargées à nouveau à chaque fois.Cette approche est recommandée pendant la phase de développement.
Dans le catalogue actuel, par exemple, d'autres itinéraires peuvent également être désignés, par opposition ou absolument, par exemple:
   `layadcc d:/game/bin/h5`Ou`layadcc ../bin/h5`


####4.5 essais
Mise à l'essai réussie de l'emballage des ressources
Dans un premier temps, si le sac n'est pas doté de ressources, toutes les ressources seront téléchargées en ligne, comme suit:
[IMG / 7.ping]
La figure 9 montre beaucoup de download.
   **Imprime la note d'information:**  
L 'adresse suivante: < 127.0.0.1 >S = 0 signifie que le fichier n 'a pas d' informations DCC et l = xxx indique la longueur du fichier tél échargé.

Si vous cochez un paquet de ressources, c 'est - à - dire si vous copiez quelque chose sous le catalogue case dans le répertoire spécifié ci - dessus, le changement le plus flagrant est que le paquet devient plus grand.Pour exécuter l 'APP, il y a une impression permettant de lire les ressources à partir du paquet de ressources, comme suit:
[IMG / 8.ping]
Figure 10
   **打印信息说明**  
Imprimer`found the file in the package:`Les ressources correspondantes sont obtenues à partir de paquets et ne sont pas téléchargées sur le Web.Si une version mono - ordinateur est imprimée, toutes les ressources devraient avoir cette impression et ne pas être téléchargées.

Les services sont soumis à des tests de DCC:
Ouvrir l'adresse dans un navigateur: http: / / www.layabox.com / bestgame / update / filetable.txt
Notez que vous souhaitez changer d 'adresse, si le fichier existe, pour indiquer que vous avez appelé DCC.Les figures suivantes:
[IMG / 6.ping]
Figure 11

Mise à jour du mécanisme
Le test visuel est une mise à jour des ressources et l 'app produit des modifications correspondantes, telles que des images modifiées, qui peuvent être vues sur l' app.Tout ce qui n 'a pas changé, c' est l 'impression.`found the file in the package:`Et tout ce qui a changé, c'est l'impression.`download [ ] xxxurl `".
   **Attention!**  
1 Download n 'exécute qu' une fois et entre dans l 'app une deuxième fois, et cette ressource, si elle n' est pas modifiée, est directement extraite de la mémoire cache.
2 le mécanisme du CCD est une mise à jour en cours d'exécution, de sorte que toutes les mises à jour ne seront téléchargées qu'au moment de leur mise en œuvre et non dès leur démarrage.


**Résumé**  
* Si oui.`download [ ] url `Il n 'y a pas de DCC ou de mise à jour des ressources
* Si oui.`found the file in the package:`, indique que les ressources ont été emballées avec succès et que le DCC a fonctionné.


**Attention:**  
* Les délais de modification de tous les documents sont modifiés lors de l 'exécution de layadcc afin d' empêcher que le CDN ne pense que les documents n 'ont pas été modifiés au moment de la source.
* l'adresse ci - dessus est fictive et il n'existe pas d'adresse à l'adresse http: / / www.layabox.com / bestgame / index.html.


##Questions courantes
Après avoir emballé les ressources, on ne se sent pas plus rapide et on se demande si toutes les ressources sont toujours téléchargées.
Pour déterminer si tout est effectivement téléchargé, voir si le journal contient les fichiers Download et find mentionnés ci - dessus et, dans l'affirmative, s'il existe une mémoire cache et un téléchargement, il n'y a pas de problème, mais le téléchargement est vraiment lent.
Si tout est download, pas de tampon de lecture
N'oubliez pas de vérifier si le serveur dispose d'informations DCC au moyen d'un navigateur.
Vérification de l'exactitude de l'acheminement des ressources.

Après la publication de l'app, une partie des ressources a été modifiée mais n'a pas été mise à jour par l'app.
Avez - vous oublié d 'appeler le DCC?
2. Le DCC a été appelé, mais oublié de l 'être sur le serveur (suggestion d' appeler le DCC sur le serveur)?
Le DCC a été appelé et présenté au serveur, mais n 'a pas encore été distribué au noeud où vous êtes installé en raison du CDN.

Je confirme que le processus DCC a bien fonctionné, mais qu'une ressource donnée est téléchargée à chaque fois sans mémoire cache.
Vérifier si cette ressource est incluse dans la liste DCC et peut être recherchée dans le document update / allfiles.txt.
Dans l'affirmative.Confirme que l 'URL qui sollicite cette ressource possède une partie search, c' est - à - dire XXX, si elle est ajoutée, il n 'est pas possible d' accéder au processus DCC.
S'il n'y a pas de recherche, il se peut que le contenu réel de ce document ne corresponde pas à la valeur d'étalonnage et que le DCC puisse penser qu'il s'agit d'un document erroné et qu'il ne soit pas retardé.Raisons possibles
Après avoir achevé le DCC, le contenu de ce document a été modifié, de sorte que la valeur de contrôle du DCC ne correspond pas au contenu réel du document.Redémarrer le DCC
Le contenu du document n'a pas été modifié, mais le DCC a été lancé par le client et, après avoir été téléchargé sur le serveur, il a été modifié par le logiciel téléchargé.Cela se produit généralement sur des fichiers texte, par exemple lorsque des outils de gestion de versions et des outils FTP transforment les véhicules de retour sous Windows en véhicules de retour UNIX.Solution: envoyer le fichier sous forme de zip ou taper DCC sur le serveur.
Il n'y a pas de problème ci - dessus et ce sont des images erronées.Cela peut s' expliquer par le fait que certains systèmes interceptent la demande http: / / www.La valeur de vérification de cette image comprimée doit être différente de celle enregistrée par le DCC.Solution: Désactiver la fonction d 'économie de débit.
Si aucune économie n'est réalisée.Cependant, si l 'on utilise l' ADN, il peut aussi y avoir un problème d 'ADN, par exemple lorsque le fichier DCC est actualisé, mais que le document de ressources correspondant n' est pas mis à jour.Méthode d 'authentification: téléchargement des fichiers de ressources sur ce noeud par ordre Curl (la méthode est présentée dans l' appendice), comparée aux fichiers de ressources de la station source, la confirmation est confirmée si elle est différente.Solution: forcer la mise à jour des noeuds CDN ou chercher le service client CDN.

Au cours de la phase de mise au point, chaque mise à jour est trop lourde.
Si c'est déjà fait,
Supprime le répertoire Update et réinitialise l 'app pour supprimer la mémoire cache interne, de sorte que le mécanisme DCC soit désactivé et que chaque demande de fichier soit téléchargée à nouveau.
Si vous cliquez une fois de plus sur le DCC pour créer un répertoire Update à l 'extrémité du serveur, la mémoire cache fonctionne à nouveau, et si vous voulez l' éteindre, recommencez l 'opération ci - dessus.

Pour réduire le volume des colis, il faut espérer qu'une partie seulement des ressources sera emballée.
Qu 'il s' agisse d' une installation initiale ou d 'une mise à jour ultérieure de l' APP, il faut s' assurer que les informations CC contenues dans la ressource sont générées sur la base de données complètes, si une partie seulement de la ressource est utilisée.Par exemple, sur un total de 100 ressources, 50 seulement sont nécessaires pour emballer les données DCC (principalement les fichiers filetable.txt) dans un état de ressources complet, pour conserver les informations DCC générées, puis pour supprimer 50 ressources pour générer le fichier Case avec layadcc, lorsque les informations DCC générées sous le catalogue case ne sont pas complètes et doivent donc être couvertes par le fichier précédent.
Si l 'utilisation d' un DCC incomplet provoque un problème: lors de la mise à jour de l 'APP, Native privilégie l' utilisation du fichier CC mis en mémoire cache dans l 'APP, ce qui entraîne la perte d' informations de mémoire cache partielle, de sorte que les fichiers qui ne sont pas dans Le fichier.txt sont considérés comme n 'ayant pas besoin d' être mis en cache et téléchargés jusqu 'à la prochaine mise à jour CC du serveur.

##Appendice
Processus de layadcc
[IMG / 1.ping]
Figure 12
Le code correspondant est dans l 'index.js.

Téléchargement de documents sur un noeud CDN.

```sh

curl -H "Host:www.layabox.com" http://182.110.238.110/bestgame/index.html >a.html
```

Sur le noeud 182.110.238.110`http://www.layabox.com/bestgame/index.html`Ce fichier est téléchargé et enregistré dans A.html.
Le contenu suivant devient son propre nom de domaine.`http://`Comment obtenir l 'adresse du serveur noeud?Dans le layaplayer, le serveur de noeud ne change généralement pas, de sorte que l 'adresse peut être obtenue par n' importe quelle impression download, par exemple:

```

Downloaded http://www.layabox.com/bestgame/bestgame.min.js@182.110.238.110 s=44216b56 l=422
```

On sait que l 'adresse du noeud est 182.110.238.110.