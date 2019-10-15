## 资源版本管理

Une fois le projet en ligne, il sera inévitablement nécessaire de mettre à jour la version des ressources.Cependant, le problème de cache du navigateur peut entraîner l 'extraction de ressources qui ne sont pas les dernières versions et l' incohérence des versions d 'articles entraîne des dysfonctionnements de fonctionnement.Une gestion rationnelle des ressources est donc particulièrement nécessaire.Les outils de gestion de la version des ressources fournis par le moteur layaair permettent de résoudre efficacement ce problème.On trouvera ci - après des exemples concrets.**Attention: la version du moteur nécessite plus de 1.7.3.**

Ici, nous utilisons la ligne de commande.Regardez les étapes suivantes.

- installation de nodejs, téléchargement de nodejs à l'adresse suivante: < https: / / nodejs.org / en >

- installation d'outils layacmd.Http: / / www.npmjs.com / package / layacmd

Ici, j 'utilise le système Win.Ouvre la fenêtre CMD et commande d 'entrer la ligne NPM install layacmd - G.

Cet outil de ligne de commande offre de nombreuses fonctions, dont la compilation, la publication, l 'exportation de ressources, la création de serveurs statiques, etc., et le Programme d' enseignement correspondant peut se référer au programme thématique layacmd.Les fonctions de gestion des ressources sont décrites ici.

- création d'un nouveau projet layaair.Nous prenons ici l'exemple de la langue as.

Puis entrer dans le répertoire H5, créer un nouveau dossier res et placer toutes les ressources dans le répertoire res, où nous ajoutons peu à peu quelques ressources.Nous ajoutons ici un dossier audio dans lequel un fichier audio a.mp3, un dossier IMG dans l 'extérieur et une image 1.png.

Ouvrez la ligne de commande sous le répertoire bin / H5 et saisissez la ligne de commande`layacmd resourceVersion -i res -o . -n 1.0.0`".Ici - I représente le trajet de ressource, O. représente le trajet de sortie de la ressource de version comme le trajet actuel, bien que l 'développeur puisse définir lui - même le trajet de sortie, par exemple définir le chemin comme le dossier de version, etc., et n - 1.0.0 la version initiale est 1.0.Nous avons vu des fichiers et des dossiers générés.Figure:



  ![1](img/1.png)

1.0.0 dossier contenant les ressources de la version 1.0.`.record`Le fichier enregistre les informations MD5 du fichier.`manifest.json`Numéro de version des ressources enregistrées dans le fichier.

Voir ci - dessous comment l 'appliquer dans le programme.



  
```java

  package
  {
      import laya.net.Loader;
      import laya.net.ResourceVersion;
      import laya.utils.Handler;
      
      public class Main
      {
          //设置资源配置文件的地址，我这里加了随机参数，保证每次加载的都是最新的。
          private var configUrl:String ="manifest.json?"+Math.random();
          public function Main()
          {
                Laya.init(500,500);
                ResourceVersion.enable(configUrl,Handler.create(this,this.completeHandler));
          }
          private function completeHandler(e:Object):void
          {
             Laya.loader.load([{"url":"res/sound/a.mp3","type":Loader.BUFFER}],Handler.create(this,loadSound));
          }
          private function loadSound():void
          {
              var obj:Object = Laya.loader.getRes("res/sound/a.mp3");
              
          }
          
      }
  }
  ```


Après l'initialisation du moteur, la première chose à faire est de le charger.`manifest.json`Ce document.Le moteur fournit un procédé correspondant pour activer la gestion de version.

`ResourceVersion.enable`Ce procédé permet d 'acheminer le fichier manifest.json, et la classe resourceversion modifie le procédé url.customformat.Le numéro de la version de la ressource dans manifest.json correspond à celui de la ressource pendant le chargement.La logique officielle de notre projet commence après le chargement du document manifest.json.

Nous chargeons un fichier audio dans la logique du projet.Compiler le code d 'exécution.Ouvrez la console de Google.Regardez les informations du fichier chargé.Figure:

![2](img/2.png)

Je vois le chargement.`1.0.0/res/sound/a.mp3`Ressources dans le dossier.Nous ajoutons une ressource pour créer un nouveau document texte.Appelé data.data.À insérer dans le document RES / data / data.data.Chargez le code suivant:


```java

package
{
    import laya.net.Loader;
    import laya.net.ResourceVersion;
    import laya.utils.Handler;
    
    public class Main
    {
        
        private var configUrl:String ="manifest.json?"+Math.random();;
        public function Main()
        {
              Laya.init(500,500);
              ResourceVersion.enable(configUrl,Handler.create(this,this.completeHandler));
              
        }
        private function completeHandler(e:Object):void
        {
           var obj:Object = Laya.loader.getRes(configUrl);
           var data:Array =[
               {"url":"res/sound/a.mp3","type":Loader.BUFFER},
               {"url":"res/data/data.data","type":Loader.TEXT}
           ]
           Laya.loader.load(data,Handler.create(this,resComplete));
        }
        private function resComplete():void
        {
            
        }
        
    }
}
```




Compilez le code ci - dessus et ouvrez le gestionnaire de Google pour voir le chemin de chargement.

![3](img/3.png)
Nous avons ainsi pu constater que nos ressources sont toujours placées sous le catalogue des res au moment de l 'élaboration du modèle, et que lorsque la version officielle est publiée, nous utilisons l' outil de ligne de commande pour gérer la version.

​

Nous saisissons la commande dans la ligne de commande, si nous la définissons comme la version 1.0`layacmd resourceVersion -i res -o . -n 1.0.0`À la fin de l'exécution, sur la page mise à jour:

![4](img/4.png)
On a trouvé que les ressources du dossier 1.0.0 avaient été chargées.

Il s'agit d'une augmentation des ressources, et si elles sont modifiées?Il suffit d 'ajouter un numéro à la version.Par exemple, nous modifions le contenu de data.data.Et après, on publie.

`layacmd resourceVersion -i res -o . -n 1.0.1`Exécution.Le chargement est ensuite mis à jour.

![5](img/5.png)

​**Le document a.mp3 n 'a pas été modifié et il chargera les ressources du dossier 1.0.0.**

Résumé

Nous voyons donc que nous pouvons modifier le numéro de la version publiée dès que nous disposons des ressources nécessaires pour le modifier.Cela permet de charger des ressources dans le dossier correspondant.La version enregistrée dans le fichier manifest.json est modifiée.