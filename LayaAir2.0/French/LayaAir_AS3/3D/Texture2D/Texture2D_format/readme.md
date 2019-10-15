#Format de texture

###### *version :2.1.0   Update:2019-5-25*

À l'heure actuelle, le format texture soutenu par layaair3d est le suivant:

**Tip**Dans l 'exemple suivant, nous utilisons la taille finale de la texture dans le jeu, qui est de 256 x 256 pixels.

Table générale

`FORMAT_R8G8B8`C'est couleur, mais pas Alpha.(192 KB 256 x 256)

`FORMAT_R8G8B8A8`C 'est très coloré, avec le canal Alpha.C 'est le plus haut format de matériau de qualité avec le canal Alpha.Ceci est principalement utilisé pour des affiches transparentes.(256 KB - 256 x 256)

`FORMAT_ALPHA8`Canal alpha de haute qualité, sans couleur.(64 KB 256 x 256)

> Windows

`FORMAT_DXT1`Compression de texture RGB.This is the most common diffuse reflectance texture format.4 bits / pixels (32 KB - 256x256)

`FORMAT_DXT5`Compression de texture rgba.1 Byte / pixel (64 KB - 256x256)

> Android

`FORMAT_ETC1RGB`Compression de texture RGB.C 'est le format texture par défaut d' Android.Etc1 fait partie de la norme OpenGL es - 2.0 et soutient tous les OpenGL es - 2.0 GPU, mais ne soutient pas Alpha.4 bits / pixels (32 KB - 256x256)

> iOS

`FORMAT_PVRTCRGB_2BPPV`Compression de texture RGB.2 bits / pixels (16 KB - 256x256)

`FORMAT_PVRTCRGBA_2BPPV`Compression de texture rgba.2 bits / pixels (16 KB - 256x256)

`FORMAT_PVRTCRGB_4BPPV`Compression de texture RGB.4 bits / pixels (32 KB - 256x256)

`FORMAT_PVRTCRGBA_4BPPV`Compression de texture rgba.4 bits / pixels (32 KB - 256x256)