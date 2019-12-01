#Voir l'occupation des principaux objets dans l'environnement de layaplayer.

Afin de faciliter la mise en service de la mémoire par l 'développeur, dans les versions postérieures à layaplayer - 0.9.6, les informations relatives à l' occupation des objets de script courants dans la mémoire, y compris les informations suivantes: image, xmlhtprequest, sprite2d, Graphics, context2d, particlettemplate2d, xmlnode, etc.

###Comment l 'ouvrir

Les fonctions suivantes peuvent être utilisées dans config.js:


```javascript

conch.config.enableMemorySurvey(true);
```


Emplacement du cofig.js:
".`Android: 工程目录下的assets/scripts/config.js  ``<br>``IOS:工程目录下的resources/scripts/config.js`".

**Attention: il faut éteindre lors de la publication officielle, car cela consomme les performances.**

###Comment

L 'occupation actuelle peut être imprimée par les fonctions suivantes:


```javascript

conch.config.printAllMemorySurvey("");//参数为log写入的位置，如果写的是""，默认会写入cache目录下
```


Lorsque cette fonction est activée, les memorystatis.txt sont générés sous le catalogue appcache, et les log sont imprimés sous la fenêtre log, et les diagrammes log sont imprimés comme suit:

[IMG / 0.jpg]

Le log de l 'exemple montre que le nombre sprite2d est de deux et le nombre grphics d' un.
La dernière ligne est un message de mémoire.
Reserve = texture = Manager - size = 12800mb, / / size prédéfini
Reserve = Atlas = size = 80.00mb, / / size de l 'ensemble de majuscules internes
Sound = size = 006mb, / / WAV occupe size
Image = no release = yet = 0 / / image non nettoyée (non disponible en mémoire)

Gestion de texture spécifique et Relation image[显存管理](https://ldc.layabox.com/doc/?nav=ch-as-5-2-1)

**Tips: afficher le Size et le countsize dans le log sont des estimations inexactes, principalement en fonction du nombre d'objets.**

###Utilisation effective

Application pratique dans le projet, vous pouvez faire un bouton dans le coin du projet pour exécuter la fonction printlmemorysurvey à chaque clic.
Par exemple, cliquez sur la page d 'accueil pour enregistrer les informations pertinentes.
Après avoir pénétré dans la ville principale, cliquez pour enregistrer les informations pertinentes.
Cliquez ici après l 'entrée de la copie pour enregistrer les informations pertinentes.
Après avoir regagné la ville principale, cliquez pour enregistrer les informations.

Il est ainsi possible de comparer les noeuds qui n 'ont pas été supprimés après l' entrée et la sortie de la copie.

