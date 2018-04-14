# 微信小游戏的物理缓存管理

### 物理缓存的意义

微信小游戏除了4M本地包之外，还允许开发者使用50M的物理缓存空间。也就是说首次加载后，在物理缓存中的内存，无需远程动态加载，直接使用本地的缓存资源即可。这样，不仅让玩家节省了大量的下载流量，还拥有了如同原生APP游戏一样的打开速度。

![图1](img/1.jpg) 

![图2](img/2.jpg) 



### LayaAir引擎默认的缓存管理机制

在LayaAir引擎里，引擎层已经自动帮开发者做好了缓存管理的机制，默认启动的是自动缓存管理机制。

在自动缓存的管理模式下，**如果检测到资源没有在本地缓存，就将远程的资源自动缓存起来。需要注意的是，自动缓存模式下只缓存图片和声音文件**，如果有其它格式的文件需要缓存，那可以通过手动缓存的接口进行下载并缓存。

缓存文件如果超过50M，将自动清理最早缓存的内容，每次清理5M的空间，如此循环写入，保障缓存里存的永远是最新下载的50M文件。



### LayaAir引擎手动管理缓存的接口

#### 1、取消自动缓存

如果游戏常用资源大于50M，采用自动管理缓存的文件未必能达到开发者的预期。尤其是早期加载的资源，如果是常用资源，那么后面加载的资源缓存超过50M后，会将早期缓存的资源清理，那么下次使用的时候又要重新加载一次。所以常用资源大于50M的时候，建议开发者自行权衡哪些资源缓存起来意义更大，对用户体验更好。这时候，就可以取消自动缓存模式。

如果不需要引擎自动管理缓存，可以将MiniAdpter.autoCacheFile设置为false。需要注意的是，自动缓存关闭后，由于不会自动清理，超过50M后将会导致写入缓存失败，所以一定要建立好缓存策略，决定哪些文件要缓存，哪些文件需要手动清理。



#### 2、手动下载文件并缓存本地

当不打算使用自动缓存功能，或者在自动缓存模式下，缓存json等自动缓存并不缓存的文件内容时，可以使用downLoadFile方法，去下载目标文件并缓存到本地。

```javascript
/**
* 下载文件 
* @param fileUrl 文件地址(全路径)
* @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
* @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
* @param encoding 文件编码默认 ascill，非图片文件加载需要设置相应的编码，二进制编码为空字符串
*/             
public static function downLoadFile(fileUrl:String, fileType:String = "",callBack:Handler = null,encoding:String = "ascii"):void
```



#### 3、清除缓存文件

由于微信小游戏的缓存上限是50M物理空间，所以无论自动管理缓存还是手动管理缓存，达到上限后都需要清理缓存。每次清理的缓存大小默认为5M，如果想改变每次缓存清理的默认值，通过修改

MiniAdpter.minClearSize属性即可。

如果要删除指定的缓存文件或全部缓存文件时，可以使用remove或removeAll方法。

```javascript
/**
* 删除指定缓存文件
* @param fileUrl文件路径(绝对地址)
* @param callBack 删除回调函数
*/
public static function remove(fileUrl:String,callBack:Handler):void {}
```

```javascript
/**
* 清空缓存空间全部文件内容 
*/  
public static function removeAll():void{}
```

