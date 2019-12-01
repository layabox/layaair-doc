#Micromessagerie iOS client complet à l 'intérieur du noyau wkwebview, les performances de HTML5 seront multipliées par 4!

2017 - 01 - 06

Depuis la dernière mise à niveau de l 'ICN à X5 Brink et la résolution des problèmes de compatibilité, l' iOS a également publié, dans la soirée du 6 janvier 2017, une nouvelle intéressante intitulée « micromessagerie iOS client va passer au noyau wkwebview, s' il vous plaît, les développeurs de pages Web sont invités à l 'adapter dès que possible ».Que signifie cette phrase pour les promoteurs non techniques?Layabox a d 'abord envoyé la réponse, puis l' a lue lentement.

Depuis la dernière mise à niveau de l 'ICN à X5 Brink et la résolution des problèmes de compatibilité, l' iOS a également publié, dans la soirée du 6 janvier 2017, une nouvelle intéressante intitulée « micromessagerie iOS client va passer au noyau wkwebview, s' il vous plaît, les développeurs de pages Web sont invités à l 'adapter dès que possible ».Que signifie cette phrase pour les promoteurs non techniques?Layabox a d 'abord envoyé la réponse, puis l' a lue lentement.

**Avantages de la mise à niveau**

]**Un, HTML5 performance de rendu quatre fois plus élevé.**
]
]**L'occupation de la mémoire sera réduite à 30%.**

La comparaison des liens d 'essai de performance établis par le frère technique révèle que l' écart actuel entre le noyau de micromessagerie uiwebview et le noyau wkwebview de Safari est environ quatre fois supérieur.L 'occupation de mémoire peut être réduite de moins de 30%.Le client de micromessagerie IOS est passé à wkwebview avec le noyau wkwebview actuel de safari.**L 'amélioration des performances et la réduction de l' occupation de la mémoire sont de bonnes nouvelles pour les développeurs de grands jeux HTML5, et les jeux futurs HTML5 peuvent facilement réaliser les effets des jeux app.**

**Cycle de mise à jour**

Le client iOS sera progressivement transformé en noyau wkwebview d 'ici au 1er mars 2017.

#### **Généralités**

Wkwebview est un nouveau module introduit par Apple dans ios - 8 pour fournir un contrôle de navigation de page moderne qui appuie la fonction webkit la plus récente, afin de se débarrasser des vieux, anciens et stupides problèmes du passé de uiwebview, en particulier l 'importance de la mémoire.Il utilise le même Moteur Nitro JavaScript que celui utilisé dans Safari, ce qui augmente considérablement la vitesse d 'exécution des pages JS.

####Procédé de transfert

La version 6.5.3 de l'IOS a commencé à appuyer le transfert manuel de wkwebview et uiwebview par l'émetteur, ce qui permet à celui - ci d'adapter wkwebview à l'avance.

**Transfert manuel:**

Cliquez sur le bouton plus haut à droite, sélectionnez dans le menu pour ajouter des amis à la page de liste de sessions de micromessagerie, et saisissez une chaîne de caractères dans la zone de recherche de l 'interface d' amis: ": switchweb", puis cliquez sur le bouton recherche dans le coin inférieur droit du clavier.Une fois le transfert réussi, le noyau actuellement utilisé est uiwebview ou wkwebview.

**Procédé de commutation de vérification**

Une fois que la commande a été transférée avec succès à wkwebview, on peut vérifier si l 'utilisation de la page Web actuelle est un noyau wkwebview par les moyens suivants.

Pour afficher la barre d 'adresses, utilisez actuellement wkwebview lorsque la barre d' adresses commence par "Cette page Web" ou uiwebview si le mot "page Web" est utilisé.

**Comment la page détermine le noyau de webview actuellement utilisé:**

Sur la page, le noyau webview actuellement utilisé peut être déterminé par l 'injection de variables window. ~ uwxjs u is u wkwebview.IOS micromessagerie 6.5.3 et ses versions ultérieures sont wkwebview pour True, uiwebview pour false ou undefine.

**Front - end adaptation focus**

Premier principe d'adaptation: si l'on ne peut pas faire la distinction entre un nouveau comportement caractéristique de wkwebview ou une logique interne de micromessagerie entraînant des problèmes sur la page précédente, on peut utiliser les pages d'essai pour tester séparément les noyaux wkwebview de Safari et de micromessagerie pour déterminer les causes des problèmes de positionnement rapide.

####Guide d 'adaptation

Le comportement de webview dans le micromessage est très cohérent avec celui de safari après le passage à wkwebview, à la seule différence que le micromessage webview injecte un script associé à jsbridge.C'est pourquoi l'accent devrait être mis sur les domaines suivants:

> 1: les fonctions de la page sont - elles normales
]
> 2: l 'adaptation de l' écran de page est - elle normale?
]
> IV: la grammaire des pages est - elle compatible?
]
> v: est - ce que jsapi fonctionne parfaitement?
]
> VI: mettre l'accent sur la logique connexe de Cookie et de local storage.
]
> VII: si le serveur dispose d 'un délai de validité de retour à la mémoire cache - control, il faut vérifier si la logique de corrélation est normale.

Normalement, votre page n 'a pas besoin d' être adaptée spécialement, mais si vous avez une logique affectée sur les pages suivantes, il faut l 'adapter et la valider sur la base d' une recommandation d 'adaptation.

Adaptation de corrélation jsapi

Un: ne plus soutenir

Changement: dans wkwebview, le capitaine jsapi ne sera pas soutenu.

Recommandation d 'adaptation: tous les développeurs utilisant cet API peuvent supprimer la logique de corrélation de page.

Aperçu de la page par localid

Variation: il n'est plus possible de prévoir les images en utilisant le logiciel chooseimage - API pour les renvoyer dans le local, par exemple: "" img = src = wxlocalresource http: / / 50114659201332 ".

Recommandations concernant l'adaptation:

Dans la version 6.5.3 et les versions suivantes de l'IOS, le Code de base d'images correspondant à l'image localid est obtenu à l'aide d'une nouvelle version jsapi: getlocalimgdata et affiché sur la page d'extrémité avant.

Si la page introduite est introduite dans la jssdk, la mise à jour directe de jssdk à 1.2.0 facilite l 'adaptation automatique de la page.(les versions actuelles de la ligne jssd sont de 1.0 et 1.1.0 et les mises à jour de 1.2.0, [https: / / res.wx.qq.com / Open / js / jweixin-1.2.0.js] ())

III: l 'utilisation de jssdk et l' utilisation de wx.config pour l 'autorisation de l' appel jsapi nécessitent l 'attention sur l' échec de l 'appel jsapi

Changement: les modifications internes de wkwebview nous ont permis d 'apporter un certain ajustement logique à la gestion des droits jsapi dans les micromessages, avec peu de risques d' irrégularités dans l 'autorisation antérieure d' accès jsapi normal, ce qui a entraîné l 'échec de l' appel jsapi.

Recommandations concernant l'adaptation:

6.5.1 dans la version de wkwebview, les problèmes ci - après sont connus: utilisation d'History API pushstate sur la page HTML5; possibilité de navigation sur des pages contrôlées telles que les pages de replacement (par exemple, pages d'application unique) et utilisation simultanée de wx.config de jsdk pour l'autorisation de jsapi, à un moment où jsapi risque fort d'échouer parce qu'il n'est pas autorisé.La technologie Anchor - Hash peut être utilisée pour remplacer la technologie History lorsque cela est possible sur la page 6.5.1.

Les problèmes mentionnés ci - dessus ne se poseront pas dans les microcommunications iOS 6.5.2 et dans les versions ultérieures, mais il n'est pas possible de confirmer à 100% que les pages qui utilisent la technologie History ou Hash pour modifier les adresses de navigation ne sont pas du tout exemptes de tels problèmes et qu'ils doivent encore retenir l'attention des concepteurs.

Cookie et les paramètres localstorage

I) après avoir quitté le compte micromessagerie, tous les numéros de compte Cookie et local seront vidés.

La fonction de page dépend de Cookie ou de la logique associée à Cookie

Modifications: les modifications apportées à l 'intérieur du wkwebview influeront sur la logique associée à la page Cookie actuelle, par exemple lorsque l' accès à des ressources de Cookie et de pages entre les domaines ou lorsque le serveur de stockage d 'images fait appel à Cookie de vérification pour récupérer des données.

Note de question: lorsque la page a cite les ressources d 'une autre page B (les pages a et B sont des noms de domaine différents), la page B est considérée comme une page tierce.Si Cookie est positionné sur la page b, la stratégie de sécurité wkwebview empêchera une tierce partie d 'installer Cookie de manière transversale, ce qui crée un problème.

Recommandations concernant l'adaptation:

Dans wkwebview, il s' agit d 'empêcher par défaut un tiers d' établir un paramètre cookie.Toutes les informations transmises par l 'intermédiaire de Cookie peuvent stocker les informations à transmettre par l' intermédiaire de l 'arrière - plan de service, puis ajouter un mot de passe à un message de stockage correspondant sur la page, puis transmettre les informations entre les pages par l' intermédiaire de l 'accès au token qui ajoute son propre service à l' URL.

Si les ressources de la page ou le serveur de stockage d 'images dépendent de la vérification de Cookie pour revenir aux données, après transfert vers wkwebview, l' enregistrement est long dans le micro - message ou lorsque vous cliquez sur l 'aperçu, le cookie configuré n' est pas complet, ce qui entraîne un échec dans l 'enregistrement d' images ou un échec de prévisualisation.Sauf dans ce cas, les développeurs n'ont pas à s'inquiéter de la perte de Cookie dans d'autres cas, et toutes les demandes seront accompagnées d'un cookie complet.

Lecteur vidéo

Changement: dans les micromessages iOS 6.5.3 et les versions ultérieures, webview supporte par défaut la lecture des fenêtres.

Les développeurs doivent accorder une attention particulière à la lecture des fenêtres et à l'adaptation simultanée des versions basses de l'ios10 et de l'ios10 à l'extrémité avant.



Le comportement de page wkwebview est entièrement identique à celui de Safari, ce qui entraîne une perte de logique ou une anomalie dans le comportement de page fondé sur uiwebview (qui peut être vérifiée dans Safari et wkwebview, respectivement, après la mise en œuvre des pages d 'essai conformément à la logique du Service lui - même).

I: la page a de Safari ou de wkwebview passe à la page b et ne reprend pas script et Ajax (et ne déclenche pas la lecture de la page).

Dans Safari ou wkwebview, l 'événement resize de jquery est déclenché par l' éjection d 'une page sur le clavier d' entrée et non par uiwebview.

Dans Safari ou wkwebview, l 'événement Window Unload ne peut être déclenché que par la mise à jour, ni par le retrait d' une page ni par le saut sur une autre page.

IV: dans un très petit nombre de cas, les clics de page spécialement réalisés dans Safari ou wkwebview sont annulés.

S'il y a des problèmes ou des problèmes, la compatibilité avec le comportement de safari l'emporte.