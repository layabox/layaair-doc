#Modification du Code layaair 1.7.19.1 - beta

###Webgl / src / Laya / webgl / Atlas / Atlas webglcanvas.as

![图1](img/m1.png)    

Augmenter le jugement

```javascript

if (__JS__("bitmap !== ConchTextCanvas")) {
    ...
}
```

###2.core / src / Laya / net / loader.as
![图1](img/m2.png)   

Remplacer le jugement par

```javascript

if (Render.isConchApp && !Render.isConchWebGL) { 
    ...
}
```

###CORE / src / Laya / display / text.as
![图1](img/m3.png)   

Ajouter un code

```javascript

if (Render.isConchApp && measureResult.width === 0 && measureResult.height === 0) {
	measureResult = Browser.context.measureText('W');
}
```

 

###CORE / src / Laya / display / stage.as
![图1](img/m4.png)   

Increase lender.isconchwebgl
