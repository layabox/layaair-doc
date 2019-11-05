#Introduction to Config3D

###### *version :2.2.0  Update:2019-8-24*

###Introduction to Config3D

This class is used to create 3D initialization settings

|Property | data type | default|
| -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| isAntialias | Whether to turn on anti-aliasing | Boolean | true|
| isAlpha | Canvas Transparency | Boolean | false|
| premultiplied Alpha | Sets whether the canvas is pre-multiplied | Boolean | true|
| isStencil | Sets whether the canvas opens template buffer | Boolean | true|
| octreeCulling | Open Octree Cutting | Boolean | false|
| octree Initial Size | Octree Initial Size | Number | 64.0|
| octree Initial Center | Octree Initial Center | Vector 3 | (0, 0, 0)|
| octreeMinNodeSize | Octree Minimum Size | Number | 2.0|
| octree Looseness | Octree Looseness | Number | 1.25|
| debug Frustum Culling | Open Cone Cutting Debugging | Boolean | false|

**Attention should be paid to the tailoring and debugging of cones:**

If octree clipping is turned on, high-level octree node bounding boxes will be drawn using red pixels. If the cone contains all octree nodes, the octree node bounding box and the spiritual bounding box become blue. Pixel lines of octree nodes that are not fully included will calculate a color based on the depth value. The color of the Elvish bounding box is the same as that of the octree node bounding box, but the pixel line of the octree node bounding box is translucent.

![] (img/1.png)<br> (Figure 1) uses octree pruning

If the octree clipping is not turned on, the wizard bounding box will be drawn using green pixel lines.

![] (img/2.png)<br> (Figure 2) No octree pruning was used.

> Method Detail


 `defaultPhysicsMemory`Physical function initializes memory in M.

Note: Memory must be greater than 16M

​**Implementation**

Public function set defaultPhysics Memory (value: int): void

Public function get defaultPhysics Memory (): int



###How to Set Config3D

Firstly, a config3D is created. After setting the required parameters, it is used in Laya3D initialization.


```typescript

//创建一个config3D
var _config:Config3D = new Config3D();
//设置不开启抗锯齿
_config.isAntialias = false;
//设置画布不透明
_config.isAlpha = false;
//使用创建的config3d
Laya3D.init(0, 0, _config);
```


**Note: Config3D can't be modified once it's set up. It must be set up at the beginning.**