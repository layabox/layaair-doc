#Polices intégrées

##Présentation des polices

En raison de la grande variété d 'équipements ANDRIOD et du manque d' uniformité des fichiers de police Android, les chemins de la police chinoise par défaut varient d 'un système à l' autre (avec des adaptations personnalisées par de nombreux fabricants dans le pays), la lecture du font.ttf pose un problème.

La stratégie de layaplayer consiste à utiliser la police par défaut du système en fonction du numéro de version Android du système et à lire directement la police locale lors de la deuxième entrée si le chargement n 'est pas effectué avec succès.

Dans une version ultérieure layaplayer - 0.9.5, l 'développeur peut emballer les polices par défaut dans l' app au moment de l 'emballage de l' APP, évitant d 'utiliser, pour la première fois, des polices ttttf nécessitant le téléchargement de 4 MB sur le Réseau pour influencer l' expérience de l 'utilisateur.

##Comment intégrer la police

Construire le projet Android, trouver le répertoire des Assets, créer un autre répertoire font et changer le nom du fichier de police à insérer en "layabox.ttf".Comme le montre la figure 1:

![图1](img/1.jpg)

Seules les versions postérieures à layaplayer - 0.9.5 sont prises en compte.

Layaplayer - 0.9.5 dans les versions suivantes, l 'ingénierie des modèles est incorporée par défaut à la police TTF, ce qui entraîne une augmentation du volume de l' APK et, si vous vous souciez davantage de la taille de l 'APK, vous pouvez supprimer le fichier de police assets / font / layabox.ttf.

##3.ios incorporation dans la police

Les versions suivantes de layaplayer - 0.9.7 prennent en compte l 'incorporation de l' iOS dans la police par défaut en créant, avec Android, un répertoire font sous ressource, et en rebaptisant la police à insérer sous le nom de layabox.ttf, comme indiqué dans la figure 2 ci - dessous:


![图2](img/2.png)




