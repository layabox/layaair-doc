# LayaAir3D之动画二

Dans ce chapitre, nous continuerons de présenter la production et l 'utilisation d' animations matérielles et rigides, qui sont très largement utilisées dans les effets spéciaux du jeu 3D.

###Animation de matériaux

L 'animation squelettique est produite principalement par modification du Sommet du modèle, tandis que l' animation de matériau est réalisée par modification de la couleur et de l 'image du matériau.

Dans un logiciel tridimensionnel, par exemple dans les 3ds Max, une animation associée au matériau peut être produite, mais lorsque le format Fbx est exporté, l 'Unity ne peut ni identifier ni exporter l' animation du matériau identifiée par le moteur layaair 3D.L'animation matérielle du modèle de jeu doit donc être produite dans l'unité et certains paramètres doivent être exportés avant d'être utilisés pour le moteur layaair 3D.

On décrit ci - dessous l 'effet de l' animation en matériau de néon (fig. 1) pour créer et exporter l 'animation dans l' Unity, comme suit.

![1](img/1.gif)(Figure 1) < / BR >



###Importer un modèle, modifier le type de matériau

Les boîtiers de climatisation et les bandes de néon fabriqués dans 3ds Max sont exportés vers Fbx et importés dans unty (les développeurs peuvent essayer de produire et d 'exporter des animations de matériaux dans 3ds Max, et ils peuvent trouver qu' ils ne peuvent pas être lus à l 'Unity).

Dans la vue d 'entrée de traction, sélectionnez le modèle d' animation à produire pour modifier le matériau dans l 'interface droite, le type Shader étant le type Particle coloration parties / additive (pour l' instant, seules les animations de ce type de matériau sont prises en charge et les autres types de shader sont temporairement mal informés).

![2](img/2.png)(图2)</br>







###Création d 'animation de matériaux

Après avoir modifié le type de matériau, sélectionnez également le modèle à utiliser pour produire l 'animation, cliquez sur l' animation dans la barre de menu Window pour ouvrir l 'interface d' édition de l 'animation, raccourcis clavier Ctrl + 6.

Cliquez sur le bouton create pour créer et renommer une animation appelée uvanimation dans le cas présent, après enregistrement, un fichier d 'animation est généré dans le gestionnaire de ressources.

Sélectionnez le temps sur l 'axe temporel, modifiez la direction X de l' attribut UV offset du matériau, ajustez la position UV une fois par 0,05 secondes (l 'équivalent d' une largeur de 25% déplacée à gauche du diagramme) pour voir que le matériau du modèle de néon a changé, ajusté successivement dans le temps pour former un anneau de guidage d 'animation.

Modifier la courbe de la trame d 'animation, par défaut comme l' animation coulissante linéaire, ne correspond pas à nos besoins d 'animation, de modifier en quantité constante, la lecture, le matériau d' animation conformément à la demande.Bien entendu, les animations flottantes et fluidiques peuvent être faites de manière linéaire.

**Tips: l 'animation de matériaux peut également être réalisée à l' aide du type standard standard Shader, mais notez que si des attributs non supportés par layaair apparaissent dans le cadre gauche de l 'interface d' édition d 'animation, tels que les attributs d' emission de matériaux, une erreur peut être signalée lors de l 'exportation de ressources, le bouton droit peut être enlevé et exporté normalement.**

Ces dessins animés sont pratiquement identiques à ceux qui sont produits dans les 3ds Max et peuvent être édités directement dans l'unité (fig. 3).

![3](img/3.gif)(Figure 3) < / BR >



###Créer un contrôleur d 'animation

Comme pour les commandes d 'animation créées précédemment, un contrôleur d' animation est créé dans le gestionnaire de ressources par le bouton droit, appelé uvaction, et le fichier d 'animation créé lors de l' étape précédente est traîné dans le Contrôleur d 'animation après un double clic.

Sélectionnez le modèle, faites glisser le Contrôleur d 'animation dans l' ensemble d 'animation du modèle, cliquez sur Unity pour voir que l' animation est diffusée en fonction de nos besoins (fig. 4).

![4](img/4.gif)Figure 4 < / BR >



###Exporter et utiliser des ressources d 'animation

Les ressources LH peuvent être téléchargées ou préchargées directement dans le projet en utilisant la méthode sprite3d.load () si elles sont copiées dans le catalogue H5 du projet sans erreur lors de l 'exportation.

L 'animation s' arrête après 2000 millisecondes (fig. 1).


```typescript

//创建加载材质动画模型
this.box = Laya.Sprite3D.load("LayaScene_uvAction/uvAction.lh");
//模型与材质、动画加载完成后回调
this.box.on(Laya.Event.HIERARCHY_LOADED,this,this.onLoadComplete);
scene.addChild(this.box);
//模型与材质加载完成后回调
private onLoadComplete():void{
  //获取模型上的动画组件
  this.ani = this.box.getChildAt(0).getComponentByType(Laya.Animator) as Laya.Animator;
  //动画2000毫秒后停止
  Laya.timer.once(2000,this,this.onLoop);
}
private onLoop():void{
	this.ani.stop();
}
```




###Animation rigide

L 'animation rigide, également connue sous le nom d' animation transformatrice, est une animation qui ne modifie ni le Sommet ni le matériau du modèle, mais qui ne fait que tourner, agrandir, déplacer le modèle, et qui est souvent utilisée dans le jeu, comme l 'anneau de pied, la lumière de couteau, etc.Bien entendu, l 'animation rigide et l' animation Material sont souvent combinées.

L 'animation rigide est également différente de l' animation matérielle, qui doit être produite dans l 'unité, faute de quoi l' animation rigide peut être produite dans un logiciel 3D et importée dans l 'Unity et reconnue.

Il est recommandé d 'éditer l' animation dans unty, l 'animation rigide en combinaison avec l' animation de matériaux, avec l 'animation particulaire, de meilleurs résultats, le logiciel 3D ne fournit que des modèles de base importés!

L 'effet d' animation rigide produit ci - dessous (fig. 5) fait appel à des matériaux différents pour chacun des quatre modèles, puis les modifications de rotation et de zoom du modèle produisent une animation.

![5](img/5.gif)(图5)</br>







###Animation de caméra

Les caméras layaair ne peuvent pas être exportées à l 'heure actuelle, et dans les versions futures, elles peuvent être exportées vers le moteur, de sorte que si une animation de caméra est produite dans l' unité, elle peut être utilisée dans le jeu.

Son procédé de production d 'animation dans l' Unity est compatible avec l 'animation rigide et peut modifier ses propriétés.Il en va de même pour le chargement.