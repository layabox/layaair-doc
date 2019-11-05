#Exposé de subshader

###### *version :2.3.0   Update:2019-10-8*

​**Subshader subshader**On peut comprendre le programme de rendu de shader.Chaque Shader a au moins un subshader et peut en avoir plusieurs.

Description des attributs de subshader dans layaair3d:

​`setFlag`Ajouter une marque.

​`getFlag`Marque.

​`addShaderPass`Ajouter un shaderpass.

###Création d'un subshader

Nous avons déjà eu un contact simple avec le subshader lors de l 'utilisation de shader personnalisé, et nous avons utilisé le plus important.`addShaderPass`Ajouter une interface shaderpass.


```typescript

 //所有的attributeMap属性
var attributeMap = {
    'a_Position': Laya.VertexMesh.MESH_POSITION0,
    'a_Normal': Laya.VertexMesh.MESH_NORMAL0
};

//所有的uniform属性
var uniformMap = {
    'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE, 
    'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE
};

//注册CustomShader 
var customShader = Laya.Shader3D.add("CustomShader");

//创建一个SubShader
var subShader = new Laya.SubShader(attributeMap, uniformMap);

//我们的自定义shader customShader中添加我们新创建的subShader
customShader.addSubShader(subShader);

//往新创建的subShader中添加shaderPass
subShader.addShaderPass(simpleShaderVS, simpleShaderFS);
```


###Atributemap and uniformmap

Nous mettons l'accent sur deux paramètres importants pour créer subshader:`attributeMap`Oui.`uniformMap`".

> À propos de`spriteDefines`Et`materialDefines`Il sera derrière.**Définition de macro Shader**Expliquer.Dans le même temps, la création de subshader a été optimisée dans la version 2.3 * et les deux attributs peuvent être supprimés.

[] (IMG / 1.png) <br >

Ces deux - là.**Object**Tous sont appelés Key, par exemple a ` U position, u ` mvpmatrix, ou Uniform.

**Atributemap**La valeur correspondante de la Key centrale est le canal supérieur correspondant à la propriété lors du rendu.

**Uniformmap**La valeur correspondante de Key est la période de soumission de l 'attribut.

`uniformMap`Types de cycles actuellement appuyés:

* * shader3d.period \ \ u camera**: cycle de présentation des variables Shader, par caméra.****
****
**Shader3d. Period \ \ u Custom**: période de soumission de la variable Shader, personnalisée.****
****
**Shader3d. Period 'u Material**: période de soumission des variables Shader, par matière.****
****
**Shader3d. Period \ \ u scene**: période de soumission de la variable Shader, par scène.****
****
**Shader3d.period \ \ u Sprite * *: variable Shader cycle de soumission, par elfe et caméra

L 'Uniform de ces trois cycles est la valeur d' entrée automatique du moteur.

L 'Uniform, par matériau et par cycle personnalisé, est une entrée reprise par l' développeur.Comme un exemple officiel, dans le Shader de pass...[demo地址](http://layaair2.ldc2.layabox.com/demo2/?language=ch&category=3d&group=Shader&name=Shader_MultiplePassOutline)Le développeur s'en occupe.**Couleur de bordure**Oui.**Largeur de ligne**Valeur Uniform.(sur la façon dont le développeur gère les valeurs Uniform lui - même**Uniform associant Shader**Expliquer dans le texte

Pour ce qui est de l 'attribut supporté par le moteur, la table correspondante peut être consultée avec Uniform traité par le moteur.(tableaux attribute, Uniform)


