##Ensemble de script layaair3d



###Ensemble parent Component 3D

Dans le moteur layaair 3D, afin de faciliter l 'affichage du contrôle d' objet et la maintenance du Code, une classe de composants puissante Component 3D est fournie.Nos composants de commande d 'animation, les collisions, les scripts, les points d' accrochage osseux et ainsi de suite sont basés sur l 'extension de la fonction du composant, appartenant à sa sous - catégorie.En outre, le moteur layaair 3D supporte l 'ajout d' une pluralité de composants sur un objet 3D, ce qui permet une commande plus souple du composant.

Dans l 'ancien profil technique, nous avons présenté les fonctions de base de l' ensemble commande d 'animation et de l' ensemble collisionneur.Aux fins du présent chapitre,**Nous avons donné l'exemple de l'ensemble script.**Dans la mesure où il hérite de la catégorie des composants, mais il n 'y a guère de fonction d' extension propre, principalement à l 'aide des attributs de Component 3D de la catégorie paternelle et de la méthode, la fonction script sera mise à jour ultérieurement, s' il vous plaît!



###Principales propriétés et procédés d 'assemblage

**Owner**: objet sprite3d associé à l 'ensemble lié.

**Enable:**Si le composant est activé ou non, l 'état d' activation est par défaut lorsque le composant est chargé.

***Load (owner: sprite3d):**Procédé d 'exécution lors de l' embarquement d 'un composant, sans Code par défaut.Elle peut être recouverte dans la catégorie de succession, dans laquelle le Code logique doit être initialisé.

***Start (State: renderstate):**Une fois que l 'objet 3D de l' ensemble de chargement a été mis à jour, il n 'y a pas de code par défaut.Il peut être recouvert dans la catégorie d 'héritage, dans laquelle le Code logique est inséré une fois que l' objet 3D a été chargé.

Par exemple, un script est ajouté lors du chargement asynchrone d 'un objet d' affichage 3D, son Sous - modèle et son matériau n 'ont pas été remplis si le script est rempli (par exemple, un procédé de construction, un procédé de construction, etc.).`_load()`Dans le procédé, un code logique permet d 'obtenir un sous - objet ou une image d' un objet d 'affichage 3D, ce qui crée un bug d' objet vide.Le Code logique peut alors être inséré dans le procédé \ \ Start () afin d 'éviter l' apparition d 'un bug d' objet vide.

Par exemple, le clonage d 'un objet 3D avec un script, s' il y a plus de sous - objets dans l' objet 3D, le clonage de script est effectué en premier, et si la logique du script n 'est pas insérée dans le procédé \ \ Start () Il y a également des objets vides lorsque l' on cherche un sous - objet.

***Update (State: renderstate):**Procédé de mise à jour de composants correspondant à un cycle de trames.Elle peut être recouverte dans la catégorie d 'héritage et un code logique nécessitant une mise à jour de chaque trame peut être inséré dans le procédé.



###événement associé à un composant

* * Component \ \ added:**Le composant est chargé d 'un événement d' exécution, envoyé par le propriétaire du composant sprite3d et transmis comme paramètre.****
****
**Component \ \ removed:**L 'événement postérieur au retrait du composant est transmis par le propriétaire du composant, sprite3d, et le composant est envoyé comme paramètre.****
****
**ENABLE_CHANGED：**组件启用事件，启用属性enable修改后由组件发送，并且启用属性作为参数被发送。



###Ensemble script

Le script est hérité de l 'ensemble, ce qui permet d' ajouter le script à l 'objet d' affichage 3D en utilisant le procédé addcomponent () de l 'objet d' affichage.

Dans l 'exemple des moteurs 3D du réseau officiel, de nombreux exemples de caméras ont été utilisés dans le script mobile camera movescript, auquel la caméra a ajouté un script qui permet de commander sa rotation et son déplacement vers et vers le bas par le clavier à l' aide de la souris.Ajouter le code suivant pour le procédé d 'assemblage de scripts:


```java

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


Bien entendu, le script peut également être supprimé de l 'objet si certaines nécessités logiques l' exigent, et le script peut être supprimé par la méthode removecomponentbytype () de l 'objet affiché en 3D.


```java

//根据类型移除脚本组件
camera.removeComponentByType(CameraMoveScript);
//移除所有组件(包括动画、脚本、碰撞器等，注意，此方法不能移除子对象节点上的组件)
camera.removeAllComponent();
```




###Créer son propre module de script

Les développeurs peuvent consulter le script de caméra et créer leurs propres composants de script pour commander les objets dans la scène.

Dans le développement du jeu layaair 3D, on crée des scènes, des personnages, des animations dans l 'unité, on exporte les scènes et on les charge dans le Code, ce qui permet d' ajouter des éléments de script de commande à différents objets de la scène.

Par exemple, un script de commande d 'acteur principal, un script de commande de NPC, un script de commande d' objet de scène, etc. un niveau de jeu est ainsi créé, et lorsque le jeu charge la scène de niveau suivant, le script peut être multiplexé, l 'entretien du projet est facilité et rapide et la commande et l' affichage sont séparés.

Dans l 'exemple suivant, nous modifions le code "voyage à démarrage rapide en 3D" dans le document technique pour créer un script de commande à ajouter sur Box et supprimer l' ensemble script dans quatre secondes.

Un script personnalisé boxcontrolscript est d 'abord créé pour modifier le matériau et la rotation de l' objet Box auquel appartient le script.


```java

package
{
	import laya.d3.component.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.render.RenderState;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	
	public class BoxControlScript extends Script
	{
      	/**脚本所属的3D对象***/
		private var box:MeshSprite3D;
		
		public function BoxControlScript()
		{
		}
		/**
		 * 覆写3D对象加载组件时的执行方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function  _load(owner:Sprite3D):void
		{
			//获取脚本所属对象
			box=owner as MeshSprite3D;
		}
		/**
		 * 覆写组件所属3D对象实例化完成后，第一次更新时的执行方法
		 */	
		override public function _start(state:RenderState):void
		{
			//获取模型上的材质
			var material:StandardMaterial=box.meshRender.material;
			//修改材质的反射率颜色，让模型偏红
			material.albedo=new Vector4(1,0,0,1);
		}
		
		/**
		 * 覆写组件更新方法（相当于帧循环）
		 * @param state 渲染状态
		 */	
		override public function _update(state:RenderState):void
		{
			//所属脚本对象旋转更新
			box.transform.rotate(new Vector3(0,0.5,0),false,false);
		}
	}
}
```


Le type de script ci - dessus est ensuite ajouté à Box dans le code "démarrer rapidement le voyage en 3D" et le script est supprimé quatre secondes plus tard.


```java

package {
	import laya.d3.component.Script;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	
	public class LayaAir3D_Script 
	{
		public function LayaAir3D_Script() 
		{
			//初始化引擎
			Laya3D.init(0, 0,true);
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//开启统计信息
			Stat.show();
			
			//添加3D场景---------------------------------
			var scene:Scene = Laya.stage.addChild(new Scene()) as Scene;
			//添加摄像机---------------------------------
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 2, 3));
			//旋转摄像机方向（角度）
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			//设置背景颜色
			camera.clearColor = null;
			
			//添加平行光----------------------------------
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			//灯光的漫反射颜色
			directionLight.color = new Vector3(1.6, 1.6, 1.6);
			//灯光的方向(弧度)
			directionLight.direction = new Vector3(0.3, -1, 0);
          
          	//灯光的环境色
			scene.ambientColor = new Vector3(0.6, 0.6, 0.6);
			
			//添加自定义模型------------------------------
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
			//模型旋转方向
//			box.transform.rotate(new Vector3(0,45,0),false,false);
			//创建模型的材质
			var material:StandardMaterial = new StandardMaterial();
			//材质的漫反射贴图
			material.diffuseTexture = Texture2D.load("res/layabox.png");
			//为模型赋上材质
			box.meshRender.material = material;
			
          
			//添加自定义脚本并实例化脚本对象------------------------------------------
			box.addComponent(BoxControlScript);
            //可在添加组件时获取组件对象
         	//var boxScript:Script=box.addComponent(BoxControlScript);
          
			//添加定时4秒执行一次回调函数
			Laya.timer.once(4000,this,onLoop,[box,boxScript]);
		}
		
      	//4秒后回调函数，移除脚本组件
		private function onLoop(box:MeshSprite3D,boxScript:Script):void
		{
			//移除BoxControlScript类型脚本组件
			box.removeComponentsByType(BoxControlScript);
			//移除所有组件
//			box.removeAllComponent();
            //如不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
//          boxScript.enable=false;
		}
	}
}
```


Dans le Code précédent, si les développeurs ne veulent pas enlever le composant dans quatre secondes, mais cessent simplement d 'utiliser le script, la propriété d' activation du script peut être définie comme False.



La compilation et l 'exécution de ce code permettent d' obtenir l 'effet ci - après (fig. 1) après élimination du composant, le modèle cesse de tourner.

![图1](img/1.gif)< br > (Figure 1)