##Layaair3d.

###Point d 'ancrage

La technologie des points d 'ancrage osseux est très courante dans les jeux en 3D, par exemple lorsque les armes changent avec les mains du personnage, alors on peut lier les armes à celles des os de la main, les armes étant des sous - couches du squelette de la main, et naturellement on peut les modifier avec les mouvements de la main.

Bien entendu, le modèle 3D lié peut également être enlevé ou remplacé par un code, ce qui permet d 'obtenir une fonction de conversion d' une arme ou d 'un équipement.



###Installer un point d 'accrochage d' os dans l 'Unity

Les points d 'accrochage osseux sont très faciles à installer dans l' Unity et peuvent être utilisés directement au niveau des ressources de la scène.Figure 1

Les objets à lier peuvent être soit un récipient en 3D, soit un modèle en 3D ajustant leur position, puis les glisser sous le squelette spécifié en tant que sous - étage et les attacher en tant que point d 'ancrage.

Parfois, nous avons besoin d'être désarmés dès le début, mais nous avons besoin d'être accrochés pour nous préparer à un changement ultérieur d'arme, alors nous pourrions également mettre un conteneur à noeuds vides, gameobject, et, le cas échéant, y ajouter différents modèles 3D ou plus.

![图1](img/1.png)< br > (Figure 1)

**Une fois que nos points d 'accrochage d' os sont installés, les os et les objets d 'accrochage sont automatiquement exportés vers les fichiers LS LS.Cependant, il convient de noter en particulier que si l 'objet du conteneur vide n' est attaché qu 'au point d' ancrage osseux pour ajouter ensuite l 'objet secondaire de manière dynamique, ignore NULL Game objects de gameobject Setting ne peut pas être sélectionné dans le connecteur d' exportation sans que l 'objet du point d' ancrage du conteneur vide ne soit exporté.**  



###Réalisation d 'un point d' accrochage osseux dans un code

En général, on ajoute des squelettes à l 'Unity.Cependant, le moteur layaair fournit également un mode de fixation du Code qui permet d 'ajouter et d' enlever des points d 'accrochage osseux avec souplesse.

La classe de composants d 'animation animator fournit deux exemples de procédés**Linksprite3dtoavatarnode ()**Et**Unlinksprite3dtoavatarnode ()**L 'ajout et la suppression de points accrochés peuvent être réalisés (figures 2 et 3).

Avant d 'ajouter l' animation osseuse, il faut que les beaux - arts donnent le nom des noeuds osseux associés.

![图2](img/2.png)< br > (Figure 2)

![图3](img/3.png)< br > (Figure 3)

Les codes utilisés sont les suivants:

Acquisition d 'un modèle d' animation d 'os à partir d' une scène - acquisition d 'un module d' animation à partir d 'un modèle - création d' un objet d 'accrochage - fixation d' un os et d 'un objet d' accrochage à partir d 'un ensemble d' animation.


```typescript

  //从场景中获取动画模型
  var monkey:Sprite3D=scene.getChildByName("monkey") as Sprite3D;
  //获取动画模型中动画组件
  var monkeyAni:Animator=monkey.getComponentByType(Animator) as Animator;

  //需要挂点的3D对象
  var box:MeshSprite3D=new MeshSprite3D(new BoxMesh(1,1,1));
  //将3D对象加载到scene中（一定要加入到场景）
  scene.addChild(box);
  //将挂点物品添加到某个骨骼上（美术提供骨骼的名称）
  monkeyAni.linkSprite3DToAvatarNode("RHand",box);

  //将挂点物品从骨骼上移除（美术提供骨骼的名称）
  //monkeyAni.unLinkSprite3DToAvatarNode("RHand",box);
```




###Exemple d 'application de point d' accrochage d 'os

On trouvera ci - après une brève illustration de l 'attaque magique.

![图4](img/4.gif)< br > (Figure 4)

Tout d 'abord, comme indiqué à la figure 1, un cercle de lumière magique a été créé dans l' Unity en tant que sous - noeud du squelette de la main droite.Après l 'Export, on peut découvrir que le squelette et le cercle lumineux apparaissent dans le fichier sous - stratifié du modèle (fig.

![图5](img/5.png)< br > (Figure 5)

Selon la figure 4, les effets de l 'attaque magique peuvent être réalisés par deux catégories principales, laya3d ou bonepoint.as, pour la diffusion d' animations et la production d 'armes magiques.Encore une fois, la simulation produit des effets magiques et les jette.

Weaponscript.as réalise des vols magiques et des destructions.Tous les codes sont les suivants:


```typescript

package
{
	import laya.d3.component.Animator;
	import laya.d3.component.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.utils.Stat;

	public class Laya3D_BonePoint
	{
		public var scene:Scene;		
		/**角色动画组件**/	
		public var monkeyAni:Animator;
		/**骨骼挂点绑定的武器**/		
		public var weapon:Sprite3D;
		/**武器克隆**/	
		public var weaponClone:Sprite3D;
		/**武器是否已克隆**/
		private var weaponIsClone:Boolean=false; 		
		
		public function Laya3D_BonePoint()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;			
			//开启统计信息
			Stat.show();
			
			//加载3D资源
			Laya.loader.create("LayaScene_monkey/monkey.ls",Handler.create(this,onComplete));
		}
		
		//资源加载完成回调
		private function onComplete():void
		{
			//创建场景
			scene=Laya.loader.getRes("LayaScene_monkey/monkey.ls");
			Laya.stage.addChild(scene);
			
			//从场景中获取动画模型
			var monkey:Sprite3D=scene.getChildByName("monkey") as Sprite3D;
			//获取动画模型中动画组件
			this.monkeyAni=monkey.getComponentByType(Animator) as Animator;
			
			//获取挂点骨骼(Unity中设置的挂点骨胳会被导出，可获取)
			var handBip:Sprite3D=monkey.getChildByName("RHand") as Sprite3D;
			//获取挂点的武器模型
			this.weapon=handBip.getChildByName("weapon") as Sprite3D;
		 
			//监听动画完成事件
			this.monkeyAni.on(Event.COMPLETE,this,onAniComplete);
			
            //帧循环，用于监控动画播放的当前帧
			Laya.timer.frameLoop(1,this,onFrame);
		}
		
		private function onAniComplete():void
		{
			//动画播放完成后武器激活显示
			this.weapon.active=true;
			//动画播放完成后，设置为未克隆，方便下次克隆新武器
			this.weaponIsClone=false;
		}		
			
		//在攻击动画播放到一定帧时，克隆一个新武器特效
		private function onFrame():void
		{
			//在动画35-37帧之间时克隆一个飞出的武器
			//（不能用==35帧方式，帧率不满时可能跳帧，导致克隆失败。后期版本将支持帧标签事件，可解决此问题）
			if(this.monkeyAni.currentFrameIndex>=35&&this.monkeyAni.currentFrameIndex<=37)
			{
				//确保在35-37帧之间只克隆一次
				if(this.weaponIsClone) return;
				//克隆新武器（模型、位置、矩阵等全被克隆）
				var weaponClone:Sprite3D=Sprite3D.instantiate(this.weapon);
				//为武器特效添加脚本
				weaponClone.addComponent(WeaponScript);
				//将克隆武器放入场景中
				scene.addChild(weaponClone);				
				//设置为已克隆
				this.weaponIsClone=true;				
				//隐藏原始武器
				this.weapon.active=false;
			}
		}		
	}
}
```



```typescript

package
{
	import laya.d3.component.Script;
	import laya.d3.core.ComponentNode;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.render.RenderState;
	import laya.d3.math.Vector3;
	
	/**
	 * 武器脚本(飞行与销毁)
	 */	
	public class WeaponScript extends Script
	{
		/**被脚本绑定的武器**/
		public var weapon:Sprite3D;
		/**武器生命周期**/
		public var lifeTime:int=100;
		
		public function WeaponScript()
		{
			super();
		}
		
		//获取绑定对象
		override public function _load(owner:ComponentNode):void
		{
			this.weapon=owner as Sprite3D;
		}
		
		//覆盖组件更新方法，实现武器帧循环
		override public function _update(state:RenderState):void 
		{
			//武器旋转更新
			weapon.transform.rotate(new Vector3(2,2,0),true,false);
			//武器移动更新
			weapon.transform.translate(new Vector3(0,0,0.2),false);
			//生命周期递减
			lifeTime--;
			if(lifeTime<0)
			{
				lifeTime=100;
				//直接销毁脚本绑定对象会报错（对象销毁后脚本还会更新一次，报找不到绑定对象错误），
                //因此延迟一帧以销毁
				Laya.timer.frameOnce(1,this,function(){weapon.destroy();});
			}
		}		
	}
}
```
