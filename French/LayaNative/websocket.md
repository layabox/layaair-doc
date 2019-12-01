## websocket 
LayaPlayer支持websocket。  
Le websocket actuel est basé sur libwebsocket, la version actuelle (0.9.2) et la version antérieure layaplayer sont toutes deux libwebsockets - 1.6.
###Caractéristiques
Appui à l'IPv6.
Appui à la création d'agents.
Appui au Protocole wss à partir de la version 1.0

```javascript

 var ws = new WebSocket('wss://echo.websocket.org');
 ```
* * Tips:
Canal de lecture de fichier ca
Version IOS: resource / ca / cacert.pem in the Engineering catalogue
Version Android: assets / cacert.pem in the Engineering catalogue
###Restriction
Suspension de l'appui à des sous - accords, par exemple:

```javascript

var ws = new WebSocket('ws://echo.websocket.org','soap');
```

Le deuxième paramètre est inutile et sera directement ignoré.
