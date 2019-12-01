#Surveillance d 'état réseau
En raison de la précarité de l 'environnement de réseau du dispositif mobile, lorsque le réseau change, il est souvent nécessaire d' informer l 'utilisateur dans le projet et il existe deux méthodes dans le layaplayer pour obtenir une modification de l' environnement de réseau.

##Méthodes d'écoute

L 'développeur peut modifier le réseau d' écoute en utilisant une fonction d 'enregistrement d' écoute, dont le Code est le suivant:

Code js:

```javascript

if( conch )
{
    conch.setNetworkEvtFunction(function(type)
    {
	    alert(type)
    });
}
```

Code as:

```javascript

if ( Render.isConchApp)
{
    Browser.window["conch"].setNetworkEvtFunction(function(type):void
    {
        alert(type)
    });
}
```


**Type int**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_UNKNOWN=5
```

**Tips**  
* 1, NCH n 'est disponible que dans l' environnement de layaplayer, il n 'y a pas de définition de Concord dans la version Web et tous les éléments doivent être évalués.*
* Les objets Conch peuvent être obtenus par le biais de browser.window ['Conch'] lorsque la langue a été mise au point.*
* 3, ou si l'on utilise un F (render.isconchapp) pour juger.*

##Modalités de la recherche

L 'développeur peut également demander l' état du réseau par une requête active, le code suivant:


```javascript

if( conch )
{
    var nType = conch.config.getNetworkType();
}
```


**Type int**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_UNKNOWN=5
```




