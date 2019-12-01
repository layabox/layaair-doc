#Contact avec le canal Native app par un mécanisme de réflexion

Layanative fournit à l 'développeur une interface par le biais d' un mécanisme de réflexion, et le contenu ci - après donne des détails sur la manière dont le mécanisme de réflexion peut être utilisé pour mener à bien le travail sur le canal d 'interface.

###Les villes commerciales des canaux d'interconnexion

Layanative a mis en place un mécanisme de réflexion pour l 'intercommunication de javascript avec la langue de développement originale (Java sous Android, objective - C sous iOS) et les développeurs n' ont plus qu 'à achever le développement de la partie restante de la langue de développement originale (Java sous Android, IOS sous objective - c).

####1.1 réalisation par les centres commerciaux de canaux d'interconnexion sous le système IOS:

#####Part. 1 - réflexe des noms:

Dans le cadre du projet iOS mis en place par layanative, nous allons voir la catégorie marketappstore créée automatiquement sous le catalogue platforminterface, héritée de la catégorie layaplatforminterface, et la mise en place de Platform classname = marketappstore, par exemple, pour réécrire LP u login dans le catalogue marketappstore.mm.Le second développement du procédé gin.

#####Partie 2 - Javascript pour oc:

Par exemple, dans le cas de Javascript, le procédé login par l 'intermédiaire de l' appel de la classe concordmarket est en fait le procédé LP u login dans l 'interpface de layaplatform, qui est en fait le procédé d' appel oc de JavaScript.

#####Partie 3 - OC appelle javascript:

Dans le cas de Javascript, une fois achevée la mise en oeuvre de la méthode login d 'appel de type conchmarket, qui est indiquée dans layaplatformcallback, puis dans le procédé LP u login de layaplatform interface, qui fait appel à la méthode LP \ \ logincallback de layaplatform Callback pour obtenir l' appel oc à JavaScript.

#####Partie 4 - fragments de code:


```javascript

// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// TODO 数据处理.
});
```



```javascript

// MarketAppStore.mm文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
-(void)LP_Login:(NSString*)jsonParam{
// TODO 调用第三方平台的登陆的登陆接口
// OC层调用登录结束回调.
[[LayaPlatformCallback GetInstance] LP_LoginCallback:pJsonString];
}
```


####1.2 réalisation dans les villes commerciales de canaux d'interconnexion sous le système Android:

#####Part. 1 - réflexe des noms:

Dans le cadre du projet Android de layaair.game.market, il y a dans le sac layaair.game.market une catégorie créée automatiquement, héritée de la catégorie layaplatforminterface.

#####Partie 2 - Javascript pour Java:

Par exemple, dans le cas de Javascript, le procédé login utilisé par le type conchmarket est en fait le procédé LP u login de layaplatforminterface, qui est en fait le procédé LP u login de JavaScript de Java, c 'est - à - dire le procédé LP u login = layaplatforminterface.

#####Partie 3 - Java appelle javascript:

Dans le cas de Javascript, par exemple, une méthode de régression est mise en oeuvre une fois achevée la mise en œuvre de la méthode login appelée par la classe concordmarket, dans la layaplatformcallback, qui est déclarée dans la layaplatformatformatformatformatformatformatformat Callback puis, dans la layaplatformatformatformatformatformatformatformat interffac, la méthode LP ` U U login appelle layaplatformcalllback pour obtenir Java appeler javascript: layaplatformforminterfinterfinterfinterfinterfinterfinterfinterfinterfinterf.- u login.= > LP \ \ u logincallback de layaplatformcalback.

#####Partie 4 - fragments de code:


```javascript

// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// 数据处理.
});
```



```javascript

// MarketTest.java文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
public void LP_Login(final String jsonParam)
{
// 调用第三方平台的登陆的登陆接口
// Java层调用登录结束回调.
LayaPlatformCallback.GetInstance().LP_LoginCallback(objCallBack.toString());
}
```


###Intégration API des canaux d'interconnexion

Grâce au mécanisme de réflexion fourni par layanative, les concepteurs peuvent établir une interface unifiée (par exemple, accès, partage, recharge, etc.) entre les différents canaux au niveau de Javascript, puis utiliser la base de langage de développement original du système. Layanative intègre les API associés aux canaux d'interconnexion par l'intermédiaire de la direction générale conchmarket afin de faciliter l'utilisation par l'émetteur, comme suit:

(Note: le codage de la partie de l'interface correspondant à la langue de développement originale (Java sous Android, objective - C sous iOS) est effectué par l'intermédiaire du Code d'exemple en cours de développement secondaire.

124, nom API \ \ 124api description \ \ 124, prototype API \ \ 124
----------------------------------------------------------------------------------------------------------------------------------------------
12 - 4 - 2 - 4.`conchMarket.init(JSON.stringify(sData),function(data));`- 124.
124, & 124, & 124, & 124`conchMarket.login(JSON.stringify(sData),function(data));`- 124.
124, \ \ 124.`conchMarket.logout(JSON.stringify(sData),function(data));`- 124.
124. Switchuser \ \ 124.`conchMarket.switchUser(JSON.stringify(sData),function(data));`- 124.
124 jetterplatform \ \ 124`conchMarket.enterPlatform(JSON.stringify(sData),function(data));`- 124.
124, enterbbs, 124.`conchMarket.enterBBS(JSON.stringify(sData),function(data));`- 124.
124, enterfeedback \ \ 124.`conchMarket.enterFeedback(JSON.stringify(sData),function(data));`- 124.
124, enteraccountmgr \ \ 124`conchMarket.enterAccountMgr(JSON.stringify(sData),function(data));`- 124.
124, authorize \ \ 124.`conchMarket.authorize(JSON.stringify(sData),function(data));`- 124.
124 treafreshtoken \ \ 124`conchMarket.refreshToken(JSON.stringify(sData),function(data));`- 124.
".124.rechrge (1.0.4 renuméroté CZ) \ \ 124.`conchMarket.recharge(JSON.stringify(sData),function(data));`- 124.
12, 4, 2, 4, 2, 4, 2, 4, 3, 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, 3, 4, 4, 4, 4, 3, 4, 3, 4, 4, 4, 3, 4, 4, 4, 3, 4, 4, 4,`conchMarket.buyProps(JSON.stringify(sData),function(data));`- 124.
124. Set recherchargeinfo (1.0.4 Renuméroter setczinfo).`conchMarket.setRechargeInfo(JSON.stringify(sData),function(data));`- 124.
124 treizer shareandfeed \ \ 124`conchMarket.enterShareAndFeed(JSON.stringify(sData),function(data));`- 124.
124, enteringite \ \ 124.`conchMarket.enterInvite(JSON.stringify(sData),function(data));`- 124.
124 jet gamefriends \ \ \ \ \ \ \ \ \ \ \ \ \ \`conchMarket.getGameFriends(JSON.stringify(sData),function(data));`- 124.
124, & eacute; send todesktop \ \ 124, & eacute`conchMarket.sendToDesktop(JSON.stringify(sData),function(data));`- 124.
124, poste toplatform.`conchMarket.sendMessageToPlatform(JSON.stringify(sData),function(data));`- 124.
124. Est - ce que ça pushicon 124.`conchMarket.canSendToDesktop(JSON.stringify(sData),function(data));`- 124.
124, opentopic Circle \ \ 124`conchMarket.openTopicCircle(JSON.stringify(sData),function(data));`- 124.

**Appendice**

[对接渠道demo for Eclipse(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForEclipse.zip)

[对接渠道demo for AndroidStudio(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForAndroidStudio.zip)