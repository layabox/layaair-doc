# APK扩展文件机制
一般情况下，我们把资源打包放在assets目录下。LayaPlayer-0.9.7以后版本的APK扩展文件机制允许把资源打包放在zip文件中，文件系统会先在asset目录下寻找指定文件。如果没找到，而且提供了扩展文件。那么会继续在扩展文件中寻找文件。
## 1.机制详解
### 1.
test工程用DCC工具打包资源  
![图1](img/1.png)    
### 2.  
现在我们把资源包放到扩展文件中。压缩cache文件，展文件要求zip格式。文件结构必须保持DCC工具生成的结构，如下图
![图1](img/2.png)  
### 3. 
在Android手机上建立目录/storage/emulated/0/Android/test/com.layabox.conch5，上传test.zip到这个目录下
### 4. 
提供扩展文件路径，修改RuntimeProxy.java的方法
RuntimeProxy.java
```   
public String getExpansionMainPath()
{
        return "/storage/emulated/0/Android/test/com.layabox.conch5/test.zip";
}
public String getExpansionPatchPath()
{
    return "";
} 
```
### 5. 
运行APP，看见下面的日志说明从主扩展包读取资源文件成功
![图1](img/3.png)  
## 2. Google Play APK扩展文件机制
(https://developer.android.com/google/play/expansion-files.html)
