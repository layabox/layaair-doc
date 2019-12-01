##Gestion des versions

À partir de 1.7.15 beta, ouvrez l 'interface d' affichage, la dernière étant la gestion.**Gestion des versions**Fonctions

![publish](res/publish.png) 


Lorsque la gestion de mise en page est activée, un nom de fichier avec Hash est généré et un fichier de mappage de nom de fichier est généré pour version.json, dans lequel le contrôle de mise en page peut être effectué par l 'utilisation de la classe resourceversion et le chargement automatique du nom de fichier avec Hash est effectué lors du chargement.

Articles non emballés
![publish](res/old.png) 

Articles emballés:
![publish](res/hashed.png) 




Mise en page des ressources de gestion par téléchargement dans le Code par catégorie de resourceversion

On trouvera ci - après des exemples concrets de codes d'utilisation:


```java

package {
	import laya.net.Loader;
	import laya.net.ResourceVersion;
	import laya.utils.Handler;
	import view.TestView;
	
	public class LayaUISample {
		
		public function LayaUISample() {
			//初始化引擎
			Laya.init(600, 400);
			
			//设置版本控制类型为使用文件名映射的方式
			ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
			//加载版本信息文件
			ResourceVersion.enable("version.json", Handler.create(this, beginLoad));		
		}
		
		private function beginLoad():void
		{
			//加载引擎需要的资源
			Laya.loader.load([{url: "res/atlas/comp.atlas", type: Loader.ATLAS}], Handler.create(this, onLoaded));
		}
		
		private function onLoaded():void {
			//实例UI界面
			var testView:TestView = new TestView();
			Laya.stage.addChild(testView);
		}
	}
}
```


Diagramme de chargement du programme
![publish](res/load.png) 