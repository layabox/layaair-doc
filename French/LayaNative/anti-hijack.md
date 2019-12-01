##Protection contre les enlèvements
Le détournement du site Web décrit ici le fait pour un prestataire de services de réseau ou un dispositif d 'acheminement d' un niveau quelconque de modifier le résultat d 'une demande de l' utilisateur au moyen d 'un procédé d' enlèvement d 'ADN ou d' un procédé de détournement du site Web, de manière à introduire une publicité sur la page actuelle.
Les données HTML acquises par l 'utilisateur sont dynamiquement modifiées par suite de l' enlèvement du site Web, par exemple en demandant l 'insertion d' une page`<script>`étiquette pour exécuter un code publicitaire qui ne peut généralement pas être exécuté à layaplayer, ce qui entraîne une erreur dans le cadre de la bombe dès le démarrage de l 'app.</script>
Une solution à ce problème consiste à ajouter des attributs spéciaux à l 'étiquette script, ce qui permet de les distinguer de l' étiquette script insérée.
* exemples d'emploi: *

```html

<meta name='laya' layajsprotect='true' >

<script src='main.js' loader='laya' ></script>
```

`layajsprotect='true'`Ouvre cette protection.
`loader='laya'`Ça veut dire que c 'est son propre JS.