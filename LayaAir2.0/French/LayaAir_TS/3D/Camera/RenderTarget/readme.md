#Utilisation de texture cible

###### *version :2.0.1beta   Update:2019-3-19*

La texture de la cible signifie la caméra.**Rendertarget**PropriétésIl place la vue de la caméra sur une texture qui peut être appliquée à un autre objet.Cela permet de créer facilement un miroir et de surveiller les effets de la caméra.Notez que la fonction de rendu désactivé à l 'écran est rendue par une caméra utilisant cette propriété.

Voici l'exemple que nous utilisons.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=RenderTargetCamera)) Code.Camera rend la caméra pour la scène et render targetcamera pour l 'activation de la caméra de la propriété rendertarget.


```typescript

//设置目标纹理
renderTargetCamera.renderTarget = new Laya.RenderTexture(2048, 2048);
//设置顺序
renderTargetCamera.renderingOrder = -1;
```


L 'ordre de rendu dans le moteur layaair est plus petit et plus élevé.


```typescript

//获取场景中预先放置的屏幕
var renderTargetObj = scene.getChildAt(0).getChildByName("RenderTarget");
//在按钮点击后  将目标纹理赋值给屏幕。
this.changeActionButton.on(Laya.Event.CLICK, this, function(){
			(renderTargetObj.meshRenderer.material as BlinnPhongMaterial).albedoTexture = renderTargetCamera.renderTarget;
 });
```


[] (IMG / 1.png) <br > (Figure 1) avant de cliquer sur le bouton

[] (IMG / 2.png) <br > (Figure 2) cliquez sur le bouton