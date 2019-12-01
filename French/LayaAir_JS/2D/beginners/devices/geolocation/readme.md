#Accès à l 'information géographique par geologation
[toc]

##Situation géographique

Si le dispositif supporte geologation et le navigateur utilisé, la geologation peut être utilisée pour obtenir la position géographique actuelle du dispositif.Vous pouvez ouvrir la page.[http://caniuse.com/](http://caniuse.com/#search=geolocation)#[search=geolocation](http://caniuse.com/#search=geolocation)Voir quelles versions de navigateur supportent geologation.Affiche le support.

![1](img/1.png)

Geologationinfo renvoyé, qui contient les informations suivantes:

##- Oui.`latitude`- dimension. `longitude` —— 经度（度）。

##- Oui.`altitude`- altitude par rapport au niveau de la mer (m).Si l'équipement ne fournit pas de données sur l'altitude,`altitude`Valeur Null `accuracy`- renvoie la précision des latitudes en mètres.
##- Oui.`altitudeAccuracy`- renvoie la précision de l 'altitude en mètres.`altitudeAccuracy`Peut - être`null`". `heading` —— 返回设备的移动方向（角度），指示距离北方的角度。0度表示指向正北方，方向以顺时针旋转（这表示东方是90度，西方是270度）。如果`speed`Zéro.`heading`Oui.`NaN`".Si le dispositif n 'est pas disponible`heading`Information`null`".
##- Oui.`speed`- renvoie la vitesse de déplacement du matériel par seconde (mètre).`speed`Peut - être`null`". `timestamp`- délai pour obtenir des informations.

Les propriétés statiques de geologation comprennent les paramètres généraux suivants:

##- Oui.`enableHighAccuracy`La valeur booléenne est appliquée pour obtenir le meilleur résultat possible si elle est définie comme vrai et si l 'appareil peut fournir une position plus précise.On observe que cela peut entraîner une durée de réponse plus longue et une consommation d 'énergie plus importante (par exemple, lorsque le GPS du dispositif mobile est activé). `timeout`- nombre entier positif représentant la limite maximale de temps (millisecondes) pour revenir à la position.Par défaut`Infinity`Ce qui signifie`getCurrentPosition()`Il ne revient que lorsque la position est disponible.
- Oui.`maximumAge`- un nombre entier positif de 32 bits représentant la durée maximale de vie de la position tampon disponible pouvant être renvoyée.Si le réglage est 0, cela signifie que le dispositif n 'utilise pas la position tampon et tente toujours d' obtenir une position en temps réel.Si`Infinity`, le dispositif doit retourner à la position tampon indépendamment de sa durée de vie.Valeur par défaut: 0

###Acquisition du positionnement actuel

Procédé statique`Geolocation.getCurrentPosition()`Prenez la position actuelle.`getCurrentPosition()`Juste une fois.


```java

// 尝试获取当前位置
Geolocation.getCurrentPosition(
				Handler.create(this, onSuccess), 
				Handler.create(this, onError)
);

// 成功获取位置后触发
function onSuccess(info:GeolocationInfo):void
{
	trace('经纬度: (' + info.longitude + '°, ' + info.latitude + '°)，精确度：' + info.accuracy + 'm');
	
	if(info.altitude != null)
		trace('海拔：' + info.altitude + 'm' + (info.altitudeAccuracy != null ? ('，精确度：' + info.altitudeAccuracy + 'm') : ''));
		
	if(info.heading != null && !isNaN(info.heading))
		trace('方向：' + info.heading + "°");
		
	if(info.speed != null && !isNaN(info.speed))
		trace('速度：' + info.speed + "m/s");
}

// 获取位置失败后触发
function onError(err:Error):void
{
	var errType:String;
	if (err.code = Geolocation.PERMISSION_DENIED)
		errType = "Permission Denied";
	else if (err.code == Geolocation.POSITION_UNAVAILABLE)
		errType = "Position Unavailable";
	else if (err.code == Geolocation.TIMEOUT)
		errType = "Time Out";
	trace('ERROR(' + errType + '): ' + err.message);
}
```


Utilisation de la démonstration`getCurrentPosition()`Pour obtenir les informations de localisation courantes, imprimer les informations de localisation lorsque cela est possible, imprimer les informations d 'erreur et les raisons d' erreur en cas d 'échec.

###Changement de position de surveillance

Outre l 'acquisition de la position courante, le changement de position peut être surveillé.Utiliser`Geolocation.watchPosition()`La fonction renvoie une valeur d 'ID d' un moniteur et peut être utilisée`Geolocation.clearWatch()`Et saisissez la valeur id pour annuler`watchPosition()`Un moniteur de position enregistré.


```typescript

// Geolocation.watchPosition函数签名
Geolocation.watchPosition(
	Handler.create(this, updatePosition),
	Handler.create(this, onError));
function updatePosition(info:GeolocationInfo):void { }
function onError(err:Error):void { }
```


​`watchPosition()`Avoir`getCurrentPosition()`La même signature.à propos de`watchPosition()`Afficher la position actuelle à l 'aide d' une carte de Baidu