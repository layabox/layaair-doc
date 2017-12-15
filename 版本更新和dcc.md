

## 自己做版本管理
提供了一个新函数
```javascript 
conchConfig.setDownloadVersionString(v:string):void;
```
参数是一个表示版本号的字符串。比如程序想通过在url后面加参数的方法来控制这个文件是否被缓存，就可以用这个函数。
=0有特殊意义。  
例子:
```javascript
conchConfig.setDownloadVersionString('ver');
```
当前加载某个文件的时候这么写:
```javascript
img.src='http://myhost.com/a.png?ver=1'
```
这个文件就会被缓存，而不走dcc流程，以后再访问 'http://myhost.com/a.png?ver=1' 的时候都是从缓存取。  
如果后来这个文件改变了，不希望走缓存了，就换一下地址 http://myhost.com/a.png?ver=2，这样，以后再取ver=2的地址
就是直接从缓存取，其他的都是走下载。  
*注意：*  
1. 上面的例子，如果  http://myhost.com/a.png?ver=1&xx=xx 则不符合走缓存机制的规则，会导致下载。
2. 上面的例子，ver后面不一定是数字，例如也可以用md5等值 ver=107ab64bd71b81e8b21adf3931d9ab8d8a125c7c