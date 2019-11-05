#Prends le bouton arrière d'Android.
Ces deux fonctions peuvent être utilisées dans la layanative, conch.setonbackpressedfunction (onback) et conch.exit () pour prendre le relais avec le bouton arrière.Lorsque setonbackpressedfunction est prise en charge, cette fonction est exécutée lorsque l 'utilisateur appuie sur la touche arrière.

Une fois que cette fonction est activée, la fonction du moteur qui consiste à appuyer par défaut sur les deux retraits suivants est masquée, et si vous voulez quitter l 'application, vous pouvez alors l' obtenir en faisant appel à la fonction Exit ().


**Tips**  
* 1, Conch n 'est disponible que dans l' environnement layanative, où il n 'y a pas de définition de Concord dans la version Web et où il est donc nécessaire de déterminer s' il existe.*
* Les objets Conch peuvent être obtenus par le biais de browser.window ['Conch'] lorsque la langue a été mise au point.*
* Ces deux fonctions ne sont disponibles que dans la version Android de layanative.*


J Exemples:

```javascript

var n=3;
if(window.conch){
    window.conch.setOnBackPressedFunction(()=>{
        console.log('press back '+n);
        if(n-- <=0){
            window.conch.exit();
        }
        else{
            //用户自己的代码，例如返回上层页面
        }
    });
}
```
