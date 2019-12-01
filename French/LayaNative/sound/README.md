#Sur le son

Dans le layaplayer, la voix est divisée en deux modèles: Musique de fond et son.

##Musique de fond

Dans le layaplayer, la musique d 'arrière - plan ne supporte que le format mp3 et ne peut être diffusée qu' une seule musique d 'arrière - plan.

##Son

Dans le cadre du projet, le son est un événement à haute fréquence et, pour assurer l 'efficacité de son fonctionnement, layaplayer utilise le son openal, car le MP3 est un format multimédia en continu qui n' est pas encore disponible.
**Tips:**  
**Le son dans layaplayer ne supporte que les formats WAV et Ogg.**  
**2, WAV et Ogg ne supportent que 8 et 16 personnes, et pas encore 32.**
**Attention: layaplayer - 0.9.5 versions antérieures, WAV et Ogg ne supportent que 22050 taux d 'échantillonnage, 16bit, mono - canal**

Il y a deux façons de voir la version actuelle de layaplayer:
Appel dans JS`conch.config.getRuntimeVersion();`Pour obtenir le numéro de version.
Insère le matériel sur l 'ordinateur et regarde log, comme le montre la figure suivante:

![图0](img/0.png)

##Informations indicatives

Après layaair - 1.7.5`SoundManager.playSound()`Si le format du fichier saisi est MP3, l 'information d' avertissement apparaît comme suit:
`The sound only supports wav or ogg format,for optimal performance reason,please refer to the official website document.`  
Il faut alors convertir le MP3 en WAV ou en Ogg.

Dans la version antérieure de layaair - 1.7.5, il n 'y avait pas de fausses informations, quand on découvrait qu' il y avait des effets sonores à chaque lecture.**Karton**, cette situation est probablement due à l 'utilisation du format mp3 pour le son de lecture et à la nécessité de convertir le format.

##Compatibilité des solutions

Si vous utilisez le format mp3 dans votre version Web, mais le format WAV est également utilisé dans la version layaplayer.Il est recommandé que le projet soit chargé au moyen d 'un fichier de configuration, de sorte qu' il ne soit utilisé qu 'à l' endroit où le fichier de configuration a été chargé et qu 'une seule fois soit ajoutée pour déterminer si l' environnement d 'exploitation de layaplayer est le faux Code indiqué ci - après:


```javascript

if(window.conch)
{
    ...加载 "soundConfig-LayaPlayer.json"
}
else
{
    ...加载 "soundConfig-json"
}
SoundManager.playSound(soundJson[0].url,1);
....
SoundManager.playSound(soundJson[1].url,1);
```


**Tips**  
* 1, NCH n 'est disponible que dans l' environnement de layaplayer, il n 'y a pas de définition de Concord dans la version Web et tous les éléments doivent être évalués.*
*Si vous utilisez la langue as pour développer`Browser.window['conch'] `Ceci permet d 'obtenir l' objet Concord.*
*Utilisation`if(Render.isConchApp )`Tout peut être jugé.*

##Utilisation de l'outil cool Edit pro pour la conversion de formats sonores
Il existe de nombreux outils qui permettent de convertir le GP3 en WAV, et voici un outil cool Edit pro qui décrit brièvement les étapes pratiques de la conversion du GP3 en WAV:
Téléchargement et installation d'abord de l'outil cool Edit pro, puis ouverture du programme cool Edit pro;
![图1](img/1.png)


Cliquez sur le Sous - menu "conversion de volume" dans le coin supérieur gauche sous "fichier"

![图2](img/2.png)

![图3](img/3.png)

**Note: il est recommandé de procéder par étapes successives à la conversion des fichiers de volume suivant les étapes 1, 2, 3 et 4 ci - dessous**

Sélectionnez la source du fichier: cliquez sur le fichier supplémentaire à droite.Ici, nous choisissons tous les fichiers sous le fichier Sound pour les traiter par lots, puis cliquez sur ouvrir;

![图4](img/4.png)
![图5](img/5.png)

Conversion du type d 'échantillonnage: cliquez ici pour modifier le format cible sous le catalogue de réassemblage, sélectionnez ici le taux d' échantillonnage requis de 22050hz, mono - canal, 16 bits bits, puis cliquez sur la détermination;
![图6](img/6.png)

Sélectionnez un nouveau format: le format de sortie sélectionne le type Windows - PCM (*.Wav) dont nous avons besoin, le type de format 22050hz, 16 bits, mono - canal;
![图7](img/7.png)

Sélectionnez le dossier cible et le nom de fichier & ‧‧;: Ceci est une simple sélection de la table des matières de sortie, puis cliquez sur & ‧‧; processeur de lots d 'exécution & ‧‧; pour exporter le fichier requis, et lorsque vous apparaissez l' avertissement & ‧‧; conversion de volume de fichiers achevée & ‧‧; pour indiquer que vous avez réussi la conversion de volume MP3 en Wav
![图8](img/8.png)
![图9](img/9.png)

Si les vitres suivantes apparaissent lors du traitement par lots de l'outil cool Edit pro, il suffit de remplacer le fichier resample.xfm et de reprendre l'opération cool Edit pro.

![图10](img/10.png)

**Dans ce cas, on peut faire des recherches, acheter des éditions de cool ou...Tu comprends?**

**Si le téléchargement en ligne de cool Edit Pro n 'a pas de conversion en volume**
