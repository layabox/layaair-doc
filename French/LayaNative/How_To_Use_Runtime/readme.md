#Comment utiliser layanative pour tester l'exécution d'app?

###Télécharger et installer

Ouvrez layaairide et cliquez sur "télécharger l 'opérateur" dans le menu Outils pour afficher l' adresse de téléchargement du Code bidimensionnel.

​![图片](img/1.png)
Figure 1

​![图片](img/2.png)
Figure 2
**Saisissez l 'adresse complète, même si l' index.html est activé par défaut.**
* http: / / testgame.layabox.com / index.html correct.
* http: / / 192.168.0.100: 8899 / index.html correct.
* http: / / testgame.layabox.com / Error
* Erreur: < http: / / testgame.layabox.com >
* http: / / 192.168.0.100: 8899 / erreur.
* http: / / 192.168.0.100: 8899 erreur

* * Tips: s'il apparaît qu'aucune image n'est affichée sur l'écran, c'est peut - être parce que le projet n'a pas correctement placé l'écran vertical, consulter le document: https: / / github.com / layabox / layaair - DOC / tree / Master / chinese / layanative / Screen u orientation******

####Téléchargement et installation d'Android

Le Code de balayage est directement utilisé avec le téléphone Android, et cliquez sur APK pour l 'installation.
****
**Si vous utilisez un code de balayage de micromessagerie, il faut copier l 'adresse du lien pour le télécharger dans un navigateur de téléphonie mobile en raison des paramètres de sécurité des micromessageries.**    ****

####2.ios téléchargement et installation

Après avoir scanné le micromessage, cliquez sur "ouvert dans Safari", puis sur le bouton install dans le navigateur Safari, puis sur l 'installation, comme le montre la figure suivante:
****
**Mesure 1:******



​	![图片](img/3.png)< br / >
Figure 3
****

 



**Mesure 2:******

​![图片](img/4.png)<br>

Figure 4
****

 



**Mesure 3:******



​	 ![图片](img/5.png)< br / >
Figure 5
****

  **Tips**- Oui.****


点击安装后，这里没有自动跳转功能，需要手动去系统桌面上看一下，是否存在Layabox的应用正在安装，如果正在安装，就等待安装结束后进行下一步操作。



Une fois l 'installation réussie, cliquez sur l' exploitation pour faire sortir le "développeur d 'entreprise non confiant", ce qui nécessite un réglage par le développeur lui - même.Cliquez sur "Paramètres" - > Gestion du matériel - > cliquez sur layabox Network >
****
**Mesure 4******

​![图片](img/6.png)< br / >
Figure 6
****

 



**Mesure 5******



​	![图片](img/7.png)< br / >
Figure 7
****

 



**Mesure 6******



​	![图片](img/8.png)< br / >
Figure 8
****

 



**Mesure 7******

​![图片](img/9.png)<br>

Figure 9
****

 



**Mesure 8 * *

​![图片](img/10.png)<br/>

Figure 10



 



####Ouverture des applications

Lorsque l 'application est ouverte, une interface comme la figure 11 est visible:



​	![图片](img/11.png)<br/>

Figure 11

L 'adresse par défaut est un exemple d' essai de performance fourni par layabox, qui permet d 'accéder à l' essai de performance en cliquant sur le bouton "Go".Bien entendu, le développeur peut saisir son propre adresse de projet pour les tester, comme le montre la figure ci - dessous:



​![图片](img/12.png)< br / >
Figure 12

Vous pouvez cliquer sur assistivetouch dans le projet et cliquer en arrière pour revenir à la page d 'accueil.

​![图片](img/13.png)< br / >
Figure 13

L 'adresse de la dernière entrée est automatiquement enregistrée lors de la deuxième ouverture de l' app.

​![图片](img/14.png)< br / >
Figure 14



 



####Note

Les documents en format de texte (par exemple INI, XML, HTML, json, JS, etc.) doivent tous être des formats de codage utf8, car le matériel iOS ne supporte pas actuellement les fichiers codés en format non utf8.


####Recommandation

Il est conseillé aux développeurs d 'apprendre les connaissances de base développées par Android et IOS, qui permettent de connecter des dispositifs mobiles à des ordinateurs, de consulter à tout moment log, qui contient de nombreuses informations importantes pouvant aider les développeurs à se positionner.Par exemple: nom de fichier non codé en format utf8, erreur de réseau, erreur de téléchargement, etc.