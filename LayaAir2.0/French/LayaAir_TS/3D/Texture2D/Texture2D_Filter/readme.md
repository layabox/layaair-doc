# 纹理的过滤器

###### *version :2.1.0   Update:2019-5-25*

Notre texture est destinée à être appliquée à la surface de l 'image tridimensionnelle, alors que le Centre de pixel et le Centre de l' élément de texture sur l 'image tridimensionnelle ne sont pas les mêmes et ne sont pas nécessairement de taille égale.Lorsque la texture est supérieure à la surface graphique tridimensionnelle, un pixel est mappé sur de nombreux pixels texturés; lorsque la texture est inférieure à la surface graphique tridimensionnelle, de nombreux pixels sont mappés sur la même texture.

Lorsque cela se produit, l 'icône devient floue ou mal placée.Pour résoudre ces problèmes, il faut mettre en correspondance les éléments texturés lisses et les pixels.Cette technique est la filtration texture.

Les trois modes de filtrage actuellement utilisés sont appuyés dans layaair3d:

`FILTERMODE_POINT`Oui.**échantillonnage récent**(c 'est moins utile, mais si vous avez besoin d' un jeu de style pixel, utilisez ce mode)

`FILTERMODE_BILINEAR`Oui.**Filtre bilinéaire**(le plus souvent, les performances sont bonnes)

`FILTERMODE_TRILINEAR`Oui.**Filtrage trilinéaire**L 'effet est idéal.

####Configuration du mode filtration texture

Les modes de filtration des textures dans le layaair3d nécessitent des modes de filtration pour les matériaux correspondants.


```typescript

//设置过滤方式
texture.filterMode = Laya.BaseTexture.FILTERMODE_BILINEAR;
```


