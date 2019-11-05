#テクスチャの異方性フィルタリング

###### *version :2.1.0   Update:2019-5-25*

異方性フィルタリング（Anisotropic Filtering）は、視点の変化によって3 D物体の表面が傾いたときに生じるテクスチャエラーをフィルタリングし、処理するために用いられる。

この属性が高いほど効果が顕著です。また、gpuによって許容できる最高値が異なります。下の二枚のスクリーンショットは同じ画角で、違います。`anisoLevel`異方性レベルでの効果。

！[](img/1.png)<br/>(図2)anisoLevel=0

！[](img/2 png)<br/>(図2)anisoLevel=10

コードの設定:


```typescript

//设置各向异性等级
texture.anisoLevel = 10;
```


