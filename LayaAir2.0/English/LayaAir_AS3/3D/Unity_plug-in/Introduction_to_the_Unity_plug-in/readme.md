#Introduction to Unity Plug-in

###### *version :2.3.0beta   Update:2019-9-27*

>###Important Note: In the latest version 2.3.0 beta of LayaAir 2.0, we have adapted Unity 2018.4.7.

**Attention should be paid to upgrade:**After the unity upgrade, delete the layaair3d and streamingassets folders under the project directory. Then install the new version of Unity plug-in. This step can be ignored if there is no older version of the plug-in in the project.

###Introduction to Unity3D

Unity3D is a multi-platform integrated game development tool developed by Unity Technologies, which makes it easy for players to create interactive content such as three-dimensional video games, building visualization, real-time three-dimensional animation and so on. It is a comprehensive and integrated professional game engine. In order to reduce the learning cost of artists and enable developers familiar with Unity to get started quickly, LayaAir uses Unity. Plug-in is the preferred tool for editing art resources.

Unity download address is:[https://unity3d.com/get-unity/download/archive](https://unity3d.com/get-unity/download/archive)

###Introduction to Plug-in Panel

Plug-in download address:[插件地址](https://ldc2.layabox.com/layadownload/?type=layaairide-LayaAir%20IDE%202.0.0)Jump to the download link, as shown in Figure 1.

![] (img/1.png)<br> (Figure 1)

####Install export plug-in

Start unity, create a new project, and import the resources and materials needed by the game, mapping, etc. The project name can be named according to their own needs. CTRL + s saves our scenario, and here we save the name truck.

Import the LayaAir3D conversion tool right-click in the resource management interface. The plug-in version will be updated with the addition of LayaAir engine functionality, but the import method is completely consistent.

When the import tool is successful, two folders named LayaAir3D and Streaming Assets will appear in the resource management interface, and the export plug-in menu LayaAir3D will appear in the unit menu bar. As shown in Figure 2:

![] (img/2.gif) <br> (Figure 2)

Click on the menu bar Laya Air3D and you will see the Export Settings Panel. Here we will explain it in detail.

**Tips:**After clicking on the menu LayaAir3D, more sub-items appear in the drop-down menu. LayaAir Export refers to the export capital settings panel, which can be dragged to the appropriate location of the unity3D interface. The next time you open the project, it will remain in the set location. (Figure 3 shows)

**Layaair = > help = > demo, study, ansewers, tutorial, etc. can click to open the layaair official website, which respectively represents examples, learning documents, forums, plug-ins support export, which is convenient for developers to solve their doubts. Setting can set plug-in interface language.**	

![] (img/3.gif) < br > (fig. 3)

####Plug-in Specific Functions

When the plug-in is ready, let's look at the panel of the plug-in:

![] (img/4.png)<br> (Figure 4)

#####(1) Scene

​**Scene category**It refers to the whole scene, whether the model, material, texture, animation, or illumination mapping in the scene are all exported. It is mainly used for scene production. The file extension is. ls, which needs to be loaded with Scene class or its inheritance class.

#####(2) Sprite3D

​**Sprite3D Category**Less illumination mapping than the scene, often used for individual resource export of characters or game items, file extension is. lh, to be loaded with Spite3D.

They will be loaded and used later.**scene**And**Spirit**Introduction.

#####(3) GameObject Setting

Game Item Node Settings

`Ignore Not Active Game Objects `
The unactivated nodes in the unit scenario are ignored when exporting.

`Batch Make The First Level Game Objects ` **(Sprite3D must be selected for this)**
Batch export of all level 1 nodes in the scenario.

#####(4) Mesh Sprite 3D Setting

The export settings of grid data can compress the size of model grid LM file. It is suggested that if tangent (no normal mapping) and vertex color are not used in the project, please check them all, which can save about 20% of the model resource size.

`Ignore Vertices UV `Ignore UV map

`Ignore Vertices Color`Ignore vertex color information

`Ignore Vertices Normal`Ignore normals

`Ignore Vertices Tangent`Ignore tangent information

`Compress`Model compression

#####(5) Terrain Setting

Unity Geotype Export Settings

`Convert Terrain To Mesh `
If there is a terrain in the scene, the terrain is transformed into a grid model.
Unty's terrain making is very convenient. It can use brush to draw terrain height, such as mountains, rivers, etc. It also supports brush to draw many detail maps for several kinds of maps. The LayaAir export plug-in converts the terrain into Mesh for developers to use. The difference is that the material is different from the ordinary material, including detailed maps.

#####(6) Animation setting

Animation settings

`Compress`Animation compression

#####(7) Assets platform

Resource Platform Settings.

`IOS`And`Android`The exclusive resources of each platform must be divided into several parts because some resources are not universal. Currently, platform-specific texture compression formats are supported.

`Conventional`Common platform, just common JPG and PNG.

#####(8) Other Setting

Other settings

`Customize Export Root Directory Name `
Custom export folder name, default folder name is "layaScene + scene name".

#####(9) Export Settings

The export settings panel is shown in Figure 5.

**Run**Click to run the scenario directly using the LayaAir engine.

**Export**Export the current resource, click, and export the data of the current scenario or model to the specified path.

**QRCode**Generate two-dimensional code. It can be previewed on the mobile phone and needs to be in the same LAN.

**Browse**Save the file path.

**Revert Config**Initialize the configuration.

**Config 1-5**Read the configuration file.

![] (img/5.png)<br> (Fig. 5)

![] (img/6.png)<br> (fig. 6)