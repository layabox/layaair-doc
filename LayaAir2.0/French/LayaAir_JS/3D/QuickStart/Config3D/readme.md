#Présentation

###### *version :2.2.0  Update:2019-8-24*

###Config3d

Cette catégorie est utilisée pour créer des paramètres d 'initialisation 3D

124 attributs d 'architecture \ \ \ \ \ \ \ \ \ \ \ \ \ \ \
124 -----------------------------------------------------------------------------------------------------------------------------------
124 tisanias \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\
La toile est - elle transparente?
124. Est - ce que les toiles sont pré - multipliées par 124 par Boolean \ \ 124
124, Stencil \ \ 124, \ \ 124, \ \ 124, \ \ 124 \ \ 129 \ \ 129 \ \ 129
124... Est - ce que les huit arbres sont coupés... 124... 124...
124 \ \ octreeinitialsize \ \ \ 124 \ \ \ \ 124 \ \ \ \ \ \ \ 124 \ \ 124 \\\
124ème octreeinitialcenter \ \ 124c4c4c4c124c124c124c124c4c124c4c4c2o2o3 (0,0,0)
124, octreeminonodesize \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \\\\
124 \ \ Octree Looseness \ \ \ 124 \ \ \ 8chênes \ \ 4chênes \ \ number \ \ 124 \ \ 1.25 \ \ 124 \
124 couteau debugfrustumculing \ \ 124 \ \ si le cône optique est activé \ \ 124 \ \ Boolean \ \ 124 \ \ 124springs

**Attention au cône.**

Si l 'on ouvre le découpage de l' arbre à huit branches, le boîtier entourant le noeud de l 'arbre à huit branches de haut niveau sera dessiné à l' aide de pixels rouges.Si le cône optique contient entièrement le noeud de l 'arbre à huit fourchettes, le noeud de l' arbre à huit fourchettes entoure le boîtier et le boîtier à elfes devient bleu.Les lignes de pixels qui ne contiennent pas tous les noeuds d 'arbre octave calculeront une couleur en fonction de la profondeur.La cartouche d 'encerclement de fées correspond à la couleur de la cartouche d' encerclement du noeud d 'arbre d' octave, mais le noeud d d 'arbre d' octave entoure la ligne de pixels de la cartouche de manière translucide.

[] (IMG / 1.png) <br > (Figure 1) cisaillement d 'arbres à huit fourchettes

Si vous n 'ouvrez pas la coupe de l' arbre à huit branches, vous utiliserez une ligne verte de pixels pour dessiner la boîte de filature.

[] (IMG / 2.png) <br > (fig. 2) pas de cisaillement d 'arbre à huit fourchettes

> Method > detail


 `defaultPhysicsMemory`Mémoire d 'initialisation de fonctions physiques, unité m.

Attention: la mémoire doit être supérieure à 16 M.

​**Implementation**

Public function set - defaultphysicsmemory (Value: int): void

Public function get - defaultphysicsmemory (): int



###Comment configurer config3d

Une fois que les paramètres requis ont été définis, utilisez lors de l 'initialisation laya3d.


```typescript

//创建一个config3D
var _config:Config3D = new Config3D();
//设置不开启抗锯齿
_config.isAntialias = false;
//设置画布不透明
_config.isAlpha = false;
//使用创建的config3d
Laya3D.init(0, 0, _config);
```


**Attention: config3d ne peut pas être modifié une fois que les paramètres sont prêts.Il faut le mettre en place dès le début.**