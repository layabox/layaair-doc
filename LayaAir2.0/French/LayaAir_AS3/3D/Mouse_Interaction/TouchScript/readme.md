#Script de souris

###### *version :2.1.1   Update:2019-8-2*

L 'événement de la souris dans le script de souris script script 3D de layaair2.0 a été fourni pour faciliter le développement.Si vous voulez utiliser un script de souris, un collisionneur physique est nécessaire sur le script owner.

**Tips**Le script de la souris dépend de la détection des rayons, mais n 'a pas besoin d' ouvrir les rayons manuellement.

**Contenu du script de la souris**

> Method

`onMouseClick():void`Exécution en cliquant sur la souris

`onMouseDown():void`Cliquez sur la souris pour exécuter

`onMouseDrag():void`Glisser la souris

`onMouseEnter():void`Exécution à l 'entrée de la souris

`onMouseOut():void`Exécution lorsque la souris s' en va

`onMouseOver():void`Exécution au passage de la souris

`onMouseUp():void`Exécution lorsque la souris explose

Tous les procédés ci - dessus sont virtuels et il suffit de réécrire la couverture au moment de l 'utilisation.

Sur la base de l 'exemple ci - dessus, nous avons créé un script de souris et ajouté un script à chacun des quatre singes.

]**Script**- Oui.


```typescript

class MouseScript extends Script3D{
		private var meshsp:MeshSprite3D;
		public function MouseScript() {}
		/**
		* 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
		*/
		override public function onAwake():void{
			//获取脚本的拥有者
			meshsp = this.owner as MeshSprite3D;
		}
		//物体必须拥有碰撞组件（Collider）
		//当被鼠标点击
		override public function onMouseDown(e:Event):void{
			//trace("点击到了我box",owner.name);
			//从父容器销毁我自己
			meshsp.removeSelf();
		}
	}
```


]**Catégorie principale**- Oui.


```typescript

//给四个猴子添加脚本
staticLayaMonkey.addComponent(MouseScript);
layaMonkey_clone1.addComponent(MouseScript);
layaMonkey_clone2.addComponent(MouseScript);
layaMonkey_clone3.addComponent(MouseScript);
```


Comme le montre la figure 1:

[] (IMG / 1.gif) <br > (Figure 1)
