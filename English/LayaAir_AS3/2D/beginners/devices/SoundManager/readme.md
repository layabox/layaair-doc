# HTML5 handle music and sound effects


​        HTML5 audio playback, there are two mainstream  method, one is the Audio tag playback, and the other is WebAudio binary broadcast.

​        Audio belongs to the dom element, with ui interface, Audio in the mobile side will have gesture restrictions, gesture-requirement-for-media-playback attributes Indicating that the user must have the gesture operation can play.

​        WebAudio is a new form of sound playback, you can load multiple sounds. It is played by binary decoding into browser supported formats. Interface can even achieve audio effect, so that the sound can have dynamic synthesis function.


​        Music and Sound are the basic elements of the game, LayaAir engine encapsulates WebAudio and Audio. Using Audio on browsers in case WebAudio is not supported, maximizing compatibility with all browser. So that developers can be more convenient, by calling the laya.media.SoundManager API interface can  handle case constraint and play audio directly.


**1. difference between the application of music and sound effects**

​        ​Music: about background music for a game(BGM). Using the playMusic method in the laya.media.SoundManager audio management class, the playMusic method can only play only one audio file at the same time because of background music. 

​        Sound: using the playSound method in the laya.media.SoundManager audio management class, allowing multiple audio files to be played at the same time.

**2.  Audio compatibility preparation**

​        Because of the different audio compatibility issues with different browser ,  we should be aware of cross-browser to avoid application problem.

 (1) use the format factory audio file conversion tool. Select 44100Hz, 96kbps to conversion.

 (2) audio files should be as small as possible, not just the bandwidth limitations, as well as the efficiency of the browser audio decoding.


Note: Package APP has sound format restrictions, please refer to（[LayaNative settings sound](http://xn--layanative__-726s570ami3awq0l7zubi66b/)）

**3.  audio volume control**

​        Sound volume control can be set by the setSoundVolume method in the laya.media.SoundManager audio management class.

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170110/1484019651349259.png)

​        As shown in the figure above, we can see that by setting the volume parameter, you can effectively control the volume of the sound file corresponding to the url.

**4. complete example of music and sound playback**

The sample full code address of the sample is: [http://layaair.ldc.layabox.com/demo/?Sound_SimpleDemo](http://layaair.ldc.layabox.com/demo/?Sound_SimpleDemo)
