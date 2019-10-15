# 	关于官网下载的DEMO如何使用

De nouveaux exemples officiels ne seront publiés qu'une fois que tous les nouveaux exemples auront été testés et testés.Les exemples utilisés dans le nouveau document ne peuvent donc pas être consultés directement sur l 'exemple de l' Internet officiel pour le moment.

Pour résoudre ce problème à titre provisoire, les autorités joindront l'adresse GIT du code source à l'utilisation du nouvel exemple, ce qui nécessitera la configuration de l'adresse de l'émetteur.

Le document sera mis à jour de manière synchrone après la publication officielle du nouvel exemple.

On expliquera ici comment le Demo téléchargé est utilisé (si vous savez comment l 'utiliser peut passer directement par le document).

**TIP:**Il est recommandé que l 'exemple téléchargé par l' développeur continue d 'utiliser un élément.Il n 'est donc pas nécessaire de modifier l' adresse de ressource à plusieurs reprises.Liste des sources d 'adresses de ressources utilisées dans l' exemple:[资源](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)".

On l'utilise ici.**Base graphique**Exemple ([地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/js/LayaAir3D_Sprite3D/TransformDemo.js%3E)).

Après avoir obtenu le Code, ouvrez l 'élément d' exemple créé par l 'IDE.Nous mettons les ressources téléchargées en place.`bin/res`Table des matières

[] (IMG / 1.png) <br > (Figure 1)

Et puis...`src/script`Crée un nouveau fichier sous le dossier.Attention au nom.`地址中复制`".Ici, ça s'appelle transformdemo.js.

[] (IMG / 2.png) <br > (Figure 2)

Et ensuite, on le donne.`TransformDemo`Ajouter un type d 'Export par défaut pour faciliter la référence ailleurs.


```javascript

export default class TransformDemo
//注意注释掉本js底端的这段代码
//new TransformDemo();
```


`CameraMoveScript`Ce script est un script de fonctionnement d 'une caméra conçu pour faciliter l' observation de l 'exemple par l' développeur.W d éplacement en avant, S arrière, a à gauche, D à droite, maintenez le bouton gauche et faites glisser la souris pour ajuster l 'angle de vue**Camera script**".Sinon, il suffit d'une note directe.(script de caméra directement annoté)

[] (IMG / 3.ping) <br > (Figure 3)

Il suffit de réécrire.`Main.js`Le fichier permet d 'exécuter l' exemple.Etant donné que la Demo est amorcée avec une variété de bandes, la logique de main peut être supprimée directement.Voyons ce qui a été modifié.


```typescript

import TransformDemo from "./script/TransformDemo"
class Main {
	constructor() {
		new TransformDemo();
	}
}
//激活启动类
new Main();
```


Et le F5 fonctionne pour voir les effets.

[] (IMG / 4.png) <br > (Figure 4)

##Utiliser un script de caméra

Pour utiliser un script de caméra, il faut placer le dossier Common.`CameraMoveScript.js`Copier le script de la caméra`script`Dans le catalogue, une classe D 'Export par défaut est définie pour le script de caméra.


```typescript

export default class CameraMoveScript extends Laya.Script3D
```


[] (IMG / 5.png) <br > (Figure 5)

Et on est là.`TransformDemo`Introduction`CameraMoveScript`".


```javascript

import CameraMoveScript from "./CameraMoveScript"
export default class TransformDemo{
    //....省略
}
```


Après l 'ajout, le commentaire est ouvert pour être testé.

**Pour ajouter de nouveaux exemples, il suffit de continuer à ajouter un code d 'exemple sous le dossier script, puis d' utiliser le main pour le relever.**