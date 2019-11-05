#Rendu graphique

### **Optimisation de Sprite**

Réduire au minimum le nombre d'embouteillages superflus et de Sprite.

Dans la mesure du possible, les objets d 'une zone non visible sont retirés de la liste d' affichage ou configurés visible = False.

Pour les emballages contenant un grand nombre de contenus statiques ou des éléments qui ne changent pas souvent (par exemple, boutons), il est possible d'installer des propriétés de casheas sur l'ensemble du récipient, ce qui permet de réduire sensiblement le nombre de Sprite et d'améliorer sensiblement les performances.S' il y a un contenu dynamique, il est préférable de le séparer du contenu statique afin de ne Mémoriser que le contenu statique.

Un traitement non rendu est effectué à l'intérieur du panel pour les sous - objets directs hors de la zone Panel (les sous - objets des sous - objets ne sont pas jugés) et les sous - objets situés au - delà de la zone Panel ne produisent pas de consommation.

​

### **Optimisation de drawcall**

La mise en place de casheas pour les contenus statiques complexes permet de réduire considérablement le nombre de drawcall et l'utilisation de casheas est essentielle à l'optimisation du jeu.

Veiller à ce que l'ordre de présentation des images soit le plus proche possible de celui de l'Atlas, ce qui accroîtrait le nombre de drawcall si les différentes images étaient présentées en parallèle.

Veiller à ce que toutes les ressources du même panneau soient utilisées en un seul Atlas, ce qui réduirait le nombre de lots soumis.

​

### **Optimiser Canvas**

Dans l'optimisation des canvas, nous devons veiller à ne pas utiliser les casheas:

Un objet très simple, tel qu 'un mot ou une image, est défini par le cacheas = "bitmap" non seulement pour améliorer les performances mais aussi pour en réduire les performances.
Lorsque le contenu du conteneur varie régulièrement, par exemple lorsqu'il contient une animation ou un compte à rebours, il perd sa performance s'il est placé à nouveau dans le conteneur avec un casheas = "bitmap".

On peut déterminer si la mémoire cache Canvas est constamment mise à jour en consultant la première valeur des informations statistiques Canvas.

### **En ce qui concerne les cas**

Le système cashea permet de mémoriser l 'objet affiché en tant qu' image statique, lorsque le Sous - objet change, il est automatiquement réinscrit et il peut également appeler manuellement le procédé recache pour mettre à jour le cache.Il est recommandé que les éléments complexes qui ne changent pas souvent soient stockés en cache sous forme d 'images statiques, ce qui améliore considérablement les performances de rendu, car ils ont "none", "normal" et "bitmap".

Par défaut "none", sans mémoire cache.
Lorsque la valeur actuelle est « normal », le tampon de la toile est placé sous Canvas et le tampon de commande en mode webgl.
Lorsque la valeur actuelle est « bitmap », la mémoire cache de toile continue d'être utilisée dans le cas des Canvas et la mémoire cache de randertarget est utilisée dans le modèle webgl.Il convient de noter ici que le mode de mise en mémoire cache reddertarget sous webgl a une limite de taille de 2 048 et que le dépassement de 2 048 entraînera des frais supplémentaires de mémoire.En outre, les frais de redémarrage sont plus élevés, mais diminuent le drawcall et la performance de rendu est la plus élevée.Le mode mémoire cache de commande de webgl ne fait que réduire l 'encombrement du noeud et le tissu de commande, et ne diminue pas le drawcall et les performances moyennes.

Après l 'établissement de la case, il est également possible d' établir staticcache = True pour empêcher la mise à jour automatique de la mémoire cache et d 'appeler manuellement le procédé recache pour mettre à jour la mémoire cache.

Les casheas améliorent leurs performances principalement par deux moyens.Le premier consiste à réduire l 'historique et le calcul du point culminant des noeuds et le second à réduire le nombre de drawcall.L 'usage optimal des casheas sera un moteur d' optimisation des performances.

Dessine 10 000 textes (10 000 selon les performances informatiques):


```javascript

Laya.init(550,400,Laya.WebGL);
Laya.Stat.show();
var textBox = new Laya.Sprite();
for(var i=0;i<10000;i++){
    txt=new Text();
    txt.text=(Math.random()*100).toFixed(0);
    txt.color="#CCCCCC";
    txt.x=Math.random()*550;
    txt.y=Math.random()*400;
    textBox.addChild(txt);
}
Laya.stage.addChild(textBox);
```


On trouvera ci - après une carte de l 'heure de fonctionnement sur l' ordinateur de l 'auteur, le FPS se stabilise en haut et en bas de 52.

![1](img/1.png)< / BR >

(Figure 1)

Lorsque nous avons placé le conteneur dans lequel est situé le texte en casheas, les performances sont considérablement améliorées, comme le montre l 'exemple ci - dessous, le FPS atteignant 60 trames.


```javascript

//...省略其他代码...
var textBox=new Laya.Sprite();
textBox.cacheAs="bitmap";
//...省略其他代码...
```


![2](img/2.png)< / BR >

(Figure 2)

### **Description du texte**

Lors de l 'exécution, le texte qui définit le bord de description appelle une instruction de dessin de plus que le texte qui n' en a pas.Le texte est alors proportionnel à l 'utilisation de CPU et au nombre de textes.Il est donc possible de recourir à d'autres solutions pour répondre aux mêmes besoins.

• pour le contenu du texte, qui est pratiquement inchangé, on peut utiliser le système cacheas pour réduire la consommation de performances, voir « Graphic Display - on cacheas ».

• Les caractères bitmap peuvent être sélectionnés pour les champs de texte où le contenu varie souvent, mais où les caractères sont moins nombreux.

### **Passer la mise en page de texte**

Dans la plupart des cas, de nombreux textes n'ont pas besoin d'une mise en page complexe et ne présentent qu'une seule ligne.Pour répondre à cette demande, Text propose un procédé appelé changetext qui permet de passer directement de la mise en page.


```javascript

var txt=new Laya.Text();
txt.text="text";
Laya.stage.addChild(txt);
//后面只是更新文字内容，使用changeText能提高性能
txt.changeText("text changed.");
```


Text.changetext modifie directement la dernière directive de dessin du texte dans l 'instruction de dessin, qui est toujours en vigueur, ce qui peut conduire à changer text uniquement dans les cas suivants:

• Il n'y a toujours qu'une ligne dans le texte.

• Le style du texte demeure inchangé (couleur, épaisseur, italique, alignement, etc.).

Néanmoins, ces besoins continuent d'être fréquemment utilisés dans la programmation.