# LayaNative首页说明

Layanative n'est pas un navigateur!< br / >
Layanative n'est pas un navigateur!< br / >
Layanative n'est pas un navigateur!

Layanative a maintenant été lancée par chargement d 'index.js ou runtime.json, et non par l' index.html du projet.Layanative.**Web Browser**Le contenu HTML n 'est pas exécuté par Encapsulation d' un navigateur ou d 'un contrôle tel que webkit.


##Description du fichier de configuration de démarrage

Layanative peut choisir de démarrer par index.js ou runtime.json.Ces deux documents présentent les fonctions suivantes:

* détermine les documents JS à charger pour l'exécution du projet.
* Écrans verticaux.

Les modifications spécifiques suivantes ont été apportées:

**Utilisation de l'index.js comme document d'ouverture**

* La fonction loadlib est utilisée pour déterminer les fichiers JS à charger lors de l'exécution du projet.
* modification de la valeur de la variable window.screenorientation pour les écrans verticaux.

Par exemple:


```javascript

window.screenOrientation = "landscape"; // 设置屏幕为横屏
loadLib("libs/matter.js");   // 启动时加载“libs/matter.js”文件
```



**Attention:**Veuillez ne pas créer de code logique dans le document index.js s' il y a un risque d 'erreur inconnue.

**Utilisation de runtime.json comme document d'ouverture**

Le projet peut également choisir d 'utiliser le fichier runtime.json comme document de démarrage.Le format de fichier json est plus facile à comprendre en tant que fichier de configuration démarré que l 'index.js.

* "scripts": document JS à charger pour déterminer si le projet doit être exécuté.
* screenorisation: réglage des écrans verticaux.

Par exemple, les paramètres suivants sont définis pour charger le fichier "temp.js" au démarrage et l 'écran est défini comme un écran transversal


```json

{
	"scripts": ["temp.js"],
	"screenOrientation": "landscape"
}

```
