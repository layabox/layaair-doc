# 纹理的各向异性过滤

###### *version :2.1.0   Update:2019-5-25*

Le filtrage anisotropique (anisotropic Filtering) est utilisé pour filtrer et traiter les erreurs de texture lorsqu 'un changement de vue entraîne l' inclinaison de la surface de l 'objet 3D.

Plus cette propriété est grande, plus elle devient évidente.En outre, les valeurs maximales acceptables pour différents GPU sont différentes.Les deux images ci - dessous sont identiques, différentes.`anisoLevel`The Effect under anisotropic grade.

[] (IMG / 1.png) <br > (Figure 2) anisolevel = 0

[] (IMG / 2.png) <br > (Figure 2) anisolevel = 10

Définit le Code:


```typescript

//设置各向异性等级
texture.anisoLevel = 10;
```


