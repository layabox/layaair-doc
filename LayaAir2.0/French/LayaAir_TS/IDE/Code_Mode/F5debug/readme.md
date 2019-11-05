#2.2 Mise en service de la version F5

L'outil d'édition de code de layaairide est vscode.

La mise en page F5 est un outil de réglage vscode.

Toutefois, les modifications apportées à la traduction de la version 2.2 entraîneraient un appui à la mise en page F5, ce qui entraînerait une augmentation du Répertoire Bin.La mise à l 'essai F5 est donc désactivée et il est recommandé d' utiliser l 'opération F6 pour activer la mise à l' essai Chrome.(les concepteurs de Mac doivent veiller à ce que le processus de chrome ne soit pas ouvert avant l 'introduction de la F6, faute de quoi le processus de chrome de transfert F6 sera affecté)

Chrome est le mode de mise en page préféré recommandé depuis longtemps et il est recommandé que les développeurs utilisent le chrome pour tester le projet.

Si le développeur a des besoins spécifiques, Veuillez démarrer l 'appui de la mise en service F5 de layaairide de la manière suivante.

###I. MODÈLE module ts (Experimental Edition) Comment démarrer la mise en page F5

####Modifications`.laya/compile.js`

Trouver`sourceMap: false`Modifier comme suit:`sourcemap: true`

Il y en a deux.`sourcemap`Modifier les paramètres`true`".

####Modifications`.laya/launch.json`

Trouver`"sourceMaps": false,`Modifier comme suit:`"sourceMaps": true,`

Il y en a deux autres, l 'un layaair et l' autre Chrome.

Comme nous suggérons de passer par chrome, il suffit de changer de chrome.Si vous avez besoin d 'utiliser layaair, vous pouvez tous changer, ou seulement regarder layaair, cela dépend de vos besoins.

####Modifications`src/tsconfig.json`

Ajouter "source" sous Compilers: vrai

Tsconfig.json modifié comme suit:


```json

{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "baseUrl": "../libs",
    "outDir": "../build/src",
    "sourceMap": true
  },
  "references": [
    {"path":"../libs"},
  ],
  "exclude": [
    "../node_modules"
  ]
}
```




###Projet ts en mode bundle, comment démarrer la mise en service F5

####Modifications`.laya/compile.js`

Trouver`sourceMap: false`Modifier comme suit:`sourcemap: true`

Il y en a deux.`sourcemap`Modifier les paramètres`true`".

####Modifications`src/tsconfig.json`

Will`"sourceMap": false`Modifier comme suit:`"sourceMap": true`

Tsconfig.json modifié comme suit:


```json

{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "noEmitHelpers": true,
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ]
}
```




###Projet JS, comment démarrer la mise en route de la F5

Trouver`sourceMap: false`Modifier comme suit:`sourcemap: true`

Il y en a deux.`sourcemap`Modifier les paramètres`true`".

> Il n 'y a qu' une seconde possibilité, il est recommandé de changer les deux.