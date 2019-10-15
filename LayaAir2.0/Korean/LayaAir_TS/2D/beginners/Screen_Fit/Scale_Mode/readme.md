# 屏幕适配的缩放模式详解



축소 모드 는 스크린 적용 의 핵심 내용 을 본편 은 기초 개념 에서 변수 설명 을 결합 코드 실례 를 이해 할 수 있 는 Layair 엔진 의 화면 조정 모드 를 이해 했 다.API 문서에서 우리는 laya.display.Stage 를 검색하여 조정 모드에 대한 방법을 볼 수 있는 scaleMode 는 7개의 파라메타가 있으며, 각종 화면에 적합한 축소 수요를 실현할 수 있으며, 매개 설명은 그림 1의 보여 줍니다.



  ![blob.png](img/1.png)< br >>
(1) Layair 엔진 축소 모드 scaleMode 인자 설명



**간단한 개관 설명을 하고, 우리는 먼저 이 편의 관련 기초 개념을 이해한다.**

**1, 디자인 너비:** 

프로젝트 코드 중 프로젝트 코드 중 초기화 무대 레이인it (Laya.init) 에서 정의된 폭이 높은 디자인으로 높습니다.

**2, 스테이지 너비:**

스테이지 넓이가 게임 무대 크기의 크기로 높습니다.

**3. 배합 폭:**

엔진의 적절한 배합 패턴을 통해 설계 폭을 조정한 후 폭이 높고, 구분 이해를 편리하게 하기 위해서, 우리는 적당한 배급이 높다고 한다.

**4, 화보 너비:**

화보 넓이는 HTML5 에서 canvas 노드가 높고 게임에서 볼 수 있는 내용은 모두 화보 구역 안에 있다.

**5, 화면 폭 높이:**

화면 넓이가 높다는 것은 휴대전화 브라우저 화면의 폭이 높습니다. 예를 들어 iphone6 세로 화면 크기가 높습니다`375*667`.Layaia 엔진을 통해 laya.utils.Browser.client Width와 laya.utils.Browser.clientheight 화면의 넓이와 높습니다.

**6, 물리적 너비:**

설비 화면의 물리가 넓으니, 우리는 먼저 화소 밀도의 개념을 알아야 한다.PC 컴퓨터에서 일반적으로 픽셀 위치에서 물리 픽셀이다.이동 설비가 고속으로 발전하는 오늘날 휴대전화의 화면에는 보통 픽셀 위치에 2개나 3개의 픽셀이 있다.예 iphone6 세로 화면의 물리적 폭이 높았다`750*1334`.Layaiair 엔진은 laya.utils.Browser.wis.with, laya.utils.Browser.height 장치화면 화면을 가져오는 물리적 폭이 높습니다.

###예시 코드 중 사용된 배경 그림:

[loadingBg.jpg](http://ldc.layabox.com/uploadfile/file/20170223/1487816895380055.jpg)(열거나 다른 저장하는 것을 누르십시오.`1136×640`픽셀 배경

###exact fit 모드

exact fit 모드 는 내용 을 고려하지 않는 원시 비율 을 통해 전체 브라우저 화면을 채우는 모드 를 직접 사용합니다.이런 모드에서는 화보 폭이 높고, 스테이지 폭이 높으면 디자인이 높고 변화가 없다.그러나 물리적 폭이 높고 디자인의 폭이 높을 때 이런 비등비의 축소 패턴은 기존 디자인이 뚜렷하게 변형될 수 있다.효과는 그림 2, 그림 3과 같다.

​![blob.png](img/2.png)< br >>
(도 2) 디자인 너비`1136*640`물리가 넓다`1334*750`exactfix 모드 실행 효과

​![blob.png](img/3.png)< br >>
(도 3) 디자인 너비`1136*640`물리가 넓다`750*1334`exact fit 모드 실행 효과



**exact fit 모드 사례 코드:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "exactfit";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###2, fixedheight 모드

fixedheight 모드에서 화보와 stage 의 높이가 변함없이 유지되어 있으며, 화보와 stage의 넓이는 적당한 배합 너비(적당한 배합 너비=설계 높이 * 화면 폭이 높은 비례에 따라 스크린에 따라 전체 화면 크기를 조정하는 것이 주류의 적절한 모드 중 하나다.

예: iPhone6 가로로 화면 폭이 높습니다`667*375`설계 고도 640, 그럼 fixedheight 모드 사용 후`适配宽度=(667/375)*640`적정 너비 계산 결과 정비된 1138즉 화포의 폭.예를 들어 스트레칭, 전체 스크린 효과는 그림 4개처럼 보여 줍니다:

​![blob.png](img/4.png)< br >>
(도 4) 화보 넓이가 높다`1067*640`물리가 넓다`1334*750`fixedheight 모드 실행 효과

동리, 아이폰6 세로 스크린 때`适配宽度=(375/667)*640`적정 너비 계산 결과 정비된 360은 화포의 너비다.만약 우리가 가로로 디자인한다면, 이 모드를 사용할 때 자동으로 가로로 설정해야 한다. 그렇지 않으면 화보 밖의 부분은 보이지 않는다.fixedheight 모드 예례가 켜져 전체 화면 효과 5

​![blob.png](img/5.png)< br >>
(도 5) 화보 넓이가 높다`360*640`물리가 넓다`750*1334`fixedheight 모드 실행 효과



**fixedheight 모드 사례 코드:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "fixedheight";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(0, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###3, fixedwidth 모드

fixedwidth 모드에서 화보와 stage 의 넓은 설계 너비가 변하지 않고, 화보와 stage의 높은 높이에 적합한 높이의 ((.`适配高度=设计宽度*屏幕高宽比`) 마지막으로 스크린 넓이로 확대 조정 조정 조정 조정 패턴 중 하나다.

예: iPhone6 가로로 화면 폭이 높습니다`667*375`설계 너비는 1136, 그럼 fixedwith 모드를 채택한 후,`适配高度=(375/667)*1136`고도의 계산 결과를 정돈한 뒤 639는 바로 화포의 높이이다.예를 들어 스트레칭을 맞추면 전체 화면 효과를 그림 6개처럼 보여 줍니다:

​![blob.png](img/6.png)< br >>
(도6) 화보 넓이가 높다`1136*639`물리가 넓다`1334*750`fixedwith 모드 실행 효과

동리, 아이폰6 세로 스크린 시 높이 맞추기 = (667/375)*1136, 높이 계산 결과 전체 2021 즉 화보 높이.만약 우리가 가로로 디자인한다면, 이 모드를 사용할 때, 자동으로 가로로 설정해야 한다. 그렇지 않으면 넓이가 높으면 스크린보다 높고, 화면의 넓이가 높게 확대될 때, 화면이 넓게 확대될 때, 일반적으로 우리가 원하는 효과는 아니다.fixedwidth 모드 예례로 스트레칭을 맞추면 전체 화면 효과 6

​![blob.png](img/7.png)< br >>
(도6) 화보 넓이가 높다`1136*2021`물리가 넓다`1334*750`fixedwith 모드 실행 효과



**fixedwidth 모드 사례 코드:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "fixedwidth";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 0);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```






###4、full 모드

full 모드에서 stage 와 화포의 폭이 높은 디자인을 무시하고, 직접적으로 물리적 넓이가 높기 때문에 게임 화질의 정도가 가장 높은 주류 조정 패턴이다.이 모드에서 설계 내용은 축소되지 않고 1:1 원시 비율을 유지하는 기초로 무대와 브라우저 화면의 왼쪽 좌측 각도 맞추고 원형 설계 내용은 화면을 초월할 수 있다.예시 효과는 그림 7, 그림 8 시에 제시된다.
​![blob.png](img/8.png)
(도 8) 디자인 너비 높 고 물리 너비 높 은 동위`1136*640`full 모드 화면 실행 효과

​![blob.png](img/9.png)
(그림 9) 설계 너비 높이`1136*640`물리가 넓다`960*640`full 모드 화면 실행 효과



**ful 모드 사례 코드:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "full";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(0, 0);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```


**Tips:**

1, 이 패턴은 높은 정교도가 적절한 패턴이지만 게임의 성능에 대한 압력도 다른 모드에 비해 높고, 이 패턴을 선택하면 게임 전체의 시량을 결합해야 한다.

2. 화보 와 스테이지 의 폭이 높기 때문에 스크린의 물리적 폭이 높고, 리야아.init()의 폭이 0 으로 직설될 수 있다.





###5, noscale 모드

noscale 패턴은 축소되지 않고 화보와 stage 의 폭이 디자인보다 높다는 것이다.1:1 원시 설계 비율을 바탕으로 무대와 브라우저 스크린 왼쪽 좌측 구석을 맞추어 줍니다.화면의 넓이가 콘텐츠보다 높을 때 재단할 예정이며, 화면의 넓이가 내용보다 높을 때 검측이 나타난다.이 모드 실행 효과는 그림 9, 그림 10개와 같다.

​![blob.png](img/10.png)< br >>
(그림 10) 화면 폭이 모두 설계 폭 이 고시적 효과 보다 크다

​![blob.png](img/11.png)< br >>
(그림 11) 설계 내용 이 화면 폭 을 초과 해 화면 높이 설계 높이 효과 보다 크다



**noscale 모드 예제 코드 다음과 같습니다:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "noscale";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```






###6, noborder 모드

noborder 모드에서 화포의 폭이 높으면 설계 폭이 높다.크기 조정 시, 화면 폭이 높고 설계 폭이 가장 큰 비율의 한쪽에 따라 크기 조정`1136*640`화면 의 물리 폭 이 높다`750*1334`.넓은 비율을 계산하다`（750/1136）`0.66, 높은 비율`（1334/640）`2.08입니다.그럼 noborder 모드 크기를 적용할 때 최대 비율 한 쪽 (높이) 에 맞추어 물리 높이까지 끌어올리는 1334, 적당한 너비 등비`1334/640*1136`2368.물론 화면 너비가 넘는 부분은 재단된다.효과는 마치 11시와 같다.

​![blob.png](img/12.png)< br >>
(도 12) 화보 폭 높이 유지 디자인 사이즈`1136*640`시, 배합 폭 이 높 으면 최대 비율 을 한 방 으로 확대 하여 전체 화면 으로 뻗다



**noborder 모드 예제 코드 다음과 같습니다:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "noborder";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###7, showall 모드

showall 모드에서 stage 와 화포의 폭이 줄어든 후 적당한 배합이 높고, 화면의 넓이가 높고 설계 폭이 높고 가장 작은 비율의 한쪽이 크기를 조정하는 것과 같다.

예를 들면 사이즈`1136*640`화면 의 물리 폭 이 높다`750*1334`.계산이 넓은 비율`750/1136`0.66, 높은 비율`1334/640`2.08.그럼 showall 모드 조정 시 최소 비율 한 쪽 (넓이) 에 따라 화면 크기 750 크기 조정 (폭) 을 조정할 수 있습니다.`750/1136*640`423.스크린 물리 높이 1334 이상으로 스크린 스크린보다 423 멀리 떨어져 검은색 스크린을 많이 남기게 된다.효과는 그림 12소와 같다.

​![blob.png](img/13.png)< br >>
(도13) 화보 넓이가 줄어들다`750*423`물리적`750*423`화면에 흑 스크린이 대량으로 출현되다



**showall 모드 예제 코드 다음과 같습니다:**


```typescript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "showall";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




###8、fixedauto 모드

fixedauto 모드에서 stage 와 화포의 폭이 줄어든 후 적당한 배합 폭이 높았고, 전체 콘텐츠에 따라 전체 콘텐츠의 크기에 따라 SCALE FIXED WIDTH 와 SCALE FIXED HEIGHT 두 패턴을 선택해 스크린보다 훨씬 더 높은 디자인에 가깝다.

예: iPhone6 가로로 화면 폭이 높습니다`667*375`설계 너비는 1136. 그렇다면 fixedauto 모드를 채택한 후, 관대비에 따라 자동으로 SCALEu FIXED WIDTH 방식으로 스트레칭 적용된다.`适配高度=(375/667)*1136`고도의 계산 결과를 정돈한 뒤 639는 바로 화포의 높이이다.예를 들어 스트레칭을 맞추면 전체 화면 효과를 그림 6개처럼 보여 줍니다:

​![14](img/14.png)< br >>
(도 14) 화보 넓이가 높다`1136*639`물리가 넓다`1334*750`fixedauto 모드 실행 효과

동리, 아이폰6 세로 스크린 시 높이 맞추기 = (667/375)*1136, 높이 계산 결과 전체 2021 즉 화보 높이.넓은 비례에 따라 자동으로 스크린보다 훨씬 높은 SCALEu FIXEDu HEIGHT 의 적절한 패턴을 선택했다.

만약 우리가 가로로 디자인한다면, 이 모드를 사용할 때 자동으로 가로로 설정해야 한다. 그렇지 않으면 넓이가 높고, 설계의 높이를 기준으로 가로로 재단하는 것은 일반적으로 우리가 원하는 효과가 아니다.fixedauto 모드 예시 스트레칭 전체 화면 효과

​![15](img/15.png)< br >>
(도 15) 화보 넓이가 높다`1136*2021`물리가 넓다`1334*750`fixedauto 모드 실행 효과



**fixedauto 모드 예제 코드 다음과 같습니다:**


```javascript

module laya {
    import Text = Laya.Text;
    import Image = Laya.Image;
    import Sprite = Laya.Sprite;
 
    export class SmartScale_T {
 
        //适配模式
        private modes:string = "fixedauto";
        //全局文本信息
        private txt: Text;
 
        constructor() {
        //初始化舞台大小
        Laya.init(1136, 640);
 
        //设置适配模式
        Laya.stage.scaleMode = this.modes;
        //设置舞台背景色
        Laya.stage.bgColor  = "#ffff99";
 
 
        //实例一个背景
        var bg = new Image();
        bg.skin = "res/img/loadingBg.jpg";
        Laya.stage.addChild(bg);
 
 
        //实例一个文本
        this.txt = new Text();
        this.txt.text = "适配模式("+this.modes+") ";
        this.txt.bold = true;
        this.txt.pos(10, 350);
        this.txt.fontSize = 60;
        this.txt.color   = "#fff000";
        Laya.stage.addChild(this.txt);
        }
 
    }
}
new laya.SmartScale_T();
```




**종료 종료:**

full 패턴은 완전히 물리 픽셀 렌더로, 화면이 얼마나 크면, 고화질이 상용되는 적절한 패턴이지만, 크기에 따라 내용의 크기를 나타내는 크기는 다르고, HTML5 게임에 대한 성능 압력은 다른 적절한 패턴보다 높습니다.

showall 과 noborder 는 등비 조정 모드로 화면을 변형하지 않게 유지한다.스크린과 디자인의 폭이 가장 낮은 비율을 줄여 화면이 완전히 나타날 수 있으나 빈 스크린이 있는 것으로 보인다.noborder 가 정반대로 스크린과 디자인 폭이 가장 큰 비율로 줄여 빈 스크린 블랙은 나오지 않지만 넓거나 높은 부분의 내용이 드러나지 않는다.

fixedwidth 는 fixedheight 보다 showall, noborder 변종 같은 등 크기도 크기 조정 모드로 지켰지만, 한쪽은 움직이지 않고, 현재 HTML5 게임에서 자주 사용하는 주류 적용 모드 입니다.fixedauto 비례에 따라 fixedwidth 와 fixedheight 모드를 자동으로 전환합니다.이 몇 가지 모드도 우리가 추천한 전체 화면 배합 패턴이다.

본 편은 축소 모드를 중점적으로 소개하기 위한 다른 인자 구별.화면 자동 회전 등 다른 화면 설정을 결합시키지 않고 개발자는 관련 기술문서를 볼 수 있습니다.

적절한 패턴의 핵심은 화보, 스테이지를 축소하거나 직접 화보 크기를 바꾸는 것이다.다음은 다른 축소 모드를 조정하는 어떤 것들을 대조하여 여러분이 직관적으로 이해하기 편리하다.

노스칼라 (으) 가 (으) 가 (으) 가 (으) 가 (으) 가 (으) 가 (으) 가 (으) 가 (으) 가 (으) 가 (으) 하다
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
이에스
테두리 (으) 를 확대하다
이에스

**주의:**물리적 해상도 모드 사용`useRetinalCanvas=true`당시 화포 크기가 물리 해상도로 정해졌기 때문에 화포에 대한 축소는 모두 Stage 에 대한 축소로 변한다.



마지막으로 각 적절한 패턴의 상세한 대비 설명도를 첨부했다.모두 오른쪽 단추를 새 페이지에 전체 화면을 열 수 있습니다.

![图](img/16.png) 



