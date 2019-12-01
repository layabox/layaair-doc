#Webview
Comme layaplayer ne supporte pas le HTML standard, il arrive que le projet doive afficher une page HTML complète, ce qui peut être réalisé par l 'intermédiaire d' une interface d 'affichage de l' interface webview fournie par layaplayer.
**Définition d 'interface**  

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
Les paramètres canclose permettent de contrôler si ce webview peut être éteint:
`false`Cette webview ne peut pas être éteinte une fois ouverte.
`true`Dans le cas IOS, il y a un petit bouton d 'arrêt qui peut être désactivé en cliquant sur ce bouton (voir la figure 1); aucun bouton d' arrêt n 'est désactivé en dessous d' Android pour fermer webview (voir la figure 2), car le bouton d 'arrêt recouvre une partie du contenu de la page et, par conséquent, ne peut pas être affiché.


**Restriction**
Webview n'est pas actuellement en mesure d'interagir avec APP.
La mise en œuvre de webview dépend du système et la version basse d'Android peut ne pas être affichée.

**Tips**  
* 1, NCH n 'est disponible que dans l' environnement de layaplayer, il n 'y a pas de définition de Concord dans la version Web et tous les éléments doivent être évalués.*
*Si vous utilisez la langue as pour développer`Browser.window['conch'] `Ceci permet d 'obtenir l' objet Concord.*


##Effet réel
![ios webview](img/1.png)  

Figure 1
X dans le coin supérieur gauche de webview, c 'est le bouton d' arrêt correspondant lorsque canclose est configuré pour true.Si canclose = faux, il n 'y a pas de bouton.

![android webview](img/2.png)  

Figure 2

##Code d 'exemple

```javascript

//@ts-check

conch && conch.showAssistantTouch(false);
var ctx = document.createElement('canvas').getContext('2d');
function render(){
    ctx.fillStyle='#99d9ea';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);

document.addEventListener('touchstart',()=>{
    if(conch){
        var l = 50;
        var t = 50;
        var w = window.innerWidth-l*2;
        var h = window.innerHeight-t*2;
        conch.setExternalLinkEx('http://www.layabox.com',l,t,w,h,true);
        //conch.setExternalLink('http://www.baidu.com');
    }
});
```


##Comment désactiver dynamiquement la page webview dans un code


```javascript

conch.closeExternalLink();
```
