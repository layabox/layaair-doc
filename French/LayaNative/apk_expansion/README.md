# android文件扩展机制
Avant la version layaplayer - 0.9.7, les moteurs ne pouvaient emballer les ressources que sous le catalogue assets.Dans les versions ultérieures, layaplayer - 0.9.7 est favorable à ce que les ressources soient emballées dans des fichiers Zip et placées sous n 'importe quel chemin de fichier.Le système de fichiers layaplayer vérifie d 'abord l' existence des fichiers dans le catalogue Assets et, s' il n 'est pas trouvé, dans le chemin zip spécifié.Ce mécanisme zip permet de résoudre le problème de l 'adjonction de paquets élargis en fixant le nombre de Size de l' APK à plus de 100 MB.

##Description détaillée du mécanisme
###Production de DCC
Packaging Resources with CCC tool for Test Engineering
![图1](img/1.png)    

###Documents comprimés
Pour placer le paquet de ressources dans un fichier étendu, compresser le fichier case, le fichier exige un format zip et la structure du fichier doit rester la même que celle générée par l 'outil CC, comme suit:
![图1](img/2.png)  

###Copie des fichiers Zip dans le répertoire des équipements
Établissement d 'un répertoire / storage / emulated / 0 / Android / test / com.layabox.conch5
###Modification de l'extension du Code
Modifier runtimeproxy.java`getExpansionMainPath`Définit le chemin zip correct.

```

    public String getExpansionMainPath()
    {
        return "/storage/emulated/0/Android/test/com.layabox.conch5/test.zip";
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

**Tips: layaplayer supporte au maximum deux fichiers Zip, et le second modifie getexpansionpatchpath, fonction**

###Essais opérationnels
Exécuter l 'APP, voir le journal ci - dessous indique que la lecture de fichiers de ressources à partir du paquet d' extension principal a été réussie
![图1](img/3.png)  

##Google Play - APK Extended documentation Mechanism
(https: / / developer.android.com / Google / play / expansion-files.html)
