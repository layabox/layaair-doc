#Paysage

###### *version :2.0.1beta   Update:2019-3-19*

####Utilisation d 'Unity pour exporter la lumière ambiante

Sur le panneau Lighting installé à Unity, sélectionnez la page d 'étiquette scene et trouvez celle - ci`Environment`B`Environment Lighting`Article

[] (IMG / 1.png) <br > (Figure 1)

**Source**Les options de source de lumière peuvent actuellement être utilisées à la fois par skybox et par color.

**Ambient color**Couleur ambiante.Définit la couleur de lumière ambiante pour le Color Color color.

**Ambient mode**Mode environnement`Realtime `Lumière en temps réel.

Modifier la couleur

####Lumière ambiante

Ambient Light Color (ambientcolor) is a coloration of Material fusion Color, which makes the material into Some Color, which can light the Material and Simulate the Luminescence Effect of light box.Si le boîtier est installé et ne l 'est pas`Scene3D`Scénographique`AmbientColor`Alors layaair3d aurait implicitement fait venir la lumière de l'environnement de la boîte au ciel.


```typescript

//设置场景环境光
scene.ambientColor = new Laya.Vector3(0.6, 0, 0);
```


Les résultats sont les suivants (Figure 2):

[] (IMG / 2.png) <br > (Figure 2)

