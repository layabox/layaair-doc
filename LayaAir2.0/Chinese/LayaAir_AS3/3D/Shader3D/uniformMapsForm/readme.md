# uniformMap表格

###### *version :2.3.0   Update:2019-10-8*

在这里我们会列出引擎内置的逐精灵，逐相机与逐场景提交的 uniform变量。

### 逐精灵(PERIOD_SPRITE)

| 变量名                | 描述               |
| :-------------------- | ------------------ |
| u_MvpMatrix           | MVP矩阵            |
| u_WorldMat            | 世界矩阵           |
| u_LightMap            | 光照贴图           |
| u_LightmapScaleOffset | 光照贴图缩放和偏移 |


### 逐相机(PERIOD_CAMERA)

| 变量名             | 描述              |
| ------------------ | ----------------- |
| u_CameraDirection  | 摄影机距离        |
| u_CameraPos        | 摄影机位置        |
| u_CameraUp         | 摄影机Up向量      |
| u_Projection       | 投影矩阵          |
| u_ProjectionParams | 投影参数          |
| u_View             | 视图矩阵          |
| u_Viewport         | 摄影机视口        |
| u_ViewProjection   | 视图矩阵x投影矩阵 |

### 逐场景(PERIOD_SCENE)

> 事件相关

| 变量名          | 描述     |
| --------------- | -------- |
| u_Time                     | 时间 |

> 反射相关


| 变量名          | 描述     |
| --------------- | -------- |
| u_ReflectIntensity         | 反射强度                        |
| u_ReflectTexture           | 反射贴图                        |

> 阴影相关

| 变量名               | 描述                            |
| -------------------- | ------------------------------- |
| u_shadowMap1         | 阴影图，模糊等级大于等于1时启用 |
| u_shadowMap2         | 阴影图，模糊等级大于等于2时启用 |
| u_shadowMap3         | 阴影图，模糊等级大于等于3时启用 |
| u_shadowPCFoffset    | 阴影PCF                         |
| u_shadowPSSMDistance | 产生投影的范围                  |

> 场景雾化相关

| 变量名                     | 描述                            |
| -------------------------- | ------------------------------- |
| u_FogColor                 | 雾化颜色                        |
| u_FogRange                 | 雾化范围                        |
| u_FogStart                 | 雾化起始位置                    |

> 灯光相关


| 变量名                     | 描述                            |
| -------------------------- | ------------------------------- |
| u_LightBuffer              | 灯光缓存                        |
| u_AmbientColor  | 环境光   |
| u_LightClusterBuffer       | 聚类纹理 |
| u_lightShadowVP            | VP矩阵                          |

> 平行光相关


| 变量名                     | 描述         |
| -------------------------- | ------------ |
| u_DirectionLight.color     | 平行光的颜色 |
| u_DirectionLight.direction | 平行光的方向 |
| u_DirationLightCount       | 平行光的数量 |


> 点光相关


| 变量名                     | 描述                            |
| -------------------------- | ------------------------------- |
| u_PointLight.color         | 点光的颜色                      |
| u_PointLight.position      | 点光的位置                      |
| u_PointLight.range         | 点光的范围                      |

> 聚光相关

| 变量名                | 描述       |
| --------------------- | ---------- |
| u_SpotLight.color     | 聚光的颜色 |
| u_SpotLight.direction | 聚光的方向 |
| u_SpotLight.range     | 聚光的范围 |
| u_SpotLight.spot      | 聚光的角度 |
| u_SpotLight.position  | 聚光的位置 |


