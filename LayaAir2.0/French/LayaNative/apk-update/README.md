#Mise à jour Android - APK

Le Code de mise à jour automatique APK a été ouvert dans le cadre du projet de modèle Android de layanative, et le développeur peut le modifier lui - même en fonction des besoins du projet ou le désactiver ou le supprimer.

**Pour lire ce document, il faut avoir une connaissance élémentaire du développement d 'Android**

##Description du Code

Auto - update Code path`src\main\java\layaair\autoupdateversion`Ce répertoire est un code automatiquement mis à jour par APK, comme le montre la figure 1 ci - dessous:
![图1](img/1.jpg)   


La fonction ncreate dans mainactivity.java fait appel à checkapkupdate et, si elle n'est pas mise à jour ou mise à jour, renvoie à la fonction inintengine. Si l'développeur ne veut pas la fonction apkupdate, cette fonction peut être supprimée et l'appel direct est initeengineering.


```java

protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        /*
         * 如果不想使用更新流程，可以屏蔽checkApkUpdate函数，直接打开initEngine函数
         */
        checkApkUpdate(this);
        //initEngine();
    }
```


##Processus de mise à jour APK

Le processus de mise à jour du Code est le suivant:
Après l 'ouverture de la procédure, lire en lisant config.ini`IsHandleUpdateAPK`Cette variable, si la valeur est 0, signifie que le processus de mise à jour n 'est pas géré par lui - même et que le jeu démarre directement.Si la valeur est 1, le processus de checkupdate se poursuit.
Continuer à lire`ApkUpdateUrl`, il s' agit d 'un fichier XML dans lequel le numéro de la dernière version et l' adresse de l 'APK de la dernière version sont enregistrés.
Si le numéro de version de l 'APK local est inférieur au numéro de version en ligne, l' affiche met à jour la version la plus récente et l 'utilisateur peut choisir de le faire ou non.
Si vous choisissez Oui, le programme téléchargera la dernière version de l 'APK sur l' Extranet pour l 'installation de mise à jour.
Si vous choisissez Non, entrez directement dans le jeu.

**Si l 'développeur veut que la mise à jour soit obligatoire, choisissez "non" pour quitter le jeu directement, s' il vous plaît**

##Comment configurer la mise à jour automatique

Ouvre le config.ini sous le catalogue des Assets, comme suit:

```

IsHandleUpdateAPK=0
ApkUpdateUrl=http://www.layabox.com/LayaNative/apk/update/conch-layaair/version.xml
UpdateDownloadPath=mnt/sdcard
UpdateAPKFileName=autoupdate.apk
CheckNetwork=1
```

Set`IsHandleUpdateAPK=1`  
Configurer le fichier version.xml sur son serveur et`ApkUpdateUrl`Pour le bon chemin.

Configuration du fichier version.xml comme suit:

```

<update>
  <versionCode>13</versionCode>
  <name>LayaBox</name>
  <version>2.0.0</version>
  <url>http://www.layabox.com/LayaNative/apk/update/conch-layaair/AutoUpdate_2.0.0.apk</url>
</update>
```

Version actuelle, type int
Nom: appliquer le nom
Type de chaîne de caractères
URL: apk**Attention: ce code ne permet pas d 'espace ou de retour**   

Positionner correctement la versioncode dans votre propre projet, comme suit:

```

defaultConfig {
        applicationId "com.example.layaboxsdk_demo"
        minSdkVersion 9
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
```


##Note

Le paquet APK mis à jour pour couvrir l 'ancien paquet APK doit être identique au nom et à la signature des deux paquets.
La fonction Update d 'APK n' est pas une fonction essentielle du moteur de layanative, elle est également ouverte et le développeur peut adapter ses propres besoins, par exemple en cas de bug, layabox n 'est pas responsable de la recherche des problèmes.