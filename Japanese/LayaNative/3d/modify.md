#LayaAir 1.7.19.1ベータコード変更

###1.webGL/src/laya/webgl/atlas/Atlas WebGLONvas.as

![图1](img/m1.png)    

判断を増やす

```javascript

if (__JS__("bitmap !== ConchTextCanvas")) {
    ...
}
```

###2.core/src/laya/net/Loader.as
![图1](img/m2.png)   

判断を～に変える

```javascript

if (Render.isConchApp && !Render.isConchWebGL) { 
    ...
}
```

###3.core/src/laya/display/Text.as
![图1](img/m3.png)   

コードを追加

```javascript

if (Render.isConchApp && measureResult.width === 0 && measureResult.height === 0) {
	measureResult = Browser.context.measureText('W');
}
```

 

###4.core/src/laya/display/Stage.as
![图1](img/m4.png)   

Render.isConch WebGLを追加すると判断します。
