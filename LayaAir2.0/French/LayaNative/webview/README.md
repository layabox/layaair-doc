#Webview

##Introduction

Étant donné que layanative ne supporte pas le HTML standard, il arrive que le projet doive afficher une page HTML complète, ce qui peut être réalisé par l 'intermédiaire d' une interface d 'affichage de l' interface webview fournie par layanative.
###Définition de l'interface


```typescript

    /**
     * 显示一个webview
     * @param url {string} 要显示的url地址。
     * @param posx {number} weview的左上角位置
     * @param posy {number} webivew的左上角位置
     * @param width {number} webview的宽度
     * @param height {number} webview的高度
     * @param canclose {boolean} webview是否可以被关掉。
     */ 
    setExternalLinkEx(url:string,posx:number,posy:number,width:number,height:number,canclose:boolean):void;
```


Cette fonction affiche une nouvelle vue au niveau le plus élevé de la toile, dans laquelle le contenu URL est affiché.

`canclose`Les paramètres permettent de contrôler si ce webview peut être éteint:
* paramètres`false`Heure:

Code:



    
```typescript

    document.addEventListener('touchstart',()=>{
        if(conch){
            var l = 50;
            var t = 50;
            var w = window.innerWidth - l * 2;
            var h = window.innerHeight - t * 2;
            conch.setExternalLinkEx('http://www.layabox.com',l,t,w,h,false); // canclose设置为false
            //conch.setExternalLink('http://www.baidu.com');
        }
    });
    ```


Webview ne peut pas fermer une fois qu'il apparaît, avec les résultats suivants:



    ![ios webview](img/1.png)

Figure 1

* paramètres`true`Heure:

Code:



    
```typescript

    document.addEventListener('touchstart',()=>{
        if(conch){
            var l = 50;
            var t = 50;
            var w = window.innerWidth - l * 2;
            var h = window.innerHeight - t * 2;
            conch.setExternalLinkEx('http://www.layabox.com',l,t,w,h,true); // canclose设置为true
            //conch.setExternalLink('http://www.baidu.com');
        }
    });
    ```




* sous iOS, il y aura un petit bouton d 'arrêt, cliquez sur ce bouton pour fermer webview.Les résultats sont les suivants:



        ![ios webview](img/2.png)

Figure 2

* comme le bouton désactivé recouvre une partie du contenu de la page et qu 'une touche arrière est disponible sur le dispositif Android, il n' y a pas de bouton désactivé après l 'affichage webview du dispositif Android, qui peut passer**Touche arrière**Coupez webview.Les figures suivantes:





        ![android webview](img/3.png)

Figure 3 désactivation de webview en cliquant sur le bouton arrière

###Restrictions
Webview n'est pas actuellement en mesure d'interagir avec APP.
La mise en œuvre de webview dépend du système et la version basse d'Android peut ne pas être affichée.

**Tips**  
* 1, Conch n 'est disponible que dans l' environnement layanative, où il n 'y a pas de définition de Concord dans la version Web et où il est donc nécessaire de déterminer s' il existe.*
*Si vous utilisez la langue as pour développer`Browser.window['conch'] `Ceci permet d 'obtenir l' objet Concord.*


##Comment fermer dynamiquement la page webview dans un code

Vous pouvez désactiver dynamiquement la page webview en appelant le code suivant:


```javascript

conch.closeExternalLink();
```
