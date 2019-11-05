# 资源概述

###### *version :2.0.1beta   Update:2019-3-19*


​	在LayaAir3D世界中，开发时所用到的主要资源类型：场景，预设，模型网格，材质球，材质贴图，动画文件。各种资源类型会在后面的对应课程中进行详细讲解，在这里就不再深入。本节文档，我们将介绍unity中LayaAir导出工具生成的各种文件详解，以及对应的加载方法。

###Resource type

`.ls`For scenario files, select when exporting Scene categories. It includes all kinds of data, light map, model, position and so on. Need to use**Scene3D**Class loading.

`.lh`To preset the file, select the Sprite3D category to be generated when it is exported. There is a lack of scenario information, and other features are the same as. LS files, but need to be used**Sprite3D**Class loading.

`.lm`For model data files, they are usually converted into FBX format. have access to**MeshSprite3D**Class loading.

`.lmat`Material data file is the material information set for the model in Unity. Loading. LS or. LH files automatically loads. lmat files to produce material. have access to**BaseMaterial**Class to load.

`.lani`For animation data files. If there is animation on the model, the animation configuration file will be generated after export, which contains the animation frame data. Loading can be used**Animation Clip**Class to load.

`.jpg`,`.png`,`.ltc`,`.ktx`,`.pvr`Wait for the map file. If a map is used, the unit will generate a map file after exporting. have access to**Texture2D**Class to load.