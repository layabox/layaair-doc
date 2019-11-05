# attributeMap表格

###### *version :2.3.0   Update:2019-11-5*

该表格会列出目前所有会有引擎传入的顶点数据的变量名与对应的顶点通道。

在LayaAir3D中的顶点数据是逐精灵的，在这里只介绍常用的模型精灵相关的顶点数据。（即不包含拖尾精灵与粒子精灵）

| 描述                       | 通道                               |
| -------------------------- | ---------------------------------- |
| 顶点在投影空间下的位置     | VertexMesh.MESH_POSITION0          |
| 顶点在视图坐标系下的法向量 | VertexMesh.MESH_NORMAL0            |
| 切向量                     | VertexMesh.MESH_TANGENT0           |
| 第一个uv坐标               | VertexMesh.MESH_TEXTURECOORDINATE0 |
| 第二个uv坐标               | VertexMesh.MESH_TEXTURECOORDINATE1 |
| 骨骼权重                   | VertexMesh.MESH_BLENDWEIGHT0       |
| 骨骼索引                   | VertexMesh.MESH_BLENDINDICES0      |
| MVP矩阵                    | VertexMesh.MESH_MVPMATRIX_ROW0     |
| 世界矩阵                   | VertexMesh.MESH_WORLDMATRIX_ROW0   |
| 定色点                     | VertexMesh.MESH_COLOR0             |

