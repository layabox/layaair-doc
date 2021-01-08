## 手机QQ厘米秀GLTF模型加载使用说明  

> update : 2021-01-08

###  厘米秀模型加载 

- CmShowTool 为参考示例， 根据文件资源地址，加载所需部件资源， 手动拼装成完整任务模型

- 具体实现可自行修改

- 每一个厘米秀模型资源包括
  1. 各部分模型gltf资源文件路径， 包括骨骼， 头， 身体等
  2. 个性化配置文件路径， 配置了模型的肤色， 脸部模型数据等个性化数据
  3. 装扮配置文件路径， 与装扮图片资源， 用于还原脸部装扮
  
  
  
  ##### 厘米秀模型加载的DEMO包下载地址：
  
  [点击此处下载DEMO包](https://official.layabox.com/laya_data/LayaAir2.0/Chinese/LayaAir_TS/3D/useGLTF/CmShwoDemo.zip)
  
  

####  加载模型示例

1. 创建辅助对象

   ```typescript
    // gltf 模型文件
    gltfFile: any = {
        skeleton: {
            url: "res/skeleton.gltf",
            type: Loader.JSON
        },
        face: {
            url: "res/face.gltf",
            type: Loader.JSON
        },
        eyes: {
            url: "res/eyes.gltf",
            type: Loader.JSON
        },
   	...
   }
   
    // 装扮配置文件
    makeupjson: any = {
        blusher: {
            cfg: "res/self/gltfMode/gltfBin/beautyResource/blusher/dress.json",
            tex: "res/self/gltfMode/gltfBin/beautyResource/blusher/beauty.png"
        },
        eyelid: {
            cfg: "res/self/gltfMode/gltfBin/beautyResource/eyelid/dress.json",
            tex: "res/self/gltfMode/gltfBin/beautyResource/eyelid/beauty.png"
        },
        ...
    }
   ```

2. 加载模型

   ```typescript
   /**
    * 创建辅助对象，方便模型加载
    * 每一个厘米秀模型资源包括：
    *  1. 各部分模型gltf资源文件， 包括骨骼， 头， 身体等
    *  2. 个性化配置文件， 配置了模型的肤色， 脸部模型数据等个性化数据
    *  3. 装扮配置文件， 与装扮图片资源， 用于还原脸部装扮
   */
   var struct: CmShowCharacterStruct = new CmShowCharacterStruct();
   // gltf 模型资源对象
   struct.gltfURL = {};
   for (const key in this.gltfFile) {
       struct.gltfURL[key] = this.gltfFile[key];
   }
   // 个性化配置对象 / 可省略
   struct.customConfigURL = "res/self/gltfMode/gltfBin/face.json";
   // makeup装扮对象 / 可省略
   struct.makeupConfigURL = this.makeupjson;
   // 其他额外资源数组, 与gltf文件一同加载 / 可省略
   struct.extraRes = [];
   struct.extraRes.push("res/self/gltfMode/gltfBin/dalaozuo-dalaozuo.lani");
   
   // 调用加载函数
   // facejson 与 装扮中包含的json文件与图片资源需要提前加载完成
   CmShowTool.LoadCharacter(struct, Handler.create(this, this.onLoadCharacter, [struct]));
   ```

3. 加载完成回调

   ```typescript
   /**
    * @param struct 辅助对象， 记录部件与对应资源路径
    * @param sprite 返回厘米秀模型根节点
    * @param renderableMap 各部件与对应渲染节点map
    */
   onLoadCharacter(struct: CmShowCharacterStruct, sprite: Sprite3D, renderableMap: Map<string, Array<RenderableSprite3D>>) {
       // 将节点添加到场景中
       this.scene.addChild(sprite);
   }
   ```

4. 自定义部分

   1. 添加动画示例

      - 厘米秀人物模型共用一套骨骼， 在 unity 中使用对应骨骼模型导出 *.lani 动画数据文件， 加载到人物上

      - 可自行添加，组织动画控制器与动画状态

      - 动画添加可以在 onLoadCharacter 加载回调中进行， 也可以在 CmShowTool.loadGLTFDone 中回调返回前进行

        ```typescript
        // 此处 animatorRoot 节点应与 unity 中 Animator 组件所在节点相同
        var animatorRoot: Sprite3D = CmShowTool.getAnimatorRoot(skeletonRoot, animatorRootName);
        /**
        * 添加根 Aniamtor 组件
        * @param animatorRoot 根节点，在此节点上添加 Animator 组件
        * @param partsRenderableArray 各部分渲染节点数组
        * @param skeletonMap 骨骼map
        */
        static addAniamtior(animatorRoot: Sprite3D, renderableMap: Map<string, Array<RenderableSprite3D>>, skeletonMap: Map<string, Sprite3D>) {
            var animator: Animator = animatorRoot.addComponent(Animator);
        
            // animator 添加 渲染节点 队列
            renderableMap.forEach(renderableArray => {
            //@ts-ignore
            animator._renderableSprites.push(...renderableArray);
            });
        
            // 添加 animator clip
            // 在 Unity 中使用默认骨骼导出动画数据
            var clip: AnimationClip = Loader.getRes("res/gltfMode/Aniamtor/dalaozuo-dalaozuo.lani");
            if (!clip)
            	return;
        
            var layer: AnimatorControllerLayer = new AnimatorControllerLayer("test");
            var animatorState: AnimatorState = new AnimatorState();
            animatorState.clip = clip;
            layer.addState(animatorState);
            layer.defaultState = animatorState;
            layer.playOnWake = true;
            animator.addControllerLayer(layer);
            layer.defaultWeight = 1.0;
        }
        ```

   2. 应用装扮效果

      - 装扮应用可以在 onLoadCharacter 加载回调中进行， 也可以在 CmShowTool.loadGLTFDone 中回调返回前进行

        ```typescript
        // 获取脸部模型渲染节点数组
        var faceRenderableArray: Array<RenderableSprite3D> = renderableMap.get("face");
        // 添加装扮
        CmShowTool.applyFaceMakeUp(faceRenderableArray, struct);
        ```

        

   3. 调整光照

      - CmShowPBRMatrial 可以调整附加光照强度， 适配不同光照效果

        ```typescript
        var mat: CmShowPBRMatrial = new CmShowPBRMatrial();
        mat.lightInstensity = 2.0; // 附加光照强度， eg: 平行光照强度 0.5, CmShowPBRMatrial 附加光照强度 1.5， 材质实际光照强度 0.5 * 1.5 = 0.75
        ```

        

