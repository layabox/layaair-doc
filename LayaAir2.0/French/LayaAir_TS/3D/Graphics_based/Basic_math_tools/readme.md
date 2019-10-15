#Layaair3d Basic Mathematics Tool

Après les coordonnées, voici quelques outils mathématiques couramment utilisés en 3D.(les exemples cités dans ce chapitre sont des exemples de projets qui commencent rapidement)

**Vecteur**

​**Vector2**Vecteur bidimensionnel**Vector3**Vecteur 3D**Vector4**Les vecteurs quadridimensionnels, très souvent utilisés dans le moteur layaair 3D, sont visibles partout, depuis les vecteurs bidimensionnels jusqu 'aux vecteurs quadridimensionnels.L 'utilisation la plus élémentaire est celle qui est utilisée dans l' exemple pour attribuer des valeurs.

Les transformations du Mouvement, de la rotation, de l 'agrandissement, etc., d' objets 3D dans le Code utilisent vector3 comme valeur d 'attribution de ses coordonnées axiales X, y et Z.Utiliser plus en détail[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Vector3)".

**Couleur**

Ainsi, les valeurs du vecteur tridimensionnel représentent les couleurs R, G et B respectivement, rouge, vert et bleu.Dans d 'autres endroits, le vecteur quadridimensionnel est utilisé comme paramètre de couleur et la valeur W de vector4 représente la valeur Alpha.Dans le moteur layaair 3D, la valeur maximale des trois couleurs est de 1, est définie en pourcentage, plus la valeur globale est grande, plus la couleur est claire, plus la couleur est sombre, si la valeur dépasse 1 produit un effet d 'exposition.

En ce qui concerne les couleurs que le rouge, le vert et le bleu peuvent combiner, les débutants peuvent consulter les concepteurs de jeux, tels que le rouge et le vert jaune, le rouge et le bleu violet, etc.

Dans l 'exemple, les codes suivants utilisent des vecteurs comme valeurs de couleur:


```typescript

	//设置方向光的颜色
	directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
```


**Quaternion (Quaternion)**

Le quaternaire est utilisé pour calculer la rotation à layaair.Ils sont calculés de manière compacte et efficace, ne sont pas gênés par le verrou d 'articulation et peuvent être facilement et rapidement interpolation sphérique.

L'utilisation des quaternaires peut être comprise par les intéressés eux - mêmes.Ici, seulement[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Quaternion)".

**Boîtier entouré (boundbox)**

L 'algorithme de cartouche d' encerclement est un procédé permettant d 'optimiser l' encerclement de l 'espace au moyen d' un ensemble de points de dissolution, l 'idée de base étant de remplacer approximativement un objet géométrique complexe par une géométrie de volume légèrement plus grand et présentant des caractéristiques simples (appelée cartouche d' encerclement).Layaair3d supporte les boîtes encerclées dans la boîte de support 3, plus de détails d 'interface peuvent être consultés[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.BoundBox)".

**Matrice (Matrix)**

La matrice est un ensemble de nombres pluriels ou réels disposés selon la matrice rectangulaire.Appui dans layaair3d**Matrice 3x3[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix3x3)- Oui.**Et**Matrice 4x4[API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.math.Matrix4x4)- Oui.**Deux matrices.

**Ray**

Le rayon est un type de données, pas un objet d 'affichage.**Original Origin**Et**Direction**Deux propriétés.

![图](img/1.png)< br > (Figure 1)
