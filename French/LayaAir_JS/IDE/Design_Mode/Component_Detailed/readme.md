#Layaair Components and Components type

> les composants sont pratiquement partout dans les paramètres visuels de l 'ui, de l' animation, etc., de layaairide.Chaque composant possède un ensemble d 'attributs, de procédés et d' événements propres.L 'utilisation d' un composant permet de séparer la programmation de la conception d 'interface et d' améliorer la reproductibilité du Code.Une meilleure compréhension des composants améliore l 'efficacité du développement de l' IDE.



##Relation de succession d 'un composant

###1.1 groupement Composite

Les catégories de composants de layaairide se trouvent dans le sac laya.ui.**Tous les composants héritent directement ou indirectement de la classe component.**(matrices de composants).Cliquez sur la classification ui dans le document API du moteur layaair, comme le montre la figure 1.[laya.ui.Component类](http://layaair.ldc.layabox.com/api/index.html?category=UI&class=laya.ui.Component)".Vous pouvez visualiser la description API du composant correspondant.

![图1](img/1.png)< br / > (Figure 1)



###1.2 relation de succession de composants

La catégorie Sprite est la catégorie de récipients d 'objets affichés la plus élémentaire du moteur layaair.La classe Component est héritée de la classe Sprite, avec l 'ajout d' attributs de base communs, de procédés et d 'interfaces pour le composant, définissant des fonctions étendues telles que le cycle de vie du composant.

Groupes de base des composants, Box, button, clip, colorpicker, ComboBox, image, label, progressbar, scrollbar, Slider, tipmanager`laya.ui.Component`Sous - catégorieLa structure de succession du composant est indiquée dans la figure 2.

![图2](img/2.png)< br / > (Figure 2)

*Tips: Comme le montre la relation continue à la figure 2, la classe dialog de la page ui, qui est couramment utilisée dans l'IDE, a succédé à la catégorie View et la catégorie View à la catégorie box.D 'autres composants de relation de succession suggèrent de comprendre et de retenir*



##Classification des composants

Selon la structure et les fonctions du composant lui - même, le composant sous l 'enveloppe laya.ui peut être divisé en trois grandes catégories.Sont respectivement des ensembles d 'affichage, des ensembles de récipients et des ensembles de base.

###2.1 composants de base

L 'ensemble de base est l' élément le plus couramment utilisé dans l 'édition de page.Passer`资源管理器`Ou`组件库`Glissez - le dans l 'éditeur de scène pour une opération de visualisation.Oui.`属性设置器`Définit la valeur de ses attributs et affiche l 'effet d' affichage directement dans l 'éditeur de scène.

Les composants de base sont les suivants: Label, textinput, textarea, button, image, checkbox, radio, clip, progressbar, Slider, hslider, vslider, scrollbar, hscrollbar, vscrollbar, ComboBox.

*Tips: pour une description détaillée de ces éléments de base, on peut se référer à un document contenant une description détaillée des propriétés de ces éléments de base.*

###2.2 emballages

L 'ensemble contenant est formé à partir d' un ou de plusieurs éléments de base par conversion en récipient.On peut passer dans l'IDE.`Ctrl+B`Raccourcis clavier convertit un ou plusieurs éléments de base en ensembles de récipients.Voir figure 3.

![动图3](img/3.gif)< br / > (Figure 3)

Les emballages comprennent: box, list, Tab, Radio Group, viewstack, Panel, hbox, vbox, Tree, Sprite.

###2.3 ensembles d 'affichage

L 'ensemble de classe D' affichage est un récipient d 'objet affiché au niveau de la page.Dans le système ui de layaair, les pages sont utilisées pour afficher tous les composants d 'affichage, tandis que les composants d' affichage de layaair sont uniquement`View`Et`Dialog`".

### 