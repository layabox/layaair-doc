#Polices intégrées

##Présentation des polices

En raison de la grande variété d 'équipements ANDRIOD et du manque d' uniformité des fichiers de police Android, les chemins de la police chinoise par défaut varient d 'un système à l' autre (avec des adaptations personnalisées par de nombreux fabricants dans le pays), la lecture du font.ttf pose un problème.

La stratégie de layanative consiste à utiliser la police par défaut du système en fonction du numéro de version Android du système et à télécharger une police depuis le site Web de layabox pour la stocker localement, et à lire directement la police locale lors de la deuxième entrée.

L 'développeur peut emballer la police par défaut dans l' app au moment de l 'emballage de l' APP, évitant d 'utiliser pour la première fois des polices ttttf nécessitant le téléchargement de 4 MB sur le réseau, ce qui affecte l' expérience de l 'utilisateur dans certains dispositifs spéciaux.

##Comment intégrer la police

Construire le projet Android, trouver le répertoire des Assets et créer un répertoire font dans lequel les fichiers de police à insérer sont rebaptisés layabox.ttf.Comme le montre la figure 1:

![图1](img/1.jpg)


**Tips:** 

L 'ingénierie des modèles est par défaut incorporée à la police TTF, ce qui entraîne une augmentation du volume de l' APK, et si vous vous souciez davantage de la taille de l 'APK, vous pouvez supprimer le fichier de police assets / font / layabox.ttf.

##3.ios incorporation dans la police

Layanative supporte l 'insertion de caractères par défaut dans l' iOS en créant, avec Android, un répertoire font sous ressource et en rebaptisant les polices à insérer sous le nom de layabox.ttf, comme indiqué dans la figure 2 ci - dessous:

![图2](img/2.png)