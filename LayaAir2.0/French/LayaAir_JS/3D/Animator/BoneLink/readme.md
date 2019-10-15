#Point d 'accrochage d' animation

###### *version :2.1.0beta   Update:2019-6-13*

La technologie des points d 'ancrage osseux est très courante dans les jeux en 3D, par exemple lorsque les armes changent avec les mains du personnage, alors on peut relier l' arme à l 'os supérieur de la main et l' arme en tant que noeud secondaire de l 'ossature manuelle, qui peut naturellement évoluer avec Les mouvements de la main.

Bien entendu, les modèles 3D attachés peuvent également être retirés ou remplacés par des codes, ce qui permet d 'obtenir des fonctions de conversion d' armes ou d 'équipement, de monter, etc.

####1) Mise en place d 'un point de suspension osseuse dans l' Unity

Les points d 'accrochage osseux sont très faciles à installer dans l' Unity et peuvent être utilisés directement au niveau des ressources de la scène.Figure 1

Les objets à lier peuvent être soit un récipient en 3D, soit un modèle en 3D ajustant leur position, puis les glisser sous le squelette spécifié en tant que sous - étage et les attacher en tant que point d 'ancrage.

Parfois, nous avons besoin d'être désarmés dès le début, mais nous avons besoin d'être accrochés pour nous préparer à un changement ultérieur d'arme, alors nous pourrions également mettre un conteneur à noeuds vides, gameobject, et, le cas échéant, y ajouter différents modèles 3D ou plus.

[] (IMG / 1.png) <br > (Figure 1)

**Une fois que nos points d 'accrochage d' os sont installés, les os et les objets d 'accrochage sont automatiquement exportés vers les fichiers LS LS.**

####2) Mise en place d 'un point d' ancrage osseux dans le Code

La classe de composants d 'animation animator fournit deux exemples de procédés`linkSprite3DToAvatarNode()`Et`unLinkSprite3DToAvatarNode()`L 'ajout et la suppression de points accrochés peuvent être réalisés (figures 2 et 3).

Avant d 'ajouter l' animation osseuse, il faut que les beaux - arts donnent le nom des noeuds osseux associés.

[] (IMG / 2.png) <br > (Figure 2)

[] (IMG / 3.ping) <br > (Figure 3)

Les sections de codes spécifiquement utilisées sont sélectionnées parmi les exemples officiels et peuvent être consultées plus en détail: ([demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=BoneLinkSprite3D%3E)).

**Un modèle d 'animation squelettique - un module d' animation permettant d 'obtenir un modèle - crée un objet d' accrochage - relie le squelette et l 'objet d' accrochage par l 'intermédiaire de l' ensemble d 'animation après un clic de bouton.**

Cliquez sur l 'ajout d' un code pour un point d 'accrochage partiel dans un événement:


```typescript

//往场景上添加龙
this.scene.addChild(this.dragon1);
//将角色节点添加到龙的节点上
this.aniSprte3D1.addChild(this.role);
//关联精灵节点到Avatar节点
this.dragonAnimator1.linkSprite3DToAvatarNode("point", this.role);
//胖子播放骑乘动作
this.animator.play("ride");
//龙播放奔跑动作
this.dragonAnimator1.play("run");
//调整胖子的相对旋转，相对位移，以及缩放。
this.pangzi.transform.localRotation = this._rotation;
this.pangzi.transform.localPosition = this._position;
this.pangzi.transform.localScale = this._scale;
```


Cliquez sur le Code de retrait d 'une partie de l' événement:


```typescript

//将role从龙2的节点上移除
this.dragonAnimator2.unLinkSprite3DToAvatarNode(this.role);
this.aniSprte3D2.removeChild(this.role);
//移除龙2
this.dragon2.removeSelf();
//将role添加到场景上，同时播放hello动画
this.scene.addChild(this.role);
this.animator.play("hello");
```


[] (IMG / 4.gif) <br > (Figure 4)

