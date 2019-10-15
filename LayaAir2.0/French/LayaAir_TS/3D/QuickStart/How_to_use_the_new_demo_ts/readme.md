#Comment utiliser le Demo téléchargé sur Internet

De nouveaux exemples officiels ne seront publiés qu'une fois que tous les nouveaux exemples auront été testés et testés.Les exemples utilisés dans le nouveau document ne peuvent donc pas être consultés directement sur l 'exemple de l' Internet officiel pour le moment.

Pour résoudre ce problème à titre provisoire, les autorités joindront l'adresse GIT du code source à l'utilisation du nouvel exemple, ce qui nécessitera la configuration de l'adresse de l'émetteur.

Le document sera mis à jour de manière synchrone après la publication officielle du nouvel exemple.

On expliquera ici comment le Demo téléchargé est utilisé (si vous savez comment l 'utiliser peut passer directement par le document).

**TIP:**Il est recommandé que l 'exemple téléchargé par l' développeur continue d 'utiliser un élément.Il n 'est donc pas nécessaire de modifier l' adresse de ressource à plusieurs reprises.Liste des sources d 'adresses de ressources utilisées dans l' exemple:[资源](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)".

On l'utilise ici.**Base graphique**Exemple ([地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/ts/LayaAir3D_Sprite3D/TransformDemo.ts%3E)).

Après avoir obtenu le Code, ouvrez l 'élément d' exemple créé par l 'IDE.Nous mettons les ressources téléchargées en place.`bin/res`Table des matières

[] (IMG / 1.png) <br > (Figure 1)

Et puis...`src/script`Crée un nouveau fichier sous le dossier.Attention au nom.**Copie dans l 'adresse**".Ici, ça s'appelle "transformdemo.ts".

[] (IMG / 2.png) <br > (Figure 2)

Copier le Code copié`git`Les fichiers obtenus par clonage peuvent être placés directement sous ce dossier.Bien sûr, il y a beaucoup d 'erreurs à ce stade.

Définissez d 'abord un export par défaut pour transformdemo.


```typescript

export default class TransformDemo
    
    ///同时需要注释掉最顶层的
    // new TransformDemo();
```


On a trouvé une autre erreur.

[] (IMG / 3.ping) <br > (Figure 3)

La solution simple consisterait à supprimer directement la ligne et la figure 4, ce qui permettrait d'exécuter directement.Ce script est un script mobile de caméra, un exemple qui permet à un utilisateur d 'observer de divers points de vue.W) d éplacement en avant, s en arrière, a à gauche, D à droite et le bouton gauche de la souris appuie sur le bouton gauche pour ajuster l 'angle de vue.

[] (IMG / 4.png) <br > (Figure 4)

Ou on l'a trouvé sous le dossier Common.`CameraMoveScript.ts`Copier à`scrpit/common`Sous le dossier.

[] (IMG / 5.png) <br > (figure)

À la fin, il suffit de réécrire.`Main.ts`Le fichier permet d 'exécuter l' exemple.Etant donné que la Demo est amorcée avec une variété de bandes, la logique de main peut être supprimée directement.Voyons ce qui a été modifié.


```typescript

import TransformDemo from "./script/TransformDemo";
class Main {
	constructor() {
		new TransformDemo();
	}

}
//激活启动类
new Main();
```


Et le F5 fonctionne pour voir les effets.

[] (IMG / 6.png) <br > (Figure 6)

**Pour ajouter de nouveaux exemples, il suffit de continuer à ajouter un code d 'exemple sous le dossier script, puis d' utiliser le main pour le relever.**