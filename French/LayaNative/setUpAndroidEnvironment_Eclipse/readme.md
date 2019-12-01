#Eclipse construire un environnement Android



##Installation JDK

###JDK

Ouvrir un site[http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), vous verrez la page téléchargée « java se », comme la figure 1 - 1, en cliquant sur la version Windows x86.

![图1-1](img/1.jpg)

**Figure 1 - 1 java se**



###Installation JDK

Double - cliquez sur JDK - 8u121 - Windows - i586.exe pour obtenir l 'interface graphique 1 - 2.

![img](img/2.png)

**Figure 1 - 2 Java SDK Setting interface**



Cliquez sur & ‧‧; étape suivante & ‧‧; pour modifier et confirmer le chemin de l 'installation (D: & ‧‧;: Java & ‧‧; jdk1.6 \ \ 21 \ \ s, veuillez ajouter Java & ‧‧;.

![img](img/3.png)

**Figure 1 - 3 interface de montage de dossier cible Java**



Cliquez sur la prochaine étape après modifier le chemin, puis "terminé".

###Paramètres des variables environnementales

XP: mon ordinateur - > propriété de touche droite - > variable environnementale >

**Définit les trois attributs suivants et leurs valeurs:**

`java_home：D:\Program Files\Java\jdk1.6.0_21`

Indique le chemin d 'installation de JDK dans lequel vous devez pouvoir trouver Bin, Lib, etc.Le chemin d 'installation de JDK peut sélectionner n' importe quel répertoire de disques, mais il est recommandé que le répertoire soit peu profond.

`path：%java_home%\bin;%java_home%\jre\bin`

Un répertoire Bin pointé sur JDK, dans lequel sont stockées des commandes d 'exécution compilées de sorte que le système puisse identifier des commandes Java dans n' importe quel trajet et qu 'il n' y ait pas besoin d 'entrer dans une grande série de trajets lors de l' opération de compilation de console, faute de Quoi, chaque fois qu 'un programme Java est exécuté par la suite, son fichier class est déplacé sous le catalogue% Java u Home \\ \ bin, puis ouvre le chemin dos vers le bas et exécuteClass file

Comme il y a deux machines virtuelles sous JDK (JRE et JRE sous JDK) après l 'installation de JDK, il est nécessaire d' inclure des dossiers Bin sous deux machines virtuelles.

Si les mots "jdk1.6.00 \ \ u 21 \" n 'étaient pas ajoutés dans le path, ce qui apparaît dans les figures 1 à 4:

![img](img/4.png)

**Figure 1 - 4 question javac**

`classpath：.;%java_home%\lib\dt.jar;`

"Indique que le fichier class du répertoire actuel est recherché en premier lieu lors de l 'opération de compilation et que le document class.jar fonctionne comme une banque de données environnementales fournissant un support d' affichage de la configuration Java Swing, et peut être ouvert avec WinRAR.Voir Jar, comme le format zip, avec une extension différente; tools.jar a pour fonction de fournir des catégories non essentielles de catalogues d'outils et de programmes opérationnels; Lib fournit des documents sur l'utilisation des outils de développement.

Ouvrez "commencez" - > exécutez "," CMD "et entrez dans l 'interface système dos.Saisissez ensuite "javac" et, si l 'installation réussit, le système affiche une série de paramètres et d' applications concernant les commandes javac.

Attention particulière: Java \ \ u Home ne peut pas ajouter «; et que le nom de chemin est celui de JDK, et non celui de JRE, et que le nom de la variable ne fait pas de distinction entre la taille et la taille.

####Ajouter: dt.jar, t.jar, tools.jar

Dt.jar et tools.jar sont les deux paquets les plus élémentaires de Java, qui comprennent les plus importants paquets Lang de Java et sont indispensables à Java pour des fonctions de haut niveau telles que les paquets Swing visualisés.

124, par. 124.
124 -------------------------------------------------------------------------------------------------------------------------------------------------------------
* sun.tools.java. *, sun.tools.javac. *.Va, javac est un boîtier de l 'ordre susmentionné, ce qui ne permet pas d' ajouter celui - ci au classpath.Le serveur d 'application est utilisé pour compiler des fichiers jsp, le serveur d' application chargera lui - même et n 'aura pas besoin d' être configuré lui - même.- 124.
La plupart des jars sous JRE / LIB se trouvent dans ce trajet; méthode de détection: supprimer le rt.jar dans ClassPath, détecté par ordre Java - verbose.- 124.
Les bibliothèques de l 'environnement d' exploitation \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\\- 124.

**Références:**

Rôle des trois paquets Jar:[http://blog.csdn.net/hlw881008/article/details/5505251](http://blog.csdn.net/hlw881008/article/details/5505251)

Regarde l'effet des trois sacs sous Eclipse:[http://blog.csdn.net/dy_paradise/article/details/3909212](http://blog.csdn.net/dy_paradise/article/details/3909212)

JDK rôle des dossiers:[http://blog.csdn.net/qcontriver/archive/2010/03/09/5360975.aspx](http://blog.csdn.net/qcontriver/archive/2010/03/09/5360975.aspx)



##Installation Eclipse

###Eclipse Download

Ouvrir un site officiel[www.eclipse.org](http://www.eclipse.org/), cliquez sur downloads, choisissez Eclipse - Classic 3.6.1 sous Windows - 32 Bit[http://www.eclipse.org/downloads/download.php?file=/eclipse/downloads/drops/R-3.6.1-201009090800/eclipse-SDK-3.6.1-win32.zip](http://www.eclipse.org/downloads/download.php?file=/eclipse/downloads/drops/R-3.6.1-201009090800/eclipse-SDK-3.6.1-win32.zip)".Télécharger à D:

###Installation Eclipse

Décompresser le paquet de compression zip téléchargé et créer un raccourci pour le Bureau (diagramme de touche droite - > envoyer - > raccourci pour le Bureau) afin de faciliter le démarrage.

Attention: SDK est comme JDK de Java, l 'ADT n' est qu 'un insert d' eclipse, de sorte que l 'ordre d' installation des deux n 'est pas strict.



##Installation de SDK

###Téléchargement SDK

Ouvrir un site[http://www.onlinedown.net/softdown/32289_2.htm](http://www.onlinedown.net/softdown/32289_2.htm)Téléchargez Android - SDK \ \ r08 - windows.zip et décochez à D: \ \ Android.

###Installation SDK

Fichier d: < Android - SDK \ \ Ru 08 - Windows >

![img](img/5.png)

**Figure 3 - 1 interface de montage SDK**



"Failed to Fetch URL...", cliquez sur save & apply et répétez SDK setup.exe

J 'ai passé beaucoup de temps ici, puis j' ai découvert que certains documents obsolètes avaient été téléchargés et qu 'il fallait donc faire attention.Cliquez sur les Packages availables pour sélectionner une version élevée du SDK.

![img](img/6.png)

**Figure 3 - 2 available Packages**



![img](img/7.png)

**Figure 3 - 3 installed Packages**



Remarque: pour réduire le temps d 'attente de l' utilisateur, le répertoire téléchargé est emballé dans un fichier comprimé, ce qui permet de décompresser directement l 'utilisation sans avoir à effectuer l' installation SDK.See Android - SDK - windows.rar compression package in Software catalogue.

Après l 'installation, la liste des fichiers est la suivante:

Add - on: Some extensions Library, such as Google APIS add - on

Attends.

Modules de plateforme par version

Quelques exemples de programmes

Tools: divers outils

Un peu d'entraînement USB sous Windows.

Temp: enregistrement de fichiers provisoires pendant le téléchargement de composants de plates - formes

###Configuration SDK

Ajoutez les Tools à la variable environnementale de path (mon chemin est d:); la même façon de définir la variable environnementale.

Notez que l 'installation d' Android SDK doit être améliorée à ce stade pour réussir, comme suit:

1) SDK location index Android

Option Android dans Window à Preferences, le contenu de la logation SDK devrait être le chemin d'installation d'Android SDK (ici d: android - SDK - Windows).

Ajout: si le paquet de compression Android - SDK - windows.rar est directement décompressé pendant l 'installation SDK, il faut d' abord la configuration SDK pour améliorer l 'installation SDK.

![img](img/8.png)

**Figure 3 - 4 Configuration du chemin Android SDK**

Si la valeur SDK n 'est pas définie, une erreur de la figure 3 - 5 apparaît.

![img](img/9.png)

**Figure 3 - 5**

Mise à jour du SDK dans clipse

« Window » - "Android > SDK > et" AVD "manager" - "installed" packages "- > update" all "- > access" All - > et "install" accepted ", voir les figures 3 à 6.Le temps d 'installation total est d' environ 45 minutes, lorsque la boîte de dialogue ADB restart apparaît, cliquez sur "oui" et fermez la boîte de dialogue à l 'exception d' Eclipse.

Après « install accepted », ajouter « failed to Fetch url http: / / dl - ssl.google.com / Android / repository / responsitory.xml ».

De nombreuses informations ont été recueillies:

1) "Setting" sur la gauche d'Android SDK et AVD Manager, sélectionnez "force https: /"Cette option

2) Supprimer la sélection "ask - before restart - adb4", enregistrer les paramètres du téléchargeur SDK, qui n 'a plus de "Save" et d' apply ", et télécharger automatiquement l 'outil de modification à l' adresse indiquée (pour les pages inutiles de Save et apply, il existe déjà de nombreuses Méthodes d 'ajout de variables environnementales et de conservation par entrée, etc.).La première fois que j 'ai modifié la configuration de la version r06, je n' ai pas pu utiliser le téléchargeur r06.

3) Si la connexion réussit, ce qui signifie que d 'accord, le téléchargement est suivi de l' installation

Question: il n 'y a pas d' option "Setting" sur la gauche, mais la pratique montre que cette situation ne pose pas de problème majeur.

Sélectionnez les paquets nécessaires:

Si vous essayez Android 2.0 Emulator (simulateur), vous n'avez qu'à choisir "SDK Platform" Android 2.0.api 5, révision 1 "pour l'installer.

B) Si vous voulez développer des applications et des jeux sur le SDK, vous devez accepter et respecter toutes les licences (Access all)

![img](img/10.png)

**Figure 3 - 6 interface SDK mise à jour**

Si le SDK n 'est pas mis à jour, une erreur "An SDK Target must be specified" apparaîtra lors de la création du projet Android, comme dans les figures 3 à 7.

![img](img/11.png)

**Figure 3 - 7 interface SDK - target must be specified**



##Configuration ADT

Ouvre la boîte de dialogue graphique 4 - 1.

![img](img/12.jpg)

**Figure 4 - 1 Paramètres du site Web téléchargé**

Insérer dans "location"[http://dl-ssl.google.com/android/eclipse](http://dl-ssl.google.com/android/eclipse), c 'est - à - dire que vous remplissez la case rouge, cliquez sur OK, cliquez sur la carte 4 - 2, puis cliquez sur select All, modifier la partie principale de la case rouge de la même manière, puis cliquez sur Next > sur deux pages différentes, puis choisissez "I accept the terms of license agreement" et "finish", puis patientez environ 20 minutes pour laisser install software, noteCe qui signifie que l 'ADT contient des éléments non signés et n' est ni valide ni authentique, demande si l 'installation se poursuit, ce qui n' a guère d 'importance, cliquez sur "OK", et enfin clipse indiquera que la réouverture donnera effet à l' ADT en cliquant sur "restart now".

![img](img/13.png)

**Figure 4 - 2 installation d 'ADT**



##V. Création d 'un simulateur (AVD)

Windows - > Android > SDK > and AVD > Manager - > Virtual > Devices >

Remarque: Si vous cliquez sur Virtual Devices du panneau gauche, puis sur New à droite, et qu'il n'y a pas d'alternative à target, cliquez alors sur available packages du panneau gauche, puis cliquez sur https: / / dl - ssl.google.com / Android / repository / repository.xml, puis cliquez sur install Selected, puis appuyez sur le bouton.

![img](img/14.png)

**Figure 5 - 1 Création de nouveaux simulateurs**

Explication: target est la plate - forme disponible pour le simulateur; SD - Card est une carte mémoire, c 'est - à - dire une carte mémoire pour le téléphone mobile; et skin est la taille de l' écran affichée par le simulateur, avec les paramètres suivants:

> wvga: 800 * 480
]
> qvga: 320 * 240
]
> VGA: 640 * 480
]
> HVGA: 480 * 320
]
> wqvga400: 240 * 400
]
> wqvga432: 240 * 432
]
> wvga800: 800 * 480
]
> wvga854: 854 * 480

Vous pouvez également sélectionner Resolution et définir librement la taille de l 'écran du simulateur.Les valeurs de Hardware (matériel spécial requis par l 'AVD): les valeurs de la résolution d' abstraction LCD sont définies automatiquement par le skin sélectionné, etc.

![img](img/15.jpg)

**Figure 5 - 2 simulateurs de fonctionnement**

Sélectionnez SDK / android2.2, point start - > Launch, qui apparaîtra dans la figure 3 - 3.

![img](img/16.png)

**Figure 5 - 3 démarrage du simulateur**



![img](img/17.png)

**Figure 5 - 4 matériel virtuel inconnu**



Erreur de simulateur Android: Error: Unknown Virtual service name

Cause: l 'emplacement par défaut de mon document a changé en raison d' une erreur de référence du chemin de fichier créé.

La première: copier les documents sous "F: \ \ username \ \ Android" à "C: \ \ username \ \ Android \" permet de résoudre le problème, mais cette solution présente un inconvénient évident, à savoir que si un nouvel AVD est créé, il doit être reprogrammé.

Faii: mon ordinateur - > propriétés de frappe droite - > avancées - > variables environnementales - > variables systémiques >Puis, changez la valeur de la variable pour l'emplacement où vous voulez placer le dossier "Android", par exemple: "F:"



##PROCÉDURE helloworld

###Création d'Android Project

"File" - > New "> other" > Android "> Android >

**Parmi eux:**

Nom du projet: nom d 'un projet, correspondant à un dossier.

Build Target: Sélectionnez la version SDK utilisée par l 'application.

Application name: nom du programme, généralement dans la barre de titre de l 'application.

Pakcage - name: ce nom est théoriquement facultatif, mais pakcage a un certain nombre de critères de désignation: le premier identifie le type d 'Organisation, par exemple com, l' Organisation, l 'Organisation, l' edu, le secteur de l 'éducation; le deuxième, le nom de l' Organisation, par exemple Sun, que j 'ai utilisé moi - même; et le troisième, et plus tard, peut être défini en fonction de ma propre classification.

Creak - Activity: Activity est une entité opérationnelle d'un programme ANDRIOD, un peu semblable à la fonction main en langue C, à la différence de laquelle le programme Android peut comporter plusieurs entités similaires à la fonction main.

Min SDK version: cette rubrique correspond généralement à celle de Build - target et n'a pas besoin d'être précisée.

![img](img/18.png)

**Figure 6 - 1 New Android Project**

###Création d 'un dispositif AVD

Voir sect. V.Si le matériel de déploiement n'a pas été créé et n'a pas d'importance, on peut frapper à droite à "Run" as "," Run "confirmations", "Android", "Android", "Android", "target", "mannul", "Run", "Run".Sélectionnez "Launch a New Android Virtual Device", sélectionnez SDK et cliquez sur OK.

###Compilation and Operation Procedure

Ouvrez le fichier hello.java, dont le contenu figure à la figure 6 - 2:

![img](img/19.png)

**Figure 6 - 2 contenu du document hello.java**



![img](img/20.png)

**Figure 6 - 3 Paramètres Java Build - path**



Project - > Properties, dans la boîte de dialogue des figures 6 - 3, cliquez sur Android 2.2, cliquez sur OK; Run - > Run (Ctrl + F11) - > Yes - > sélectionnez SDK, cliquez sur START - > Launch - > OK, dans 2 minutes, vous verrez l 'interface graphique 6 - 4.

Remarque: cliquez à droite sur le document Java à exécuter - > run 'as - > run' confirmations - > Android 'application - > Android >

![img](img/21.png)

**Figure 6 - 4 interface de résultats opérationnels**

Sources de référence:[http://blog.csdn.net/zhq56030207/archive/2010/08/31/5852130.aspx](http://blog.csdn.net/zhq56030207/archive/2010/08/31/5852130.aspx)

###Procédure de débogage

####Programmer par ddms:

1) transfert de l 'interface de travail de l' outil de développement Eclipse à l 'étiquette ddms.Comme le montrent les figures 6 à 5 et 6 à 6.

![img](img/22.png)

**Figure 6 - 5 mode Affichage ouvert**

![img](img/23.png)

**Diagramme 6 - 6**

2) Sélection des étiquettes "Devices" dans l 'interface ddms pour les fonctions de menu: debug - Process (processus de débogage), Update - threads (fil de mise à jour), Update - heap (réacteur de mise à jour), cause GC (récupérades ordures), stop Process (arrêt), Screen capture (capture d' écran), Reset add (réactivation des options de menus androiddebug - Bridge)- Oui.

####Programmer le programme par "logcat" de ddms

1) "logcat" Recherche les erreurs et imprime les messages du Journal du système par des méthodes statiques dans la catégorie andrdoi.util.log.

Andrdoi.util.log utilise les cinq méthodes suivantes:

Log.v (String - Tag, String - MSG); verbose

Log.d (String - Tag, String - MSG); debug

Log.i (String - Tag, String - MSG); info

Log.w (String - Tag, String - MSG); warn

Log.e (String - Tag, String - MSG); error, applicable à la procédure de débogage du point de rupture

Les informations log.v et log.d ne devraient exister que pendant le processus d e d éveloppement et la version finale ne devrait contenir que des informations log.i, log.w et log.e.

2) cliquez sur Run - > debug pour accéder au mode de mise en page.

3) passez à l 'interface ddms en cliquant sur l' étiquette logcat pour voir les informations log que nous venons d 'imprimer dans le programme.Les informations de différents niveaux sont représentées par différentes couleurs, ce qui facilite le suivi du programme.

4) Méthodes de mise en route

1) Établissement d 'un point d' arrêt, exécution en une seule étape: Double - cliquez sur la barre de marquage d 'une ligne

2) rupture de condition de déclaration, déclenchement terminé: rupture déclenchée lorsque la valeur de l 'expression change.Double - cliquez sur le point d 'arrêt à droite et sélectionnez "Breakpoint properties" pour marquer "enable" et "Conditional" dans la case, pour écrire les variables d' expression, le programme est suspendu lorsqu 'il est satisfait; en même temps, une aide de code peut être utilisée pour saisir l' expression conditionnelle.Dans le menu contextuel, le résultat est affiché par Ctrl + maft + I ou par un clic droit sur la variable et la sélection Inspect.

![img](img/24.png)

**Figure 6 - 7 configuration de l 'interface de débogage**



##Importer un ouvrage existant

###Importer des procédés non Android:

"File" - > Import "> General" > existing Project "into Workspace" > next "- > select" Root "directory" > browse, sélectionnez l 'emplacement des travaux à importer.

Remarque: s' il n 'y a pas de sac Android, il faudra reconfigurer "Build - path".

###Importer le procédé Android:


“File” -->“New” -->“Project” -->“Android” -->“Android Project” -->“Next” -->“Contents” -->“Project name”（另起一个名称） -->“Create project from existing source” -->“Location” -->“Browse”（选择Android工程所在文件夹，到.xml所在的文件夹为止） -->“Build Target”（选择模拟器平台版本） -->“Finish”。



##Installation du logiciel APK

###Installation d 'un logiciel APK sur un simulateur

D 'abord entrer dans le dossier d' Android SDK, et comme le démarrage du simulateur prend quelques minutes, on démarre le simulateur avec l 'ordre (umulator - AVD youravadname) (Note: Double - cliquez sur emulator.exe dans le dossier Tools); puis on copie le fichier sous Plantform - Tools sous le dossier Android - SDK (s' il y a une répétition, on ajoute le plan).Les variables d 'environnement tform - tools, puis ouvrez "exécuter", saisissez CMD, cliquez sur "déterminer", saisissez "ADB install" et faites glisser l' APK à exécuter dans le CMD pour appuyer sur Entrée, puis vous verrez l 'interface graphique 8 - 1, Success!

![img](img/25.png)

**Figure 8 - 1 interface indicateur de commande**

Remarque: les fichiers de Plantform - Tools doivent être copiés sous Tools ou incorporés dans la variable environnementale de path, car les instructions ADB ne figurent pas dans Plantform - tools, de sorte qu 'une erreur dans la figure 8 - 2 se produirait si cette opération n' était pas effectuée.

![img](img/26.png)

**Figure 8 - 2 "ADB" n 'est pas une interface de commande interne ou externe**



Si le nom de fichier APK contient le chinois, une erreur apparaît dans la figure 8 - 3 et il suffit de le remplacer en anglais et en chiffres.

![img](img/27.png)

**Figure 8 - 3 interface erreur de segmentation**



![img](img/28.png)

**Figure 8 - 4**



Une fois l 'installation réussie, l' icône de la zone rouge apparaît sur le panneau du simulateur, et cliquez pour exécuter.



###Logiciel APK sur simulateur

« Setting » (icône Setting dans les figures 8 à 4) - > Applications - > Management applications - > waterwave - > unstall - > OK (confirmation).L 'icône waterwave sur le panneau de succès est alors disparue.

![img](img/29.png)

**Figure 8 - 5 succès du déchargement de l 'APK**



###Installation de logiciel APK sur ordinateur

Tout d 'abord "réglage" - > application "> cochez" source inconnue "> retour" > développement >

####3.1 méthode I

Télécharger et installer l'assistant pour Android.Les téléphones portables et les ordinateurs sont ensuite reliés à l'USB et les assistants, tels que les figures 8 à 6, sont ouverts.

![img](img/30.png)

**Figure 8 - 6 - 91**



"Connexion manuelle" - "connexion USB" - "?- > maintenance du système - > Gestion des fichiers - > accès rapide >

![img](img/31.png)

**Figure 8 - 7 interface de montage APK**



Ou une méthode simple: double clic direct. APK peut être installé dans le téléphone portable.

####3.2 méthode II

À l'adresse http: / / www.hiapk.com / bbs / thread-40417-1-1.html, téléchargez hiapk installer (APK installation), qui peut être installé en double clic direct (uniquement sur ordinateur), comme les figures 8 à 8.Ce logiciel est automatiquement associé à votre programme APK, il suffit de double - cliquer sur le programme APK pour l 'Installer automatiquement dans le téléphone portable.

![img](img/32.png)

**Figure 8 - 8 interface avec succès installée par hiapk installer**



####3.3 méthode III

Installation d 'Astro (gestionnaire de fichiers): l' astro.apk est placé dans le SD du téléphone mobile et le fichier APK est placé au milieu de la carte SDK dans le gestionnaire de fichiers du téléphone mobile, après quoi l 'icône Astro apparaît sur le panneau.Lors de l 'installation ultérieure du logiciel, l' installation et le déchargement du logiciel peuvent être effectués sur l 'installation d' appk sur le téléphone mobile, à condition que le fichier APK soit attaché à la carte SD.

####3.4 méthode IV

Téléchargez un dispositif d 'installation d' appk incorporé dans un téléphone portable, puis attachez le fichier d 'APK à la carte SD.

Ajout: fonctions du gestionnaire de fichiers: visualisation de fichiers, gestion de fichiers, recherche de fichiers, déchargement et sauvegarde de programmes, gestion de processus, état de la carte SD.

Installation d 'appk: simplification du processus d' installation des fichiers APK de manière à ce qu 'ils fonctionnent sur un ordinateur de manière à pouvoir installer le logiciel APK sur un téléphone mobile.

Attention: lorsque le téléphone est connecté à l 'ordinateur, il faut télécharger le lecteur ou l' installation de l 'APK (habituellement le pinceau à pois, l' assistant 91), ou simplement la carte mémoire du téléphone portable connecté à l 'ordinateur sans connexion.