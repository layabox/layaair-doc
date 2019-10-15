#Créer un environnement de développement (compilateur de code ts)

]*Autohor: Charley - version: 2.0.1 Update: 2019 - 4 - 8*

Etant donné que layaairide a besoin d 'un environnement de compilation Typescript, ce livre est utilisé pour l' installation de l 'environnement de compilation, lorsque l' environnement de compilation est en difficulté, lire les références, si l 'installation a déjà été installée, il n' est pas nécessaire de répéter l 'installation.

##Télécharger l 'environnement Node

####1.1 vérifier si l'environnement node.js a été installé

L 'utilisation du système de mise au point nécessite un environnement node.js, mais s' il n' est pas installé, téléchargez - le officiellement (version recommandée Lts).

Avant l 'installation, si l' on ne sait pas s' il existe un environnement existant, on peut vérifier si l 'environnement Node a été installé, ouvrir l' outil de ligne de commande (Windows est CMD), saisir l 'instruction`npm -h` 


```

npm -h
```


Lorsque vous appuyez sur le bouton de retour et que vous voyez des informations telles que les instructions du NPM, les numéros de version et les itinéraires d 'installation, comme le montre la figure 1 - 1 (informations similaires), cela signifie que l' installation a été installée et que, si cela n 'affecte pas l' utilisation, les étapes de téléchargement et d 'installation de l' environnement Node peuvent être franchies.

![图1-1](img/1-1.png) 


(Figure 1 - 1)



####1.2 téléchargement en ligne officiel de node.js

Si aucun environnement d 'installation n' est disponible et que l 'installation est téléchargée directement à Node, la version Lts recommandée est l' adresse URL indiquée dans la figure 1 - 2:[https://nodejs.org/en/](https://nodejs.org/en/)

![图1-2](img/1-2.png)(Figure 1 - 2) La figure ci - dessus n'est utilisée que comme référence et il suffit d'ouvrir le lien pour télécharger directement la version Lts.

> attention: les liens par défaut sont ouverts sur window (x64), les ordinateurs à 64 bits peuvent cliquer sur Other downloads et télécharger la version correspondante.

####1.3 installation node.js

Trouvez le paquet de montage node.js qui vient d 'être téléchargé et installez l' interface horaire complète comme le montre la figure 1 - 3.

![图1-3](img/1-3.png)< br / > (figures 1 à 3)

Après l 'installation, vous pouvez saisir sous la ligne de commande comme indiqué à la Sous - section 1.1`npm -h`Vérifiez l 'installation.



##Installation d 'un environnement Typescript par commande NPM

Quand l'environnement de Node sera dégagé, on pourra utiliser le NPM pour installer l'environnement de Typescript.

####2.1 téléchargement

Saisissez les instructions directement dans l 'outil de ligne de commande. "`npm install -g typescript`"Appuyez sur le bouton retour, comme le montre la figure 2 - 1, pour commencer le téléchargement et l 'installation dans l' environnement de type script, il est important de maintenir le réseau en bon état.


```typescript

npm install -g typescript
```


![图2-1](img/2-1.png) <br/>

(Figure 2 - 1)

Les conflits de mémoire tampon sont généralement le résultat d'un conflit entre les concepteurs qui se trouvent dans la figure 2 - 2 au moment de l'installation.(cette étape n 'a pas été franchie directement.

![图2-2](img/2-2.png)

(Figure 2 - 2)

Vous pouvez alors utiliser une commande de nettoyage de mémoire tampon`npm cache clean --force`, le véhicule de retour exécute la commande et saisit à nouveau l 'instruction de montage.


```

npm cache clean --force
```




####2.2 installation achevée

Lorsque nous voyons le numéro de version -typescrip @ version, nous pouvons confirmer que l 'installation de l' environnement de type script est achevée, comme le montre la figure 3 - 1, et que l 'outil de ligne de commande de fermeture est prêt.

![图3-1](img/3-1.png)
(Figure 3 - 1)

Le catalogue TSC de la figure 4 est le catalogue de l 'installation de notre environnement de compilation de type type type, grâce auquel ce compiler peut compiler Typescript en javascript.

####2.3 vérification de la version environnement de Typescript

Saisissez la commande TSC - V dans la ligne de commande pour afficher la version compilée actuellement par type script, comme le montre la figure 3 - 2.


```typescript

tsc -v
```


![图3-2](img/3-2.png)  


(Figure 3 - 2)

Si le numéro de publication est affiché, le succès de l 'installation de type type script - Compiler (TSC) peut également être illustré.

> le numéro de la version réelle de la carte est le dernier.