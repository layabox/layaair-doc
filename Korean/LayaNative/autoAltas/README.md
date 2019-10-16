#자동 다이얼 세트 시스템

##1.종합

응용 프로그램 실행 효율을 최적화하기 위해 DrawCall 감소, LayaNative 중 자동형 그래픽 관리 시스템이 있습니다.아이메이지의 넓이와 키가 512보다 작을 때 그림이 자동으로 합병되지만 개발자가 사용하는 방법은 수정할 필요가 없다.

자동 커뮤니케이션의 수를 생성하고, LayaNative 장치 메모리 상황에 따라 기본적으로 인자를 설정하였으며, 모든 큰 그림이 모두 채점되어 시스템이 자동으로 정리되며, 큰 그림이 합치면 미리 설치된 개수를 초과하지 않을 수 있습니다.

기본 설정의 인자가 다음과 같습니다:


```javascript

var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.atlasNum = 10;//10张 每张为1024*1024
    conchConfig.maxTextureMemSize = 64 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 16;//16张 每张为1024*1024
    conchConfig.maxTextureMemSize = 84 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
```



##2. 큰 그림이 모아진 수를 어떻게 설정합니까?

프로젝트마다 특수성이 있기 때문에 개발자도 자신의 수요에 따라 설정할 수 있으며, config.js 설정에 따라 코드:


```javascript

var loadingView= window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;
    loadingView.bgColor("#ffffff");
    loadingView.setFontColor("#000000");
    loadingView.setTips(["新世界的大门即将打开", "敌军还有30秒抵达战场", "妈妈说，心急吃不了热豆腐"]);
}
//在这进行设定
var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.atlasNum = 15;//15张 每张为1024*1024
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
}
else if (nMem > 1048576) {
     conchConfig.atlasNum = 30;//30张 每张为1024*1024
}
```


**Tips: 이 현존지 size 의 설정은 응용 프로그램이 시작하는 곳에 놓아야 합니다. 프로그램에서 움직일 수 없습니다. config.js 는 Layaplayer가 시작하면 바로 실행될 js입니다. 그래서 여기에 두는 것이 가장 안전합니다.**  


##3.config.js 어디 있어요

ios 버전: 프로젝트의 resourcescriptsconfig.js
android 버전: 프로젝트의 asetsscriptsconfig.js


##4. 아이메이지 설정 자동 크기 제한

위에서는 아이메이지 넓이와 키가 512퍼센트 작을 때 자동으로 포토샵에 합병할 수 있다고 한다. 레이이네이티브-0.9.10 버전 이후 개발자는 config.js 이 size 값을 설정할 수 있으며 코드 다음과 같습니다.

```javascript

conchConfig.pushAtlasLimitSize = 256;//当图片size小于256的时候，合并到大图合集中
```



##5. 특수설명

주의: 사진에 합병해서 집중된 그림에 아이메이지가 삭제된 후 바로 석방되지 않을 것입니다. 이 그림이 집중되어 다른 그림이 남아 있기 때문에, 모든 그림은 바로 현카드에서 삭제할 수 없습니다.그러나 자동 대형 도집 관리자는 이 현존하는 생명 주기를 자동으로 관리해 이 큰 도집 점용 현존의 수를 확보할 수 있다.예를 들어 10장, 그림의 크기는 1024*1024, 점용 현존은 40MB이다.
