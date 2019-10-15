# 纹理的循环模式

###### *version :2.1.0   Update:2019-5-25*

Mode cyclique de texture (répétition ou clampage).Appui layaair3d`WARPMODE_CLAMP`étirage des bords de texture`WARPMODE_REPEAT`Texture repetitionUtilisation par défaut dans layaair3d`Repeat`Mode

Notez que le modèle cube utilisé dans l 'exemple utilise un procédé de création de boîte Mesh réécrit par vous - même.

Définissez un diagramme d 'effet avant le mode de circulation:

[] (IMG / 1.png) <br > (Figure 1)


```typescript

//在U方向上使用WARPMODE_CLAMP
texture.wrapModeU = Laya.BaseTexture.WARPMODE_CLAMP;
//在V方向使用WARPMODE_REPEAT
texture.wrapModeV = Laya.BaseTexture.WARPMODE_REPEAT;
```


Après paramétrage (Figure 2):

[] (IMG / 2.png) <br > (Figure 2)

