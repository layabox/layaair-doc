#Description des paramètres du script layaair

Démarrage de layaair2.0 pour prendre en charge le script personnalisé à l 'éditeur afin de faciliter l' extension des fonctions du composant existant

![script1](img/5.jpg)

Pour afficher les attributs de la définition de script dans l 'éditeur, on peut utiliser des notes spéciales

Comme les scripts suivants:

![script1](img/script1.jpg)

Affiche ce qui suit dans l 'IDE:

![script1](img/script2.jpg)

Ceci permet de concevoir un paramètre d 'affichage dans un script, de saisir un paramètre dans l' IDE et de l 'utiliser dans un script

Ce marquage supporte à la fois le as, le JS et le ts, et peut même être utilisé uniquement pour marquer, le script lui - même n 'est pas concrétisé (il est disponible en cas de succession d' attributs).

![script1](img/script3.jpg)



Une étiquette complète comprend les éléments suivants:

- type d 'attribut type IDE, ce type d' attribut est le type d 'attribut ID, le type d' attribut non réel, mais dans la plupart des cas c 'est le même

- nom des attributs affichés dans le nom de fichier

- icône de souris affichée sur le nom de l 'attribut et, si elle n' est pas disponible, utilise le nom (facultatif)

- valeur par défaut (facultatif) affichée dans la zone de saisie default

​


Les paramètres principaux sont les suivants:



Le nom de l 'attribut \ \ \ \ \ \ \ \ \ \ \ \ 
124: ------------------------------------------------------------------------------------------------------------------
Le nom doit correspondre au nom de la variable.
La souris a traversé l 'onglet \ \ \ \ \ \ \ \ \ \ \ \ \
124 \ \ type 124 \ \ type: int, NUMBER, snumber, String, bool, option, Edition, check, color, colorary, NODE, Nodes, prefab, sizegrid, vec, vector, ease \ \ 124
Les attributs de corrélation \ \ 124 \ \ 124 \ \ String
Les propriétés associées \ \ 124 \ \ Node et ACCEPT, les types de réception, par exemple l 'utilisation de revolutejoint, prismaticjoint, rigidbody, et l' access: res emploi de JPG, PNG, suffixe de limitation txt \ \ 124
124 options \ \ 124 option \ \ option \ \ attributs associés \ \ Edition \ \ option: liste facultative, par exemple AA, BBB, CC \ \ 124aa
$124 Min \ \ 124 \ \ number et snumber
$124 MAX \ \ 124 \ \ number maximum et snumber
124, & 124; & 124; & Nodes, les attributs affichés (facultatifs) et, s' ils sont disponibles, les cadres d 'entrée de longueur sont affichés pour déterminer si la longueur n' est pas déterminée en fonction des labels.
124 ptypes \ \ 124 \ \ Nodes, type de chaque élément (facultatif)
124cout \ \ 124cout \ \ Nodes attributs de corrélation
La propriété de corrélation du type d 'élément unique \ \ \ \ \ \ \ \ \ \ \ \ \ \ \
Couteau < \ \ / span > 124.



```

		/** @prop {name:resType,tips:"abc",type:string,accept:res}*/
		public var resType:String = "";
		/** @prop {name:int1,tips:"11",type:Int}*/
		public var int1:int;

		/** @prop {name:number1,tips:"11.11",type:Number}*/
		public var number1:Number;

		/** @prop {name:String,tips:"abc",type:string}*/
        public var string1:String;

		/** @prop {name:bool,tips:"1,0",type:Bool}*/
		public var bool1:Boolean;

		/** @prop {name:Option,tips:"opt",type:Option,option:"aaa,bbb,ccc"}*/
		// 返回字符串
		public var opt:String;

		/** @prop {name:editOption,tips:"editopt",type:EditOption,option:"aaa,bbb,ccc"}*/
		// 返回字符串
		public var editopt:String;

				/** @prop {name:check,tips:"ch11eck",type:Check}*/
		// 返回bool 
		public var check:Boolean;

		/** @prop {name:color1,tips:"opt",type:Color}*/
		// 返回颜色值
		public var  color1:Color;

		/** @prop {name:snumber1,type:sNumber,min:10,max:100}*/
		
		public var 	snumber1:int = 11;
        
		/** @prop {name:node1,type:Node}*/

		public var node1:Node;

        /** @prop {name:sizegrid1,type:SizeGrid}*/
		public var sizegrid1:*;

		/** @prop {name:colorarray,type:ColorArray}*/
		public var colorarray:*;

		/** @prop {name:vec1,type:Vec}*/   
		public var vec1:*;

		/** @prop {name:vector1,type:Vector,labes:abc,types:"Node,String,Number,Boolean",xCount:2,sType:Number}*/
		public var vector1:*;

        // /** @prop {name:nodes2,type:Nodes}*/  这一条必须选中组件上赋值才有效，在场景选择会失效
		// public var nodes2:*;

		/** @prop {name:ease1,type:Ease}*/
		public var sase1:*;
```


Les effets partiels sont les suivants:

![script1](img/111.png)