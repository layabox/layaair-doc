#Playing and Control of Music and Sound Effect

HTML5 audio playback has two main ways at present, one is Audio tag playback, the other is WebAudio binary playback.

Audio belongs to DOM element, with UI interface, while Audio belongs to download and play on mobile side. Audio is suitable for files with large sound files. But Audio has gesture restriction on mobile side. The gesture-requirement-for-media-playback attribute indicates that user's gesture operation is necessary to play.

Webaudio is a new sound playing form, which can load multiple sounds for synthesis. It is played by decoding binary files into browser supported formats. Moreover, this interface can even achieve the animation effect of audio spectrum, so that the sound has the function of synthesis.

Music and sound effects are the common basic elements in games. LayaAir engine encapsulates WebAudio and Audio. In browsers supporting WebAudio, WebAudio is preferred. In browsers not supporting WebAudio, Audio is used to maximize compatibility with all browsers'support for audio format, which makes it more convenient for developers to connect by calling laya.media.Sound Manager API. The port can play audio directly.

###I. Differences in the Application of Music and Sound Effect

Music: Background music for games. PlayMusic method in laya. media. SoundManager audio management class is used to play, because it is background music, playMusic method can only play an audio file at the same time.

Sound effect: PlaySound method in laya.media.SoundManager audio management class is adopted, which allows multiple audio files to be played at the same time.

###II. Audio Compatibility Preparedness

Due to the different browser compatibility of audio playback problems, we need to make preparations for compatibility before we start to apply.

(1) Use the "Format Factory" audio file conversion tool. Select 44100Hz, 96kbps for conversion.

(2) Audio files are as small as possible, not only the bandwidth limitation, but also the efficiency of browser audio decoding.

###III. control of audio volume

The control of sound volume can be set through the setSoundVolume method in the laya.media.SoundManager audio management class.

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170110/1484019651349259.png)

As shown in the figure above, we can see that the volume parameter can effectively control the volume of the sound file corresponding to the url. The initial value is 1. Volume ranges from 0 (silence) to 1 (maximum volume).



###IV. Equipment silence control

If you mute the audio automatically following the device through the device mute key. You need to set useAudioMusic to false.


```javascript

SoundManager.useAudioMusic=false；
```




###5. Complete Examples of Music and Sound Playing

The full code address for this example is:[https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo](https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo)