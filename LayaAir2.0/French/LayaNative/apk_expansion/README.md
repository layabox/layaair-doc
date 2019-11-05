#Mécanisme d 'extension de fichier Android
Layanative est favorable non seulement à ce que les ressources soient emballées sous le catalogue des Assets, mais aussi à ce que les ressources soient emballées dans des fichiers Zip et placées en dessous de l 'itinéraire des fichiers arbitraires.Le système de fichiers layanative vérifie d 'abord l' existence des fichiers dans le catalogue Assets et, si ce n 'est pas le cas, dans le chemin zip spécifié.Ce mécanisme zip permet de résoudre le problème de GooglePlay, qui exige plus de 100 MB de Size de l 'APK, et d' obtenir des paquets d 'extension supplémentaires.

##Description détaillée du mécanisme
###Production de DCC
Packaging Resources with DCC tool for Test Projects
![图1](img/1.jpg)    

###Documents comprimés
Pour placer le paquet de ressources dans un fichier étendu, compresser le fichier case, le fichier exige un format zip et la structure du fichier doit rester la même que celle générée par l 'outil CC, comme suit:
![图1](img/2.jpg)  

###Copie des fichiers Zip dans le répertoire des équipements
Établissement d 'un catalogue / storage / emulated / 0 / Android / test / com.layabox.conch6 sur le téléphone d' Android
###Modification de l'extension du Code
Modifier runtimeproxy.java`getExpansionMainPath`Définit le chemin zip correct.

```

    public String getExpansionMainPath()
    {
        return "/storage/emulated/0/Android/test/com.layabox.conch6/test.zip";
    }
    public String getExpansionPatchPath()
    {
        return "";
    } 
```

###Accès à la mémoire externe
Les machines d 'andro6.0 ou plus ne peuvent pas lire la mémoire externe et ont besoin d' un droit de requête actif.Veuillez ajouter le code suivant ou la solution de Google.

```

    public static boolean isGrantExternalRW(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && activity.checkSelfPermission(
                Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            activity.requestPermissions(new String[]{
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
            }, 1);
            return false;
        }
        return true;
    }
```

**Tips: au maximum deux fichiers Zip sont supportés dans la layanative, et la deuxième modification zip modifie getexpansionpatchpath cette fonction**

###Essais opérationnels
Exécuter l 'APP, voir le journal ci - dessous indique que la lecture de fichiers de ressources à partir du paquet d' extension principal a été réussie
![图1](img/3.png)  

##Google Play - APK Extended documentation Mechanism
(https: / / developer.android.com / Google / play / expansion-files.html)
