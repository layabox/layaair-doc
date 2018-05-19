# WeChat game 4M local package usage

Usually when we develop projects, we will use the local path directly. For example, the local path referenced in the example.

```javascript
Laya.Texture2D.load("res/layabox.png");
```

If the directory size of a project does not exceed 4MB, it will be fine to get local resources.

However，

Once this limit is exceeded, no more upload is allowed, and real machine previews is not rendered.

So what do we do if our **project is larger than 4M?**

We need to plan the resource directory, which is divided into two modes: local loading and network dynamic loading.

In the local loading plan, we only put some preloaded and necessary materials, such as the background and graphics used by the Loading page, in addition to the entry files and the necessary configuration files. In a word, it is not more than 4M.

> Tips：It should be noted that the WeChat game does not allow JS to be dynamically loaded. Therefore, the JS must be placed in the 4M package. That is, the JS plus the basic configuration file must be less than 4M. should be optimized / minify.



**How to handle the dynamic loading of the network**。Loaded locally with `load()` after the use of the method `URL.basePath` .

By example:

```javascript
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
box.meshRender.material = material;
Laya.URL.basePath = "https://XXXX.com";//Please change XXXX to your real Web site :
//Under this, use load function resource again. URL will be add automatically. Dynamic loading from the network.
```

call `URL.basePath` method then, then use load function to get the local path. All will be fill automatically URL.basePath in it. This realizes the combination of local and network loading.。



**Have we mentionned all things ? not yet !**

According to the just writing method, `res/layabox.png` obviously, it has been uploaded to the local directory of WeChat game. But if you are using `URL.basePath` after that, load again `res/layabox.png` It will not be loaded from the local use, but loaded dynamically from the network. This is not the result we want.



So, the engine uses `URL.basePath`. After that, how to use local load again，Carry out **Handling of special catalogues and files**, That is the local packet whitelist mechanism. As shown in the following examples :

```javascript
MiniAdpter.nativefiles =  [
    "wxlocal",
    "res/atlas/houzi.atlas",
    "res/atlas/houzi.png",
    "common/tishi.png",
    "common/bg.png",
    "ui.json",
    "newLb/bg031.png"
];
```

**As long as it is MiniAdpter.nativefiles a directory name or file that exists in it, the engine will automatically consider the directory as a local directory**. Even with the use of URL.basePath, For directory names or files that are included in the nativefiles whitelist.Will not load dynamically from the network, will only load from the local.