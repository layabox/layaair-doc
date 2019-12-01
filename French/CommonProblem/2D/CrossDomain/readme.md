#Traitement transversal

Lorsque de nombreux nouveaux développeurs réalisent une opération demo, il y a des risques que les ressources ne soient pas visibles (lorsque le Code est parfaitement correct), et lorsque la console d 'ouverture du navigateur découvre que les ressources sont partagées.

Cet avertissement se lit comme suit:

*No'Access - control - allow - origin'header is "present on the requested" Resource. Origin'File: / is therefore not allowed "Access.*

**Pourquoi?**

Par défaut, si un fichier local est chargé, la question de l 'accès à un domaine transversal se pose.Voilà.**Transzone**".

**Comment résoudre les problèmes transversaux?**

Il y a deux sortes de domaines.Un domaine de demande de fichiers et un domaine de demande de données

#####Demandes transversales

Il y a deux solutions à l 'échelle du domaine de demande de fichiers, l' une consistant à ajouter un paramètre de démarrage au navigateur.Dans ce cas, sélectionnez l 'icône & ‧‧; > cliquez sur la droite pour ouvrir la propriété & ‧‧; > ouvrez la barre de raccourci & ‧‧; > ajouter à la fin de l' objet (avec guillemets supplémentaires à l 'avant) - - allow - file - Access - from - files.Comme le montre la figure ci - après:

![1](img\1.png)(Figure 1)

Toutes les pages du navigateur Chrome ouvertes sont alors désactivées et réactivées.

**La méthode ci - dessus ne peut résoudre que les problèmes de la configuration locale, pas les problèmes transversaux des autres hôtes**".Pour résoudre définitivement le problème transversal des fichiers, il faudra modifier le système Webserver (généralement composé d'Apache, de ginx, de tomcat, etc.) en ajoutant un identifiant transversal à la demande d'un nom de domaine particulier, par exemple en ginx:


```

http {

  ......

  add_header Access-Control-Allow-Origin *;

  add_header Access-Control-Allow-Headers X-Requested-With;

  add_header Access-Control-Allow-Methods GET,POST,OPTIONS;

  ......

}

```


Ainsi, le get, la Post, les options peuvent être mises en œuvre, et l 'appui à la demande transversale peut être ajouté au u header Access - control - allow - origin.[http://www.layabox.com;](http://www.layabox.com%3B/)- désignation de l'URL autorisé;

#####Champ des demandes de données

Les demandes de données doivent être modifiées en fonction de l 'extrémité arrière, avec une étiquette header dans la demande, par exemple dans la langue PHP:


```

header("Access-Control-Allow-Origin: *");
```


Ce n 'est pas forcément utilisé & ‧‧;, mais il permet à tous les hôtes d' accéder à tous les domaines, et l 'développeur peut également écrire un nom de domaine spécifié pour que l' accès soit possible.



**En ce qui concerne les images de micromessagerie transversales:**

Vous pouvez télécharger des images sur votre propre serveur en arrière, puis accéder aux ressources d 'image par l' intermédiaire de votre propre serveur