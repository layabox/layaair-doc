- 1, 271 + 0, < 0 >

#Layaair - cmd

[toc]

**Layaair - cmd**Oui.**Layaair**Outil de ligne de commande**Layaair - cmd**Non.**Id**Dans le cas de**Layaair**Les projets sont compilés et publiés, et d 'autres opérations.Il comprend les fonctions suivantes, qui correspondent toutes à une sous - commande.

124, fonction \ \ 124.
124 --------------------------------------------------------------------------------------------
En fait, c 'est à peu près ça.
- 124.
U1 \ \ 124.
Contrôle de la mise en page des ressources naturelles.
"124. Using guetzli compression JPG \ \ 124 getzli \ \ 124
Ouvrez le serveur de fichiers statiques.



##Installation


```shell

$ npm install layaair-cmd -g
```




##CLI

**Layaair - cmd**Similarité**Git**Il s'agit de:


```shell

$ layaair-cmd [command] [args]
```


Par exemple, le projet de compilation:


```shell

$ layaair-cmd compile
```


Ou cliquez sur les informations d 'aide:


```shell

$ layaair-cmd --help
```


Non seulement**Layaair - cmd**En soi, toutes les sous - commandes ont une version des informations et des informations d 'aide pour afficher les informations d' aide sous - commandes:


```shell

$ layaair-cmd command -h
```


**Layaair - cmd**Pour les commandes macromoléculaires, il faut que le répertoire actif contienne**Layaair**Vous pouvez spécifier manuellement les entrées dans le Répertoire`guetzl`Oui.`atlas`L'ordre est direct.`$ layaair-cmd atlas`, vous pouvez également spécifier la table de saisie.



##Compiler


```shell

$ layaair-cmd compile -h

  Usage: layaair-cmd compile [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```


Si le répertoire actif existe**Layaair**Cette commande génère une version compilée.**JavaScript**Documentation.Compiler**ActionScript**Et**Typescript**Besoins du projet**JavaScript**Et ne rien faire.

####Utiliser


```shell

$ layaair-cmd compile
```




##Publication


```shell

$ layaair-cmd publish -h

  Usage: layaair-cmd publish [options]

  Options:

    -V, --version                   output the version number
    -o --compressOptions <options>  压缩选项。留空不处理，'c'表示压缩，'cc'表示压缩并合并
    -n --versionName <name>         version name
    --noCompile                     不重新编译项目
    --noUi                          不重新生成UI代码文件
    --noAtlas                       不重新生成图集
    -h, --help                      output usage information
```


Si le répertoire actif existe**Layaair**Cette commande va générer une fois publiée.**JavaScript**Fichier, dossier publié sous * release *.

####Utiliser


```shell

$ layaair-cmd publish -o cc # 指定了压缩选项为合并并压缩
```


##Export UI


```shell

$ layaair-cmd ui -h

  Usage: layaair-cmd ui [options]

  Options:

    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -a --atlas        generate atlas
    -d --code         generate ui code files
    -m --mode <mode>  'normal'或者'release'，指定'release'会生成除未使用资源外的UI代码文件
    -h, --help        output usage information
```


Si le répertoire actif existe**Layaair**La commande exporte les fichiers associés à l 'UI pour la page ui.

####Utiliser


```shell

$ layaair-cmd ui -c -m release # 导出前清理，并且把mode设置为release
$ layaair-cmd ui -d # 导出UI代码文件
$ layaair-cmd ui -a # 导出图集文件
```




##Contrôle de mise en page de ressources

**Contrôle de mise en page de ressources**Pour générer une version pour les ressources.Le numéro de version est augmenté par défaut à partir du nombre 1000`--versionName`Paramètre, utilisez le nom de la version spécifié par l 'utilisateur.La prochaine fois que vous créez une version établie, si vous ne l 'avez pas encore spécifiée`--name`, la version 1002, car chaque version est générée,**Contrôle de mise en page de ressources**Les compteurs internes augmentent.

Lors de l 'établissement de la version, les fichiers modifiés ou ajoutés sont enregistrés dans la nouvelle version par rapport à la version précédente.Aucune nouvelle version n 'est créée sans ajout de fichier ou modification de fichier.

> l 'utilisation finale des ressources ne permet pas l' utilisation d 'un trajet relatif de la couche supérieure, c' est - à - dire d 'un trajet contenant «... »


```shell

$ layaair-cmd resourceVersion -h

  Usage: layaair-cmd resourceVersion [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -i --input <input>               资源目录
    -o --output <output>             导出目录
    -n --versionName <version name>  版本名称，默认是从1000开始递增的数字
```


Cette commande n 'exige pas que le répertoire actif contienne**Layaair**Au lieu de cela, vous devez spécifier que vous devez saisir le Répertoire.



####Utiliser


```shell

$ layaair-cmd resourceVersion -i input_dir -o output_dir -n 1.1.0
# 指定了输入目录、输出目录和版本名称
```




####Fichier généré

> 1000
]
> ressources...
]
> 1001
]
> ressources...
]
> 1002
]
> ressources...
]
> record
]
> manifest.json



####Édition de ressources

Les dossiers * 1000 * * *, 1001 * * *, 1002 * sont les noms des versions de ressources par défaut qui enregistrent les ressources modifiées des versions correspondantes.Les ressources de mise en page correspondantes * sont lues à partir de ces dossiers en fonction des numéros de version les plus récents de chaque ressource provenant de * manifest.json *.



####Fichier d'enregistrement

* * record * ***UNIX - like**Le fichier masqué est dans le système.Ce fichier enregistre la version la plus récente des informations d 'établissement,**Contrôle de mise en page de ressources**On détermine ainsi Quels fichiers ont été modifiés lors de l 'établissement de la nouvelle version.Ce fichier ne peut pas être supprimé, si ce fichier est perdu, la version précédente sera perdue, ce qui reviendra à réinitialiser la version.



####Liste des ressources manifest.json

Les utilisateurs ont accès aux ressources les plus récentes sur la base de * manifest.json *.Ce fichier contient une paire de clés de ressources:


```json

{
    "res1": "1000",
    "res2": "1000",
    "res3": "1002",
    "sub\\res3": "1000",
    "sub\\res4": "1000"
}
```


Lorsque l 'utilisateur obtient un numéro de version correspondant aux ressources de la mappage, utilisez`资源根目录/版本号/相对文件路径`Accès aux ressources URL, chargement et utilisation.



####Transfert de ressources

* Les numéros des versions du document sont conservés.Il suffit donc de conserver l 'historique * manifest.json * Pour utiliser les ressources de la version correspondante.


##Guetzli

**Guetzli**Oui.**Google**Source**JPEG**CodeurPour sa présentation, son attention, etc., voir Documents officiels https: / / github.com / Google / guetzli.

**Guetzli**La compression est lente et absorbe des ressources importantes, ce qui peut prendre du temps.

J'espère.**Contrôle de mise en page de ressources**Utilisation dans le dossier créé**Guetzli**Compression, ce qui permet de ne pas répéter la compression d 'une image.


```shell

$ layaair-cmd guetzli -h

  Usage: layaair-cmd guetzli [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i --input <input>      resource directory.
    -q --quality <quality>  quality, more than 84.
```


Cette commande n 'exige pas que le répertoire actif contienne**Layaair**Au lieu de cela, vous devez spécifier que vous devez saisir le Répertoire.Une fois la compression réussie, le fichier source est modifié.Si la compression échoue, le fichier source reste inchangé.

####Utiliser


```shell

$ layaair-cmd guetzli -i input_dir -q 95
# 指定了压缩率95
```




##Ouvrir un serveur de fichiers statiques


```shell

$ layaair-cmd open -h

  Usage: layaair-cmd open [port] [args]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -p <port>      resource directory.
    -s             don't open browser
```


Cette commande doit être**Layaair**Les projets sont répertoriés dans la même structure.Pour**ActionScript**Le projet démarre le serveur de fichiers statiques /**JavaScript**Et**Typescript**Il sera là.**/ bin**Ouvrir le serveur de fichiers statiques;