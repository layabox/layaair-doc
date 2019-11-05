#Derivation of models from Unity

###### *version :2.0.2beta   Update:2019-4-26 插件版本:2.0.2*


在前面的[Unity插件篇](http://localhost/LayaAir2_Auto/%E5%9C%B0%E5%9D%80)There is a simple use of plug-ins to export wizards, which will be explained in detail here.

*Here we use the monkey model as an example*

![] (img/1.png)<br> (Figure 1)

Look at the file structure of the monkey model

![] (img/2.png)<br> (Figure 2)

Choice`预设`And then we click`导出`The monkey model is derived.

![] (img/3.png) < br > (fig. 3)

After export, the file directory is shown as follows:

![] (img/4.png)<br> (Figure 4)

####*.Lh format data file

`*.lh`Exported 3D display object container Spirte3D type data file, JSON format encoding, layaAir export plug-in selection export in unity3D**Preset**Class generation, less light mapping than *. LS format, the rest are all the same.

####*. LM format data file

Whether it is derived**Scene file**or**Preset file**Type, which contains series *. LM format files in the exported resource folder, in this project`LayaMonkey`Folders are folders built by developers in Unity to store FBX models, as shown in Figure 4. The corresponding folders and. LM resource files are generated at the time of export.

`*.lm`The file is the grid data file of the model. Mesh (mesh) can be generated for Mesh Sprite 3D or Skinned Mesh Sprite 3D type display objects. The file contains vertex location, normal, vertex color, vertex UV and other information of the model mesh.

####*. LAV format data file

`*.lav`The file is a skinned skeleton animation data file. Skinned Mesh Sprite 3D Skin Grid Elf Avatar (skeleton) can be generated.

The file contains skeletal node information.

####*. Lmat format data file

`*.lmat`The file is the material data file. Material (material) that can be used by the model can be generated. It contains material mapping, material ball color information, fixed-point color information, texture offset information and other material-related information.

> More resource types can be found in the resource overview section.（[地址](https://ldc2.layabox.com/doc/?nav=zh-ts-4-3-0))