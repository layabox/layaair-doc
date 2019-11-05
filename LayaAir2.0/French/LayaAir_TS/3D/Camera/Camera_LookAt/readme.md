# 摄像机捕捉目标

###### *version :2.0.1beta   Update:2019-3-19*

Lors de la création d 'une caméra, il est souvent nécessaire d' ajuster la position de la caméra pour l 'aligner sur un objet tridimensionnel ou pour afficher une zone.Pour les débutants, la pensée spatiale n 'a pas encore pris l' habitude et il faudra beaucoup de temps pour ajuster la position.

La conversion 3D du moteur layaair - 3D fournit un procédé de lookat () permettant de capturer une cible et d 'ajuster automatiquement le point d' alignement de l 'objet 3D.La caméra peut également être utilisée pour ajuster nos vues.

[] (IMG / 1.png) <br > (Figure 1)

Le code ci - dessous provient de l'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraLookAt)):

Dans l 'exemple, une capsule, un cylindre, trois objets carrés sont placés dans la scène, et la cible est transférée à travers le bouton de la souris.


```typescript

//up向量
private _up = new Laya.Vector3(0, 1, 0);
```



```typescript

//点击事件
this.changeActionButton.on(Laya.Event.CLICK, this, function(){
    this.index++;
    if (this.index % 3 === 1 ){
        //摄像机捕捉模型目标
        this.camera.transform.lookAt(this.box.transform.position, this._up);
    }
    else if (this.index % 3 === 2){
        //摄像机捕捉模型目标
        this.camera.transform.lookAt(this.cylinder.transform.position, this._up);
    }
    else{
        //摄像机捕捉模型目标
        this.camera.transform.lookAt(this.capsule.transform.position,this._up);
    }
});
```


[] (IMG / 2.gif) <br > (Figure 2)