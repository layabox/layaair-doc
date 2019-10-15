#Multi - point tactile use

###### *version :2.1.1   Update:2019-8-2*

Le Contact Multipoint est également supporté dans le layaair3d, même plus facile à utiliser que dans le 2D.Le Contact Multipoint dans 2D est basé sur`Event`Event`touches:Array`[Read - only] touche les attributs de la liste, ce qui rend le fonctionnement plus difficile.Mais dans le 3D, c'est le scénario scene.`input:Input3D`Les attributs d 'entrée 3D peuvent être obtenus n' importe où et sont très faciles à utiliser.

]**Attention:**Dans le cas d 'un contact multipoint, un seul rayon est émis pour la détection, et ce point est le point central de la pluralité de contacts.Si plusieurs rayons sont nécessaires pour la détection, l 'émetteur doit les traiter lui - même.

**Input3d**

Attributs

[] (IMG / 1.png) <br > (Figure 1)

> méthode

[] (IMG / 2.png) <br > (Figure 2)

**Attribut touch**

[] (IMG / 3.ping) <br > (Figure 3)

La Section de code de l 'exemple suivant est choisie parmi l' exemple officiel ()[demo地址](https://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=MouseInteraction&name=MultiTouch)).

Ajouter un script au Singe dans la classe principale.Ajouter en même temps un autre afficheur de sortie commode sur la scène`Text`Texte

Catégorie de scripts:


```typescript

//重写脚本中的onUpdate方法
onUpdate() {
    var touchCount = this._scene.input.touchCount();
    if (1 === touchCount){
        //判断是否为两指触控，撤去一根手指后引发的touchCount===1
        if (this.isTwoTouch){
            return;
        }
        this._text.text = "触控点为1";
        //获取当前的触控点，数量为1
        var touch = this._scene.input.getTouch(0);
        //是否为新一次触碰，并未发生移动
        if (this.first){
            //获取触碰点的位置
            this.lastPosition.x = this.touch.position.x;
            this.lastPosition.y = this.touch.position.y;
            first = false;
        }
        else{
            //移动触碰点
            var deltaY = this.touch.position.y - this.lastPosition.y;
            var deltaX = this.touch.position.x - this.lastPosition.x;
            this.lastPosition.x = this.touch.position.x;
            this.lastPosition.y = this.touch.position.y;
            //根据移动的距离进行旋转
            this.owner.transform.rotate(new Laya.Vector3(1 * deltaY /2, 1 * deltaX / 2, 0), true, false);
        }
    }
    else if (2 === touchCount){
        this._text.text = "触控点为2";
        this.isTwoTouch = true;
        //获取两个触碰点
        var touch = this._scene.input.getTouch(0);
        var touch2 = this._scene.input.getTouch(1);
        //是否为新一次触碰，并未发生移动
        if (this.first){
            //获取触碰点的位置
            this.disVector1.x = touch.position.x - touch2.position.x;
            this.disVector1.y = touch.position.y - touch2.position.y;
            this.distance = Laya.Vector2.scalarLength(this.disVector1);
            this.first = false;
        }
        else{
            this.disVector2.x = touch.position.x - touch2.position.x;
            this.disVector2.y = touch.position.y - touch2.position.y;
            var distance2 = Laya.Vector2.scalarLength(this.disVector2);
            //根据移动的距离进行缩放
            this._camera.transform.translate(new Laya.Vector3(0, 0, -0.01 * (this.distance2 - this.distance)));
            this.distance = this.distance2;
        }	
    }
    else if (0 === touchCount){
        this._text.text = "触控点归零";
        this.first = true;
        this.lastPosition.x = 0;
        this.lastPosition.y = 0;
        this.first = true;
        this.isTwoTouch = false;
    }
}
```


[] (IMG / 4.gif) <br > (Figure 4)