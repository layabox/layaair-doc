#Utilisation de scripts supplémentaires

C'est souvent le cas lors de l'élaboration de projets; les composants fournis officiellement ne répondent pas à la demande, par exemple pour ajouter de nouveaux attributs et pour les adapter dans l'IDE.Après la version layaairide1.4.0, deux scénarios sont proposés: un script étendu et un script supplémentaire.

​**Extension de script**De manière héritée, on étend la fonction d 'un composant, on réalise sa propre logique, voire on ajoute de nouvelles propriétés, on affiche de nouvelles propriétés dans l' IDE et on peut visualiser de nouvelles propriétés.

​**Script supplémentaire:**De manière non successorale, de nouvelles caractéristiques sont ajoutées à un composant, de nouvelles propriétés sont ajoutées, de nouvelles propriétés sont affichées dans l 'IDE et de nouvelles propriétés peuvent être visualisées.

Avec ce mode d 'extension, l' développeur peut modifier arbitrairement le comportement du composant, ajouter de nouvelles propriétés, visualiser une scène ui combinée au Code; plusieurs scripts d 'extension peuvent être ajoutés dans la même scène.

​**Distinction entre script étendu et script supplémentaire**Le script supplémentaire est un script qui commande le composant lui - même et qui modifie toute propriété du composant actif sans hériter.

**Cet article nous ajouterons un script unique à plusieurs composants pour leur permettre de se déplacer à des vitesses et à des noms différents, afin de décrire en détail la manière d 'utiliser le script supplémentaire.L 'effet final est indiqué dans la figure ci - dessous (le carton est le résultat d' un logiciel d 'enregistrement basé sur l' effet réel):**

![0](img\0.gif)(figure 0)

###Page UI

Crée une nouvelle page ui, appelée expandpage, sur laquelle est insérée un composant box, une image et un composant textuel, et nomme le nom de l 'ensemble texte usern en définissant sa taille et son alignement.Comme le montre la figure 1:

![1](img\1.png)(Figure 1)



###Créer un script extensible et ajouter une valeur à un composant

Dans la gestion de panneau Ui - créer un nouveau script, sélectionnez un script supplémentaire (vous pouvez sélectionner une colonne de script dans la création d 'une page ui), et la classe logique correspondante du script est le nom d' exécution suivant.Comme le montre la figure 2:

![2](img\2.png)(图2)


Cliquez sur le bouton de détermination pour créer automatiquement un fichier script dans le panneau du projet, qui contient des attributs usuels auxquels on peut se référer lorsqu 'on les ajoute, comme le montre la figure 3:

![3](img\3.png)(Figure 3)

Ajouter les attributs dont nous avons besoin dans l 'étiquette monkeyscript, comme le montre la figure 4:

![4](img\4.png)(Figure 4)

Lorsque l 'édition de script supplémentaire est terminée, l' interface ui est ouverte et, pour permettre à l 'développeur de voir les changements de façon plus visuelle, le box est copié dans l' interface ui, comme le montre la figure 5:

![5](img\5.png)(Figure 5)

Ensuite, le script monkeyscript produit est placé sur Box sous forme de traction, et nous découvrons qu 'un nouvel identificateur de composant est ajouté à l' intérieur du box, tandis que des informations d 'attribut du script supplémentaire apparaissent dans la barre d' attributs à droite.Figure 6

![6](img\6.gif)(Figure 6)

Dans les panneaux hiérarchiques, sélectionnez les valeurs de script monkeyscript pour les trois composants Speed et username, respectivement, et augmentez la vitesse de 1,2.3, respectivement appelées sous - catégories A, B et C; différentes valeurs d 'attribution sont également appliquées pour les propriétés des objets des trois ensembles identiques.Après enregistrement, appuyez sur le raccourci F12 (Ctrl + F12) pour exporter l 'ui et créer un code dans le Code.



###Coding Logic

Ouvre le fichier layaui.max.all.js en mode d 'édition de code et trouve une catégorie d' enregistrement à l 'intérieur.Comme le montre la figure 7:

![7](img\7.png)(Figure 7)

Ne vous inquiétez pas, car la classe logique correspondante du script Monkey script dans le projet doit être créée par le développeur lui - même, car l 'éditeur ne l' a pas encore trouvée, ce qui entraîne une erreur de présentation.

Ensuite, nous créerons une classe monkeyscript sous le paquet src / game (à défaut d 'un paquet de game, il faut d' abord créer un paquet de Game sous le catalogue SRC) dans laquelle les attributs supplémentaires dans le script élargi seront établis, tous les codes étant les suivants:

Il est nécessaire de définir les propriétés owner ou Target pour recevoir des références de composants vides.


```typescript

var game;
(function (game) {
    var MonkeyScript = (function () {

        function MonkeyScript() {
            /**攻击速度（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
            this.speed = 0;
            /**人物名称（也可以不用定义该变量，在这里定义是为了打开该类的时候能够一目了然的看到对应的脚本中添加了哪些属性）**/
            this.userName = "";
            /**记录状态**/
            this.boo = false;
        }
        /**
         *设置owner函数，可以直接获取到添加附加脚本的组件实例
         **/
        MonkeyScript.prototype = {
            set owner(value) {
                this.monkeyBox = value;
                //自定义的脚本会有时序问题，所以在此添加一个延时
                this.monkeyBox.frameOnce(2, this, this.onLoaded);
            }
        }
        MonkeyScript.prototype.onLoaded = function () {
            //通过子元素的name值获取该对象
            var userN = this.monkeyBox.getChildByName("userN");
            //设置文本内容为属性栏中给的值
            userN.text = this.userName;
            this.monkeyBox.frameLoop(1, this, this.onLoop);
        };
        /*
        设置帧循环，实现左右移动
        */
        MonkeyScript.prototype.onLoop = function () {
            if (this.monkeyBox.x <= 0) {
                this.boo = false;
                this.monkeyBox.x += this.speed;
            }
            else if (this.monkeyBox.x < Laya.stage.width - this.monkeyBox.width && this.boo == false) {
                this.monkeyBox.x += this.speed;
            }
            else if (this.monkeyBox.x >= Laya.stage.width - this.monkeyBox.width || this.boo == true) {
                this.monkeyBox.x -= this.speed;
                this.boo = true;
            }
        };
        return MonkeyScript;
    }());
    game.MonkeyScript = MonkeyScript;
})(game || (game = {}));
```


L'ajout de cette rubrique révèle que les erreurs de présentation dans la catégorie expandpageu ont disparu, comme le montre la figure 8:

![8](img\8.png)(Figure 8)

Enfin, dans la catégorie d 'entrée**N. B.: les ressources nécessaires doivent être préchargées avant que l'interface ui ne soit mise en service**):


```typescript

//初始化引擎
Laya.init(600, 700);
//设置背景色
Laya.stage.bgColor = "#ffcccc";
//预加载资源
Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, onLoaded));

function onLoaded() {
    //实例化UI界面
    var ExpandPage = new ui.ExpandPageUI();
    //添加到stage上
    Laya.stage.addChild(ExpandPage);
}
```


Le résultat final est indiqué dans la figure 0 du début de l 'article.