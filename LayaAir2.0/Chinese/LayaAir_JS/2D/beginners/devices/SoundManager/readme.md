# 音乐与音效的播放与控制

​        HTML5的音频播放，在当前有两种主流的方式，一种是Audio标签播放,另一种是WebAudio二进制播放。

​        Audio属于dom元素，带有ui界面，在移动端Audio属于边下载边播放，适合声音文件比较大的文件，但是Audio在移动端会有手势的限制，gesture-requirement-for-media-playback属性表明必须有用户的手势操作才可以播放。

​        WebAudio是一种新的声音播放形式，可以加载多个声音进行合成，他是通过二进制文件解码成浏览器支持的格式进行播放。而且用这个接口甚至可以实现音频谱的动画效果，让声音有了合成的功能。

​        音乐与音效作为游戏中常用的基础元素，LayaAir引擎封装了WebAudio与Audio，在支持WebAudio的浏览器上，优先使用WebAudio，在不支持WebAudio的浏览器上使用Audio，最大化兼容所有浏览器对音频格式的支持，让开发者可以更加方便的，通过调用laya.media.SoundManager API接口就可以直接播放音频。

### 一、音乐与音效的应用区别

​        音乐：是指游戏用的背景音乐。采用laya.media.SoundManager音频管理类中的playMusic方法进行播放，由于是背景音乐，playMusic方法只能同时播放一个音频文件。

​        音效：采用的是laya.media.SoundManager音频管理类中的playSound方法，允许同时播放多个音频文件。

### 二、音频的兼容性准备

​        由于音频播放问题的各个浏览器兼容性不同，在开始应用前，我们要做好前期的兼容准备。

（1）使用“格式工厂”音频文件转换工具。选择 44100Hz，96kbps 进行转换。

（2）音频文件尽量小，不仅仅是带宽的限制，还有浏览器音频解码的效率问题。

### 三、音频音量的控制

​        声音音量的控制 可以通过laya.media.SoundManager音频管理类中的setSoundVolume方法来设置，

​        如上图所示，我们可以看到，通过设置volume参数，可以有效控制url所对应声音文件的音量大小。初始值为1。音量范围从 0（静音）至 1（最大音量）。

### 四、设备静音控制

如果通过设备静音键让音频自动跟随设备静音。需要将useAudioMusic设置为false。

```javascript
SoundManager.useAudioMusic=false；
```

### 五、失去焦点的处理

如果不是手机全屏游戏，或者在浏览器里交互。有可能会导致切出游戏后，失去焦点，而失去焦点后，音频也会停止播放，这是浏览器机制导致，所以需要开发者要自行在失去焦点和恢复的时候，通过侦听失去stage焦点和获得stage焦点进行控制，参考代码如下：

```typescript
……
//循环播放_sound
_sound.play(0);

//失去舞台焦点（切出游戏）的处理
Laya.stage.on(Laya.Event.BLUR, this, () => {
    _sound.stop();
});
//获得舞台焦点（切回游戏）的处理
Laya.stage.on(Laya.Event.FOCUS, this, () => {
    _sound.play(0);
});
……
```



### 六、音乐与音效播放的完整示例

该示例的完整代码地址为：[https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo](https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo)