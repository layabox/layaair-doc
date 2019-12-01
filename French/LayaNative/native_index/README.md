##Layaplayer
Layaplayer n'est pas un navigateur!
Layaplayer n'est pas un navigateur!
Layaplayer n'est pas un navigateur!
Layaplayer est maintenant lancé par un index.html, mais il s' agit simplement de faciliter et d 'harmoniser avec le navigateur.Layaplayer n 'est pas basé sur un navigateur, n' exécute pas le contenu HTML par l 'Encapsulation d' un navigateur ou d 'un contrôle comme webkit.La compatibilité avec HTML soulève les questions suivantes:
Layaplayer ne s' intéresse qu 'à la partie du HTML`<meta>`Et...`<script>`étiquette.Les autres étiquettes sont ignorées.Et`<meta>`L 'étiquette ne contient plus que`name='laya'`Pour définir des écrans verticaux et d 'autres configurations, par exemple:</script>

    
```html

    <meta name='laya' screenorientation='landscape' >
    ```

Les étiquettes script sont de préférence sous la forme de src = 'xxx', car les scripts sous forme d 'interconnexion interne sont complexes et ne peuvent pas être interprétés à l' aide d 'expressions régulières et risquent de donner lieu à des erreurs d' interprétation.
Rien d'autre n'a été appuyé.La jquery dépendant de Dom n 'est donc pas appuyée.
De même, comme layaplayer n'est pas basé sur Node, tous les scripts basés sur Node ne sont pas appuyés.
Les autres fonctions prévues dans la version suivante n'ont pas encore été remplies:

124, fonction \ \ 124, priorité \ \ 124.
124: - - - 124: \ \ 124.
12 - 4.
124. Orientation \ \ 124.
124. Webassembly \ \ 124.
La synchronisation de l 'acquisition xmlhptrequest \ \ \ \ \ \ \ \ \ \ \ \ \
124. Webvideo \ \ 124.
124. Webworker.
- 124. Webvr.
    



**Conseils:**  
LayaPlayer在运行的时候，如果遇到不支持的标签，会直接弹框报错。如图1  
[IMG / 1.ping]
Figure 1


