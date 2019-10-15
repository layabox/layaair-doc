#Playing and Control of Music and Sound Effect


​        HTML5的音频播放，在当前有两种主流的方式，一种是Audio标签播放,另一种是WebAudio二进制播放。

Audio belongs to DOM element, with UI interface, while Audio belongs to download and play on mobile side. Audio is suitable for files with large sound files. But Audio has gesture restriction on mobile side. The gesture-requirement-for-media-playback attribute indicates that user's gesture operation is necessary to play.

WebAudio is a new audio playback form, which can load multiple sounds to synthesize. It is played by decoding binary files into browser-supported formats. Moreover, this interface can even achieve the animation effect of audio spectrum, so that the sound has the function of synthesis.

Music and sound effects are the common basic elements in games. LayaAir engine encapsulates WebAudio and Audio. In browsers supporting WebAudio, WebAudio is preferred. In browsers not supporting WebAudio, Audio is used to maximize compatibility with all browsers'support for audio format, which makes it more convenient for developers to connect by calling laya.media.Sound Manager API. The port can play audio directly.

###I. Differences in the Application of Music and Sound Effect

Music: Background music for games. PlayMusic method in laya. media. SoundManager audio management class is used to play, because it is background music, playMusic method can only play an audio file at the same time.

Sound effect: PlaySound method in laya.media.SoundManager audio management class is adopted, which allows multiple audio files to be played at the same time.

###II. Audio Compatibility Preparedness

Due to the different compatibility of browsers in audio playback problem, we should prepare for compatibility in the early stage before starting application.

(1) Use the "Format Factory" audio file conversion tool. Select 44100Hz, 96kbps for conversion.

(2) Audio files are as small as possible, not only the bandwidth limitation, but also the efficiency of browser audio decoding.

###III. Control of Audio Volume

The control of sound volume can be set through the setSoundVolume method in the laya.media.SoundManager audio management class.

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170110/1484019651349259.png)

As shown in the figure above, we can see that the volume parameter can effectively control the volume of the sound file corresponding to the url. The initial value is 1. Volume ranges from 0 (silence) to 1 (maximum volume).



###IV. Equipment silence control

If the device silence keys let the audio automatically follow the device silence. You need to set useAudioMusic to false.


```javascript

SoundManager.useAudioMusic=false；
```




###5. Complete Examples of Music and Sound Playing

The complete code address for this example is:[https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo](https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo)