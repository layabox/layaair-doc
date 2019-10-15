#Optimisation de mémoire

Date de publication: 2016 - 12 - 30

### **Bassin d 'objet**

Réservoir d 'objet, ce qui implique la répétition continue d' objets.Crée un certain nombre d 'objets pendant l' application d 'initialisation et les stocke dans une cuve.Une fois l 'opération terminée sur un objet, l' objet est remis dans la cuve et peut être récupéré lorsque de nouveaux objets sont nécessaires.

En raison du coût élevé de l 'objet de mise à l' échelle, l 'utilisation de l' objet de réutilisation de la poêle d 'objets réduit la demande de l' objet de mise à l 'échelle.On peut également réduire les possibilités de fonctionnement du récupérateur d 'ordures, ce qui permet d' améliorer la vitesse de fonctionnement du programme.

La démonstration du code suivant`Laya.utils.Pool：`


```javascript

var SPRITE_SIGN = 'spriteSign';
var sprites = [];
function initialize()
{
    for (var i = 0; i < 1000; i++)
    {
        var sp = Pool.getItemByClass(SPRITE_SIGN, Sprite)
        sprites.push(sp);
        Laya.stage.addChild(sp);
    }
}
initialize();
```


Crée un réservoir d 'objets de taille 1000 dans l' Initialize.

Lorsque vous cliquez sur la souris, les codes suivants suppriment tous les objets affichés dans la liste et les réutiliseront lors d 'autres tâches ultérieures:


```javascript

Laya.stage.on("click", this, function()
{
    var sp;
    for(var i = 0, len = sprites.length; i < len; i++)
    {
        sp = sprites.pop();
        Pool.recover(SPRITE_SIGN, sp);
        Laya.stage.removeChild(sp);
    }
});
```


Après avoir appelé pool.recover, l 'objet spécifié est récupéré dans la piscine.



 



### **Utilisation de handler.create**

Dans le processus de développement, Handler est fréquemment utilisé pour effectuer des échéanciers asynchrones.Handler.create utilise la gestion de la Cellule d 'objet incorporée, de sorte que l' utilisation de l 'objet Handler doit être utilisée pour créer un processeur de retour.Le code suivant crée un processeur de retour chargé à l'aide du Code handler.create:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded));
```


Dans le code ci - dessus, Handler sera récupéré par la piscine de l 'objet après l' exécution de la régression.À ce stade, réfléchissez à ce qui va se passer avec le code suivant:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading));
```


Dans le code ci - dessus, l 'événement Progress est traité au moyen d' un processeur renvoyé par handler.create.L 'événement de Progress n' est déclenché qu 'une fois après l' exécution de la régression et les quatre paramètres appelés once doivent être définis comme étant false:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading, null, false));
```





 



### **Release Memory**

JavaScript ne peut pas démarrer le recycleur d 'ordures.Pour assurer la récupération d 'un objet, supprimez toutes les références à cet objet.La description fournie par Sprite aide à définir les références internes en null.

Par exemple, les codes suivants garantissent que les objets peuvent être récupérés comme déchets:


```javascript

var sp = new Sprite();
sp.destroy();
```



Lorsque l 'objet est NULL, il ne sera pas immédiatement supprimé de la mémoire.Le récupérateur de déchets ne fonctionne que si le système estime que la mémoire est suffisamment basse.La distribution de mémoire (et non la suppression d 'objet) déclenche la récupération des déchets.

La récupération des ordures peut absorber une grande quantité de CPU et influer sur les performances.Par réutilisation d 'objets, on tente de limiter l' utilisation de la récupération des ordures.En outre, la référence est réglée, dans la mesure du possible, sous forme de NULL, de sorte que le récupérateur d 'ordures passe moins de temps à rechercher l' objet.Dans certains cas (par exemple, lorsque les deux objets sont cités l 'un par l' autre), il n 'est pas possible d' installer simultanément deux références NULL, et le récupérateur de déchets balaie et efface les objets qui ne peuvent pas être accessibles, ce qui est plus consommable que les compteurs de référence.

### **Déchargement des ressources**

Le jeu s' effectue toujours avec beaucoup de ressources qui doivent être déchargées à temps après avoir été utilisées, sinon elles restent dans la mémoire.

L 'exemple suivant permet de comparer l' état des ressources avant et après le déchargement des ressources après le chargement:


```javascript

var assets = [];
assets.push("res/apes/monkey0.png");
assets.push("res/apes/monkey1.png");
assets.push("res/apes/monkey2.png");
assets.push("res/apes/monkey3.png");
  
Laya.loader.load(assets, Handler.create(this, onAssetsLoaded));
  
function onAssetsLoaded()
{
    for(var i = 0, len = assets.length; i < len; ++i)
    {
        var asset = assets[i];
        console.log(Laya.loader.getRes(asset));
        Laya.loader.clearRes(asset);
        console.log(Laya.loader.getRes(asset));
    }
}
```


### **V. sur les filtres, les masques**


Essayez de réduire au minimum l 'utilisation de filtres.Lorsque le filtre (blurfilter et glowfilter) est appliqué à l 'affichage d' un objet, deux bitmap sont créés dans la mémoire.Chaque bitmap a la même taille que l 'objet affiché.Crée le premier bitmap comme une version de grillage d 'un objet d' affichage, puis pour générer un autre bitmap d 'un filtre d' application:

​![图片1.png](img/1.png)< br / >
(Figure 1)

Deux bitmap dans une mémoire d 'application de filtres

Lorsque vous modifiez une propriété du filtre ou un objet d 'affichage, les deux bits de la mémoire sont mis à jour pour créer les bits générés, qui peuvent absorber une grande partie de la mémoire.En outre, ce procédé consiste à calculer l 'unité centrale et à réduire les performances lors de la mise à jour dynamique.

Colorfiter doit calculer chaque point de pixel sous le rendu canvas, alors que la consommation de GPU sous webgl peut être négligeable.

Dans la mesure du possible, on utilise des bitmap créés par l 'outil de création d' images pour simuler des filtres.En évitant de créer des bitmap dynamiques pendant l 'exécution, on peut aider à réduire la charge CPU ou GPU.En particulier, une image qui utilise un filtre et ne peut pas être modifiée.

###  **Autres stratégies d 'optimisation**

Réduire la quantité de particules utilisées et, en mode Canvas pour les plates - formes mobiles, réduire au minimum leur utilisation;
Dans le modèle canvas, l'utilisation de propriétés telles que la rotation, l'échelonnement, l'alpha, etc., qui consomment les performances, est réduite au minimum.(le modèle webgl est disponible);
Ne crée pas d'objets ni de calculs complexes dans timeloop;
Réduire au minimum l'utilisation de l'autosize pour les conteneurs et l'utilisation des getbounds () car ces appels produisent des calculs plus nombreux;
Réduire au minimum l 'utilisation de la fonction try - catch et l' exécuter très lentement;