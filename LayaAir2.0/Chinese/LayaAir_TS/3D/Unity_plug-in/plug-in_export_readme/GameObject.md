# Sprite3D支持的Unity导出列表

以下为Unity 2018 4.7 插件中支持的导出属性列表，对应了LayaAir 引擎Sprite3D中的功能。

Unity面板中要导出的属性，如果包括在下面的列表属性中，就可以直接导出。如果没有包括，就代表LayaAir 引擎Sprite3D中并不支持该属性的导出。

- ## Game Object
     ![Game Object](./img/GameObject.png) 
    - name
    - Static
    - Layer
    - Transform
        1. Position
        2. Rotation
        3. Scale
    - Component
        - Camera  
            ![Camera](./img/components/InspectorCamera35.png)
            1. Clear Flags
                - Skybox
                - Solid Color
                - Depth only
                - Don't Clear
            2. Background
            3. Projection
                - perspective
                  - Field of View
                - Orthographic
                  - size
            4. Clipping Planes
                - Near
                - Far
            5. Viewport Rect
                - X
                - Y
                - W
                - H
            6. Allow HDR
        - Light  
            ![Light](./img/components/class-Light-0.png)
            1. Type
                - Directional
                - Spot
                  - Range
                  - Spot Angle
                - Point
                  - Range
            2. Color
            3. Mode
                - Realtime
                - Mixed
                - Baked
            4. intensity
        - Mesh Filter  
            ![Mesh Filter](./img/components/Inspector-MeshFilter.png)
            1. Mesh
        - Mesh Renderer  
            ![Mesh Renderer](./img/components/class-MeshRenderer-0.png)
            1. Materials
                - Size
                - Element
            2. Lightmap Static
                - Lightmaps
                  - Baked Lightmap
                    - Lightmap Index
                    - Tiling X
                    - Tiling Y
                    - Offset X
                    - Offset Y
        - Skinned Mesh Renderer  
            ![Skinned Mesh Renderer](./img/components/Inspector-SkinnedMeshRenderer.png)
            1. Mesh
            2. Root Bone
            3. Bounds
                - Center
                - Extent
            4. Materials
                - Size
                - Element
        - Animator   
            ![Animator](./img/components/MecanimAnimatorComponent.png)
            1. Controller
            2. Culling Mode
                - Always Animate
                - Cull Completely
        - Terrain / Terrain Collider  
            ![Terrain](./img/components/Inspector-TerrainCollider.png)
            1. Terrain Data
        - Box Collider  
            ![Box Collider](./img/components/Inspector-BoxCollider.png)
            1. Is Trigger
            2. Center
            3. Size
        - Sphere Collider  
            ![Sphere Collider](./img/components/Inspector-SphereCollider.png)
            1. Is Trigger
            2. Center
            3. Radius
        - Capsule Collider  
            ![Capsule Collider](./img/components/Inspector-CapsuleCollider.png)
            1. Is Trigger
            2. Center
            3. Radius
            4. Height
            5. Direction
        - Mesh Collider  
            ![Mesh Collider](./img/components/Inspector-MeshCollider.png)
            1. Is Trigger
            2. Mesh
        - Rigidbody  
            ![Rigidbody](./img/components/Inspector-Rigidbody.png)
            1. Mass
            2. Is Kinematic
            3. Use Gravity
            4. Constraints
                - Freeze Position
                - Freeze Rotation
        - Trail Renderer  
            ![Trail Renderer](./img/components/Inspector-TrailRenderer.png)
            1. Materials
                - Size
                - Element
            2. Time
            3. min Vertex Distance
            4. Width
            5. Color
                - Gradient
                    1. mode
                        - Blend
                        - Fixed
                    2. Color
                    3. Alpha
                    4. Location
            6. Alignment 
                - View
                - TransformZ
            7. Texture Mode
                - Stretch

