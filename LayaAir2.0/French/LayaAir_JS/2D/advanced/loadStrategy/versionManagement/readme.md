#Gestion des ressources

Une fois le projet en ligne, il sera inévitablement nécessaire de mettre à jour la version des ressources.Cependant, le problème de cache du navigateur peut entraîner l 'extraction de ressources qui ne sont pas les dernières versions et l' incohérence des versions d 'articles entraîne des dysfonctionnements de fonctionnement.Une gestion rationnelle des ressources est donc particulièrement nécessaire.Les outils de gestion de la version des ressources fournis par le moteur layaair permettent de résoudre efficacement ce problème.On trouvera ci - après des exemples concrets.**Attention: la version du moteur nécessite plus de 1.7.3.**

Ici, nous utilisons la ligne de commande.Regardez les étapes suivantes.

- installer nodejs, télécharger nodejs.[https://nodejs.org/en/](https://nodejs.org/en/%E3%80%82)

- installation d'outils layacmd.Down address[https://www.npmjs.com/package/layacmd](https://www.npmjs.com/package/layacmd%E3%80%82)

Ici, j 'utilise le système Win.Ouvre la fenêtre CMD et commande d 'entrer la ligne NPM install layacmd - G.

Cet outil de ligne de commande offre de nombreuses fonctions, dont la compilation, la publication, l 'exportation de ressources, la création de serveurs statiques, etc., et le Programme d' enseignement correspondant peut se référer au programme thématique layacmd.Les fonctions de gestion des ressources sont décrites ici.

- création d'un nouveau projet layaair.

Puis entrer dans le répertoire H5, créer un nouveau dossier res et placer toutes les ressources dans le répertoire res, où nous ajoutons peu à peu quelques ressources.Nous ajoutons ici un dossier audio dans lequel un fichier audio a.mp3, un dossier IMG dans l 'extérieur et une image 1.png.

Ouvrir une entrée de ligne de commande sous le répertoire Bin`layacmd resourceVersion -i res -o . -n 1.0.0`Ici - I représente le trajet de ressource, O. représente le trajet de sortie de la ressource de version comme le trajet actuel, bien que l 'développeur puisse définir lui - même le trajet de sortie, par exemple définir le chemin comme le dossier de version, etc., et n - 1.0.0 la version initiale est 1.0.Nous avons vu des fichiers et des dossiers générés.Comme le montre la figure ci - après:



  ![1](img/1.png)(Figure 1) < / BR >

Le dossier 1.0.0 contient les ressources de la version 1.0.`.record`Le fichier enregistre les informations MD5 du fichier, ne les Effacez pas!`manifest.json`Le numéro de la version des ressources enregistrées dans le fichier.

Voir ci - dessous comment l 'appliquer dans le programme.

​



```typescript

Laya.init(500,500);
//设置资源配置文件的地址，我这里加了随机参数，保证每次加载的都是最新的。
this.configUrl = "manifest.json?"+Math.random();
Laya.ResourceVersion.enable(this.configUrl,Laya.Handler.create(this,completeHandler));

function completeHandler(e){
    Laya.loader.load([{"url":"res/sound/a.mp3","type":Laya.Loader.BUFFER}],Laya.Handler.create(this,loadSound));
}
function loadSound(){
    var obj = Laya.loader.getRes("res/sound/a.mp3");
}
```


- après l'initialisation du moteur, la première chose à faire, c'est de le charger.`manifest.json`Ce document.Le moteur fournit un procédé correspondant pour activer la gestion de version.

`ResourceVersion.enable`Ce procédé permet d 'acheminer le fichier manifest.json, et la classe resourceversion modifie le procédé url.customformat.Le numéro de la version de la ressource dans manifest.json correspond à celui de la ressource pendant le chargement.La logique officielle de notre projet commence après le chargement du document manifest.json.

Nous chargeons un fichier audio dans la logique du projet.Compiler le code d 'exécution.Ouvrez la console de Google.Regardez les informations du fichier chargé.Figure:

![2](img/2.png)(Figure 2) < / BR >

Je vois le chargement.`1.0.0/res/sound/a.mp3`Ressources dans le dossier.Nous ajoutons une ressource pour créer un nouveau document texte.Appelé data.data.À insérer dans le document RES / data / data.data.Chargez le code suivant:


```typescript

Laya.init(500,500);
//设置资源配置文件的地址，我这里加了随机参数，保证每次加载的都是最新的。
this.configUrl = "manifest.json?"+Math.random();
Laya.ResourceVersion.enable(this.configUrl,Laya.Handler.create(this,completeHandler));

function completeHandler(e){
    var obj = Laya.loader.getRes(this.configUrl);
    var data =[
        {"url":"res/sound/a.mp3","type":Laya.Loader.BUFFER},
        {"url":"res/data/data.data","type":Laya.Loader.TEXT}
    ]
    Laya.loader.load(data,Laya.Handler.create(this,resComplete));
}
function resComplete(){
    
}
```


Compilez le code ci - dessus et ouvrez le gestionnaire de Google pour voir le chemin de chargement.

![3](img/3.png)(Figure 3) < / BR >

Nous avons ainsi pu constater que nos ressources sont toujours placées sous le catalogue des res au moment de l 'élaboration du modèle, et que lorsque la version officielle est publiée, nous utilisons l' outil de ligne de commande pour gérer la version.

Nous saisissons la commande dans la ligne de commande, si nous la définissons comme la version 1.0`layacmd resourceVersion -i res -o . -n 1.0.0`À la fin de l'exécution, sur la page mise à jour:

![4](img/4.png)Figure 4 < / BR >

On a trouvé que les ressources du dossier 1.0.0 avaient été chargées.

Il s'agit d'une augmentation des ressources, et si elles sont modifiées?Il suffit d 'ajouter un numéro à la version.Par exemple, nous modifions le contenu de data.data.Et après, on publie.

`layacmd resourceVersion -i res -o . -n 1.0.1`Exécution.Le chargement est ensuite mis à jour.

![5](img/5.png)(图5)</br>



 **Le document a.mp3 n 'a pas été modifié et il chargera les ressources du dossier 1.0.0.**

Résumé

Nous voyons donc que nous pouvons modifier le numéro de la version publiée dès que nous disposons des ressources nécessaires pour le modifier.Cela permet de charger des ressources dans le dossier correspondant.La version enregistrée dans le fichier manifest.json est modifiée.