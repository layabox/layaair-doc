#Achats internes



In app purchase, ci - après dénommé IAP.

Comme app store ne supporte pas des modes de paiement similaires à ceux utilisés par des tiers, tels que les paiements au Trésor ou au micro - message, quel que soit le moteur ou l 'outil mis au point, l' opération doit en fin de compte être effectuée par l 'intermédiaire de l' IAP fourni par Apple.

Layabox encapsule cette partie de l 'interface de corrélation afin d' aider le développeur à économiser le temps de débogage de l 'interface de corrélation IAP et la fournit au développeur par le biais de la langue Javascript pour un appel direct ou une extension.

Le processus IAP est très simple et le client communique directement avec App Store pour effectuer la transaction, comme le graphique ci - après:

​![blob.png](1.png)< br / >
Figure 1


Pour les jeux mono - ordinateurs, le diagramme ci - dessus a déjà mené à bien un processus IAP, mais, compte tenu des risques de fraude, le développeur peut également ajouter les étapes de validation suivantes:

​![blob.png](2.png)< br / >
Figure 2

Il est donc conseillé à l 'développeur d' ajouter des étapes de vérification!

##Code de référence

###Codage dans la couche d 'application JavaScript


```javascript

// JavaScript中 组装充值相关参数. (参数意义参见本文末尾处的附录1)
var json= '{"order_id":"OriderID_20160824_9824","amount":1,"product_id":"Laya.joychina.test","callback_uri":"http://186.152.54.225:8800/Apple.pay"}';
 
// JavaScript中 调用充值函数. (这里会调用原生开发语言中对应的LP_Login方法)
conchMarket.recharge(json,function(jsonString) {
     var pJson = JSON.parse(jsonString);
     console.log("code:"+ pJson .code);
     console.log("product_id:"+ pJson.product_id);
     console.log("amount:"+ pJson.amount);
     console.log("order_id:"+ pJson.order_id);
     console.log("desc:"+ pJson.desc);
});
```


###Codage indirect dans le système iOS

(Note: un exemple de biens consomptibles de la catégorie iapmanager est fourni dans la layanative à titre de référence.


```javascript

// MarketAppStore.mm文件中的LP_CZ方法中添加内购相关代码, 然后在JavaScript中调用conchMarket.recharge就会执行此方法.
//以前版本叫LP_Recharge，因为怕苹果扫描误伤，改成了不专业的拼音 充值
-(void)LP_CZ:(NSString*) jsonParam
{
    // TODO 添加内购相关代码.
}
```


Cette étape permet de réaliser facilement la fonction IAP dans l 'iOS.

###Interface de recharge et description des paramètres:


  `conchMarket.recharge(jsonParam,callBack);`

`jsonParam`Pour la chaîne json, l 'objet json doit fournir les attributs suivants

Le nom \ \ 124 type \ \ 124
124 - - - - 124 - - - - - 124 - - - - - 124 - - - Springs ------------------------------------------------------------------------------------------
124, produit u ID \ \ 124, \ \ string \ \ \ 124, \ \ \ \ 4 \ \ id de base pour Apple
124 \ \ 124 \ \ nombre d 'Achats
124 \ \ Order u ID \ \ 124 \ \ string \ / 124 \ \ id
L 'adresse d' authentification du serveur



`callBack`Paramètre d 'acquisition de la fonction de retour, renvoie un paramètre de chaîne de caractères json dont les propriétés sont les suivantes:

Le nom \ \ 124 type \ \ 124
124 - - - - - - 124 - - - - 124 - - - 124 - - - - - 124 - - - - - 124 - - - - - 129 -----------------------------------------------------------------------------
124 cout \ \ 124 \ \ number \ \ \ \ \ \ \ \ \ \ \ \
124, produit u ID \ \ 124, \ \ string \ \ \ 124, \ \ \ \ 4 \ \ id de base pour Apple
124 \ \ 124 \ \ nombre d 'Achats
Nos 124 commandes ont été passées à 124.
124, DESC \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ 

###Note:

La fonction IAP de l'IOS n'est pas une fonction essentielle du moteur layanative, et cette partie du Code est également ouverte et peut être adaptée par le développeur lui - même en fonction de ses propres besoins. En cas de problème de valeur, layabox n'est pas responsable de la recherche de bug et n'a pas de problème juridique.
