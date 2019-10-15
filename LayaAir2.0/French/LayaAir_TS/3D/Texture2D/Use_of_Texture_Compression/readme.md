# Texture2D的GPU纹理压缩的使用

###### *version :2.1.0   Update:2019-5-25*

Cette fonction est déjà prise en compte dans la version officielle 2.0.Lorsque Unity est exportée, il suffit de cocher la plate - forme correspondante sur le panneau d 'outils.

[] (IMG / 1.png) <br > (Figure 1)

**IOS and Android**Les fonctions de compression de texture sont prises en charge et les ressources doivent être réparties en trois parties, étant donné que les images de compression de texture d 'André et d' iOS sont totalement différentes.

**Conventional**Plate - forme universelle, juste un JPG et un PNG ordinaires.

Voici la liste des ressources exportées:

[] (IMG / 2.png) <br > (Figure 2)

Après l 'exportation, trois dossiers différents sont divisés et les ressources des trois plates - formes correspondantes sont disponibles.

Exemples de compression de texture[地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Texture&name=TextureGPUCompression)- Oui.

Je l'ai utilisé ici.`URL.basePath`Procédé de réglage d 'un trajet de chargement et de chargement de ressources différentes sur différentes plates - formes utilisant une texture de compression


```typescript

if (Laya.Browser.onAndroid)
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Android/";
else if (Laya.Browser.onIOS)
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/IOS/";
else
    Laya.URL.basePath = "res/threeDimen/scene/LayaScene_TextureGPUCompression/Conventional/";

Laya.Scene3D.load("scene.ls", Laya.Handler.create(.......));
```


