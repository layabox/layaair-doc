#Transformation de Transform dans layaair3d

Comme on l 'a vu plus haut, les coordonnées dans layaair3d et plusieurs outils mathématiques de base, dans le Code de l' exemple, Transform est un objet de transformation (([Transform3D](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.core.Transform3D)API, il est très important dans le monde en 3D, et tout ce qui concerne l 'affichage des changements d' objet lui sera utile.

Les deux transformations du Mouvement (translate), de la rotation (rotate) sont déjà utilisées dans le code d 'exemple et les valeurs X, y, Z sont représentées par un vecteur 3D.Les deux procédés permettent de déterminer, dans le paramètre, s' il s' agit d 'un mouvement spatial local et d' une rotation.


```typescript

	//移动摄像机
	camera.transform.translate(new Laya.Vector3(0, 3, 3));
	//旋转摄像机
	camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
```


En ce qui concerne la rotation, deux interfaces rotatives sont prévues dans transform3d, l 'une étant une rotation angulaire / radiale`rotate`Et une rotation du Cap Euler.`localRotationEuler:Vector3`".

[] (IMG / 1.png) <br > (Figure 1)

Des exemples officiels ont été extraits pour faciliter l'observation des effets.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=TransformDemo)- d'abord, nous.**Clonage**Deux singes (le point de connaissance du clonage sera expliqué en détail dans la Section de sprite3d du Schtroumpf) verront les effets et, après le clonage, observeront plus facilement la position de nos deux singes.


```typescript


//克隆sprite3d
var layaMonkey_clone1 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
var layaMonkey_clone2 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
var layaMonkey_clone3 = Laya.Sprite3D.instantiate(staticLayaMonkey, _scene, false, new Laya.Vector3(0.0, 0, 0.5));
//平移
layaMonkey_clone1.transform.translate(new Laya.Vector3(1.5, 0, 0.0));
layaMonkey_clone2.transform.translate(new Laya.Vector3( -1.5, 0, 0.0));
layaMonkey_clone3.transform.translate(new Laya.Vector3( 2.5, 0, 0.0));
```


[] (IMG / 2.png) <br > (Figure 2)

Et tester notre rotation et...**Zoom**ChangerNous faisons tourner le clone 1 à 90 degrés sur l 'axe Y, et le clone fixe sa valeur de zoom à 0,5, 0,5 et 0,5.Regarde les effets.(cet agrandissement est effectué au niveau local, le monde est le même que l 'échelle d' origine locale, les coordonnées de la référence sont différentes et le nombre de points du monde est basé sur l 'échelle globale.


```typescript

//旋转
layaMonkey_clone2.transform.rotate(new Laya.Vector3(0, 60, 0), false, false);
//缩放
var scale = new Laya.Vector3(0.1, 0.1, 0.1);
layaMonkey_clone3.transform.localScale = scale;
```


[] (IMG / 3.ping) <br > (Figure 3)

Outre les trois transformations décrites ci - dessus, il existe d 'autres attributs et méthodes couramment utilisés dans le Transform:

> méthode

`lookAt(target:Vector3, up:Vector3, isLocal:Boolean = false):void`Surveillez la position de la cible.

Attributs

`localPosition:Vector3`Localisation.

`localScale:Vector3`Zoom.

`localMatrix:Matrix4x4`Local Matrix

`position:Vector3`Place du monde

`localRotation:Quaternion`Local Rotation

`scale:Vector3`World zoom

`worldMatrix:Matrix4x4`Matrice mondiale

`rotation:Quaternion`Le monde tourne.

`right:Vector3`[Read - only] Prenez à droite.

`forward:Vector3`[Read - only] en avant.


####3D la paternité dans le monde

Dans le monde 3D, le noeud père est transformé, et le noeud fils suit le changement de réponse.Cependant, le changement de noeud n 'affecte pas l' objet parent.