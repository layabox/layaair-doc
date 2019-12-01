#Animation lente

###Description générale des animations lentes

L 'animation lente est plus courante dans le développement du jeu, c' est l 'un des éléments importants pour améliorer l' expérience du jeu ui, tels que l 'éjection, la fermeture, l' apparition et la disparition des boutons, le vol de l 'outillage dans le sac à dos, etc.

`Tween`La classe de ralentissement est utilisée pour obtenir des paramètres de valeurs cibles tels que la distance de ralentissement de l 'axe X ou y de l' objet cible, ainsi que des paramètres de démarrage, d 'arrêt, de nettoyage, etc.Plus d'API de Tween.

`Ease`La classe définit un grand nombre de fonctions de ralentissement pour réaliser`Tween`Effet ralenti spécifique de l 'animation.Les moteurs layaair de type Tween combinés avec les catégories ease peuvent répondre pour l 'essentiel à la demande de développement du jeu à effet ralenti.Cliquez sur le lien pour voir directement API:[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Tween](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Tween)

`Ease`La fonction de ralentissement est présentée dans la catégorie API, et cliquez sur le lien pour voir directement API:[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Ease](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.utils.Ease)

`Ease`Les effets des fonctions de ralentissement dans les catégories API peuvent être consultés dans la démonstration demo, liens: https: / / layaair.ldc.layabox.com / Demo /? Category = 2D & group = Tween & name = easefunctionsdemo





###Présentation courante de l'API pour les ralentisseurs

####2.1 méthodes couramment utilisées dans la catégorie des ralentisseurs de Tween à partir de () et de ()

Tween propose plus de méthodes, alors que nous utilisons deux méthodes différentes.`from()`Et`to()`METHOD, the parameter Parameters of the two methods are all the same but different effects from the Slow Target Point to the Initial Position (from the Slow Target position) *, to the Motion from the initial position to the Slow Target position`到缓动目标位置去`) On trouvera ci - après une description détaillée de ces deux méthodes, accompagnée d'exemples, que les concepteurs pourront commencer par comprendre, comme le montre la figure 1.

![图1](img/1.png) 


(Figure 1)

####2.2 Description des paramètres généraux

`to()`Et`from()`Les deux méthodes sont favorables à une approche statique et nous n'avons donc pas besoin de dépérir les Tween.

En consultant la note API de la figure 1,`to()`Et`from()`Les paramètres sont plus simples à comprendre et nous mettons l'accent sur les paramètres props, duration, ease, complete, Delay.

#####Props

Props est une propriété dont l 'objet cible a besoin d' être modifié pour produire un effet de ralentissement.Les attributs communs de l 'objet peuvent être définis, par exemple les attributs X, y les plus couramment utilisés et les propriétés transparentes alpha, ainsi que d' autres propriétés telles que la rotation, l 'axe, la taille, etc.

#####Duration

Duration is the time for the Implementation of the Slow effect, unit is high seconds, more time, slow effect.

#####Ease

Ease est un type de ralentissement qui peut modifier le processus de changement d 'animation au moyen de diverses fonctions définies dans la catégorie ease, et le moteur layaair fournit de très nombreuses méthodes de ralentissement que les concepteurs peuvent choisir d' utiliser.Le développeur peut visualiser l 'API ou changer la fonction de ralentissement dans l' exemple de moteur du réseau officiel et observer l 'effet de ralentissement, l' adresse de lien:[https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo](https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo)

#####Complete

Complete est un procédé de retour après l 'achèvement d' un mouvement lent.Par exemple, lorsque le bouton apparaît lentement, nous ne pouvons pas laisser l 'utilisateur cliquer pendant le ralentissement, ce qui permet d' effectuer le retour lentement, puis d 'ajouter l' écoute du bouton dans la fonction de rappel.

#####Delay

Delay est un délai d 'exécution retardé qui permet de produire ultérieurement un effet de fluctuation retardé du texte par un retard dans l' exemple.



###Exemples de ralentissement

####3.1 exemples de tween.from ()

Dans le code ci - après, l 'animation lente du texte du caractère layabox est réalisée d' abord par la méthode tween.from ().

Crée la classe de document tweendemo.as, le Code étant rédigé comme suit:


```java

package 
{
	import laya.display.Text;
	import laya.utils.Tween;
	import laya.utils.Ease;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		
		public function TweenDemo() 
		{
			// 初始化舞台
			Laya.init(1334,750, WebGL);

			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			//创建缓动文本
			createTween();
		}
		
		//创建缓动文本
		private function createTween():void 
		{	
			
			//"LayaBox"字符串总宽度
			var w:int = 800;
			
			//文本创建时的起始x位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
			var offsetX:int = Laya.stage.width - w >> 1;

			//显示的字符串
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			//根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				//从"LayaBox"字符串中逐个提出单个字符创建文本
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				//文本的初始y属性
				letterText.y = 300;

				//对象letterText属性y从缓动目标的100向初始的y属性300运动，每次执行缓动效果需要3000毫秒，缓类型采用elasticOut函数方式，延迟间隔i*100毫秒执行。
				Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);
			}
		}
		
		
		//创建单个字符文本，并加载到舞台
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```


Les effets de fonctionnement sont indiqués dans la figure 2.

![动图2.gif](img/2.gif)< br / > (Figure 2)

Combiner le code d 'exemple et, par l' effet de mouvement de la figure 2, on peut voir que le texte "layabox" disparaît instantanément après l 'apparition de la position initiale (* axe y 300 *) et après, à partir de la cible définie par le procédé de ralentissement tween.from`{ y : 100 }`(* axe y 100 *) se déplace vers la position initiale (effet ralenti depuis le haut jusqu 'au bas).

Ce procédé étant affiché d 'abord en position initiale, il disparaît instantanément de la position cible ralentie à la position initiale.Il y a un déficit visuel, c 'est plus un effet de rebond.Nous continuons donc de comprendre l'effet de tween.to et les développeurs peuvent choisir, en fonction des besoins, la méthode de ralentissement à utiliser.

####3.2 exemples de tween.to ()

Nous pouvons continuer à utiliser l'exemple ci - dessus, en changeant tween.from en tween.to, en regardant d'abord l'effet de fonctionnement.


```java

//文本的初始y属性
letterText.y = 300;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);
```


Les effets de fonctionnement sont indiqués à la figure 3.

![动图3.gif](img/3.gif)< br / > (Figure 3)

Avec le Code, nous verrons l 'effet de la figure 3, et tween.to () sera plus intuitif.Propriétés initiales y dans 300, propriétés du procédé de ralentissement y dans 100`{ y : 100 }`) ainsi, le diagramme de mouvement 3 est un effet de ralentissement descendant vers le haut.

####3.3 compréhension des paramètres props

Que ce soit tween.from ou tween.to, le second paramètre props (attributs) peut influer sur la trajectoire de mouvement, etc.

Étant donné que l'effet ralenti de tween.from et tween.to était inverse, tween.from avait le sentiment de se retrouver, tandis que tween.to, figure 3, avait le sentiment d'être remonté vers le haut.

Si l 'on ajuste la valeur d' attribut y initiale par rapport à la valeur d 'attribut y de la cible de ralentissement, on verra si l' effet de chute obtenu avec tween.to est différent de celui obtenu avec tween.from.

Continue l 'exemple précédent et modifie le Code comme suit.


```java

//文本的初始y属性
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 300 }, 3000, Ease.elasticOut, null, i * 1000);
```


Les effets de fonctionnement sont indiqués à la figure 4.

![动图4.gif](img/4.gif)< br / > (Figure 4)

Etant donné que les propriétés y initiales sont à 100 dans la figure 4, l 'effet tween.to se déplace de l' attribut initial à l 'attribut de la cible de ralentissement.Ainsi, lorsque la propriété y de la cible de ralentissement est située à 300, le mouvement de l 'axe y initial va de 100 à 300, c' est - à - dire qu 'il tombe.Il y a une différence évidente entre les résultats obtenus par tween.from.L 'développeur doit donc tenir compte de la différence d' effet entre les deux lors de l 'application.

####3.4 compréhension de la durée du retard (* duration *) et paramètres du retard d 'exécution (* Delay *)

Continuons à suivre l 'exemple précédent, nous modifions le troisième paramètre à 1 000 millisecondes et le sixième paramètre Delay à 100 millisecondes, comme l' indique la figure 5.La vitesse de ralentissement et la vitesse de l'intervalle de chute entraînent des changements plus importants.On peut donc constater que différents objectifs d 'effet d' animation peuvent également être réalisés par ajustement de la durée ou du temps de retard.Il n 'y a plus rien à approfondir ici.

![动图5.gif](img/5.gif)< br / > (Figure 5)

Modifier le Code pour l 'effet du diagramme 5 comme suit:


```java

//文本的初始y属性
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 300 }, 1000, Ease.elasticOut, null, i * 100);
```


####3.5 compréhension des paramètres ease

Quatrième paramètre`laya.utils.Ease`Chaque type de procédé, dans l 'exemple de moteur du réseau, a un effet de démonstration sur ces procédés.L 'développeur peut cliquer sur le lien ([https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo](https://layaair.ldc.layabox.com/demo/?Tween_EaseFunctionsDemo)) vous pouvez les voir une par une, puis les remplacer pour l 'expérience.

Remplacer le texte de cette section par le texte suivant:`Ease.bounceIn`Effet, comme le montre la figure 6.

![动图6.gif](img/6.gif)< br / > (Figure 6)

Modifier le Code pour l 'effet de la figure 6 comme suit:


```java

//文本的初始y属性
letterText.y = 100;
//Tween.from(letterText, { y : 100 }, 3000, Ease.elasticOut, null, i * 1000);//注释本行改为将Tween.from改变为Tween.to
Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, null, i * 100);
```





####3.6 comprendre les paramètres de l 'achèvement de la remise en question (* COMPLETE *)

Le cinquième paramètre complete est utilisé pour effectuer un retour après un effet de ralentissement complet.Nous continuons de suivre l 'exemple précédent et, à la fin d' un mouvement lent, ajoutons un retour permettant de rendre la couleur de la police rouge.

Exemples:


```java

Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
```


Comme de nouvelles références sont nécessaires, tous les codes d 'exemples sont affichés cette fois - ci.

Tweendemo.as:


```java

package 
{
	import laya.display.Text;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		
		public function TweenDemo() 
		{
			// 初始化舞台
			Laya.init(1334,750, WebGL);

			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			//创建缓动文本
			createTween();
		}
		
		/**
		 * 创建缓动文本
		 */	
		private function createTween():void 
		{	
			
			//"LayaBox"字符串总宽度
			var w:int = 800;
			
			//文本创建时的起始x位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
			var offsetX:int = Laya.stage.width - w >> 1;

			//显示的字符串
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			//根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				//从"LayaBox"字符串中逐个提出单个字符创建文本
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				//文本的初始y属性
				letterText.y = 100;

				/**
				* 对象letterText属性y从100缓动到300的位置
				* 用1000毫秒完成缓动效果
				* 缓动类型采用bounceIn
				* 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
				* 延迟间隔i*100毫秒执行
				*/
				Tween.to(letterText, { y : 300 }, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
			}
		}
				
		/**
		 * 缓动完成后的回调方法
		 * @param txt  缓动对象
		 */		
		private function changeColor(txt:Text):void
		{
			//将文本字体改变成红色
			txt.color="#FF0000";			
		}		
		
		/**
		 * 创建单个字符文本，并加载到舞台
		 */		
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```


Le code fonctionne comme le montre la figure 7.

![动图7](img/7.gif) 







####3.7 retour de processus par paramètre props

Le paramètre complete (* retour achevé *) peut être réalisé non seulement dans le cinquième paramètre, mais aussi dans le second paramètre props.Toutefois, pour que le code soit plus clair et plus lisible, nous ne proposons pas que le retour complet soit mis en oeuvre dans le système props.

Nous ne présentons ici que la mise à jour de retour dans le système props.En d'autres termes, si nous voulons mettre en oeuvre la méthode de retour dans un processus lent, le cinquième paramètre n'est pas réalisable, car le cinquième paramètre doit être mis en œuvre après la fin du mouvement lent.Nous continuons donc de suivre l 'exemple précédent en ajoutant un retour de mise à jour de la couleur de police dans le paramètre props.

Exemples:


```java


/**
* 对象letterText属性y从100缓动到300的位置，每一帧都通过回调方法更新颜色
* 用1000毫秒完成缓动效果
* 缓动类型采用bounceIn
* 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
* 延迟间隔i*100毫秒执行
*/

Tween.to(letterText, { y : 300, update: new Handler(this, updateColor,[letterText])}, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
```


Code d'exemple complet, tweendemo.as:


```java

package 
{
	import laya.d3.math.Rand;
	import laya.display.Text;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	import laya.webgl.WebGL;
	
	public class TweenDemo
	{
		public function TweenDemo() 
		{
			// 初始化舞台
			Laya.init(1334,750, WebGL);

			//背景颜色
			Laya.stage.bgColor = "#1b2436";
			
			//创建缓动文本
			createTween();
		}
		
		/**
		 * 创建缓动文本
		 */	
		private function createTween():void 
		{	
			
			//"LayaBox"字符串总宽度
			var w:int = 800;
			
			//文本创建时的起始x位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
			var offsetX:int = Laya.stage.width - w >> 1;

			//显示的字符串
			var demoString:String = "LayaBox";
			
			var letterText:Text;
			
			//根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
			for (var i:int = 0, len:int = demoString.length; i < len; ++i)
			{
				//从"LayaBox"字符串中逐个提出单个字符创建文本
				letterText = createLetter(demoString.charAt(i));
				letterText.x = w / len * i + offsetX;
				
				//文本的初始y属性
				letterText.y = 100;

				/**
				 * 对象letterText属性y从100缓动到300的位置，每一帧都通过回调方法更新颜色
				 * 用1000毫秒完成缓动效果
				 * 缓动类型采用bounceIn
				 * 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
				 * 延迟间隔i*100毫秒执行
				 */
			
				Tween.to(letterText, { y : 300, update: new Handler(this, updateColor,[letterText])}, 1000, Ease.bounceIn, Handler.create(this,changeColor,[letterText]), i * 100);
			}
		}
		
		/**
		 * 缓动进行时的回调更新方法
		 * @param txt  缓动对象
		 */			
		private function updateColor(txt:Text):void
		{
			
			var c:int = parseInt(Math.random()*3);
			switch(c)
			{
				case 0:
				{
					txt.color="#EEE000";
					break;
				}
				case 1:	
				{
					txt.color="#FFFFFF";
					break;
				}
				case 2:	
				{
					txt.color="#FF0000";
					break;
				}
				default:
				{					
					txt.color="#EEE000";
					break;
				}
			}
		}		
		
		/**
		 * 缓动完成后的回调方法
		 * @param txt  缓动对象
		 */		
		private function changeColor(txt:Text):void
		{
			//将文本字体改变成红色
			txt.color="#FF0000";
		}		
		
		/**
		 * 创建单个字符文本，并加载到舞台
		 */		
		private function createLetter(char:String):Text
		{
			var letter:Text = new Text();
			letter.text = char;
			letter.color = "#FFFFFF";
			letter.font = "Impact";
			letter.fontSize = 180;
			Laya.stage.addChild(letter);			
			return letter;
		}
	}
}
```


Lors de l 'exécution du Code, étant donné que la réponse Update est exécutée pour chaque trame, il y a un effet de mot flash dans le processus de ralentissement.Voir figure 8.

![动图8](img/8.gif) 


(Figure 8)



L 'édition d' animation d 'axe temporel de layaairide peut également définir un effet de ralentissement pour les propriétés de l' objet.Pour connaître le mode de réglage de l 'effet de ralentissement dans l' IDE, on peut lire la présentation de l 'effet de ralentissement dans l' édition d 'animation de l' axe temporel.