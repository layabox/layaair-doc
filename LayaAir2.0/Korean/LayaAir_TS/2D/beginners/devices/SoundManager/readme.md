# 音乐与音效的播放与控制

HTML5 의 오디오 방영, 현재 두 가지 주류의 방식으로 Audio 태그 재생, 또 다른 하나는 WebAudio 2진입니다.

Audio 는 dom 요소에 속하고 유i 인터페이스가 있으며 모바일 엔드 Audio가 다운로드 할 때 소리파일에 적합한 파일을 사용하지만 Audio는 모바일 엔트의 제스처에서 제스처를 제한합니다. gesture-requiement-for-media-playback 속성은 사용자의 손동작이 있어야 합니다.

WebAudio 는 새로운 음성 재생 형식으로 여러 목소리를 다운로드하여 합성할 수 있으며, 그는 2진제 파일을 통해 브라우저로 지원하는 형식으로 재생됩니다.또한 이 인터페이스를 사용하여 오디오 스펙트럼을 실현할 수 있는 애니메이션 효과까지 보이게 했다.

음악과 음효는 게임에서 자주 사용하는 기초 요소로, Layaiair 엔진에 WebAudio 와 Audio, WebAudio 의 브라우저를 지원하는 WebAudio, WebAudio 의 브라우저를 지원하지 않는 웹 브라우저를 사용하여 모든 브라우저를 최대화시켜 오디오 형식에 대한 지원을 더해 개발자를 더욱 편리하게 할 수 있습니다.입으로 바로 오디오 방송을 할 수 있다.

###음악과 음효의 응용 구별

음악: 게임용 배경 음악을 말한다.laya.media.SoundManager 오디오 관리류 중 playMusic 방법으로 방영되며 배경음악, playMusic 방법으로 오디오 파일을 동시에 재생할 수 있습니다.

음향: laya.media.SoundManager 오디오 관리에 있는 playSound 방법으로 여러 오디오 파일을 재생할 수 있습니다.

###2, 오디오 호환성 준비

오디오 방송 문제의 각 브라우저 호환성이 다르기 때문에 응용을 시작하기 전에 우리는 전기의 호환 준비를 해야 한다.

(1) 형식 공장'오디오 파일 변환 도구를 사용합니다.44100Hz, 96kbps 변환.

(2) 오디오 파일은 최대한 작고 완화된 제한이 아니라 브라우저 오디오 디코드의 효율 문제도 있다.

###3, 오디오 음량의 제어

음성 음량의 제어는 laya.media.SoundManager 오디오 관리를 통해 setSoundVolume 방법을 통해 설정할 수 있다.

![blob.png](http://old.ldc.layabox.com/uploadfile/image/20170110/1484019651349259.png)

이 그림에 따르면, volume 인자를 설정하여 url 에 대응하는 소리의 크기를 효과적으로 제어할 수 있습니다.초보가 1이다.음량 범위는 0 에서 1 (최대 음량) 이다.



###설비 무음 제어

장치 무음키를 통해 오디오 주파수가 자동으로 장치를 따라 음소음에 따르게 한다면.useAudioMusic 을 false 로 설정해야 합니다.


```javascript

SoundManager.useAudioMusic=false；
```




###5, 음악과 음효의 완전한 예제

이 예시의 완전한 코드 주소는:[https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo](https://layaair.ldc.layabox.com/demo/?2d&Sound&SimpleDemo)