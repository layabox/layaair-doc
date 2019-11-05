#Éditer et exporter la caméra de l 'Unity

###### *version :2.0.1beta   Update:2019-3-19*

Moteur 1.7.10 avec le module d 'exportation Unity 1.5.0 après la publication, la caméra créée dans l' Unity peut être exportée!Et le fichier d 'exportation conserve des paramètres tels que la position, l' angle, la couleur d 'arrière - plan, le cisaillement de charge, le champ de vision, etc., de la caméra dans l' espace 3D.

Dans le même temps, comme le moteur layaair 3D supporte des caméras multiples, il est possible d 'installer et d' exporter plusieurs caméras dans l 'unité, pour les réglages visuels des caméras multiples.**Multi - video Window machine**Sous - section

###Édition de caméras dans Unity

Crée une caméra camera dans l 'Unity.Visez le panneau de caméra:

[] (IMG / 1.png) <br > (Figure 1)

**Paramètres de caméra supportant l 'exportation**- Oui.

Transform sélectionne le composant.Réglable.**Position**Position**Rotation**Sélection**Scale.**Zoom.

L 'arrière - plan de background applique la couleur sélectionnée à l' écran restant sans boîtier ciel.

Culling Mask enlève le masque et contient ou néglige l'objet layer.

Projection projection.Projection perspective, orthography.

Size.Taille de l 'affichage lorsque la caméra orthogonale est définie.

Field of view.La largeur d 'angle de la caméra et la dimension angulaire longitudinale.

Clipping planes.Distance entre la caméra et le début du rendu et l 'arrêt du rendu.

Near coupe les surfaces.

Far coupe loin.

Viewport - Rect.

X: point de départ de la position horizontale à dessiner.

Y: l 'affichage de la caméra permet de commencer la position verticale.

W: la sortie de l 'appareil photo sur la largeur de l' écran.

H: altitude de sortie de l 'appareil photo à l' écran.

Depth.Ordre de dessin

Target texture.

###Caméra exportée au moyen d 'un code

Si une caméra est créée et exportée dans l 'unité, comment peut - on obtenir une caméra une fois que le fichier d' exportation est chargé dans le code?Ceci peut être obtenu par l 'index ou le nom du sous - noeud de la scène, auquel nous pouvons également effectuer des opérations de rotation mobile, de réglage de boîtes dans le ciel, d' ajout de scripts, etc.

Code:


```typescript

class LayaAir3D
{
    constructor() 
    {
        //初始化引擎
        Laya3D.init(1000, 500,true);            
        //适配模式
        Laya.stage.scaleMode = Stage.SCALE_FULL;
        Laya.stage.screenMode = Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();            
        //预加载角色动画资源
        Laya.loader.create("monkey/monkey.ls",Laya.Handler.create(this,this.onSceneOK));
    }        
    onSceneOK()
    {
        //添加3D场景
        var scene = Laya.loader.getRes("monkey/monkey.ls");
        Laya.stage.addChild(scene);  
        //从场景中获取摄像机
        var camera = scene.getChildByName("Main Camera");
        //后续对摄像机的逻辑操作.......
    }
}
```


À untiy, la caméra est désignée par défaut "Main Camera", de sorte que, dans le Code susmentionné, une caméra est obtenue par le biais de la méthode getchildbyname de la scene (« main camera») pour des opérations logiques ultérieures.Les développeurs peuvent également définir le nom de la caméra dans l 'unité.

