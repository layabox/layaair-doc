#Unlit Materials

###### *version :2.1.0beta   Update:2019-5-14*

**Unlit n'est pas éclairé.**MaterialLa caractéristique la plus importante de ce matériau est de ne pas être influencé par la lumière et de minimiser les performances.Ce matériau permet d 'afficher directement le style de l' autocollant original.

####Principales propriétés et méthodes

Attributs

`albedoColor:Vector4`Reflectance color

`albedoIntensity:Number`L 'inverse.

`albedoTexture:BaseTexture`Contraste.

`enableVertexColor:Boolean`Supporte - t - il la couleur de pointe?

`renderMode:int`[Write - only] définit un mode de rendu.

`tilingOffset:Vector4`Pavage et décalage de texture.

####Création et utilisation de matériaux

Dans la figure 1, le matériau blinnphong utilisé à gauche et le matériau unlit utilisé à droite.Deux contre un, ça donne plus de caractéristiques à unlit.Pour de plus amples renseignements, voir: ([demo地址](http://localhost/LayaAir2_Auto/%3Chttps://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=UnlitMaterialDemo%3E));


```typescript

//创建Unlit材质
var material2 = new Laya.UnlitMaterial();
//加载纹理
Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(this, function(texture){
    //设置反照率贴图
    material2.albedoTexture = texture;
}));
earth2.meshRenderer.material = material2;
```


[] (IMG / 1.png) <br > (Figure 1)

