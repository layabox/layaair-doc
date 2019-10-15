#Rapport longitudinal de caméra

###### *version :2.0.1beta   Update:2019-3-19*

En général, nous ne réglons pas manuellement le rapport longitudinal de l 'écran.Cependant, dans certaines circonstances exceptionnelles, il est nécessaire de régler manuellement le rapport longitudinal transversal.Si le rapport longitudinal doit être réinitialisé, le rapport longitudinal est automatiquement modifié et la valeur ne doit être définie qu 'à 0.


```typescript

//手动设置横纵比
camera.aspectRatio = 2;
```



```typescript

//重置
camera.aspectRatio = 0;
```


