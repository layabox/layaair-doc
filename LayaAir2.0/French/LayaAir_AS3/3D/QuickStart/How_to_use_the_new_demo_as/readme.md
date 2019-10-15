#Comment utiliser le Demo téléchargé sur Internet

De nouveaux exemples officiels ne seront publiés qu'une fois que tous les nouveaux exemples auront été testés et testés.Les exemples utilisés dans le nouveau document ne peuvent donc pas être consultés directement sur l 'exemple de l' Internet officiel pour le moment.

Pour résoudre ce problème à titre provisoire, les autorités joindront l'adresse GIT du code source à l'utilisation du nouvel exemple, ce qui nécessitera la configuration de l'adresse de l'émetteur.

Le document sera mis à jour de manière synchrone après la publication officielle du nouvel exemple.

On expliquera ici comment le Demo téléchargé est utilisé (si vous savez comment l 'utiliser peut passer directement par le document).

**TIP:**Il est recommandé que l 'exemple téléchargé par l' développeur continue d 'utiliser un élément.Il n 'est donc pas nécessaire de modifier l' adresse de ressource à plusieurs reprises.Liste des sources d 'adresses de ressources utilisées dans l' exemple:[资源地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)".

On l'utilise ici.**Base graphique**Exemple ([地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/as/LayaAir3D_Sprite3D/TransformDemo.as%3E)).

Après avoir obtenu le Code, ouvrez l 'élément d' exemple créé par l 'IDE.Nous mettons les ressources téléchargées en place.`bin/res`Table des matières

[] (IMG / 1.png) <br > (Figure 1)

Et puis...`src/script`Crée un nouveau fichier sous le dossier.Attention au nom.`地址中复制`".Ici, ça s'appelle transformdemo.

[] (IMG / 2.png) <br > (Figure 2)

Copier le Code copié`git`Les fichiers obtenus par clonage peuvent être placés directement sous ce dossier.Bien sûr, il y a beaucoup d 'erreurs à ce stade.

[] (IMG / 3.ping) <br > (Figure 3)

Comme si ce n 'était que le nom actuel du paquet, il suffit de le remplacer par le nom correct.Nom du sac`script`".

[] (IMG / 4.png) <br > (Figure 4)

Il y aura une erreur.

[] (IMG / 5.png) <br > (Figure 5)

La solution simple consiste à annoter directement la ligne pour qu 'elle fonctionne directement.Ce script est un script mobile de caméra, un exemple qui permet à un utilisateur d 'observer de divers points de vue.W mouvement en avant, s en arrière, a à gauche, D à droite, le bouton gauche de la souris appuie sur le bouton gauche pour ajuster l 'angle de la caméra

Ou on l'a trouvé sous le dossier Common.`CameraMoveScript.as`Copie.

[] (IMG / 6.png) <br > (Figure 6)

À la fin, il suffit de réécrire.`Main.as`Le fichier permet d 'exécuter l' exemple.Etant donné que la Demo est amorcée avec une variété de bandes, la logique de main peut être supprimée directement.Voyons ce qui a été modifié.


```typescript

package {
	import script.TransformDemo;

	public class Main {
		public function Main() {
			var transformDemo:TransformDemo = new TransformDemo();
		}
	}
}
```


Et le F5 fonctionne pour voir les effets.

[] (IMG / 7.png) <br > (Figure 7)

**Pour ajouter de nouveaux exemples, il suffit de continuer à ajouter un code d 'exemple sous le dossier script, puis d' utiliser le main pour le relever.**