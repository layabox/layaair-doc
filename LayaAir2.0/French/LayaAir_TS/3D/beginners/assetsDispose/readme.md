#Libération des ressources de layaair3d

###### 修改时间:2019-4-24,version:2.0.1

###Pourquoi libérer des ressources?

Dans le développement du jeu layaair3d, la libération des ressources est très importante.Les ressources 3D comprennent des modèles, des affiches, des matériaux, des animations, etc. pour obtenir de bons résultats d 'image, le fichier sera beaucoup plus grand que le 2D, alors que les moteurs 3D seront pratiquement toutes mis en valeur dans le GPU, ce qui absorbera une grande partie de l' affichage.Le jeu finira par s' effondrer si les ressources ne sont pas libérées.

Il n 'existe pas de mécanisme de récupération des ordures comme la mémoire, mais il faut les libérer manuellement, et il faut donc accorder une attention particulière à la libération des ressources.

Taille des outils statistiques dans les figures 1 et 2

La figure 1 présente la première scène chargée après le démarrage du jeu avec un nombre de facettes de 30 527, avec un affichage de 69,2 m.

![1](img/1.png)(图1)</br>


Figure 2 Deuxième scénario chargé pour le jeu, avec 7 455 pages seulement, alors que les ressources affichées après le chargement sont de 118 91m.Pourquoi?Peu familière, petite scène, en fait beaucoup moins que dans la figure 1, mais aussi beaucoup moins d 'éclairage, mais plus de ressources de visualisation!

Ceci s' explique par le fait que la première ressource de scène n 'a pas été libérée, que ses ressources sont toujours en vie et que l' occupation apparente s' est accrue.Si le jeu n 'est pas effacé manuellement, le jeu continue de changer d' image, une fois atteint une certaine quantité, le téléphone portable est visible, les cartes de jeu, le flash, la fièvre, etc.

![2](img/2.png)(Figure 2) < / BR >



###Principe de traitement des ressources

L 'exemple de la figure ci - dessus montre la relation entre les ressources traitées par le moteur layaair3d et l' existence, ainsi que les principes qui doivent être pris en compte lors du chargement des ressources afin d 'optimiser les performances du jeu.

Ne chargez pas toutes les ressources en une seule fois, mais seulement les ressources nécessaires (mode de chargement par segments).Une fois le chargement de ressources 3D effectué, l 'objet d' affichage 3D est créé directement en fonction du nom de suffixe de ressources, par exemple. LS crée scene, LH crée un objet sprite3d, etc., et les ressources d 'objet bien créées sont directement mises en mémoire, même si elles ne sont pas sur scène, ce qui permet d' obtenir une surabondance de ressources.

Une gestion rationnelle fait apparaître que les ressources fréquemment utilisées n 'ont pas besoin d' être libérées dans l 'affichage et que les ressources non utilisées sont libérées dès qu' elles ont été utilisées afin d 'économiser les dépenses de fonctionnement.Par exemple, les ressources d 'acteur principal, les ressources d' accessoires 3D, qui sont souvent utilisées par les joueurs, peuvent être stockées dans l 'affichage et la vitesse d' extraction rapide; tandis que certaines grandes scènes peuvent libérer les ressources lors d 'un transfert, les cartes de niveau de scène, les ressources de modélisation sont plus importantes, ce qui permet d' économiser des dizaines de gigabits de frais de mise en évidence.



###Procédé de libération de ressources de mémoire

Il existe deux procédés de libération de ressources de visualisation, l 'un consistant à libérer des ressources de visualisation par l' intermédiaire de l 'objet, mais l' historique de l 'objet de ressource est trop difficile pour être recommandé ici.Un autre mode de réalisation consiste à libérer une ressource d 'affichage par l' intermédiaire d 'une adresse de ressource qui, du point de vue de la gestion des ressources, peut être gérée par configuration d' une table de données json plus souple.

####Interface de transition pour le transfert de scènes et la libération de ressources

Lors du chargement des ressources et du transfert des scènes, nous produisons une interface d 'affichage de progrès dans l' IDE pour la transition, comme le montre la figure 3.

![3](img/3.png)(图3)</br>


Après la publication de l'IDE, une catégorie de contrôle a été mise au point et les codes logiques sont référencés comme suit:


```typescript

import {ui} from "../ui/layaMaxUI";
export default class loading extends ui.LoadingUI{
    constructor(){
        super();
    }
    public setValue(num:number):void{
        //资源加载进度
        this.pro.value = num;
    }
    public init():void{
        //初始化，进度计时
        this.pro.value =0;
        //进度增加的帧循环
        Laya.timer.loop(20,this,this.loop);
    }
    //资环加载进度模式（假进度）
    private loop():void{
        //进度增加
        this.pro.value += 0.01;
        //最高100%进度
        if(this.pro.value>=1){
            this.pro.value =100;
            Laya.timer.clearAll(this);
            this.removeSelf();
            // Laya.stage.event("");
        }
    }
}
```




####Libération de ressources de mémoire par l 'intermédiaire d' une table d 'adresses de ressources

Dans la catégorie principale, nous changeons de scène en double cliquant sur la scène avec une souris, en utilisant une adresse de ressource pour libérer une ressource affichée et en chargeant une nouvelle scène.

L 'ajout de ressources de suppression dans la table est également commode.Par exemple, les beaux - arts créent une nouvelle table json lors de l 'exportation de la scène, placent tous les chemins de ressources qui ne sont pas nécessaires après le passage de la scène dans la table J, les ressources utiles ne sont pas libérées sans l' entrée de la table, par exemple certaines ressources d 'éléments de jeu tels que NPC, accessoires, effets spéciaux.

Tips: les ressources comprennent: Lightmap, material, lmat, model. LM, divers types d 'affiches. Ping ou. JPG, animation. LANI, os. Lav, etc.

Nous allons maintenant présenter la méthode de la table des ressources, en commençant par établir le fichier json dans le répertoire des fichiers de ressources exportés et par éditer les ressources de trajet à libérer, en formant une matrice json dont le nom correspond au fichier.Voir les figures 5 et 6.

![5](img/5.png)Figure 5 < / BR >

![6](img/6.png)Figure 6 < / BR >

Lorsque l 'édition de json est terminée, un outil de vérification peut être utilisé pour vérifier si le format est correct.Le Code de classe principale est alors créé comme suit:


```typescript

// 程序入口
import loading from "./view/loading";
class Main {
  //加载界面
  private load:loading;
  private scene:Laya.Scene3D;
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();
    //加载2d资源
    Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,this.Complete2D));
  }
  //加载2D资源完成回调；
  private Complete2D():void{
    //实例化加载进度页面
    this.load = new loading();
    Laya.stage.addChild(this.load);
    this.load.init();
    //加载第一关场景角色3D资源（不能全部加载，否则太占显存）
    Laya.loader.create(["LayaScene_test/test.ls","LayaScene_twonScene/twonScene.ls"],Laya.Handler.create(this,this.Complete3D));
  }
  //加载3D资源完成的回调
  private Complete3D():void{
    //实例化场景
    this.scene = Laya.loader.getRes("LayaScene_test/test.ls");
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene,0)
    //点击游戏画面切换场景
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.changeScene);
  }
  //加载第二关场景资源， 切换场景
  private changeScene():void{
    //去除点击事件监听
    Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.changeScene);
    this.scene.removeSelf();
    // this.load.setValue(0);
    this.load.init();
    Laya.stage.addChild(this.load);
    this.scene.destroy();

    //加载第二关场景资源到游戏中
    this.scene = Laya.loader.getRes("LayaScene_twonScene/twonScene.ls");
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene,0);
    console.log("现在在显存中的资源:",Laya.Loader.loadedMap);
    this.assetsDispose();                

  }

  private assetsDispose(){
    //加载资源释放表
    Laya.loader.load("loveScene.json",Laya.Handler.create(this,this.onAssetOK)); 
  }
  //加载资源释放表完成后
  private onAssetOK():void{
    //获取加载的数据（Json数据转化成数组）
    var arr:any = Laya.Loader.getRes("loveScene.json");
    for(var i:number=arr.length -1;i>-1;i--){
      //根据资源路径获取资源
      var resource:Laya.Resource = Laya.loader.getRes(arr[i].url) as Laya.Resource;
      if(resource)
        //资源释放
        resource.destroy();
      else
        console.log(arr[i].url);
    }
  }
}
new Main();
```


Lorsque l'on observe la méthode d'assemblage du Code susmentionné (assetsdispose: String), on obtient directement les objets générés par les ressources par l'intermédiaire de la méthode laya.loader.getres (AR [i]. URL) (la méthode getres peut être lue directement en créant différents types d'objets en fonction du nom de suffixe URL).La version officielle de layaair2.0 a été harmonisée avec la méthode resource.destroy () et les ressources peuvent être débloquées.

Une fois les ressources libérées, les ressources existantes dans le cache peuvent également être consultées par l 'intermédiaire de l' attribut loademap.

Lorsque vous compilez et exécutez le code ci - dessus, nous pouvons voir l 'effet de la figure 4 et relâcher et charger de nouvelles scènes, l' occupation apparente est beaucoup plus faible.Les ressources non libérées étaient auparavant de 118 91m, soit 59,68 m.

![4](img/4.png)

###Libération automatique de ressources

Layaair2.0 des moyens de libération plus faciles ont été ajoutés pour faciliter la mise au point par les développeurs de ressources en 3D.

Après la destruction de la scène (ou des Elfes), appelez - le.`Laya.Resource.destroyUnusedResources()`Les ressources inutilisées sont automatiquement libérées.


```typescript

//自动释放没有被使用的资源
Laya.Resource.destroyUnusedResources();
```


