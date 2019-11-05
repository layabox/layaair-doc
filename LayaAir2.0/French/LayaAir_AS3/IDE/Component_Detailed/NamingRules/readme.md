#Règles de nomenclature de ressources de composant

Dans layaairide, l 'éditeur identifie un composant correspondant en fonction du préfixe de ressources.Par exemple, le nom BTN ` U xxx sera identifié comme un bouton et le nom tab ` U xxx comme un composant Tab.

###Règles de désignation des composants de base:

On trouvera ci - après une liste des règles de correspondance (sans distinction de taille et de taille) des ressources du composant par défaut de l 'éditeur:

`Label`Composants (cadres de texte): Label u xxx;

`TextInput`Composants (cadres de saisie): input \ \ u xxx ou textinput \ \ u xxx;

`TextArea`Composants (champs de texte, bandes de roulement): Area \ \ u xxx ou textarea \ \ u xxx;

`Button`Composants (boutons): BTN \ \ u xxx ou button \ \ u xxx;

`CheckBox`Composants (cases à cocher): check \ \ u xxx ou checkbox \ \ u xxx;

`Radio`Composants (cases isolées): radio ou Radio \ \ u xxx;

`Tab`Composants (groupes d 'étiquettes): tab \ \ u xxx;

`RadioGroup`Composants (blocs de boutons de cases sélectionnés): Radio Group \ \ u xxx;

`VSlider`Composants (barres coulissantes verticales): vslider ou xxx;

`HSlider`Composants (barres coulissantes horizontales): hslider \ \ u xxx;

`Clip`Composants (segments Bitmap): clip \ \ u xxx;

`ProgressBar`Composants (barres de progression): Progress \ \ u xxx ou progressbar \ \ u xxx;

`ComboBox`Composants (cadres de glissière descendante): combo \ \ u xxx ou mbox \ \ u xxx;

`VScrollBar`Composants (barres de défilement verticales): vscroll \ \ u xxx ou vscrollbar \ \ u xxx;

`HScrollBar`Composants (barres à défilement horizontal): hscroll \ \ u xxx ou hsstrollbar \ \ u xxx;

`Image`Composants (composants graphiques): Image \ \ u xxx;

Tout ce qui n'est pas la règle est reconnu comme Sprite.

Voici l 'image de l' ensemble d 'exemples:

![1](img\1.png)(图1)


Affiche la correspondance dans le gestionnaire de ressources comme suit:

![2](img\2.png)(Figure 2)



###Composants spéciaux:

Les composants spéciaux nécessitent une pluralité d 'images, et les règles de nomenclature ajoutent $, sous réserve des règles ci - dessus, une distinction entre les trois principaux composants: scrollbar, progressbar et Slider.

Les règles de désignation des composants spéciaux sont indiquées dans le diagramme suivant:

![3](img\3.png)(图3)



![4](img\4.png)(Figure 4)

![5](img\5.png)(Figure 5)



###Ensemble contenant

Les assemblages de récipients (Box, list, Tab, Radio Group, viewstack, Panel, hbox, vbox, tree) peuvent être convertis par un raccourci Ctrl + B sans ressources de contrepartie par défaut.Comme le montre la figure ci - après:

![6](img\6.png)(图6)



